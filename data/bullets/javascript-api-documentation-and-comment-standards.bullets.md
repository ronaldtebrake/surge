# Bullet Points for javascript-api-documentation-and-comment-standards.md


## JavaScript API documentation and comment standards

## On this page
- [Tag order](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#s-tag-order)
- [Documenting a JavaScript file](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#s-documenting-a-javascript-file)
- [Documenting behaviors](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#behavior)
- [Documenting usual constructs](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards#s-documenting-usual-constructs)

## [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards)
- [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards)
- [JavaScript best practices](/docs/develop/standards/javascript/javascript-best-practices)
- [ESLint settings](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool)
- [JavaScript API documentation and comment standards](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards)
- [jQuery coding standards](/docs/develop/standards/javascript/jquery-coding-standards)

## JavaScript API documentation and comment standards
- Last [updated](/node/2183405/discuss) on
- 16 June 2023
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- JavaScript code should be documented with documentation headers that are very similar to the [PHP documentation headers](http://drupal.org/node/1354), with modifications due to using the [JSDoc3](https://jsdoc.app/) parser as the first step in parsing the code and documentation. We generally follow the PHP standards as much as possible, with the following changes:
- All JavaScript items (methods, object constructors and properties, functions, variables, etc.) need to have documentation headers, or they will not be recognized by the parser (unlike the API module, which picks up all PHP items whether or not they have documentation headers). Only behaviors are documented specifically, see the [behavior documentation example](#behavior).
- Not all of the @tags we use for PHP are supported. See below for the tags available and their order of declaration.
- To indicate the data type for a `@param` or `@return` tag, put the data type in `{}` brackets: `@param {TheType} paramName` or `@return {TheType}`. For non-object data, use `number`, `string`, `bool`, `null`, `undefined`, `object`, `function`, `Array`. For particular objects, use the constructor name; this could be a built-in JavaScript class (`Date`, `RegExp`), a DOM element (`HTMLElement`, `HTMLInputElement`), a Drupal-specific class (`Drupal.Ajax`), etc.
- Additional tag: like `@throws`, which documents exceptions being thrown by a PHP or JavaScript function, use `@fires` to document events that are triggered by a JavaScript function. In addition, if the event is a custom event (as opposed to a standard event like a key press), add a documentation block immediately before the first line of code within a function that triggers the event, with an `@event` tag, to document the event itself (see sample below for details). Only include one `@event` block for each custom event, but use `@fires` in each function that triggers the custom event.
- Additional tag: when documenting an object that is not being used as a namespace or class, use `@prop {type} name` tags to document its properties (these work like `@param` for function parameters).
- Some additional notation is required in many cases to help JSDoc figure out what type of item is being documented.
- Use `@name` to tell JSDoc the name of what is being documented, if it is not the same as the name in the code (usually because it is a function name like `DropButton` rather than including the class name like `Drupal.DropButton`).
- Use `@constructor` to indicate that a function is intended to be a class constructor.
- Use `@namespace` to indicate that an object is intended as a namespace.
- You do not need to use `@function` in most cases - JSDoc will assume anything declared as a function is a regular function or method, unless one of the tags above overrides this determination.

## [](#s-tag-order "Permalink to this headline")Tag order
- Tags available should be declared in the following order:
- @constructor
- @deprecated
- Here's a sample:

## [](#s-documenting-a-javascript-file "Permalink to this headline")Documenting a JavaScript file
- Provides some feature.
- The extra line between the end of the @file docblock
- and the file-closure is important.
- (function ($) {
- "use strict";

## [](#behavior "Permalink to this headline")Documenting behaviors
- Attaches the table drag behavior to tables.
- @type {Drupal~behavior}
- @prop {Drupal~behaviorAttach} attach
- Specific description of this attach function goes here.
- @prop {Drupal~behaviorDetach} detach
- Specific description of this detach function goes here.
- Drupal.behaviors.tableDrag = {
- attach: function (context, settings) {
- detach: function (context, settings, trigger) {

## [](#s-documenting-usual-constructs "Permalink to this headline")Documenting usual constructs
- Holds JavaScript settings and other information for Drupal.
- var Drupal = {
- Holds behaviors for Drupal.
- 'behaviors': {},
- Returns the value of foo for the current widget.
- Description of this ordinary function in the Drupal namespace goes here.
- The value of foo in the current widget.
- Drupal.getCurrentFoo = function () {
- Constructs a table drag object.
- Provides the ability to drag to manipulate a table and its fields.
- @constructor
- @param {HTMLTableElement} table
- DOM object for the table to be made draggable.
- @param {object} tableSettings
- Settings for the table.
- Drupal.tableDrag = function (table, tableSettings) {
- Hides the columns containing weight and parent form elements.
- @fires event:columnschange
- @see Drupal.tableDrag.showColumns
- Drupal.tableDrag.prototype.hideColumns = function() {
- Indicates that columns have changed in a table.
- @param {string} type
- Type of change: 'show' or 'hide'.
- @event columnschange
- $('table.tableDrag-processed').trigger('columnschange', 'hide');
- Shows the columns containing weight and parent form elements.
- @fires columnschange
- @see Drupal.tableDrag.hideColumns
- Drupal.tableDrag.prototype.showColumns = function() {
- // This event is documented in Drupal.tableDrag.hideColumns
- $('table.tabledrag-processed').trigger('columnschange', 'hide');

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/2183405/edit), and edit this page
- Log in, click [Discuss](/node/2183405/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282183405%29%20JavaScript%20API%20documentation%20and%20comment%20standards) with your suggestion