## Whitespace
- Use 2 spaces for each level of indentation.
- Declarations should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.

## Blank lines
- Separate each ruleset by a blank line when using PostCSS.
- Place a blank line before the comment if a ruleset has a preceding Doxygen-style or single-line-style comment.
- Add a blank line and a comment describing the second ruleset if two rulesets are not logically related.

## Line endings
- Do not leave any whitespace (spaces or tabs) at the end of lines.
- End all text files with a single blank line.
- Format files with Unix line endings (a newline character, denoted as `\n` or `LF`).

## Comments
- Each file should start with a comment describing what the file does.
- Keep line-lengths to 80 columns, when possible.
- Short comments describing a ruleset can be kept to one line.
- Follow the Doxygen comment style for any comment that requires 2 or more lines.
- Precede multi-line comments within a ruleset with a `/*` and terminate with a `*/`.
- Use a simple CSS comment style for any comment that can be written inside the 80 character line length limit.

## Properties where browsers do not have or support CSS logical properties
- Add a `/* LTR */` comment on the same line preceded by a single space for direction specific rules.

## Rulesets
- Use one selector per line when a ruleset has a group of selectors separated by commas.
- Include one declaration per line in a declaration block.

## Properties
- Follow the property name immediately by a colon, then a single space, and then the property’s value in a declaration.
- Include a semicolon at the end of all declarations.
- Use double quotes for property values that require quotes.
- Default to rem units, unless it creates an undesired effect.
- Quote attribute values in selectors.
- Avoid specifying units for zero-values.
- Include a space after each comma in comma-separated property or function values.
- Do not use spaces around the parentheses in a function.
- Use lower case function names.

## Declaration order
- Order the declarations in a ruleset so that the purpose of the declaration block is most obvious.
- Positioning properties should be placed first.
- Box model properties should be placed next.
- Other declarations should be placed last.
- Vendor prefixed properties should be directly before their non-prefixed version.