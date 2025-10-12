## Twig Coding Standards

### Rules
- Twig template docblocks should only include `@ingroup themeable` if the template is providing the default themeable output. For themes overriding default output the `@ingroup themeable` line should not be included.
- Variables in a twig template docblock should be referenced by name. They will not be surrounded by the Twig print indicators {{ and }} and will not be preceded by the PHP variable indicator $. There should be no separate "Other variables" section.
- A good rule of thumb for converting docs at the top of templates is as follows
- Start from what we had in Drupal 7.
- If you see a section of variables titled "Other variables", delete the title and the extra line above.
- if/when variables get deleted from preprocess, delete them from the Twig docs.
- if/when a variable looks useful and is not in the Twig docs, document it.
- if/when you can improve, or reduce the verbosity of the D7 docs, do it.