## Setting Up The Linter Fixer Tool

### Rules
- Understanding the purpose and nature of Drupal's coding standards for JavaScript from the [previous pages](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards) represents the theory. Now, let's continue with their practical usage in everyday work. This page describes some basic methods of setting up developer aid tools utilizing these rulesets.
- *ESLint* is the most popular linter utility for JavaScript and EcmaScript-based (hence the name) languages. It analyzes static code to catch syntax issues and enforce coding best practices. (It is loosely comparable to PHPStan on the backend side, but not as type-aware.)
- On the other hand, *Prettier* is a separate tool: an opinionated code formatter that can be integrated into ESLint via plugins. However, unlike ESLint, it doesn’t validate logic or best practices. (It only rewrites code into a consistent format.)
- [![Screenshot](/files/drupal-core-managaes-its-frontend-dependencies-with-yarn.png)](/files/drupal-core-managaes-its-frontend-dependencies-with-yarn.png "Open in original size")
- The containerization tool DDEV offers this *Corepack* component by default, built into the web container (which runs your website). You just need to enable it:
- 1.  Find the "corepack" term in your `.ddev/config.yaml` file
- 2.  Uncomment it, set its value to "true"
- 3.  Restart your stack: `$ ddev restart`