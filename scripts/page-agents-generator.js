#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');

const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const BULLETS_DIR = path.join(__dirname, '..', 'data', 'bullets');
const PAGES_DIR = path.join(__dirname, '..', 'data', 'pages');
const PROMPTS_DIR = path.join(__dirname, '..', 'data', 'prompts');
const BULLETS_MANIFEST_FILE = path.join(BULLETS_DIR, 'bullets-manifest.json');
const PAGES_MANIFEST_FILE = path.join(PAGES_DIR, 'generation-summary.json');

class PageAgentsGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy'
    });
  }

  async loadSitemap() {
    try {
      return await fs.readJson(SITEMAP_FILE);
    } catch (error) {
      console.error('Error loading sitemap:', error);
      throw error;
    }
  }

  async loadBulletsManifest() {
    try {
      if (await fs.pathExists(BULLETS_MANIFEST_FILE)) {
        return await fs.readJson(BULLETS_MANIFEST_FILE);
      }
    } catch (error) {
      console.warn('Could not load bullets manifest:', error.message);
    }
    return null;
  }

  async loadPagesManifest() {
    try {
      if (await fs.pathExists(PAGES_MANIFEST_FILE)) {
        return await fs.readJson(PAGES_MANIFEST_FILE);
      }
    } catch (error) {
      console.warn('Could not load pages manifest:', error.message);
    }
    return null;
  }

  needsPageUpdate(pageUrl, bulletsManifest, pagesManifest) {
    if (!bulletsManifest || !pagesManifest) {
      return true; // If we can't determine, process it
    }

    // Find the bullet points file for this page
    const urlParts = pageUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const bulletsFilename = `${lastPart}.bullets.md`;
    
    const bulletResult = bulletsManifest.results?.find(r => r.bulletsFile === bulletsFilename);
    if (!bulletResult) {
      return true; // No bullet points available
    }

    // Find the last generated page for this URL
    const pageResult = pagesManifest.pages?.find(p => p.url === pageUrl);
    if (!pageResult) {
      return true; // Never generated before
    }

    // Compare timestamps - if bullet points were updated after page generation, update the page
    const bulletsUpdated = new Date(bulletResult.lastProcessedAt || bulletResult.convertedAt);
    const pageGenerated = new Date(pageResult.generatedAt || pagesManifest.generatedAt);
    
    return bulletsUpdated > pageGenerated;
  }

  async loadBulletPointsForPage(pageUrl) {
    try {
      // Extract filename from URL
      const urlParts = pageUrl.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      const filename = `${lastPart}.bullets.md`;
      const filePath = path.join(BULLETS_DIR, filename);
      
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        return {
          filename: filename,
          content: content,
          url: pageUrl
        };
      }
      
      return null;
    } catch (error) {
      console.warn(`Could not load bullet points for page ${pageUrl}:`, error);
      return null;
    }
  }

  buildPagePrompt(pageUrl, bulletPoints) {
    const topic = this.extractTopicFromUrl(pageUrl);
    
    return `Convert the following Drupal coding standards bullet points into a clean, focused section for an Agents.md file.

The bullet points are already cleaned and contain only the essential coding standards. Your job is to organize them into a clear, concise format that AI coding agents can easily follow.

## Source Bullet Points:
${bulletPoints ? bulletPoints.content : 'No bullet points available'}

## Requirements:
- Extract only the essential coding standards and rules
- Use clear, actionable language that AI agents can implement
- Group related rules under appropriate subheadings
- Keep it concise - no examples or lengthy explanations
- Use consistent bullet point formatting
- Focus on what AI coding agents should do/avoid

## Output Format:
Generate a clean section in this format:

## ${topic}

### [Subsection 1]
- [Essential rule 1]
- [Essential rule 2]

### [Subsection 2]  
- [Essential rule 3]
- [Essential rule 4]

Keep the output focused, actionable, and optimized for AI coding agents.`;
  }

  buildAgentsPrompt(bulletPoints) {
    return `Convert the following Drupal coding standards bullet points into a clean, focused section for an Agents.md file. 

The bullet points are already cleaned and contain only the essential coding standards. Your job is to organize them into a clear, concise format that AI coding agents can easily follow.

## Source Bullet Points:
${bulletPoints}

## Requirements:
- Extract only the essential coding standards and rules
- Use clear, actionable language that AI agents can implement
- Group related rules under appropriate subheadings
- Keep it concise - no examples or lengthy explanations
- Use consistent bullet point formatting
- Focus on what AI coding agents should do/avoid

## Output Format:
Generate a clean section in this format:

## [Topic Name]

### [Subsection 1]
- [Essential rule 1]
- [Essential rule 2]

### [Subsection 2]  
- [Essential rule 3]
- [Essential rule 4]

Keep the output focused, actionable, and optimized for AI coding agents.`;
  }

  extractTopicFromUrl(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  async generatePageAgents(pageUrl, sectionName) {
    const topic = this.extractTopicFromUrl(pageUrl);
    console.log(`\n📝 Generating Quick Reference for: ${topic}`);
    
    try {
      // Load bullet points for this page
      const bulletPoints = await this.loadBulletPointsForPage(pageUrl);
      
      if (!bulletPoints) {
        // In CI environments, fail if no bullet points are available
        if (process.env.CI || process.env.GITHUB_ACTIONS) {
          console.warn(`   ⚠️ No bullet points found for ${topic} - likely due to access denied during download. Skipping page generation.`);
          return null;
        }
        
        console.log(`   ⚠️ No bullet points found for ${topic}`);
        return null;
      }
      
      console.log(`   Loaded bullet points for ${topic}`);
      
      // Build prompt
      const prompt = this.buildPagePrompt(pageUrl, bulletPoints);
      
      // Save prompt for review
      await fs.ensureDir(PROMPTS_DIR);
      const promptFile = path.join(PROMPTS_DIR, `${topic.toLowerCase().replace(/\s+/g, '-')}-quickref-prompt.txt`);
      await fs.writeFile(promptFile, prompt);
      console.log(`   Prompt saved to: ${promptFile}`);
      
      // Generate content with AI
      let content;
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy') {
        try {
          const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: 'You are an expert Drupal developer specializing in creating concise Quick Reference guides for AI coding agents. Focus on extracting the most important rules and standards. Use only bullet points to minimize token usage and costs. Do not include examples or lengthy explanations.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 2000,
            temperature: 0.2
          });
          
          content = response.choices[0].message.content;
          console.log(`   ✅ Generated with AI (${content.length} characters)`);
        } catch (error) {
          console.error(`   ❌ AI generation failed: ${error.message}`);
          
          // Check for critical API errors that should fail fast
          if (this.isCriticalApiError(error)) {
            throw new Error(`OpenAI API error: ${error.message}. This is a critical error that prevents AI generation. Please check your API key, billing, and rate limits.`);
          }
          
          // For non-critical errors, use fallback in local development
          if (process.env.CI || process.env.GITHUB_ACTIONS) {
            throw new Error(`OpenAI API error: ${error.message}. In CI environment, all API errors are treated as critical.`);
          }
          
          console.warn(`   ⚠️ API error, using fallback for ${topic}: ${error.message}`);
          content = this.generateFallbackQuickRef(topic, pageUrl, bulletPoints);
        }
      } else {
        // In CI environments, fail if no API key is provided
        if (process.env.CI || process.env.GITHUB_ACTIONS) {
          throw new Error(`OPENAI_API_KEY is required in CI environment but not provided. Cannot generate Quick Reference for ${topic}`);
        }
        
        console.log(`   ⚠️ No API key provided, generating fallback content`);
        content = this.generateFallbackQuickRef(topic, pageUrl, bulletPoints);
      }
      
      // Save page file
      await fs.ensureDir(PAGES_DIR);
      const pageFile = path.join(PAGES_DIR, `${topic.toLowerCase().replace(/\s+/g, '-')}-quickref.md`);
      await fs.writeFile(pageFile, content);
      console.log(`   📄 Quick Reference saved to: ${pageFile}`);
      
      return {
        topic,
        filename: path.basename(pageFile),
        content,
        url: pageUrl,
        section: sectionName
      };
      
    } catch (error) {
      console.error(`Error generating Quick Reference for ${topic}:`, error);
      throw error;
    }
  }

  isCriticalApiError(error) {
    // Check for critical API errors that should always fail
    const criticalErrors = [
      'insufficient_quota',           // Billing/quota exceeded
      'billing_hard_limit_reached',   // Billing hard limit
      'invalid_api_key',              // Invalid API key
      'invalid_organization',         // Invalid organization
      'account_deactivated',          // Account deactivated
      'rate_limit_exceeded',          // Rate limit exceeded
      'requests_per_minute_limit_exceeded', // Rate limit
      'tokens_per_minute_limit_exceeded',   // Token limit
      'context_length_exceeded',      // Context too long
      'model_not_found',              // Model not available
      'permission_denied',            // Permission issues
      'invalid_request_error',        // Invalid request
      'authentication_error'          // Authentication failed
    ];
    
    // Check error code/type
    if (error.code && criticalErrors.includes(error.code)) {
      return true;
    }
    
    // Check error message for common critical patterns
    const errorMessage = error.message?.toLowerCase() || '';
    const criticalPatterns = [
      'insufficient quota',
      'billing',
      'rate limit',
      'invalid api key',
      'authentication',
      'permission denied',
      'account deactivated',
      'quota exceeded',
      'context length exceeded'
    ];
    
    return criticalPatterns.some(pattern => errorMessage.includes(pattern));
  }

  generateFallbackQuickRef(topic, pageUrl, bulletPoints) {
    // Extract key bullet points from the content
    const lines = bulletPoints.content.split('\n').filter(line => 
      line.trim().startsWith('-') && 
      line.trim().length > 10 &&
      !line.includes('http') &&
      !line.includes('Last updated') &&
      !line.includes('Page status') &&
      !line.includes('On this page') &&
      !line.includes('Coding standards')
    );
    
    const keyRules = lines.slice(0, 8);
    const bestPractices = lines.slice(8, 15);
    const examples = lines.slice(15, 20);

    return `## ${topic}

### Rules
${keyRules.length > 0 ? keyRules.join('\n') : `- Follow Drupal coding standards for ${topic}
- Maintain consistency with Drupal core practices
- Ensure code is readable and maintainable
- Use established patterns and conventions
- Document complex logic and decisions
- Follow security best practices`}`;
  }

  async generateAgentsFile() {
    console.log('🚀 Starting Agents.md generation from bullet points...');
    
    try {
      // Load all bullet point files
      const bulletFiles = await fs.readdir(BULLETS_DIR);
      const bulletsFiles = bulletFiles.filter(file => file.endsWith('.bullets.md'));
      
      console.log(`Found ${bulletsFiles.length} bullet point files`);
      
      // Load all bullet point content
      const allBulletPoints = [];
      for (const file of bulletsFiles) {
        const filePath = path.join(BULLETS_DIR, file);
        const content = await fs.readFile(filePath, 'utf8');
        const topic = file.replace('.bullets.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        allBulletPoints.push({
          topic,
          filename: file,
          content: content.trim()
        });
      }
      
      // Sort by topic for consistent output
      allBulletPoints.sort((a, b) => a.topic.localeCompare(b.topic));
      
      console.log(`Loaded bullet points for: ${allBulletPoints.map(b => b.topic).join(', ')}`);
      
      // Combine all bullet points
      const combinedBulletPoints = allBulletPoints.map(bp => 
        `## ${bp.topic}\n\n${bp.content}`
      ).join('\n\n');
      
      // Generate Agents.md content
      let agentsContent;
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy') {
        try {
          const prompt = this.buildAgentsPrompt(combinedBulletPoints);
          
          const response = await this.openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: 'You are an expert at creating clean, focused coding standards documentation for AI agents. Focus on extracting essential rules and organizing them clearly. Use only bullet points and clear headings.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 4000,
            temperature: 0.2
          });
          
          agentsContent = response.choices[0].message.content;
          console.log(`✅ Generated Agents.md with AI (${agentsContent.length} characters)`);
        } catch (error) {
          console.error(`❌ AI generation failed: ${error.message}`);
          agentsContent = this.generateFallbackAgents(allBulletPoints);
        }
      } else {
        console.log(`⚠️ No API key provided, generating fallback content`);
        agentsContent = this.generateFallbackAgents(allBulletPoints);
      }
      
      // Save Agents.md file
      const agentsFilePath = path.join(__dirname, '..', 'docs', 'Agents.md');
      await fs.ensureDir(path.dirname(agentsFilePath));
      await fs.writeFile(agentsFilePath, agentsContent);
      console.log(`📄 Agents.md saved to: ${agentsFilePath}`);
      
      return {
        filePath: agentsFilePath,
        content: agentsContent,
        topicsCount: allBulletPoints.length
      };
      
    } catch (error) {
      console.error('Error generating Agents.md:', error);
      throw error;
    }
  }

  generateFallbackAgents(allBulletPoints) {
    const sections = allBulletPoints.map(bp => {
      // Extract key bullet points (skip empty lines and metadata)
      const lines = bp.content.split('\n').filter(line => 
        line.trim().startsWith('-') && 
        line.trim().length > 10 &&
        !line.includes('http') &&
        !line.includes('Last updated') &&
        !line.includes('Page status') &&
        !line.includes('On this page')
      );
      
      const keyRules = lines.slice(0, 10); // Take first 10 rules
      
      return `## ${bp.topic}

${keyRules.length > 0 ? keyRules.join('\n') : `- Follow Drupal coding standards for ${bp.topic}
- Maintain consistency with Drupal core practices
- Ensure code is readable and maintainable`}`;
    });
    
    return sections.join('\n\n');
  }

  async combineQuickRefsIntoAgents() {
    console.log('🔄 Combining individual quick reference files into Agents.md...');
    
    try {
      // Read all quick reference files
      const quickRefFiles = await fs.readdir(PAGES_DIR);
      const mdFiles = quickRefFiles.filter(file => file.endsWith('-quickref.md'));
      
      console.log(`Found ${mdFiles.length} quick reference files`);
      
      const sections = [];
      
      for (const file of mdFiles) {
        const filePath = path.join(PAGES_DIR, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        // Skip files that only contain links (old format)
        if (content.includes('[/docs/') && content.split('\n').filter(line => line.trim().startsWith('-')).length < 3) {
          console.log(`   ⏭ Skipping ${file} (contains only links)`);
          continue;
        }
        
        sections.push(content.trim());
        console.log(`   ✅ Added ${file}`);
      }
      
      // Combine all sections
      const agentsContent = sections.join('\n\n');
      
      // Save Agents.md file
      const agentsFilePath = path.join(__dirname, '..', 'docs', 'Agents.md');
      await fs.ensureDir(path.dirname(agentsFilePath));
      await fs.writeFile(agentsFilePath, agentsContent);
      console.log(`📄 Agents.md saved to: ${agentsFilePath}`);
      
      return {
        filePath: agentsFilePath,
        content: agentsContent,
        sectionsCount: sections.length
      };
      
    } catch (error) {
      console.error('Error combining quick references:', error);
      throw error;
    }
  }

  async generateAllPages() {
    console.log('🚀 Starting page-based Quick Reference generation...');
    
    try {
      // Load sitemap and manifests for incremental updates
      const sitemap = await this.loadSitemap();
      const bulletsManifest = await this.loadBulletsManifest();
      const pagesManifest = await this.loadPagesManifest();
      
      console.log(`Loaded sitemap with ${Object.keys(sitemap).length} sections`);
      
      // Ensure directories exist
      await fs.ensureDir(PAGES_DIR);
      await fs.ensureDir(PROMPTS_DIR);
      
      const results = [];
      const pagesToUpdate = [];
      const pagesToSkip = [];
      let totalPages = 0;
      
      // Determine which pages need updating
      for (const [sectionName, links] of Object.entries(sitemap)) {
        for (const [pageUrl, lastUpdated] of Object.entries(links)) {
          totalPages++;
          if (this.needsPageUpdate(pageUrl, bulletsManifest, pagesManifest)) {
            pagesToUpdate.push({ pageUrl, sectionName });
          } else {
            pagesToSkip.push({ pageUrl, sectionName });
          }
        }
      }
      
      console.log(`Found ${totalPages} pages total`);
      console.log(`  - Need updates: ${pagesToUpdate.length}`);
      console.log(`  - Up to date: ${pagesToSkip.length}`);
      
      if (pagesToSkip.length > 0) {
        console.log(`⏭ Skipping up-to-date pages: ${pagesToSkip.slice(0, 3).map(p => p.pageUrl.split('/').pop()).join(', ')}${pagesToSkip.length > 3 ? '...' : ''}`);
      }
      
      // Generate only pages that need updating
      for (const { pageUrl, sectionName } of pagesToUpdate) {
        console.log(`\n📂 Processing section: ${sectionName}`);
        const result = await this.generatePageAgents(pageUrl, sectionName);
        
        if (result) {
          results.push(result);
        }
      }
      
      // Merge with existing results for pages that weren't updated
      const existingPages = pagesManifest?.pages || [];
      const updatedPages = [...results.map(r => ({
        topic: r.topic,
        filename: r.filename,
        section: r.section,
        url: r.url,
        generatedAt: new Date().toISOString()
      }))];
      
      // Add existing pages that weren't updated
      for (const existingPage of existingPages) {
        if (!pagesToUpdate.some(p => p.pageUrl === existingPage.url)) {
          updatedPages.push(existingPage);
        }
      }
      
      // Create summary
      const summary = {
        generatedAt: new Date().toISOString(),
        totalPages: totalPages,
        pagesUpdated: pagesToUpdate.length,
        pagesSkipped: pagesToSkip.length,
        generatedPages: updatedPages.length,
        pages: updatedPages
      };
      
      await fs.writeJson(path.join(PAGES_DIR, 'generation-summary.json'), summary, { spaces: 2 });
      
      console.log(`\n✅ Page generation complete:`);
      console.log(`   - Total pages: ${totalPages}`);
      console.log(`   - Pages updated: ${summary.pagesUpdated}`);
      console.log(`   - Pages skipped (up-to-date): ${summary.pagesSkipped}`);
      console.log(`   - Generated: ${summary.generatedPages} Quick References`);
      console.log(`   - Files saved to: ${PAGES_DIR}`);
      console.log(`   - Prompts saved to: ${PROMPTS_DIR}`);
      
      return results;
      
    } catch (error) {
      console.error('Error during page generation:', error);
      throw error;
    }
  }
}

// Run the page generator with Agents.md combination
if (require.main === module) {
  const generator = new PageAgentsGenerator();
  
  async function runGeneration() {
    try {
      // First, regenerate all individual quick reference files with clean bullet points
      console.log('Step 1: Regenerating individual quick reference files...');
      await generator.generateAllPages();
      
      // Then, combine them into a single Agents.md file
      console.log('\nStep 2: Combining into Agents.md...');
      await generator.combineQuickRefsIntoAgents();
      
      console.log('\n✅ Complete! Agents.md generated successfully.');
    } catch (error) {
      console.error('❌ Error during generation:', error);
      process.exit(1);
    }
  }
  
  runGeneration();
}

module.exports = { PageAgentsGenerator };
