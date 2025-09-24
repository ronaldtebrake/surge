#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');

const MARKDOWN_DIR = path.join(__dirname, '..', 'data', 'markdown');
const BULLETS_DIR = path.join(__dirname, '..', 'data', 'bullets');

class BulletPointGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
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
      return { markdownFile, bulletsFile, success: true };
      
    } catch (error) {
      console.error(`Error converting ${markdownFile}:`, error);
      return { markdownFile, bulletsFile, success: false, error: error.message };
    }
  }

  async generateBulletPoints(markdownContent, filename) {
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
      
      // Fallback: create basic bullet points from the content
      return this.createFallbackBulletPoints(markdownContent, filename);
    }
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

  async convertAllMarkdownToBullets() {
    console.log('Starting Markdown to Bullet Points conversion...');
    
    try {
      // Ensure bullets directory exists
      await fs.ensureDir(BULLETS_DIR);
      
      // Clear existing bullet files
      await fs.emptyDir(BULLETS_DIR);
      console.log('Cleared existing bullet point files');
      
      // Get all markdown files
      const files = await fs.readdir(MARKDOWN_DIR);
      const markdownFiles = files.filter(file => file.endsWith('.md') && file !== 'conversion-manifest.json');
      
      console.log(`Found ${markdownFiles.length} markdown files to convert`);
      
      const conversionResults = [];
      
      // Convert each markdown file
      for (const markdownFile of markdownFiles) {
        const result = await this.convertToBulletPoints(markdownFile);
        conversionResults.push(result);
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Create conversion manifest
      const manifest = {
        convertedAt: new Date().toISOString(),
        totalFiles: markdownFiles.length,
        successful: conversionResults.filter(r => r.success).length,
        failed: conversionResults.filter(r => !r.success).length,
        results: conversionResults
      };
      
      await fs.writeJson(path.join(BULLETS_DIR, 'bullets-manifest.json'), manifest, { spaces: 2 });
      
      console.log(`\n✅ Bullet points conversion complete:`);
      console.log(`   - Total files: ${manifest.totalFiles}`);
      console.log(`   - Successful: ${manifest.successful}`);
      console.log(`   - Failed: ${manifest.failed}`);
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
