#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const AGENTS_FILE = path.join(__dirname, '..', 'docs', 'Agents.md');
const INDEX_FILE = path.join(__dirname, '..', 'index.html');

/**
 * Update index.html to embed Agents.md content in a static script tag
 * Using type="text/markdown" means no JavaScript escaping is needed - it's just raw text
 */
async function updateIndex() {
  console.log('🔄 Updating index.html with Agents.md content...');

  try {
    // Read Agents.md content
    if (!await fs.pathExists(AGENTS_FILE)) {
      throw new Error(`Agents.md not found at ${AGENTS_FILE}. Run the pipeline first.`);
    }

    const agentsContent = await fs.readFile(AGENTS_FILE, 'utf8');
    
    // Remove raw tags (they're only needed for Jekyll, not for HTML)
    const cleanedContent = agentsContent
      .replace(/^{% raw %}\n?/m, '')
      .replace(/\n?{% endraw %}$/m, '');

    // Read current index.html
    const indexContent = await fs.readFile(INDEX_FILE, 'utf8');

    // Find the script tag with type="text/markdown"
    const scriptStart = indexContent.indexOf('<script type="text/markdown" id="agents-md-content">');
    if (scriptStart === -1) {
      throw new Error('Could not find agents-md-content script tag in index.html');
    }

    // Find the closing script tag
    const scriptEnd = indexContent.indexOf('</script>', scriptStart);
    if (scriptEnd === -1) {
      throw new Error('Could not find closing script tag for agents-md-content in index.html');
    }

    // Replace the content between the script tags
    // No escaping needed - it's just raw text in a non-JavaScript script tag
    const beforeScript = indexContent.substring(0, scriptStart + '<script type="text/markdown" id="agents-md-content">\n'.length);
    const afterScript = indexContent.substring(scriptEnd);
    
    const newIndexContent = beforeScript + cleanedContent + '\n' + afterScript;

    // Write updated index.html
    await fs.writeFile(INDEX_FILE, newIndexContent);
    console.log(`✅ Updated index.html with Agents.md content`);
    console.log(`   - Agents.md content embedded: ${(cleanedContent.length / 1024).toFixed(1)} KB`);
    console.log(`   - No JavaScript escaping needed - content is in a text/markdown script tag`);

  } catch (error) {
    console.error('❌ Error updating index.html:', error);
    process.exit(1);
  }
}

// Run update
if (require.main === module) {
  updateIndex().catch(console.error);
}

module.exports = { updateIndex };

