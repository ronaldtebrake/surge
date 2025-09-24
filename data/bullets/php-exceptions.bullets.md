# Bullet Points for php-exceptions.md


## PHP Exceptions

## On this page
- [Basic Exception Naming Conventions](/docs/develop/coding-standards/php-exceptions#conventions)
- [Exception Subclasses](/docs/develop/coding-standards/php-exceptions#subclass)
- [Example:](/docs/develop/coding-standards/php-exceptions#s-example)
- [Try-catch blocks](/docs/develop/coding-standards/php-exceptions#s-try-catch-blocks)
- [Inheritance](/docs/develop/coding-standards/php-exceptions#s-inheritance)

## [PHP](/docs/develop/standards/php)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
- [Namespaces](/docs/develop/coding-standards/namespaces)
- [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
- [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)
- [PSR-4 namespaces and autoloading in Drupal 8](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8)
- [Temporary placeholders and delimiters](/docs/develop/coding-standards/temporary-placeholders-and-delimiters)
- [Write E\_ALL compliant code](/docs/develop/coding-standards/write-e_all-compliant-code)

## PHP Exceptions
- Last [updated](/node/608166/discuss) on
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

## [](#conventions "Permalink to this headline")Basic Exception Naming Conventions
- 1.  As Exceptions are classes, they should follow all [coding standards for object-oriented code](http://drupal.org/node/608152) like any other class.
- 2.  All Exceptions must end with the suffix "Exception".
- 3.  All Exceptions should include an appropriate message and should not be translated. Only messages from the install and update system are currently translated as they are user facing.
- 4.  The Exception's message should include a hint to the values that caused the exception.
- 1.  Formatting messages should be done by concatenating strings or using `sprintf()`.
- 2.  Values should be surrounded by single quotes.
- 3.  **DO NOT** translate the message.
- 4.  **DO NOT** use `SafeMarkup::format()`.
- 5.  Exception classes should be named for the subsystem to which they relate, and the type of error. That is, `[Subsystem][ErrorType]Exception`.

## [](#subclass "Permalink to this headline")Exception Subclasses
- The use of subclassed Exceptions is preferred over reusing a single generic Exception class with different error messages as different classes may then be caught separately.

## [](#s-example "Permalink to this headline")Example:
- `class WidgetNotFoundException extends Exception {}
- function use_widget($widget_name) {
- $widget = find_widget($widget_name);
- if (!$widget) {
- throw new WidgetNotFoundException("Widget '$widget_name' not found.");
- See [the Drupal\\Core\\Entity\\Exception namespace](https://api.drupal.org/api/drupal/namespace/Drupal!Core!Entity!Exception/8.2.x) for real-life examples.

## [](#s-try-catch-blocks "Permalink to this headline")Try-catch blocks
- Try-catch blocks should follow a similar line-breaking pattern to if-else statements, with each catch statement beginning a new line.
- $widget = 'thingie';
- $result = use_widget($widget);
- // Continue processing the $result.
- // If an exception is thrown by use_widget(), this code never gets called.
- catch (WidgetNotFoundException $e) {
- // Error handling specific to the absence of a widget.
- catch (Exception $e) {
- // Generic exception handling if something else gets thrown.
- \Drupal::logger('widget')->error($e->getMessage());

## [](#s-inheritance "Permalink to this headline")Inheritance
- PHP requires that all exceptions inherit off of the Exception class, either directly or indirectly.
- When creating a new exception class, it should be named according to the subsystem they relate to and the error message they involve. If a given subsystem includes multiple exceptions, they should all extend from a common base exception. That allows for multiple catch blocks as necessary.
- `class FelineException extends Exception {}
- class FelineHairBallException extends FelineException {}
- class FelineKittenTooCuteException extends FelineException {}
- $nermal = new Kitten();
- $nermal->playWith($string);
- catch (FelineHairBallException $e) {
- // Do error handling here.
- catch (FelineKittenTooCuteException $e) {
- // Do different error handling here.
- catch (FelineException $e) {
- // Do generic error handling here.
- // Optionally also catch Exception so that all exceptions stop here instead of propagating up.`

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/608166/edit), and edit this page
- Log in, click [Discuss](/node/608166/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%28608166%29%20PHP%20Exceptions) with your suggestion