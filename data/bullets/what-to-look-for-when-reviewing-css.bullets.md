Architecture Guidelines:
- Ensure all CSS code is still in use and applies correctly.
- Check for redundant code that may no longer be required or is overriding identical browser defaults.
- Verify the components are named correctly to accurately describe the design semantics.
- Consider if the code should be abstracted out into a common reusable class to increase consistency and reduce the need for custom CSS.
- Ensure the selectors are correct, favoring short and simple selectors, replaced with component and sub-component classes.
- Validate the code is in the correct file. Each CSS component should live in its own file with its sub-components. 

Formatting Guidelines:
- Add a file comment to the top of the stylesheet.
- Ensure all other comments are formatted correctly.
- Check whitespace is being used correctly, including indentations and line breaks.
- Validate the formatting of rulesets, properties, and media queries.
- Check existing RTL styles are formatted correctly.