## Css File Organization

### Rules
- Note: This document describes a file organization and aggregation strategy that has not yet been implemented. See this core issue for that on-going work: [#1921610: \[Meta\] Architect our CSS](/project/drupal/issues/1921610 "Status: Active")
- Rulesets should be grouped into logical files that enforce the separation of concerns within the CSS, that can be aggregated efficiently and that can be easily overridden by themers.
- Drupal follows a SMACSS-style categorization of its CSS rules: The State and Theme categories are not frequently used with modern CSS.
- 1.  Base —Should include HTML element styling (e.g. a, ul, etc), typography, root scooped CSS custom properties, resets and utility classes.
- 2.  Layout —Overall layout of the page including page template layout, region layout, etc.
- 3.  Component (SMACSS “module”) — The majority of a theme’s styles will be within components. Components should be scoped to their own CSS files. Example components include pager, navigation, footer, etc.
- 4.  State (not used often) — This was originally created for styles that modified the states of components, however it is now best practice to include component states within their respective stylesheet.
- 5.  Theme (not used often) — This was originally created to apply styles that would affect the overall look and feel of the theme (such as colors), however this can now be done more effectively by modifying CSS custom properties.