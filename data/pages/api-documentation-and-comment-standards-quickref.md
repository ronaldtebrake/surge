## Api Documentation And Comment Standards

### Rules
- This page covers:
- The purpose of the Drupal project's standards for API documentation and comments in PHP code is to ensure that the API module can parse/display the documentation, programmers looking at the PHP files can read/understand the documentation, and integrated developer environments (IDEs) can work successfully with the code and documentation.
- A reference to the tags used in this documentation.
- The API module parses documentation that is in special documentation blocks (known as "docblocks" in the rest of this document).
- Syntax example:
- General notes on the API module and the documentation it will parse:
- The API module treats files with the following extensions as PHP: .php, .module, .inc, .install, .engine., .theme, .profile, and .test.
- When parsing a PHP file, the API module parses both documentation and PHP code. PHP files with syntax errors could cause problems.