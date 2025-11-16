## CSS File Organization

- Group rulesets into logical files to enforce separation of concerns within the CSS.
- Follow a SMACSS-style categorization of CSS rules: Base, Layout, Component, State, and Theme.
- Base should include HTML element styling, typography, root scooped CSS custom properties, resets, and utility classes.
- Layout should include overall layout of the page including page template layout, region layout, etc.
- Component should include the majority of a theme’s styles and should be scoped to their own CSS files.
- State and Theme categories are not frequently used with modern CSS.
- Component states should be included within their respective stylesheet.
- Styles that affect the overall look and feel of the theme can be done more effectively by modifying CSS custom properties.

## CSS Files for Drupal Modules

- Place all of a module's styles in a `css/` sub-directory and broken into one or more of the following files: `module_name.module.css`, `module_name.theme.css`, `module_name.admin.css`, `module_name.admin.theme.css`.
- `module_name.module.css` should hold the minimal styles needed to get the module's functionality working.
- `module_name.theme.css` should hold extra styles to make the module's functionality aesthetically pleasing.
- `module_name.admin.css` should hold the minimal styles needed to get the module's admin screens working.
- `module_name.admin.theme.css` should hold extra styles to make the module's admin screens aesthetically pleasing.
- Modules should never have any base styles.

## CSS Files for Drupal Themes

- Always separate Base, Layout, and Component styles into their own files.
- For complex themes, consider placing each component or component family in its own file.
- Include State rules, including media queries, with the component to which they apply.
- Theme rules may or may not have their own file(s). 

## Aggregating CSS

- In Drupal 8 and later, themes now have the ability to override stylesheets without affecting the “every page” option of the original stylesheet.
- Instead of 6 aggregated files, there can just be 2: The “Every page” aggregate and the conditionally-loaded aggregate.
- The order of styles within an aggregate are determined by the “weight” option of `drupal_add_css()`.
- There should never be conditionally-loaded base styles.

## SMACSS and Sass/Compass

- SMACSS when combined with Sass/Compass concept can provide much control over output css.
- Use Sass Globbing concept to have multiple .scss files and only one css file with the use of partials.