#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const OpenAI = require('openai');

const REPO_DIR = path.join(__dirname, '..', 'data', 'coding_standards');
const DOCS_DIR = path.join(REPO_DIR, 'docs');
const MANIFEST_FILE = path.join(__dirname, '..', 'data', 'repo-manifest.json');
const CACHE_FILE = path.join(__dirname, '..', 'data', 'agents-cache.json');
const AGENTS_FILE = path.join(__dirname, '..', 'docs', 'Agents.md');

class MarkdownToAgentsGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy'
    });
    this.cache = null;
    this.manifest = null;
  }

  /**
   * Load the repo manifest
   */
  async loadManifest() {
    try {
      if (await fs.pathExists(MANIFEST_FILE)) {
        this.manifest = await fs.readJson(MANIFEST_FILE);
        console.log(`Loaded manifest with ${Object.keys(this.manifest.files).length} files`);
        return this.manifest;
      }
      throw new Error('Manifest file not found. Run npm run discover first.');
    } catch (error) {
      console.error('Error loading manifest:', error.message);
      throw error;
    }
  }

  /**
   * Load the agents cache
   */
  async loadCache() {
    try {
      if (await fs.pathExists(CACHE_FILE)) {
        this.cache = await fs.readJson(CACHE_FILE);
        console.log(`Loaded cache with ${Object.keys(this.cache.files || {}).length} cached files`);
        return this.cache;
      }
    } catch (error) {
      console.warn('Could not load cache:', error.message);
    }
    
    this.cache = {
      lastGenerated: null,
      files: {}
    };
    return this.cache;
  }

  /**
   * Save the agents cache
   */
  async saveCache() {
    this.cache.lastGenerated = new Date().toISOString();
    await fs.writeJson(CACHE_FILE, this.cache, { spaces: 2 });
    console.log(`Cache saved to: ${CACHE_FILE}`);
  }

  /**
   * Check if a file needs processing (content hash changed)
   */
  needsProcessing(filePath, manifestInfo) {
    const cached = this.cache.files[filePath];
    if (!cached) {
      return true; // New file
    }
    if (cached.contentHash !== manifestInfo.contentHash) {
      return true; // Content changed
    }
    if (!cached.processedContent) {
      return true; // No cached content
    }
    return false;
  }

  /**
   * Clean markdown content by removing frontmatter and metadata
   */
  cleanMarkdownContent(content) {
    let cleaned = content;
    
    // Remove YAML frontmatter
    cleaned = cleaned.replace(/^---[\s\S]*?---\n*/m, '');
    
    // Remove include statements
    cleaned = cleaned.replace(/--8<--.*$/gm, '');
    
    return cleaned.trim();
  }

  /**
   * Escape Liquid syntax to prevent Jekyll from processing it
   */
  escapeLiquidSyntax(content) {
    // Escape {% and %} sequences that aren't already raw/endraw tags
    return content
      .replace(/\{%(?!\s*(raw|endraw))/g, '{% raw %}{%')
      .replace(/\{%\s*raw\s*%\}{%(\s*raw\s*%)/g, '{%$1') // Prevent double raw tags
      .replace(/(?<!endraw\s*)\%}/g, '%}{% endraw %}')
      .replace(/({%\s*endraw\s*%})\s*\1/g, '$1'); // Remove duplicate endraw tags
  }

  /**
   * Build AI prompt for processing markdown
   */
  buildPrompt(content, title, section) {
    return `Extract the most essential coding standard rules from the following Drupal documentation. Output only concise coding reference standards - no indexes, no approach, no summarization.

## Source Documentation
Title: ${title}
Section: ${section}

Content:
${content}

## Requirements:
- Extract only critical rules that meaningfully improve code generation performance or correctness
- Validate that each rule is both critical and non-obvious (skip rules that current models are likely already trained on)
- Prioritize minimal token usage - avoid redundant or obvious rules
- Use clear, actionable language
- Remove examples and highlights, we only want the rules, not the code examples
- Remove navigation elements, links, metadata, and explanatory text
- Output format: Start with ## ${title}, then organized rules with ### subsections and bullet points
- Do not add any additional output beyond the coding standards themselves`;
  }

  /**
   * Process a markdown file with AI
   */
  async processWithAI(filePath, manifestInfo) {
    const content = await fs.readFile(manifestInfo.fullPath, 'utf8');
    const cleanedContent = this.cleanMarkdownContent(content);
    
    // Skip very small files (likely just redirects or placeholders)
    if (cleanedContent.length < 100) {
      console.log(`   ⏭ Skipping ${filePath} (too small: ${cleanedContent.length} chars)`);
      return null;
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy') {
      if (process.env.CI || process.env.GITHUB_ACTIONS) {
        throw new Error(`OPENAI_API_KEY is required in CI environment. Cannot process ${filePath}`);
      }
      console.log(`   ⚠️ No API key, using fallback for ${filePath}`);
      return this.createFallbackContent(cleanedContent, manifestInfo.title, manifestInfo.section);
    }

    const prompt = this.buildPrompt(cleanedContent, manifestInfo.title, manifestInfo.section);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // supports 128k token context, more cost-effective
        messages: [
          {
            role: 'system',
            content: 'You are an expert Drupal developer focused on creating concise coding standard rules for AI coding agents. Your goal is to extract the most essential rules and standards from the provided documentation, ensuring that only critical guidance is included. Prioritize minimal token usage in outputs and avoid redundant or obvious rules that current models are likely already trained on. Include a rule only if it meaningfully improves code generation performance or correctness, as unnecessary additions increase processing costs. After extraction, validate that each included rule is both critical and non-obvious. Do not create any additional output, no indexes, no approach, no summarization, we just want the concise coding reference standards.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.2
      });

      const result = response.choices[0].message.content;
      console.log(`   ✅ Processed with AI (${result.length} chars)`);
      return result;

    } catch (error) {
      console.error(`   ❌ AI processing failed for ${filePath}:`, error.message);
      
      // Check for context length errors specifically
      const errorMessage = error.message?.toLowerCase() || '';
      if (errorMessage.includes('context length') || errorMessage.includes('maximum context length')) {
        console.error(`   ⚠️ Context length exceeded for ${filePath}. Consider using a model with larger context window or implementing chunking.`);
        // Context length errors are critical - fail even in local dev
        throw new Error(`Context length exceeded for ${filePath}: ${error.message}`);
      }
      
      // Check for critical API errors
      if (this.isCriticalApiError(error)) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      
      // For non-critical errors in CI, still fail
      if (process.env.CI || process.env.GITHUB_ACTIONS) {
        throw new Error(`OpenAI API error in CI: ${error.message}`);
      }
      
      // Use fallback for local development
      console.warn(`   ⚠️ Using fallback for ${filePath}`);
      return this.createFallbackContent(cleanedContent, manifestInfo.title, manifestInfo.section);
    }
  }

  /**
   * Check if an API error is critical
   */
  isCriticalApiError(error) {
    const criticalErrors = [
      'insufficient_quota',
      'billing_hard_limit_reached',
      'invalid_api_key',
      'authentication_error',
      'rate_limit_exceeded',
      'context_length_exceeded'
    ];
    
    if (error.code && criticalErrors.includes(error.code)) {
      return true;
    }
    
    const errorMessage = error.message?.toLowerCase() || '';
    const criticalPatterns = [
      'insufficient quota',
      'billing',
      'rate limit',
      'invalid api key',
      'authentication',
      'context length exceeded',
      'maximum context length'
    ];
    
    return criticalPatterns.some(pattern => errorMessage.includes(pattern));
  }

  /**
   * Create fallback content when AI is not available
   */
  createFallbackContent(content, title, section) {
    const lines = content.split('\n');
    const output = [`## ${title}`];
    
    let currentHeading = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Preserve headings (convert ## to ### for sub-sections)
      if (trimmed.startsWith('##')) {
        currentHeading = trimmed.replace(/^#+\s*/, '');
        output.push(`\n### ${currentHeading}`);
        continue;
      }
      
      // Preserve bullet points
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        output.push(trimmed.replace(/^\*/, '-'));
        continue;
      }
      
      // Preserve code blocks
      if (trimmed.startsWith('```')) {
        output.push(line);
        continue;
      }
      
      // Convert meaningful sentences to bullet points
      if (trimmed.length > 20 && !trimmed.startsWith('[') && !trimmed.includes('http')) {
        // Only if it looks like a rule or guideline
        if (trimmed.match(/^[A-Z]/) && (
          trimmed.includes('should') ||
          trimmed.includes('must') ||
          trimmed.includes('use') ||
          trimmed.includes('avoid') ||
          trimmed.includes('always') ||
          trimmed.includes('never')
        )) {
          output.push(`- ${trimmed}`);
        }
      }
    }
    
    return output.join('\n');
  }

  /**
   * Generate project overview for Agents.md
   */
  generateProjectOverview() {
    return `# Drupal Coding Standards - AI Agent Reference

`;
  }

  /**
   * Generate table of contents
   */
  generateTableOfContents(sections) {
    const toc = ['## Table of Contents\n'];
    
    for (const [section, files] of Object.entries(sections).sort()) {
      const anchor = section.toLowerCase().replace(/\s+/g, '-');
      toc.push(`- [${section}](#${anchor})`);
    }
    
    return toc.join('\n') + '\n';
  }

  /**
   * Main generation function
   */
  async generate() {
    console.log('🚀 Starting Agents.md generation...\n');

    try {
      // Load manifest and cache
      await this.loadManifest();
      await this.loadCache();

      // Determine which files need processing
      const filesToProcess = [];
      const filesToSkip = [];
      
      for (const [filePath, info] of Object.entries(this.manifest.files)) {
        if (this.needsProcessing(filePath, info)) {
          filesToProcess.push({ filePath, info });
        } else {
          filesToSkip.push({ filePath, info });
        }
      }

      console.log(`\n📊 Processing status:`);
      console.log(`   - Files to process: ${filesToProcess.length}`);
      console.log(`   - Files from cache: ${filesToSkip.length}`);

      // Process files that need updating
      for (const { filePath, info } of filesToProcess) {
        console.log(`\n📝 Processing: ${filePath}`);
        
        const processedContent = await this.processWithAI(filePath, info);
        
        if (processedContent) {
          // Update cache
          this.cache.files[filePath] = {
            contentHash: info.contentHash,
            processedAt: new Date().toISOString(),
            section: info.section,
            title: info.title,
            processedContent
          };
        }
        
        // Add delay between API calls to avoid rate limiting
        if (filesToProcess.indexOf({ filePath, info }) < filesToProcess.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Collect all processed content (from cache + newly processed)
      const sections = {};
      
      for (const [filePath, info] of Object.entries(this.manifest.files)) {
        const cached = this.cache.files[filePath];
        if (cached && cached.processedContent) {
          const section = cached.section || info.section;
          if (!sections[section]) {
            sections[section] = [];
          }
          sections[section].push({
            title: cached.title || info.title,
            content: cached.processedContent
          });
        }
      }

      // Generate Agents.md - wrap in raw tags to prevent Jekyll Liquid processing
      const agentsContent = [
        '{% raw %}',
        this.generateProjectOverview()
      ];

      // Add content by section
      for (const [section, files] of Object.entries(sections).sort()) {
        agentsContent.push(`\n# ${section}\n`);
        for (const file of files.sort((a, b) => a.title.localeCompare(b.title))) {
          // Escape any Liquid syntax in the content to prevent Jekyll from processing it
          // Escape {% and %} (Liquid tags)
          // Escape {{ and }} (Liquid variables)
          let escapedContent = file.content
            .replace(/\{%(?!\s*(raw|endraw))/g, '&#123;&#37;')
            .replace(/(?<!endraw\s*)\%}/g, '&#37;&#125;')
            .replace(/\{\{/g, '&#123;&#123;')
            .replace(/\}\}/g, '&#125;&#125;');
          agentsContent.push(escapedContent);
          agentsContent.push('\n');
        }
      }

      // Close raw tag to prevent Jekyll Liquid processing
      agentsContent.push('{% endraw %}');

      const finalContent = agentsContent.join('\n');

      // Save Agents.md
      await fs.ensureDir(path.dirname(AGENTS_FILE));
      await fs.writeFile(AGENTS_FILE, finalContent);
      console.log(`\n📄 Agents.md saved to: ${AGENTS_FILE}`);
      console.log(`   - File size: ${(finalContent.length / 1024).toFixed(1)} KB`);

      // Save cache
      await this.saveCache();

      // Update index.html with the new Agents.md content
      try {
        const { updateIndex } = require('./update-index.js');
        await updateIndex();
      } catch (error) {
        console.warn('⚠️ Could not update index.html:', error.message);
        // Don't fail the pipeline if index update fails
      }

      console.log('\n✅ Generation complete!');
      
      return {
        totalFiles: Object.keys(this.manifest.files).length,
        processedFiles: filesToProcess.length,
        cachedFiles: filesToSkip.length,
        outputFile: AGENTS_FILE
      };

    } catch (error) {
      console.error('\n❌ Error during generation:', error);
      process.exit(1);
    }
  }
}

// Run generator
if (require.main === module) {
  const generator = new MarkdownToAgentsGenerator();
  generator.generate().catch(console.error);
}

module.exports = { MarkdownToAgentsGenerator };

