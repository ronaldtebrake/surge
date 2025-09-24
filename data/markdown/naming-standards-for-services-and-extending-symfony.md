# Naming standards for services and extending Symfony

### On this page

-   [Manipulating the Request object:](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony#s-manipulating-the-request-object)

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

# Naming standards for services and extending Symfony

Last [updated](/node/2084027/discuss) on

13 December 2022

This documentation **needs work**. See "Help improve this page" in the sidebar.

Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

### [](#s-manipulating-the-request-object "Permalink to this headline")Manipulating the Request object:

Elements added to the attributes of the Request object by any Drupal module or service should have a "\_" prepended unless they come from the path.

Example:
```php
`\Drupal::request()->attributes->set('_context_value', $myvalue);` 
```
Only values that come from the path will have the "\_" omitted, for example, the path pattern /node/{node}.

Drupal core and Symfony typically add some prefixed attributes that should not be overwritten by a contributed module. These include:
```php
`_system_path
_title
_account` 
```
(Note that \_account is being removed in [#2073531: Use current user service instead of \_account, remove \_account from the request object](/project/drupal/issues/2073531 "Status: Closed (fixed)").)

and from Symfony\\Cmf\\Component\\Routing\\RouteObjectInterface:
```php
`_route
_route_object
_controller
_content`
```
See the [the original change notice](/node/2083979).

## Help improve this page

**Page status:** Needs work

  
**You can:**  

-   Log in, click [Edit](/node/2084027/edit), and edit this page
-   Log in, click [Discuss](/node/2084027/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282084027%29%20Naming%20standards%20for%20services%20and%20extending%20Symfony) with your suggestion