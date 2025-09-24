#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'data', 'downloads');
const MARKDOWN_DIR = path.join(__dirname, '..', 'data', 'markdown');

// Configure turndown service for better markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full'
});

// Add custom rules for better Drupal documentation conversion
turndownService.addRule('drupalCodeBlocks', {
  filter: ['pre', 'code'],
  replacement: function (content, node) {
    if (node.tagName === 'PRE') {
      const codeElement = node.querySelector('code');
      const language = codeElement ? codeElement.className.match(/language-(\w+)/) : null;
      const lang = language ? language[1] : '';
      return `\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
    }
    return `\`${content}\``;
  }
});

turndownService.addRule('drupalTables', {
  filter: 'table',
  replacement: function (content, node) {
    return `\n${content}\n\n`;
  }
});

async function convertHtmlToMarkdown(htmlFile) {
  const htmlPath = path.join(DOWNLOADS_DIR, htmlFile);
  const markdownFile = htmlFile.replace('.html', '.md');
  const markdownPath = path.join(MARKDOWN_DIR, markdownFile);
  
  try {
    // Read HTML file
    const htmlContent = await fs.readFile(htmlPath, 'utf8');
    
    // Load with cheerio for processing
    const $ = cheerio.load(htmlContent);
    
    // Remove unwanted elements
    $('script, style, nav, .breadcrumb, .tabs, .pager, .comments, .node__meta, .ad-explanation, .carbon-ad, .panel-pane.pane-block.pane-drupalorg-carbon-ad-sidebar').remove();
    
    // Focus on main content area - try multiple selectors for Drupal
    let mainContent = $('.node__content, .field--name-body, #content .content, .panel-pane .pane-content, main, .main-content, article');
    
    // If no main content found, use body
    if (mainContent.length === 0) {
      mainContent = $('body');
    }
    
    // Extract title
    const title = $('h1').first().text().trim() || 
                  $('title').text().trim() || 
                  'Untitled Document';
    
    // Convert to markdown
    const markdownContent = turndownService.turndown(mainContent.html() || htmlContent);
    
    // Clean up the markdown
    const cleanedMarkdown = cleanMarkdown(markdownContent);
    
    // Create final markdown with title
    const finalMarkdown = `# ${title}\n\n${cleanedMarkdown}`;
    
    // Write markdown file
    await fs.writeFile(markdownPath, finalMarkdown, 'utf8');
    
    console.log(`✓ Converted: ${htmlFile} → ${markdownFile}`);
    return { htmlFile, markdownFile, title };
    
  } catch (error) {
    console.error(`Error converting ${htmlFile}:`, error);
    return { htmlFile, markdownFile: null, error: error.message };
  }
}

function cleanMarkdown(markdown) {
  return markdown
    // Remove excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Fix code blocks
    .replace(/```\n\n/g, '```\n')
    .replace(/\n\n```/g, '\n```')
    // Remove empty lines at start/end
    .trim();
}

async function convertAllHtmlToMarkdown() {
  console.log('Starting HTML to Markdown conversion...');
  
  try {
    // Ensure markdown directory exists
    await fs.ensureDir(MARKDOWN_DIR);
    
    // Clear existing markdown files
    await fs.emptyDir(MARKDOWN_DIR);
    console.log('Cleared existing markdown files');
    
    // Get all HTML files
    const files = await fs.readdir(DOWNLOADS_DIR);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    console.log(`Found ${htmlFiles.length} HTML files to convert`);
    
    const conversionResults = [];
    
    // Convert each HTML file
    for (const htmlFile of htmlFiles) {
      const result = await convertHtmlToMarkdown(htmlFile);
      conversionResults.push(result);
      
      // Small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    // Create conversion manifest
    const manifest = {
      convertedAt: new Date().toISOString(),
      totalFiles: htmlFiles.length,
      successful: conversionResults.filter(r => r.markdownFile).length,
      failed: conversionResults.filter(r => r.error).length,
      results: conversionResults
    };
    
    await fs.writeJson(path.join(MARKDOWN_DIR, 'conversion-manifest.json'), manifest, { spaces: 2 });
    
    console.log(`\n✅ Conversion complete:`);
    console.log(`   - Total files: ${manifest.totalFiles}`);
    console.log(`   - Successful: ${manifest.successful}`);
    console.log(`   - Failed: ${manifest.failed}`);
    console.log(`   - Markdown files saved to: ${MARKDOWN_DIR}`);
    
    if (manifest.failed > 0) {
      console.log('\nFailed conversions:');
      conversionResults.filter(r => r.error).forEach(r => {
        console.log(`   - ${r.htmlFile}: ${r.error}`);
      });
    }
    
  } catch (error) {
    console.error('Error during HTML to Markdown conversion:', error);
    process.exit(1);
  }
}

// Run the converter
if (require.main === module) {
  convertAllHtmlToMarkdown().catch(console.error);
}

module.exports = { convertAllHtmlToMarkdown };
