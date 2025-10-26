Whitespace:
- Use 2 spaces for each level of indentation.
- Declarations should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.

Blank lines:
- Separate each ruleset by a blank line when using PostCSS.
- Place a blank line before a comment that describes a ruleset.
- Add a blank line and a comment describing the second ruleset if two rulesets are not logically related.

Line endings:
- Do not leave any whitespace at the end of lines.
- End all text files with a single blank line.
- Format files with Unix line endings.

Comments:
- Each file should start with a comment describing what the file does.
- Keep line-lengths to 80 columns when possible.
- Short comments describing a ruleset can be kept to one line.
- Use the Doxygen comment style for multi-line comments describing a ruleset.
- Multi-line comments within a ruleset are preceded with a `/*` and terminated by a `*/`.

Properties:
- Follow the property name with a colon, a single space, and then the property’s value in a declaration.
- End all declarations with a semicolon.
- Use double quotes for property values that require quotes.
- Default to rem units, unless it creates an undesired effect.
- Quote attribute values in selectors.
- Avoid specifying units for zero-values.
- Include a space after each comma in comma-separated property or function values.
- Do not use spaces around the parentheses in a function.
- Use lower case function names.

Rulesets:
- Use one selector per line when a ruleset has a group of selectors separated by commas.
- Include one declaration per line in a declaration block.

Declaration order:
- Order the declarations in a ruleset for clarity.
- Positioning properties should be listed first.
- Box model properties should be listed next.
- Other declarations should be listed last.
- Vendor prefixed properties should be directly before their non-prefixed version.