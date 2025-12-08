{% raw %}
# Drupal Coding Standards - AI Agent Reference



# Composer

## Composer package name convention

### Drupal Projects
- Projects must use the package name: `drupal/PROJECT`.

### Modules, Themes and Profiles
- Sub-modules, -themes and profiles must use the package name: `drupal/SUBPROJECT`.

### Components
- Package names must be prefixed with their parent's name and a dash: `drupal/PARENT-COMPONENT`.



# Css

## Coding

### CSS Formatting
- Write CSS for maximum clarity to enhance collaboration and ease of development.

### CSS Architecture
- Follow best practices for grouping rulesets into files to maintain organization and scalability.


## CSS architecture (for Drupal 9)

### Predictability
- CSS should be consistent and understandable; changes should not have side effects.

### Reusability
- CSS rules must be abstract and decoupled to facilitate quick component creation.

### Maintainability
- CSS should allow easy addition, modification, and extension without breaking existing styles.

### Scalability
- CSS must be manageable for both individual developers and large teams.

### Avoid reliance on HTML structure
- Use classes for styling; avoid id selectors and overly complex selectors.

### Naming conventions
- Use full words, dashes between words, and prefix component elements with the component name followed by two underscores.

### Modifier classes
- Create component variants with a suffix preceded by two dashes; both base and modifier classes must appear together in the markup.

### Separate concerns
- Components should not manage their layout; use dedicated classes for JavaScript manipulation prefixed with 'js-'.

### Specificity and `!important`
- Avoid id selectors; use `!important` sparingly, primarily for states that must override others.


## CSS file organization

### File Structure
- Group rulesets into logical files to enforce separation of concerns.
- Follow SMACSS-style categorization: Base, Layout, Component, State, Theme.
- Place all module styles in a `css/` sub-directory.
- Use `module_name.module.css` for minimal functional styles.
- Use `module_name.theme.css` for aesthetic styles.
- Use `module_name.admin.css` for admin screen styles.
- Use `module_name.admin.theme.css` for aesthetic admin styles.
- Modules should not include base styles; use Normalize.css instead.
- Name CSS files the same as their corresponding template files.

### CSS files for Drupal themes
- Separate Base, Layout, and Component styles into individual files.
- For complex themes, consider individual files for each component.
- Include state rules with their respective components.
- Theme rules may be included with corresponding components.

### Aggregating CSS
- In Drupal 8 and later, themes can override stylesheets without affecting original styles.
- Maintain a clear order of styles within aggregates based on weight:
  - Base styles: -200
  - Layout styles: -100
  - Component styles: 0
  - State styles: 100
  - Theme styles: 200
- Avoid conditionally-loaded base styles.


## Format

### Whitespace
* Use 2 spaces for each level of indentation.
* Declarations should be indented one level relative to their selector.
* Rulesets within a media query should be indented one level relative to the media statement.
* There MUST NOT be any whitespace at the end of lines.
* All text files should end with a single blank line.
* Files should be formatted with Unix line endings.

### Comments
* Each file should start with a comment describing what the file does, followed by a blank line.
* Short comments describing a ruleset can be kept to one line.
* Multi-line comments that require 2 or more lines must follow the Doxygen comment style.
* Multi-line comments within a ruleset must be preceded with `/*` and terminated by `*/`.

### Rulesets
* Use one selector per line when a ruleset has a group of selectors.
* Include one declaration per line in a declaration block.

### Properties
* The property name should be immediately followed by a colon, then a single space, and then the property’s value.
* Include a semicolon at the end of all declarations.
* Use double quotes for property values that require quotes.
* Default to rem units, unless it creates an undesired effect.
* Quote attribute values in selectors.
* Avoid specifying units for zero-values.
* Include a space after each comma in comma-separated property or function values.
* Do not use spaces around the parentheses in a function.
* Use lower case function names.

### Declaration order
* Order declarations to make the purpose of the declaration block obvious.
* Vendor prefixed properties should be directly before their non-prefixed version if not automatically added by autoprefixer.


## What to look for when reviewing CSS
### Architecture guidelines
- Ensure all CSS code is still in use and applies correctly.
- Identify and remove redundant CSS that overrides unnecessary values.
- Verify that component names accurately describe their design semantics.
- Abstract custom CSS into reusable component classes when possible.
- Use short and simple selectors, favoring component and sub-component classes.
- Organize CSS components into their own files, ensuring related styles are grouped together.

