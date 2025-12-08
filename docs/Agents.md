{% raw %}
# Drupal Coding Standards - AI Agent Reference



# Composer

## Composer package name convention

### Drupal Projects
- Use package name format: `drupal/PROJECT`.

### Modules, Themes and Profiles
- Use package name format: `drupal/SUBPROJECT`.

### Components
- Use package name format: `drupal/PARENT-COMPONENT`.



# Css

## Coding

### CSS Formatting
- Use consistent indentation and spacing for readability.
- Limit line length to 80 characters.

### CSS Architecture
- Organize CSS files by component or module.
- Avoid deep nesting of selectors to maintain clarity.

### Grouping Rulesets
- Group related styles together in a logical order.
- Use comments to separate sections within CSS files for clarity.


## CSS architecture (for Drupal 9)

### Predictability
- Ensure CSS is consistent and understandable; avoid side-effects from changes.

### Reusability
- Create abstract and decoupled CSS rules to facilitate quick component building.

### Maintainability
- Design CSS for easy modification and extension without breaking existing styles.

### Scalability
- Structure CSS to be manageable for both individual developers and large teams.

### Avoid reliance on HTML structure
- Use classes for styling; avoid id selectors and overly complex selectors.

### Use specific class names
- Prefix component elements with the component name followed by two underscores.

### Extend components with modifier classes
- Use suffixes with two dashes for component variants; keep modifier classes minimal.

### Separate concerns
- Do not mix positioning/layout with component styles; use dedicated classes for JavaScript.

### Name components using design semantics
- Class names should reflect design intent rather than content semantics.

### Formatting class names
- Use full words, dashes between words, and avoid abbreviations in class names.

### Avoid `!important`
- Use sparingly and only for states that must override all others; avoid for general rules.


## CSS file organization

### File Structure
- Group CSS rulesets into logical files for separation of concerns.
- Follow SMACSS-style categorization: Base, Layout, Component, State, Theme.
- Place all module styles in a `css/` sub-directory.
- Use `module_name.module.css` for minimal functional styles.
- Use `module_name.theme.css` for aesthetic styles.
- Use `module_name.admin.css` for admin screen styles.
- Use `module_name.admin.theme.css` for admin aesthetic styles.
- Do not include base styles in modules; use Normalize.css instead.

### CSS files for Drupal themes
- Separate Base, Layout, and Component styles into distinct files.
- For complex themes, place each component in its own file.
- Include state rules with the corresponding component.
- Theme rules may be separated or included with components.

### Aggregating CSS
- In Drupal 8+, themes can override stylesheets without affecting original styles.
- Maintain two aggregates: "Every page" and "conditionally-loaded".
- Never include conditionally-loaded base styles.
- Order styles within an aggregate by the weight option of `drupal_add_css()`.


## CSScomb settings for Drupal (CSS formatting and sort tool)

### Exclusions
- Exclude directories: core, modules, profiles, sites, themes, tests, config, includes, tmp, vendor, node_modules, bower_components, lib, src, img, images, icons, js, javascript, scripts, jquery, .git.

### Formatting Rules
- Always use a semicolon at the end of CSS declarations.
- Remove empty rulesets.
- Use lowercase for color names and element names.
- Ensure a newline at the end of files.
- Use double quotes for strings.
- Maintain a space after colons in declarations.
- Maintain a space after combinators.
- Maintain a space after opening braces.
- Maintain a space before closing braces.
- Maintain a newline between declarations.
- Indent blocks with 2 spaces.
- Strip unnecessary spaces.
- Use unitless zero values where applicable.

### Sort Order
- Sort CSS properties according to the specified order, prioritizing variables first in SASS/LESS.


## Format

### Css

#### Whitespace
- Use 2 spaces for indentation.
- Declarations should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.
- Separate each ruleset by a blank line when using PostCSS.
- If two rulesets are not logically related, add a blank line and a comment describing the second ruleset.
- There MUST NOT be any whitespace at the end of lines.
- All text files should end with a single blank line.
- Use Unix line endings (LF).

