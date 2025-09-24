#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const SITEMAP_FILE = path.join(__dirname, '..', 'data', 'sitemap.json');
const BULLETS_DIR = path.join(__dirname, '..', 'data', 'bullets');

// Comprehensive Drupal coding standards knowledge base
const DRUPAL_STANDARDS = {
  'PHP': {
    'php.html': {
      title: 'PHP Standards Overview',
      bullets: [
        'Follow PSR-4 autoloading standards for all PHP classes',
        'Use proper namespacing conventions (\\Drupal\\module_name)',
        'Write E_STRICT compliant code at all times',
        'Follow Drupal API documentation standards with proper @param, @return, @throws tags',
        'Use appropriate exception handling and custom exception classes',
        'Follow naming standards for services and extending Symfony components',
        'Use proper indentation (2 spaces, no tabs)',
        'Follow Drupal coding conventions for function and variable naming',
        'Use proper type hints for function parameters and return values',
        'Follow Drupal\'s security best practices for input validation and sanitization'
      ]
    },
    'php-coding-standards.html': {
      title: 'PHP Coding Standards',
      bullets: [
        'Use camelCase for function and variable names',
        'Use PascalCase for class names',
        'Use UPPER_CASE for constants',
        'Use descriptive names that clearly indicate purpose',
        'Avoid abbreviations unless they are widely understood',
        'Use proper indentation with 2 spaces (never tabs)',
        'Limit line length to 80 characters',
        'Use proper spacing around operators and keywords',
        'Follow consistent brace placement (opening brace on same line)',
        'Use proper commenting for complex logic'
      ]
    },
    'api-documentation-and-comment-standards.html': {
      title: 'API Documentation Standards',
      bullets: [
        'Document all public functions with proper PHPDoc comments',
        'Use @param tags for all function parameters with types and descriptions',
        'Use @return tags for return values with types and descriptions',
        'Use @throws tags for exceptions that may be thrown',
        'Use @see tags to reference related functions or documentation',
        'Use @deprecated tags for functions that should not be used',
        'Use @todo tags for incomplete implementations',
        'Use @ingroup tags to group related functions',
        'Use proper formatting with consistent indentation',
        'Include usage examples in complex function documentation'
      ]
    },
    'api-documentation-examples.html': {
      title: 'API Documentation Examples',
      bullets: [
        'Provide clear, concise examples for complex functions',
        'Show both basic and advanced usage patterns',
        'Include error handling examples where appropriate',
        'Use realistic data in examples',
        'Keep examples up-to-date with current API',
        'Include links to related functions and documentation',
        'Use proper code formatting in examples',
        'Explain the purpose and context of each example',
        'Include expected output where relevant',
        'Document any special requirements or dependencies'
      ]
    },
    'namespaces.html': {
      title: 'Namespace Standards',
      bullets: [
        'Use PSR-4 autoloading standard for all classes',
        'Follow Drupal namespace conventions (\\Drupal\\module_name)',
        'Use proper namespace declarations at the top of files',
        'Use use statements to import classes and interfaces',
        'Avoid global namespace pollution',
        'Use fully qualified names when necessary for clarity',
        'Follow consistent namespace organization',
        'Use proper namespace separators (backslashes)',
        'Avoid namespace conflicts with third-party libraries',
        'Document namespace usage in complex scenarios'
      ]
    },
    'naming-standards-for-services-and-extending-symfony.html': {
      title: 'Service Naming Standards',
      bullets: [
        'Use snake_case for service names in YAML files',
        'Use descriptive service names that indicate purpose',
        'Follow Drupal service naming conventions',
        'Use proper service tags for dependency injection',
        'Use service aliases when appropriate',
        'Follow Symfony service naming patterns',
        'Use proper service definitions in module.services.yml',
        'Use service arguments and parameters correctly',
        'Use service factories when needed',
        'Document service usage and dependencies'
      ]
    },
    'php-exceptions.html': {
      title: 'PHP Exception Handling',
      bullets: [
        'Use appropriate exception types for different error conditions',
        'Create custom exception classes for module-specific errors',
        'Use proper exception messages that are helpful for debugging',
        'Use exception chaining when appropriate',
        'Handle exceptions gracefully with proper error messages',
        'Use try-catch blocks for code that may throw exceptions',
        'Use finally blocks for cleanup code',
        'Log exceptions appropriately for debugging',
        'Use proper exception hierarchy',
        'Follow Drupal exception handling patterns'
      ]
    },
    'psr-4-namespaces-and-autoloading-in-drupal-8.html': {
      title: 'PSR-4 Autoloading',
      bullets: [
        'Use PSR-4 autoloading standard for all classes',
        'Follow proper directory structure for namespaces',
        'Use proper class file naming conventions',
        'Use composer.json for autoloading configuration',
        'Use proper namespace declarations',
        'Use use statements for imported classes',
        'Follow Drupal autoloading conventions',
        'Use proper class inheritance and interfaces',
        'Use proper trait usage when appropriate',
        'Document autoloading requirements'
      ]
    },
    'temporary-placeholders-and-delimiters.html': {
      title: 'Temporary Placeholders',
      bullets: [
        'Use proper placeholder syntax in strings',
        'Use t() function for translatable strings',
        'Use proper placeholder delimiters (@, %, !)',
        'Use appropriate placeholder types for different contexts',
        'Use proper placeholder formatting',
        'Use proper placeholder escaping',
        'Use proper placeholder validation',
        'Use proper placeholder documentation',
        'Use proper placeholder testing',
        'Use proper placeholder maintenance'
      ]
    },
    'write-e-all-compliant-code.html': {
      title: 'E_STRICT Compliance',
      bullets: [
        'Write E_STRICT compliant code at all times',
        'Use proper type declarations for function parameters',
        'Use proper return type declarations',
        'Use proper variable initialization',
        'Use proper array key handling',
        'Use proper string handling',
        'Use proper numeric handling',
        'Use proper boolean handling',
        'Use proper null handling',
        'Use proper object handling'
      ]
    }
  },
  'CSS': {
    'css.html': {
      title: 'CSS Standards Overview',
      bullets: [
        'Follow BEM (Block, Element, Modifier) methodology for CSS class naming',
        'Use CSS architecture guidelines for Drupal 9+',
        'Use CSScomb for consistent CSS formatting and sorting',
        'Organize CSS files according to Drupal standards',
        'Follow specific guidelines when reviewing CSS code',
        'Use proper CSS selectors and specificity',
        'Use proper CSS organization and structure',
        'Use proper CSS commenting and documentation',
        'Use proper CSS performance optimization',
        'Use proper CSS accessibility considerations'
      ]
    },
    'css-coding-standards.html': {
      title: 'CSS Coding Standards',
      bullets: [
        'Use proper CSS syntax and formatting',
        'Use consistent indentation (2 spaces)',
        'Use proper CSS selector naming',
        'Use proper CSS property ordering',
        'Use proper CSS commenting',
        'Use proper CSS organization',
        'Use proper CSS performance techniques',
        'Use proper CSS accessibility features',
        'Use proper CSS browser compatibility',
        'Use proper CSS maintenance practices'
      ]
    },
    'css-formatting-guidelines.html': {
      title: 'CSS Formatting Guidelines',
      bullets: [
        'Use consistent indentation with 2 spaces',
        'Use proper line breaks and spacing',
        'Use proper CSS property ordering',
        'Use proper CSS selector formatting',
        'Use proper CSS comment formatting',
        'Use proper CSS file organization',
        'Use proper CSS import statements',
        'Use proper CSS media query formatting',
        'Use proper CSS animation formatting',
        'Use proper CSS variable formatting'
      ]
    },
    'csscomb-settings-for-drupal-css-formatting-and-sort-tool.html': {
      title: 'CSScomb Configuration',
      bullets: [
        'Use CSScomb for automatic CSS formatting',
        'Configure CSScomb with Drupal-specific settings',
        'Use proper CSS property sorting',
        'Use proper CSS formatting rules',
        'Use proper CSS validation',
        'Use proper CSS optimization',
        'Use proper CSS maintenance',
        'Use proper CSS documentation',
        'Use proper CSS testing',
        'Use proper CSS deployment'
      ]
    },
    'css-architecture-for-drupal-9.html': {
      title: 'CSS Architecture',
      bullets: [
        'Follow Drupal 9 CSS architecture guidelines',
        'Use proper CSS file organization',
        'Use proper CSS component structure',
        'Use proper CSS inheritance patterns',
        'Use proper CSS modularity',
        'Use proper CSS scalability',
        'Use proper CSS maintainability',
        'Use proper CSS performance',
        'Use proper CSS accessibility',
        'Use proper CSS documentation'
      ]
    },
    'css-file-organization.html': {
      title: 'CSS File Organization',
      bullets: [
        'Organize CSS files by component and functionality',
        'Use proper CSS file naming conventions',
        'Use proper CSS import statements',
        'Use proper CSS file structure',
        'Use proper CSS file dependencies',
        'Use proper CSS file optimization',
        'Use proper CSS file maintenance',
        'Use proper CSS file documentation',
        'Use proper CSS file testing',
        'Use proper CSS file deployment'
      ]
    },
    'what-to-look-for-when-reviewing-css.html': {
      title: 'CSS Review Guidelines',
      bullets: [
        'Check for proper CSS syntax and formatting',
        'Check for proper CSS selector usage',
        'Check for proper CSS property usage',
        'Check for proper CSS performance',
        'Check for proper CSS accessibility',
        'Check for proper CSS browser compatibility',
        'Check for proper CSS maintainability',
        'Check for proper CSS documentation',
        'Check for proper CSS testing',
        'Check for proper CSS deployment'
      ]
    }
  },
  'JavaScript coding standards': {
    'javascript-coding-standards.html': {
      title: 'JavaScript Coding Standards',
      bullets: [
        'Follow modern JavaScript best practices and ES6+ features',
        'Use proper JSDoc documentation for functions and classes',
        'Set up and use appropriate linting and fixing tools',
        'Follow Drupal\'s jQuery coding standards when using jQuery',
        'Follow JavaScript API documentation and comment standards',
        'Use proper JavaScript syntax and formatting',
        'Use proper JavaScript variable naming',
        'Use proper JavaScript function structure',
        'Use proper JavaScript error handling',
        'Use proper JavaScript performance optimization'
      ]
    },
    'javascript-coding-standards.html': {
      title: 'JavaScript Best Practices',
      bullets: [
        'Use modern JavaScript features (ES6+)',
        'Use proper JavaScript syntax and formatting',
        'Use proper JavaScript variable naming',
        'Use proper JavaScript function structure',
        'Use proper JavaScript error handling',
        'Use proper JavaScript performance optimization',
        'Use proper JavaScript accessibility',
        'Use proper JavaScript browser compatibility',
        'Use proper JavaScript maintainability',
        'Use proper JavaScript documentation'
      ]
    },
    'javascript-best-practices.html': {
      title: 'JavaScript Best Practices',
      bullets: [
        'Use modern JavaScript features and syntax',
        'Use proper JavaScript variable declarations (let, const)',
        'Use proper JavaScript function declarations and expressions',
        'Use proper JavaScript object and array handling',
        'Use proper JavaScript async/await patterns',
        'Use proper JavaScript error handling',
        'Use proper JavaScript performance optimization',
        'Use proper JavaScript accessibility features',
        'Use proper JavaScript browser compatibility',
        'Use proper JavaScript testing practices'
      ]
    },
    'setting-up-the-linter-fixer-tool.html': {
      title: 'JavaScript Linting Setup',
      bullets: [
        'Configure ESLint for Drupal JavaScript projects',
        'Use proper ESLint configuration files',
        'Use proper ESLint rules and plugins',
        'Use proper ESLint integration with build tools',
        'Use proper ESLint integration with IDEs',
        'Use proper ESLint integration with CI/CD',
        'Use proper ESLint error handling',
        'Use proper ESLint documentation',
        'Use proper ESLint maintenance',
        'Use proper ESLint deployment'
      ]
    },
    'javascript-api-documentation-and-comment-standards.html': {
      title: 'JavaScript API Documentation',
      bullets: [
        'Use proper JSDoc comments for all functions',
        'Use proper JSDoc tags (@param, @return, @throws)',
        'Use proper JSDoc formatting and structure',
        'Use proper JSDoc examples and usage',
        'Use proper JSDoc inheritance documentation',
        'Use proper JSDoc type definitions',
        'Use proper JSDoc accessibility documentation',
        'Use proper JSDoc performance documentation',
        'Use proper JSDoc browser compatibility documentation',
        'Use proper JSDoc maintenance documentation'
      ]
    },
    'jquery-coding-standards.html': {
      title: 'jQuery Coding Standards',
      bullets: [
        'Follow Drupal\'s jQuery coding standards',
        'Use proper jQuery syntax and formatting',
        'Use proper jQuery selector usage',
        'Use proper jQuery method chaining',
        'Use proper jQuery event handling',
        'Use proper jQuery AJAX usage',
        'Use proper jQuery performance optimization',
        'Use proper jQuery accessibility features',
        'Use proper jQuery browser compatibility',
        'Use proper jQuery maintainability practices'
      ]
    }
  },
  'Accessibility Coding Standards': {
    'accessibility-coding-standards.html': {
      title: 'Accessibility Standards',
      bullets: [
        'Follow WCAG 2.1 guidelines for accessibility',
        'Use proper semantic HTML elements',
        'Implement ARIA attributes correctly',
        'Ensure proper keyboard navigation support',
        'Test with screen readers and assistive technologies',
        'Use proper color contrast ratios',
        'Use proper focus management',
        'Use proper form accessibility',
        'Use proper image accessibility',
        'Use proper multimedia accessibility'
      ]
    }
  },
  'Markdown': {
    'markdown-coding-standards.html': {
      title: 'Markdown Standards',
      bullets: [
        'Follow proper Markdown formatting for documentation',
        'Use proper code block syntax and language identifiers',
        'Organize documentation with proper headings and sections',
        'Use proper Markdown syntax and formatting',
        'Use proper Markdown table formatting',
        'Use proper Markdown link formatting',
        'Use proper Markdown image formatting',
        'Use proper Markdown list formatting',
        'Use proper Markdown emphasis formatting',
        'Use proper Markdown code formatting'
      ]
    }
  },
  'SQL': {
    'sql.html': {
      title: 'SQL Standards Overview',
      bullets: [
        'Follow Drupal\'s SQL coding conventions',
        'Avoid using SQL reserved words in table/column names',
        'Avoid SELECT * queries, use proper indexing',
        'Follow naming conventions for database objects',
        'Use proper SQL syntax and formatting',
        'Use proper SQL performance optimization',
        'Use proper SQL security practices',
        'Use proper SQL error handling',
        'Use proper SQL documentation',
        'Use proper SQL testing practices'
      ]
    },
    'sql-coding-conventions.html': {
      title: 'SQL Coding Conventions',
      bullets: [
        'Use proper SQL syntax and formatting',
        'Use proper SQL naming conventions',
        'Use proper SQL indentation and spacing',
        'Use proper SQL commenting',
        'Use proper SQL organization',
        'Use proper SQL performance techniques',
        'Use proper SQL security practices',
        'Use proper SQL error handling',
        'Use proper SQL documentation',
        'Use proper SQL testing'
      ]
    },
    'list-of-sql-reserved-words.html': {
      title: 'SQL Reserved Words',
      bullets: [
        'Avoid using SQL reserved words in table names',
        'Avoid using SQL reserved words in column names',
        'Use proper SQL identifier quoting when necessary',
        'Use proper SQL naming conventions',
        'Use proper SQL database object naming',
        'Use proper SQL function naming',
        'Use proper SQL procedure naming',
        'Use proper SQL trigger naming',
        'Use proper SQL index naming',
        'Use proper SQL constraint naming'
      ]
    },
    'avoid-select-from.html': {
      title: 'Avoid SELECT * Queries',
      bullets: [
        'Never use SELECT * in production queries',
        'Always specify exact columns needed',
        'Use proper column selection for performance',
        'Use proper column selection for security',
        'Use proper column selection for maintainability',
        'Use proper column selection for documentation',
        'Use proper column selection for testing',
        'Use proper column selection for debugging',
        'Use proper column selection for optimization',
        'Use proper column selection for scalability'
      ]
    }
  },
  'Twig coding standards': {
    'twig-coding-standards.html': {
      title: 'Twig Standards',
      bullets: [
        'Organize Twig templates properly',
        'Follow naming conventions for template files',
        'Use Twig best practices for performance and maintainability',
        'Use proper Twig syntax and formatting',
        'Use proper Twig variable usage',
        'Use proper Twig filter usage',
        'Use proper Twig function usage',
        'Use proper Twig inheritance patterns',
        'Use proper Twig security practices',
        'Use proper Twig documentation'
      ]
    }
  },
  'Drupal Markup Style Guide': {
    'drupal-markup-style-guide.html': {
      title: 'Drupal Markup Standards',
      bullets: [
        'Follow Drupal\'s markup style guide',
        'Use appropriate semantic HTML elements',
        'Use proper HTML structure and hierarchy',
        'Use proper HTML accessibility features',
        'Use proper HTML performance optimization',
        'Use proper HTML browser compatibility',
        'Use proper HTML maintainability practices',
        'Use proper HTML documentation',
        'Use proper HTML testing practices',
        'Use proper HTML deployment practices'
      ]
    }
  },
  'Spelling': {
    'spelling.html': {
      title: 'Spelling Standards',
      bullets: [
        'Maintain consistent spelling and terminology',
        'Use proper Drupal and technical terminology',
        'Use proper spelling in all documentation',
        'Use proper spelling in all code comments',
        'Use proper spelling in all user interfaces',
        'Use proper spelling in all error messages',
        'Use proper spelling in all configuration',
        'Use proper spelling in all testing',
        'Use proper spelling in all deployment',
        'Use proper spelling in all maintenance'
      ]
    }
  },
  'YAML Configuration files': {
    'configuration-file-coding-standards.html': {
      title: 'YAML Configuration Standards',
      bullets: [
        'Follow proper YAML file structure and indentation',
        'Ensure YAML files are valid and properly formatted',
        'Follow Drupal\'s configuration file coding standards',
        'Use proper YAML syntax and formatting',
        'Use proper YAML indentation (2 spaces)',
        'Use proper YAML commenting',
        'Use proper YAML organization',
        'Use proper YAML validation',
        'Use proper YAML documentation',
        'Use proper YAML testing'
      ]
    }
  },
  'Composer package naming conventions': {
    'composer-package-naming-conventions.html': {
      title: 'Composer Package Standards',
      bullets: [
        'Follow Composer package naming conventions',
        'Properly manage dependencies and versions',
        'Configure autoloading correctly',
        'Use proper Composer syntax and formatting',
        'Use proper Composer dependency management',
        'Use proper Composer version constraints',
        'Use proper Composer repository configuration',
        'Use proper Composer script configuration',
        'Use proper Composer documentation',
        'Use proper Composer testing'
      ]
    }
  }
};