### Formatting guidelines
- Add a file comment to the top of the stylesheet.
- Ensure all comments are formatted correctly.
- Use whitespace correctly, including indentations and line breaks.
- Format rulesets, properties, and media queries correctly.
- Ensure existing RTL styles are formatted correctly.



# General

## Coding Standards

### General
- All new code must follow the current Drupal coding standards.
- Comments and names should use US English spelling.
- Coding standard fixes should be applied by rule, not by individual files.



# Javascript

## Before running these commands, install node.js, npm, and npx
### JavaScript Standards
- Use ESLint to ensure JavaScript code consistency and error-free syntax.
- Contrib modules must conform to ESLint requirements.
- Custom modules can create their own `.eslintrc.json` to adjust rules and add global variables as needed.


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
- All output to the browser provided by a user SHOULD be escaped through `Drupal.checkPlain()`.

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
- Pre-defined constants SHOULD be all-uppercase and words separated by underscores: `UPPER_UNDERSCORED`.
- Arrays SHOULD be formatted with one space separating each element and the assignment operator.
- Use trailing commas after the last element in multi-line arrays.

### Typeof
- In type comparisons, the value tested MUST NOT be wrapped in parenthesis.

### Functions
- Function names SHOULD begin with the name of the module or theme declaring the function.
- The `function` keyword MUST be followed by one space.
- Named functions MUST NOT have a space between the function name and the following left parenthesis.
- Optional arguments SHOULD be defined at the end of the function signature.
- Every function SHOULD attempt to return a meaningful value.

### Function Calls
- Functions SHOULD be called with no spaces between the function name, the opening parenthesis, and the first parameter.
- There SHOULD be one space between commas and each parameter.

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

### JavaScript Documentation Standards
- All JavaScript items must have documentation headers for recognition by the parser.
- Use `{}` brackets to indicate data types in `@param` and `@return` tags.
- Use `@fires` to document events triggered by a function; add `@event` for custom events.
- Use `@prop {type} name` to document properties of non-namespace objects.
- Use `@name` to specify the documented name if it differs from the code name.
- Use `@constructor` for class constructor functions.
- Use `@namespace` for objects intended as namespaces.
- Do not use `@function` unless overriding default assumptions.

### Tag Order
- Declare tags in the following order:
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

### Event Delegation
- Use event.preventDefault() and event.stopPropagation() explicitly instead of returning false to manage event behavior.

### Function Structure
- Separate functions into individual functions for better reusability.

### Context
- Provide a context for selectors to improve performance; use find() on cached selections.

### Selector Efficiency
- Prefer using #id for single elements over .class for better performance.

### jQuery.attr()
- Use booleans to set properties instead of empty strings; do not assume property values are always booleans.

### jQuery.each()
- Use native JavaScript for loops instead of jQuery.each() for iterating over simple arrays or objects for better performance.



# Php

## Coding

### Arrays
- Use short array syntax with spaces after commas and around the => operator.
- In multi-line arrays, each element must be on its own line and indented one level.
- Always include a comma after the last element in multi-line arrays.

### Casting
- Put a space between the (type) and the $variable in a cast.

### Chaining
- Methods should return $this for chainable methods.
- Indent chained method calls with 2 spaces if spanning multiple lines.

### Class Constructor Calls
- Always include parentheses when calling class constructors, even with no arguments.

### Control Structures
- Use one space between the control keyword and the opening parenthesis.
- Always use curly braces for control structures.
- Use "elseif" instead of "else if".

### Declaring Classes
- One class or interface per file, named after the class.

### Function Calls
- No spaces between the function name and the opening parenthesis; spaces between commas and parameters.

### Function Declarations
- Split argument lists across multiple lines with one argument per line and a trailing comma on the last argument.

### Indenting and Whitespace
- Use an indent of 2 spaces, with no tabs.
- Lines should have no trailing whitespace.
- All text files should end in a single newline.

### Instantiation
- Use factory functions to create classes instead of direct instantiation.

### Line Length and Wrapping
- Keep lines of code under 80 characters, except for specific cases.

### Naming Conventions
- Functions and variables should use lowercase with underscores; functions should have a module prefix.
- Constants should be all-uppercase with underscores; module-defined constants should be prefixed by the module name.

### Operators
- All binary operators should have a space before and after.
- Use `!=` for weak-typed inequality; do not use `<>`.
- Use the short ternary operator `?:` and the null coalescing operator `??` for readability.

### Parameter and Return Type Hinting
- Use type hints for all new functions and methods.

### PHP Code Tags
- Always use `<?php ?>` to delimit PHP code.

### Semicolons
- Require semicolons at the end of all lines, including one-line blocks.

