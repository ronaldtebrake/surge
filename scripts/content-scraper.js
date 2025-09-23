#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');

const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const PAGES_DIR = path.join(__dirname, '..', 'data', 'pages');

class ContentScraper {
  constructor() {
    this.turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
  }

  async scrapeContent() {
    console.log('Starting content scraping...');
    
    // Load sitemap
    const sitemap = await fs.readJson(SITEMAP_FILE);
    console.log(`Loaded sitemap with ${Object.keys(sitemap).length} sections`);
    
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      // Ensure pages directory exists
      await fs.ensureDir(PAGES_DIR);
      
      // Load existing pages metadata
      const metadataFile = path.join(PAGES_DIR, 'metadata.json');
      let existingMetadata = {};
      if (await fs.pathExists(metadataFile)) {
        existingMetadata = await fs.readJson(metadataFile);
      }
      
      const newMetadata = {};
      let hasChanges = false;
      
      for (const [sectionTitle, links] of Object.entries(sitemap)) {
        console.log(`Processing section: ${sectionTitle}`);
        
        for (const [url, lastUpdated] of Object.entries(links)) {
          if (lastUpdated === 'Error') {
            console.log(`  Skipping ${url} (error in sitemap)`);
            continue;
          }
          
          const pageId = this.urlToPageId(url);
          const existingPage = existingMetadata[pageId];
          
          // Check if page needs updating
          if (existingPage && existingPage.lastUpdated === lastUpdated) {
            console.log(`  Skipping ${url} (no changes)`);
            newMetadata[pageId] = existingPage;
            continue;
          }
          
          console.log(`  Scraping: ${url}`);
          
          try {
            await page.goto(url, { waitUntil: 'networkidle' });
            
            // Extract page content
            const content = await page.evaluate(() => {
              // Try to find the main content area
              const selectors = [
                '.field--name-body',
                '.node__content',
                'main .content',
                'article',
                '.main-content'
              ];
              
              for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (element) {
                  return element.innerHTML;
                }
              }
              
              // Fallback to body content
              const body = document.querySelector('body');
              return body ? body.innerHTML : '';
            });
            
            // Convert HTML to Markdown
            const markdown = this.turndown.turndown(content);
            
            // Clean up the markdown
            const cleanedMarkdown = this.cleanMarkdown(markdown);
            
            // Save markdown file
            const filename = `${pageId}.md`;
            const filepath = path.join(PAGES_DIR, filename);
            await fs.writeFile(filepath, cleanedMarkdown);
            
            // Update metadata
            newMetadata[pageId] = {
              url,
              sectionTitle,
              lastUpdated,
              filename,
              scrapedAt: new Date().toISOString()
            };
            
            hasChanges = true;
            console.log(`    Saved: ${filename}`);
            
          } catch (error) {
            console.error(`    Error scraping ${url}:`, error.message);
            // Keep existing metadata if available
            if (existingPage) {
              newMetadata[pageId] = existingPage;
            }
          }
        }
      }
      
      // Save updated metadata
      await fs.writeJson(metadataFile, newMetadata, { spaces: 2 });
      
      if (hasChanges) {
        console.log('Content scraping completed with changes');
      } else {
        console.log('Content scraping completed - no changes detected');
      }
      
    } catch (error) {
      console.error('Error during content scraping:', error);
      process.exit(1);
    } finally {
      await browser.close();
    }
  }

  urlToPageId(url) {
    // Convert URL to a safe filename
    return url
      .replace('https://www.drupal.org/docs/develop/standards/', '')
      .replace(/\//g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase();
  }

  cleanMarkdown(markdown) {
    // Remove excessive whitespace
    let cleaned = markdown.replace(/\n{3,}/g, '\n\n');
    
    // Remove empty lines at the beginning and end
    cleaned = cleaned.trim();
    
    // Fix common markdown issues
    cleaned = cleaned.replace(/\*\*\s*\*\*/g, ''); // Remove empty bold
    cleaned = cleaned.replace(/\*\s*\*/g, ''); // Remove empty italic
    
    return cleaned;
  }
}

// Run the scraper
if (require.main === module) {
  const scraper = new ContentScraper();
  scraper.scrapeContent().catch(console.error);
}

module.exports = { ContentScraper };
