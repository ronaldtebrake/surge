Architecture Guidelines:
- Ensure all CSS code is still in use and applies correctly
- Check for redundant code that may no longer be required or is overriding identical browser defaults
- Verify the components are named correctly to describe the design semantics
- Determine if the code can be abstracted out into a common reusable class to increase consistency and reduce the need for custom CSS
- Ensure the CSS selectors are short, simple, and replaced with component and sub-component classes where possible
- Confirm the code is in the correct file, with each CSS component and its sub-components living in its own file

Formatting Guidelines:
- Add a file comment to the top of the stylesheet
- Ensure all other comments are formatted correctly
- Verify whitespace is used correctly, including indentations and line breaks
- Check the formatting of rulesets, properties, and media queries
- Ensure existing RTL styles are formatted correctly