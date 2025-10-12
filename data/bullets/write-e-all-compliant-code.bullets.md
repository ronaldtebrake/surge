
## Write E_ALL compliant code

## Write E\_ALL compliant code

## Adjusting the error reporting level
- Drupal 6.x releases ignore E\_NOTICE, E\_STRICT, and E\_DEPRECATED notices for the benefit of production sites. To view all PHP errors on development or testing sites, you may change `includes/common.inc` from:
- Drupal 7.x releases report any error levels which are part of E\_ALL, and allow PHP to be configured to report additional error levels, such as E\_STRICT. To view all PHP errors on development or testing sites, you may set
- in the `.htaccess` file.

## Use of isset() or !empty()
- If you want to test the value of a variable, array element or object property, you may need to use `if (isset($var))` or `if (!empty($var))` rather than `if ($var)` if there is a possibility that `$var` has not been defined.
- The difference between [isset()](http://php.net/isset) and [!empty()](http://php.net/empty) is that unlike `!empty()`, `isset()` will return TRUE even if the variable is set to an empty string or zero. In order to decide which one to use, consider whether `''` or `0` are valid and expected values for your variable.
- The following code may trigger an E\_NOTICE error:
- Here, the variable `$form` is passed on to the function. If `$form['#input']` evaluates as true, `some code` is executed. However, if `$form['#input']` does not exist, the function outputs the following error message: `notice: Undefined index: #input in includes/form.inc on line 194.`
- Even though the array $form is already declared and passed to the function, each array index must be explicitly declared. The previous code should read:
- The function [isset()](http://php.net/isset) returns `TRUE` when the variable is set to `0`, but `FALSE` if the variable is set to `NULL`. In some cases, [is\_null()](http://php.net/is_null) is a better choice, especially when testing the value of a variable returned by an SQL query.