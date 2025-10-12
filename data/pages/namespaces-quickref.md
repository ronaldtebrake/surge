## Namespaces

### Rules
- Not all files in Drupal declare a namespace. As of Drupal 8 an increasing number of files do, but not all. Prior to Drupal 8 virtually no code used namespaces, in order to remain compatible with PHP 5.2. Therefore there are two slightly different standards.
- Classes and interfaces with a backslash `\` inside their fully-qualified name (for example: `Drupal\simpletest\WebTestBase`) must not use their fully-qualified name inside the code. If the namespace differs from the namespace of the current file, put a `use` statement on the top of the file. For example:
- Classes and interfaces without a backslash `\` inside their fully-qualified name (for example, the built-in PHP Exception class) must be fully qualified when used in a namespaced file. For example: `new \Exception();`. Do not `use` global classes.
- In a file that does not declare a namespace (and is therefore in the global namespace), classes in any namespace other than global must be specified with a "use" statement at the top of the file.
- When specifying a class name in a string, use its full name including namespace, without leading `\`.
- Escape the namespace separator in double-quoted strings: `"Drupal\\Context\\ContextInterface"`
- Do not escape it in single-quoted strings: `'Drupal\Context\ContextInterface'`
- As stated elsewhere, single-quoted strings are generally preferred.