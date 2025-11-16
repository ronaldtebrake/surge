## Whitespace
- Use 2 spaces for each level of indentation.
- Indent declarations (property/value pairs) one level relative to their selector.
- Indent rulesets within a media query one level relative to the media statement.
- Maintain the indentation of comments at the same level as their declaration or ruleset.

## Blank Lines
- Separate each ruleset by a blank line when using PostCSS.
- Place a blank line before a comment that describes a ruleset.
- If two rulesets have no interleaving blank line, they must be logically related. If not, add a blank line and a comment describing the second ruleset.

## Line Endings
- Do not leave any whitespace (spaces or tabs) at the end of lines.
- End all text files with a single blank line.
- Format files with Unix line endings (a newline character, denoted as `\n` or `LF`).

## Comments
- Each file should start with a comment describing what the file does. Follow this with a blank line.
- Keep line-lengths to 80 columns, when possible.
- Short comments describing a ruleset can be kept to one line.
- Any comment that requires 2 or more lines (wrapped to 80 characters) must follow the Doxygen comment style.
- Within a ruleset, multi-line comments are preceded with a `/*` and terminated by a `*/`.
- When describing a property or ruleset, any comment that can be written inside the 80 character line length limit can use a simple CSS comment style.

## Properties
- Follow the property name immediately by a colon, then a single space, and then the property’s value.
- End all declarations with a semicolon.
- Use double quotes for property values that require quotes.
- Default to rem units, unless it creates an undesired effect.
- Quote attribute values in selectors.
- Avoid specifying units for zero-values.
- Include a space after each comma in comma-separated property or function values.
- Do not use spaces around the parentheses in a function.
- Use lower case function names.

## Rulesets
- Use one selector per line when a ruleset has a group of selectors separated by commas.
- Include one declaration per line in a declaration block.

## Declaration Order
- Positioning properties should be listed first.
- Box model properties should be listed next.
- Other declarations should be listed last.
- Within each group, properties can be grouped alphabetically or with like properties next to each other.
- Vendor prefixed properties should be directly before their non-prefixed version.