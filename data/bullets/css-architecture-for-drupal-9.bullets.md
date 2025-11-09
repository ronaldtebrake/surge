CSS Architecture for Drupal 9:

Goals:
- Ensure CSS is predictable, reusable, maintainable, and scalable.
- Changes in CSS should be consistent and understandable without side-effects.
- CSS rules should be abstract and decoupled for easy reusability.
- Adding, modifying, and extending CSS should be easy without breaking existing styles.
- CSS should be manageable for both single developers and large teams.

The Component:
- Components are discrete, purpose-built visual elements that make up the UI of a site or app.
- Components consist of HTML, CSS, and sometimes JavaScript.

Common CSS Pitfalls:
- Avoid modifying components based on context.
- Do not rely on HTML structure for CSS selectors.
- Avoid overly generic class names.
- Avoid making a rule do too much.
- Avoid creating style rules that undo other rules.

Best Practices:
- Avoid reliance on HTML structure.
- Define component elements (sub-objects) using their own classes.
- Extend components using modifier classes.
- Separate concerns: components should not be responsible for their positioning or layout within the site.
- Use dedicated classes for JavaScript manipulation rather than relying on classes already in use for CSS.
- Avoid applying inline styles using JavaScript.
- Name components using design semantics.
- Class names should use full words rather than abbreviations.
- Class names for components should always use a dash between words.
- Avoid using the id selector in CSS.
- Use `!important` sparingly and appropriately, and in general should be restricted to themes.

Note for Developers:
- Core default markup should be exceedingly cautious about what classes are included.
- Module developers should ensure that themers can replace/augment any module-provided class.