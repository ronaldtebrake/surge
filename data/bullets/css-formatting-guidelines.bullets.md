## Whitespace
- Use 2 spaces for each level of indentation.
- Declarations should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.

## Blank lines
- Separate each ruleset by a blank line when using PostCSS.
- If a ruleset has a preceding comment that describes it, place a blank line before the comment.
- If two rulesets have no interleaving blank line, they must be logically related. If not, add a blank line and a comment describing the second ruleset.

## Line endings
- Do not include any whitespace (spaces or tabs) at the end of lines.
- All text files should end with a single blank line.
- Format files with Unix line endings (a newline character, denoted as `\n` or `LF`).

## Comments
- Each file should start with a comment describing what the file does. Follow this with a blank line.
- Keep line-lengths to 80 columns, when possible.
- Short comments describing a ruleset can be kept to one line.
- Multi-line comments that describe a ruleset or set of rulesets must follow the Doxygen comment style.
- Multi-line comments within a ruleset are preceded with a `/*` and terminated by a `*/`. Text should maintain left alignment.
- Single-line comments can use a simple CSS comment style if they can be written inside the 80 character line length limit.

## Properties where browsers do not have or support CSS logical properties
- For direction specific rules, add a `/* LTR */` comment on the same line preceded by a single space.

## Rulesets
- Use one selector per line when a ruleset has a group of selectors separated by commas.
- Consider using functional pseudo-classes like `:is()`, `:not()or` `:where()` that allow combining of selectors.
- Include one declaration per line in a declaration block.

## Properties
- In a declaration, the property name should be immediately followed by a colon, then a single space, and then the property’s value.
- Include a semicolon at the end of all declarations.
- For property values that require quotes, use double quotes instead of single quotes.
- Default to rem units, unless it creates an undesired effect.
- Quote attribute values in selectors.
- Avoid specifying units for zero-values.
- Include a space after each comma in comma-separated property or function values.
- Do not use spaces around the parentheses in a function.
- Use lower case function names.

## Declaration order
- Order the declarations in a ruleset so that the purpose of the declaration block is most obvious.
- Positioning properties should come first, followed by box model properties, and then other declarations.
- Within each group, properties can be grouped alphabetically or grouped with like properties next to each other.
- Vendor prefixed properties should be directly before their non-prefixed version.
- Add comments to the ruleset to reinforce its purpose.