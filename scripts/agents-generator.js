#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');

const PAGES_DIR = path.join(__dirname, '..', 'data', 'pages');
const AGENTS_FILE = path.join(__dirname, '..', 'docs', 'Agents.md');

class AgentsGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateAgents() {
    console.log('Starting Agents.md generation...');
    
    // Load all markdown pages
    const pages = await this.loadPages();
    console.log(`Loaded ${pages.length} pages`);
    
    // Combine all content
    const combinedContent = this.combineContent(pages);
    
    // Generate Agents.md using OpenAI
    const agentsContent = await this.generateWithAI(combinedContent);
    
    // Ensure docs directory exists
    await fs.ensureDir(path.dirname(AGENTS_FILE));
    
    // Save Agents.md
    await fs.writeFile(AGENTS_FILE, agentsContent);
    console.log(`Agents.md saved to ${AGENTS_FILE}`);
  }

  async loadPages() {
    const metadataFile = path.join(PAGES_DIR, 'metadata.json');
    const metadata = await fs.readJson(metadataFile);
    
    const pages = [];
    
    for (const [pageId, pageData] of Object.entries(metadata)) {
      const filepath = path.join(PAGES_DIR, pageData.filename);
      
      if (await fs.pathExists(filepath)) {
        const content = await fs.readFile(filepath, 'utf8');
        pages.push({
          id: pageId,
          title: pageData.sectionTitle,
          url: pageData.url,
          content: content,
          lastUpdated: pageData.lastUpdated
        });
      }
    }
    
    return pages;
  }

  combineContent(pages) {
    let combined = '# Drupal Developer Documentation\n\n';
    combined += 'This document contains comprehensive information about Drupal coding standards and best practices.\n\n';
    
    // Group pages by section
    const sections = {};
    pages.forEach(page => {
      if (!sections[page.title]) {
        sections[page.title] = [];
      }
      sections[page.title].push(page);
    });
    
    // Add each section
    for (const [sectionTitle, sectionPages] of Object.entries(sections)) {
      combined += `## ${sectionTitle}\n\n`;
      
      sectionPages.forEach(page => {
        combined += `### ${this.extractTitleFromContent(page.content)}\n\n`;
        combined += `**Source:** ${page.url}\n`;
        combined += `**Last Updated:** ${page.lastUpdated}\n\n`;
        combined += page.content + '\n\n';
      });
    }
    
    return combined;
  }

  extractTitleFromContent(content) {
    // Try to extract a title from the markdown content
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.startsWith('# ')) {
        return line.replace('# ', '').trim();
      }
    }
    return 'Documentation Page';
  }

  async generateWithAI(content) {
    const prompt = `You are an expert Drupal developer and technical writer. I need you to create a comprehensive "Agents.md" file that serves as a complete reference for Drupal coding standards and best practices.

The content should be:
1. Well-structured with clear sections and subsections
2. Easy to navigate and reference
3. Comprehensive but concise
4. Include practical examples where appropriate
5. Focus on actionable guidelines for developers

Here is the raw Drupal documentation content to work with:

${content}

Please create a professional, well-formatted Agents.md file that consolidates and organizes this information into a single, comprehensive reference document. The file should be suitable for use as a developer handbook and should include:

- A clear table of contents
- Organized sections for different types of coding standards
- Code examples and best practices
- Common pitfalls to avoid
- Quick reference sections
- Links to original sources

Make sure the content is accurate, up-to-date, and follows markdown best practices.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert Drupal developer and technical writer specializing in creating comprehensive documentation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 8000,
        temperature: 0.3
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating content with AI:', error);
      // Fallback to basic content if AI fails
      return this.createFallbackContent(content);
    }
  }

  createFallbackContent(content) {
    return `# Drupal Coding Standards - Agents Reference

This document contains Drupal coding standards and best practices automatically generated from the official Drupal documentation.

## Table of Contents

- [Overview](#overview)
- [Coding Standards](#coding-standards)
- [Best Practices](#best-practices)
- [Quick Reference](#quick-reference)

## Overview

This reference document is automatically generated from the official Drupal documentation at https://www.drupal.org/docs/develop/standards.

## Coding Standards

${content}

## Quick Reference

For the most up-to-date information, always refer to the official Drupal documentation at https://www.drupal.org/docs/develop/standards.

---
*This document is automatically generated and updated based on changes to the official Drupal documentation.*
`;
  }
}

// Run the generator
if (require.main === module) {
  const generator = new AgentsGenerator();
  generator.generateAgents().catch(console.error);
}

module.exports = { AgentsGenerator };
