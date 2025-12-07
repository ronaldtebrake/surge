#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const REPO_DIR = path.join(__dirname, '..', 'data', 'coding_standards');
const DOCS_DIR = path.join(REPO_DIR, 'docs');
const MANIFEST_FILE = path.join(__dirname, '..', 'data', 'repo-manifest.json');

/**
 * Calculate SHA-256 hash of file content
 */
function calculateContentHash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Get last modified date from git for a file
 */
async function getGitLastModified(filePath) {
  try {
    const { stdout } = await execAsync(
      `git log -1 --format="%aI" -- "${filePath}"`,
      { cwd: REPO_DIR }
    );
    const date = stdout.trim();
    return date || new Date().toISOString();
  } catch (error) {
    console.warn(`Could not get git date for ${filePath}:`, error.message);
    return new Date().toISOString();
  }
}

/**
 * Recursively find all markdown files in a directory
 */
async function findMarkdownFiles(dir, basePath = '') {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      // Skip hidden directories
      if (!entry.name.startsWith('.')) {
        const subFiles = await findMarkdownFiles(fullPath, relativePath);
        files.push(...subFiles);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push({
        fullPath,
        relativePath: relativePath.replace(/\\/g, '/') // Normalize path separators
      });
    }
  }
  
  return files;
}

/**
 * Extract a human-readable title from markdown content
 */
function extractTitle(content, filePath) {
  // Try to find first heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }
  
  // Fallback to filename
  const basename = path.basename(filePath, '.md');
  return basename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract the section/category from the file path
 */
function extractSection(relativePath) {
  const parts = relativePath.split('/');
  if (parts.length > 1) {
    // Return the directory name (e.g., 'php', 'css', 'javascript')
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  }
  return 'General';
}

/**
 * Discover all markdown files and build manifest
 */
async function discoverFiles() {
  console.log('🔍 Starting file discovery from coding_standards repository...');
  
  try {
    // Check if repo exists
    if (!await fs.pathExists(DOCS_DIR)) {
      throw new Error(`Docs directory not found: ${DOCS_DIR}. Did you initialize the submodule?`);
    }
    
    // Find all markdown files
    const markdownFiles = await findMarkdownFiles(DOCS_DIR);
    console.log(`Found ${markdownFiles.length} markdown files`);
    
    const manifest = {
      discoveredAt: new Date().toISOString(),
      repoPath: REPO_DIR,
      totalFiles: markdownFiles.length,
      files: {}
    };
    
    // Process each file
    for (const file of markdownFiles) {
      console.log(`  Processing: ${file.relativePath}`);
      
      // Read file content
      const content = await fs.readFile(file.fullPath, 'utf8');
      const contentHash = calculateContentHash(content);
      const stats = await fs.stat(file.fullPath);
      
      // Get git last modified date
      const relativeToDocs = file.relativePath;
      const gitPath = `docs/${relativeToDocs}`;
      const lastModified = await getGitLastModified(gitPath);
      
      // Extract metadata
      const title = extractTitle(content, file.relativePath);
      const section = extractSection(file.relativePath);
      
      manifest.files[file.relativePath] = {
        path: file.relativePath,
        fullPath: file.fullPath,
        title,
        section,
        lastModified,
        contentHash,
        size: stats.size
      };
    }
    
    // Ensure data directory exists
    await fs.ensureDir(path.dirname(MANIFEST_FILE));
    
    // Save manifest
    await fs.writeJson(MANIFEST_FILE, manifest, { spaces: 2 });
    
    console.log(`\n✅ File discovery complete:`);
    console.log(`   - Total files: ${manifest.totalFiles}`);
    console.log(`   - Manifest saved to: ${MANIFEST_FILE}`);
    
    // Log files by section
    const sections = {};
    for (const [filePath, info] of Object.entries(manifest.files)) {
      if (!sections[info.section]) {
        sections[info.section] = [];
      }
      sections[info.section].push(info.title);
    }
    
    console.log('\n📂 Files by section:');
    for (const [section, titles] of Object.entries(sections).sort()) {
      console.log(`   ${section}: ${titles.length} files`);
    }
    
    return manifest;
    
  } catch (error) {
    console.error('❌ Error during file discovery:', error);
    process.exit(1);
  }
}

// Run discovery
if (require.main === module) {
  discoverFiles().catch(console.error);
}

module.exports = { discoverFiles, calculateContentHash };

