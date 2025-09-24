#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const SITEMAP_URL = 'https://www.drupal.org/docs/develop/standards';
const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const PAGE_CACHE_FILE = path.join(__dirname, '..', 'data', 'main-page.html');

async function downloadPage() {
  console.log('Downloading main page...');
  
  try {
    const { stdout } = await execAsync(`curl -s -L "${SITEMAP_URL}"`);
    await fs.writeFile(PAGE_CACHE_FILE, stdout);
    console.log('Page downloaded and cached');
    return stdout;
  } catch (error) {
    console.error('Error downloading page:', error);
    throw error;
  }
}

async function extractSitemapFromHTML(html) {
  console.log('Extracting sitemap from HTML...');
  
  // Simple HTML parsing using regex (since we know the structure)
  const sections = {};
  
  // Find all section elements
  const sectionRegex = /<section><h2><a href="([^"]+)">([^<]+)<\/a><\/h2>.*?<\/section>/gs;
  let match;
  
    while ((match = sectionRegex.exec(html)) !== null) {
      let sectionUrl = match[1];
      const sectionTitle = match[2];
      
      // Ensure URL is absolute
      if (sectionUrl && !sectionUrl.startsWith('http')) {
        sectionUrl = `https://www.drupal.org${sectionUrl}`;
      }
      
      if (sectionUrl && sectionTitle) {
        sections[sectionTitle] = {};
        sections[sectionTitle][sectionUrl] = new Date().toISOString().split('T')[0];
        
        // Extract links within this section
        const sectionContent = match[0];
        const linkRegex = /<a href="([^"]*\/docs\/develop\/(?:standards|coding-standards)[^"]*)"[^>]*>([^<]+)<\/a>/g;
        let linkMatch;
        
        while ((linkMatch = linkRegex.exec(sectionContent)) !== null) {
          let linkUrl = linkMatch[1];
          const linkText = linkMatch[2];
          
          // Ensure URL is absolute
          if (linkUrl && !linkUrl.startsWith('http')) {
            linkUrl = `https://www.drupal.org${linkUrl}`;
          }
          
          if (linkUrl && linkText && linkUrl !== sectionUrl) {
            sections[sectionTitle][linkUrl] = new Date().toISOString().split('T')[0];
          }
        }
      }
    }
  
  return sections;
}

async function getLastUpdatedDate(url) {
  try {
    console.log(`  Getting last updated for: ${url}`);
    const { stdout } = await execAsync(`curl -s -L "${url}" | grep -o 'id="last-updated-on"[^>]*>[^<]*' | head -1`);
    
    if (stdout.trim()) {
      // Extract date from the content
      const dateMatch = stdout.match(/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        return dateMatch[1];
      }
    }
    
    // Fallback: try to get from meta tags
    const { stdout: metaContent } = await execAsync(`curl -s -L "${url}" | grep -E 'meta.*(modified|updated|published).*content' | head -1`);
    const metaDateMatch = metaContent.match(/(\d{4}-\d{2}-\d{2})/);
    if (metaDateMatch) {
      return metaDateMatch[1];
    }
    
    return new Date().toISOString().split('T')[0];
  } catch (error) {
    console.log(`    Error getting date for ${url}: ${error.message}`);
    return new Date().toISOString().split('T')[0];
  }
}

async function updateDates(sections) {
  console.log('Updating last modified dates...');
  
  for (const [sectionTitle, links] of Object.entries(sections)) {
    console.log(`Processing section: ${sectionTitle}`);
    
    for (const [url, _] of Object.entries(links)) {
      const lastUpdated = await getLastUpdatedDate(url);
      sections[sectionTitle][url] = lastUpdated;
      console.log(`  ${url}: ${lastUpdated}`);
    }
  }
}

async function generateSitemap() {
  console.log('Starting sitemap generation...');
  
  try {
    // Download the main page
    const html = await downloadPage();
    
    // Extract sitemap from HTML
    const sections = await extractSitemapFromHTML(html);
    console.log(`Found ${Object.keys(sections).length} sections`);
    
    // Update dates for all URLs
    await updateDates(sections);
    
    // Ensure data directory exists
    await fs.ensureDir(path.dirname(SITEMAP_FILE));
    
    // Save sitemap
    await fs.writeJson(SITEMAP_FILE, sections, { spaces: 2 });
    console.log(`Sitemap saved to ${SITEMAP_FILE}`);
    console.log(`Total links: ${Object.values(sections).reduce((total, links) => total + Object.keys(links).length, 0)}`);
    
  } catch (error) {
    console.error('Error during sitemap generation:', error);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateSitemap().catch(console.error);
}

module.exports = { generateSitemap };