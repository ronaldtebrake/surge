#!/usr/bin/env node

// Polyfill for File global that undici expects
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {
    constructor(chunks, filename, options = {}) {
      this.name = filename;
      this.size = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this._chunks = chunks;
    }
    
    stream() {
      return new ReadableStream({
        start(controller) {
          for (const chunk of this._chunks) {
            controller.enqueue(chunk);
          }
          controller.close();
        }
      });
    }
    
    arrayBuffer() {
      return Promise.resolve(Buffer.concat(this._chunks).buffer);
    }
    
    text() {
      return Promise.resolve(Buffer.concat(this._chunks).toString());
    }
  };
}

const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const DOWNLOADS_DIR = path.join(__dirname, '..', 'data', 'downloads');
const MARKDOWN_DIR = path.join(__dirname, '..', 'data', 'markdown');
const MANIFEST_FILE = path.join(DOWNLOADS_DIR, 'download-manifest.json');

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

async function loadDownloadManifest() {
  try {
    if (await fs.pathExists(MANIFEST_FILE)) {
      return await fs.readJson(MANIFEST_FILE);
    }
  } catch (error) {
    console.warn('Could not load download manifest:', error);
  }
  
  return { files: {} };
}

function isAccessDenied(htmlFile, manifest) {
  const fileInfo = manifest.files[htmlFile];
  return fileInfo && fileInfo.accessDenied === true;
}

async function convertAllHtmlToMarkdown() {
  console.log('Starting HTML to Markdown conversion...');
  
  try {
    // Load download manifest to check for access denied files
    const manifest = await loadDownloadManifest();
    
    // Ensure markdown directory exists
    await fs.ensureDir(MARKDOWN_DIR);
    
    // Clear existing markdown files
    await fs.emptyDir(MARKDOWN_DIR);
    console.log('Cleared existing markdown files');
    
    // Get all HTML files
    const files = await fs.readdir(DOWNLOADS_DIR);
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    
    // Filter out access denied files
    const accessibleFiles = htmlFiles.filter(file => !isAccessDenied(file, manifest));
    const accessDeniedFiles = htmlFiles.filter(file => isAccessDenied(file, manifest));
    
    console.log(`Found ${htmlFiles.length} HTML files total`);
    console.log(`  - Accessible: ${accessibleFiles.length}`);
    console.log(`  - Access denied: ${accessDeniedFiles.length}`);
    
    if (accessDeniedFiles.length > 0) {
      console.log(`⏭ Skipping access denied files: ${accessDeniedFiles.slice(0, 3).join(', ')}${accessDeniedFiles.length > 3 ? '...' : ''}`);
    }
    
    const conversionResults = [];
    
    // Convert each accessible HTML file
    for (const htmlFile of accessibleFiles) {
      const result = await convertHtmlToMarkdown(htmlFile);
      conversionResults.push(result);
      
      // Small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    // Add skipped access denied files to results
    for (const htmlFile of accessDeniedFiles) {
      conversionResults.push({
        htmlFile,
        markdownFile: null,
        skipped: true,
        reason: 'Access denied during download'
      });
    }
    
    // Create conversion manifest
    const conversionManifest = {
      convertedAt: new Date().toISOString(),
      totalFiles: htmlFiles.length,
      accessibleFiles: accessibleFiles.length,
      accessDeniedFiles: accessDeniedFiles.length,
      successful: conversionResults.filter(r => r.markdownFile).length,
      failed: conversionResults.filter(r => r.error).length,
      skipped: conversionResults.filter(r => r.skipped).length,
      results: conversionResults
    };
    
    await fs.writeJson(path.join(MARKDOWN_DIR, 'conversion-manifest.json'), conversionManifest, { spaces: 2 });
    
    console.log(`\n✅ Conversion complete:`);
    console.log(`   - Total files: ${conversionManifest.totalFiles}`);
    console.log(`   - Accessible: ${conversionManifest.accessibleFiles}`);
    console.log(`   - Access denied: ${conversionManifest.accessDeniedFiles}`);
    console.log(`   - Successful: ${conversionManifest.successful}`);
    console.log(`   - Failed: ${conversionManifest.failed}`);
    console.log(`   - Skipped: ${conversionManifest.skipped}`);
    console.log(`   - Markdown files saved to: ${MARKDOWN_DIR}`);
    
    if (conversionManifest.failed > 0) {
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
