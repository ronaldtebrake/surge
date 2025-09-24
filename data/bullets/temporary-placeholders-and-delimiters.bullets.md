# Bullet Points for temporary-placeholders-and-delimiters.md


## Temporary placeholders and delimiters

## On this page
- [Temporary place-holders and delimiters](/docs/develop/coding-standards/temporary-placeholders-and-delimiters#s-temporary-place-holders-and-delimiters)
- [Finding your placeholders](/docs/develop/coding-standards/temporary-placeholders-and-delimiters#s-finding-your-placeholders)

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

## Temporary placeholders and delimiters
- Last [updated](/node/209715/discuss) on
- 25 April 2024
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

## [](#s-temporary-place-holders-and-delimiters "Permalink to this headline")Temporary place-holders and delimiters
- When writing a content filter module, or any code that processes or modifies content, it is tempting to use an obscure character as a place-holder, especially if only your code will see it: But this cannot be guaranteed. Non-printing, invalid or undocumented characters might not be handled correctly in the unlikely event that they are seen by a browser or feed-reader. And the more unlikely they are to be seen – the less likely they are to be tested. This will mean that some code will be written to find and eradicate these insidious characters, possibly including the ones your code is using to do its work.
- To avoid this happening, and extending the lifetime of your code, please use an appropriate alpha-numeric string – prefixed by the name of the module (as a name-space) and a hyphen `-` or underscore `_` – and surrounded by `[`…`]`.
- If you need delimiting place-holders, the closing delimiter can incorporate a `/` after the initial `[` and may suffix the modulename.

## [](#s-finding-your-placeholders "Permalink to this headline")Finding your placeholders
- A PCRE such as
- `'@\[modulename-tag\](.+?)\[/modulename-tag\]@'`
- `'@\[modulename-tag\](.+?)\[/tag-modulename\]@'` if you suffixed the modulename as mentioned above
- can be used to match the string you have previously delimited.

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/209715/edit), and edit this page
- Log in, click [Discuss](/node/209715/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%28209715%29%20Temporary%20placeholders%20and%20delimiters) with your suggestion