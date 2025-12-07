#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const AGENTS_FILE = path.join(__dirname, '..', 'docs', 'Agents.md');
const INDEX_FILE = path.join(__dirname, '..', 'index.html');

/**
 * Escape JavaScript string content for embedding in template literal
 */
function escapeForJavaScript(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

/**
 * Update index.html to embed Agents.md content in the agentsMarkdownContent variable
 */
async function updateIndex() {
  console.log('🔄 Updating index.html with Agents.md content...');

  try {
    // Read Agents.md content
    if (!await fs.pathExists(AGENTS_FILE)) {
      throw new Error(`Agents.md not found at ${AGENTS_FILE}. Run the pipeline first.`);
    }

    const agentsContent = await fs.readFile(AGENTS_FILE, 'utf8');
    
    // Remove raw tags for JavaScript (they're only needed for Jekyll)
    const cleanedContent = agentsContent
      .replace(/^{% raw %}\n?/m, '')
      .replace(/\n?{% endraw %}$/m, '');

    // Read current index.html
    const indexContent = await fs.readFile(INDEX_FILE, 'utf8');

    // Find the agentsMarkdownContent variable
    const agentsVarStart = indexContent.indexOf('const agentsMarkdownContent = `');
    if (agentsVarStart === -1) {
      throw new Error('Could not find agentsMarkdownContent variable in index.html');
    }

    // Find the end of the template literal (the closing backtick and semicolon)
    const agentsVarEnd = indexContent.indexOf('`;', agentsVarStart);
    if (agentsVarEnd === -1) {
      throw new Error('Could not find end of agentsMarkdownContent variable in index.html');
    }

    // Escape the content for JavaScript
    const escapedContent = escapeForJavaScript(cleanedContent);

    // Replace the variable content
    const beforeVar = indexContent.substring(0, agentsVarStart + 'const agentsMarkdownContent = `'.length);
    const afterVar = indexContent.substring(agentsVarEnd);
    
    const newIndexContent = beforeVar + escapedContent + afterVar;

    // Write updated index.html
    await fs.writeFile(INDEX_FILE, newIndexContent);
    console.log(`✅ Updated index.html with Agents.md content`);
    console.log(`   - Agents.md content embedded: ${(cleanedContent.length / 1024).toFixed(1)} KB`);

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
