#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const DOWNLOADS_DIR = path.join(__dirname, '..', 'data', 'downloads');

async function downloadPage(url, filename) {
  console.log(`Downloading: ${url}`);
  return new Promise((resolve, reject) => {
    const outputPath = path.join(DOWNLOADS_DIR, filename);
    
    // Use curl with sophisticated headers for reliable downloading
    const curlCommand = `curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
      -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8" \
      -H "Accept-Language: en-US,en;q=0.9" \
      -H "Accept-Encoding: gzip, deflate, br" \
      -H "DNT: 1" \
      -H "Connection: keep-alive" \
      -H "Upgrade-Insecure-Requests: 1" \
      -H "Sec-Fetch-Dest: document" \
      -H "Sec-Fetch-Mode: navigate" \
      -H "Sec-Fetch-Site: none" \
      -H "Cache-Control: max-age=0" \
      -L --compressed --cookie-jar /tmp/drupal_cookies.txt --cookie /tmp/drupal_cookies.txt \
      "${url}" -o "${outputPath}"`;
    
    exec(curlCommand, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error downloading ${url}: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.warn(`curl stderr for ${url}: ${stderr}`);
      }
      console.log(`✓ Downloaded: ${filename}`);
      resolve(outputPath);
    });
  });
}

function sanitizeFilename(url) {
  // Extract the last part of the URL and sanitize it for filename
  const urlParts = url.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  
  // Remove query parameters and replace special characters
  const cleanName = lastPart
    .split('?')[0] // Remove query parameters
    .replace(/[^a-zA-Z0-9-]/g, '-') // Replace special chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  return `${cleanName}.html`;
}

async function downloadAllPages() {
  console.log('Starting content download...');
  
  try {
    // Load sitemap
    const sitemap = await fs.readJson(SITEMAP_FILE);
    console.log(`Loaded sitemap with ${Object.keys(sitemap).length} sections`);
    
    // Ensure downloads directory exists
    await fs.ensureDir(DOWNLOADS_DIR);
    
    // Clear existing downloads
    await fs.emptyDir(DOWNLOADS_DIR);
    console.log('Cleared existing downloads');
    
    const downloadPromises = [];
    let totalPages = 0;
    
    // Download all pages from all sections
    for (const [sectionName, links] of Object.entries(sitemap)) {
      console.log(`\nProcessing section: ${sectionName}`);
      
      for (const [url, lastUpdated] of Object.entries(links)) {
        const filename = sanitizeFilename(url);
        const downloadPromise = downloadPage(url, filename);
        downloadPromises.push(downloadPromise);
        totalPages++;
        
        // Add a small delay to be respectful to the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`\nDownloading ${totalPages} pages...`);
    
    // Wait for all downloads to complete
    await Promise.all(downloadPromises);
    
    console.log(`\n✅ Successfully downloaded ${totalPages} pages to ${DOWNLOADS_DIR}`);
    
    // Create a manifest file with metadata
    const manifest = {
      downloadedAt: new Date().toISOString(),
      totalPages,
      sections: Object.keys(sitemap).length,
      files: []
    };
    
    // List all downloaded files
    const files = await fs.readdir(DOWNLOADS_DIR);
    manifest.files = files.filter(file => file.endsWith('.html'));
    
    await fs.writeJson(path.join(DOWNLOADS_DIR, 'manifest.json'), manifest, { spaces: 2 });
    console.log('Created manifest.json with download metadata');
    
  } catch (error) {
    console.error('Error during content download:', error);
    process.exit(1);
  }
}

// Run the downloader
if (require.main === module) {
  downloadAllPages().catch(console.error);
}

module.exports = { downloadAllPages };
