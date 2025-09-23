#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs-extra');
const path = require('path');

const SITEMAP_URL = 'https://www.drupal.org/docs/develop/standards';
const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');

async function scrapeSitemap() {
  console.log('Starting sitemap scraping...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate to the Drupal coding standards page
    await page.goto(SITEMAP_URL, { waitUntil: 'networkidle' });
    
    // Extract section headers and their links
    const sections = await page.evaluate(() => {
      const result = {};
      
      // Find all section headers and their content
      const sectionElements = document.querySelectorAll('h2, h3, .field--name-body h2, .field--name-body h3');
      
      sectionElements.forEach(section => {
        const sectionTitle = section.textContent.trim();
        if (sectionTitle && !sectionTitle.includes('Table of contents')) {
          result[sectionTitle] = {};
          
          // Find links within this section
          let nextElement = section.nextElementSibling;
          while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'H3') {
            const links = nextElement.querySelectorAll('a[href*="/docs/develop/standards"]');
            links.forEach(link => {
              const href = link.href;
              const linkText = link.textContent.trim();
              if (href && linkText) {
                result[sectionTitle][href] = null; // Will be filled with last updated time
              }
            });
            nextElement = nextElement.nextElementSibling;
          }
        }
      });
      
      return result;
    });
    
    console.log(`Found ${Object.keys(sections).length} sections`);
    
    // Now scrape each link to get the last updated time
    for (const [sectionTitle, links] of Object.entries(sections)) {
      console.log(`Processing section: ${sectionTitle}`);
      
      for (const [url, _] of Object.entries(links)) {
        try {
          console.log(`  Scraping: ${url}`);
          await page.goto(url, { waitUntil: 'networkidle' });
          
          // Extract last updated time
          const lastUpdated = await page.evaluate(() => {
            // Look for common patterns of last updated information
            const selectors = [
              '.field--name-changed .field__item',
              '.field--name-created .field__item',
              '.node__meta .node__meta-item',
              '.field--name-body .last-updated',
              '.field--name-body .updated',
              'time[datetime]'
            ];
            
            for (const selector of selectors) {
              const element = document.querySelector(selector);
              if (element) {
                const text = element.textContent.trim();
                const dateMatch = text.match(/(\d{4}-\d{2}-\d{2})|(\d{1,2}\/\d{1,2}\/\d{4})|(\w+ \d{1,2}, \d{4})/);
                if (dateMatch) {
                  return text;
                }
              }
            }
            
            // Fallback: look for any date-like text in the content
            const content = document.querySelector('.field--name-body, .node__content, main');
            if (content) {
              const text = content.textContent;
              const dateMatch = text.match(/(\d{4}-\d{2}-\d{2})|(\d{1,2}\/\d{1,2}\/\d{4})|(\w+ \d{1,2}, \d{4})/);
              if (dateMatch) {
                return dateMatch[0];
              }
            }
            
            return 'Unknown';
          });
          
          sections[sectionTitle][url] = lastUpdated;
          console.log(`    Last updated: ${lastUpdated}`);
          
        } catch (error) {
          console.error(`    Error scraping ${url}:`, error.message);
          sections[sectionTitle][url] = 'Error';
        }
      }
    }
    
    // Ensure data directory exists
    await fs.ensureDir(path.dirname(SITEMAP_FILE));
    
    // Save sitemap
    await fs.writeJson(SITEMAP_FILE, sections, { spaces: 2 });
    console.log(`Sitemap saved to ${SITEMAP_FILE}`);
    
  } catch (error) {
    console.error('Error during sitemap scraping:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run the scraper
if (require.main === module) {
  scrapeSitemap().catch(console.error);
}

module.exports = { scrapeSitemap };
