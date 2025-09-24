#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'data', 'pages');
const FINAL_AGENTS_FILE = path.join(__dirname, '..', 'docs', 'Agents.md');

class QuickRefMerger {
  constructor() {
    this.pages = [];
  }

  async loadPages() {
    try {
      const files = await fs.readdir(PAGES_DIR);
      const pageFiles = files.filter(file => file.endsWith('.md') && file !== 'generation-summary.json');
      
      for (const file of pageFiles) {
        const content = await fs.readFile(path.join(PAGES_DIR, file), 'utf8');
        const topic = this.extractTopicFromFilename(file);
        
        this.pages.push({
          topic: topic,
          filename: file,
          content: content
        });
      }
      
      // Sort pages alphabetically
      this.pages.sort((a, b) => a.topic.localeCompare(b.topic));
      
      console.log(`Loaded ${this.pages.length} Quick Reference pages`);
      return this.pages;
    } catch (error) {
      console.error('Error loading pages:', error);
      throw error;
    }
  }

  extractTopicFromFilename(filename) {
    return filename
      .replace('-quickref.md', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  generateProjectOverview() {
    return `# Drupal Coding Standards - Quick Reference for AI Agents

## Project Overview

This document provides a comprehensive Quick Reference for Drupal coding standards, specifically designed for AI-powered development tools and coding agents. It consolidates essential rules and guidelines from official Drupal documentation into actionable, scannable formats.

## Purpose

This Quick Reference serves as a complete guide for:
- **AI Coding Agents** (Cursor, Claude, Codex, etc.)
- **Development Tools** with AI integration
- **Automated Code Review** systems
- **Code Generation** tools

## How to Use

Each section below contains essential coding standards and guidelines in a Quick Reference format. AI agents should reference the relevant section when working with that particular technology or aspect of Drupal development.

## Documentation Sources

This document is automatically generated from official Drupal documentation:
- [Drupal Coding Standards](https://www.drupal.org/docs/develop/standards)
- [Drupal Developer Documentation](https://www.drupal.org/docs/develop)

---
`;
  }

  generateTableOfContents() {
    const toc = this.pages.map(page => {
      const anchor = page.topic.toLowerCase().replace(/\s+/g, '-');
      return `- [${page.topic}](#${anchor})`;
    }).join('\n');
    
    return `## Table of Contents\n\n${toc}\n`;
  }

  mergePages() {
    const projectOverview = this.generateProjectOverview();
    const tableOfContents = this.generateTableOfContents();
    
    // Process each page content
    const processedPages = this.pages.map(page => {
      let content = page.content;
      
      // Remove any existing project overview or TOC from individual pages
      content = content.replace(/^# .*?\n\n## Project Overview[\s\S]*?---\n\n/, '');
      content = content.replace(/^## Table of Contents[\s\S]*?\n\n/, '');
      
      // Ensure page has proper heading with anchor
      const anchor = page.topic.toLowerCase().replace(/\s+/g, '-');
      if (!content.startsWith('#')) {
        content = `# <a id="${anchor}"></a>${page.topic} - Quick Reference\n\n${content}`;
      } else {
        content = content.replace(/^# /, `# <a id="${anchor}"></a>`);
      }
      
      return content;
    });
    
    // Combine everything
    const mergedContent = [
      projectOverview,
      tableOfContents,
      ...processedPages
    ].join('\n\n');
    
    return mergedContent;
  }

  async saveMergedAgents(content) {
    try {
      await fs.ensureDir(path.dirname(FINAL_AGENTS_FILE));
      await fs.writeFile(FINAL_AGENTS_FILE, content);
      console.log(`✅ Merged Quick Reference Agents.md saved to: ${FINAL_AGENTS_FILE}`);
      console.log(`   - Total pages: ${this.pages.length}`);
      console.log(`   - File size: ${(content.length / 1024).toFixed(1)} KB`);
    } catch (error) {
      console.error('Error saving merged Agents.md:', error);
      throw error;
    }
  }

  async mergeAllPages() {
    console.log('🔄 Starting Quick Reference merge process...');
    
    try {
      // Load all pages
      await this.loadPages();
      
      if (this.pages.length === 0) {
        throw new Error('No page files found. Run page generation first.');
      }
      
      // Merge pages
      const mergedContent = this.mergePages();
      
      // Save merged file
      await this.saveMergedAgents(mergedContent);
      
      console.log('\n✅ Quick Reference merge process complete!');
      
      return {
        pagesCount: this.pages.length,
        fileSize: mergedContent.length,
        outputFile: FINAL_AGENTS_FILE
      };
      
    } catch (error) {
      console.error('Error during merge process:', error);
      throw error;
    }
  }
}

// Run the merger
if (require.main === module) {
  const merger = new QuickRefMerger();
  merger.mergeAllPages().catch(console.error);
}

module.exports = { QuickRefMerger };
