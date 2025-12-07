{% raw %}
# Drupal Coding Standards - AI Agent Reference

## Overview

This document provides comprehensive Drupal coding standards optimized for AI coding agents. It consolidates essential rules and guidelines from the official [Drupal Coding Standards](https://git.drupalcode.org/project/coding_standards) repository.

## Purpose

This reference serves:
- **AI Coding Agents** (Cursor, Claude, GitHub Copilot, etc.)
- **Development Tools** with AI integration
- **Automated Code Review** systems
- **Code Generation** tools

## How to Use

Each section contains coding standards for a specific technology or aspect of Drupal development. AI agents should reference the relevant section when working with that particular area.

## Source

Auto-generated from: [git.drupalcode.org/project/coding_standards](https://git.drupalcode.org/project/coding_standards)

---

## Table of Contents

- [Composer](#composer)
- [Css](#css)
- [General](#general)
- [Javascript](#javascript)
- [Markup](#markup)
- [Php](#php)
- [Spelling](#spelling)
- [Sql](#sql)
- [Twig](#twig)
- [Yaml](#yaml)

---


# Composer

## Composer package name convention

### Drupal Projects
- Use package name format: `drupal/PROJECT`
  - `PROJECT` corresponds to the project part of the URL.
- Examples:
  - `drupal/drupal` for Drupal core
  - `drupal/ctools` for ctools
  - `drupal/views` for Views in Drupal 7
  - `drupal/core` for core
  - `drupal/datetime` for Datetime module

### Modules, Themes, and Profiles
- Use package name format: `drupal/SUBPROJECT`
  - `SUBPROJECT` is the machine name of the module, theme, or profile.
- Ensure no naming conflicts with existing projects.
- Examples:
  - `drupal/devel_generate` for Devel module
  - `drupal/views` for Views module in core

### Components
- Use package name format: `drupal/PARENT-COMPONENT`
  - `PARENT` is the parent package name, `COMPONENT` is the component name.
- Avoid conflicts by using a dash (`-`).
- Examples:
  - `drupal/core-datetime` for Datetime component
  - `drupal/core-diff` for Diff component
  - `drupal/panels-renderer` for contrib components



# Css

## Coding

### CSS Formatting
- Use consistent indentation (2 spaces).
- Place each property on a new line.
- Use lowercase for property names and values.

**Example:**
```css
.selector {
  property: value;
  another-property: another-value;
}
```

### CSS Architecture
- Aim for clarity and maintainability in your CSS.
- Avoid overly complex selectors; prefer simple, readable ones.
- Group related styles together in a logical order.

### Grouping Rulesets
- Organize CSS files by functionality (e.g., layout, components).
- Use a consistent naming convention for files (e.g., `component-name.css`).
- Keep file sizes manageable; split large files into smaller, modular ones.


## CSS architecture (for Drupal 9)

### Goals
- **Predictable**: Ensure CSS is consistent and understandable.
- **Reusable**: Create abstract CSS rules for quick component building.
- **Maintainable**: Allow easy modification and extension without breaking existing styles.
- **Scalable**: Manage CSS effectively for both individual developers and large teams.

### Component Structure
- Components are discrete UI elements made of HTML, CSS, and sometimes JavaScript.

### Common CSS Pitfalls
- **Context-based Modifications**: Avoid modifying components based on context (e.g., `.sidebar .component {}`).
- **HTML Structure Dependence**: Do not rely on HTML structure in selectors (e.g., avoid `nav > ul > li > a`).
- **Generic Class Names**: Avoid overly generic names (e.g., `.widget .title {}`).
- **Overloaded Rules**: Do not combine multiple styles in one rule.
- **Undoing Styles**: Avoid creating rules that undo other styles (e.g., `.component-no-padding`).

### Best Practices
- **Avoid HTML Structure Reliance**:
  - Use classes for styling, not IDs.
  - Keep selectors short; prefer single classes.
  - Example:
    ```css
    .slat + .slat {
      border-top: 1px solid #cccccc;
    }
    ```

- **Define Elements with Classes**:
  - Use component prefixes for elements:
    ```css
    .component {}
    .component__header {}
    ```

- **Use Modifier Classes**:
  - Create variants with suffixes:
    ```css
    .button {}
    .button--primary {}
    ```
  - Example HTML:
    ```html
    <button class="button button--primary">Save</button>
    ```

- **Separate Concerns**:
  - Do not set layout properties in components.
  - Use `js-` prefix for JavaScript hooks (e.g., `.js-slider`).

### SMACSS Categories
1. **Base**: Styles for HTML elements only; no class selectors.
2. **Layout**: Arrangement of elements (e.g., grid systems).
3. **Component**: Reusable UI elements; primary focus of Drupal CSS.
4. **State**: Styles for transient changes (e.g., `.is-active`).
5. **Theme**: Visual styles that do not affect functionality.

### Naming Conventions
- Use full words, not abbreviations (e.g., `class="button"`).
- Use dashes between words (e.g., `class="button-group"`).
- Example class structure:
  ```css
  .component-name
  .component-name--variant
  .component-name__sub-object
  ```

### Specificity and `!important`
- Avoid using IDs in CSS; they increase specificity.
- Use `!important` sparingly, primarily for themes or critical states.

### Example Component
- **HTML**:
  ```html
  <div class="progress">
    <label class="label">Installing Node Module</label>
    <div class="progress__track">
      <div class="progress__bar js-progress-percent" style="width: 63%"></div>
    </div>
    <div class="progress__description">
      <div class="layout-pull">Installed 15 of 24 modules</div>
      <strong class="layout-push">63%</strong>
    </div>
    <button class="progress__cancel" href="#" title="cancel">cancel</button>
  </div>
  ```

- **CSS**:
  ```css
  .progress {}
  .progress__track {}
  .progress__bar {}
  .progress__description {}
  .progress__cancel {}
  ```

This concise guide provides essential rules for CSS architecture in Drupal 9, focusing on best practices and actionable guidelines for AI coding agents.


## CSS file organization

### File Structure
- Group CSS rules into logical files to enforce separation of concerns.
- Follow SMACSS-style categorization:
  - **Base**: HTML element styling, typography, resets, utility classes.
  - **Layout**: Overall page layout.
  - **Component**: Styles for individual components (e.g., navigation, footer).
  - **State**: Include component states within their respective stylesheets (rarely used).
  - **Theme**: Styles affecting overall theme aesthetics (use CSS custom properties).

### CSS files for Drupal modules
- Place all styles in a `css/` sub-directory:
  - `module_name.module.css`: Minimal styles for module functionality.
  - `module_name.theme.css`: Aesthetic styles for module functionality.
  - `module_name.admin.css`: Minimal styles for admin screens.
  - `module_name.admin.theme.css`: Aesthetic styles for admin screens.
- **Note**: No base styles in modules; use Normalize.css and drupal.base.css.

### CSS files for Drupal themes
- Separate Base, Layout, and Component styles into distinct files.
- For complex themes, consider individual files for each component.
- Include state rules with the corresponding component.
- Theme rules may be separated or included with components.

Example structure:
```yaml
css:
 base: base.css
 layout: layout.css
 component: components.css
```

### Aggregating CSS
- In Drupal 8+, themes can override styles without affecting original styles.
- Two aggregate types:
  1. **Every page**: Includes base, layout, component, state, and theme styles.
  2. **Conditionally-loaded**: Includes layout, component, state, and theme styles.
- **Note**: No conditionally-loaded base styles.

### Weighting CSS
- Use weights to determine style order:
```php
const CSS_BASE = -200;    // Base styles
const CSS_LAYOUT = -100;  // Layout styles
const CSS_COMPONENT = 0;  // Component styles
const CSS_STATE = 100;    // State styles
const CSS_THEME = 200;    // Theme styles
```

### SMACSS and Sass/Compass
- Combine SMACSS with Sass/Compass for better CSS management.
- Use Sass Globbing for multiple .scss files to generate a single CSS file.


## CSScomb settings for Drupal (CSS formatting and sort tool)

### General Configuration
- Use CSScomb for formatting and sorting CSS properties in `.css`, `.scss`, `.sass`, or `.less` files.
- Place configuration in `.csscomb.json` in the local home folder or project root.

### Exclusions
- Exclude the following directories from processing:
  - `core/**`
  - `modules/**`
  - `profiles/**`
  - `sites/**`
  - `themes/**`
  - `tests/**`
  - `config/**`
  - `includes/**`
  - `tmp/**`
  - `vendor/**`
  - `node_modules/**`
  - `bower_components/**`
  - `lib/**`
  - `src/**`
  - `img/**`
  - `images/**`
  - `icons/**`
  - `js/**`
  - `javascript/**`
  - `scripts/**`
  - `jquery/**`
  - `.git/**`

### Formatting Rules
- Always use semicolons: `"always-semicolon": true`
- Remove empty rulesets: `"remove-empty-rulesets": true`
- Use lowercase for colors: `"color-case": "lower"`
- Use shorthand for colors: `"color-shorthand": true`
- Use double quotes for strings: `"quotes": "double"`
- Maintain a newline after opening braces: `"space-after-opening-brace": "\n"`
- Maintain a newline before closing braces: `"space-before-closing-brace": "\n"`
- Use 2 spaces for indentation: `"block-indent": 2`
- Strip unnecessary spaces: `"strip-spaces": true`

### Sort Order
- Define sort order for CSS properties:
```yaml
"sort-order": [
  [
    "$charset",
    "$import",
    "$namespace",
    "$extend",
    "$variable",
    "$include",
    "position",
    "z-index",
    "top",
    "right",
    "bottom",
    "left",
    ...
    "font-size",
    "font-weight",
    "font-style",
    ...
    "opacity",
    "filter",
    "color",
    "border",
    ...
  ]
]
```

### Usage with Gulp
- Install Gulp CLI globally:
```bash
npm install --global gulp-cli
```
- Create `gulpfile.js` with the following task:
```javascript
gulp.task('style', function() {
  return gulp.src(mySrcStyles)
    .pipe(csscombx())
    .pipe(gulp.dest('./my-dest-styles'));
});
```
- Watch for changes:
```javascript
gulp.task('watch-my-styles', function() {
  var watcher = gulp.watch(mySrcStyles, ['style']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
```

### Alternatives
- Use `csscombx`, a Drupal-specific fork of CSScomb, with default settings matching Drupal standards. Install globally:
```bash
npm install csscombx --global
```
- Perform a dry run:
```bash
csscombx -vl ./
```
- For actual changes, specify files:
```bash
csscombx -v ./my-styles public/styles.css
```


## Format

### Whitespace

#### Indentation
- Use 2 spaces for indentation.
- Indent declarations one level relative to their selector.
- Indent rulesets within media queries one level relative to the media statement.
- Maintain comment indentation with declarations or rulesets.

```css
.tabs__tab {
  display: none;
  margin: 0;
  margin-block-end: calc(-1 * var(--tabs-border-width));

  &.is-active {
    display: flex;
  }
}
```

#### Blank Lines
- Separate each ruleset with a blank line.
- Place a blank line before comments describing a ruleset.
- Add a blank line and a comment if two rulesets are not logically related.

```css
.tabs {
  --tabs-height: var(--sp3);
  /* Comment about tabs */
}

.tabs__tab {
  display: none;
}
```

#### Line Endings
- No whitespace at the end of lines.
- End files with a single blank line.
- Use Unix line endings (`\n`).

### Comments

#### File Comments
- Start each file with a comment describing its purpose.
- Follow with a blank line.

#### Single-Line Comments
- Keep short comments to one line.

#### Multi-Line Comments
- Use Doxygen style for comments longer than one line.

```css
/*
 * @file
 * Example CSS file.
 */
```

#### Inside Rulesets
- Use `/* comment */` for multi-line comments.
- Use simple CSS comments for single-line comments.

### Properties

- Property name followed by a colon, a space, and the value.
- End all declarations with a semicolon.
- Use double quotes for quoted values.
- Default to `rem` units; avoid units for zero-values.
- Include a space after commas in lists.
- No spaces around parentheses in functions.

### Declaration Order
- Order declarations for clarity:
  1. Positioning properties (e.g., `position`, `z-index`).
  2. Box model properties (e.g., `display`, `margin`).
  3. Other properties.

- Vendor-prefixed properties should precede their non-prefixed versions.

### Rulesets
- One selector per line for grouped selectors.
- Use functional pseudo-classes when possible.
- One declaration per line.

```css
.my-component,
.my-other-component {
  background-color: #cccccc;
}

:is(.my-component, .my-other-component) {
  background-color: #cccccc;
}
```

### Logical Properties
- For properties without logical equivalents, add a comment indicating direction.

```css
.my-component {
  transform: translateX(20px); /* LTR */
}

[dir="rtl"] .my-component {
  transform: translateX(-20px);
}
```


## What to look for when reviewing CSS

### Architecture Guidelines
- **Check for unused code**: Ensure CSS is relevant to current markup.
  - Example: Remove unused classes or IDs.
  
- **Identify redundant code**: Look for CSS that overrides previous styles unnecessarily.
  - Example: Remove default padding overrides if they are already set.

- **Verify component naming**: Ensure component names accurately describe their design semantics.

- **Abstract reusable code**: Move custom CSS into common classes for reusability across modules.
  - Example: Create generic layout and color classes.

- **Use correct selectors**: Favor short, simple selectors; utilize component and sub-component classes.

- **Organize CSS files**: Each component should have its own file; avoid spreading styles across multiple files.

### Formatting Guidelines
- **File comments**: Add a file comment at the top of each stylesheet.
  
- **Comment formatting**: Ensure all comments are correctly formatted.

- **Whitespace usage**: Maintain proper indentation and line breaks.

- **Ruleset formatting**: Check that rulesets, properties, and media queries are formatted correctly.

- **RTL styles**: Confirm existing RTL styles are formatted properly.



# General

## Coding Standards

### General Guidelines
- Follow current Drupal coding standards for all new code.
- Update existing code when feasible, especially in contributed modules.
- Use US English spelling for comments and names.
- Apply coding standard fixes by rule, not by individual files.

### Code Structure
- Maintain consistent indentation (2 spaces).
- Use camelCase for variable names and function names.
- Use PascalCase for class names.
- Use underscores for file names (e.g., `my_module.module`).

### Comments
- Write clear, concise comments to explain complex logic.
- Use full sentences and proper punctuation in comments.
- Document all public functions with PHPDoc comments.

### Code Formatting
- Limit lines to 80 characters.
- Use spaces around operators and after commas.
- Place opening braces on the same line as the declaration.

### Example Code
```php
function myFunction($myVariable) {
    // This is a comment explaining the function.
    if ($myVariable) {
        return true;
    }
    return false;
}
```



# Javascript

## Before running these commands, install node.js, npm, and npx

### ESLint Setup
- Use ESLint for JavaScript consistency and error detection.
- Install ESLint and Drupal configuration:
  ```bash
  npm install eslint eslint-config-drupal --save-dev
  ```

### Configuration Files
- Use provided configuration files:
  - `.eslintrc.json`
  - `.eslintignore`
- These files are automatically detected in the Drupal folder.

### Contrib Modules
- Contrib modules must conform to ESLint standards.
- If using third-party libraries, create a custom `.eslintrc.json`:
  ```json
  {
    "extends": [
      "drupal"
    ],
    "globals": {
      "ga": true
    }
  }
  ```

### Checking Custom JavaScript
- Run ESLint on custom modules and themes:
  ```bash
  npx eslint modules/custom/
  npx eslint themes/custom/
  ```


## Best Practice

### JavaScript Code Placement
- JavaScript code MUST NOT be embedded in HTML.
  
### Use Literal Expressions
- Use `[]` instead of `new Array()`.
- Use `{}` instead of `new Object()`.
- Prefer literal expressions over `new Number`, `new String`, `new Boolean` unless object instances are necessary.

```javascript
var literalNum = 0;
var objectNum = new Number(0);
if (literalNum) { } // false
if (objectNum) { }  // true
if (objectNum.valueOf()) { } // false
```

### Avoid "with" Statement
- The `with` statement MUST NOT be used.
- Use explicit property access instead:

```javascript
foo.bar.foobar.abc = true;
foo.bar.foobar.xyz = true;
```

- Alternatively, use references:

```javascript
var o = foo.bar.foobar;
o.abc = true;
o.xyz = true;
```

### Unreachable Code
- A `return`, `break`, `continue`, or `throw` MUST be followed by a `}` or `case` or `default`.

### Avoid `eval()`
- `eval()` MUST NOT be used.
- Avoid using the `Function` constructor and passing strings to `setTimeout()` or `setInterval()`.

### Preventing XSS
- All user-provided output MUST be escaped using `Drupal.checkPlain()`.

### Modifying the DOM
- Use jQuery for creating new HTML elements instead of `document.createElement()`:

```javascript
this.popup = $('<div id="autocomplete"></div>')[0];
```

- Avoid this:

```javascript
this.popup = document.createElement('div');
this.popup.id = 'autocomplete';
```

### Theming and Translation
- JavaScript producing HTML MUST provide default theme functions in the `Drupal.theme.prototype` namespace.
- Wrap all strings in JavaScript files with `Drupal.t()`.
- Use `Drupal.formatPlural()` for pluralization, matching the parameter order of server-side counterparts.


## Coding

### JavaScript Standards
- Use ESLint with 'eslint-config-airbnb' for coding standards.

### Indentation
- Indent code with **two (2) spaces**.
- Do **not** use tab characters.
- Do **not** end lines with trailing whitespace.

### Semicolons
- Always use semicolons after statements (except `for`, `function`, `if`, `switch`, `try`, `while`).
- Return values must start on the same line as `return`.
- **Exceptions**:
  - Anonymous functions assigned to a variable must end with a semicolon.
    ```javascript
    Drupal.behaviors.tableSelect = function (context) {};
    ```
  - `do/while` structures must end with a semicolon.
    ```javascript
    do {} while (condition);
    ```

### File Closure
- Wrap all JavaScript code in an IIFE (Immediately Invoked Function Expression).
    ```javascript
    (() => {
      // All the JavaScript for this file.
    })();
    ```

### Naming Conventions
- Use **lowerCamelCase** for variables and functions (except constants and constructors).
- Prefix jQuery objects with a dollar sign (`$`).
    ```javascript
    let $form = $('#search-block-form');
    ```

### Variable Declarations
- Declare all variables with `let` or `const` before use.
- Declare variables only once and at the beginning of a function.
- Each variable assignment should be on a separate line.
    ```javascript
    let anArray = [];
    let eventCallback = function () {};
    ```

### Global Variables
- Do **not** define global variables in Drupal JavaScript.

### Constants
- Use **UPPER_UNDERSCORED** for constants.
- PHP variables added to JavaScript should be **lowerCamelCased**.

### Arrays
- Format arrays with one space between elements and the assignment operator.
    ```javascript
    let someArray = ['hello', 'world'];
    ```
- Break long arrays into separate lines, indented one level.
- Use trailing commas in multi-line arrays.
    ```javascript
    let fruits = [
      'apples',
      'banana',
      'pineapple',
    ];
    ```

### Typeof
- Do **not** wrap values in parentheses during type comparisons.
    ```javascript
    if (typeof myVariable === 'string') {}
    ```

### Functions
- Function names should start with the module/theme name.
    ```javascript
    Drupal.behaviors.tableDrag = function (context) {};
    ```
- Use one space after the `function` keyword and no space between the function name and the opening parenthesis.
- Optional arguments should be at the end of the function signature.
- Functions should return meaningful values.

### Function Calls
- Call functions without spaces between the name and the opening parenthesis.
- Use one space between commas and parameters.
    ```javascript
    let foobar = foo(bar, baz, quux);
    ```

### Constructors
- Constructor names must start with an uppercase letter.
- Call constructors with the `new` operator.
    ```javascript
    function CollapsibleDetails(node) {}
    let collapsibleDetail = new CollapsibleDetails(element);
    ```

### Comments
- Follow JSDoc standards for inline documentation.
- Use capitalized sentences with punctuation for non-JSDoc comments.
    ```javascript
    // Unselect all other checkboxes.
    doSomething();
    ```

### String Concatenation
- Separate expressions with one space before and after the `+` operator.
    ```javascript
    let string = 'Foo' + bar;
    ```

### Control Structures
- Use one space between control keywords and opening parentheses.
- Always use curly braces for control structures.
    ```javascript
    if (condition) {
      action();
    }
    ```

### Comparisons
- Use strict equality (`===` or `!==`) for comparisons.

### Comma Operator
- Avoid using the comma operator except in `for` statements.


## Documentation

### JavaScript Documentation Headers
- Document all JavaScript items (methods, functions, variables) with headers.
- Use JSDoc3 format for documentation.
- Only behaviors are documented specifically.

### Tags and Notation
- Use `{}` brackets for data types in `@param` and `@return`: 
  - Example: `@param {string} paramName`
- Supported data types: `number`, `string`, `bool`, `null`, `undefined`, `object`, `function`, `Array`, or specific constructor names.
- Use `@fires` for events triggered by functions.
- For custom events, add an `@event` block before the triggering line.
- Use `@prop {type} name` for object properties not used as namespaces or classes.
- Use `@name`, `@constructor`, and `@namespace` as needed to clarify item types.

### Tag Order
- Declare tags in this order:
  - `@global`
  - `@typedef`, `@var`, `@name`, `@namespace`, `@constructor`, `@callback`, `@event`, `@function`
  - `@augments`, `@lends`
  - `@type`, `@prop`
  - `@param`, `@return`
  - `@throws`, `@fires`, `@listens`
  - `@ingroup`, `@deprecated`, `@see`, `@todo`, `@ignore`

### Code Examples

#### Documenting a JavaScript File
```javascript
/**
 * @file
 * Provides some feature
 *
 * The extra line between the end of the @file docblock
 * and the file-closure is important.
 */

(function ($) {
  "use strict";
})();
```

#### Documenting Behaviors
```javascript
/**
 * Attaches the table drag behavior to tables.
 *
 * @type {Drupal~behavior}
 *
 * @prop {Drupal~behaviorAttach} attach
 *   Specific description of this attach function goes here.
 * @prop {Drupal~behaviorDetach} detach
 *   Specific description of this detach function goes here.
 */
Drupal.behaviors.tableDrag = {
  attach: function (context, settings) {
    // ...
  },
  detach: function (context, settings, trigger) {
    // …
  }
};
```

#### Documenting Usual Constructs
```javascript
/**
 * Holds JavaScript settings and other information for Drupal.
 *
 * @namespace
 */
var Drupal = {
   // ...
  /**
   * Holds behaviors for Drupal.
   *
   * @namespace
   */
  'behaviors': {},
  // ...
};

/**
 * Returns the value of foo for the current widget.
 *
 * @return
 *   The value of foo in the current widget.
 */
Drupal.getCurrentFoo = function () {
  // ...
};

/**
 * Constructs a table drag object.
 *
 * @constructor
 *
 * @param {HTMLTableElement} table
 *   DOM object for the table to be made draggable.
 * @param {object} tableSettings
 *   Settings for the table.
 */
Drupal.tableDrag = function (table, tableSettings) {
  // ...
}

/**
 * Hides the columns containing weight and parent form elements.
 *
 * @fires event:columnschange
 *
 * @see Drupal.tableDrag.showColumns
 */
Drupal.tableDrag.prototype.hideColumns = function() {
  // ...

  /**
   * Indicates that columns have changed in a table.
   *
   * @param {string} type
   *   Type of change: 'show' or 'hide'.
   *
   * @event columnschange
   */
  $('table.tableDrag-processed').trigger('columnschange', 'hide');
  // ...
};

/**
 * Shows the columns containing weight and parent form elements.
 *
 * @fires columnschange
 *
 * @see Drupal.tableDrag.hideColumns
 */
Drupal.tableDrag.prototype.showColumns = function() {
  // This event is documented in Drupal.tableDrag.hideColumns
  $('table.tabledrag-processed').trigger('columnschange', 'hide');
};
```


## Jquery

### Variable Naming
- Prefix variables that point to jQuery objects with a dollar sign `$`.
  - **Incorrect:** `var foo = $('.foo');`
  - **Correct:** `var $foo = $('.foo');`

### Chaining
- Use `.find()` for better performance when chaining selectors.
  - **Incorrect:**
    ```php
    this.$el
        .find('.contextual-links')
        .prop('hidden', !isOpen);
    ```
  - **Correct:**
    ```php
    this.$el.find('.contextual-links')
        .prop('hidden', !isOpen);
    ```

### Event Delegation
- Use `event.preventDefault()` and `event.stopPropagation()` explicitly instead of `return false;`.
  - **Incorrect:**
    ```php
    $('.item').click(function(event) {
      return false;
    });
    ```
  - **Correct (Drupal 7):**
    ```php
    $menus.delegate('.item', 'click', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    ```
  - **Correct (Drupal 8):**
    ```php
    $menus.on('click', '.item', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    ```

### Function Separation
- Separate functions into individual callable functions.
  - **Incorrect:**
    ```php
    $('.btn').click(function() { ... });
    ```
  - **Correct:**
    ```php
    function clickFunction() { ... };
    $('div').click(function() { clickFunction(); });
    ```

### Context in Selectors
- Provide context for selectors to improve performance.
  - **Incorrect:**
    ```php
    var $element = $('.element');
    ```
  - **Correct:**
    ```php
    var $sidebar = $('#sidebar');
    var $element = $sidebar.find('.element');
    ```

### ID vs Class Selection
- Use `#id` for unique elements; use `.class` with context for multiple elements.

### jQuery.attr() Usage
- Use `.prop()` for boolean properties in jQuery 1.9+; avoid using `.attr()` for boolean values.
  - **Incorrect:**
    ```php
    $element.attr('disabled', '');
    if ($element.attr('checked') === true) { ... }
    ```
  - **Correct:**
    ```php
    $element.attr('disabled', false);
    $element.attr('disabled', true);
    if ($element.attr('checked')) { ... }
    ```

### jQuery.each() Performance
- Prefer native JavaScript loops over `jQuery.each()` for iterating simple arrays.
  - **Incorrect:**
    ```php
    var array = [ ... ];
    $.each(array, function(i, item) { ... });
    ```
  - **Correct:**
    ```php
    var array = [ ... ];
    for (var i = 0, len = array.length; i < len; i++) {
      var element = array[i];
    }
    ```



# Markup

## Drupal Markup Style Guide

### HTML/Markup Creation
- Use semantic HTML elements (e.g., `<header>`, `<footer>`, `<article>`, `<section>`).
- Ensure all elements are properly nested and closed.
- Use lowercase for all HTML tags and attributes.
- Use double quotes for attribute values.

### Base Templates for Themers
- Use Twig for templating; avoid PHP in templates.
- Keep templates clean and minimal; separate logic from presentation.
- Use `&#123;&#123; content &#125;&#125;` for rendering fields in templates.

### CSS Class Naming
- Use BEM (Block Element Modifier) methodology for class names.
  - Example: `.block__element--modifier`
- Avoid using IDs for styling; prefer classes.
- Use hyphens to separate words in class names (e.g., `.main-header`).

### Accessibility Considerations
- Use `alt` attributes for all `<img>` tags.
- Ensure sufficient color contrast for text and backgrounds.
- Use ARIA roles and properties where necessary to enhance accessibility.



# Php

## Coding

### Arrays
- Use short array syntax:  
  ```php
  $some_array = ['hello', 'world', 'foo' => 'bar'];
  ```
- For multi-line arrays, each element on a new line, indented:  
  ```php
  $form['title'] = [
    '#type' => 'textfield',
    '#title' => t('Title'),
  ];
  ```
- Always include a comma after the last element in multi-line arrays.

### Casting
- Add a space between the type and variable in casts:  
  ```php
  (int) $myNumber;
  ```

### Chaining
- Use fluent interface for method chaining:  
  ```php
  $title = db_query("SELECT title FROM {node} WHERE nid = :nid", [':nid' => 42])->fetchField();
  ```
- Indent chained methods by 2 spaces if spanning multiple lines.

### Class Constructor Calls
- Always include parentheses for constructors:  
  ```php
  $foo = new MyClassName();
  ```

### Control Structures
- Use one space between control keyword and parenthesis:  
  ```php
  if (condition) {
    action;
  }
  ```
- Always use curly braces, even if optional.
- For `switch` statements:  
  ```php
  switch (condition) {
    case 1:
      action1;
      break;
    default:
      default_action;
  }
  ```

### Function Calls
- No spaces between function name and opening parenthesis:  
  ```php
  $var = foo($bar, $baz);
  ```

### Function Declarations
- Use trailing commas for multi-line arguments:  
  ```php
  function funStuff_system(
    string $foo,
    string $bar,
    int $baz,
  ) {
    // body
  }
  ```

### Indenting and Whitespace
- Use 2 spaces for indentation, no tabs.
- No trailing whitespace at line ends.
- Files should end with a newline.

### Naming Conventions
- Functions: lowercase with underscores, prefixed by module name.
- Variables: lowercase, either snake_case or lowerCamelCase.
- Constants: all-uppercase with underscores, prefixed by module name.
- Classes/Interfaces: UpperCamelCase, no underscores unless necessary.

### Operators
- Space before and after binary operators:  
  ```php
  $foo = $bar + $baz;
  ```
- Use `!=` for weak-typed inequality, avoid `<>`.
- Use short ternary and null coalescing operators for readability:  
  ```php
  $result = $condition ?: 'default';
  $result = $values['entry'] ?? 'default';
  ```

### Parameter and Return Type Hinting
- Use type hints for all new functions and methods:  
  ```php
  public function myMethod(MyInterface $myClass, string $id): array {
    // Method code here.
  }
  ```

### PHP Code Tags
- Use `<?php ?>` for PHP code, omit `?>` at file end.

### Quotes
- Prefer single quotes unless interpolation or escaping is needed.

### Semicolons
- Always use semicolons at the end of lines, including one-line blocks.

### String Concatenations
- Use spaces around concatenation operator:  
  ```php
  $string = 'Foo' . $bar;
  ```

### Visibility
- Declare visibility for all methods and properties.
- Do not prefix method names with underscores.

### Drupal 7 Class/Interface Autoloading
- Use `.inc` files and `files[]` in `.info` for class/interface extensions.

### Helper Modules
- Utilize contributed modules for coding standards compliance checks.


## Documentation

### General Documentation Standards
- Use docblocks (`/** ... */`) for all documentation.
- Start each line in a docblock with `*`.
- Ensure the first line is a summary, under 80 characters, starting with a capital letter and ending with a period.
- Use proper grammar and punctuation; write in English (US spelling).
- Document the current version of the code, not past or future changes.
- Use a blank line to separate paragraphs in docblocks.

### Tag Usage
- Use `@param` for each function parameter, followed by the type, variable name, and description.
- Use `@return` for return values, following the same format as `@param`.
- Use `@throws` to document exceptions thrown by a function.
- Use `@todo` for notes on future improvements or changes.
- Use `@see` for references to related functions or documentation.

### Classes and Methods
- Document all classes and methods, including private methods.
- Use `{@inheritdoc}` for methods that inherit documentation from a parent class.
- Start class and method summaries with a third-person verb (e.g., "Represents a...").
- Use fully-qualified namespaces for classes in documentation.

### Data Types
- Use PHPDoc type syntax for `@var`, `@param`, and `@return` tags.
- Prefix types with a fully-qualified namespace.
- Spell types as follows: `array`, `bool`, `int`, `null`, `object`.

### Functions
- Document each function with a summary, parameters, and return values.
- Use an imperative verb for hook definitions (e.g., "Respond to...").
- For callbacks, indicate the function it is passed to after the summary.

### Inline Comments
- Use inline comments (`//`) to clarify complex code.
- Place comments on a separate line before the code they reference.
- Use `@var` to document variable types inline.

### Lists in Documentation
- Use hyphens (`-`) to create lists in docblocks.
- Indent nested lists consistently.
- End the line before a list with a colon.

### Template Files
- Start template files with a docblock summarizing the file's purpose and available variables.
- Include `@see` references to preprocess functions.

### Order of Documentation Sections
- Follow this order in docblocks:
  - Summary
  - Additional explanation
  - `@var`
  - `@param`
  - `@return`
  - `@throws`
  - `@ingroup`
  - `@deprecated`
  - `@see`
  - `@todo`

### PHPUnit and Simpletest
- Follow class documentation standards but include `@group`, `@covers`, and `@coversDefaultClass` tags as needed.

### Example Syntax
```php
/**
 * Sample summary line.
 *
 * Next paragraph. Etc.
 *
 * @param string $paramName Description.
 * @return string Description.
 */
function exampleFunction($paramName) {
    // Code here.
}
```


## Documentation Examples

### File Documentation
- Use `@file` to describe the purpose of the file.
  
  **Example:**
  ```php
  /**
   * @file
   * Attaches custom data fields to Drupal entities.
   */
  ```

### Module File (*.module)
- Document the file's purpose using `@file`.

  **Example:**
  ```php
  /**
   * @file
   * Install, update and uninstall functions for the System module.
   */
  ```

### Install File (*.install)
- Use `@file` to indicate installation-related functions.

  **Example:**
  ```php
  /**
   * @file
   * Install, update and uninstall functions for the System module.
   */
  ```

### Include File (*.inc)
- Document the integration purpose with `@file`.

  **Example:**
  ```php
  /**
   * @file
   * Media module integration for the Media module.
   */
  ```

### PHP Theme Template File (*.tpl.php)
- Use `@file` and list available variables.
- Include `@see` for related preprocess functions.

  **Example:**
  ```php
  /**
   * @file
   * Displays a block.
   *
   * Available variables:
   * - $block->subject: Block title.
   *
   * @see template_preprocess_block()
   */
  ```

### Class Documentation
- Use `namespace` for classes.
- Document class purpose and properties.

  **Example:**
  ```php
  namespace Drupal\commerce\Element;

  /**
   * Provides a form input element for selecting one or multiple entities.
   */
  class EntitySelect extends FormElement {
  ```

### Function Documentation
- Use `@param` for parameters and `@return` for return values.
  
  **Example:**
  ```php
  /**
   * Returns data from the persistent cache.
   *
   * @param int $cid
   *   The cache ID of the data to retrieve.
   * @return mixed
   *   The value from the cache, or FALSE on failure.
   */
  function cache_get($cid, $bin = 'cache') {
  ```

### Callback Function Documentation
- Specify the function's role as a callback.
  
  **Example:**
  ```php
  /**
   * Sorts structured arrays by weight.
   *
   * Callback for uasort() within foo_bar().
   */
  function element_sort($a, $b) {
  ```

### Hook Definition Functions
- Document hooks with `@param` and `@return`.

  **Example:**
  ```php
  /**
   * Define the Field API schema for a field structure.
   *
   * @param $field
   *   A field structure.
   * @return
   *   An associative array with schema definitions.
   */
  function hook_field_schema($field) {
  ```

### Themeable Function Documentation
- Use `@ingroup themeable` for themeable functions.

  **Example:**
  ```php
  /**
   * Returns HTML for a form.
   *
   * @param array $variables
   *   An associative array containing element properties.
   *
   * @ingroup themeable
   */
  function theme_form($variables) {
  ```

### Class Member Function Documentation
- Document overridden methods clearly.

  **Example:**
  ```php
  /**
   * Overrides prepareTimezone().
   */
  protected function prepareTimezone($timezone) {
  ```

### Constant Documentation
- Use clear descriptions for constants.

  **Example:**
  ```php
  /**
   * The block or element is the same for every user and page that it is visible.
   */
  const DRUPAL_CACHE_GLOBAL = 0x0008;
  ```

### Miscellaneous Documentation
- Use bullet lists for clarity in documentation.
- Use `@see` for references to related functions or hooks.

  **Example:**
  ```php
  /**
   * Respond to a custom menu creation.
   *
   * @see hook_menu_update()
   * @see hook_menu_delete()
   */
  function hook_menu_insert($menu) {
  ```


## E_all

### Error Reporting
- For Drupal 6.x, change error reporting in `includes/common.inc`:
  ```php
  if ($errno & (E_ALL | E_STRICT)) {
  ```
- For Drupal 7.x, set in `.htaccess` to view all errors:
  ```apache
  php_value error_reporting -1
  ```

### Variable Checking
- Use `isset()` or `!empty()` to check variables:
  - Use `isset($var)` when `''` or `0` are valid values.
  - Use `!empty($var)` to ensure the variable is not empty.
  
- Example of potential E_NOTICE error:
  ```php
  function _form_builder($form, $parents = array(), $multiple = FALSE) {
    if ($form['#input']) {
      // some code (...)
    }
  }
  ```
  
- Corrected version:
  ```php
  function _form_builder($form, $parents = array(), $multiple = FALSE) {
    if (!empty($form['#input'])) {
      // some code (...)
    }
  }
  ```

### Null Checking
- `isset()` returns `TRUE` for `0`, `FALSE` for `NULL`.
- Use `is_null()` when checking values returned by SQL queries.


## Exceptions

### Basic Exception Naming Conventions
- Exceptions must follow object-oriented coding standards.
- All Exceptions must end with "Exception".
- Include an appropriate, untranslated message in Exceptions.
- Message should hint at values causing the exception:
  - Use string concatenation or `sprintf()`.
  - Surround values with single quotes.
  - **DO NOT** translate the message.
  - **DO NOT** use `SafeMarkup::format()`.
- Name Exception classes based on subsystem and error type: `[Subsystem][ErrorType]Exception`.

### Exception Subclasses
- Prefer subclassed Exceptions over a single generic Exception class for better error handling.

#### Example:
```php
class WidgetNotFoundException extends Exception {}

function use_widget($widget_name) {
  $widget = find_widget($widget_name);
  if (!$widget) {
    throw new WidgetNotFoundException("Widget '$widget_name' not found.");
  }
}
```

### Try-catch Blocks
- Follow a line-breaking pattern similar to if-else statements; each catch starts on a new line.

#### Example:
```php
try {
  $widget = 'thingies';
  $result = use_widget($widget);
}
catch (WidgetNotFoundException $e) {
  // Handle absence of widget.
}
catch (Exception $e) {
  \Drupal::logger('widget')->error($e->getMessage());
}
```

### Inheritance
- All Exceptions must inherit from the Exception class.
- Name new exception classes based on subsystem and error message.
- Group related exceptions under a common base exception for multiple catch blocks.

#### Example:
```php
class FelineException extends Exception {}

class FelineHairBallException extends FelineException {}

class FelineKittenTooCuteException extends FelineException {}

try {
  $normal = new Kitten();
  $normal->playWith($string);
}
catch (FelineHairBallException $e) {
  // Handle hairball error.
}
catch (FelineKittenTooCuteException $e) {
  // Handle cuteness error.
}
catch (FelineException $e) {
  // Handle generic feline error.
}
```


## PHP Coding Standards

### General Standards
- Use **PHP_CodeSniffer** for enforcing coding standards.
- Follow rules from the **Drupal coder project** and **Slevomat**.

### Code Structure
- **Indentation**: Use 2 spaces for indentation, no tabs.
- **Line Length**: Limit lines to 80 characters.
- **File Encoding**: Use UTF-8 without BOM.

### Naming Conventions
- **Classes**: Use `CamelCase` for class names (e.g., `MyClass`).
- **Methods**: Use `camelCase` for method names (e.g., `myMethod()`).
- **Variables**: Use `$camelCase` for variable names (e.g., `$myVariable`).

### Control Structures
- **Braces**: Always use braces for control structures, even for single statements.
  ```php
  if ($condition) {
      // Code here
  }
  ```
- **Spaces**: Use a space after control structure keywords.
  ```php
  if ($condition) {
      // Code here
  }
  ```

### Comments
- **DocBlocks**: Use PHPDoc for documenting classes and methods.
  ```php
  /**
   * Description of the method.
   *
   * @param int $param Description of parameter.
   * @return void
   */
  public function myMethod($param) {
      // Code here
  }
  ```
- **Inline Comments**: Use inline comments sparingly and only when necessary.

### Arrays
- **Syntax**: Use short array syntax `[]` instead of `array()`.
  ```php
  $array = ['value1', 'value2'];
  ```

### Whitespace
- **Blank Lines**: Use one blank line to separate methods and logical sections.
- **Trailing Whitespace**: Remove any trailing whitespace at the end of lines.

### Function Declarations
- **Spacing**: No space before the opening parenthesis.
  ```php
  function myFunction($param) {
      // Code here
  }
  ```

### Error Handling
- **Exceptions**: Use exceptions for error handling instead of error codes.
  ```php
  if (!$result) {
      throw new \Exception('Error message');
  }
  ```

### Security
- **Input Validation**: Always validate and sanitize user input.
- **Output Encoding**: Encode output to prevent XSS vulnerabilities.

### Testing
- **Unit Tests**: Write unit tests for all public methods.
- **Test Naming**: Use `test` prefix for test methods (e.g., `testMyFunction()`).

### Version Control
- **Commit Messages**: Use clear and concise commit messages.
- **Branch Naming**: Use descriptive names for branches (e.g., `feature/my-feature`).


## Namespaces

### Class Usage
- Use `use` statements for classes/interfaces with a backslash `\` in their fully-qualified name.
  ```php
  use Drupal\simpletest\WebTestBase;
  ```
- Fully qualify classes/interfaces without a backslash when used in a namespaced file.
  ```php
  new \Exception();
  ```
- In global namespace files, use `use` for all non-global classes.
- Do not include a leading `\` in `use` statements.
- Specify class names in strings with full names including namespace, escaping `\` in double-quoted strings.
  ```php
  "Drupal\\Context\\ContextInterface"
  ```
  Use single quotes without escaping.
  ```php
  'Drupal\Context\ContextInterface'
  ```
- Prefer single-quoted strings generally.
- Use one class per `use` statement; do not combine multiple classes.
- Order of `use` statements is flexible; prioritize readability.
- Use full class names in API documentation; short names only after `use`.

### Class Aliasing
- Alias classes only to avoid name collisions.
  ```php
  use Foo\Bar\Baz as BarBaz;
  use Stuff\Thing\Baz as ThingBaz;
  ```

### Module Namespacing
- Create classes in a custom namespace: `Drupal\module_name\...`
- Follow PSR-4 for class autodiscovery; omit `/src/` from namespace.
  - Class `Drupal\example_module\Foo` in `example_module/src/Foo.php`
  - Class `Drupal\example_module\Foo\Bar` in `example_module/src/Foo/Bar.php`


## Naming Services

### Manipulating the Request Object
- Prepend attributes added to the Request object with an underscore (`_`), unless they originate from the path.
  - Example: 
    ```php
    \Drupal::request()->attributes->set('_context_value', $myValue);
    ```
- Omit the underscore for values coming from the path (e.g., `/node/{node}`).

### Reserved Attributes
- Do not overwrite the following core and Symfony prefixed attributes:
  - Drupal core:
    - `_system_path`
    - `_title`
    - `_account` (being removed)
  - Symfony:
    - `_route`
    - `_route_object`
    - `_controller`
    - `_content`


## Placeholders Delimiters

### Temporary Placeholders
- Use alphanumeric strings as placeholders.
- Prefix placeholders with the module name followed by a hyphen `-` or underscore `_`.
- Enclose placeholders within square brackets `[`…`]`.

### Delimiter Format
- For closing delimiters, include a `/` after the initial `[` if needed.
- Optionally, suffix the module name in the closing delimiter.

### Regex Matching
- Use the following PCRE to match placeholders:
  - `'@\[modulename-tag\](.+?)\[/modulename-tag\]@'`
  - Or, if suffixed: `'@\[modulename-tag\](.+?)\[/tag-modulename\]@'`


## Psr4

### Namespace and Directory Structure
- Each module has a namespace corresponding to its module name:  
  `Drupal\vegetable\`
  
- The module's namespace maps to the `./src/` folder:  
  `Drupal\vegetable\` → `modules/vegetable/src/`

- Class names map directly to the directory structure in `./src/`:  
  `Drupal\vegetable\Entity\Tomato` → `modules/vegetable/src/Entity/Tomato.php`

- PHPUnit tests follow the same structure in `./tests/src/`.

### Class and File Naming
- Each PHP class, interface, or trait must reside in a separate PHP file.

- Example of class mapping:  
  `Drupal\Component\Diff\Engine\DiffEngine` is defined in `core/lib/Drupal/Component/Diff/Engine/DiffEngine.php`.

### Namespace Resolution
- All namespaces for Drupal components start with `Drupal\`.

- Base namespaces and their directories:
  - `Drupal\Component\` → `core/lib/Drupal/Component/`
  - `Drupal\Core\` → `core/lib/Drupal/Core/`
  - `Drupal\Tests\` → `core/tests/Drupal/Tests/`
  - `Drupal\$modulename\` → `modules/$modulename/src/`
  - `Drupal\$modulename\Tests\` → `modules/$modulename/src/Tests/`
  - `Drupal\Tests\$modulename\` → `modules/$modulename/tests/src/`

- The `$modulename` must consist of lowercase characters and underscores.

### File Path Construction
- Convert namespace separators (`\`) to directory separators (`/`) and append `.php` for file paths.

- Example of file path construction:  
  `Drupal\node\` → `Entity\Node` → `core/modules/node/src/Entity/Node.php`



# Spelling

## Spelling

### General Guidelines
- Use US English spelling for all source code, comments, and names.
- Code is checked for spelling using CSpell.

### CSpell Usage
- Use all lower case for CSpell directives.
  - Example: `// cspell:ignore`

### Ignore Words
- Use `cspell:ignore` to list words to ignore, separated by a single space, in alphabetical order.
- Use multiple lines if necessary.
  ```php
  <?php
  // cspell:ignore first-word second-word
  ```

### Disable CSpell for Lines
- Disable CSpell for non-English or nonsensical strings using `cspell:disable-next-line`.
  ```php
  <?php
  // cspell:disable-next-line
  $token = 'PxOHfS_QL-T01NjBgu7Z7I04tIwMp6La5vM-mVxezbU';
  ```

### Disable CSpell for Multiple Lines
- Use `cspell:disable` before the lines and `cspell:enable` after.
  ```php
  <?php
  // cspell:disable
  $lorem1 = 'Lorem ipsum dolor sit amet in libero.';
  $lorem2 = 'Ut fermentum est vitae metus orci.';
  // cspell:enable
  ```



# Sql

## Avoid "SELECT * FROM ..."

### Security and Performance
- Avoid using `SELECT * FROM {node}` to prevent bypassing Drupal's Node Access system.
- Use `SELECT nid, ...` to explicitly list fields when querying nodes.

### General Guidelines
- Do not use `SELECT *` in general queries; it is less self-documenting and slightly slower.
- Use `SELECT *` only in rare cases:
  - When fields are dynamic and unknown at development time.
  - When the list of fields is prohibitively long.


## List of SQL Reserved Words

### General Guidelines
- Avoid using SQL reserved words as identifiers (e.g., table names, column names).
- If necessary, enclose reserved words in quotes or brackets to prevent syntax errors.

### Common Reserved Words
- **Keywords to Avoid**: 
  - `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `JOIN`, `CREATE`, `DROP`, `ALTER`, `TABLE`, `VIEW`, `INDEX`, `USER`, `GROUP`, `ORDER`, `LIMIT`, `DISTINCT`, `NULL`, `TRUE`, `FALSE`, `AND`, `OR`, `NOT`, `IN`, `LIKE`, `BETWEEN`, `EXISTS`, `HAVING`, `CASE`, `WHEN`, `THEN`, `ELSE`, `END`, `AS`, `FROM`, `TO`, `WITH`, `SET`, `VALUES`, `RETURN`, `EXECUTE`, `TRANSACTION`, `COMMIT`, `ROLLBACK`.

### Specific SQL Dialects
- Be aware that different SQL dialects (e.g., MySQL, PostgreSQL, Oracle) may have unique reserved words.
- Check the documentation for the specific SQL dialect being used for a comprehensive list of reserved words.

### Examples
- **Incorrect Usage**:
  ```sql
  SELECT * FROM user; -- 'user' is a reserved word
  ```

- **Correct Usage**:
  ```sql
  SELECT * FROM `user`; -- Using backticks to avoid conflict
  ```

### Best Practices
- Regularly consult updated lists of reserved words for the SQL dialect in use.
- Use descriptive, non-reserved names for database objects to enhance clarity and maintainability.


## SQL coding conventions

### Reserved Words
- Quote all identifiers in SQL queries:
  - Table names: `{table_name}`
  - Other identifiers: `[column_name]`
- Avoid using reserved words for column/table names to ensure compatibility across databases.

### Capitalization and User-Supplied Data
- Use UPPERCASE for SQL reserved words.
- Use lowercase for column and constraint names.
- Enclose table names with `{}`.
- Pass user-supplied data as separate parameters to `db_query()`, `db_query_range()`, etc., using placeholders:
  - `%d` - integers
  - `%f` - floats
  - `%s` - strings (enclosed in single quotes)
  - `%b` - binary data (no quotes)
  - `%` - replaced with `%`
- String literals or `%s` placeholders must be enclosed in single quotes: `'`.

**Example:**
```php
db_query("INSERT INTO {filters} (format, module, delta, weight) VALUES (%d, 'php', 0, 0)", $format);
```

### Naming Conventions
- Use singular nouns for table names.
- Prefix table names with the module name to avoid namespace conflicts.
- Explicitly name all constraints (primary, foreign, unique keys).
- Index names should start with the table name they depend on (e.g., `INDEX users_sid_idx`).

### Database Server Configuration
- Configure database servers for standard compliance (e.g., enable ANSI and Strict Mode in MySQL).

### Indentation
- No standard method for SQL query indentation; use consistent formatting. Examples:
```php
if (!(db_query(
  "
    INSERT INTO {my_module_media_file_type}
    SET extension   = '%s',
    attributes      = '%s'
  ",
  $file_type_entry['extension'],
  $selected_attributes
))) {
  $errors = TRUE;
}
```
or
```php
$sql = "SELECT t.*, j1.col1, j2.col2"
. " FROM {table} AS t"
. " LEFT JOIN {join1} AS j1 ON j1.id = t.jid"
. " LEFT JOIN {join2} AS j2 ON j2.id = t.jid"
. " WHERE t.col LIKE '%s'"
. " ORDER BY %s";
$result = db_query($sql, 'find_me', 't.weight');
```



# Twig

## Twig coding standards

### DocBlock
- Wrap the entire docblock in Twig comment markers `{# and #}`.
- Include `@ingroup themeable` only if providing default themeable output.
  
```php
{#
/**
 * @file
 * Default theme implementation for a region.
 */
#}
```

### Variables in the DocBlock
- Reference variables by name without Twig print indicators `&#123;&#123; &#125;&#125;` or PHP variable indicator `$`.
- Remove "Other variables" section if present.
- Document useful variables not included in the Twig docs.

### Variable Definitions
- Do not specify variable types (array, object, string) in the docblock.

### Inline Variable References
- Wrap variable names in single quotes when referenced inline.

```php
 * Example: 'node.body' becomes 'body'.
```

### Expressions
- **Checking Variables**: Use `&#123;&#37; if variable &#37;&#125;` to check if a variable is available.

```php
&#123;&#37; if foo &#37;&#125;
  <div>&#123;&#123; foo &#125;&#125;</div>
&#123;&#37; endif &#37;&#125;
```

- **Looping**: Use `for` loops instead of `foreach`.

```php
&#123;&#37; for item in navigation &#37;&#125;
  <li><a href="&#123;&#123; item.href &#125;&#125;">&#123;&#123; item.caption &#125;&#125;</a></li>
&#123;&#37; endfor &#37;&#125;
```

- **Setting Variables**: Use `&#123;&#37; set variable = value &#37;&#125;`.

```php
&#123;&#37; set list = ['Alice', 'Bob'] &#37;&#125;
```

### HTML Attributes
- Print all attributes using `&#123;&#123; attributes &#125;&#125;` or individually, but always include `&#123;&#123; attributes &#125;&#125;` at the end.

```php
<div class="&#123;&#123; attributes.class &#125;&#125;"&#123;&#123; attributes &#125;&#125;>
  &#123;&#123; content &#125;&#125;
</div>
```

### Whitespace Control
- Use the `spaceless` filter to remove whitespace between HTML and Twig tags.

```php
&#123;&#37; apply spaceless &#37;&#125;
  <div>&#123;&#123; content &#125;&#125;</div>
&#123;&#37; endapply &#37;&#125;
```

- Use the dash `-` for precise whitespace control sparingly.

### Filters
- Use filters with the pipe character `|` without spaces on either side.

```php
&#123;&#123; 'Original'|t &#125;&#125;
```

### Comments
- Use `{# and #}` for comments.
- Keep single-line comments on the same line.
- Wrap multi-line comments to less than 80 characters.

```php
{# This is a comment. #}
{#
  This is a long comment that spans multiple lines.
#}
```



# Yaml

## YAML Configuration files

### Format and Filename
- Use YAML syntax for configuration files.
- Filename must match the unique configuration name with a **`.yml`** extension.
- Unique configuration name cannot exceed 250 characters.

### Simple Configuration
- Unique configuration name **must** start with the extension name (machine name of the module, theme, or profile).
  - Example: `my_module.settings`
- Multiple configuration files are allowed; using `settings` is common but not mandatory.
  - Example: `my_module.features`

### Configuration Entities
- Unique configuration name format: `(extension).(config_prefix).(suffix)`.
  - `(extension)`: machine name of the module or "core".
  - `(config_prefix)`: defined in entity annotation (defaults to machine name).
- Extension names cannot exceed 50 characters; config prefixes cannot exceed 32 characters.
- Suffix limited to 150 characters.
  - Example for image style: `image.style.(machine_name_of_style)`
  - Example for view: `views.view.(machine_name_of_view)`

### Entity Bundles
- Unique configuration name format: `(extension).(entity_id).(bundle_config_prefix).(bundle_machine_name)`.
  - Example for Book module: `node.type.book`
- Entity and bundle IDs, config prefixes limited to 32 characters.

### Field Instances and View Modes
- View mode format: `entity.view_mode.(target_entity_type).(view_mode_machine_name)`
  - Example: `entity.view_mode.node.teaser`
- Field instance format: `field.instance.(target_entity_type).(target_bundle).(field_machine_name)`
  - Example: `field.instance.node.article.body`
- Ensure suffix does not exceed 150 characters.

### Comments and Whitespace
- Comments can be added using `#`, but are not typical.
- Use two spaces for indentation; whitespace is semantically significant in YAML.


{% endraw %}