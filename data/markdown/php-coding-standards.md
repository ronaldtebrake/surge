# PHP coding standards

### On this page

-   [Arrays](/docs/develop/standards/php/php-coding-standards#array)
-   [Casting](/docs/develop/standards/php/php-coding-standards#cast)
-   [Chaining](/docs/develop/standards/php/php-coding-standards#chaining)
-   [Class Constructor Calls](/docs/develop/standards/php/php-coding-standards#constructor-calls)
-   [Comments](/docs/develop/standards/php/php-coding-standards#comment)
-   [Control Structures](/docs/develop/standards/php/php-coding-standards#controlstruct)
-   [Alternate control statement syntax for templates](/docs/develop/standards/php/php-coding-standards#s-alternate-control-statement-syntax-for-templates)
-   [Declaring Classes](/docs/develop/standards/php/php-coding-standards#declaring)
-   [Example URLs](/docs/develop/standards/php/php-coding-standards#example-url)
-   [Function Calls](/docs/develop/standards/php/php-coding-standards#function-call)
-   [Function Declarations](/docs/develop/standards/php/php-coding-standards#functdecl)
-   [Including Code](/docs/develop/standards/php/php-coding-standards#includes)
-   [Indenting and Whitespace](/docs/develop/standards/php/php-coding-standards#indent)
-   [Instantiation](/docs/develop/standards/php/php-coding-standards#instantiation)
-   [Line length and wrapping](/docs/develop/standards/php/php-coding-standards#line-length)
-   [Naming Conventions](/docs/develop/standards/php/php-coding-standards#naming)
-   [Functions and variables](/docs/develop/standards/php/php-coding-standards#s-functions-and-variables)
-   [Persistent Variables](/docs/develop/standards/php/php-coding-standards#s-persistent-variables)
-   [Constants](/docs/develop/standards/php/php-coding-standards#s-constants)
-   [Global Variables](/docs/develop/standards/php/php-coding-standards#s-global-variables)
-   [Classes, Methods and Properties](/docs/develop/standards/php/php-coding-standards#s-classes-methods-and-properties)
-   [Enums](/docs/develop/standards/php/php-coding-standards#s-enums)
-   [File names](/docs/develop/standards/php/php-coding-standards#s-file-names)
-   [Operators](/docs/develop/standards/php/php-coding-standards#operators)
-   [Parameter and return type hinting](/docs/develop/standards/php/php-coding-standards#type-hint)
-   [New functions and methods](/docs/develop/standards/php/php-coding-standards#s-new-functions-and-methods)
-   [Existing functions and methods](/docs/develop/standards/php/php-coding-standards#s-existing-functions-and-methods)
-   [Notes about specific data types](/docs/develop/standards/php/php-coding-standards#s-notes-about-specific-data-types)
-   [Mixed datatypes](/docs/develop/standards/php/php-coding-standards#s-mixed-datatypes)
-   [Nullable types](/docs/develop/standards/php/php-coding-standards#s-nullable-types)
-   [Objects](/docs/develop/standards/php/php-coding-standards#s-objects)
-   [Void](/docs/develop/standards/php/php-coding-standards#s-void)
-   [PHP Code Tags](/docs/develop/standards/php/php-coding-standards#php-tags)
-   [Quotes](/docs/develop/standards/php/php-coding-standards#quotes)
-   [Semicolons](/docs/develop/standards/php/php-coding-standards#semicolon)
-   [Strict type declaration](/docs/develop/standards/php/php-coding-standards#strict-type)
-   [String Concatenations](/docs/develop/standards/php/php-coding-standards#concat)
-   [Use of interfaces](/docs/develop/standards/php/php-coding-standards#interfaces)
-   [Visibility](/docs/develop/standards/php/php-coding-standards#visibility)
-   [Methods and Functions](/docs/develop/standards/php/php-coding-standards#s-methods-and-functions)
-   [Properties](/docs/develop/standards/php/php-coding-standards#s-properties)
-   [abstract, final, and static](/docs/develop/standards/php/php-coding-standards#s-abstract-final-and-static)
-   [Drupal 7 class/interface autoloading](/docs/develop/standards/php/php-coding-standards#D7-autoloading)
-   [Helper Modules](/docs/develop/standards/php/php-coding-standards#helpermod)

## [PHP](/docs/develop/standards/php)

-   [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
-   [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
-   [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
-   [Namespaces](/docs/develop/coding-standards/namespaces)
-   [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
-   [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)
-   [PSR-4 namespaces and autoloading in Drupal 8](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8)
-   [Temporary placeholders and delimiters](/docs/develop/coding-standards/temporary-placeholders-and-delimiters)
-   [Write E\_ALL compliant code](/docs/develop/coding-standards/write-e_all-compliant-code)

# PHP coding standards

Last [updated](/node/318/discuss) on

16 August 2025

Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

This document is loosely based on the [PEAR Coding standards](http://pear.php.net/manual/en/standards.php).

## [](#array "Permalink to this headline")Arrays

Arrays should be formatted using short array syntax with a space separating each element (after the comma), and spaces around the => key association operator, if applicable:
```php
`$some_array = ['hello', 'world', 'foo' => 'bar'];`
```
Note that if the line declaring an array spans longer than 80 characters (often the case with form and menu declarations), each element should be broken into its own line, and indented one level:
```php
`$form['title'] = [
  '#type' => 'textfield',
  '#title' => t('Title'),
  '#size' => 60,
  '#maxlength' => 128,
  '#description' => t('The title of your node.'),
];`
```
Note that, as seen above, in multi-line arrays there MUST be a comma after the last array element. This helps prevent parsing errors if another element is placed at the end of the list later.

## [](#cast "Permalink to this headline")Casting

Put a space between the (type) and the $variable in a cast: `(int) $mynumber`.

## [](#chaining "Permalink to this headline")Chaining

PHP allows objects returned from functions and methods to be "chained", that is, a method on the returned object may be called immediately. This is known as a 'fluent interface.' Here is an example:
```php
`// Unchained version
$result = db_query("SELECT title FROM {node} WHERE nid = :nid", [':nid' => 42]);
$title = $result->fetchField();

// Chained version
$title = db_query("SELECT title FROM {node} WHERE nid = :nid", [':nid' => 42])->fetchField();`
```
As a general rule, a method should return $this, and thus be chainable, in any case where there is no other logical return value. Common examples are those methods that set some state or property on the object. It is better in those cases to return $this rather than TRUE/FALSE or NULL.

In the case where you have a fluent interface for a class, and the code spans more than one line, the method calls should be indented with 2 spaces:
```php
`$query = db_select('node')
  ->condition('type', 'article')
  ->condition('status', 1)
  ->execute();`
```
## [](#constructor-calls "Permalink to this headline")Class Constructor Calls

When calling class constructors with no arguments, always include parentheses:
```php
`$foo = new MyClassName();`
```
This is to maintain consistency with constructors that have arguments:
```php
`$foo = new MyClassName($arg1, $arg2);`
```
Note that if the class name is a variable, the variable will be evaluated first to get the class name, and then the constructor will be called. Use the same syntax:
```php
`$bar = 'MyClassName';
$foo = new $bar();
$foo = new $bar($arg1, $arg2);`
```
## [](#comment "Permalink to this headline")Comments

Comment standards are discussed on the separate [Doxygen and comment formatting conventions page](http://drupal.org/node/1354).

## [](#controlstruct "Permalink to this headline")Control Structures

Control structures include if, for, while, switch, etc. Here is a sample if statement, since it is the most complicated of them:
```php
`if (condition1 || condition2) {
  action1;
}
elseif (condition3 && condition4) {
  action2;
}
else {
  defaultaction;
}`
```
(Note: Don't use "else if" -- always use elseif.)

Control statements should have one space between the control keyword and opening parenthesis, to distinguish them from function calls.

Always use curly braces even in situations where they are technically optional. Having them increases readability and decreases the likelihood of logic errors being introduced when new lines are added. The opening curly should be on the same line as the opening statement, preceded by one space. The closing curly should be on a line by itself and indented to the same level as the opening statement.

For switch statements, always use a colon after the case condition. There must be no space between the condition and the colon. For example:
```php
`switch (condition) {
  case 1:
    action1;
    break;

  case 2:
    action2;
    break;

  default:
    defaultaction;
}`
```
For do-while statements:
```php
`do {
  actions;
} while ($condition);`
  
```
### [](#s-alternate-control-statement-syntax-for-templates "Permalink to this headline")Alternate control statement syntax for templates

In templates, the alternate control statement syntax using : instead of brackets is allowed. Note that there should not be a space between the closing parenthesis after the control keyword, and the colon, and HTML/PHP inside the control structure should be indented. For example:
```php
`<?php if (!empty($item)): ?>
  <p><?php print $item; ?></p>
<?php endif; ?>

<?php foreach ($items as $item): ?>
  <p><?php print $item; ?></p>
<?php endforeach; ?>`
```
## [](#declaring "Permalink to this headline")Declaring Classes

Where to define and place your classes?

Best practices include having one class or interface or trait per file. That file should be named for the class, such that the file name for `FooInterface` would be `FooInterface.php`.

From Drupal 8, classes are autoloaded based on the [PSR-4](http://www.php-fig.org/psr/psr-4/) namespacing convention.

In core, the PSR-4 'tree' starts under `core/lib/`.

In modules, including contrib, custom and those in core, the PSR-4 'tree' starts under `modulename/src`.

Defining a class in your module's `.module` file is only possible if the class does not have a superclass which might not be available when the `.module` file is loaded. It's best practice to move such classes into a PSR-4 source directory.

## [](#example-url "Permalink to this headline")Example URLs

Use "example.com" for all example URLs, per [RFC 2606](http://www.rfc-editor.org/rfc/rfc2606.txt).

## [](#function-call "Permalink to this headline")Function Calls

Functions should be called with no spaces between the function name, the opening parenthesis, and the first parameter; spaces between commas and each parameter, and no space between the last parameter, the closing parenthesis, and the semicolon. Here's an example:
```php
`$var = foo($bar, $baz, $quux);`
```
## [](#functdecl "Permalink to this headline")Function Declarations
```php
`function funstuff_system(
  string $foo,
  string $bar,
  int $baz,
) {
  // body
}`
```
Argument lists may be split across multiple lines, where each subsequent line is indented once.

When the argument list is split across multiple lines

-   The first item in the list must be on the next line.
-   There must be only one argument per line.
-   The last argument in the list must use a trailing comma.
-   The closing parenthesis and opening brace must be placed together on their own line with one space between them.

Anonymous functions should have a space between "function" and its parameters, as in the following example:
```php
`array_map(function ($item) use ($id) {
  return $item[$id];
}, $items);`
```
## [](#includes "Permalink to this headline")Including Code

Anywhere you are unconditionally including a class file, use `require_once()`. Anywhere you are conditionally including a class file (for example, factory methods), use `include_once()`. Either of these will ensure that class files are included only once. They share the same file list, so you don't need to worry about mixing them - a file included with `require_once()` will not be included again by `include_once()`.

*Note: `include_once()` and `require_once()` are statements, not functions. You don't need parentheses around the file name to be included.*

When including code from the same directory or a sub-directory, start the file path with ".":  
`include_once ./includes/mymodule_formatting.inc`  
In Drupal 7.x and later versions, use DRUPAL\_ROOT:  
`require_once DRUPAL_ROOT . '/' . variable_get('cache_inc', 'includes/cache.inc');`

To include code in a module:
```php
`module_load_include('inc', 'node', 'node.admin');`
```
## [](#indent "Permalink to this headline")Indenting and Whitespace

Use an indent of 2 spaces, with no tabs.

Lines should have no trailing whitespace at the end.

Files should be formatted with \\n as the line ending (Unix line endings), not \\r\\n (Windows line endings).

All text files should end in a single newline (\\n). This avoids the verbose "\\ No newline at end of file" patch warning and makes patches easier to read since it's clearer what is being changed when lines are added to the end of a file.

All blocks at the beginning of a PHP file should be separated by a blank line. This includes the `/** @file */` block, the namespace declaration and the `use` statements (if present) as well as the subsequent code in the file. So, for example, a file header might look as follows:
```php
`<?php

namespace This\Is\The\Namespace;

use Drupal\foo\Bar;

/**
 * Provides examples.
 */
class ExampleClassName {`
```
Or, for a non-class file (e.g., `.module`):
```php
`<?php

/**
 * @file
 * Provides example functionality.
 */

use Drupal\foo\Bar;

/**
 * Implements hook_help().
 */
function example_help($route_name) {`
```
 Leave an empty line between start of class/interface definition and property/method definition:
```php
`class GarfieldTheCat implements FelineInterface {
  // Leave an empty line here.
  public function meow() {
...
...
...`
```
Leave an empty line between end of property definition and start method definition:
```php
`...
...
...
  protected $lasagnaEaten = 0;
  // Leave an empty line here.
  public function meow() {
    return t('Meow!');
  }`
```
Leave an empty line between end of method and end of class definition:

## [](#instantiation "Permalink to this headline")Instantiation

Creating classes directly is discouraged. Instead, use a factory function that creates the appropriate object and returns it. This provides two benefits:

1.  It provides a layer of indirection, as the function may be written to return a different object (with the same interface) in different circumstances as appropriate.
2.  PHP does not allow class constructors to be chained, but does allow the return value from a function or method to be chained.

## [](#line-length "Permalink to this headline")Line length and wrapping

The following rules apply to code. See [Doxygen and comment formatting conventions](http://drupal.org/node/1354) for rules pertaining to comments.

-   In general, all lines of code should not be longer than 80 characters.
-   Lines containing longer function names, function/class definitions, variable declarations, etc are allowed to exceed 80 characters.
-   Control structure conditions may exceed 80 characters, if they are simple to read and understand:  
    ```php
      `if ($something['with']['something']['else']['in']['here'] == mymodule_check_something($whatever['else'])) {
        ...
      }
      if (isset($something['what']['ever']) && $something['what']['ever'] > $infinite && user_access('galaxy')) {
        ...
      }
      // Non-obvious conditions of low complexity are also acceptable, but should
      // always be documented, explaining WHY a particular check is done.
      if (preg_match('@(/|\\)(\.\.|~)@', $target) && strpos($target_dir, $repository) !== 0) {
        return FALSE;
      }`
    
    ```
    
-   Conditions should not be wrapped into multiple lines.
-   Control structure conditions should also NOT attempt to win the *Most Compact Condition In Least Lines Of Code Award™*:  
    ```php
      `// DON'T DO THIS!
      if ((isset($key) && !empty($user->uid) && $key == $user->uid) || (isset($user->cache) ? $user->cache : '') == ip_address() || isset($value) && $value >= time())) {
        ...
      }`
    
    ```
    
    Instead, it is recommended practice to split out and prepare the conditions separately, which also permits documenting the underlying reasons for the conditions:
    
    ```php
      `// Key is only valid if it matches the current user's ID, as otherwise other
      // users could access any user's things.
      $is_valid_user = isset($key) && !empty($user->uid) && $key == $user->uid;
    
      // IP must match the cache to prevent session spoofing.
      $is_valid_cache = isset($user->cache) ? $user->cache == ip_address() : FALSE;
    
      // Alternatively, if the request query parameter is in the future, then it
      // is always valid, because the galaxy will implode and collapse anyway.
      $is_valid_query = $is_valid_cache || (isset($value) && $value >= time());
    
      if ($is_valid_user || $is_valid_query) {
        ...
      }`
    
    ```
    
    *Note: This example is still a bit dense. Always consider and decide on your own whether people unfamiliar with your code will be able to make sense of the logic.*
    

## [](#naming "Permalink to this headline")Naming Conventions

### [](#s-functions-and-variables "Permalink to this headline")Functions and variables

Functions should be named using lowercase, and words should be separated with an underscore. Functions should in addition have the grouping/module name as a prefix, to avoid name collisions between modules.

Variables should be named using lowercase, and words should be separated either with uppercase characters (example: `$lowerCamelCase`) or with an underscore (example: `$snake_case`). Be consistent; do not mix camelCase and snake\_case variable naming inside a file.

### [](#s-persistent-variables "Permalink to this headline")Persistent Variables

Persistent variables (variables/settings defined using Drupal's [variable\_get()](http://api.drupal.org/api/function/variable_get)/[variable\_set()](http://api.drupal.org/api/function/variable_set) functions) should be named using all lowercase letters, and words should be separated with an underscore. They should use the grouping/module name as a prefix, to avoid name collisions between modules.

### [](#s-constants "Permalink to this headline")Constants

-   Constants should always be all-uppercase, with underscores to separate words. (This includes pre-defined PHP constants like `TRUE`, `FALSE`, and `NULL`.)
-   Module-defined constant names should also be prefixed by an uppercase spelling of the module that defines them.
-   In Drupal 8 and later, constants should be defined using the [`const` PHP language keyword](http://us3.php.net/const) (instead of `define()`), because it is better for performance:  
    ```php
    `/**
     * Indicates that the item should be removed at the next general cache wipe.
     */
     const CACHE_TEMPORARY = -1;`
    
    ```
    
    Note that `const` does not work with PHP expressions. `define()` should be used when defining a constant conditionally or with a non-literal value:
    
    ```php
    `if (!defined('MAINTENANCE_MODE')) {
      define('MAINTENANCE_MODE', 'error');
    }`
    
    ```
    

### [](#s-global-variables "Permalink to this headline")Global Variables

If you need to define global variables, their name should start with a single underscore followed by the module/theme name and another underscore.

### [](#s-classes-methods-and-properties "Permalink to this headline")Classes, Methods and Properties

1.  Classes and interfaces should use UpperCamel naming.
2.  Methods and class properties should use lowerCamel naming. In Drupal 8, properties of configuration entities are exempt of these conventions. Those properties are allowed to use underscores.
3.  If an acronym is used in a class or method name, make it CamelCase too (SampleXmlClass, not SampleXMLClass). \[Note: this standard was adopted in March 2013, reversing the previous standard.\]
4.  Classes should *not* use underscores in class names unless absolutely necessary to derive names inherited class names dynamically. That is quite rare, especially as Drupal does not mandate a class-file naming match.
5.  Names should not include "Drupal".
6.  Class names should not have "Class" in the name.
7.  Interfaces should always have the suffix "Interface".
8.  Test classes should always have the suffix "Test".
9.  Protected or private properties and methods should not use an underscore prefix.
10.  Classes and interfaces should have names that stand alone to tell what they do without having to refer to the namespace, read well, and are as short as possible without losing functionality information or leading to ambiguity. Notes:
     -   If necessary for clarity or to prevent ambiguity, include the last component of the namespace in the name.
     -   Exception for Drupal 8.x: due to the way database classes are loaded, do not include the database engine name (MySQL, etc.) in engine-specific database class names.
     -   Exception for test classes: Test classes only need to be unambiguous within the context of the module they are testing.

Stand-alone name examples:

Namespace

Good name

Bad names

Drupal\\Core\\Database\\Query\\

QueryCondition

Condition (ambiguous)  
DatabaseQueryCondition (Database doesn't add to understanding)

Drupal\\Core\\FileTransfer\\

LocalFileTransfer

Local (ambiguous)

Drupal\\Core\\Cache\\

CacheDatabaseDriver

Database (ambiguous/misleading)  
DatabaseDriver (ambiguous/misleading)

Drupal\\entity\\

Entity  
EntityInterface

DrupalEntity (unnecessary words)  
EntityClass (unnecessary words)

Drupal\\comment\\Tests\\

ThreadingTest

CommentThreadingTest (only needs to be unambiguous in comment context)  
Threading (not ending in Test)

A complete example of class/interface/method names:
```php
`interface FelineInterface {
  // Leave an empty line here.
  public function meow();
  // Leave an empty line here.
  public function eatLasagna($amount);
  // Leave an empty line here.
}
  // Leave an empty line here.
class GarfieldTheCat implements FelineInterface {
  // Leave an empty line here.
  protected $lasagnaEaten = 0;
  // Leave an empty line here.
  public function meow() {
    return t('Meow!');
  }
  // Leave an empty line here.
  public function eatLasagna($amount) {
    $this->lasagnaEaten += $amount;
  }
  // Leave an empty line here.
}`
```
### [](#s-enums "Permalink to this headline")Enums

Enums follow the same conventions as [classes](https://www.drupal.org/docs/develop/standards/php/php-coding-standards#s-classes) with the addition that for their cases the enums must use UpperCamelCase.
```php
`enum Exists {

  case ErrorIfExists;
  case ErrorIfNotExists;
  case ReturnEarlyIfExists;
  case ReturnEarlyIfNotExists;

  // Do stuff.
}`
```
### [](#s-file-names "Permalink to this headline")File names

All documentation files should have the file name extension ".txt" to make viewing them on Windows systems easier. Also, the file names for such files should be all-caps (e.g. README.txt instead of readme.txt) while the extension itself is all-lowercase (i.e. txt instead of TXT).

Examples: README.txt, INSTALL.txt, TODO.txt, CHANGELOG.txt etc.

## [](#operators "Permalink to this headline")Operators

All binary operators (operators that come between two values), such as `+`, `-`, `=`, `!=`, `==`, `>`, etc. should have a space before and after the operator, for readability. For example, an assignment should be formatted as `$foo = $bar;` rather than `$foo=$bar;`. Unary operators (operators that operate on only one value), such as `++`, should not have a space between the operator and the variable or number they are operating on.

Checks for weak-typed inequality MUST use the `!=` operator. The `<>` operator MUST NOT be used in PHP code.

The short ternary operator `?:` must be used where the first operand of a ternary expression matches the condition. For example use:
```php
`$result = $condition ?: 'default';`
```
instead of:
```php
`$result = $condition ? $condition : 'default';`
```
since `$condition` matches both the condition and the first operand.

The null coalescing operator `??` should be used instead of a ternary operator with an isset() condition, to make code more readable. For example use: 
```php
`$result = $values['entry'] ?? 'default'`
```
instead of:
```php
`$result = isset($values['entry']) ? $values['entry'] : 'default'`
```
## [](#type-hint "Permalink to this headline")Parameter and return type hinting

Beginning with Drupal 9, parameter and return type hints should be used wherever possible. Example function definition using parameter and return type hints:
```php
`public function myMethod(MyInterface $myClass, string $id): array {
  // Method code here.
}`
```
### [](#s-new-functions-and-methods "Permalink to this headline")New functions and methods

Parameter and return type hints should be included for all new functions and methods, including new child implementations of methods for existing classes and interfaces.

### [](#s-existing-functions-and-methods "Permalink to this headline")Existing functions and methods

Adding type hints to existing code is a backwards compatibility break. Type hints can (and should) be added in a major version if a deprecation warning is first raised in an earlier minor version. See [#3050720: \[Meta\] Implement strict typing in existing code](/project/drupal/issues/3050720 "Status: Active") for strategies and ongoing discussion.

### [](#s-notes-about-specific-data-types "Permalink to this headline")Notes about specific data types

#### [](#s-mixed-datatypes "Permalink to this headline")Mixed datatypes

`mixed` is only needed in rare cases where a more specific data type cannot be identified (for example, for the return values of callbacks, or markup strings that can be either markup objects or scalar strings). A need for `mixed` or a [union type](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.union) is often a sign that the code should possibly be refactored.

#### [](#s-nullable-types "Permalink to this headline")Nullable types

Use [nullable types](https://www.php.net/manual/en/language.types.declarations.php) where the data type may be either a specific type or null.

#### [](#s-objects "Permalink to this headline")Objects

Use an interface type hint for parameter and return types (not a class). Type hint the most specific interface that encompasses all possible parameter or return values. Do not use `stdClass`.

#### [](#s-void "Permalink to this headline")Void

If a function or method does not return anything, use a `void` type hint.

## [](#php-tags "Permalink to this headline")PHP Code Tags

Always use `<?php ?>` to delimit PHP code, not the shorthand, `<? ?>`. This is required for Drupal compliance and is also the most portable way to include PHP code on differing operating systems and set-ups.

Note that as of Drupal 4.7, the `?>` at the end of code files is purposely omitted. This includes for module and include files. The reasons for this can be summarized as:

-   Removing it eliminates the possibility for unwanted whitespace at the end of files which can cause "header already sent" errors, XHTML/XML validation issues, and other problems.
-   The [closing delimiter at the end of a file is optional](http://www.php.net/basic-syntax.instruction-separation).
-   PHP.net itself removes the closing delimiter from the end of its files (example: [prepend.inc](https://github.com/php/web-php/blob/master/include/prepend.inc)), so this can be seen as a "best practice."

## [](#quotes "Permalink to this headline")Quotes

Drupal does not have a hard standard for the use of single quotes vs. double quotes. Where possible, keep consistency within each module, and respect the personal style of other developers.

With that caveat in mind, single quote strings should be used by default. Their use is recommended except in two cases:

1.  Deliberate in-line variable interpolation, e.g. "<h2>$header</h2>".
2.  Translated strings where one can avoid escaping single quotes by enclosing the string in double quotes. One such string would be "He's a good person." It would be 'He\\'s a good person.' with single quotes. Such escaping may not be handled properly by .pot file generators for text translation, and it's also somewhat awkward to read.

## [](#semicolon "Permalink to this headline")Semicolons

The PHP language requires semicolons at the end of most lines, but allows them to be omitted at the end of code blocks. Drupal coding standards require them, even at the end of code blocks. In particular, for one-line PHP blocks:
```php
`<?php print $tax; ?> -- YES
<?php print $tax ?> -- NO`
```
## [](#strict-type "Permalink to this headline")Strict type declaration

If you define strict types for a PHP file, place the declare statement on a new line after the opening PHP tag surrounded by empty newlines. If the PHP file has a file level DocBlock the declare statement should be positioned after that. The declare statement is written without spaces around the equals sign.
```php
`<?php

/**
 * @file
 * This is a file DocBlock.
 */

declare(strict_types=1);`
```
## [](#concat "Permalink to this headline")String Concatenations

Always use a space between the dot and the concatenated parts to improve readability.
```php
`<?php 
  $string = 'Foo' . $bar;
  $string = $bar . 'foo';
  $string = bar() . 'foo';
  $string = 'foo' . 'bar';
?>`
```
When you concatenate simple variables, you can use double quotes and add the variable inside; otherwise, use single quotes.
```php
`<?php
  $string = "Foo $bar";
?>`
```
When using the concatenating assignment operator ('.='), use a space on each side as with the assignment operator:
```php
`<?php
$string .= 'Foo';
$string .= $bar;
$string .= baz();
?>`
```
## [](#interfaces "Permalink to this headline")Use of interfaces

The use of a separate interface definition from an implementing class is strongly encouraged because it allows more flexibility in extending code later. A separate interface definition also neatly centralizes documentation making it easier to read. All interfaces should be fully documented according to [established documentation standards](http://drupal.org/node/1354#classes).

If there is even a remote possibility of a class being swapped out for another implementation at some point in the future, split the method definitions off into a formal Interface. A class that is intended to be extended must always provide an Interface that other classes can implement rather than forcing them to extend the base class.

## [](#visibility "Permalink to this headline")Visibility

### [](#s-methods-and-functions "Permalink to this headline")Methods and Functions

Visibility must be declared on all methods.

Method names must not be prefixed with a single underscore to indicate protected or private visibility. That is, an underscore prefix explicitly has no meaning.

Method and function names must not be declared with space after the method name. The closing brace must go on the next line following the body. There must not be a space after the opening parenthesis, and there must not be a space before the closing parenthesis.

### [](#s-properties "Permalink to this headline")Properties

Visibility must be declared on all properties.

The use of public properties is strongly discouraged, as it allows for unwanted side effects. It also exposes implementation-specific details, which in turn makes swapping out a class for another implementation (one of the key reasons to use objects) much harder. Properties should be considered internal to a class.

*Extract from [PSR-12 section 4.4](https://www.php-fig.org/psr/psr-12/#44-methods-and-functions)*

### [](#s-abstract-final-and-static "Permalink to this headline")abstract, final, and static

When present, the `abstract` and `final` declarations must precede the visibility declaration.

When present, the `static` declaration must come after the visibility declaration.

*Extract from [PSR-12 section 4.6](https://www.php-fig.org/psr/psr-12/#46-abstract-final-and-static)*

## [](#D7-autoloading "Permalink to this headline")Drupal 7 class/interface autoloading

**Use an .inc file and use files\[\] in the .info file to extend a class or implement an interface.**

If you include a file that extends a class or implements an interface, PHP generates a fatal error if the parent class or interface is not loaded. So, if a class is provided by a contributed module, or core in some cases, it is not safe to put your classes in a *.module* file. It's better to use an *.inc* file and use `files[]` in your *[.info](/node/542202)* file. For example, even if you have a dependency on a module, it's possible that both your module and the dependency are disabled when your .module file is included. Since the registry won't auto-load a class from a disabled module, this would cause an error. Also, when [hook\_boot()](http://api.drupal.org/api/drupal/core!modules!system!system.api.php/function/hook_boot/7) is run, module dependencies aren't loaded. So, if you add a class, then later implement hook\_boot(), your module could be loaded without the dependency, and that will also generate a fatal error. Using an *.inc* file and using `files[]` in your *[.info](/node/542202)* file is needed to avoid those errors.

## [](#helpermod "Permalink to this headline")Helper Modules

There are several contributed modules/projects available to assist with review for coding standards compliance:

-   [Coder](http://drupal.org/project/coder) module, which includes both Coder Review (reviews) and Coder Upgrade (updates your code). To use it:
    
    1.  Install the module (like any other module)
    2.  Click on the "Code Review" link in your navigation menu.
    3.  Scroll down to "Select Specific Modules".
    4.  Select the module you wish to review, and click the "Submit" button.
    
    As an alternative to starting from the Code Review link in navigation, you can also review a particular module's code by clicking on the link on the Modules admin screen.
    
-   [Dreditor](https://addons.mozilla.org/en-GB/firefox/addon/dreditor-for-firefox/) (a firefox browser plug-in for reviewing patches and more). [Instructions to install Dreditor on Chrome.](https://www.drupal.org/project/drupal/issues/2281761#comment-13759934)
-   [PAReview](http://drupal.org/project/pareviewsh) (a set of scripts for reviewing project applications, which runs some coding tests)
-   [Coder Sniffer](http://drupal.org/node/1419980) (runs coding standards validation without loading drupal)
-   The [Grammar Parser](http://drupal.org/project/grammar_parser) module provides an automated way of rewriting code files in compliance with code standards. You'll probably also need the [Grammar Parser UI](http://drupal.org/project/grammar_parser_ui) module. These are only available for Drupal 7.

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/318/edit), and edit this page
-   Log in, click [Discuss](/node/318/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%28318%29%20PHP%20coding%20standards) with your suggestion