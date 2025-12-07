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
   * Build AI prompt for processing markdown
   */
  buildPrompt(content, title, section) {
    return `Convert the following Drupal coding standards documentation into a clean, focused section for an AI Agents coding reference guide.

## Source Documentation
Title: ${title}
Section: ${section}

Content:
${content}

## Requirements:
- Extract only the essential coding standards and rules
- Use clear, actionable language that AI coding agents can implement
- Group related rules under appropriate subheadings
- Keep it concise - focus on rules, not lengthy explanations
- Use consistent bullet point formatting
- Focus on what AI coding agents should do/avoid
- Preserve important code examples that illustrate rules
- Remove navigation elements, links to other pages, and metadata

## Output Format:
Generate a clean section starting with a ## heading for the topic, followed by organized rules and guidelines:

## ${title}

### [Subsection 1]
- [Essential rule 1]
- [Essential rule 2]

### [Subsection 2]
- [Essential rule 3]
- [Essential rule 4]

Keep the output focused, actionable, and optimized for AI coding agents.`;
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
            content: 'You are an expert Drupal developer specializing in creating concise coding reference guides for AI coding agents. Focus on extracting the most important rules and standards. Use bullet points to minimize token usage. Preserve important code examples that illustrate rules.'
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

## Overview

This document provides comprehensive Drupal coding standards optimized for AI coding agents. It consolidates essential rules and guidelines from the official [Drupal Coding Standards](https://git.drupalcode.org/project/coding_standards) repository.

## Purpose

This reference serves:
- **AI Coding Agents** (Cursor, Claude, GitHub Copilot, etc.)
- **Development Tools** with AI integration
- **Automated Code Review** systems
- **Code Generation** tools

## How to Use

Each section contains coding standards for a specific technology or aspect of Drupal development. AI agents should reference the relevant section when working with that particular area.

## Source

Auto-generated from: [git.drupalcode.org/project/coding_standards](https://git.drupalcode.org/project/coding_standards)

---
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
        this.generateProjectOverview(),
        this.generateTableOfContents(sections),
        '---\n'
      ];

      // Add content by section
      for (const [section, files] of Object.entries(sections).sort()) {
        agentsContent.push(`\n# ${section}\n`);
        for (const file of files.sort((a, b) => a.title.localeCompare(b.title))) {
          agentsContent.push(file.content);
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

