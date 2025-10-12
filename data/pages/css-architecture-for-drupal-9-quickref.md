## Css Architecture For Drupal 9

### Rules
- Note: This document aims to apply emerging best-practices for CSS to Drupal 8/9. As we implement these ideas in Drupal 8, this document may need to be updated.
- [Skip to best practices](#best-practices)
- The goals of good CSS should not be so different from those of good software engineering. Well-architected CSS, like PHP or JavaScript, should be:
- CSS throughout Drupal core and contributed modules should be consistent and understandable. Changes should do what you would expect without side-effects.
- As new components and features are needed, it should be easy to add, modify and extend CSS without breaking (or refactoring) existing styles.
- CSS should be easy to manage for a single developer or for large, distributed teams (like Drupal’s).
- Components are the discrete, purpose-built visual elements that make up the UI of a site or app. Components consist of HTML, CSS, and often – but not always – JavaScript. They are our navbars, dialogs, buttons and carousels. Components can be simple (such as icon containers and buttons) or complex enough to be themselves composed of other components.
- To better understand the best practices provided below, it can be helpful to review some common approaches that impede our goals of predictability, maintainability, reusability and scalability.