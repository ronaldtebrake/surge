#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');

const MARKDOWN_DIR = path.join(__dirname, '..', 'data', 'markdown');
const BULLETS_DIR = path.join(__dirname, '..', 'data', 'bullets');
const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const BULLETS_MANIFEST_FILE = path.join(BULLETS_DIR, 'bullets-manifest.json');

class BulletPointGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy'
    });
  }

  async convertToBulletPoints(markdownFile) {
    const markdownPath = path.join(MARKDOWN_DIR, markdownFile);
    const bulletsFile = markdownFile.replace('.md', '.bullets.md');
    const bulletsPath = path.join(BULLETS_DIR, bulletsFile);
    
    try {
      // Read markdown file
      const markdownContent = await fs.readFile(markdownPath, 'utf8');
      
      // Generate bullet points using AI
      const bulletPoints = await this.generateBulletPoints(markdownContent, markdownFile);
      
      // Write bullet points file
      await fs.writeFile(bulletsPath, bulletPoints, 'utf8');
      
      console.log(`✓ Converted: ${markdownFile} → ${bulletsFile}`);
      return { 
        markdownFile, 
        bulletsFile, 
        success: true, 
        lastProcessedAt: new Date().toISOString() 
      };
      
    } catch (error) {
      console.error(`Error converting ${markdownFile}:`, error);
      
      // Handle access denied errors by skipping the file
      if (error.message && error.message.startsWith('ACCESS_DENIED:')) {
        console.warn(`   ⚠️ Skipping ${markdownFile} due to access denied`);
        return { markdownFile, bulletsFile, success: false, error: error.message, skipped: true };
      }
      
      return { markdownFile, bulletsFile, success: false, error: error.message };
    }
  }

  async generateBulletPoints(markdownContent, filename) {
    // Check if we have a valid API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy') {
      // In CI environments, fail if no API key is provided
      if (process.env.CI || process.env.GITHUB_ACTIONS) {
        throw new Error(`OPENAI_API_KEY is required in CI environment but not provided. Cannot generate bullet points for ${filename}`);
      }
      
      console.log(`   ⚠️ No API key provided, using fallback for ${filename}`);
      return this.createFallbackBulletPoints(markdownContent, filename);
    }

    const prompt = `Convert the following Drupal documentation into comprehensive bullet points for AI coding agents. Focus on rules, guidelines, and standards that AI tools should follow when working with Drupal.

File: ${filename}

Requirements:
- Extract all rules, guidelines, and standards
- Convert them into clear, actionable bullet points
- Focus on what AI coding agents should do/avoid
- Remove examples and keep only the rules
- Use consistent formatting with bullet points
- Be comprehensive - include all relevant guidelines

Documentation content:
${markdownContent}

Generate bullet points that cover all the rules and guidelines from this documentation:`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert at converting technical documentation into clear, actionable bullet points for AI coding agents. Focus on extracting rules, guidelines, and standards that AI tools should follow."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3
      });

      return completion.choices[0].message.content;
      
    } catch (error) {
      console.error('Error generating bullet points:', error);
      
      // Check for access denied errors - skip file generation instead of failing
      const errorMessage = error.message?.toLowerCase() || '';
      if (errorMessage.includes('access denied') || errorMessage.includes('permission denied')) {
        console.warn(`   ⚠️ Access denied for ${filename}, skipping bullet point generation`);
        throw new Error(`ACCESS_DENIED: ${error.message}`);
      }
      
      // Check for critical API errors that should fail fast
      if (this.isCriticalApiError(error)) {
        throw new Error(`OpenAI API error: ${error.message}. This is a critical error that prevents AI generation. Please check your API key, billing, and rate limits.`);
      }
      
      // For non-critical errors, use fallback in local development
      if (process.env.CI || process.env.GITHUB_ACTIONS) {
        throw new Error(`OpenAI API error: ${error.message}. In CI environment, all API errors are treated as critical.`);
      }
      
      console.warn(`   ⚠️ API error, using fallback for ${filename}: ${error.message}`);
      return this.createFallbackBulletPoints(markdownContent, filename);
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
      'access denied',
      'account deactivated',
      'quota exceeded',
      'context length exceeded'
    ];
    
    return criticalPatterns.some(pattern => errorMessage.includes(pattern));
  }

  createFallbackBulletPoints(markdownContent, filename) {
    // Simple fallback that extracts headings and creates basic bullet points
    const lines = markdownContent.split('\n');
    const bulletPoints = [`# Bullet Points for ${filename}\n`];
    
    let currentSection = '';
    
    for (const line of lines) {
      if (line.startsWith('#')) {
        currentSection = line.replace(/^#+\s*/, '');
        bulletPoints.push(`\n## ${currentSection}`);
      } else if (line.trim() && !line.startsWith('```') && !line.startsWith('|')) {
        // Convert regular text to bullet points
        const cleanLine = line.trim().replace(/^[-*+]\s*/, '');
        if (cleanLine.length > 10) { // Only include substantial content
          bulletPoints.push(`- ${cleanLine}`);
        }
      }
    }
    
    return bulletPoints.join('\n');
  }

  async loadSitemap() {
    try {
      return await fs.readJson(SITEMAP_FILE);
    } catch (error) {
      console.warn('Could not load sitemap, processing all files:', error.message);
      return null;
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

  getUrlFromMarkdownFile(markdownFile, sitemap) {
    if (!sitemap) return null;
    
    // Convert markdown filename to URL pattern
    const baseName = markdownFile.replace('.md', '');
    
    // Search through all sections for matching URL
    for (const [sectionName, urls] of Object.entries(sitemap)) {
      for (const [url, lastModified] of Object.entries(urls)) {
        const urlBaseName = url.split('/').pop();
        if (urlBaseName === baseName) {
          return { url, lastModified, sectionName };
        }
      }
    }
    return null;
  }

  needsUpdate(markdownFile, sitemap, bulletsManifest) {
    if (!sitemap || !bulletsManifest) {
      return true; // If we can't determine, process it
    }

    const urlInfo = this.getUrlFromMarkdownFile(markdownFile, sitemap);
    if (!urlInfo) {
      return true; // If we can't find URL info, process it
    }

    // Find the last processed timestamp for this file
    const lastProcessed = bulletsManifest.results?.find(r => r.markdownFile === markdownFile);
    if (!lastProcessed) {
      return true; // Never processed before
    }

    // Compare timestamps
    const sitemapDate = new Date(urlInfo.lastModified);
    const processedDate = new Date(lastProcessed.lastProcessedAt || lastProcessed.convertedAt);
    
    return sitemapDate > processedDate;
  }

  async convertAllMarkdownToBullets() {
    console.log('Starting Markdown to Bullet Points conversion...');
    
    try {
      // Load sitemap and manifest for incremental updates
      const sitemap = await this.loadSitemap();
      const bulletsManifest = await this.loadBulletsManifest();
      
      // Ensure bullets directory exists
      await fs.ensureDir(BULLETS_DIR);
      
      // Get all markdown files
      const files = await fs.readdir(MARKDOWN_DIR);
      const markdownFiles = files.filter(file => file.endsWith('.md') && file !== 'conversion-manifest.json');
      
      // Determine which files need updating
      const filesToUpdate = [];
      const filesToSkip = [];
      
      for (const markdownFile of markdownFiles) {
        if (this.needsUpdate(markdownFile, sitemap, bulletsManifest)) {
          filesToUpdate.push(markdownFile);
        } else {
          filesToSkip.push(markdownFile);
        }
      }
      
      console.log(`Found ${markdownFiles.length} markdown files total`);
      console.log(`  - Need updates: ${filesToUpdate.length}`);
      console.log(`  - Up to date: ${filesToSkip.length}`);
      
      if (filesToSkip.length > 0) {
        console.log(`⏭ Skipping up-to-date files: ${filesToSkip.slice(0, 5).join(', ')}${filesToSkip.length > 5 ? '...' : ''}`);
      }
      
      const conversionResults = [];
      
      // Convert only files that need updating
      for (const markdownFile of filesToUpdate) {
        const result = await this.convertToBulletPoints(markdownFile);
        conversionResults.push(result);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Merge with existing results for files that weren't updated
      const existingResults = bulletsManifest?.results || [];
      const updatedResults = [...conversionResults];
      
      // Add existing results for files that weren't updated
      for (const existingResult of existingResults) {
        if (!filesToUpdate.includes(existingResult.markdownFile)) {
          updatedResults.push(existingResult);
        }
      }
      
      // Create conversion manifest
      const manifest = {
        convertedAt: new Date().toISOString(),
        totalFiles: markdownFiles.length,
        filesUpdated: filesToUpdate.length,
        filesSkipped: filesToSkip.length,
        successful: updatedResults.filter(r => r.success).length,
        failed: updatedResults.filter(r => !r.success && !r.skipped).length,
        skipped: updatedResults.filter(r => r.skipped).length,
        results: updatedResults
      };
      
      await fs.writeJson(path.join(BULLETS_DIR, 'bullets-manifest.json'), manifest, { spaces: 2 });
      
      console.log(`\n✅ Bullet points conversion complete:`);
      console.log(`   - Total files: ${manifest.totalFiles}`);
      console.log(`   - Files updated: ${manifest.filesUpdated}`);
      console.log(`   - Files skipped (up-to-date): ${manifest.filesSkipped}`);
      console.log(`   - Successful: ${manifest.successful}`);
      console.log(`   - Failed: ${manifest.failed}`);
      console.log(`   - Skipped (access denied): ${manifest.skipped}`);
      console.log(`   - Bullet point files saved to: ${BULLETS_DIR}`);
      
      if (manifest.failed > 0) {
        console.log('\nFailed conversions:');
        conversionResults.filter(r => !r.success).forEach(r => {
          console.log(`   - ${r.markdownFile}: ${r.error}`);
        });
      }
      
    } catch (error) {
      console.error('Error during Markdown to Bullet Points conversion:', error);
      process.exit(1);
    }
  }
}

// Run the converter
if (require.main === module) {
  const generator = new BulletPointGenerator();
  generator.convertAllMarkdownToBullets().catch(console.error);
}

module.exports = { BulletPointGenerator };
