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
- The Drupal community strives to be inclusive to everyone, including people with disabilities. To that end, the Drupal community has developed the following accessibility coding standards to help make websites and other digital assets accessible to the widest possible audience.
- Effective user experiences serve our entire community, including website visitors with disabilities. A positive experience can be achieved by focusing on three goals:
- 1.  Creating an inclusive strategy: Consider accessibility needs when architecting the site
- 2.  Incorporating Accessible Coding: Use best practices (as outlined below) to ensure that content can be navigated and read by all
- 3.  Following Normalized Testing: Building accessibility reviews into existing processes (and not as an add-on) will help to ensure code pushed out is accessible.
- Drupal has made every effort to seamlessly build accessibility in Drupal Core.  This process empowers developers and authors to build highly legible content that can be parsed by assistive devices, by:
- Providing **text alternatives (alt text)** for non-text content, such as images, charts and graphs.
- Providing accurate transcripts, captions, and descriptions for video.

## Api Documentation And Comment Standards

### Rules
- This page covers:
- The purpose of the Drupal project's standards for API documentation and comments in PHP code is to ensure that the API module can parse/display the documentation, programmers looking at the PHP files can read/understand the documentation, and integrated developer environments (IDEs) can work successfully with the code and documentation.
- A reference to the tags used in this documentation.
- The API module parses documentation that is in special documentation blocks (known as "docblocks" in the rest of this document).
- Syntax example:
- General notes on the API module and the documentation it will parse:
- The API module treats files with the following extensions as PHP: .php, .module, .inc, .install, .engine., .theme, .profile, and .test.
- When parsing a PHP file, the API module parses both documentation and PHP code. PHP files with syntax errors could cause problems.

## Api Documentation Examples

