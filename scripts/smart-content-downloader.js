#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const DOWNLOADS_DIR = path.join(__dirname, '..', 'data', 'downloads');
const MANIFEST_FILE = path.join(DOWNLOADS_DIR, 'download-manifest.json');

// Configuration for robust downloading
const DOWNLOAD_CONFIG = {
  delayBetweenRequests: 3000, // 3 seconds between requests
  maxRetries: 3,
  retryDelay: 5000, // 5 seconds between retries
  userAgents: [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  ]
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadPageWithRetry(url, filename, retryCount = 0) {
  const outputPath = path.join(DOWNLOADS_DIR, filename);
  const userAgent = DOWNLOAD_CONFIG.userAgents[retryCount % DOWNLOAD_CONFIG.userAgents.length];
  
  console.log(`Downloading: ${url} (attempt ${retryCount + 1})`);
  
  return new Promise((resolve, reject) => {
    // Sophisticated curl command for reliable downloading
    const curlCommand = `curl -A "${userAgent}" \
      -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7" \
      -H "Accept-Language: en-US,en;q=0.9" \
      -H "Accept-Encoding: gzip, deflate, br" \
      -H "DNT: 1" \
      -H "Connection: keep-alive" \
      -H "Upgrade-Insecure-Requests: 1" \
      -H "Sec-Fetch-Dest: document" \
      -H "Sec-Fetch-Mode: navigate" \
      -H "Sec-Fetch-Site: none" \
      -H "Sec-Fetch-User: ?1" \
      -H "Cache-Control: max-age=0" \
      -H "sec-ch-ua: \\"Not_A Brand\\";v=\\"8\\", \\"Chromium\\";v=\\"120\\", \\"Google Chrome\\";v=\\"120\\"" \
      -H "sec-ch-ua-mobile: ?0" \
      -H "sec-ch-ua-platform: \\"macOS\\"" \
      -L --compressed --cookie-jar /tmp/drupal_cookies_${Date.now()}.txt --cookie /tmp/drupal_cookies_${Date.now()}.txt \
      --max-time 30 --connect-timeout 10 \
      "${url}" -o "${outputPath}"`;
    
    exec(curlCommand, { maxBuffer: 10 * 1024 * 1024 }, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error downloading ${url}: ${error}`);
        if (retryCount < DOWNLOAD_CONFIG.maxRetries - 1) {
          console.log(`Retrying in ${DOWNLOAD_CONFIG.retryDelay}ms...`);
          await sleep(DOWNLOAD_CONFIG.retryDelay);
          return downloadPageWithRetry(url, filename, retryCount + 1).then(resolve).catch(reject);
        }
        return reject(error);
      }
      
      if (stderr) {
        console.warn(`curl stderr for ${url}: ${stderr}`);
      }
      
      // Check if we got an access denied page
      try {
        const content = await fs.readFile(outputPath, 'utf8');
        if (content.includes('Access to this page has been denied') || content.includes('Access denied')) {
          console.warn(`Access denied detected for ${url}`);
          if (retryCount < DOWNLOAD_CONFIG.maxRetries - 1) {
            console.log(`Retrying with different approach in ${DOWNLOAD_CONFIG.retryDelay}ms...`);
            await sleep(DOWNLOAD_CONFIG.retryDelay);
            return downloadPageWithRetry(url, filename, retryCount + 1).then(resolve).catch(reject);
          }
          return reject(new Error('Access denied - could not download content'));
        }
        
        // Check if content is too small (likely an error page)
        if (content.length < 1000) {
          console.warn(`Content too small for ${url} (${content.length} bytes)`);
          if (retryCount < DOWNLOAD_CONFIG.maxRetries - 1) {
            console.log(`Retrying in ${DOWNLOAD_CONFIG.retryDelay}ms...`);
            await sleep(DOWNLOAD_CONFIG.retryDelay);
            return downloadPageWithRetry(url, filename, retryCount + 1).then(resolve).catch(reject);
          }
        }
        
        console.log(`✓ Downloaded: ${filename} (${content.length} bytes)`);
        resolve(outputPath);
      } catch (readError) {
        console.error(`Error reading downloaded file: ${readError}`);
        reject(readError);
      }
    });
  });
}

function sanitizeFilename(url) {
  const urlParts = url.split('/');
  const lastPart = urlParts[urlParts.length - 1];
  
  const cleanName = lastPart
    .split('?')[0]
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${cleanName}.html`;
}

async function loadDownloadManifest() {
  try {
    if (await fs.pathExists(MANIFEST_FILE)) {
      return await fs.readJson(MANIFEST_FILE);
    }
  } catch (error) {
    console.warn('Could not load download manifest:', error);
  }
  
  return {
    lastDownload: null,
    files: {}
  };
}

async function saveDownloadManifest(manifest) {
  await fs.ensureDir(DOWNLOADS_DIR);
  await fs.writeJson(MANIFEST_FILE, manifest, { spaces: 2 });
}

async function needsUpdate(url, lastUpdated, manifest) {
  const filename = sanitizeFilename(url);
  const fileInfo = manifest.files[filename];
  
  if (!fileInfo) {
    return true; // New file
  }
  
  if (fileInfo.lastUpdated !== lastUpdated) {
    return true; // Updated timestamp
  }
  
  // Check if file exists and is valid
  const filePath = path.join(DOWNLOADS_DIR, filename);
  if (!await fs.pathExists(filePath)) {
    return true; // File missing
  }
  
  try {
    const content = await fs.readFile(filePath, 'utf8');
    if (content.includes('Access to this page has been denied') || content.includes('Access denied') || content.length < 1000) {
      return true; // Invalid content
    }
  } catch (error) {
    return true; // File corrupted
  }
  
  return false; // No update needed
}

async function downloadUpdatedPages() {
  console.log('Starting smart content download...');
  
  try {
    // Load sitemap
    const sitemap = await fs.readJson(SITEMAP_FILE);
    console.log(`Loaded sitemap with ${Object.keys(sitemap).length} sections`);
    
    // Load download manifest
    const manifest = await loadDownloadManifest();
    console.log('Loaded download manifest');
    
    // Ensure downloads directory exists
    await fs.ensureDir(DOWNLOADS_DIR);
    
    const downloadPromises = [];
    let totalPages = 0;
    let updatedPages = 0;
    let skippedPages = 0;
    
    // Process all pages from all sections
    for (const [sectionName, links] of Object.entries(sitemap)) {
      console.log(`\nProcessing section: ${sectionName}`);
      
      for (const [url, lastUpdated] of Object.entries(links)) {
        totalPages++;
        const filename = sanitizeFilename(url);
        
        if (await needsUpdate(url, lastUpdated, manifest)) {
          console.log(`  📥 Needs update: ${filename}`);
          updatedPages++;
          
          const downloadPromise = downloadPageWithRetry(url, filename)
            .then(async (outputPath) => {
              // Update manifest
              manifest.files[filename] = {
                url,
                lastUpdated,
                downloadedAt: new Date().toISOString(),
                section: sectionName,
                size: (await fs.stat(outputPath)).size
              };
              
              // Add delay between requests
              await sleep(DOWNLOAD_CONFIG.delayBetweenRequests);
            })
            .catch(error => {
              console.error(`Failed to download ${url}: ${error.message}`);
              // Still update manifest to track failed attempts
              manifest.files[filename] = {
                url,
                lastUpdated,
                downloadedAt: new Date().toISOString(),
                section: sectionName,
                error: error.message
              };
            });
          
          downloadPromises.push(downloadPromise);
        } else {
          console.log(`  ⏭ Skipped (up to date): ${filename}`);
          skippedPages++;
        }
      }
    }
    
    console.log(`\n📊 Download Summary:`);
    console.log(`   - Total pages: ${totalPages}`);
    console.log(`   - Need updates: ${updatedPages}`);
    console.log(`   - Skipped (up to date): ${skippedPages}`);
    
    if (updatedPages > 0) {
      console.log(`\n⏳ Downloading ${updatedPages} updated pages...`);
      console.log(`   (${DOWNLOAD_CONFIG.delayBetweenRequests}ms delay between requests)`);
      
      // Process downloads in batches to avoid overwhelming the server
      const batchSize = 5;
      for (let i = 0; i < downloadPromises.length; i += batchSize) {
        const batch = downloadPromises.slice(i, i + batchSize);
        await Promise.all(batch);
        
        if (i + batchSize < downloadPromises.length) {
          console.log(`\n⏸ Batch ${Math.floor(i / batchSize) + 1} complete, pausing...`);
          await sleep(DOWNLOAD_CONFIG.delayBetweenRequests * 2); // Longer pause between batches
        }
      }
    }
    
    // Update manifest with download info
    manifest.lastDownload = new Date().toISOString();
    manifest.totalPages = totalPages;
    manifest.updatedPages = updatedPages;
    manifest.skippedPages = skippedPages;
    
    await saveDownloadManifest(manifest);
    
    console.log(`\n✅ Smart download complete:`);
    console.log(`   - Updated: ${updatedPages} pages`);
    console.log(`   - Skipped: ${skippedPages} pages`);
    console.log(`   - Files saved to: ${DOWNLOADS_DIR}`);
    console.log(`   - Manifest saved to: ${MANIFEST_FILE}`);
    
  } catch (error) {
    console.error('Error during smart content download:', error);
    process.exit(1);
  }
}

// Run the smart downloader
if (require.main === module) {
  downloadUpdatedPages().catch(console.error);
}

module.exports = { downloadUpdatedPages };
