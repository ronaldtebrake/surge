## Css Formatting Guidelines

### Rules
- Use 2 spaces for each level of indentation, the same standard as Drupal’s PHP and JavaScript code.
- Declarations (property/value pairs) should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.
- In general, separate each ruleset by a blank line when using PostCSS.
- If a ruleset has a preceding Doxygen-style or single-line-style comment that describes it, place a blank line before the comment.
- If two rulesets have no interleaving blank line, they must be logically related. If they are not logically related to each other, add a blank line and a comment describing the second ruleset.
- There MUST NOT be any whitespace (spaces or tabs) at the end of lines.