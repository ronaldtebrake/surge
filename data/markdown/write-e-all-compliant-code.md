# Write E_ALL compliant code

### On this page

-   [Adjusting the error reporting level](/docs/develop/coding-standards/write-e_all-compliant-code#s-adjusting-the-error-reporting-level)
-   [Use of isset() or !empty()](/docs/develop/coding-standards/write-e_all-compliant-code#s-use-of-isset-or-empty)

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

# Write E\_ALL compliant code

Last [updated](/node/34341/discuss) on

25 April 2024

Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

## [](#s-adjusting-the-error-reporting-level "Permalink to this headline")Adjusting the error reporting level

Drupal 6.x releases ignore E\_NOTICE, E\_STRICT, and E\_DEPRECATED notices for the benefit of production sites. To view all PHP errors on development or testing sites, you may change `includes/common.inc` from:
```php
  `if ($errno & (E_ALL ^ E_DEPRECATED ^ E_NOTICE)) {`
```
to:
```php
  `if ($errno & (E_ALL | E_STRICT)) {`
```
Drupal 7.x releases report any error levels which are part of E\_ALL, and allow PHP to be configured to report additional error levels, such as E\_STRICT. To view all PHP errors on development or testing sites, you may set
```php
`php_value error_reporting -1`
```
in the `.htaccess` file.

## [](#s-use-of-isset-or-empty "Permalink to this headline")Use of isset() or !empty()

If you want to test the value of a variable, array element or object property, you may need to use `if (isset($var))` or `if (!empty($var))` rather than `if ($var)` if there is a possibility that `$var` has not been defined.

The difference between [isset()](http://php.net/isset) and [!empty()](http://php.net/empty) is that unlike `!empty()`, `isset()` will return TRUE even if the variable is set to an empty string or zero. In order to decide which one to use, consider whether `''` or `0` are valid and expected values for your variable.

The following code may trigger an E\_NOTICE error:
```php
`function _form_builder($form, $parents = array(), $multiple = FALSE) {
  // (...)
  if ($form['#input']) {
    // some code (...)
  }
}`
```
Here, the variable `$form` is passed on to the function. If `$form['#input']` evaluates as true, `some code` is executed. However, if `$form['#input']` does not exist, the function outputs the following error message: `notice: Undefined index: #input in includes/form.inc on line 194.`

Even though the array $form is already declared and passed to the function, each array index must be explicitly declared. The previous code should read:
```php
`function _form_builder($form, $parents = array(), $multiple = FALSE) {
  // (...)
  if (!empty($form['#input'])) {
    // some code (...)
  }
}`
```
**Beware!**

The function [isset()](http://php.net/isset) returns `TRUE` when the variable is set to `0`, but `FALSE` if the variable is set to `NULL`. In some cases, [is\_null()](http://php.net/is_null) is a better choice, especially when testing the value of a variable returned by an SQL query.

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/34341/edit), and edit this page
-   Log in, click [Discuss](/node/34341/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%2834341%29%20Write%20E_ALL%20compliant%20code) with your suggestion