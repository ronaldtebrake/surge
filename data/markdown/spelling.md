# Spelling

### On this page

-   [Spelling of CSpell](/docs/develop/standards/spelling#s-spelling-of-cspell)
-   [Ignore word(s) in a file](/docs/develop/standards/spelling#s-ignore-words-in-a-file)
-   [Disable CSpell by line](/docs/develop/standards/spelling#s-disable-cspell-by-line)
-   [Disable CSpell for multiple lines](/docs/develop/standards/spelling#s-disable-cspell-for-multiple-lines)

## [Coding standards](/docs/develop/standards)

-   [PHP](/docs/develop/standards/php)
-   [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
-   [CSS](/docs/develop/standards/css)
-   [JavaScript](/docs/develop/standards/javascript-coding-standards)
-   [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
-   [SQL](/docs/develop/standards/sql)
-   [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
-   [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)
-   [Spelling](/docs/develop/standards/spelling)
-   [Configuration file coding standards](/docs/develop/coding-standards/configuration-file-coding-standards)
-   [Composer package naming conventions](/docs/develop/coding-standards/composer-package-naming-conventions)

# Spelling

Last [updated](/node/3352554/discuss) on

3 October 2023

Drupal Core uses US English spelling for all source code, including comments and names.

Core code is automatically checked for spelling by [CSpell](https://cspell.org/). 

## [](#s-spelling-of-cspell "Permalink to this headline")Spelling of CSpell

For in line documentation settings use all lower case for cspell. For example, `// cspell:ignore.`

## [](#s-ignore-words-in-a-file "Permalink to this headline")Ignore word(s) in a file

Use the `cspell:ignore` directive. The words are listed alphabetically with a single space between the words. Use multiple lines to meet the number of characters per line limit.
```php
`<?php

// cspell:ignore first-word second-word`
```
## [](#s-disable-cspell-by-line "Permalink to this headline")Disable CSpell by line

if it's not in English or a nonsense string (for example, a random string in a test) disable CSpell for that line. Note that `cspell` is lower case.
```php
`<?php

// cspell:disable-next-line
$token = 'PxOHfS_QL-T01NjBgu7Z7I04tIwMp6La5vM-mVxezbU';
use Drupal\foo\Bar;`
```
## [](#s-disable-cspell-for-multiple-lines "Permalink to this headline")Disable CSpell for multiple lines

For multiple lines, use disable before the lines and enable after. Note that `cspell` is lower case.
```php
`<?php

// cspell:disable
$lorem1 = 'Lorem ipsum dolor sit amet in libero.';
$lorem2 = 'Ut fermentum est vitae metus orci.';
// cspell:enable`
```
See the [cspell development tool page](/node/3352552) for more details.

## Related Content

## [Style guide](/drupalorg/style-guide)

This section is intended to provide direction for Drupal.org content, particularly documentation and general information pages related to

## [User interface standards](/docs/develop/user-interface-standards)

User Interface standards for Drupal.

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/3352554/edit), and edit this page
-   Log in, click [Discuss](/node/3352554/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%283352554%29%20Spelling) with your suggestion