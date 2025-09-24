# Bullet Points for accessibility-coding-standards.md


## Accessibility Coding Standards

## On this page
- [Key Goals](/docs/develop/standards/accessibility-coding-standards#s-key-goals)
- [General Best Practices](/docs/develop/standards/accessibility-coding-standards#s-general-best-practices)
- [Technical Standards](/docs/develop/standards/accessibility-coding-standards#s-technical-standards)
- [Implementation](/docs/develop/standards/accessibility-coding-standards#s-implementation)
- [Screen reader hinting with WAI-ARIA (or ARIA)](/docs/develop/standards/accessibility-coding-standards#s-screen-reader-hinting-with-wai-aria-or-aria)
- [Dynamic content](/docs/develop/standards/accessibility-coding-standards#s-dynamic-content)
- [Keyboard Navigation](/docs/develop/standards/accessibility-coding-standards#s-keyboard-navigation)
- [Accessible Methods for Hiding Content](/docs/develop/standards/accessibility-coding-standards#s-accessible-methods-for-hiding-content)
- [Making content invisible for sighted users only](/docs/develop/standards/accessibility-coding-standards#s-making-content-invisible-for-sighted-users-only)
- [Making content invisible, until someone tabs to it](/docs/develop/standards/accessibility-coding-standards#s-making-content-invisible-until-someone-tabs-to-it)
- [Completely hide content for all users](/docs/develop/standards/accessibility-coding-standards#s-completely-hide-content-for-all-users)
- [Inline Form Errors](/docs/develop/standards/accessibility-coding-standards#s-inline-form-errors)
- [Related Form Elements](/docs/develop/standards/accessibility-coding-standards#s-related-form-elements)
- [Using animation responsibly](/docs/develop/standards/accessibility-coding-standards#s-using-animation-responsibly)
- [Testing Your Work](/docs/develop/standards/accessibility-coding-standards#s-testing-your-work)
- [Automated Tools](/docs/develop/standards/accessibility-coding-standards#s-automated-tools)
- [Nightwatch and Drupal Core](/docs/develop/standards/accessibility-coding-standards#s-nightwatch-and-drupal-core)
- [Keyboard Access](/docs/develop/standards/accessibility-coding-standards#s-keyboard-access)
- [Testing With Assistive Technology](/docs/develop/standards/accessibility-coding-standards#s-testing-with-assistive-technology)
- [Form Accessibility](/docs/develop/standards/accessibility-coding-standards#s-form-accessibility)

## [Coding standards](/docs/develop/standards)
- [PHP](/docs/develop/standards/php)
- [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
- [CSS](/docs/develop/standards/css)
- [JavaScript](/docs/develop/standards/javascript-coding-standards)
- [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
- [SQL](/docs/develop/standards/sql)
- [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
- [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)
- [Spelling](/docs/develop/standards/spelling)
- [Configuration file coding standards](/docs/develop/coding-standards/configuration-file-coding-standards)
- [Composer package naming conventions](/docs/develop/coding-standards/composer-package-naming-conventions)

## Accessibility Coding Standards
- Last [updated](/node/3328441/discuss) on
- 27 August 2025
- Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- The Drupal community strives to be inclusive to everyone, including people with disabilities. To that end, the Drupal community has developed the following accessibility coding standards to help make websites and other digital assets accessible to the widest possible audience.

## [](#s-key-goals "Permalink to this headline")Key Goals
- Effective user experiences serve our entire community, including website visitors with disabilities. A positive experience can be achieved by focusing on three goals:
- 1.  Creating an inclusive strategy: Consider accessibility needs when architecting the site
- 2.  Incorporating Accessible Coding: Use best practices (as outlined below) to ensure that content can be navigated and read by all
- 3.  Following Normalized Testing: Building accessibility reviews into existing processes (and not as an add-on) will help to ensure code pushed out is accessible.

## [](#s-general-best-practices "Permalink to this headline")General Best Practices
- Drupal has made every effort to seamlessly build accessibility in Drupal Core.  This process empowers developers and authors to build highly legible content that can be parsed by assistive devices, by:
- Providing **text alternatives (alt text)** for non-text content, such as images, charts and graphs.
- Providing accurate transcripts, captions, and descriptions for video.
- Ensuring color choices have sufficient **contrast** to make it easier to read for users with visual impairments.
- Testing to ensure the website is **keyboard-navigable**, so that users who cannot use a mouse can still access all the content and functionality.
- [Using semantic HTML tags](https://www.youtube.com/watch?v=jywE0UljggE&ab_channel=JacksonBates), such as `<h1>`, `<ul>`, and `<button>` rather than `<div>`, `<div>` and `<div>`, to properly structure content and make it understandable to assistive technologies.
- **Defaulting to using HTML whenever possible** and **using WAI-ARIA modestly**.
- ARIA shims labels for screen readers into non-semantic HTML;
- ARIA versions of elements are generally not as robust, and improper use can either reduce the usability for screen reader users or introduce accessibility errors.
- **Checking your work.** Never assume something is fine; everybody makes mistakes. Run automated checkers (outlined below), and manually test new interactive components. When possible, invite users with disabilities to test your work.

## [](#s-technical-standards "Permalink to this headline")Technical Standards
- Public-facing code integrated into the Drupal CMS, the Drupal.org website or related community sites should strive to meet [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22). Our community strives to keep up with the [latest W3C recommendations](https://www.w3.org/WAI/standards-guidelines/#wcag2).
- Author-facing interfaces should strive to meet the [Authoring Tool Accessibility Guidelines (ATAG) 2.0](https://www.w3.org/TR/ATAG20/). ATAG 2.0 is broken into two parts:
- **Part A** involves accessibility of the authoring tool itself. Authors with disabilities should not face barriers when creating content.
- **Part B** addresses how that tool supports authors in creating accessible content. Content creation tools should build accessible pages by default through templated widgets, easy-to-use authoring interfaces, and input validation.
- The accessibility of the admin side, including the editing tools, should meet the same level of accessibility as the public facing site. Author defaults should also be built to support better accessibility.

## [](#s-implementation "Permalink to this headline")Implementation

## [](#s-screen-reader-hinting-with-wai-aria-or-aria "Permalink to this headline")Screen reader hinting with WAI-ARIA (or ARIA)
- WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) attributes add semantic meaning to both markup and markup patterns. This semantic meaning cannot be conveyed with HTML alone, e.g.:
- Indicating an accordion toggle is available but currently closed using `aria-expanded="false"`
- Using `aria-describedby="EXAMPLE-ID"` to associate a form field with its help text.
- Using `aria-current="page"` to indicate which navigation item is active.
- When the semantic meaning **can** be conveyed through HTML, we recommend avoiding using any ARIA attributes.
- To add ARIA attributes to elements in Drupal render arrays, use the #attributes property of the #type element in your form definitions. For example, if you have a form field that requires user input, you can add the aria-required attribute to the #attributes property like this:
- `$form['field_name'] = [
- '#type' => 'textfield',
- '#title' => t('Field Label'),
- '#attributes' => [    'aria-required' => 'true',  ],

## [](#s-dynamic-content "Permalink to this headline")Dynamic content
- When content on a page changes following user input, it is important to announce that change to screen reader users with aria-live. Key moments include:
- Alerts and error messages
- When an auto-complete field has provided a possible match
- When an AJAX filter changed the number of search results on the page
- To simplify the process, the Community has added the Drupal.announce() function to provide a consistent notification process. The `Drupal.announce()` function allows JavaScript functions to send a message to a live region on the page, which will be read by screen readers.
- To use the `Drupal.announce()` function, call it with the message that you want to announce as the argument. For example:
- `Drupal.announce( Drupal.t('Your form has been submitted successfully.') );`
- You can also pass translated strings & change the priority of messages using code like:
- `Drupal.announce( Drupal.t('This is important!'), 'assertive' );`
- When assertive is indicated, the screen reader will interrupt other aural text with the  message.

## [](#s-keyboard-navigation "Permalink to this headline")Keyboard Navigation
- Any feature that can be operated using a mouse must also work using a keyboard. Default HTML elements provide this functionality when used as intended. When implementing custom elements, be sure to test that a user can tab into and out of the element, click using keyboard or space bar, and use additional expected keys as outlined in the [ARIA Patterns guide](https://www.w3.org/WAI/ARIA/apg/).
- Certain widgets, such as popover dialogs, should capture and trap keyboard focus in the same manner that they overlay content for the mouse. Focus must then be released when the user clicks a “close” button or presses the Esc key. To assist with this process, Drupal Core includes a "tabbingManager" JavaScript class, which include methods to constrain and release focus as appropriate. You can invoke constrained tabbing with the `Drupal.tabbingManager` JavaScript feature:
- `var tabbingContext = Drupal.tabbingManager.constrain( $('.contextual-toolbar-tab, .contextual') );`
- A set of encoded elements is passed to using the  constrain method. Pressing the tabbing key will now only move between the tab-enabled elements.
- To remove the tabbing constraint, the release method must be called on the tabbing context object.
- `tabbingContext.release();`
- More information can be found with the [Drupal 8 release of the tabbing constraint feature](https://www.drupal.org/node/1973218#tabbing).

## [](#s-accessible-methods-for-hiding-content "Permalink to this headline")Accessible Methods for Hiding Content

## [](#s-making-content-invisible-for-sighted-users-only "Permalink to this headline")Making content invisible for sighted users only
- Drupal provides a CSS class, "visually-hidden," which can be used to hide content visually, but leave it available to screen readers. Common uses include providing alternative text for an icon provided as a background image, or to provide visually hidden headings to label navigation regions.
- Please be mindful that not all screen reader users are unable to see the content; some use it for “read along” functionality to assist with low vision or cognitive disabilities. If the visual and non-visual experiences are drastically different, visually hiding content may reduce the quality of the user experience by creating confusion.

## [](#s-making-content-invisible-until-someone-tabs-to-it "Permalink to this headline")Making content invisible, until someone tabs to it
- Use Drupal's "visually-hidden" CSS class together with the CSS class "focusable" on an element to ensure that when a keyboard user focuses it, it becomes visible. Sighted keyboard users typically use the skip links feature.

## [](#s-completely-hide-content-for-all-users "Permalink to this headline")Completely hide content for all users
- Drupal’s CSS class “hidden” was created based on best practices to hide content from both sighted users and from screen readers. This class could be used instead of the general CSS instruction “display: none;” on an element.
- More [specific instructions on hiding content](https://www.drupal.org/docs/accessibility/hide-content-properly) can be found in the documentation.

## [](#s-inline-form-errors "Permalink to this headline")Inline Form Errors
- Drupal's inline form errors module highlights errors next to the input field, rather than at the top of the page. Highlighting errors near the field makes  it easier for users to locate and correct their errors. This feature is available in Core, but it is not enabled by default. Developers should manually enable this module and test that their code works as planned.
- Testing form errors, while often overlooked, is nonetheless a crucial step in the development process, especially when coding for audiences with disabilities.  Make sure the error explains how to correct the input, e.g.:
- "Quantity must be greater than 0" rather than "Invalid quantity," or
- "Password must contain at least 8 letters" rather than "Password is too short"
- Also make sure the error is announced by screen readers if it is inserted as a link to the dynamic content above.
- See more information below about testing form accessibility.

## [](#s-related-form-elements "Permalink to this headline")Related Form Elements
- When form inputs are visually grouped,  use a <fieldset> with a <legend> element to make that grouping machine-readable. Grouping checkboxes with appropriate legend elements allows screen reader users the ability to know which box they are checking.
- Radios, checkboxes, Form API, and the advanced search all utilize fieldsets by default.

## [](#s-using-animation-responsibly "Permalink to this headline")Using animation responsibly
- Animation is cool. It can help people know where to focus. It can also make people physically ill. Before adding animation, please consider how it will improve the users experience before doing so. If animation is enabled, make sure that user preferences are respected. The following is a best practice for adding animations responsibly.
- For Drupal, we are recommending that people put any animation into a prefers-reduced-motion media query that is explicitly set for no-preference. Clearly isolating the animations builds on our accessibility defaults:
- `@media (prefers-reduced-motion: no-preference) {
- /* styles to apply if a user's device is not set to reduce motion */
- If you are building an module or theme that is heavy with animation, it may be more practical to call out which animations you can disable, but at the moment, code on Drupal.org generally has minimal animation.
- `@media (prefers-reduced-motion: reduce) {
- /* styles to apply if a user's device settings are set to reduced motion */
- For more complex instances, you may want to draw on related articles from [Smashing Magazine](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/), [CSS Tricks](https://css-tricks.com/revisiting-prefers-reduced-motion/), or [Web.dev](https://web.dev/articles/prefers-reduced-motion).
- Either way, a page with animation would default to a more static view if the user/browser has prefers-reduced-motion, there would be no animation. Otherwise there may be some animation if the user/browser hasn’t set their motion preferences. It is a best practice to be able to manually override the browser settings with toggle, but at the moment there is no existing module to do this in Drupal.

## [](#s-testing-your-work "Permalink to this headline")Testing Your Work

## [](#s-automated-tools "Permalink to this headline")Automated Tools
- Automated accessibility checkers are the best place to start an accessibility test.  These tools can only identify objectively invalid code, which catches 35-40% of issues in a typical site. For example, they can flag that an "alt" attribute is missing, but they can't judge whether an existing "alt" text actually describes its image.
- Some tools focus exclusively on actual barriers as per WCAG, while others also incorporate various best practices. Drupal's accessibility team leverages the latest stable version of [Deque's axe-core](https://github.com/dequelabs/axe-core), and aims to have "zero axe errors," or to be "axe clean." Axe-core is a widely-used, open source library for testing the accessibility of web content. It is embedded in free tools like [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/) and Microsoft’s [Accessibility Insights](https://accessibilityinsights.io/). Axe is also available from the command line or as a standalone browser plugin. Tools like [cypress-axe](https://www.npmjs.com/package/cypress-axe), [pa11y](https://pa11y.org/) and [nightwatch-axe](https://github.com/snugbear/nightwatch-axe) make it easier to integrate with CI/CD pipelines.
- When reporting findings to Drupal’s issue queue, we recommend using Microsoft’s Accessibility Insights to generate bug descriptions, because the "export" function provides details that allow developers to more easily replicate the problem. We encourage including testers with disabilities in all steps of the development process.

## [](#s-nightwatch-and-drupal-core "Permalink to this headline")Nightwatch and Drupal Core
- Axe testing is now included in the default Drupal Core test infrastructure. There is more information about this in the [JavaScript testing using Nightwatch](https://www.drupal.org/docs/develop/automated-testing/javascript-testing-using-nightwatch#s-writing-accessibility-tests-in-nightwatch) page. The list of pages tested should be reviewed as the interface evolves.

## [](#s-keyboard-access "Permalink to this headline")Keyboard Access
- Test that your module/theme is keyboard accessible:
- Is the focused element always visually highlighted?
- Can you tab to each link, button and control?
- Is the tab order logical, roughly matching the visual reading order?
- If an action triggers a modal dialog, is focus transferred into the dialog, and then returned to the triggering button when it closes?
- Does anything trigger an unexpected change of context for the cursor location? E.g., it is not unexpected to move the user's cursor when they have clicked a button to trigger an action; but it is unexpected when they have merely focused a field or input while browsing the page.
- Do complex controls (dropdowns, widgets) allow for the use of arrow and Esc key actions as expected for semantic elements or their ARIA patterns?
- Include testing with 200% magnification to ensure that the entire page can be accessed without using a mouse or other pointer device. Horizontally scrolling regions, such as overflowing tables, may need to be given a `tabindex="0"` attribute to [allow for keyboard scrolling](https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/#scrollable-overflow-containers).

## [](#s-testing-with-assistive-technology "Permalink to this headline")Testing With Assistive Technology
- For new patterns, it is useful to test with assistive technology like the NVDA Screen Reader (Windows / Firefox or Chrome)  or Apple’s VoiceOver (Mac / Safari). Make sure the element's role (what type of thing it is), name (its visible text label) and state (e.g., expanded/collapsed) are announced. Make sure the functionality is intuitive or explained.
- With simple and established patterns, it is best to emulate [HTML semantic elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) with simple, tab-able toggles as controls, and HTML landmark regions and headings for structure. For more complex patterns, the [W3C’s APG pattern library](https://www.w3.org/WAI/ARIA/apg/patterns/) should be used as a guide.
- For new, complex widgets, it is preferred to have the pattern tested by users with disabilities. Sighted testers with screen readers often use them differently from people who rely on them from day to day, and may miss expected keyboard shortcuts, or think something is intuitive (because they have seen it) that is not.

## [](#s-form-accessibility "Permalink to this headline")Form Accessibility
- When testing the accessibility of your forms, ensure that a non-visual user will be alerted (keyboard focused moved etc.) to the error. Do not rely on the user to navigate backwards / go searching for the error message. Also test for visual users by way of contrast and readability of the error.

## Related Content

## [GAAD Pledge 2022 - Extending Drupal's Accessibility](/association/blog/gaad-pledge-2022-extending-drupals-accessibility)
- The Drupal community is again celebrating [Global Accessibility Awareness Day](https://globalaccessibilityawarenessday.org/) (GAAD) but this time we are excited to also announce that the Drupal CMS has taken the GAAD pledge to formalize accessibility as a core value of our framework. Our commitment to accessibility isn’t new, but we are excited to join React Native and Ember JS, previous GAAD Pledgees, to be a public open source leader in pushing forward accessibility to the community.

## [How to do an accessibility review?](/docs/getting-started/accessibility/how-to-do-an-accessibility-review)
- This documentation provides a step by step process for reviewing the accessibility of your module theme or site.
- [accessibility](/taxonomy/term/185733)
- [best practices](/taxonomy/term/187515)

## Tags
- [accessibility](/taxonomy/term/185733)
- [best practices](/taxonomy/term/187515)
- [coding standards](/taxonomy/term/190104)

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/3328441/edit), and edit this page
- Log in, click [Discuss](/node/3328441/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%283328441%29%20Accessibility%20Coding%20Standards) with your suggestion