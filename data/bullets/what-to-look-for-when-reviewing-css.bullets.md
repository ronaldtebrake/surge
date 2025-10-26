Architecture Guidelines:
- Ensure all CSS code is still in use and applies correctly.
- Check for redundant CSS code that may no longer be required to override previous values.
- Ensure components are named correctly to describe the design semantics.
- Consider if the code should be abstracted out into a common reusable class to reduce the need for custom CSS and increase consistency.
- Ensure CSS selectors are short and simple, replaced with component and sub-component classes where possible.
- Verify the CSS code is in the correct file. For themes, each CSS component should live in its own file with its sub-components.

Formatting Guidelines:
- Add a file comment to the top of the stylesheet.
- Ensure all other comments are formatted correctly.
- Check whitespace is being used correctly, including indentations and line breaks.
- Verify the formatting of rulesets, properties, and media queries are correct.
- Check existing RTL styles are formatted correctly.