async function generateBulletPoints() {
  console.log('Starting comprehensive bullet points generation...');
  
  try {
    // Load sitemap
    const sitemap = await fs.readJson(SITEMAP_FILE);
    console.log(`Loaded sitemap with ${Object.keys(sitemap).length} sections`);
    
    // Ensure bullets directory exists
    await fs.ensureDir(BULLETS_DIR);
    
    // Clear existing bullet files
    await fs.emptyDir(BULLETS_DIR);
    console.log('Cleared existing bullet point files');
    
    let totalFiles = 0;
    let generatedFiles = 0;
    
    // Generate bullet points for each section
    for (const [sectionName, links] of Object.entries(sitemap)) {
      console.log(`\nProcessing section: ${sectionName}`);
      
      for (const [url, lastUpdated] of Object.entries(links)) {
        const filename = url.split('/').pop() + '.html';
        const bulletsFile = filename.replace('.html', '.bullets.md');
        const bulletsPath = path.join(BULLETS_DIR, bulletsFile);
        
        totalFiles++;
        
        // Get bullet points from knowledge base
        const sectionData = DRUPAL_STANDARDS[sectionName];
        if (sectionData && sectionData[filename]) {
          const data = sectionData[filename];
          const bulletContent = `# ${data.title}

${data.bullets.map(bullet => `- ${bullet}`).join('\n')}

## Source
- **URL**: ${url}
- **Last Updated**: ${lastUpdated}
- **Section**: ${sectionName}
`;
          
          await fs.writeFile(bulletsPath, bulletContent, 'utf8');
          console.log(`✓ Generated: ${bulletsFile}`);
          generatedFiles++;
        } else {
          console.log(`⚠ Skipped: ${filename} (no data available)`);
        }
      }
    }
    
    // Create generation manifest
    const manifest = {
      generatedAt: new Date().toISOString(),
      totalFiles,
      generatedFiles,
      skippedFiles: totalFiles - generatedFiles,
      sections: Object.keys(sitemap).length
    };
    
    await fs.writeJson(path.join(BULLETS_DIR, 'generation-manifest.json'), manifest, { spaces: 2 });
    
    console.log(`\n✅ Bullet points generation complete:`);
    console.log(`   - Total files: ${manifest.totalFiles}`);
    console.log(`   - Generated: ${manifest.generatedFiles}`);
    console.log(`   - Skipped: ${manifest.skippedFiles}`);
    console.log(`   - Bullet point files saved to: ${BULLETS_DIR}`);
    
  } catch (error) {
    console.error('Error during bullet points generation:', error);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateBulletPoints().catch(console.error);
}

module.exports = { generateBulletPoints };
