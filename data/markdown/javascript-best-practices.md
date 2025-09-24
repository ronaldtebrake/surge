# JavaScript best practices

### On this page

-   [JavaScript code placement](/docs/develop/standards/javascript/javascript-best-practices#jscodeplacement)
-   [Use literal expressions](/docs/develop/standards/javascript/javascript-best-practices#literal)
-   ["with" statement](/docs/develop/standards/javascript/javascript-best-practices#with)
-   [Avoiding unreachable code](/docs/develop/standards/javascript/javascript-best-practices#avoidingunreachablecode)
-   [eval() is evil](/docs/develop/standards/javascript/javascript-best-practices#eval)
-   [Preventing XSS](/docs/develop/standards/javascript/javascript-best-practices#xss)
-   [Modifying the DOM](/docs/develop/standards/javascript/javascript-best-practices#createElement)
-   [Drupal 6 (and later) Specific Stuff](/docs/develop/standards/javascript/javascript-best-practices#drupal6)
-   [Theming](/docs/develop/standards/javascript/javascript-best-practices#theming)
-   [String Translation](/docs/develop/standards/javascript/javascript-best-practices#translation)

## [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards)

-   [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards)
-   [JavaScript best practices](/docs/develop/standards/javascript/javascript-best-practices)
-   [ESLint settings](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool)
-   [JavaScript API documentation and comment standards](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards)
-   [jQuery coding standards](/docs/develop/standards/javascript/jquery-coding-standards)

# JavaScript best practices

Last [updated](/node/2297057/discuss) on

16 October 2020

Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

This page covers DOM and Drupal specific code styles.

## [](#jscodeplacement "Permalink to this headline")JavaScript code placement

JavaScript code SHOULD NOT be embedded in the HTML where possible, as it adds significantly to page weight with no opportunity for mitigation by caching and compression.

**Beginner's note aside:** "In Drupal 7, there are four primary methods of adding JavaScript to Drupal." See [Managing JavaScript in Drupal 7](https://www.drupal.org/node/756722).

## [](#literal "Permalink to this headline")Use literal expressions

Code SHOULD use literal expressions instead of the `new` operator:

-   Use `[]` instead of `new Array()`
-   Use `{}` instead of `new Object()`

It is RECOMMENDED to use literal expressions instead of the wrapper forms `new Number`, `new String`, `new Boolean` in situations where the literal expression is the same. However, you MAY use object instances in which it matters:
```php
`var literalNum = 0;
var objectNum = new Number(0);
if (literalNum) { } // false because 0 is a false value, will not be executed.
if (objectNum) { }  // true because objectNum exists as an object, will be executed.
if (objectNum.valueOf()) { } // false because the value of objectNum is 0.`
```
## [](#with "Permalink to this headline")"with" statement

The `with` statement MUST NOT be used, since it is not possible to use `with` with enabled strict mode.

Instead, you SHOULD use the explicit longer version:
```php
`foo.bar.foobar.abc = true;
foo.bar.foobar.xyz = true;`
```
Alternatively, you MAY use references:
```php
`var o = foo.bar.foobar;
o.abc = true;
o.xyz = true;`
```
## [](#avoidingunreachablecode "Permalink to this headline")Avoiding unreachable code

To prevent unreachable code, a `return`, `break`, `continue`, or `throw` statement SHOULD be followed by a `}` or `case` or `default`.

## [](#eval "Permalink to this headline")`eval()` is evil

`eval()` SHOULD NOT be used.

The browser has to create an entirely new scripting environment (just like creating a new web page), import all variables from the current scope, execute the script, collect the result, and export the variables back into the original environment. Additionally, the code cannot be cached for optimization purposes. It is both the most powerful and most misused method in JavaScript.

Note that JavaScript implicitly uses `eval()` for some other language constructs.

You SHOULD NOT use the `Function` constructor, and you SHOULD NOT pass strings to `setTimeout()` or `setInterval()`.

## [](#xss "Permalink to this headline")Preventing XSS

All output to the browser that has been provided by a user SHOULD be escaped through `Drupal.checkPlain()` first.

This is similar to Drupal's PHP `check_plain()` and encodes special characters in a plain-text string for display as HTML.

## [](#createElement "Permalink to this headline")Modifying the DOM

When adding new HTML elements to the DOM, you SHOULD NOT use `document.createElement()`.

For cross-browser compatibility reasons and also in an effort to reduce file size, you SHOULD use the jQuery equivalent.
```php
`this.popup = $('<div id="autocomplete"></div>')[0];`
```
Avoid this:
```php
`this.popup = document.createElement('div');
this.popup.id = 'autocomplete';`
```
## [](#drupal6 "Permalink to this headline")Drupal 6 (and later) Specific Stuff

Drupal 6 saw the introduction of JavaScript theming and translation of JavaScript files.

### [](#theming "Permalink to this headline")Theming

There is a theming mechanism for JavaScript code. Any modules containing JavaScript which produces HTML content MUST provide default theme functions in the Drupal.theme.prototype namespace.

### [](#translation "Permalink to this headline")String Translation

All strings in JavaScript files SHOULD be wrapped in `Drupal.t()`, which is an equivalent of the well-known [`t()`](http://api.drupal.org/t) function.

Likewise, there is an equivalent to [`format_plural()`](http://api.drupal.org/format_plural), named `Drupal.formatPlural()`.

Their parameter order is exactly like their server-side counterparts.

**See also:**

-   [JavaScript coding standards](https://www.drupal.org/node/172169).
-   [jQuery coding standards](/docs/develop/standards/javascript/jquery-coding-standards).

## Tags

[javascript](/taxonomy/term/188579)

[best practices](/taxonomy/term/187515)

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/2297057/edit), and edit this page
-   Log in, click [Discuss](/node/2297057/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282297057%29%20JavaScript%20best%20practices) with your suggestion