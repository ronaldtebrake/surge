# Drupal Coding Standards - Quick Reference for AI Agents

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


## Table of Contents

- [Accessibility Coding Standards](#accessibility-coding-standards)
- [Api Documentation And Comment Standards](#api-documentation-and-comment-standards)
- [Api Documentation Examples](#api-documentation-examples)
- [Avoid Select From](#avoid-select-from)
- [Composer Package Naming Conventions](#composer-package-naming-conventions)
- [Configuration File Coding Standards](#configuration-file-coding-standards)
- [Css](#css)
- [Css Architecture For Drupal 9](#css-architecture-for-drupal-9)
- [Css Coding Standards](#css-coding-standards)
- [Css File Organization](#css-file-organization)
- [Css Formatting Guidelines](#css-formatting-guidelines)
- [Csscomb Settings For Drupal Css Formatting And Sort Tool](#csscomb-settings-for-drupal-css-formatting-and-sort-tool)
- [Drupal Markup Style Guide](#drupal-markup-style-guide)
- [Javascript Api Documentation And Comment Standards](#javascript-api-documentation-and-comment-standards)
- [Javascript Best Practices](#javascript-best-practices)
- [Javascript Coding Standards](#javascript-coding-standards)
- [Jquery Coding Standards](#jquery-coding-standards)
- [List Of Sql Reserved Words](#list-of-sql-reserved-words)
- [Markdown Coding Standards](#markdown-coding-standards)
- [Namespaces](#namespaces)
- [Naming Standards For Services And Extending Symfony](#naming-standards-for-services-and-extending-symfony)
- [Php](#php)
- [Php Coding Standards](#php-coding-standards)
- [Php Exceptions](#php-exceptions)
- [Psr 4 Namespaces And Autoloading In Drupal 8](#psr-4-namespaces-and-autoloading-in-drupal-8)
- [Setting Up The Linter Fixer Tool](#setting-up-the-linter-fixer-tool)
- [Spelling](#spelling)
- [Sql](#sql)
- [Sql Coding Conventions](#sql-coding-conventions)
- [Temporary Placeholders And Delimiters](#temporary-placeholders-and-delimiters)
- [Twig Coding Standards](#twig-coding-standards)
- [What To Look For When Reviewing Css](#what-to-look-for-when-reviewing-css)


## Accessibility Coding Standards

### Rules
- [Key Goals](/docs/develop/standards/accessibility-coding-standards#s-key-goals)
- [General Best Practices](/docs/develop/standards/accessibility-coding-standards#s-general-best-practices)
- [Technical Standards](/docs/develop/standards/accessibility-coding-standards#s-technical-standards)
- [Implementation](/docs/develop/standards/accessibility-coding-standards#s-implementation)
- [Screen reader hinting with WAI-ARIA (or ARIA)](/docs/develop/standards/accessibility-coding-standards#s-screen-reader-hinting-with-wai-aria-or-aria)
- [Dynamic content](/docs/develop/standards/accessibility-coding-standards#s-dynamic-content)
- [Keyboard Navigation](/docs/develop/standards/accessibility-coding-standards#s-keyboard-navigation)
- [Accessible Methods for Hiding Content](/docs/develop/standards/accessibility-coding-standards#s-accessible-methods-for-hiding-content)

## Api Documentation And Comment Standards

### Rules
- [Notes and standards](/docs/develop/standards/php/api-documentation-and-comment-standards#s-notes-and-standards)
- [General considerations for API module parsing](/docs/develop/standards/php/api-documentation-and-comment-standards#general)
- [General documentation](/docs/develop/standards/php/api-documentation-and-comment-standards#drupal)
- [Classes and namespaces](/docs/develop/standards/php/api-documentation-and-comment-standards#classes)
- [Data types in documentation](/docs/develop/standards/php/api-documentation-and-comment-standards#types)
- [Functions](/docs/develop/standards/php/api-documentation-and-comment-standards#functions)
- [Hook definition](/docs/develop/standards/php/api-documentation-and-comment-standards#hooks)
- [Hook implementation](/docs/develop/standards/php/api-documentation-and-comment-standards#hookimpl)

## Api Documentation Examples

### Rules
- [Files](/docs/develop/standards/php/api-documentation-examples#files)
- [Module file (\*.module)](/docs/develop/standards/php/api-documentation-examples#module-file)
- [Install file (\*.install)](/docs/develop/standards/php/api-documentation-examples#install-file)
- [Include file (\*.inc)](/docs/develop/standards/php/api-documentation-examples#include-file)
- [PHP theme template file (\*.tpl.php -- theme-specific override )](/docs/develop/standards/php/api-documentation-examples#tpl-file)
- [File containing a single class](/docs/develop/standards/php/api-documentation-examples#single-class-file)
- [Functions](/docs/develop/standards/php/api-documentation-examples#functions)
- [Generic functions](/docs/develop/standards/php/api-documentation-examples#generic-function)

## Avoid Select From

### Rules
- [SQL coding conventions](/docs/develop/standards/sql/sql-coding-conventions)
- [List of SQL reserved words](/docs/develop/coding-standards/list-of-sql-reserved-words)
- [Avoid "SELECT \* FROM ..."](/docs/develop/coding-standards/avoid-select-from)
- Last [updated](/node/374660/discuss) on
- 25 April 2024
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- Using `SELECT * FROM {node}` queries in versions prior to Drupal 7 can introduce a potential security issue by causing Drupal's Node Access system to be bypassed. In such cases, private content may be shown to unprivileged users. Therefore, queries that generate lists of nodes should avoid SELECT \* syntax in all cases. Instead use `SELECT nid, ...`.
- It is recommended to avoid SELECT \* queries in general. They are less self-documenting than explicitly listing the fields to be retrieved and also very slightly slower. Generally, SELECT \* should be used in only two cases:

## Composer Package Naming Conventions

### Rules
- [Drupal Projects](/docs/develop/coding-standards/composer-package-naming-conventions#s-drupal-projects)
- [The vendor part](/docs/develop/coding-standards/composer-package-naming-conventions#s-the-vendor-part)
- [The package name part](/docs/develop/coding-standards/composer-package-naming-conventions#s-the-package-name-part)
- [In Drupal.org URLs](/docs/develop/coding-standards/composer-package-naming-conventions#s-in-drupalorg-urls)
- [Some extraordinary cases](/docs/develop/coding-standards/composer-package-naming-conventions#s-someextraordinary-cases)
- [Drupal (Sub-)Modules, Themes and Profiles](/docs/develop/coding-standards/composer-package-naming-conventions#s-drupal-sub-modules-themes-and-profiles)
- [Convention](/docs/develop/coding-standards/composer-package-naming-conventions#s-convention)
- [Examples](/docs/develop/coding-standards/composer-package-naming-conventions#s-examples)

## Configuration File Coding Standards

### Rules
- [Format](/docs/develop/coding-standards/configuration-file-coding-standards#format)
- [Filename](/docs/develop/coding-standards/configuration-file-coding-standards#filename)
- [Simple configuration](/docs/develop/coding-standards/configuration-file-coding-standards#s-simple-configuration)
- [Configuration entities](/docs/develop/coding-standards/configuration-file-coding-standards#s-configuration-entities)
- [Comments](/docs/develop/coding-standards/configuration-file-coding-standards#comments)
- [Whitespace](/docs/develop/coding-standards/configuration-file-coding-standards#whitespace)
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)

## Css

### Rules
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)

## Css Architecture For Drupal 9

### Rules
- [Goals](/docs/develop/standards/css/css-architecture-for-drupal-9#goals)
- [1\. Predictable](/docs/develop/standards/css/css-architecture-for-drupal-9#s-1-predictable)
- [2\. Reusable](/docs/develop/standards/css/css-architecture-for-drupal-9#s-2-reusable)
- [3\. Maintainable](/docs/develop/standards/css/css-architecture-for-drupal-9#s-3-maintainable)
- [4\. Scalable](/docs/develop/standards/css/css-architecture-for-drupal-9#s-4-scalable)
- [The Component](/docs/develop/standards/css/css-architecture-for-drupal-9#component)
- [Common CSS Pitfalls](/docs/develop/standards/css/css-architecture-for-drupal-9#pitfalls)
- [Pitfall: Modifying components based on context](/docs/develop/standards/css/css-architecture-for-drupal-9#pitfall-context)

## Css Coding Standards

### Rules
- [Acknowledgements](/docs/develop/standards/css/css-coding-standards#s-acknowledgements)
- [CSS coding standards](/docs/develop/standards/css/css-coding-standards)
- [CSS formatting guidelines](/docs/develop/standards/css/css-formatting-guidelines)
- [CSScomb settings for Drupal (CSS formatting and sort tool)](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool)
- [CSS architecture (for Drupal 9)](/docs/develop/standards/css/css-architecture-for-drupal-9)
- [CSS file organization (for Drupal 9)](/docs/develop/standards/css/css-file-organization)
- [What to look for when reviewing CSS](/docs/develop/standards/css/what-to-look-for-when-reviewing-css)
- Last [updated](/node/1886770/discuss) on

## Css File Organization

### Rules
- [File Structure](/docs/develop/standards/css/css-file-organization#file-structure)
- [SMACSS and Sass/Compass](/docs/develop/standards/css/css-file-organization#modules)
- [CSS files for Drupal themes](/docs/develop/standards/css/css-file-organization#themes)
- [Aggregating CSS](/docs/develop/standards/css/css-file-organization#aggregate)
- [CSS coding standards](/docs/develop/standards/css/css-coding-standards)
- [CSS formatting guidelines](/docs/develop/standards/css/css-formatting-guidelines)
- [CSScomb settings for Drupal (CSS formatting and sort tool)](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool)
- [CSS architecture (for Drupal 9)](/docs/develop/standards/css/css-architecture-for-drupal-9)

## Css Formatting Guidelines

### Rules
- [Whitespace](/docs/develop/standards/css/css-formatting-guidelines#s-whitespace)
- [Indentation](/docs/develop/standards/css/css-formatting-guidelines#s-indentation)
- [Blank lines](/docs/develop/standards/css/css-formatting-guidelines#s-blank-lines)
- [Line endings](/docs/develop/standards/css/css-formatting-guidelines#s-line-endings)
- [Comments](/docs/develop/standards/css/css-formatting-guidelines#s-comments)
- [File comments](/docs/develop/standards/css/css-formatting-guidelines#s-file-comments)
- [Single line comments describing a ruleset](/docs/develop/standards/css/css-formatting-guidelines#s-single-line-comments-describing-a-ruleset)
- [Multi-line comments describing a ruleset](/docs/develop/standards/css/css-formatting-guidelines#s-multi-line-comments-describing-a-ruleset)

## Csscomb Settings For Drupal Css Formatting And Sort Tool

### Rules
- [Note](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool#s-note)
- [Alternatives](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool#alternatives)
- [CSS coding standards](/docs/develop/standards/css/css-coding-standards)
- [CSS formatting guidelines](/docs/develop/standards/css/css-formatting-guidelines)
- [CSScomb settings for Drupal (CSS formatting and sort tool)](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool)
- [CSS architecture (for Drupal 9)](/docs/develop/standards/css/css-architecture-for-drupal-9)
- [CSS file organization (for Drupal 9)](/docs/develop/standards/css/css-file-organization)
- [What to look for when reviewing CSS](/docs/develop/standards/css/what-to-look-for-when-reviewing-css)

## Drupal Markup Style Guide

### Rules
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)

## Javascript Api Documentation And Comment Standards

### Rules
- [Tag order](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#s-tag-order)
- [Documenting a JavaScript file](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#s-documenting-a-javascript-file)
- [Documenting behaviors](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#behavior)
- [Documenting usual constructs](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#s-documenting-usual-constructs)
- [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards)
- [JavaScript best practices](/docs/develop/standards/javascript/javascript-best-practices)
- [ESLint settings](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool)
- [JavaScript API documentation and comment standards](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards)

## Javascript Best Practices

### Rules
- [JavaScript code placement](/docs/develop/standards/javascript/javascript-best-practices#jscodeplacement)
- [Use literal expressions](/docs/develop/standards/javascript/javascript-best-practices#literal)
- ["with" statement](/docs/develop/standards/javascript/javascript-best-practices#with)
- [Avoiding unreachable code](/docs/develop/standards/javascript/javascript-best-practices#avoidingunreachablecode)
- [eval() is evil](/docs/develop/standards/javascript/javascript-best-practices#eval)
- [Preventing XSS](/docs/develop/standards/javascript/javascript-best-practices#xss)
- [Modifying the DOM](/docs/develop/standards/javascript/javascript-best-practices#createElement)
- [Drupal 6 (and later) Specific Stuff](/docs/develop/standards/javascript/javascript-best-practices#drupal6)

## Javascript Coding Standards

### Rules
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)

## Jquery Coding Standards

### Rules
- [Prefix variables that point to jQuery objects with a dollar sign($)](/docs/develop/standards/javascript/jquery-coding-standards#s-prefix-variables-that-point-to-jquery-objects-with-a-dollar-sign)
- [Avoid compatibility issues](/docs/develop/standards/javascript/jquery-coding-standards#compatibility)
- [Chaining](/docs/develop/standards/javascript/jquery-coding-standards#chaining)
- [Event Delegation](/docs/develop/standards/javascript/jquery-coding-standards#event-delegation)
- [Functions](/docs/develop/standards/javascript/jquery-coding-standards#functions)
- [Context](/docs/develop/standards/javascript/jquery-coding-standards#context)
- [Using #id or .class](/docs/develop/standards/javascript/jquery-coding-standards#id-class)
- [jQuery.attr()](/docs/develop/standards/javascript/jquery-coding-standards#attr)

## List Of Sql Reserved Words

### Rules
- [Reserved Words](/docs/develop/coding-standards/list-of-sql-reserved-words#s-reserved-words)
- [SQL coding conventions](/docs/develop/standards/sql/sql-coding-conventions)
- [List of SQL reserved words](/docs/develop/coding-standards/list-of-sql-reserved-words)
- [Avoid "SELECT \* FROM ..."](/docs/develop/coding-standards/avoid-select-from)
- Last [updated](/node/141051/discuss) on
- 24 September 2022
- The list below represents a combination of the following sources of SQL reserved words:
- There are undoubtedly more sources that we should add to this list, but this makes a very good starting point.

## Markdown Coding Standards

### Rules
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)

## Namespaces

### Rules
- ["use"-ing classes](/docs/develop/coding-standards/namespaces#s-use-ing-classes)
- [Class aliasing](/docs/develop/coding-standards/namespaces#s-class-aliasing)
- [Order of import](/docs/develop/coding-standards/namespaces#order)
- [Modules](/docs/develop/coding-standards/namespaces#modules)
- [Examples](/docs/develop/coding-standards/namespaces#s-examples)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)

## Naming Standards For Services And Extending Symfony

### Rules
- [Manipulating the Request object:](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony#s-manipulating-the-request-object)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
- [Namespaces](/docs/develop/coding-standards/namespaces)
- [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
- [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)
- [PSR-4 namespaces and autoloading in Drupal 8](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8)

## Php

### Rules
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)

## Php Coding Standards

### Rules
- [Arrays](/docs/develop/standards/php/php-coding-standards#array)
- [Casting](/docs/develop/standards/php/php-coding-standards#cast)
- [Chaining](/docs/develop/standards/php/php-coding-standards#chaining)
- [Class Constructor Calls](/docs/develop/standards/php/php-coding-standards#constructor-calls)
- [Comments](/docs/develop/standards/php/php-coding-standards#comment)
- [Control Structures](/docs/develop/standards/php/php-coding-standards#controlstruct)
- [Alternate control statement syntax for templates](/docs/develop/standards/php/php-coding-standards#s-alternate-control-statement-syntax-for-templates)
- [Declaring Classes](/docs/develop/standards/php/php-coding-standards#declaring)

## Php Exceptions

### Rules
- [Basic Exception Naming Conventions](/docs/develop/coding-standards/php-exceptions#conventions)
- [Exception Subclasses](/docs/develop/coding-standards/php-exceptions#subclass)
- [Example:](/docs/develop/coding-standards/php-exceptions#s-example)
- [Try-catch blocks](/docs/develop/coding-standards/php-exceptions#s-try-catch-blocks)
- [Inheritance](/docs/develop/coding-standards/php-exceptions#s-inheritance)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)

## Psr 4 Namespaces And Autoloading In Drupal 8

### Rules
- [Summary](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8#s-summary)
- [Namespace resolution](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8#s-namespace-resolution)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
- [Namespaces](/docs/develop/coding-standards/namespaces)
- [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
- [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)

## Setting Up The Linter Fixer Tool

### Rules
- [Tools overview](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool#s-tools-overview)
- [Preparing the environment](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool#s-preparing-the-environment)
- [Installing dependencies](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool#s-installing-dependencies)
- [Running checks & fixes](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool#s-running-checks-fixes)
- [Special cases](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool#s-special-cases)
- [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards)
- [JavaScript best practices](/docs/develop/standards/javascript/javascript-best-practices)
- [ESLint settings](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool)

## Spelling

### Rules
- [Spelling of CSpell](/docs/develop/standards/spelling#s-spelling-of-cspell)
- [Ignore word(s) in a file](/docs/develop/standards/spelling#s-ignore-words-in-a-file)
- [Disable CSpell by line](/docs/develop/standards/spelling#s-disable-cspell-by-line)
- [Disable CSpell for multiple lines](/docs/develop/standards/spelling#s-disable-cspell-for-multiple-lines)
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)

## Sql

### Rules
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)

## Sql Coding Conventions

### Rules
- [Reserved Words](/docs/develop/standards/sql/sql-coding-conventions#reserved-words)
- [Drupal 8 and 9](/docs/develop/standards/sql/sql-coding-conventions#reserved-words-drupal-8)
- [Drupal 7](/docs/develop/standards/sql/sql-coding-conventions#reserved-words-drupal-7)
- [Capitalization and user-supplied data](/docs/develop/standards/sql/sql-coding-conventions#formatting)
- [Naming](/docs/develop/standards/sql/sql-coding-conventions#naming)
- [Configure your Database server for standard compliance](/docs/develop/standards/sql/sql-coding-conventions#server)
- [References](/docs/develop/standards/sql/sql-coding-conventions#references)
- [Indentation](/docs/develop/standards/sql/sql-coding-conventions#indentation)

## Temporary Placeholders And Delimiters

### Rules
- [Temporary place-holders and delimiters](/docs/develop/coding-standards/temporary-placeholders-and-delimiters#s-temporary-place-holders-and-delimiters)
- [Finding your placeholders](/docs/develop/coding-standards/temporary-placeholders-and-delimiters#s-finding-your-placeholders)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
- [Namespaces](/docs/develop/coding-standards/namespaces)
- [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
- [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)

## Twig Coding Standards

### Rules
- [The DocBlock](/docs/develop/coding-standards/twig-coding-standards#docblock)
- [Variables in the DocBlock](/docs/develop/coding-standards/twig-coding-standards#variables)
- [Variable definitions in the DocBlock](/docs/develop/coding-standards/twig-coding-standards#datatypes)
- [Variables referenced inline in the DocBlock](/docs/develop/coding-standards/twig-coding-standards#variables-inline)
- [Expressions](/docs/develop/coding-standards/twig-coding-standards#expressions)
- [Expressions: Checking if variables are available for printing](/docs/develop/coding-standards/twig-coding-standards#s-expressions-checking-if-variables-are-available-for-printing)
- [Expressions: looping](/docs/develop/coding-standards/twig-coding-standards#s-expressions-looping)
- [Expressions: setting variables](/docs/develop/coding-standards/twig-coding-standards#s-expressions-setting-variables)

## What To Look For When Reviewing Css

### Rules
- [Architecture guidelines](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-architecture-guidelines)
- [Is all the code still in use?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-is-all-the-code-still-in-use)
- [Is some code redundant?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-is-some-code-redundant)
- [Are the components named correctly?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-are-the-components-named-correctly)
- [Should the code be abstracted out into a common reusable class?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-should-the-code-be-abstracted-out-into-a-common-reusable-class)
- [Are the selectors correct?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-are-the-selectors-correct)
- [Is the code in the correct file?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-is-the-code-in-the-correct-file)
- [Formatting guidelines](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-formatting-guidelines)