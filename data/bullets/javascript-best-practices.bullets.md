
## JavaScript best practices

## JavaScript best practices
- This page covers DOM and Drupal specific code styles.

## JavaScript code placement
- JavaScript code SHOULD NOT be embedded in the HTML where possible, as it adds significantly to page weight with no opportunity for mitigation by caching and compression.
- *Beginner's note aside:** "In Drupal 7, there are four primary methods of adding JavaScript to Drupal." See [Managing JavaScript in Drupal 7](https://www.drupal.org/node/756722).

## Use literal expressions
- Code SHOULD use literal expressions instead of the `new` operator:
- Use `[]` instead of `new Array()`
- Use `{}` instead of `new Object()`
- It is RECOMMENDED to use literal expressions instead of the wrapper forms `new Number`, `new String`, `new Boolean` in situations where the literal expression is the same. However, you MAY use object instances in which it matters:

## "with" statement
- The `with` statement MUST NOT be used, since it is not possible to use `with` with enabled strict mode.
- Instead, you SHOULD use the explicit longer version:
- Alternatively, you MAY use references:

## Avoiding unreachable code
- To prevent unreachable code, a `return`, `break`, `continue`, or `throw` statement SHOULD be followed by a `}` or `case` or `default`.

## `eval()` is evil
- `eval()` SHOULD NOT be used.
- The browser has to create an entirely new scripting environment (just like creating a new web page), import all variables from the current scope, execute the script, collect the result, and export the variables back into the original environment. Additionally, the code cannot be cached for optimization purposes. It is both the most powerful and most misused method in JavaScript.
- Note that JavaScript implicitly uses `eval()` for some other language constructs.
- You SHOULD NOT use the `Function` constructor, and you SHOULD NOT pass strings to `setTimeout()` or `setInterval()`.

## Preventing XSS
- All output to the browser that has been provided by a user SHOULD be escaped through `Drupal.checkPlain()` first.
- This is similar to Drupal's PHP `check_plain()` and encodes special characters in a plain-text string for display as HTML.

## Modifying the DOM
- When adding new HTML elements to the DOM, you SHOULD NOT use `document.createElement()`.
- For cross-browser compatibility reasons and also in an effort to reduce file size, you SHOULD use the jQuery equivalent.
- Avoid this:

## Drupal 6 (and later) Specific Stuff
- Drupal 6 saw the introduction of JavaScript theming and translation of JavaScript files.

## Theming
- There is a theming mechanism for JavaScript code. Any modules containing JavaScript which produces HTML content MUST provide default theme functions in the Drupal.theme.prototype namespace.

## String Translation
- All strings in JavaScript files SHOULD be wrapped in `Drupal.t()`, which is an equivalent of the well-known [`t()`](http://api.drupal.org/t) function.
- Likewise, there is an equivalent to [`format_plural()`](http://api.drupal.org/format_plural), named `Drupal.formatPlural()`.
- Their parameter order is exactly like their server-side counterparts.
- *See also:**
- [JavaScript coding standards](https://www.drupal.org/node/172169).
- [jQuery coding standards](/docs/develop/standards/javascript/jquery-coding-standards).

## Tags
- [javascript](/taxonomy/term/188579)
- [best practices](/taxonomy/term/187515)