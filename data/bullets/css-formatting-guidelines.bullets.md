Whitespace:
- Use 2 spaces for each level of indentation.
- Declarations should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.

Blank Lines:
- Separate each ruleset by a blank line when using PostCSS.
- If a ruleset has a preceding comment that describes it, place a blank line before the comment.
- If two rulesets have no interleaving blank line, they must be logically related.

Line Endings:
- Do not include any whitespace (spaces or tabs) at the end of lines.
- All text files should end with a single blank line.
- Format files with Unix line endings (a newline character, denoted as `\n` or `LF`).

Comments:
- Each file should start with a comment describing what the file does.
- Short comments describing a ruleset can be kept to one line.
- Any comment that requires 2 or more lines must follow the Doxygen comment style.
- Within a ruleset, multi-line comments are preceded with a `/*` and terminated by a `*/`.

Properties:
- In a declaration, the property name should be immediately followed by a colon, then a single space, and then the property’s value.
- Include a semicolon at the end of all declarations.
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

Declaration Order:
- Order the declarations in a ruleset so that the purpose of the declaration block is most obvious.
- Positioning properties should be placed first, followed by box model properties, and then other declarations.
- Vendor prefixed properties should be directly before their non-prefixed version.