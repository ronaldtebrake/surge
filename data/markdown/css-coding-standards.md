# CSS coding standards

### On this page

-   [Acknowledgements](/docs/develop/standards/css/css-coding-standards#s-acknowledgements)

## [CSS](/docs/develop/standards/css)

-   [CSS coding standards](/docs/develop/standards/css/css-coding-standards)
-   [CSS formatting guidelines](/docs/develop/standards/css/css-formatting-guidelines)
-   [CSScomb settings for Drupal (CSS formatting and sort tool)](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool)
-   [CSS architecture (for Drupal 9)](/docs/develop/standards/css/css-architecture-for-drupal-9)
-   [CSS file organization (for Drupal 9)](/docs/develop/standards/css/css-file-organization)
-   [What to look for when reviewing CSS](/docs/develop/standards/css/what-to-look-for-when-reviewing-css)

# CSS coding standards

Last [updated](/node/1886770/discuss) on

17 August 2023

Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

To minimize friction when contributing to CSS, the front-end developers of the Drupal community have reached consensus about our coding standards for:

-   Formatting CSS code.
-   CSS architecture, including goals, pitfalls and best practices.
-   Grouping rulesets into files.

Despite our natural range of working styles and coding preferences, we value collaboration and ease of development, so we have attempted to explain our standards clearly in the following documents.

> "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then **write your code for maximum clarity**." - Idan Gazit

## [](#s-acknowledgements "Permalink to this headline")Acknowledgements

This guide is based upon the works, [*Principles of writing consistent, idiomatic CSS*](https://github.com/necolas/idiomatic-css) by Nicolas Gallagher and [*Scalable and Modular Architecture for CSS*](http://smacss.com) (SMACSS) by Jonathan Snook with a hat tip to Nicole Sullivan’s ground-breaking [*Object Oriented CSS*](http://www.stubbornella.org/content/2009/02/12/css-doesn’t-suck-you’re-just-doing-it-wrong/).

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/1886770/edit), and edit this page
-   Log in, click [Discuss](/node/1886770/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%281886770%29%20CSS%20coding%20standards) with your suggestion