#### Comments
- Each file should start with a comment describing its purpose, followed by a blank line.
- Short comments describing a ruleset can be kept to one line.
- Multi-line comments must follow the Doxygen comment style if they require 2 or more lines.
- Multi-line comments within a ruleset must be preceded with `/*` and terminated by `*/`.
- Comments describing properties or rulesets can use simple CSS comment style if within 80 characters.

#### Properties
- Property name must be followed by a colon, a single space, and the value.
- Include a semicolon at the end of all declarations.
- Use double quotes for property values that require quotes.
- Default to rem units unless it creates an undesired effect.
- Quote attribute values in selectors.
- Avoid specifying units for zero-values.
- Include a space after each comma in comma-separated values.
- Do not use spaces around parentheses in functions.
- Use lower case function names.

#### Declaration order
- Order declarations by purpose: positioning properties, box model properties, then other declarations.
- Vendor-prefixed properties should be directly before their non-prefixed version if not automatically added.


## What to look for when reviewing CSS

### Architecture guidelines
- Ensure all CSS code is still in use and applies correctly.
- Identify and remove redundant CSS that overrides identical values.
- Verify that component names accurately describe their design semantics.
- Abstract custom CSS into reusable component classes where applicable.
- Use short and simple selectors, favoring component and sub-component classes.
- Organize CSS so that each component resides in its own file, consolidating related styles.

### Formatting guidelines
- Add a file comment to the top of the stylesheet.
- Ensure all comments are formatted correctly.
- Use whitespace correctly, including indentations and line breaks.
- Format rulesets, properties, and media queries correctly.
- Verify that existing RTL styles are formatted correctly.



# General

## Coding Standards

### General
- Follow current Drupal coding standards for all new code.
- Update existing code to current standards when feasible.
- Use US English spelling for comments and names.
- Apply coding standard fixes by rule, not by individual files.



# Javascript

## Before running these commands, install node.js, npm, and npx
### JavaScript Standards
- Use ESLint to ensure JavaScript code consistency and error-free syntax.
- Always use the latest stable ESLint version.
- Contrib modules must conform to ESLint requirements.
- Customize `.eslintrc.json` for specific modules needing unique global variables.


## Best Practice

### JavaScript Code Placement
- JavaScript code SHOULD NOT be embedded in HTML.

### Use Literal Expressions
- Code SHOULD use literal expressions instead of the `new` operator.

### "with" Statement
- The `with` statement MUST NOT be used.

### Avoiding Unreachable Code
- A `return`, `break`, `continue`, or `throw` statement SHOULD be followed by a `}` or `case` or `default`.

### `eval()` is Evil
- `eval()` SHOULD NOT be used.

### Preventing XSS
- All output to the browser from a user SHOULD be escaped through `Drupal.checkPlain()`.

### Modifying the DOM
- When adding new HTML elements to the DOM, you SHOULD NOT use `document.createElement()`.

### String Translation
- All strings in JavaScript files SHOULD be wrapped in `Drupal.t()`.


## Coding

### Indenting
- All code MUST indent using two (2) space characters.
- All code MUST NOT indent using tab characters.
- All code MUST NOT end with trailing whitespace.

### Semicolons
- All statements (except `for, function, if, switch, try, while`) MUST be followed by a semi-colon (`;`).
- Return values MUST start on the same line as the `return` keyword.

### File-closure
- All JavaScript code MUST be declared inside a closure wrapping the whole file.

### CamelCasing
- Multi-word variables and functions SHOULD be lowerCamelCased.
- Variables containing a jQuery object MUST start with a dollar sign (`$`).

### Variables and Arrays
- All variables MUST be declared with let or const before they are used and SHOULD be declared only once.
- Each variable assignment SHOULD be declared on a separate line.
- Drupal JavaScript MUST NOT define global variables.
- Pre-defined constants SHOULD be all-uppercase and words separated by underscores.
- Arrays SHOULD be formatted with one space separating each element and the assignment operator.
- Use trailing comma after the last element in multi-line arrays.

### Typeof
- In type comparisons, the value tested MUST NOT be wrapped in parenthesis.

