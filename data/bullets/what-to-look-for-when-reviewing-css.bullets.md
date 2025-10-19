Architecture Guidelines:
- Ensure all CSS code is still in use and applies correctly.
- Check for redundant CSS code that may override previous values or browser defaults identically.
- Verify the components are named correctly to describe the design semantics.
- Consider if the code should be abstracted into a common reusable class to increase consistency and reduce the need for custom CSS.
- Ensure the CSS selectors are short, simple, and replaced with component and sub-component classes where necessary.
- Confirm the code is in the correct file. Each CSS component should live in its own file along with its sub-components. Avoid spreading the styling for one element across several files.

Formatting Guidelines:
- Add a file comment to the top of the stylesheet.
- Ensure all other comments are formatted correctly.
- Verify whitespace, including indentations and line breaks, is used correctly.
- Check the formatting of rulesets, properties, and media queries for correctness.
- Confirm existing RTL styles are formatted correctly.