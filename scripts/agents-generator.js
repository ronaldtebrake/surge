#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');

const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const AGENTS_FILE = path.join(__dirname, '..', 'docs', 'Agents.md');

class AgentsGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async generateAgents() {
    console.log('Starting Agents.md generation...');

    // Load sitemap
    const sitemap = await fs.readJson(SITEMAP_FILE);
    console.log(`Loaded sitemap with ${Object.keys(sitemap).length} sections`);

    // Generate Agents.md content using sitemap data only
    const agentsContent = await this.generateContent(sitemap);

    // Ensure docs directory exists
    await fs.ensureDir(path.dirname(AGENTS_FILE));

    // Write Agents.md
    await fs.writeFile(AGENTS_FILE, agentsContent);
    console.log(`Agents.md generated at ${AGENTS_FILE}`);

    return agentsContent;
  }


  async generateContent(sitemap) {
    const prompt = this.buildSmartPrompt(sitemap);
    
    // Write prompt to file for review
    const promptFile = path.join(__dirname, '..', 'data', 'prompt.txt');
    await fs.ensureDir(path.dirname(promptFile));
    await fs.writeFile(promptFile, prompt);
    console.log(`Prompt written to ${promptFile} for review`);
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert Drupal developer and technical writer. Generate a comprehensive Agents.md file that follows the AGENTS.md standard for AI-powered development tools. Focus on Drupal coding standards, best practices, and development guidelines. Use your knowledge of Drupal to create detailed, practical content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating Agents.md:', error);
      
      // Fallback: generate a comprehensive Agents.md using sitemap data
      return this.generateComprehensiveContent(sitemap);
    }
  }

              buildSmartPrompt(sitemap) {
                // Create a detailed breakdown of the sitemap structure with full URLs
                const sectionsBreakdown = Object.entries(sitemap).map(([sectionName, links]) => {
                  const linkCount = Object.keys(links).length;
                  
                  // Create detailed link information with topic names
                  const linkDetails = Object.entries(links).map(([url, lastUpdated]) => {
                    const topic = url.split('/').pop().split('-')
                      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                      .join(' ');
                    return `- [${topic}](${url})`;
                  }).join('\n');
                  
                  return {
                    name: sectionName,
                    linkCount,
                    links: linkDetails
                  };
                });

    let prompt = `Generate a complete AGENTS.md file for Drupal development, following the AGENTS.md standard. This file is specifically for AI coding agents and development tools. Use the provided sitemap for structure and documentation links. Each section must include:

- Comprehensive rules and guidelines (clear, concise, actionable)
- Detailed bullet points to provide a complete picture

For reference on the AGENTS.md standard format, see: https://agents.md/

## Available Documentation Sections with Full Links:

            ${sectionsBreakdown.map(section => `
            ### ${section.name}
            - **Number of Pages**: ${section.linkCount}
            - **Documentation Links**:
            ${section.links}
            `).join('')}

## Requirements:

            ### Format & Structure:
            1. **Follow the AGENTS.md standard format** - Use the structure and conventions from https://agents.md/
            2. **Structure it logically** with clear sections, subsections, and proper markdown formatting
            3. **Add a table of contents** for easy navigation
            4. **Use consistent formatting** with proper markdown headers and lists

            ### Content Focus:
            5. **Include comprehensive Drupal coding standards** with clear guidelines and rules
            6. **Cover all areas from the provided documentation** with practical guidelines and best practices
            7. **Focus on guidelines and standards** - Do NOT include code examples, just the rules and standards

            ### AI Optimization:
            8. **Make it useful for AI-powered development tools** (Cursor, Claude, Codex, etc.)
            9. **Mark each section with clear actionable rules** that AI coding assistants should follow when generating or modifying code
            10. **Use extensive bullet points** to provide comprehensive coverage of each topic
            11. **Prioritize latest documentation** - When there are multiple Drupal documentation links for a section, prefer the most recently updated version

            ### Tone & Style:
            12. **Keep the tone professional, concise, and instructional** - Use plain English with minimal jargon
            13. **Use extensive bullet points** - Prefer bullet points over paragraphs for better scannability
            14. **Be comprehensive** - Include as many relevant rules and guidelines as needed to provide complete coverage

            ### Rules and Guidelines:
            15. **For each section, include comprehensive rules and guidelines** with detailed explanations and best practices
            16. **Make it comprehensive but well-organized and scannable** for quick reference

            ### Project Context:
            17. **Include a clear project overview** explaining what this Agents.md file is for
            18. **Emphasize standards and rules** rather than implementation examples

            Generate a complete, professional, and AI-optimized AGENTS.md file that is comprehensive, scannable, and actionable. Each section must include extensive rules, guidelines, and detailed bullet points. Include links to official Drupal documentation only in the table of contents. The result should serve AI coding agents and development tools.`;

    return prompt;
  }

  generateComprehensiveContent(sitemap) {
    const sections = Object.keys(sitemap);
    const totalPages = Object.values(sitemap).reduce((total, links) => total + Object.keys(links).length, 0);
    
    return `# Agents.md

This file provides comprehensive guidelines for AI-powered development tools working with Drupal projects.

## Overview

This Agents.md file is automatically generated from Drupal's official coding standards documentation, covering ${sections.length} main areas with ${totalPages} individual documentation pages.

## Drupal Coding Standards

### PHP Standards
- **PSR-4 Autoloading**: Follow PSR-4 autoloading standards for class loading
- **Namespaces**: Use proper namespacing conventions (\\Drupal\\module_name)
- **E_STRICT Compliance**: Write E_STRICT compliant code
- **API Documentation**: Follow Drupal's API documentation standards with proper @param, @return, @throws tags
- **Exceptions**: Use appropriate exception handling and custom exception classes
- **Service Naming**: Follow naming standards for services and extending Symfony components

### CSS Standards
- **BEM Methodology**: Use BEM (Block, Element, Modifier) methodology for CSS class naming
- **CSS Architecture**: Follow Drupal's CSS architecture guidelines for Drupal 9+
- **Formatting**: Use CSScomb for consistent CSS formatting and sorting
- **File Organization**: Organize CSS files according to Drupal standards
- **Review Guidelines**: Follow specific guidelines when reviewing CSS code

### JavaScript Standards
- **Modern JavaScript**: Follow modern JavaScript best practices and ES6+ features
- **JSDoc Documentation**: Use proper JSDoc documentation for functions and classes
- **Linting Tools**: Set up and use appropriate linting and fixing tools
- **jQuery Standards**: Follow Drupal's jQuery coding standards when using jQuery
- **API Documentation**: Follow JavaScript API documentation and comment standards

### Accessibility Standards
- **WCAG Compliance**: Follow WCAG 2.1 guidelines for accessibility
- **Semantic HTML**: Use proper semantic HTML elements
- **ARIA Attributes**: Implement ARIA attributes correctly
- **Keyboard Navigation**: Ensure proper keyboard navigation support
- **Screen Reader Support**: Test with screen readers and assistive technologies

### SQL Standards
- **Coding Conventions**: Follow Drupal's SQL coding conventions
- **Reserved Words**: Avoid using SQL reserved words in table/column names
- **Query Optimization**: Avoid SELECT * queries, use proper indexing
- **Naming Conventions**: Follow naming conventions for database objects

### Twig Standards
- **Template Organization**: Organize Twig templates properly
- **Naming Conventions**: Follow naming conventions for template files
- **Best Practices**: Use Twig best practices for performance and maintainability

### Markdown Standards
- **Documentation Formatting**: Follow proper Markdown formatting for documentation
- **Code Blocks**: Use appropriate code block syntax and language identifiers
- **Structure**: Organize documentation with proper headings and sections

### YAML Configuration
- **File Structure**: Follow proper YAML file structure and indentation
- **Validation**: Ensure YAML files are valid and properly formatted
- **Configuration Standards**: Follow Drupal's configuration file coding standards

### Composer Standards
- **Package Naming**: Follow Composer package naming conventions
- **Dependency Management**: Properly manage dependencies and versions
- **Autoloading**: Configure autoloading correctly

### Drupal Markup
- **HTML Structure**: Follow Drupal's markup style guide
- **Semantic Elements**: Use appropriate semantic HTML elements
- **Style Guide**: Follow the Drupal markup style guide

### Spelling Standards
- **Documentation Consistency**: Maintain consistent spelling and terminology
- **Terminology**: Use proper Drupal and technical terminology

## Available Documentation Sections

${sections.map(section => `- **${section}**`).join('\n')}

## Best Practices

1. **Always follow Drupal coding standards** - This is non-negotiable for Drupal development
2. **Use proper documentation and comments** - Document your code thoroughly
3. **Follow security best practices** - Security should be a primary concern
4. **Write testable code** - Make your code easy to test and maintain
5. **Use appropriate design patterns** - Follow established patterns and conventions
6. **Follow accessibility guidelines** - Ensure your code is accessible to all users
7. **Keep dependencies updated** - Regularly update Composer dependencies
8. **Use version control properly** - Follow Git best practices
9. **Code review everything** - Have all code reviewed before merging
10. **Performance matters** - Consider performance implications of your code

## Resources

- [Drupal Coding Standards](https://www.drupal.org/docs/develop/standards)
- [Drupal API Documentation](https://api.drupal.org)
- [Drupal Developer Guide](https://www.drupal.org/docs/develop)
- [Drupal Security](https://www.drupal.org/security)
- [Drupal Performance](https://www.drupal.org/docs/8/api/performance)

## Last Updated

This file is automatically generated and updated based on changes to Drupal's official coding standards documentation.

---

*This file is automatically generated from Drupal's official coding standards documentation.*`;
  }
}

// Run the generator
if (require.main === module) {
  const generator = new AgentsGenerator();
  generator.generateAgents().catch(console.error);
}

module.exports = { AgentsGenerator };