### Strict Type Declaration
- Place the declare statement on a new line after the opening PHP tag.

### String Concatenations
- Use a space between the dot and concatenated parts.

### Use of Interfaces
- Use separate interface definitions for flexibility in extending code.

### Visibility
- Declare visibility on all methods and properties; do not use underscores for visibility indication.

### abstract, final, and static
- Place `abstract` and `final` declarations before visibility; place `static` after visibility.


## Documentation

### General considerations for API module parsing
- Use docblocks starting with `/**` for documentation.
- Documentation must be directly above the item being documented, with no blank line in between.
- The API module recognizes files with specific PHP extensions.

### General documentation
- All documentation must form proper sentences with correct grammar and punctuation.
- Use a space between the comment character and the first letter of the sentence.
- Document the current version of the code, not past or future changes.
- Use US English spelling in comments and variable names.
- All caps are reserved for constants in comments.
- Lines containing comments must wrap as close to 80 characters as possible.
- Every function, constant, class, interface, and file must be documented.
- Summaries must be under 80 characters, start with a capital letter, and end with a period.

### Classes and namespaces
- Document all classes and their methods, including private methods.
- Use third person verbs to start summaries for classes, interfaces, or methods.
- Use fully-qualified namespaces when documenting classes and interfaces.

### Data types in documentation
- Prefix types with the fully-qualified namespace for classes and interfaces.
- Spell types correctly: array, bool, true, false, int, null, object.

### Functions
- Document each parameter with a `@param` tag.
- Document return values with a `@return` tag if applicable.
- Summaries for most functions must start with a third person singular present tense verb.

### In-line code comments
- Use comments to clarify complex code sections.
- Comments should be on a separate line immediately before the referenced code.

### Order of documentation sections
- Follow the specified order for documentation sections in docblocks: summary, additional explanation, `@var`, `@param`, `@return`, `@throws`, `@ingroup`, `@deprecated`, `@see`, `@todo`.

### PHPUnit and Simpletest tests
- Follow class standards for PHPUnit and Simpletest, including specific tags like `@group`, `@covers`, and `@coversDefaultClass`.

### @deprecated
- Use the `@deprecated` tag to indicate deprecated functionality, including version strings for deprecation and removal.

### @see
- Use the `@see` tag for references, placing each reference on its own line.

### @throws
- Document exceptions thrown by functions or methods using the `@throws` tag.

### @todo
- Use the `@todo` tag for notes on future improvements or issues to address.


## Documentation Examples

### File Documentation
- Use `@file` to describe the purpose of the file.

### Function Documentation
- Document all parameters with `@param` and return values with `@return`.
- Use clear descriptions for callback functions, specifying where they are used.

### Hook Documentation
- Document hooks with `@param` for input parameters and `@return` for output.
- Specify the hook name in the documentation comment.

### Class Documentation
- Use `@class` to describe the class purpose.
- Document member functions with `@param`, `@return`, and specify if they override or implement methods.

### Themeable Functions
- Document themeable functions with `@ingroup themeable`.

### Constants
- Use clear descriptions for constants, indicating their purpose.

### Lists
- Use bullet lists for clarity when documenting multiple items or options.


## E_all
### Php
- Adjust error reporting on development sites to view all PHP errors.
- Use `isset()` or `!empty()` to test variables, array elements, or object properties to avoid E_NOTICE errors.
- Prefer `!empty()` when checking for existence and non-empty values, and use `isset()` when checking for variable definition.
- Use `is_null()` when testing for NULL values, especially for variables returned by SQL queries.


## Exceptions

### Basic Exception Naming Conventions
- Exceptions must end with the suffix "Exception".
- Include an appropriate message that is not translated.
- Message should hint at the values that caused the exception.
- Format messages by concatenating strings or using `sprintf()`.
- Surround values in messages with single quotes.
- Exception classes should be named for the subsystem and the type of error.

### Exception Subclasses
- Prefer subclassed Exceptions over a single generic Exception class.

### Try-catch blocks
- Follow a line-breaking pattern similar to if-else statements, with each catch statement on a new line.

### Inheritance
- All exceptions must inherit from the Exception class.
- New exception classes should be named according to their subsystem and error message, and extend from a common base exception if applicable.


## Namespaces