### Rules
- This page is ia collection of the complete API documentation examples, which you can use as starting points to writing documentation that conforms to the Drupal project's [API documentation standards](/node/1354).
- Callback used in only one API function:
- Callback used in a few API functions:
- Callback used in many functions, where some explanation is needed for the otherwise standard function arguments:
- \[NOTE: NEEDS STANDARDS UPDATE - data types on @param/@return!\]
- \[NOTE: NEEDS STANDARDS UPDATE - data types on @param/@return, and function body needs to be provided, as it's part of the documentation.\]
- \[needs an example\]
- \[needs an example\]

## Avoid Select From

### Rules
- Using `SELECT * FROM {node}` queries in versions prior to Drupal 7 can introduce a potential security issue by causing Drupal's Node Access system to be bypassed. In such cases, private content may be shown to unprivileged users. Therefore, queries that generate lists of nodes should avoid SELECT \* syntax in all cases. Instead use `SELECT nid, ...`.
- It is recommended to avoid SELECT \* queries in general. They are less self-documenting than explicitly listing the fields to be retrieved and also very slightly slower. Generally, SELECT \* should be used in only two cases:
- 1.  The fields in the table being selected from are dynamic and not known definitively at development time. (This is extremely rare and generally bad practice anyway.)
- 2.  The list of fields to select is prohibitively long.
- [SELECT \* IS EVIL](//www.parseerror.com/sql/select*isevil.html): one developer's perspective.

## Composer Package Naming Conventions

### Rules
- As you can see from the above, all software packages within all repositories must also have individually identifiable names. Once the first part, "drupal/", is commonly shared by all in our repository, the second part of the name must be unique. Fortunately, the Drupal ecosystem already has such a distinct naming convention as the "machine names" of modules, themes, and profiles. Thus, using these internally already used machine names as the second part of the Composer package names also seems obvious. An important note here: although the hyphen ("-") is more common for separating words in Composer vendor and package names, Drupal's machine names use an underscore ("\_") for this instead. For example, if you have your contrib module called "My Module" as its human label, then its machine name used within the Drupal world will be derived as "my\_module" probably (not mandatory, but recommended). Finally, its package name in Composer's global namespace derives from the machine name and becomes `drupal/my_module` (required to match).
- *Drupal* itself is a project: drupal.org/project/drupal → `drupal/drupal`
- But *Core* is a subtree of Drupal: drupal.org/project/core → `drupal/core`
- *Datetime* is a module within Drupal Core: drupal.org/project/datetime → `drupal/datetime`
- *Views* in Drupal 7 was a contrib project: drupal.org/project/views → `drupal/view`, but today is part of Drupal core
- Some project URLs are not accessible or point to another project, as they are reserved names. In most cases those are sub-modules or sub-themes of existing projects, like Drupal core.
- Sub-modules, -themes and profiles must use the package name.
- where `SUBPROJECT` is the machine name of the module, theme or profile.

## Configuration File Coding Standards

### Rules
- The configuration file name is equal to the unique configuration name with **`.yml`** extension.
- The unique configuration name cannot exceed 250 characters.
- For simple configuration, the unique configuration name **must** start with the extension name (the machine name of the module, theme, or install profile that owns the configuration).
- For example, a module with the machine name `mymodule` wants to create a simple configuration for storing the module settings, the configuration name may be `mymodule.settings`, but it may not be `my_module.settings`.
- Extensions can also have multiple configuration files, the use of the name `settings` is common practice but is not required, `mymodule` could also create a configuration named `mymodule.features`, if separating them makes logical sense.
- For configuration entities, the unique configuration name has a prefix, which is equal to `(extension).(config_prefix)`. Here, `(extension)` is the machine name of the module that defines the config entity, or "core" for core entities; `(config_prefix)` is defined in the entity annotation, and defaults to the machine name (ID) of the config entity if it has not been overridden by a `config_prefix` annotation in the entity class. Extension names cannot exceed 50 characters, and config entity config prefixes cannot exceed 32 characters.
- The rest of the unique configuration name for a config entity (which is called the *suffix* in the rest of this section) is limited to 150 characters.
- For many configuration entities, the suffix consists solely of the individual machine name of the item. For instance, the unique configuration name for an image style is `image.style.(machine_name_of_style)`, and for a view it is `views.view.(machine_name_of_view)`. In these cases, the machine name of the item cannot exceed 150 characters.

## Css

### Rules
- CSS coding standards and best practices for Drupal.
- Overview of CSS coding standards
- Whitespace, comments, formatting and more
- Standards for using the CSScomb formatting and sort tool for CSS
- Goals and best practices for CSS architecture
- Preliminary strategy for file organization
- How to review CSS patches
- Working with CSS in Drupal 7.

## Css Architecture For Drupal 9

### Rules
- Note: This document aims to apply emerging best-practices for CSS to Drupal 8/9. As we implement these ideas in Drupal 8, this document may need to be updated.
- [Skip to best practices](#best-practices)
- The goals of good CSS should not be so different from those of good software engineering. Well-architected CSS, like PHP or JavaScript, should be:
- CSS throughout Drupal core and contributed modules should be consistent and understandable. Changes should do what you would expect without side-effects.
- As new components and features are needed, it should be easy to add, modify and extend CSS without breaking (or refactoring) existing styles.
- CSS should be easy to manage for a single developer or for large, distributed teams (like Drupal’s).
- Components are the discrete, purpose-built visual elements that make up the UI of a site or app. Components consist of HTML, CSS, and often – but not always – JavaScript. They are our navbars, dialogs, buttons and carousels. Components can be simple (such as icon containers and buttons) or complex enough to be themselves composed of other components.
- To better understand the best practices provided below, it can be helpful to review some common approaches that impede our goals of predictability, maintainability, reusability and scalability.

## Css Coding Standards

### Rules
- To minimize friction when contributing to CSS, the front-end developers of the Drupal community have reached consensus about our coding standards for:
- Formatting CSS code.
- CSS architecture, including goals, pitfalls and best practices.
- Grouping rulesets into files.
- Despite our natural range of working styles and coding preferences, we value collaboration and ease of development, so we have attempted to explain our standards clearly in the following documents.
- > "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then **write your code for maximum clarity**." - Idan Gazit

## Css File Organization

### Rules
- Note: This document describes a file organization and aggregation strategy that has not yet been implemented. See this core issue for that on-going work: [#1921610: \[Meta\] Architect our CSS](/project/drupal/issues/1921610 "Status: Active")
- Rulesets should be grouped into logical files that enforce the separation of concerns within the CSS, that can be aggregated efficiently and that can be easily overridden by themers.
- Drupal follows a SMACSS-style categorization of its CSS rules: The State and Theme categories are not frequently used with modern CSS.
- 1.  Base —Should include HTML element styling (e.g. a, ul, etc), typography, root scooped CSS custom properties, resets and utility classes.
- 2.  Layout —Overall layout of the page including page template layout, region layout, etc.
- 3.  Component (SMACSS “module”) — The majority of a theme’s styles will be within components. Components should be scoped to their own CSS files. Example components include pager, navigation, footer, etc.
- 4.  State (not used often) — This was originally created for styles that modified the states of components, however it is now best practice to include component states within their respective stylesheet.
- 5.  Theme (not used often) — This was originally created to apply styles that would affect the overall look and feel of the theme (such as colors), however this can now be done more effectively by modifying CSS custom properties.

## Css Formatting Guidelines

### Rules
- Use 2 spaces for each level of indentation, the same standard as Drupal’s PHP and JavaScript code.
- Declarations (property/value pairs) should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.
- In general, separate each ruleset by a blank line when using PostCSS.
- If a ruleset has a preceding Doxygen-style or single-line-style comment that describes it, place a blank line before the comment.
- If two rulesets have no interleaving blank line, they must be logically related. If they are not logically related to each other, add a blank line and a comment describing the second ruleset.
- There MUST NOT be any whitespace (spaces or tabs) at the end of lines.

## Csscomb Settings For Drupal Css Formatting And Sort Tool

### Rules
- CSScomb is available as:
- To have ruleset groups divided by an empty line, replace the empty lines above with:
- How to use.
- Depending on where you've installed **npm** the command above may require **sudo** prepended to it.
- After installing **cd** into your theme's root folder (or any folder containing style files to be formatted) and make a so-called dry run without changing anything:
- When you are ready for actual changes, run this command passing desirable folder and/or particular file paths as arguments:
- How to use.
- Create **package.json** file in the root of your theme, module or any other project and put this into it:

## Drupal Markup Style Guide

### Rules
- Create good HTML/markup
- Create good base templates for themers to stylize
- Create good CSS classes
- [coding standards](/taxonomy/term/190104)

## Javascript Api Documentation And Comment Standards

### Rules
- All JavaScript items (methods, object constructors and properties, functions, variables, etc.) need to have documentation headers, or they will not be recognized by the parser (unlike the API module, which picks up all PHP items whether or not they have documentation headers). Only behaviors are documented specifically, see the [behavior documentation example](#behavior).
- Not all of the @tags we use for PHP are supported. See below for the tags available and their order of declaration.
- To indicate the data type for a `@param` or `@return` tag, put the data type in `{}` brackets: `@param {TheType} paramName` or `@return {TheType}`. For non-object data, use `number`, `string`, `bool`, `null`, `undefined`, `object`, `function`, `Array`. For particular objects, use the constructor name; this could be a built-in JavaScript class (`Date`, `RegExp`), a DOM element (`HTMLElement`, `HTMLInputElement`), a Drupal-specific class (`Drupal.Ajax`), etc.
- Additional tag: like `@throws`, which documents exceptions being thrown by a PHP or JavaScript function, use `@fires` to document events that are triggered by a JavaScript function. In addition, if the event is a custom event (as opposed to a standard event like a key press), add a documentation block immediately before the first line of code within a function that triggers the event, with an `@event` tag, to document the event itself (see sample below for details). Only include one `@event` block for each custom event, but use `@fires` in each function that triggers the custom event.
- Additional tag: when documenting an object that is not being used as a namespace or class, use `@prop {type} name` tags to document its properties (these work like `@param` for function parameters).
- Some additional notation is required in many cases to help JSDoc figure out what type of item is being documented.
- Use `@name` to tell JSDoc the name of what is being documented, if it is not the same as the name in the code (usually because it is a function name like `DropButton` rather than including the class name like `Drupal.DropButton`).
- Use `@constructor` to indicate that a function is intended to be a class constructor.

## Javascript Best Practices

### Rules
- This page covers DOM and Drupal specific code styles.
- JavaScript code SHOULD NOT be embedded in the HTML where possible, as it adds significantly to page weight with no opportunity for mitigation by caching and compression.
- Code SHOULD use literal expressions instead of the `new` operator:
- Use `[]` instead of `new Array()`
- Use `{}` instead of `new Object()`
- It is RECOMMENDED to use literal expressions instead of the wrapper forms `new Number`, `new String`, `new Boolean` in situations where the literal expression is the same. However, you MAY use object instances in which it matters:
- The `with` statement MUST NOT be used, since it is not possible to use `with` with enabled strict mode.
- Instead, you SHOULD use the explicit longer version:

## Javascript Coding Standards

### Rules
- All code MUST indent using two (2) space characters,
- All code MUST NOT indent using tab characters,
- All code MUST NOT end with trailing whitespace.
- JavaScript allows optional "semi-colon insertion". Drupal standards do not.
- All statements (except `for, function, if, switch, try, while`) MUST be followed by a semi-colon (`;`),
- Return values MUST start on the same line as the `return` keyword.
- *EXCEPTIONS:**
- Anonymous functions assigned to a variable MUST be followed by a semi-colon.

## Jquery Coding Standards

### Rules
- In any part of your code it should be easy to understand which variables are jQuery objects and which are not.
- *Incorrect**
- When assigning a jQuery object to a variable:
- When assigning a jQuery object to a property:
- When assigning a jQuery object to a variable:
- When assigning a jQuery object to a property:
- *Incorrect**
- Every event (e.g. click, mouseover, etc.) in JavaScript “bubbles” up the DOM tree to parent elements. This is incredibly useful when you want many elements to call the same function. Instead of binding an event listener function to all of them, you can bind it once to their parent, and have it figure out which node triggered the event.

## List Of Sql Reserved Words

### Rules
- The list below represents a combination of the following sources of SQL reserved words:
- There are undoubtedly more sources that we should add to this list, but this makes a very good starting point.
- 4.  ABSOLUTE
- 11.  AGGREGATE
- 14.  ALLOCATE
- 17.  ALWAYS
- 18.  ANALYSE
- 19.  ANALYZE

## Markdown Coding Standards

### Rules
- This topic is currently being discussed:
- [#2952616: Adopt CommonMark spec for Markdown files](/project/coding_standards/issues/2952616 "Status: Needs review")
- [#2191525: \[PP-1\]\[policy, no patch\] Extend Markdown coding standards to support API module (DOXYGEN)](/project/coding_standards/issues/2191525 "Status: Postponed")
- [coding standards](/taxonomy/term/190104)

## Namespaces

### Rules
- Not all files in Drupal declare a namespace. As of Drupal 8 an increasing number of files do, but not all. Prior to Drupal 8 virtually no code used namespaces, in order to remain compatible with PHP 5.2. Therefore there are two slightly different standards.
- Classes and interfaces with a backslash `\` inside their fully-qualified name (for example: `Drupal\simpletest\WebTestBase`) must not use their fully-qualified name inside the code. If the namespace differs from the namespace of the current file, put a `use` statement on the top of the file. For example:
- Classes and interfaces without a backslash `\` inside their fully-qualified name (for example, the built-in PHP Exception class) must be fully qualified when used in a namespaced file. For example: `new \Exception();`. Do not `use` global classes.
- In a file that does not declare a namespace (and is therefore in the global namespace), classes in any namespace other than global must be specified with a "use" statement at the top of the file.
- When specifying a class name in a string, use its full name including namespace, without leading `\`.
- Escape the namespace separator in double-quoted strings: `"Drupal\\Context\\ContextInterface"`
- Do not escape it in single-quoted strings: `'Drupal\Context\ContextInterface'`
- As stated elsewhere, single-quoted strings are generally preferred.

## Naming Standards For Services And Extending Symfony

### Rules
- Elements added to the attributes of the Request object by any Drupal module or service should have a "\_" prepended unless they come from the path.
- Only values that come from the path will have the "\_" omitted, for example, the path pattern /node/{node}.
- Drupal core and Symfony typically add some prefixed attributes that should not be overwritten by a contributed module. These include:
- (Note that \_account is being removed in [#2073531: Use current user service instead of \_account, remove \_account from the request object](/project/drupal/issues/2073531 "Status: Closed (fixed)").)
- and from Symfony\\Cmf\\Component\\Routing\\RouteObjectInterface:
- See the [the original change notice](/node/2083979).

## Php

### Rules
- The Drupal coding standards for PHP.
- The Drupal Coding Standards apply to code within Drupal and its contributed modules.
- Standards for API documentation blocks in PHP code
- This page is intended to be a collection of the complete API documentation examples
- Standards having to do with namespaces
- Standards for services and Symfony usage
- Basic conventions, exception subclasses, try-catch blocks, inheritance
- Summary of how Drupal 8 uses the PSR-4 standard for namespace autoloading

## Php Coding Standards

### Rules
- Arrays should be formatted using short array syntax with a space separating each element (after the comma), and spaces around the => key association operator, if applicable:
- Note that if the line declaring an array spans longer than 80 characters (often the case with form and menu declarations), each element should be broken into its own line, and indented one level:
- Note that, as seen above, in multi-line arrays there MUST be a comma after the last array element. This helps prevent parsing errors if another element is placed at the end of the list later.
- Put a space between the (type) and the $variable in a cast: `(int) $mynumber`.
- PHP allows objects returned from functions and methods to be "chained", that is, a method on the returned object may be called immediately. This is known as a 'fluent interface.' Here is an example:
- As a general rule, a method should return $this, and thus be chainable, in any case where there is no other logical return value. Common examples are those methods that set some state or property on the object. It is better in those cases to return $this rather than TRUE/FALSE or NULL.
- In the case where you have a fluent interface for a class, and the code spans more than one line, the method calls should be indented with 2 spaces:
- When calling class constructors with no arguments, always include parentheses:

## Php Exceptions

### Rules
- 2.  All Exceptions must end with the suffix "Exception".
- 3.  All Exceptions should include an appropriate message and should not be translated. Only messages from the install and update system are currently translated as they are user facing.
- 4.  The Exception's message should include a hint to the values that caused the exception.
- 1.  Formatting messages should be done by concatenating strings or using `sprintf()`.
- 2.  Values should be surrounded by single quotes.
- 3.  **DO NOT** translate the message.
- 4.  **DO NOT** use `SafeMarkup::format()`.
- 5.  Exception classes should be named for the subsystem to which they relate, and the type of error. That is, `[Subsystem][ErrorType]Exception`.

## Psr 4 Namespaces And Autoloading In Drupal 8

### Rules
- Example `vegetable.module` directory structure:
- modules/vegetable/
- Controller/
- VegetableController.php → class Drupal\\vegetable\\Controller\\VegetableController
- VegetableForm.php → class Drupal\\vegetable\\Form\\VegetableForm
- VegetableBlock.php → class Drupal\\vegetable\\Plugin\\Block\\VegetableBlock
- Tomato.php → class Drupal\\vegetable\\Entity\\Tomato
- Cucumber.php → class Drupal\\vegetable\\Entity\\Cucumber

## Setting Up The Linter Fixer Tool

### Rules
- Understanding the purpose and nature of Drupal's coding standards for JavaScript from the [previous pages](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards) represents the theory. Now, let's continue with their practical usage in everyday work. This page describes some basic methods of setting up developer aid tools utilizing these rulesets.
- *ESLint* is the most popular linter utility for JavaScript and EcmaScript-based (hence the name) languages. It analyzes static code to catch syntax issues and enforce coding best practices. (It is loosely comparable to PHPStan on the backend side, but not as type-aware.)
- On the other hand, *Prettier* is a separate tool: an opinionated code formatter that can be integrated into ESLint via plugins. However, unlike ESLint, it doesn’t validate logic or best practices. (It only rewrites code into a consistent format.)
- [![Screenshot](/files/drupal-core-managaes-its-frontend-dependencies-with-yarn.png)](/files/drupal-core-managaes-its-frontend-dependencies-with-yarn.png "Open in original size")
- The containerization tool DDEV offers this *Corepack* component by default, built into the web container (which runs your website). You just need to enable it:
- 1.  Find the "corepack" term in your `.ddev/config.yaml` file
- 2.  Uncomment it, set its value to "true"
- 3.  Restart your stack: `$ ddev restart`

## Spelling

### Rules
- Drupal Core uses US English spelling for all source code, including comments and names.
- For in line documentation settings use all lower case for cspell. For example, `// cspell:ignore.`
- Use the `cspell:ignore` directive. The words are listed alphabetically with a single space between the words. Use multiple lines to meet the number of characters per line limit.
- if it's not in English or a nonsense string (for example, a random string in a test) disable CSpell for that line. Note that `cspell` is lower case.
- For multiple lines, use disable before the lines and enable after. Note that `cspell` is lower case.
- See the [cspell development tool page](/node/3352552) for more details.
- This section is intended to provide direction for Drupal.org content, particularly documentation and general information pages related to
- User Interface standards for Drupal.

## Sql

### Rules
- SQL best practices for Drupal.
- Reserved Words, capitalisation and user-supplied data, naming, configuring DB server for standards compliance
- Reference list of SQL reserved words
- Standard explaining why not to use a certain form of SELECT queries
- [coding standards](/taxonomy/term/190104)

## Sql Coding Conventions

### Rules
- All identifiers in SQL query should be quoted. Table names are quoted using curly brackets, for example, `{table_name}`. All other identifiers are quoted using square brackets, for example, `[column_name]`.
- Don't use (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names. Even if this may work with your (MySQL) installation, it may not with others or with other databases. Some references:
- [(ANSI) SQL Reserved Words](/node/141051)
- Some commonly misused keywords: `TIMESTAMP, TYPE, TYPES, MODULE, DATA, DATE, TIME, ...`
- Make SQL reserved words UPPERCASE. This is not a suggestion. Drupal db abstraction commands will fail if this convention is not followed.
- Make column and constraint names lowercase.
- Enclose each table name with `{}` (this allows Drupal to prefix table names).
- Preventing SQL injection is easy; db\_query provides a way to use parametrized queries. Drupal's database functions replace the sprintf-like placeholders with the properly escaped arguments in order of appearance:

## Temporary Placeholders And Delimiters

### Rules
- When writing a content filter module, or any code that processes or modifies content, it is tempting to use an obscure character as a place-holder, especially if only your code will see it: But this cannot be guaranteed. Non-printing, invalid or undocumented characters might not be handled correctly in the unlikely event that they are seen by a browser or feed-reader. And the more unlikely they are to be seen – the less likely they are to be tested. This will mean that some code will be written to find and eradicate these insidious characters, possibly including the ones your code is using to do its work.
- To avoid this happening, and extending the lifetime of your code, please use an appropriate alpha-numeric string – prefixed by the name of the module (as a name-space) and a hyphen `-` or underscore `_` – and surrounded by `[`…`]`.
- If you need delimiting place-holders, the closing delimiter can incorporate a `/` after the initial `[` and may suffix the modulename.
- A PCRE such as
- `'@\[modulename-tag\](.+?)\[/modulename-tag\]@'`
- `'@\[modulename-tag\](.+?)\[/tag-modulename\]@'` if you suffixed the modulename as mentioned above
- can be used to match the string you have previously delimited.

## Twig Coding Standards

### Rules
- Twig template docblocks should only include `@ingroup themeable` if the template is providing the default themeable output. For themes overriding default output the `@ingroup themeable` line should not be included.
- Variables in a twig template docblock should be referenced by name. They will not be surrounded by the Twig print indicators {{ and }} and will not be preceded by the PHP variable indicator $. There should be no separate "Other variables" section.
- A good rule of thumb for converting docs at the top of templates is as follows
- Start from what we had in Drupal 7.
- If you see a section of variables titled "Other variables", delete the title and the extra line above.
- if/when variables get deleted from preprocess, delete them from the Twig docs.
- if/when a variable looks useful and is not in the Twig docs, document it.
- if/when you can improve, or reduce the verbosity of the D7 docs, do it.

## What To Look For When Reviewing Css

### Rules
- There are many things to consider when reviewing CSS against our CSS standards. This is a guide of things to consider and how to present the review when looks at core CSS.
- There are times when markup in core is changed but some CSS files that rely on a particular class or ID have not been updated. Check to make sure that the CSS still applies correctly.
- Example: [#2405213: Remove admin-options component from Seven theme since it is not used](/project/drupal/issues/2405213 "Status: Closed (fixed)")
- Some CSS is written so it can override CSS that is loaded before it, as Drupal 8 becomes more aligned to the standards, there is less overlap between CSS selectors. There may be some code in place that is no longer required to override previous values. There is sometimes code that overrides browser defaults that are identical.
- > `+++ b/core/themes/seven/css/components/admin-panel.css
- > @@ -1,20 +1,23 @@
- > +.panel__content {
- >    padding: 0;