### Functions
- Function names SHOULD begin with the name of the module or theme declaring the function.
- The `function` keyword MUST be followed by one space.
- Named functions MUST NOT have a space between the function name and the following left parenthesis.
- Optional arguments SHOULD be defined at the end of the function signature.
- Functions SHOULD be called with no spaces between the function name, the opening parenthesis, and the first parameter.

### Constructors
- Constructor functions MUST be given names with an initial uppercase character.
- A function with an initial uppercase name MUST NOT be called without a `new` operator.

### Comments
- Inline documentation for source files MUST follow the JavaScript API documentation and comment standards.
- Non-JSDoc comments SHOULD use capitalized sentences with punctuation.

### String Concatenation
- Expressions SHOULD be separated with one space before and after the `+` operator.
- The concatenating assignment operator (`+=`) SHOULD be separated with one space on each side.

### Control Structures
- Control statements MUST have one space between the control keyword and opening parenthesis.
- Control structures MUST always use curly braces.

### Comparisons
- Strict equality MUST be used in comparisons (`===` or `!==`).

### Comma Operator
- You SHOULD NOT use the comma operator, with the exception of the control part in `for` statements.


## Documentation

### JavaScript Documentation
- All JavaScript items must have documentation headers to be recognized by the parser.
- Use `{}` brackets for data types in `@param` and `@return`: `@param {Type} paramName`.
- Use `@fires` to document events triggered by functions; include `@event` for custom events.
- Use `@prop {type} name` for properties of non-namespace objects.
- Use `@name` for naming discrepancies, `@constructor` for class constructors, and `@namespace` for namespaces.
- Avoid using `@function` as JSDoc infers functions automatically.

### Tag Order
- Declare tags in this order:
  - `@global`
  - `@typedef`
  - `@var`
  - `@name`
  - `@namespace`
  - `@constructor`
  - `@callback`
  - `@event`
  - `@function`
  - `@augments`
  - `@lends`
  - `@type`
  - `@prop`
  - `@param`
  - `@return`
  - `@throws`
  - `@fires`
  - `@listens`
  - `@ingroup`
  - `@deprecated`
  - `@see`
  - `@todo`
  - `@ignore`


## Jquery

### Variable Naming
- Prefix variables that point to jQuery objects with a dollar sign ($).

### Event Handling
- Use event.preventDefault() and event.stopPropagation() explicitly instead of returning false.

### Function Structure
- Separate functions into individual callable units.

### Selector Context
- Always provide a context for selectors to improve performance.

### ID vs Class Selection
- Use #id for unique elements and .class for multiple elements, preferably within a context.

### jQuery.attr() Usage
- Use booleans to set properties instead of empty strings.

### jQuery.each() Usage
- Prefer native JavaScript loops over jQuery.each() for iterating simple arrays or objects.



# Markup

## Drupal Markup Style Guide

### HTML/Markup
- Use semantic HTML elements to enhance accessibility and SEO.
- Ensure all HTML elements are properly nested and closed.
- Use lowercase for all HTML tags and attributes.
- Use double quotes for attribute values.