### "use"-ing classes
* Classes and interfaces with a backslash `\` must not use their fully-qualified name; use a `use` statement instead.
* Classes and interfaces without a backslash must be fully qualified when used in a namespaced file.
* In files without a namespace, use statements are required for classes in any namespace other than global.
* Do not include a leading `\` when importing a class with "use".
* Use full class names including namespace in strings, escaping the namespace separator in double-quoted strings.
* Specify a single class per use statement.
* API documentation should use full class names; if a class is used multiple times, it must be "use"ed before using short names.

### Class aliasing
* Alias classes only to avoid name collisions, prefixing with the next higher portion of the namespace if necessary.

### Modules
* Modules creating classes must place their code inside a custom namespace beginning with `Drupal\module_name\`.


## Naming Services

### Php
- Prepend a "_" to attributes added to the Request object by any Drupal module or service, except for those coming from the path.


## Placeholders Delimiters
### Temporary Place-holders and Delimiters
- Use an appropriate alpha-numeric string as a place-holder, prefixed by the module name and a hyphen or underscore, and surrounded by `[`…`]`.
- The closing delimiter can incorporate a `/` after the initial `[` and may suffix the module name.


## Psr4
### Namespace and Directory Structure
- Each module must have a namespace that corresponds to its module name.
- The module's namespace is mapped to the `./src/` folder in the module directory.
- Each part of a namespaced class name maps directly to the directory and file structure in the `./src/` folder.
- Each PHP class, interface, or trait must reside in a separate PHP file.



# Spelling

## Spelling
### General Rules
- Use US English spelling for all source code, comments, and names.

### CSpell Usage
- Use `cspell:ignore` directive for ignoring specific words, listed alphabetically with a single space between them.
- Disable CSpell for non-English or nonsensical strings using `cspell:disable-next-line`.
- For multiple lines, disable CSpell before the lines and enable it after using `cspell:disable` and `cspell:enable`.



# Sql

## Avoid "SELECT * FROM ..."
### Rules
- Avoid using `SELECT * FROM {node}` to prevent security issues with Node Access.
- Always explicitly list fields to be retrieved instead of using `SELECT *`.
- Use `SELECT *` only when fields are dynamic and unknown at development time or when the list of fields is prohibitively long.


## SQL coding conventions

### Reserved Words
* All identifiers in SQL queries must be quoted. Use `{}` for table names and `[]` for other identifiers.
* Avoid using reserved words for column and table names.

### Capitalization and user-supplied data
* SQL reserved words must be in UPPERCASE.
* Column and constraint names must be in lowercase.
* Use placeholders for variable arguments in queries to prevent SQL injection. 

### Naming
* Use singular nouns for table names.
* Prefix table names with the module name.
* Name every constraint explicitly to avoid system-generated names.
* Index names should start with the table name they depend on.

### Configure your Database server for standard compliance
* Use the most standard compliant mode available for your database server.



# Twig

## Twig coding standards

### The DocBlock
- A docblock at the top of a Twig template must be wrapped in Twig comment markers {# and #}.
- Include `@ingroup themeable` only if the template provides the default themeable output.

### Variables in the DocBlock
- Reference variables by name without Twig print indicators or PHP variable indicators.
- Do not include an "Other variables" section.

### Variable definitions in the DocBlock
- Do not specify the type of variable in definitions.

### Variables referenced inline in the DocBlock
- Wrap variable names in single quotes when referenced inline.

### Expressions
- Use `&#123;&#37; if variable &#37;&#125;` to check if a variable is available for printing without 'is defined'.
- Use `&#123;&#37; for item in collection &#37;&#125;` for looping without needing array keys.

### HTML attributes
- Print all attributes using `&#123;&#123; attributes &#125;&#125;` or print individual attributes but include `&#123;&#123; attributes &#125;&#125;` at the end.

### Whitespace Control
- Use the `spaceless` filter to remove whitespace between HTML and Twig tags.
- Use the dash character `-` sparingly for precise whitespace control.

### Filters
- Use filters with the pipe character `|` without spaces on either side.

### Comments
- Surround all comments with Twig comment indicators {# and #}.



# Yaml

## YAML Configuration files

### Format
- Configuration files use YAML syntax.

### Filename
- The configuration file name must have a `.yml` extension.
- The unique configuration name cannot exceed 250 characters.

### Simple configuration
- The unique configuration name must start with the extension name of the owning module, theme, or install profile.

### Configuration entities
- The unique configuration name must have a prefix in the format `(extension).(config_prefix)`.
- Extension names cannot exceed 50 characters.
- Config entity config prefixes cannot exceed 32 characters.
- The suffix of the unique configuration name is limited to 150 characters.

### Comments
- Comments can be made using `#`.

### Whitespace
- Use two spaces to indent in config files.


{% endraw %}