### Base Templates
- Use Twig for templating to separate logic from presentation.
- Avoid inline styles; use CSS classes for styling.
- Keep templates DRY (Don't Repeat Yourself) by using includes and blocks.

### CSS Classes
- Use BEM (Block Element Modifier) methodology for naming CSS classes.
- Prefix custom classes with a unique identifier to avoid conflicts.
- Avoid using IDs for styling; prefer classes for reusability.



# Php

## Coding

### Arrays
- Use short array syntax. 
- Break multi-line arrays into separate lines, indented one level, with a comma after the last element.

### Casting
- Place a space between the type and the variable in a cast.

### Chaining
- Methods should return `$this` for chainability where applicable.
- Indent chained method calls with 2 spaces if spanning multiple lines.

### Class Constructor Calls
- Always include parentheses when calling class constructors, even with no arguments.

### Control Structures
- Use one space between the control keyword and the opening parenthesis.
- Always use curly braces for control structures.
- Use `elseif` instead of `else if`.

### Declaring Classes
- One class or interface per file, named after the class.

### Function Calls
- No spaces between the function name and the opening parenthesis; spaces between parameters.

### Function Declarations
- Split argument lists across multiple lines, with one argument per line and a trailing comma on the last argument.

### Indenting and Whitespace
- Use 2 spaces for indentation, no tabs.
- No trailing whitespace at the end of lines.
- All text files should end with a single newline.

### Instantiation
- Use factory functions for creating classes instead of direct instantiation.

### Line Length and Wrapping
- Keep lines of code under 80 characters, except for specific cases.

### Naming Conventions
- Functions and variables: use lowercase with underscores; prefix functions with the module name.
- Constants: use uppercase with underscores; module-defined constants should be prefixed by the module name.
- Classes and interfaces: use UpperCamelCase; methods and properties use lowerCamelCase.

### Operators
- All binary operators should have spaces before and after.
- Use `!=` for weak-typed inequality; avoid `<>`.
- Use the short ternary operator `?:` and the null coalescing operator `??` for readability.

### Parameter and Return Type Hinting
- Use type hints for all new functions and methods.

### PHP Code Tags
- Use `<?php ?>` for PHP code delimiters; omit `?>` at the end of files.

### Quotes
- Use single quotes by default, except for variable interpolation and translated strings.

### Semicolons
- Require semicolons at the end of all lines, including one-line blocks.

### Strict Type Declaration
- Place the `declare(strict_types=1);` statement on a new line after the opening PHP tag.

### String Concatenations
- Use a space between the dot and concatenated parts; use double quotes for simple variable concatenation.

### Use of Interfaces
- Encourage separate interface definitions for flexibility and documentation.

### Visibility
- Declare visibility for all methods and properties; do not prefix method names with an underscore.

### abstract, final, and static
- Place `abstract` and `final` before visibility; place `static` after visibility.


## Documentation

### General considerations for API module parsing
- Use docblocks starting with `/**` for documentation.
- Only docblocks are parsed; inline comments (`//` or `/*`) are ignored.
- Docblocks must precede the item being documented without blank lines.

### General documentation
- All documentation must use proper grammar and punctuation.
- Summaries must be under 80 characters, start with a capital letter, and end with a period.
- Document the current version of code, not past or future changes.

### Classes and namespaces
- Document all classes and methods, including private methods.
- Use fully-qualified namespaces for classes and interfaces in documentation.

### Data types in documentation
- Use PHPDoc Type syntax for data types.
- Prefix types with fully-qualified namespaces.

### Functions
- Document each parameter with `@param` and return values with `@return`.
- Summaries must start with a third person singular present tense verb.

### In-line code comments
- Place comments on a separate line before the code they reference.
- Use `@todo` for inline comments to indicate tasks.

### Lists in documentation
- Use hyphens for list items, with proper indentation for nesting.
- Each list item must be on its own line without blank lines between items.

### Order of documentation sections
- Follow the order: summary, additional explanation, `@var`, `@param`, `@return`, `@throws`, `@ingroup`, `@deprecated`, `@see`, `@todo`, `@Plugin`.

### PHPUnit and Simpletest tests
- Follow Class standards with specific tags like `@group`, `@covers`, and `@coversDefaultClass`.

### @deprecated
- Use to indicate deprecated functionality with version strings for deprecation and removal.

### @file
- Include a `@file` docblock for PHP files, summarizing the file's purpose.

### {@inheritdoc}
- Use to inherit documentation from a parent class or interface.

### @link
- Use for HTML links in docblock text.

### @param
- Document parameters with `@param`, including data type and description.

### @return
- Document return values with `@return`, including data type and description.

### @see
- Use `@see` for references to related items, with each reference on its own line.

### @throws
- Document exceptions thrown by functions with `@throws`, including class names and optional descriptions.

### @todo
- Use `@todo` for tasks in documentation, referencing corresponding issues when applicable.

### @var
- Use `@var` to document class property data types, following with a space and data type specification.


## Documentation Examples

### Php

- **File Documentation**: Use `@file` to describe the purpose of the file.
- **Function Documentation**: Use `@param` for parameters and `@return` for return values.
- **Callback Functions**: Document the context of usage in the callback description.
- **Hook Definitions**: Specify that the hook must be defined in the appropriate file for detection.
- **Themeable Functions**: Use `@ingroup themeable` to indicate themeable functions.
- **Class Documentation**: Include the namespace and a brief description of the class's purpose.
- **Interface Documentation**: Clearly state the purpose of the interface and its methods.
- **Member Functions**: Document overrides and implementations of interface methods.
- **Constants**: Use clear descriptions for constants, indicating their purpose.
- **Global Variables**: Document global variables in separate API files.
- **Lists**: Use bullet lists for clarity in documentation.
- **Code Samples**: Use `@code` for code snippets and `@endcode` to close them.
- **Links**: Use `@link` for references to related documentation.
- **See Also**: Use `@see` for references to related hooks or functions.
- **Grouping**: Use `@ingroup` to categorize functions or hooks appropriately.


## E_all

### Error Reporting
- Set `php_value error_reporting -1` in `.htaccess` for development sites.

### Variable Checks
- Use `isset()` for checking if a variable is defined.
- Use `!empty()` when checking if a variable has a non-empty value.
- Prefer `is_null()` when testing for `NULL` values from SQL queries.


## Exceptions

### Basic Exception Naming Conventions
- Exceptions must end with "Exception".
- Include an appropriate message; do not translate messages.
- Message should hint at values causing the exception; use string concatenation or `sprintf()`, and surround values with single quotes.
- Exception classes should be named as `[Subsystem][ErrorType]Exception`.

### Exception Subclasses
- Prefer subclassed Exceptions over a single generic Exception class for different error messages.

### Try-catch blocks
- Each catch statement should begin on a new line.

### Inheritance
- All exceptions must inherit from the Exception class. If multiple exceptions exist in a subsystem, they should extend a common base exception.


## Index

### PHP Standards
- Use `<?php` for opening PHP tags.
- Use `===` and `!==` for comparisons to avoid type juggling.
- Declare strict types by adding `declare(strict_types=1);` at the top of files when applicable.
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Use snake_case for file names.
- Limit lines to 80 characters.
- Use spaces, not tabs, for indentation (4 spaces).
- Place opening braces on the same line as the declaration.
- Use a single blank line to separate logical sections of code.
- Use `array()` instead of `[]` for array declarations in legacy code.
- Avoid using short array syntax `[]` in legacy code.
- Use `NULL` instead of `null` for consistency.
- Use `true` and `false` in lowercase.
- Use single quotes for strings unless interpolation is needed.
- Use `isset()` to check for variable existence before use.
- Avoid using `die()` and `exit()`; use exceptions instead.
- Use `@` to suppress errors sparingly; handle errors properly instead.
- Use `return` statements consistently in functions.


## Namespaces

### "use"-ing classes
* Classes with a backslash in their fully-qualified name must not use their fully-qualified name; use a `use` statement instead.
* Classes without a backslash must be fully qualified when used in a namespaced file; do not `use` global classes.
* In files without a namespace, classes in any namespace must be specified with a `use` statement.
* When importing a class with `use`, do not include a leading backslash.
* Specify a single class per `use` statement; do not combine multiple classes.
* API documentation should use full class names; if a class is used multiple times, it must be `use`d first.

### Class aliasing
* Alias classes only to avoid name collisions; prefix colliding classes with the next higher portion of the namespace.

### Order of import
* There are no specific rules for ordering `use` statements; prioritize code readability.

### Modules
* Modules creating classes must place their code inside a custom namespace following the convention: `Drupal\module_name\...`.


## Naming Services

### Php
- Prepend "_" to attributes added to the Request object by any module or service, except for values from the path.  
- Do not overwrite prefixed attributes added by Drupal core or Symfony.


## Placeholders Delimiters

### Temporary Place-holders
- Use appropriate alpha-numeric strings for place-holders, prefixed by the module name and a hyphen or underscore, surrounded by `[`…`]`.
- Avoid using obscure characters as place-holders to ensure compatibility with browsers and feed-readers. 

### Finding Placeholders
- Use PCRE patterns that match the defined structure of your place-holders for accurate string processing.


## Psr4

### Namespace and Directory Structure
- Each module must have a namespace that matches its module name.
- The module's namespace maps to the `./src/` folder in the module directory.
- Class names must directly correspond to the directory and file structure in the `./src/` folder.
- Each PHP class, interface, or trait must reside in a separate PHP file.

### Naming Conventions
- Use lowercase characters and underscores for the unique machine name of the module.
- The namespace for module classes follows the format `Drupal\$modulename\`.

### Testing
- Use PHPUnit for testing in the `modules/$modulename/tests/src/` directory.
- SimpleTest is deprecated; avoid using it for new tests.



# Spelling

## Spelling
### General
- Use US English spelling for all source code, comments, and names.

### CSpell Usage
- Use all lower case for `cspell` in inline documentation settings.
- Use `cspell:ignore` directive for ignoring words, listed alphabetically with a single space between them.
- Disable CSpell for non-English or nonsense strings using `cspell:disable-next-line`.
- For multiple lines, disable CSpell before the lines and enable it after.



# Sql

## Avoid "SELECT * FROM ..."
### Rules
- Avoid using `SELECT * FROM {node}` to prevent security issues with Node Access.
- Always explicitly list fields to be retrieved in queries.
- Use `SELECT *` only if fields are dynamic and unknown at development time or if the list of fields is prohibitively long.


## List of SQL reserved words
### Reserved Words
- Avoid using SQL reserved words as identifiers (e.g., table names, column names).
- Use backticks or double quotes around identifiers if they must match reserved words.
- Regularly check for updates to reserved words in the SQL dialect being used.


## SQL coding conventions

### Reserved Words
- Quote all identifiers in SQL queries. Use `{}` for table names and `[]` for other identifiers.
- Avoid using reserved words for column and table names.

### Capitalization and user-supplied data
- Use UPPERCASE for SQL reserved words.
- Use lowercase for column and constraint names.
- Move variable arguments out of the query body and use placeholders for proper escaping to prevent SQL injection.
- Enclose string literals and `%s` placeholders in single quotes.

### Naming
- Use singular nouns for table names.
- Prefix table names with the module name.
- Name every constraint explicitly to avoid system-generated names.
- Index names should begin with the table name they depend on.

### Database server configuration
- Configure database servers for standard compliance, enabling ANSI and Strict Mode in MySQL.



# Twig

## Twig coding standards

### The DocBlock
- Wrap the entire docblock in Twig comment markers {# and #}.
- Include `@ingroup themeable` only if providing default themeable output.

### Variables in the DocBlock
- Reference variables by name without Twig print indicators or PHP variable indicators.
- Do not include a separate "Other variables" section.

### Variable definitions in the DocBlock
- Omit type information for variables.

### Variables referenced inline in the DocBlock
- Wrap variable names in single quotes when referenced inline.

### Expressions
- Use `&#123;&#37; if variable &#37;&#125;` to check for variable availability without 'is defined'.
- Use `&#123;&#37; for item in collection &#37;&#125;` for looping without array keys.
- Use `&#123;&#37; set variable = value &#37;&#125;` for setting variables.

### HTML attributes
- Print all attributes using `&#123;&#123; attributes &#125;&#125;` and include it at the end of the tag.
- Print the class attribute directly in the template for ease of use.

### Whitespace Control
- Use the `spaceless` filter to remove non-text whitespace between HTML and Twig tags.
- Use the dash character `-` sparingly for precise whitespace control.

### Filters
- Use filters with the pipe character `|` without spaces on either side.

### Comments
- Surround all comments with Twig comment indicators {# and #}.
- Keep comments under 80 characters per line.



# Yaml

## YAML Configuration files

### Format
- Configuration files use YAML syntax.

### Filename
- Configuration file name must have a `.yml` extension.
- Unique configuration name cannot exceed 250 characters.

### Simple configuration
- Unique configuration name must start with the extension name.

### Configuration entities
- Unique configuration name format: `(extension).(config_prefix).(suffix)`.
- Extension names cannot exceed 50 characters.
- Config entity config prefixes cannot exceed 32 characters.
- Suffix cannot exceed 150 characters.

### Comments
- Use `#` for comments.

### Whitespace
- Use two spaces for indentation.


{% endraw %}