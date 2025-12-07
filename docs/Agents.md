{% raw %}
## Accessibility Coding Standards

## Accessibility Coding Standards
- The Drupal community strives to be inclusive to everyone, including people with disabilities. To that end, the Drupal community has developed the following accessibility coding standards to help make websites and other digital assets accessible to the widest possible audience.

## Key Goals
- Effective user experiences serve our entire community, including website visitors with disabilities. A positive experience can be achieved by focusing on three goals:
- 1.  Creating an inclusive strategy: Consider accessibility needs when architecting the site
- 2.  Incorporating Accessible Coding: Use best practices (as outlined below) to ensure that content can be navigated and read by all
- 3.  Following Normalized Testing: Building accessibility reviews into existing processes (and not as an add-on) will help to ensure code pushed out is accessible.

## General Best Practices
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

## Technical Standards
- Public-facing code integrated into the Drupal CMS, the Drupal.org website or related community sites should strive to meet [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22). Our community strives to keep up with the [latest W3C recommendations](https://www.w3.org/WAI/standards-guidelines/#wcag2).
- Author-facing interfaces should strive to meet the [Authoring Tool Accessibility Guidelines (ATAG) 2.0](https://www.w3.org/TR/ATAG20/). ATAG 2.0 is broken into two parts:
- **Part A** involves accessibility of the authoring tool itself. Authors with disabilities should not face barriers when creating content.
- **Part B** addresses how that tool supports authors in creating accessible content. Content creation tools should build accessible pages by default through templated widgets, easy-to-use authoring interfaces, and input validation.
- The accessibility of the admin side, including the editing tools, should meet the same level of accessibility as the public facing site. Author defaults should also be built to support better accessibility.

## Implementation

## Screen reader hinting with WAI-ARIA (or ARIA)
- WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) attributes add semantic meaning to both markup and markup patterns. This semantic meaning cannot be conveyed with HTML alone, e.g.:
- Indicating an accordion toggle is available but currently closed using `aria-expanded="false"`
- Using `aria-describedby="EXAMPLE-ID"` to associate a form field with its help text.
- Using `aria-current="page"` to indicate which navigation item is active.
- When the semantic meaning **can** be conveyed through HTML, we recommend avoiding using any ARIA attributes.
- To add ARIA attributes to elements in Drupal render arrays, use the #attributes property of the #type element in your form definitions. For example, if you have a form field that requires user input, you can add the aria-required attribute to the #attributes property like this:

## Dynamic content
- When content on a page changes following user input, it is important to announce that change to screen reader users with aria-live. Key moments include:
- Alerts and error messages
- When an auto-complete field has provided a possible match
- When an AJAX filter changed the number of search results on the page
- To simplify the process, the Community has added the Drupal.announce() function to provide a consistent notification process. The `Drupal.announce()` function allows JavaScript functions to send a message to a live region on the page, which will be read by screen readers.
- To use the `Drupal.announce()` function, call it with the message that you want to announce as the argument. For example:
- You can also pass translated strings & change the priority of messages using code like:
- When assertive is indicated, the screen reader will interrupt other aural text with the  message.

## Keyboard Navigation
- Any feature that can be operated using a mouse must also work using a keyboard. Default HTML elements provide this functionality when used as intended. When implementing custom elements, be sure to test that a user can tab into and out of the element, click using keyboard or space bar, and use additional expected keys as outlined in the [ARIA Patterns guide](https://www.w3.org/WAI/ARIA/apg/).
- Certain widgets, such as popover dialogs, should capture and trap keyboard focus in the same manner that they overlay content for the mouse. Focus must then be released when the user clicks a “close” button or presses the Esc key. To assist with this process, Drupal Core includes a "tabbingManager" JavaScript class, which include methods to constrain and release focus as appropriate. You can invoke constrained tabbing with the `Drupal.tabbingManager` JavaScript feature:
- A set of encoded elements is passed to using the  constrain method. Pressing the tabbing key will now only move between the tab-enabled elements.
- To remove the tabbing constraint, the release method must be called on the tabbing context object.
- More information can be found with the [Drupal 8 release of the tabbing constraint feature](https://www.drupal.org/node/1973218#tabbing).

## Accessible Methods for Hiding Content

## Making content invisible for sighted users only
- Drupal provides a CSS class, "visually-hidden," which can be used to hide content visually, but leave it available to screen readers. Common uses include providing alternative text for an icon provided as a background image, or to provide visually hidden headings to label navigation regions.
- Please be mindful that not all screen reader users are unable to see the content; some use it for “read along” functionality to assist with low vision or cognitive disabilities. If the visual and non-visual experiences are drastically different, visually hiding content may reduce the quality of the user experience by creating confusion.

## Making content invisible, until someone tabs to it
- Use Drupal's "visually-hidden" CSS class together with the CSS class "focusable" on an element to ensure that when a keyboard user focuses it, it becomes visible. Sighted keyboard users typically use the skip links feature.

## Completely hide content for all users
- Drupal’s CSS class “hidden” was created based on best practices to hide content from both sighted users and from screen readers. This class could be used instead of the general CSS instruction “display: none;” on an element.
- More [specific instructions on hiding content](https://www.drupal.org/docs/accessibility/hide-content-properly) can be found in the documentation.

## Inline Form Errors
- Drupal's inline form errors module highlights errors next to the input field, rather than at the top of the page. Highlighting errors near the field makes  it easier for users to locate and correct their errors. This feature is available in Core, but it is not enabled by default. Developers should manually enable this module and test that their code works as planned.
- Testing form errors, while often overlooked, is nonetheless a crucial step in the development process, especially when coding for audiences with disabilities.  Make sure the error explains how to correct the input, e.g.:
- "Quantity must be greater than 0" rather than "Invalid quantity," or
- "Password must contain at least 8 letters" rather than "Password is too short"
- Also make sure the error is announced by screen readers if it is inserted as a link to the dynamic content above.
- See more information below about testing form accessibility.

## Related Form Elements
- When form inputs are visually grouped,  use a <fieldset> with a <legend> element to make that grouping machine-readable. Grouping checkboxes with appropriate legend elements allows screen reader users the ability to know which box they are checking.
- Radios, checkboxes, Form API, and the advanced search all utilize fieldsets by default.

## Using animation responsibly
- Animation is cool. It can help people know where to focus. It can also make people physically ill. Before adding animation, please consider how it will improve the users experience before doing so. If animation is enabled, make sure that user preferences are respected. The following is a best practice for adding animations responsibly.
- For Drupal, we are recommending that people put any animation into a prefers-reduced-motion media query that is explicitly set for no-preference. Clearly isolating the animations builds on our accessibility defaults:
- `@media (prefers-reduced-motion: no-preference) {
- /* styles to apply if a user's device is not set to reduce motion */
- If you are building an module or theme that is heavy with animation, it may be more practical to call out which animations you can disable, but at the moment, code on Drupal.org generally has minimal animation.
- `@media (prefers-reduced-motion: reduce) {
- /* styles to apply if a user's device settings are set to reduced motion */
- For more complex instances, you may want to draw on related articles from [Smashing Magazine](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/), [CSS Tricks](https://css-tricks.com/revisiting-prefers-reduced-motion/), or [Web.dev](https://web.dev/articles/prefers-reduced-motion).
- Either way, a page with animation would default to a more static view if the user/browser has prefers-reduced-motion, there would be no animation. Otherwise there may be some animation if the user/browser hasn’t set their motion preferences. It is a best practice to be able to manually override the browser settings with toggle, but at the moment there is no existing module to do this in Drupal.

## Testing Your Work

## Automated Tools
- Automated accessibility checkers are the best place to start an accessibility test.  These tools can only identify objectively invalid code, which catches 35-40% of issues in a typical site. For example, they can flag that an "alt" attribute is missing, but they can't judge whether an existing "alt" text actually describes its image.
- Some tools focus exclusively on actual barriers as per WCAG, while others also incorporate various best practices. Drupal's accessibility team leverages the latest stable version of [Deque's axe-core](https://github.com/dequelabs/axe-core), and aims to have "zero axe errors," or to be "axe clean." Axe-core is a widely-used, open source library for testing the accessibility of web content. It is embedded in free tools like [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/) and Microsoft’s [Accessibility Insights](https://accessibilityinsights.io/). Axe is also available from the command line or as a standalone browser plugin. Tools like [cypress-axe](https://www.npmjs.com/package/cypress-axe), [pa11y](https://pa11y.org/) and [nightwatch-axe](https://github.com/snugbear/nightwatch-axe) make it easier to integrate with CI/CD pipelines.
- When reporting findings to Drupal’s issue queue, we recommend using Microsoft’s Accessibility Insights to generate bug descriptions, because the "export" function provides details that allow developers to more easily replicate the problem. We encourage including testers with disabilities in all steps of the development process.

## Nightwatch and Drupal Core
- Axe testing is now included in the default Drupal Core test infrastructure. There is more information about this in the [JavaScript testing using Nightwatch](https://www.drupal.org/docs/develop/automated-testing/javascript-testing-using-nightwatch#s-writing-accessibility-tests-in-nightwatch) page. The list of pages tested should be reviewed as the interface evolves.

## Keyboard Access
- Test that your module/theme is keyboard accessible:
- Is the focused element always visually highlighted?
- Can you tab to each link, button and control?
- Is the tab order logical, roughly matching the visual reading order?
- If an action triggers a modal dialog, is focus transferred into the dialog, and then returned to the triggering button when it closes?
- Does anything trigger an unexpected change of context for the cursor location? E.g., it is not unexpected to move the user's cursor when they have clicked a button to trigger an action; but it is unexpected when they have merely focused a field or input while browsing the page.
- Do complex controls (dropdowns, widgets) allow for the use of arrow and Esc key actions as expected for semantic elements or their ARIA patterns?
- Include testing with 200% magnification to ensure that the entire page can be accessed without using a mouse or other pointer device. Horizontally scrolling regions, such as overflowing tables, may need to be given a `tabindex="0"` attribute to [allow for keyboard scrolling](https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/#scrollable-overflow-containers).

## Testing With Assistive Technology
- For new patterns, it is useful to test with assistive technology like the NVDA Screen Reader (Windows / Firefox or Chrome)  or Apple’s VoiceOver (Mac / Safari). Make sure the element's role (what type of thing it is), name (its visible text label) and state (e.g., expanded/collapsed) are announced. Make sure the functionality is intuitive or explained.
- With simple and established patterns, it is best to emulate [HTML semantic elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) with simple, tab-able toggles as controls, and HTML landmark regions and headings for structure. For more complex patterns, the [W3C’s APG pattern library](https://www.w3.org/WAI/ARIA/apg/patterns/) should be used as a guide.
- For new, complex widgets, it is preferred to have the pattern tested by users with disabilities. Sighted testers with screen readers often use them differently from people who rely on them from day to day, and may miss expected keyboard shortcuts, or think something is intuitive (because they have seen it) that is not.

## Form Accessibility
- When testing the accessibility of your forms, ensure that a non-visual user will be alerted (keyboard focused moved etc.) to the error. Do not rely on the user to navigate backwards / go searching for the error message. Also test for visual users by way of contrast and readability of the error.

## Related Content
- The Drupal community is again celebrating [Global Accessibility Awareness Day](https://globalaccessibilityawarenessday.org/) (GAAD) but this time we are excited to also announce that the Drupal CMS has taken the GAAD pledge to formalize accessibility as a core value of our framework. Our commitment to accessibility isn’t new, but we are excited to join React Native and Ember JS, previous GAAD Pledgees, to be a public open source leader in pushing forward accessibility to the community.
- This documentation provides a step by step process for reviewing the accessibility of your module theme or site.
- [accessibility](/taxonomy/term/185733)
- [best practices](/taxonomy/term/187515)

- [accessibility](/taxonomy/term/185733)
- [best practices](/taxonomy/term/187515)
- [coding standards](/taxonomy/term/190104)

## API documentation and comment standards

## API documentation and comment standards
- This page covers:
- How to write documentation for PHP code so that the API module can successfully parse it and display it on [http://api.drupal.org](http://api.drupal.org) (and other similar sites).
- The purpose of the Drupal project's standards for API documentation and comments in PHP code is to ensure that the API module can parse/display the documentation, programmers looking at the PHP files can read/understand the documentation, and integrated developer environments (IDEs) can work successfully with the code and documentation.
- A reference to the tags used in this documentation.

## Notes and standards

## General considerations for API module parsing
- The API module parses documentation and code in PHP files, and it expects documentation to be in a format similar to other code/documentation parsing systems such as PHPDoc, JavaDoc, etc. It was originally based on [Doxygen](http://www.stack.nl/~dimitri/doxygen/manual/index.html), but it has evolved into something that has its own set of tags and a lot of Drupal-specific functionality.
- The API module parses documentation that is in special documentation blocks (known as "docblocks" in the rest of this document).
- Syntax example:
- General notes on the API module and the documentation it will parse:
- The API module treats files with the following extensions as PHP: .php, .module, .inc, .install, .engine., .theme, .profile, and .test.
- When parsing a PHP file, the API module parses both documentation and PHP code. PHP files with syntax errors could cause problems.
- The special documentation tags described in this document are only recognized within special PHP comment blocks that start with `/**`. These are known in this document as *docblocks*.
- In-code comment lines starting with `//` and comment blocks starting with `/*` are not recognized as docblocks.
- Docblocks normally have `*` at the beginning of each line, and the API module strips these out when formatting the documentation (see example above).
- To make a paragraph break in a docblock, leave a blank line (see example above). Some tags also trigger paragraph breaks: `@param`, `@return`, `@see`, `@var`. The API module does not support blank lines within a single tag's documentation (for example, within a single parameter's documentation with `@param`.
- The API module itself does not care about line length (Drupal documentation standards do, however, see below).
- The first paragraph of a docblock is known as the *summary*.
- To document a function, class, etc., the docblock must appear directly before the item being documented, with no blank line in between (see example above). There are also a few "free-standing" docblocks (for documenting files and making topics -- see tag reference for details).
- The API module automatically turns the names of functions, classes, etc. that it recognizes in documentation text into links to the documentation of those items.

## General documentation
- In the individual tag references, there are notes about Drupal standards that pertain to that particular tag. This section contains standards related to all API docblocks.
- Syntax example:
- Drupal standards notes:
- All documentation and comments should form proper sentences, use proper grammar and punctuation, and generally follow the same style guidelines as Drupal.org content: [http://drupal.org/style-guide/content](http://drupal.org/style-guide/content)
- Put a space between the comment character (the \* or the //) and the first letter of the sentence.
- Document the current version of code, not differences from past code or future plans (except for [@todo](#todo) and [@deprecated](#deprecated) tags).
- Sentences should be separated by single spaces.
- Comments and variable names should be in English, and use US English spelling (e.g., "color" not "colour").
- To refer to a module or theme, use wording and capitalization like "the Foo Bar module" (in other words, the module/theme name is a proper noun, not including the word "module" or "theme" in the proper noun).
- All caps are used in comments only when referencing constants, for example TRUE.
- Docblocks must have `*` at the beginning of each line (see sample above).
- Lines containing comments (including docblocks) must wrap as close to 80 characters as possible without going over, with a few exceptions (noted in the Tag Reference below).
- Lines after tags such as `@param`, `@return`, etc. that contain documentation connected with that tag are indented two spaces. See syntax examples for each tag.
- Every function, constant, class, interface, class member (function, property, constant), and file must be documented, even private class members.
- All summaries (first lines of docblocks) must be under 80 characters, start with a capital letter, and end with a period (.). They must provide a brief description of what a function does, what a class does, what a file contains, etc.
- When implementing a hook, use a short summary of the form "Implements hook\_menu().". Omit the parameter and return value documentation in this case.

## Classes and namespaces
- The following standards apply to documenting classes and using namespaces in Drupal API documentation:
- All classes and all of their methods (including private methods but excluding constructors) must be documented.
- If a class has a method that is overriding a method from a parent class/interface, and the documentation is identical, use this short form for the documentation:
- Use a third person verb to start the summary of a class, interface, or method. For example: "Represents a ..." or "Provides...".
- Document exceptions with [@throws](#throws).
- If you use a namespace on a class anywhere in documentation, always make sure it is a fully-qualified namespace (beginning with a backslash).
- Immediately after an @tag (@param, @return, @var, etc.), class and interface names must always include the fully-qualified namespace.
- Other namespace-related standards for Drupal are under discussion and have not yet been adopted permanently.

## Data types in documentation
- Drupal standards notes:
- Use interface names if possible, or the most general possible class, in place of a specific class.
- Always prefix types with the fully-qualified namespace for classes and interfaces (beginning with a backslash). If the class/interface is in the global namespace, prefix by a backslash.
- You may omit the description if using `@return $this` or `@return static`.
- Spell the following types accordingly
- array (NOT "Array").
- bool (NOT "boolean" or "Boolean"). If only TRUE or only FALSE is a possible value, rather than either one being possible, use true or false instead of bool.
- true (NOT "TRUE", see bool)
- false (NOT "FALSE", see bool)
- int (NOT "integer")
- null (NOT "NULL")
- object (NOT "stdClass")

## Functions
- Documenting functions is somewhat more complex than documenting other types of PHP language constructs, so they have their own coding standards:
- Each parameter of a function must be documented with a `@param` tag (see exceptions below).
- If a function has a return value, it must be documented with a `@return` tag (see exceptions below).
- If there is no return value for a function, there must not be a `@return` tag.
- For **most functions** (see exceptions below), summary lines must start with a third person singular present tense verb, and they must explain what the function does. Example: "Calculates the maximum weight for a list."
- Functions that are easily described in one line may be documented by providing the function summary line only (omitting all parameters and return value).
- In addition, there are standards for documenting specific special types of functions:

## Hook definition
- The summary starts with an imperative verb that tells why a module would want to implement the hook. Example: "Respond to node deletion." Hook definitions are placed in a `.api.php` file, which is not directly loaded by Drupal. Each is a fake function whose name starts with "hook", and whose function body is a sample implementation. Parameters and return value that the implementer must use need to be documented.

## Hook implementation
- Documentation uses a short format:
- If appropriate, you can add additional details pertinent to the particular hook implementation in a separate paragraph after the summary. Do not document parameters and return value though -- these are documented on the hook definition referenced in the summary line. And if the hook name has a variable portion:

## Update functions (implementations of hook\_update\_N())
- These hooks use a different syntax because the documentation summary (the first line) is displayed to users running update.php to tell them which updates need to run. So they are documented like in the following comment.
- Note that the first line should start with an imperative verb.
- Many PHP functions, such as uasort() etc., require the caller to pass in a [callback function](http://us.php.net/manual/en/language.pseudo-types.php#language.types.callback). When documenting a function that is intended to be used as a callback in this way, start with a standard function summary line. After the summary, the next paragraph should indicate what function the callback is passed to, and which Drupal function makes use of it (which could be a list of functions). Example:

## Callback definitions and implementations
- Like standard PHP functions, sometimes the Drupal API also needs callbacks to operate. In this context, a "callback" is a function that a module needs to define in conjunction with a hook implementation, batch set, plugins, or other Drupal functionality.
- In order to document the parameters and return value of callbacks, make a callback function definition, with a documentation block, in a \*.api.php file, similar to hook definition documentation (i.e., they are "dummy" functions in files that are not actually loaded, but they can be referenced in other documentation). Then, in the hook or other function that requires the implementer/caller to return a callback function name, refer to this callback definition function by name.
- Callback definition function names in the \*.api.php file should start with "callback\_", followed by a descriptive name.
- Callback definition function bodies should be an example implementation (like hook definition function bodies).
- The one-line documentation summary should describe what the callback does. The summary starts with an imperative verb that tells why a module would want to define this callback.
- The next line should start with "Callback for \_\_\_:" (replace \_\_\_ with the name of the hook, function, or other component that uses the callback).
- They should be added to the "@ingroup callbacks" topic.
- The hook or other function that uses the callback should refer to the callback definition function by name in its documentation.
- An actual callback function in module code should have as its one-line documentation summary "Implements callback\_NAME().", so that its documentation links to the callback documentation.
- Example 2 (entity URI callback, D7 only):

## Form-generating functions
- The form constructor, validation handler(s), and submission handler(s) form a set and are documented as in this sample:
- Omit `@param` and `@return` documentation for the standard parameters and return value (such as `$form` and `$form_state`.
- Document parameters specific to this form constructor.

## hook\_menu() page router callback functions
- Note: This standard was adopted for Drupal version 8.x, which is a bit ironic since Drupal 8.x subsequently did away with hook\_menu() itself. The standard still applies to the callbacks used by the router, although they are not technically hook\_menu() callbacks any more.
- Sample syntax:
- Drupal standards notes:
- In the first line, declare what type of callback it is (Page callback, Access callback, etc.), and give a short description of what it does (like you would for any function). Total line length: 80 characters, ending in "."
- At the end, include an @see line that points to the hook\_menu() implementation where this callback is registered. If multiple hook implementations use the callback, include one @see line for each.
- Form constructors that are used as page callbacks should have a first line like "Page callback: Constructs a form for ...".

## Render API callback functions
- The Render API uses various callback functions, which you can assign to a render element when setting up a render array (or a form). Generally, they are documented without parameters or return value documentation, since the parameters and return value are standard for that type of callback. The summary line should be "Render API callback:" followed by a description of what the function does, conforming to the usual function summary standards. In addition, somewhere in the function, there should be a paragraph saying where the callback is assigned and what particular Render API callback it is being used for.
- Syntax example:

## Themeable functions
- Themeable functions (`theme_foo()`, for example -- functions meant to be called via `theme()` and overrideable by the theme) are documented using these standards:
- The first line should be "Returns HTML for a ..."
- All components of the `$variables` array (or other arguments) need to be documented.
- They should have `@ingroup themeable` in their documentation.
- Syntax example:

## Template preprocess functions
- Template preprocess functions (template\_preprocess\_container(), for example) are documented using these standards:
- The first line should be "Prepares variables for \[description of foo\] templates."
- The second line should be "Default template: foo-bar.html.twig" where foo-bar.html.twig is the filename of the default template file.
- All components of the $variables array need to be documented.
- Syntax example:

## In-line code comments
- Non-header or in-line comments are strongly encouraged. A general rule of thumb is that if you look at a section of code and think "Wow, I don't want to try and describe that", you need to comment it before you forget how it works. Comments should be on a separate line immediately before the code line or block they reference. For example:
- If each line of a list needs a separate comment, the comments may be given on the same line and may be formatted to a uniform indent for readability.
- C style comments (`/* */`) and standard C++ comments (`//`) are both fine, though the former is discouraged within functions (even for multiple lines, repeat the `//` single-line comment). Use of Perl/shell style comments (`#`) is discouraged.
- `@todo` statements in inline comments follow the same rules as [using the @todo tag in docblocks](#todo). An example:
- The `@var` tag can document variables in addition to class properties. This can be used when you know more about the type of a variable than is self-evident from the code, such as when you load a specific entity type, or a specific service. In this case you can typehint inline, which improves Developer Experience and Tools Experience. For example:
- When documenting variables with the `@var` tag note that you should use the special `/** */` delimiters with a double opening asterisk. Always use the fully qualified namespace of the class or interface, and include the name of the variable at the end.

## Lists in documentation
- The API module creates nested bullet lists from lines starting with `-` in docblocks.
- Syntax example:
- Syntax notes:
- A hyphen as the first character on the line (except the `*`) indicates a list item.
- All list items at the same nesting level must be indented the same amount.
- There must not be blank lines between items in the same list.
- If a list has "keys" (for instance, a list describing an associative array, or the options for a parameter), use a colon between the key and its description. The API module will format keys with a `strong` tag.
- Drupal standards notes:
- The line before a list or before a new level of nesting must end with a colon (:).
- The hyphen aligns with the start of the text containing that level of list, which means that each level of nesting indents by two spaces.
- Array keys are not put in quotes; keys describing literal strings (such as parameter values) should be put in quotes.
- Indicate optional list items with `(optional)` and default list items with `(default)`. With keys, these words are placed just after the colon.

## Theme template files
- The default implementations for PHP theme template files (\*.tpl.php) start with a documentation block that follows the generic standards for [@file](#file) blocks.
- Note: There is a separate page on [documenting Twig templates](http://drupal.org/node/1823416).
- Syntax example:
- Drupal standards notes:
- The variables that are set up in the template\_preprocess function should be documented.
- Do not include `@ingroup themeable` in overridden template files in a theme -- only in the base template (supplied by the module that defined the theme hook). Otherwise, theme-specific versions are documented the same way.
- If any variable contains data that has not been sanitized, this should be noted.
- Always include an @see reference to the preprocess function.

## Order of documentation sections
- Docblocks for functions, classes, and other PHP items should be written in the following order to comply with Drupal coding standards. Omit sections that don't apply (for instance, `@param` only applies to functions). Separate different-type sections by a blank line (for instance, all the `@param` documentation goes together, with a blank line before the first parameter and a blank line after the last parameter before the `@return` section starts). Here's the order:
- One-line summary, ending in a period (.).
- Additional paragraph(s) of explanation.
- [@var](#var)
- [@param](#param)
- [@return](#return)
- [@throws](#throws)
- [@ingroup](#defgroup)
- [@deprecated](#deprecated)
- [@see](#see)
- [@todo](#todo)
- [@Plugin](#Plugin) and other annotations
- PHPUnit and Simpletest classes should generally follow the Class standards of the previous section, but there are some differences and specifics to be aware of, such as the @group, @covers, and @coversDefaultClass tags. See:
- [https://www.drupal.org/node/2500059](https://www.drupal.org/node/2500059) (Simpletest)
- [https://www.drupal.org/node/2116043](https://www.drupal.org/node/2116043) (PHPUnit)

## Tag reference

## @code: Code samples
- The `@code ... @endcode` tag is used to embed code samples in docblock text. The API module will attempt to format the contents as PHP code when displaying the documentation.
- Syntax example:
- Drupal standards: Put the `@code` and `@endcode` tags on their own lines. Do not use a blank line between the text that explains the code sample and the code sample itself.

## @defgroup, @addtogroup, @ingroup, @{, @}: Groups and topics
- The `@defgroup` tag is used to define a "group" (in Doxygen terms), which the API module displays as a Topic page. A `@defgroup` tag needs to be in its own docblock (not inside a file description docblock, function docblock, class docblock, etc.). A group defined by `@defgroup` has an identifier (starting with a letter, and composed of numbers, letters, underscores, periods, and hyphens), a title, a summary, and documentation. In addition, individual "items" (files, functions, classes, and other things that are documented with docblocks in the API module) can be designated as being "in" the group. The API module makes a page for each group/topic, and on the page, it lists all of the items that are part of the group.
- The examples below show how to define a group using the `@defgroup` tag, and three different ways to define the members of the group, using tags `@{`, `@}`, `@addtogroup`, and `@ingroup`.
- Syntax example 1 for defining a group:
- Syntax example 2 for defining a group and adding members to it at the same time:
- Syntax example for adding several items as members of an existing group:
- Syntax example for adding one item as a member of a group:
- Syntax notes:
- Only define each group identifier once with a `@defgroup` tag. To add more functions to the group that are in a separate file or location, use either `@addtogroup` or `@ingroup`.
- Every docblock within `@{ ... @}` is included in the group. This means that if a class is within these tags, not only the class itself, but also its members will be included in the group. You probably don't want that -- so use `@ingroup` to add a class to a group (putting the tag in the class's docblock).
- `@defgroup` needs to be its own docblock (do not include it in a docblock for a function, file description, class, etc.).
- Drupal standards notes:
- Use groups sparingly. Each group makes a topic page. Only use groups if there is some reference information you need to impart, related to several different functions or classes or constants. If information pertains to only one function, for instance, just put the information in that one function's docblock.

## @deprecated: Indicating deprecated functionality
- The `@deprecated` tag is placed in a documentation block to indicate that a function, method, or class has been deprecated and should not be used, but has not yet been removed.
- Syntax notes
- %deprecation-version%
- The **version string** representing when the change occurred.
- For Drupal core and contrib projects that use semantic versioning, the version string is:
- `project:major.minor.patch` or
- `project:major.minor.patch-tag[n]`
- For contrib projects that use legacy core-compatibility-prefixed versioning, the version string is:
- `project:8.x-minor.patch` or
- `project:8.x-minor.patch-tag[n]`
- %removal-version%
- The **version string** representing when the deprecated code path will be removed.
- %extra-info%
- This is free text. Useful things to include are hints on how to correct the code, what replacement to use, etc.
- The link to the change record on drupal.org (for core deprecations) or the relevant issue.

## @Event: Documenting events
- The `@Event` tag is used to indicate that the thing being documented is the name of an event triggered by the event dispatcher. The documentation should include information about when/why the event is triggered and what type of object event subscribers will receive.
- Event documentation should use [@see](#see) to indicate the class + method where the event is triggered, as well as an example implementation of subscribing to the event in question.

## @file: Documenting files
- The `@file` tag is placed in a docblock to indicate it is documentation for the file as a whole. The API module will only recognize one file docblock per file (the first one; there shouldn't be more than one).
- Syntax example:
- Syntax notes:
- As in other docblocks, the first paragraph in the file docblock is used as a summary, and the rest is additional documentation. The docblock must be followed by a blank line, and must not contain `@defgroup` or `@mainpage` tags.
- Drupal standards: If a file docblock summary begins with a verb, it should be in third person singular present tense, such as "Handles file uploads." The summary should be one line of up to 80 characters ending in ".".
- Drupal sample for module .install files:
- The @file doc block MUST be present for PHP files, with the following exceptions:
- Files that contain a namespaced class/interface/trait, whose file name is the class name with a .php extension, and whose file path is closely related to the namespace (under PSR-4 or a similar standard), SHOULD NOT have a @file documentation block.
- The core \\Drupal class's Drupal.php file (which does not have a namespace).

## {@inheritdoc}: Documentation inheritance

## Method
- In a class, if you are overriding or implementing a method from a base class or interface, and the documentation should be exactly the same as the base class/interface method, use the following docblock syntax:

## Property
- Same way as the method, the overriding property's documentation can be inherited as well:
- Note the {} around the @inheritdoc tag. This must be the only line in the docblock.

## @link: HTML links
- The `@link ... @endlink` tag is used to make HTML links in docblock text.
- Syntax example:
- Syntax notes:
- `@link` is followed by a space; followed by the name of a function, name of a class, file name, [group identifier](#defgroup), or URL; followed by a space; followed by the link text; followed by `@endlink`. The entire `@link ... @endlink` must be on the same line, and must be preceded and followed by whitespace or newlines. It is not necessary to use `@link ... @endlink` to make a link to a function, class, or file if the link text would be the same as the function name, class name, or file name (those will turn into links in text without using `@link ... @endlink`.
- Drupal standards: The `@link ... @endlink` line is allowed to exceed 80 characters. If it will fit on the preceding or following line along with additional text in the same paragraph that precedes or follows it without exceeding 80 characters, it can be placed on a line with other text. However, if putting it with other text would make the line exceed 80 characters, place it on its own line.

## @mainpage: Main documentation for a branch
- The `@mainpage` tag is used to define the main documentation page for a "branch" (a set of code, such as all the code for Drupal 7.x, or all the code for the "foo" module) in the API module. This tag must appear in its own docblock. If a branch contains a file with a mainpage docblock, this documentation is used as the landing page for the branch in the API module. If there is no mainpage docblock, the API module constructs a default landing page.
- Syntax example:

## @param: Function parameters
- The `@param` tag is used to document a parameter within a function docblock.
- Syntax examples:
- Syntax notes:
- The `@param` tag is followed by an optional [data type indicator](#types), then the variable name of the parameter, and then a newline. The following paragraph is considered by the API module to be documentation. The API module formats the information on the same line as the `@param` using a `strong` HTML tag.
- Drupal standards: The documentation is indented two spaces (see example). Data types are required to be included as of Drupal 8.x. Optional parameters are indicated by (optional); include information about the default value only if it is not obvious from the function signature.

## @Annotation, @Plugin, etc.: Plugin discovery annotations
- `@Annotation` goes at the very end of a class documentation block to indicate to Doctrine that the class is a Plugin Annotation Type class. The API module displays these classes as if they had `@ingroup annotation` in their documentation blocks (you do not need to add the `@ingroup` if you have `@Annotation` in the documentation block).
- To annotate a plugin class of a particular type, add a section at the very end of the class documentation block similar to this:
- Drupal standards notes:
- It is better to use a specific plugin type, like @EntityType, rather than the generic @Plugin
- Each key of a plugin annotation should be on its own line.
- Annotations are functional code, so individual lines should not be wrapped.
- Same as for [arrays](https://www.drupal.org/docs/develop/standards/php/php-coding-standards#array), you MUST include a comma after the last element in the definition (and in the definitions of any nested annotations).
- For more information on how annotations are used for plugins, see the [plugin documentation](http://drupal.org/node/1637614).

## @ref: References to sections
- Note: These tags are available in API module versions 7.x-1.1 and later.
- The `@ref` tag is used to make in-page links to sections and sub-sections defined with the [`@section/@subsection`](#section) tags.
- Syntax example:
- Syntax note: To make an in-page link to a section or sub-section, insert the `@ref` tag in the text, followed by one space (NOT a newline), followed by the section or sub-section identifier. The link text will be the title defined when you declare the section or sub-section ("Section 1" in this example).

## @return: Function return values
- The `@return` tag is used to document the return value within a function docblock.
- Syntax example:
- Syntax notes:
- The `@return` tag is followed by an optional [data type indicator](#types), and then a newline. The following paragraph is considered by the API module to be documentation.
- Drupal standards: The documentation is indented two spaces (see example). Data types are required to be included as of Drupal 8.x. Functions without return values must not have @return documentation.

## @section, @subsection: Documentation sections
- Note: These tags are available in API module versions 7.x-1.1 and later.
- The `@section` tag is used to make section headings within a docblock, and the `@subsection` tag is used to make sub-sections. The API module renders sections as `h3` HTML tags, and sub-sections as `h4` tags. You can also use the [@ref tag to make in-page links to sections and sub-sections](#ref).
- Syntax example:
- Syntax notes:
- Each `@section` and `@sub-section` declaration must be on its own line.
- A declaration consists of the `@section/@subsection` tag, followed by one space, then an identifier (letters, numbers, underscores, and hyphens only), then one space, and then the section/sub-section title.

## @see: See Also references
- The `@see` tag is used in a docblock to indicate a "See Also" reference. The API module collects these and formats them into a single See Also section on the documentation page.
- Syntax example:
- Syntax notes:
- Follow the `@see` tag by a space, and then the item or URL you want to reference. An item can be a function name, class name, method name (with the class), constant name, file name, [group identifier](#defgroup), or a URL. The API module will format each item it recognizes as a link, and all of the text it finds between `@see` and the next documentation tag or blank line in its own paragraph.
- Drupal standards: Each `@see` reference is on its own line, with no additional text beyond the item being referenced. To provide more explanation, just use a regular documentation paragraph.

## @throws: Thrown exceptions
- The `@throws` tag is used to document that a function or method throws an exception, and if a function/method has this tag, the API module will create a section listing the exceptions thrown on the function/method page.
- Syntax example:
- Drupal standards notes: The name of an exception class should appear on the same line as the `@throws` tag. Put explanations in starting on the next line, but only if they tell you something useful that is not conveyed by the name of the class. If you include an explanation, like other documentation use complete sentences that stand alone, without assuming that "Throws \[exception name\]" is part of the sentence automatically, since Throws will be a heading when it's displayed on api.drupal.org.

## @todo: To Do notes
- The `@todo` tag is used to place To Do notes in documentation. At this time, the API module does not do anything special with these notes, so they are simply displayed as paragraphs of text with the `@todo` tag left in.
- Usually, a corresponding Drupal.org issue should be created for the @todo and referenced in it.
- Syntax example:

## @var: Class property data types
- The `@var` tag is used to document the data type of a class property.
- Syntax example:
- > `class FooBar {
- >    * The entity type manager.
- >    * @var \Drupal\Core\Entity\EntityTypeManagerInterface
- >   protected $entityTypeManager;
- > Syntax notes: The @var tag is followed by a space and then a [data type specification](https://www.drupal.org/docs/develop/standards/php/api-documentation-and-comment-standards#types).
- > `class FooBar {
- >   use \Drupal\Core\Entity\EntityTypeManagerInterface;
- >    * The entity type manager.
- >   protected EntityTypeManagerInterface $entityTypeManager;
- > Typed class properties may omit the @var declaration. It is recommended to use typed properties whenever possible.

- [coding standards](/taxonomy/term/190104)

## API Documentation Examples

## API Documentation Examples
- This page is ia collection of the complete API documentation examples, which you can use as starting points to writing documentation that conforms to the Drupal project's [API documentation standards](/node/1354).

## Files
- [General standards for file documentation](http://drupal.org/coding-standards/docs#file)

## Module file (\*.module)

## Install file (\*.install)

## Include file (\*.inc)
- [Special standards for tpl.php files](http://drupal.org/coding-standards/docs#templates)

## File containing a single class
- [Object-oriented coding standards](https://www.drupal.org/docs/develop/coding-standards/object-oriented-code).
- [Special standards for tpl.php files](http://drupal.org/coding-standards/docs#templates) Note that there is no @ingroup themeable in the override!

## Functions
- [Documentation standards for functions](http://drupal.org/coding-standards/docs#functions)

## Generic functions

## Callback functions
- [Standards for documenting callback functions](http://drupal.org/coding-standards/docs#callbacks) -- these are standard-format callback functions that are passed to other functions as arguments.
- Callback used in only one API function:
- Callback used in a few API functions:
- Callback used in many functions, where some explanation is needed for the otherwise standard function arguments:
- \[NOTE: NEEDS STANDARDS UPDATE - data types on @param/@return!\]

## Hook definition functions
- [Standards for documenting hook definitions](http://drupal.org/coding-standards/docs#hooks)
- \[NOTE: NEEDS STANDARDS UPDATE - data types on @param/@return, and function body needs to be provided, as it's part of the documentation.\]

## hook implementation
- [Standards for documenting hook implementations](http://drupal.org/coding-standards/docs#hookimpl)

## hook\_update\_N implementation (update function)
- [Drupal API documentation standards for functions](https://drupal.org/coding-standards/docs#functions)

## form-generating function (including validate/submit)
- [Form-generating functions](https://drupal.org/coding-standards/docs#forms)
- \[needs an example\]

## hook\_menu() callbacks
- \[needs an example\]
- [Standards for documenting hook\_menu() callbacks](http://drupal.org/coding-standards/docs#menu-callback)
- \[NEEDS STANDARDS UPDATE - data type on parameter, and it needs @return as well!!\]

## render API callback
- [Render API callback functions](https://drupal.org/coding-standards/docs#render)
- (needs an example)

## theme\_foo() themeable function
- [Standards for documenting themeable functions](http://drupal.org/coding-standards/docs#themeable)

## Classes
- [Standards for documenting classes and interfaces](http://drupal.org/coding-standards/docs#classes)

## Class with a namespace

## Class without a namespace
- (needs example)

## Interface
- \[NEEDS STANDARDS UPDATE - first line does not conform to standards\]

## Member function
- (needs example)

## Member function that overrides base class method
- \[NEEDS STANDARDS UPDATE: first line needs class name and probably namespace\]

## Member function that implements interface method

## Member constant
- (needs example)

## Member variable
- (needs example)

## Plugin annotation
- [Standards for plugin annotation](http://drupal.org/coding-standards/docs#Plugin)
- (needs example)

## Miscellaneous examples

## Constant
- (needs link to standards)
- \[NEEDS GRAMMAR UPDATE - this example is not well written. Maybe pick a different constant? Also, where did this come from? We're looking for a define() here I think, not a class constant.\]

## Global variable
- (needs example, and you might note that these are documented in separate api.php files)

## Bullet lists
- [Standards for using lists](http://drupal.org/coding-standards/docs#lists)
- (needs example)

## Sections, sub-sections, and in-page references
- [Standards for using sections](http://drupal.org/coding-standards/docs#section)
- (needs example)

## Code samples (@code)
- [Standards for using @code](http://drupal.org/coding-standards/docs#code)

## @link
- [Standards for using @link](http://drupal.org/coding-standards/docs#link)

## @see
- [Standards for using @see](http://drupal.org/coding-standards/docs#see)

## Defining a topic/group
- [Standards for using @defgroup, @ingroup, and @addtogroup](http://drupal.org/coding-standards/docs#defgroup)
- (needs example)

## @ingroup and @addtogroup
- [Standards for using @defgroup, @ingroup, and @addtogroup](http://drupal.org/coding-standards/docs#defgroup)
- (needs example for addtogroup)

- [coding standards](/taxonomy/term/190104)

## Avoid "SELECT * FROM ..."

## Avoid "SELECT \* FROM ..."
- Using `SELECT * FROM {node}` queries in versions prior to Drupal 7 can introduce a potential security issue by causing Drupal's Node Access system to be bypassed. In such cases, private content may be shown to unprivileged users. Therefore, queries that generate lists of nodes should avoid SELECT \* syntax in all cases. Instead use `SELECT nid, ...`.
- It is recommended to avoid SELECT \* queries in general. They are less self-documenting than explicitly listing the fields to be retrieved and also very slightly slower. Generally, SELECT \* should be used in only two cases:
- 1.  The fields in the table being selected from are dynamic and not known definitively at development time. (This is extremely rare and generally bad practice anyway.)
- 2.  The list of fields to select is prohibitively long.
- [development\] Is "SELECT \* FROM ..." ok?](http://lists.drupal.org/pipermail/development/2009-February/thread.html#31953) : discussion on the development list.
- [SELECT \* IS EVIL](//www.parseerror.com/sql/select*isevil.html): one developer's perspective.

## Composer package naming conventions

## Composer package naming conventions
- With Drupal adopting [Composer](https://getcomposer.org/) as dependency manager, the community has to follow a naming convention for composer package names to avoid conflicts. How you define your own package with a composer.json can be found in [Add a composer.json file to define your module as a PHP package](/node/2514612). In general, Composer [only](https://getcomposer.org/doc/01-basic-usage.md#package-names) allows for package names like so: `vendor/project`. You cannot use more than two levels. This leads to the following conventions.

## Drupal Projects
- Composer uses its own type of registers to track millions of different packages; usually, these are referred to as "Composer repositories" (to avoid any confusion with "Git repositories," which are slightly different things). The factory default Composer repository is seen on Packagist.org, but there can be an unlimited number of such Composer repositories publicly available on the Internet. The Drupal community also has its own: the `https://packages.drupal.org/8` service has no graphical interface as it is not meant for browsing manually from a web browser.

## The vendor part
- Having several independent registers out on the Internet brings the risk of namespace conflict: when two separate repositories would offer two different software packages with the same name of `great-vendor/fantastic-package`. To avoid such collisions, the global Composer ecosystem applies some countermeasures. The Drupal community has the vendor name "drupal" reserved for itself. Therefore, all software packages available for download from our `https://packages.drupal.org/8` Composer repository must have "drupal" as the first part of their name.

## The package name part
- As you can see from the above, all software packages within all repositories must also have individually identifiable names. Once the first part, "drupal/", is commonly shared by all in our repository, the second part of the name must be unique. Fortunately, the Drupal ecosystem already has such a distinct naming convention as the "machine names" of modules, themes, and profiles. Thus, using these internally already used machine names as the second part of the Composer package names also seems obvious. An important note here: although the hyphen ("-") is more common for separating words in Composer vendor and package names, Drupal's machine names use an underscore ("\_") for this instead. For example, if you have your contrib module called "My Module" as its human label, then its machine name used within the Drupal world will be derived as "my\_module" probably (not mandatory, but recommended). Finally, its package name in Composer's global namespace derives from the machine name and becomes `drupal/my_module` (required to match).

## In Drupal.org URLs
- When we said that our own Composer repository at `https://packages.drupal.org/8` is not meant for manual browsing, it's important to note that Drupal.org's project browsing features (the search forms on [/project\_module](/project/project_module) or [/project\_theme](/project/project_theme)) replace that functionality. Whenever you navigate to a dedicated page of a given project (like [drupal.org/project/admin\_toolbar](/project/admin_toolbar), for example), the very same machine name of the project appears in the URL path after `https://drupal.org/project/…` as well. Seeing such a URL, you can be almost 100% certain that the package name of that contrib module is probably `drupal/admin_toolbar`. This general thumb rule for matching Composer package names with Drupal machine names makes the daily work of site builders and developers maintaining Drupal websites much easier. If you are interested about the historical discussions related to establishing this naming convention back in 2015, you can [read more here](/project/drupal/issues/2401519).

## Some extraordinary cases
- *Drupal* itself is a project: drupal.org/project/drupal → `drupal/drupal`
- But *Core* is a subtree of Drupal: drupal.org/project/core → `drupal/core`
- *Datetime* is a module within Drupal Core: drupal.org/project/datetime → `drupal/datetime`
- *Views* in Drupal 7 was a contrib project: drupal.org/project/views → `drupal/view`, but today is part of Drupal core
- Some project URLs are not accessible or point to another project, as they are reserved names. In most cases those are sub-modules or sub-themes of existing projects, like Drupal core.

## Drupal (Sub-)Modules, Themes and Profiles
- Multiple modules, themes and profiles might be part of a single Drupal project, for example `system, node, standard` in [Drupal](https://www.drupal.org/project/drupal) or `page_manager, views_content` in [ctools](https://www.drupal.org/project/ctools). As Drupal won't let you run two modules with the same name, modules, themes, profiles and Drupal projects share the same namespace.

## Convention
- Sub-modules, -themes and profiles must use the package name.
- where `SUBPROJECT` is the machine name of the module, theme or profile.
- This will not conflict with `drupal/PROJECT`, as Project names share the same namespace with modules, themes and profiles due to the way Drupal works.
- Over time, some projects may merge into or were split from another project. For example *Views* was merged into *Drupal 8* or *[Page Manager](https://www.drupal.org/project/page_manager)* was separated from *ctools* for a Drupal 8 release. Because of different version numbers, these cases can be resolved by utilizing [Composer's replace property](https://getcomposer.org/doc/04-schema.md#replace) and/or using different composer repositories.
- In the case naming conflicts cannot be resolved, *Drupal Projects* shall take precedence over (sub-)modules, themes and profiles.
- For avoiding dependency issues, Drupal projects declaring their own composer.json, should also add their submodules and -themes to the `replace`\-section.

## Examples
- Module `devel_generate` from [Devel](https://www.drupal.org/project/devel) → `drupal/devel_generate`
- Drupal 8 core's Views module can be specified as `drupal/views`, but the dependency will be resolved as a contrib replacement by `drupal/core`.
- Based on this convention, meta-packages or subtree-splits could be provided for every module, theme and profile.

## Components
- Drupal projects may also contain custom components (like PHP libraries). As those components are not bound to any namespace, they are likely to conflict with a given Drupal project, module, theme, etc..

## Convention
- Package names must be prefixed with their parent's name and a dash (`-`), in the case it will use the `drupal/` vendor:
- where `PARENT` is the name of the parent package and `COMPONENT` a sufficient name for the component.
- Since the `-` (dash) is **not** used in the existing drupal namespace, it *shouldn't* conflict in anyway to what is currently in Drupal.

## Examples
- [Datetime](https://github.com/drupal/drupal/tree/8.0.x/core/lib/Drupal/Component/Datetime) becomes `drupal/core-datetime`
- [Diff](https://github.com/drupal/drupal/tree/8.0.x/core/lib/Drupal/Component/Diff) becomes `drupal/core-diff`
- This also allows contrib to expose components like so: `drupal/panels-renderer` or `drupal/ds-builder`

- [coding standards](/taxonomy/term/190104)

## YAML Configuration files

## YAML Configuration files

## Format
- Configuration files use [YAML syntax](https://yaml.org/spec/).

## Filename
- The configuration file name is equal to the unique configuration name with **`.yml`** extension.
- The unique configuration name cannot exceed 250 characters.

## Simple configuration
- For simple configuration, the unique configuration name **must** start with the extension name (the machine name of the module, theme, or install profile that owns the configuration).
- For example, a module with the machine name `mymodule` wants to create a simple configuration for storing the module settings, the configuration name may be `mymodule.settings`, but it may not be `my_module.settings`.
- Extensions can also have multiple configuration files, the use of the name `settings` is common practice but is not required, `mymodule` could also create a configuration named `mymodule.features`, if separating them makes logical sense.

## Configuration entities
- For configuration entities, the unique configuration name has a prefix, which is equal to `(extension).(config_prefix)`. Here, `(extension)` is the machine name of the module that defines the config entity, or "core" for core entities; `(config_prefix)` is defined in the entity annotation, and defaults to the machine name (ID) of the config entity if it has not been overridden by a `config_prefix` annotation in the entity class. Extension names cannot exceed 50 characters, and config entity config prefixes cannot exceed 32 characters.
- The rest of the unique configuration name for a config entity (which is called the *suffix* in the rest of this section) is limited to 150 characters.
- For many configuration entities, the suffix consists solely of the individual machine name of the item. For instance, the unique configuration name for an image style is `image.style.(machine_name_of_style)`, and for a view it is `views.view.(machine_name_of_view)`. In these cases, the machine name of the item cannot exceed 150 characters.
- For entity bundles, the unique configuration name for the bundle configuration is `(extension).(entity_id).(bundle_config_prefix).(bundle_machine_name)`, where `(extension)` is the module that defines the entity (or "core"), `(entity_id)` is the machine name of the entity this is a bundle of, `(bundle_config_prefix)` is the config prefix defined in the bundle configuration entity class annotation (defaulting to the config entity ID if not defined), and `(bundle_machine_name)` is the machine name of that particular bundle. So for example, the unique configuration name for the Book module's "book" content type for nodes is `node.type.book`, because the config prefix for the NodeType entity is "type", and the node type's machine name in this case is "book". Entity and bundle IDs and config prefixes are limited to 32 characters.
- For configuration like field instances and view modes, it's an even more complex structure. For instance, the view mode structure is `entity.view_mode.(target_entity_type).(view_mode_machine_name)` (example: entity.view\_mode.node.teaser), and field instances are `field.instance.(target_entity_type).(target_bundle).(field_machine_name)` (example: field.instance.node.article.body). In these cases, sensible maximums need to be chosen for each component of the unique configuration name, so that the suffix portion does not exceed 150 characters.

## Comments
- Comments are not typically in config files, but can be made using `#`.

## Whitespace
- Use two spaces to indent in config files. In [YAML](https://yaml.org/), the white space has semantic meaning to represent nested structures.

- [coding standards](/taxonomy/term/190104)

## CSS architecture (for Drupal 9)

## CSS architecture (for Drupal 9)
- Note: This document aims to apply emerging best-practices for CSS to Drupal 8/9. As we implement these ideas in Drupal 8, this document may need to be updated.
- [Skip to best practices](#best-practices)

## Goals
- The goals of good CSS should not be so different from those of good software engineering. Well-architected CSS, like PHP or JavaScript, should be:

## 1\. Predictable
- CSS throughout Drupal core and contributed modules should be consistent and understandable. Changes should do what you would expect without side-effects.

## 2\. Reusable
- > CSS rules should be abstract and decoupled enough that you can build new components quickly from existing parts without having to recode patterns and problems you’ve already solved. – *Philip Walton, [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)*

## 3\. Maintainable
- As new components and features are needed, it should be easy to add, modify and extend CSS without breaking (or refactoring) existing styles.

## 4\. Scalable
- CSS should be easy to manage for a single developer or for large, distributed teams (like Drupal’s).

## The Component
- Components are the discrete, purpose-built visual elements that make up the UI of a site or app. Components consist of HTML, CSS, and often – but not always – JavaScript. They are our navbars, dialogs, buttons and carousels. Components can be simple (such as icon containers and buttons) or complex enough to be themselves composed of other components.

## Common CSS Pitfalls
- To better understand the best practices provided below, it can be helpful to review some common approaches that impede our goals of predictability, maintainability, reusability and scalability.

## Pitfall: Modifying components based on context
- This may seem natural, but actually makes CSS less predictable and maintainable. Sooner or later you’re going to need that component style somewhere other than a sidebar! Or, the reverse may happen: a new developer places a component in the sidebar and gets an unexpectedly different appearance.

## Pitfall: Relying on HTML structure
- Mirroring a markup structure in our CSS selectors makes the resulting styles easy to break (with markup changes) and hard to reuse (because it’s tied to very specific HTML). This pitfall comes in several forms:
- Overly complex selectors: `nav > ul > li > a`, `article p:first-child`
- Qualified selectors: `a.button`, `ul.nav`

## Pitfall: Overly generic class names
- Similar to the pitfall of styling a component based on context, it’s common to ‘scope’ a component’s parts under the parent component using a descendant selector:
- This CSS might seem economical, but tends to be counterproductive: `.title` and `.content` are too generic. A stand-alone `.title` component created later will affect widget titles, likely without intending to.

## Pitfall: Making a rule do too much
- Applying positioning, margins, padding, colors, borders and text styles all in a single rule overloads the rule, making it difficult or impossible to reuse if some parts (say, background, borders and padding) need to be applied to a similar component later on.

## Pitfall: Needing to undo styles
- Creating style rules that undo other rules, like `.component-no-padding` makes CSS over-complex, hard to understand and maintain, and bloats the stylesheet. Needing such styles usually indicates that some existing rules are doing too much.

## Best Practices

## 1\. Avoid reliance on HTML structure
- CSS should define the appearance of an element anywhere and everywhere it appears.
- Use classes to assign appearance to markup. Never use id selectors in CSS.
- Keep selectors short. The best selector is a single class or element!
- Sometimes multi-part selectors are pragmatic. For example:
- However, extra care should be taken when using multi-part selectors:
- 1.  Avoid elements with no native semantics (div, span) in multi-part selectors.
- 2.  Avoid the descendent selector (e.g. `.my-list li`) where possible, especially for components that may wrap other components. The descendant selector has a habit of unintentionally affecting nested elements. Prefer the child selector: `.my-list > li`.
- 3.  Avoid more than 2 [combinators](http://reference.sitepoint.com/css/combinators) in a selector. The following rule is maxed out: `.my-list > li > a`.
- 4.  If in doubt, add a class and style the element directly.

## 2\. Define component elements (sub-objects) using their own classes
- To avoid relying on markup structure and overly-generic class names, define a component’s element explicitly, prefixing them with the component’s name followed by two underscores:
- *Note** that there is no need to reflect DOM structure in the class name; for example, do not replace `.menu li a` with `.menu__item__link`. The class `.menu__link` should be sufficiently specific.

## 3\. Extend components using modifier classes
- Create component variants explicitly, adding a suffix with the variant name preceded by two dashes. In order to keep the stylesheet DRY, this modifier class should only contain the styles needed to extend the original. This means that **both** base and modifier classes **must** appear together in the markup:

## 4\. Separate Concerns
- Components should not be responsible for their positioning or layout within the site. Never apply widths or heights except to elements that natively have these properties (e.g. images have these properties, so it's okay to use CSS to modify their width and height). Within components, separate structural rules from stylistic rules.
- Separate style from behavior by using dedicated classes for JavaScript manipulation rather than relying on classes already in use for CSS. This way, we can modify classes for style purposes without fear of breaking JS, and vice versa. To make the distinction clear, classes used for JavaScript manipulation should be prefixed with 'js-'. These JavaScript hooks must never be used for styling purposes. See the section ‘[Formatting Class Names](#formatting)’ for more information on naming conventions.
- Avoid applying inline styles using JavaScript. If the behaviour is describing a state change, apply a class name describing the state (e.g. 'is-active'), and allow CSS to provide the appearance. Only use inline styles applied via JavaScript when the value of the style attributes must be computed at runtime.
- Drupal **8/9** uses the [SMACSS](http://smacss.com/book/) system to conceptually categorize CSS rules. Note that some SMACSS nomenclature has been changed to avoid confusion with existing Drupal terminology.
- Base rules consist of styling for HTML elements only, such as used in a CSS reset or [Normalize.css](https://github.com/necolas/normalize.css/). Base rules should never include class selectors.
- To avoid ‘undoing’ styles in components, base styles should reflect the simplest possible appearance of each element. For example, the simplest usage of the `ul` element may be completely unstyled, removing list markers and indents and relying on a component class for other applications.
- Arrangement of elements on the page, including grid systems.
- > Grid systems should be thought of as shelves. They contain content but are not content in themselves. You put up your shelves then fill them with your stuff \[i.e. components\]. – *Harry Roberts, [CSS Guidelines](https://cssguidelin.es/)*
- Reusable, discrete UI elements; components should form the bulk of Drupal’s CSS.
- Styles that deal with transient changes to a component’s appearance. Often, these are client-side changes that occur as the user interacts with the page, such as hovering links or opening a modal dialog. In some cases, states are static for the life of the page and are set from the server, such as the active element in main navigation. The main ways to style state are:
- Custom classes, often but not always applied via JavaScript. These should be prefixed with `.is-`, e.g. `.is-transitioning`, `.is-open`;
- pseudo-classes, such as `:hover` and `:checked`;
- HTML attributes with state semantics, such as `details[open]`;
- media queries: styles that alter appearance based on the immediate browser environment.
- Purely visual styling, such as border, box-shadow, colors and backgrounds, font properties, etc. Ideally, these should be separated enough from a component’s structure to be “swappable”, and omitting these entirely should not break the component’s functionality or basic usability.

## 5\. Name Components Using Design Semantics
- While the HTML5 specification mentions that class names should “describe the nature of the content,” there’s no reason for this. HTML elements already impart semantics on the content and machines cannot derive content-level semantics from class names (with the narrow exception of [microformats](http://microformats.org/).)
- > Class names should communicate useful information to developers. – *Nicolas Gallagher, [About HTML Semantics and Front-End Architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)*
- Class names used as CSS hooks should reflect *design* semantics over content semantics. In general, they should reflect the intent and purpose of the design element they represent.
- Note that this does not preclude presentational class names. Grid system classes such as `.grid-3`, utility classes such as `.leader` and `.trailer` (for adding whitespace based on a [baseline grid](http://alistapart.com/article/settingtypeontheweb)) and `.text-center` are all examples of presentational classes that represent visual semantics. They are meaningful to developers, and highly reusable.
- This does not mean going back to classes like `.blue-box`. This is obviously a bad class name since it does not reflect the visual meaning, only one very surface attribute. It’s useful to ask “why is this a box, and why blue?”. Thinking about this, we might realize that this box is actually a version of the style used throughout our site for notifications, and this particular shade of blue is used for non-urgent notifications:

## Note for core developers
- Since classes should represent design semantics and Drupal core must be design-agnostic, core default markup should be exceedingly cautious about what classes are included. This applies especially to the use of presentational class names.

## Note for module developers
- Since modules are responsible for providing the default HTML implementation, module developers should make their best effort to find an existing theme hook to use and to insert a design-derived class name, possibly one had already found in core. If the module’s content has no default design, the class name should be based on how the content is built; often this can just be the name of the module (e.g. `class="views"`.)
- Module developers should ensure that themers can replace/augment any module-provided class.

## 6\. Formatting Class Names
- Class names should use full words rather than abbreviations. Styles for a button component should use e.g. `class="button"` rather than `class="btn"`
- Class names for components should always use a dash between words. Use `class="button-group"` rather than `class="buttongroup"`
- The HTML class attribute has been made to do a lot. Drupal uses a naming convention to make clear what a particular class is for and what other parts of the system it affects:

## Closing Note: Specificity, ids and `!important`
- Avoid using the id selector in CSS. There is no general benefit to using the 'id' attribute as a CSS hook, and it has serious downsides in the form of increased selector specificity.
- Although it should be avoided in CSS, there are many excellent uses for the 'id' attribute:
- A performant JavaScript hook;
- An anchor within the document for links ([http://yoururl.com#anchor](http://yoururl.com#anchor));
- An anchor for associating labels with form elements or for associating DOM elements using ARIA attributes.
- The `!important` flag should be used sparingly and appropriately, and in general should be restricted to themes. Since it overrides all external stylesheet rules, it is useful for states that must supersede all others, no matter the component variant. For example, error or disabled states are appropriate places to use `!important`, since they must be consistent and always apply when present. Never use `!important` to resolve specificity problems for general CSS rules. Additionally, Drupal core and contrib modules should avoid the `!important` flag, since all module CSS should be easy to override.

## Case Study
- As an example and guide to developers, take the progress bar from the [proposed Seven style guide](http://groups.drupal.org/node/283223#Progress):
- ![Progress bar component and small variant](/files/10.progress.png)
- This might be marked up and styled as follows, using the standards described above:
- CSS (styles omitted)
- Note that the CSS relies almost exclusively on single class selectors; the exception is the small variant. This uses descendant selector, but is the recommended approach for styling sub-objects within variant components. Here’s why: firstly, it avoids extreme class names such as .progress--small\_\_bar which begin to harm the understandability of the code. Second, since we have avoided overly-generic class names and since both parts of the selector are highly targeted classes, there is little risk of accidentally styling a further child element. Third, scoping in this case is unlikely to break reusability, since we should not expect a Progress track outside of the Progress element.
- We are still serving of our goals well, and we greatly simplify the required markup: we only need to add the variant class to the component itself: `<div class="progress progress--small"><!-- all internals remain the same --></div>`.

## Acknowledgments
- Portions of this guide are based heavily on:
- Philip Walton, [CSS Architecture](http://engineering.appfolio.com/2012/11/16/css-architecture/)
- Johnathan Snook, [SMACSS](http://smacss.com/book/)
- Nicolas Gallagher, [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
- Additional Influence and Resources:
- Nicole Sullivan, [OOCSS](http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
- Harry Roberts, [Code Smells in CSS](http://csswizardry.com/2012/11/code-smells-in-css/)
- Harry Roberts, [CSS-Guidelines](http://cssguidelin.es)

## CSS coding standards

## CSS coding standards
- To minimize friction when contributing to CSS, the front-end developers of the Drupal community have reached consensus about our coding standards for:
- Formatting CSS code.
- CSS architecture, including goals, pitfalls and best practices.
- Grouping rulesets into files.
- Despite our natural range of working styles and coding preferences, we value collaboration and ease of development, so we have attempted to explain our standards clearly in the following documents.
- > "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then **write your code for maximum clarity**." - Idan Gazit

## Acknowledgements
- This guide is based upon the works, [*Principles of writing consistent, idiomatic CSS*](https://github.com/necolas/idiomatic-css) by Nicolas Gallagher and [*Scalable and Modular Architecture for CSS*](http://smacss.com) (SMACSS) by Jonathan Snook with a hat tip to Nicole Sullivan’s ground-breaking [*Object Oriented CSS*](http://www.stubbornella.org/content/2009/02/12/css-doesn’t-suck-you’re-just-doing-it-wrong/).

## CSS file organization

## CSS file organization
- Note: This document describes a file organization and aggregation strategy that has not yet been implemented. See this core issue for that on-going work: [#1921610: \[Meta\] Architect our CSS](/project/drupal/issues/1921610 "Status: Active")

## File Structure
- Rulesets should be grouped into logical files that enforce the separation of concerns within the CSS, that can be aggregated efficiently and that can be easily overridden by themers.
- Drupal follows a SMACSS-style categorization of its CSS rules: The State and Theme categories are not frequently used with modern CSS.
- 1.  Base —Should include HTML element styling (e.g. a, ul, etc), typography, root scooped CSS custom properties, resets and utility classes.
- 2.  Layout —Overall layout of the page including page template layout, region layout, etc.
- 3.  Component (SMACSS “module”) — The majority of a theme’s styles will be within components. Components should be scoped to their own CSS files. Example components include pager, navigation, footer, etc.
- 4.  State (not used often) — This was originally created for styles that modified the states of components, however it is now best practice to include component states within their respective stylesheet.
- 5.  Theme (not used often) — This was originally created to apply styles that would affect the overall look and feel of the theme (such as colors), however this can now be done more effectively by modifying CSS custom properties.
- For more information about Drupal’s use of SMACSS, see the [“Separate Concerns” section of the CSS Architecture page](http://drupal.org/node/1887918#separate-concerns).
- These categories help us keep CSS styles with different purposes from getting intertwined with one another. However, they don’t directly dictate file structure. Drupal recommends the following guidelines for structuring CSS across files:

## CSS files for Drupal modules
- All of a module's styles should be placed in a `css/` sub-directory and broken into one or more of the following files:
- `module_name.module.css`: This file should hold the minimal styles needed to get the module's functionality working. This includes layout, component and state styles.
- `module_name.theme.css`: This file should hold extra styles to make the module's functionality aesthetically pleasing. This usually just consists of theme styles.
- `module_name.admin.css`: This file should hold the minimal styles needed to get the module's admin screens working. This includes layout, component and state styles. On admin screens, the module may choose to load the \*.module.css in addition to the \*.admin.css file.
- `module_name.admin.theme.css`: This file should hold extra styles to make the module's admin screens aesthetically pleasing. This usually just consists of theme styles.
- Note: Modules should never have any base styles. Drupal core's modules do not have any base styles. Instead Drupal core uses the Normalize.css library augmented with a drupal.base.css library.
- If a module attaches a CSS file to a template file, the CSS file should be named the same as the template file, e.g. the system-plugin-ui-form.html.twig CSS file should be named system-plugin-ui-form.css

## CSS files for Drupal themes
- 1.  Always separate Base, Layout, and Component styles into their own files. (Drupal will aggregate these separate files into one file, so there is no performance problem with this practice.)
- 2.  For complex themes, consider placing each component or component family in its own file.
- 3.  State rules, including media queries, should be included with the component to which they apply.
- 4.  Theme rules may or may not have their own file(s). [Starter themes](http://drupal.org/node/323993) are encouraged to separate their theme CSS into separate files. Otherwise, include theme rules with their corresponding component.
- Most themes will have at least the following:
- Optionally, these can be further broken out. Below the base/layout/component level, naming is up to the module or theme. A more complex file structure using normalize.css and a mobile-first approach might look like this:
- Note: Module styles are always loaded before theme styles and the SMACSS groups cannot be interlaced between modules and themes. For example, loading a normalize.css in a theme's "base" SMACSS group will appear in the CSS cascade order only *after* all other stylesheets defined in core and contrib modules even when they're defined in a higher SMACSS group like "component" and "theme". Follow [#3046636: LibraryDiscoveryParser overwrites theme CSS group ordering](/project/drupal/issues/3046636 "Status: Needs work") for more information.

## Aggregating CSS
- In Drupal 7 and earlier, the “group” option and the “every page” option of `drupal_add_css()` controlled which files would be aggregated together. The groups were `CSS_SYSTEM`, `CSS_DEFAULT` (for Drupal modules), and `CSS_THEME` (for Drupal themes) and the `every_page` option was a simple boolean flag. This meant there were up to 6 aggregated files.
- In Drupal 8 and later, themes now have the ability to override stylesheets without affecting the “every page” option of the original stylesheet. See [http://drupal.org/node/1876600](http://drupal.org/node/1876600). This means conditionally-loaded CSS remains conditionally loaded.
- This also means it’s now simple for themes to affect conditionally-loaded styles, so all the theme-added CSS no longer needs to load after all conditionally-loaded styles. This greatly simplifies the default grouping strategy that Drupal can employ. Instead of 6 aggregated files, we can just have 2:
- 1.  The “Every page” aggregate. Includes:
- 1.  Base styles from libraries (like Normalize.css and drupal.base.css) and then Drupal themes.
- 2.  Layout styles from Drupal modules and then Drupal themes.
- 3.  Component styles (and their associated states and themes) from Drupal modules and then Drupal themes.
- 4.  State styles that are not included with components, from Drupal modules and then Drupal themes.
- 5.  Theme styles that are not included with components, from Drupal modules and then Drupal themes.
- 2.  The conditionally-loaded aggregate. Includes:
- 1.  Layout styles from Drupal modules and then Drupal themes.
- 2.  Component styles (and their associated states and theme) from Drupal modules and then Drupal themes.
- 3.  State styles that are not included with components, from Drupal modules and then Drupal themes.
- 4.  Theme styles that are not included with components, from Drupal modules and then Drupal themes.
- Note: there should never be conditionally-loaded base styles.*
- The order of styles within an aggregate are determined by the “weight” option of `drupal_add_css()` which will be:
- The aggregated file itself is determined by the "group" option and the "every page" flag of drupal\_add\_css(). The group option defaults to the `CSS_AGGREGATE_DEFAULT` constant. Drupal core does not provide any other aggregate constants, but contrib can define their own aggregate groups.

## SMACSS and Sass/Compass
- SMACSS when combined with Sass/Compass concept can provide much control over output css. We can use Sass Globbing concept to have multiple .scss files and only one css file with the use of partials.

## CSS formatting guidelines

## CSS formatting guidelines

## Whitespace

## Indentation
- Use 2 spaces for each level of indentation, the same standard as Drupal’s PHP and JavaScript code.
- Declarations (property/value pairs) should be indented one level relative to their selector.
- Rulesets within a media query should be indented one level relative to the media statement.
- Comments should maintain the indentation of their declaration or ruleset.

## Blank lines
- In general, separate each ruleset by a blank line when using PostCSS.
- If a ruleset has a preceding Doxygen-style or single-line-style comment that describes it, place a blank line before the comment.
- If two rulesets have no interleaving blank line, they must be logically related. If they are not logically related to each other, add a blank line and a comment describing the second ruleset.

## Line endings
- There MUST NOT be any whitespace (spaces or tabs) at the end of lines.
- All text files should end with a single blank line.
- Files should be formatted with Unix line endings (a newline character, denoted as `\n` or `LF`), which is also the default in Mac OS X.
- Tip: configure your editor to “show invisibles”. This will allow you to eliminate end-of-line whitespace, eliminate unintended blank-line whitespace, and avoid polluting commits.
- Drupal 8 and above includes an [EditorConfig](http://editorconfig.org/) file in [its root directory](https://git.drupalcode.org/project/drupal/-/tree/11.x?ref_type=heads) to help maintain these whitespace conventions.

## Comments
- Well commented code is extremely important. Take time to describe components, how they work, their limitations, and the way they are constructed. Don't leave others guessing as to the purpose of uncommon or non-obvious code.
- To stay consistent with the rest of Drupal's code base, we borrow some of the CSS comment styles from the [Doxygen and comment formatting conventions](https://www.drupal.org/docs/develop/standards/php/api-documentation-and-comment-standards) for PHP files.

## File comments
- Each file should start with a comment describing what the file does. Note that a blank line should follow a file comment. And keep line-lengths to 80 columns, when possible. For more information, see the [PHP file comment standards](https://www.drupal.org/docs/develop/standards/php/api-documentation-and-comment-standards).

## Single line comments describing a ruleset
- Short comments describing a ruleset can be kept to one line.

## Multi-line comments describing a ruleset
- When describing a ruleset or set of rulesets, any comment that requires 2 or more lines (wrapped to 80 characters) must follow the Doxygen comment style (also called a “docblock”).

## Multi-line comments inside a ruleset
- Within a ruleset, multi-line comments are preceded with a `/*` and terminated by a `*/`. Text is intended to maintain the text’s left alignment.

## Single-line comments
- When describing a property or ruleset, any comment that can be written inside the 80 character line length limit can use a simple CSS comment style.
- Example of all comment styles:

## Properties where browsers do not have or support CSS logical properties
- Certain properties do not have a “logical properties” equivalent (such as `transform`). For these direction specific rules, add a `/* LTR */` comment on the same line preceded by a single space. Follow with an additional ruleset (or nested ruleset if using PostCSS) containing the inverse property/values.

## Rulesets
- Use one selector per line when a ruleset has a group of selectors separated by commas.
- When possible, consider using functional pseudo-classes like  `:is()`, `:not()or` `:where()` that allow combining of selectors.
- Include one declaration per line in a declaration block.

## Properties
- In a declaration, the property name should be immediately followed by a colon, then a single space, and then the property’s value.
- Include a semicolon at the end of all declarations.
- For property values that require quotes, use double quotes instead of single quotes, e.g. font-family: "Arial Black", Arial, sans-serif; and content: " ";.
- Default to rem units, unless it creates an undesired effect.
- Note that if you are using PostCSS, this is automatic via the PostCSS PxToRem plugin.
- Quote attribute values in selectors, e.g. input\[type="checkbox"\].
- Where allowed, avoid specifying units for zero-values, e.g. use `margin: 0;` instead of `margin: 0px;`.
- Include a space after each comma in comma-separated property or function values.
- Do not use spaces around the parentheses in a function, e.g. color: rgba(0, 0, 0, 0.8);
- Use lower case function names, correct: color: rgba(0, 0, 0, 0.8);

## Declaration order
- The declarations in a ruleset should be ordered so that the purpose of the declaration block is most obvious. Clarity should be the guiding principle.
- 1.  Positioning properties include: `position`, `float`, `clear`, `inset`, `top`, `right`, `bottom`, `left`, `direction`, and `z-index` plus logical properties like `block-start`, `block-end`, `inline-start` and `inline-end`.
- 2.  Box model properties include:
- 1.  display
- 2.  sizing (like block-size or inline-size as logical properties, and width and height and the (max|min) variation or each of them)
- 3.  Margins and the logical property equivalents, plus their various longhand forms (margin-block, margin-top, margin-inline-end…)
- 4.  Paddings and the logical property equivalents,  plus their various longhand forms (padding-block, padding-top, padding-inline-end…)
- 5.  Borders and the logical property equivalents,  plus their various longhand forms.
- 6.  box-sizing
- 3.  Other declarations.
- Within each of the above groups, properties can be grouped alphabetically or grouped with like properties next to each other, e.g. putting font and text properties next to each other. Drupal’s coding standards are purposefully vague here because there is no consensus on this issue (as of 2013), but we respect each other’s abilities and preferences.
- If not automatically added by autoprefixer (which is part of the PostCSS build process), vendor prefixed properties should be directly before their non-prefixed version. This allows the official version of the property to override any inconsistencies in the vendor-prefixed versions once those browsers implement the official property. If browser bugs or cross-browser issues necessitate any deviation from this ordering, it should be clearly documented.
- Again, the order of properties is meant to reinforce the purpose of the ruleset. As such, it is much more important to add comments to the ruleset than to worry about property ordering.
- The text of this guideline was originally based on the [*Principles of writing consistent, idiomatic CSS*](https://github.com/necolas/idiomatic-css) by Nicolas Gallagher.

## CSS

## CSS
- CSS coding standards and best practices for Drupal.
- Overview of CSS coding standards
- Whitespace, comments, formatting and more
- Standards for using the CSScomb formatting and sort tool for CSS
- Goals and best practices for CSS architecture
- Preliminary strategy for file organization
- How to review CSS patches

## Related Content
- Working with CSS in Drupal 7.

- [coding standards](/taxonomy/term/190104)

## Guide maintainers
- [![pfrenssen's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/user-pictures/picture-382067-1401376332.jpg?itok=--NaH254)](/user/382067 "View pfrenssen's profile")
- [![effulgentsia's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/default-avatar.png?itok=ZYxnS__Q)](/user/78040 "View effulgentsia's profile")
- [![tizzo's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/user-pictures/picture-168251-1400198420.jpg?itok=94ansEqu)](/user/168251 "View tizzo's profile")
- [![jthorson's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/user-pictures/picture-148199-1409772253.jpg?itok=hv76IG-b)](/user/148199 "View jthorson's profile")

## CSScomb settings for Drupal (CSS formatting and sort tool)

## CSScomb settings for Drupal (CSS formatting and sort tool)
- [CSScomb](https://github.com/csscomb/csscomb.js "Make your code beautiful") formats and sorts CSS properties in **css, scss, sass or less** files. An explanation of the options can be found at [https://github.com/csscomb/csscomb.js/blob/master/doc/options.md](https://github.com/csscomb/csscomb.js/blob/master/doc/options.md).
- CSScomb is available as:
- a [command-line tool](https://github.com/csscomb/csscomb.js/blob/master/doc/usage-cli.md " command line usage")
- a [plugin](https://github.com/csscomb/sublime-csscomb "csscomb/sublime-csscomb | GitHub") for [Sublime Text](http://www.sublimetext.com/3 " The text editor you'll fall in love with")
- a [plugin](https://atom.io/packages/csscomb "Atom Editor Plugin for CSScomb | atom.io") for [Atom](https://atom.io/ " A hackable text editor for the 21st Century by GitHub")
- a [plugin](https://github.com/csscomb/grunt-csscomb "csscomb/grunt-csscomb | GitHub") for [Grunt](http://gruntjs.com/ " The JavaScript Task Runner") (post-processing)
- a [plugin](https://www.npmjs.com/package/gulp-csscomb "gulp-csscomb | npm packages") for [Gulp](http://gulpjs.com/ "gulp.js - the streaming build system") (post-processing)
- an [external tool](https://github.com/csscomb/jetbrains-csscomb "csscomb/jetbrains-csscomb | GitHub") for [PhpStorm](https://www.jetbrains.com/phpstorm/ "The Most Intelligent PHP IDE | JetBrains PhpStorm")
- a [plugin](https://github.com/csscomb/vim-csscomb "csscomb/vim-csscomb | GitHub") for [Vim](https://www.drupal.org/node/1389006 "Vimrc - Vim Plugin for Drupal | Drupal.org").
- The used values in the snippet below are in accordance with the recommendations in the [CSS formatting guidelines](https://www.drupal.org/node/1887862 "CSS formatting guidelines | Drupal.org"). The sort order of CSS properties is based on the [Yandex configuration file](https://github.com/csscomb/csscomb.js/blob/master/config/yandex.json "csscomb.js/yandex.json | GitHub") and improved for SASS/LESS by [putting variables first](https://github.com/csscomb/csscomb.js/blob/master/doc/options.md#sort-order-vs-preprocessors "csscomb.js/options.md at master · csscomb/csscomb.js · GitHub") (they have to be declared before being used).
- Copy/paste the configuration below into the CSScomb package settings file under *Preferences* in Sublime Text (after installation of the plugin). For most other use cases, put it in a file named `.csscomb.json` [in your local home folder](https://github.com/csscomb/csscomb.js/blob/master/doc/configuration.md#where-to-put-config "Where to put the config file?") (usually named *www*) to make it applicable to all your projects.

## Note
- To have ruleset groups divided by an empty line, replace the empty lines above with:

## Alternatives
- There is [csscombx](https://www.npmjs.com/package/csscombx), which is a fork of [Csscomb](https://github.com/csscomb/csscomb.js) tool specifically intended for Drupal. It has a default configuration file with exactly the same content as the example above, so you don't need to make any additional set up.
- How to use.
- First, you need to install [nodejs](https://nodejs.org/en/download/) on your system. It has the **npm** - a package manager for many popular javascript projects.
- Then, install [csscombx](https://www.npmjs.com/package/csscombx) globally:
- Depending on where you've installed **npm** the command above may require **sudo** prepended to it.
- After installing **cd** into your theme's root folder (or any folder containing style files to be formatted) and make a so-called dry run without changing anything:
- The **\-v** option on the command stands for verbose and **\-l** for lint. It scans the current directory recursively for all **css**, **scss**, **sass** and **less** files and reports their status relative to the settings in the [drupal.json](https://github.com/drugan/csscombx/blob/master/config/drupal.json) configuration file of the tool. If you want to change default settings just copy the content of the file and paste into **.csscombx.json** file in the root of your theme, a particular style folder, webroot folder or any other folder where you require your customized formatting settings to be applied. Note that any of a project's child folders may have its own **.csscombx.json** file with different settings.
- When you are ready for actual changes, run this command passing desirable folder and/or particular file paths as arguments:
- Sometimes you may want to automate the formatting task above and run it whenever the style file(s) are saved after being edited. For that case, you can use the [gulp-csscombx](https://www.npmjs.com/package/gulp-csscombx) plugin.
- How to use.
- Install [gulp-cli](https://www.npmjs.com/package/gulp-cli) globally:
- Create **package.json** file in the root of your theme, module or any other project and put this into it:
- Then run  this command:
- If you already have a **package.json** file then just run this command without touching the file:
- Then create a **gulpfile.js** file in the root of your theme, module or any other project and put this into it:
- Adjust **mySrcStyles** variable's value for the content you want to be formatted and run this command:
- You'll see that execution of the command is halted and waits while any of the **mySrcStyles** will be changed. Do it and look in the console again. It should report that some files are automatically formatted. When you are done with developing your styles just go to the console and press **Ctrl+C** keyboard shortcut to terminate the gulp watcher's task.
- If you think that some of the [drupal.json](https://github.com/drugan/csscombx/blob/master/config/drupal.json) default configuration file's settings do not comply with Drupal CSS coding standards then please do the following:
- Create a [new issue](https://www.drupal.org/node/add/project-issue/drupal) for the **CSS** component of the Drupal core.
- Post a [comment on this page](https://www.drupal.org/node/2399303/discuss) to notify all the participants involved.
- [Create the issue](https://github.com/drugan/csscombx/issues/new) or just make a pull request on the [csscombx](https://github.com/drugan/csscombx).
- Also, if you have some difficulties with the **gulp-csscombx** plugin then post the issue on [its GitHub repository](https://github.com/drugan/gulp-csscombx/issues).

## Drupal Markup Style Guide

## Drupal Markup Style Guide
- The [Drupal Markup Style Guide](http://groups.drupal.org/node/6355) is a document in progress on how to:
- Create good HTML/markup
- Create good base templates for themers to stylize
- Create good CSS classes

- [coding standards](/taxonomy/term/190104)

## JavaScript API documentation and comment standards

## JavaScript API documentation and comment standards
- JavaScript code should be documented with documentation headers that are very similar to the [PHP documentation headers](http://drupal.org/node/1354), with modifications due to using the [JSDoc3](https://jsdoc.app/) parser as the first step in parsing the code and documentation. We generally follow the PHP standards as much as possible, with the following changes:
- All JavaScript items (methods, object constructors and properties, functions, variables, etc.) need to have documentation headers, or they will not be recognized by the parser (unlike the API module, which picks up all PHP items whether or not they have documentation headers). Only behaviors are documented specifically, see the [behavior documentation example](#behavior).
- Not all of the @tags we use for PHP are supported. See below for the tags available and their order of declaration.
- To indicate the data type for a `@param` or `@return` tag, put the data type in `{}` brackets: `@param {TheType} paramName` or `@return {TheType}`. For non-object data, use `number`, `string`, `bool`, `null`, `undefined`, `object`, `function`, `Array`. For particular objects, use the constructor name; this could be a built-in JavaScript class (`Date`, `RegExp`), a DOM element (`HTMLElement`, `HTMLInputElement`), a Drupal-specific class (`Drupal.Ajax`), etc.
- Additional tag: like `@throws`, which documents exceptions being thrown by a PHP or JavaScript function, use `@fires` to document events that are triggered by a JavaScript function. In addition, if the event is a custom event (as opposed to a standard event like a key press), add a documentation block immediately before the first line of code within a function that triggers the event, with an `@event` tag, to document the event itself (see sample below for details). Only include one `@event` block for each custom event, but use `@fires` in each function that triggers the custom event.
- Additional tag: when documenting an object that is not being used as a namespace or class, use `@prop {type} name` tags to document its properties (these work like `@param` for function parameters).
- Some additional notation is required in many cases to help JSDoc figure out what type of item is being documented.
- Use `@name` to tell JSDoc the name of what is being documented, if it is not the same as the name in the code (usually because it is a function name like `DropButton` rather than including the class name like `Drupal.DropButton`).
- Use `@constructor` to indicate that a function is intended to be a class constructor.
- Use `@namespace` to indicate that an object is intended as a namespace.
- You do not need to use `@function` in most cases - JSDoc will assume anything declared as a function is a regular function or method, unless one of the tags above overrides this determination.

## Tag order
- Here's a sample:

## Documenting a JavaScript file

## Documenting behaviors

## Documenting usual constructs

## JavaScript best practices

## JavaScript best practices
- This page covers DOM and Drupal specific code styles.

## JavaScript code placement
- JavaScript code SHOULD NOT be embedded in the HTML where possible, as it adds significantly to page weight with no opportunity for mitigation by caching and compression.
- *Beginner's note aside:** "In Drupal 7, there are four primary methods of adding JavaScript to Drupal." See [Managing JavaScript in Drupal 7](https://www.drupal.org/node/756722).

## Use literal expressions
- Code SHOULD use literal expressions instead of the `new` operator:
- Use `[]` instead of `new Array()`
- Use `{}` instead of `new Object()`
- It is RECOMMENDED to use literal expressions instead of the wrapper forms `new Number`, `new String`, `new Boolean` in situations where the literal expression is the same. However, you MAY use object instances in which it matters:

## "with" statement
- The `with` statement MUST NOT be used, since it is not possible to use `with` with enabled strict mode.
- Instead, you SHOULD use the explicit longer version:
- Alternatively, you MAY use references:

## Avoiding unreachable code
- To prevent unreachable code, a `return`, `break`, `continue`, or `throw` statement SHOULD be followed by a `}` or `case` or `default`.

## `eval()` is evil
- `eval()` SHOULD NOT be used.
- The browser has to create an entirely new scripting environment (just like creating a new web page), import all variables from the current scope, execute the script, collect the result, and export the variables back into the original environment. Additionally, the code cannot be cached for optimization purposes. It is both the most powerful and most misused method in JavaScript.
- Note that JavaScript implicitly uses `eval()` for some other language constructs.
- You SHOULD NOT use the `Function` constructor, and you SHOULD NOT pass strings to `setTimeout()` or `setInterval()`.

## Preventing XSS
- All output to the browser that has been provided by a user SHOULD be escaped through `Drupal.checkPlain()` first.
- This is similar to Drupal's PHP `check_plain()` and encodes special characters in a plain-text string for display as HTML.

## Modifying the DOM
- When adding new HTML elements to the DOM, you SHOULD NOT use `document.createElement()`.
- For cross-browser compatibility reasons and also in an effort to reduce file size, you SHOULD use the jQuery equivalent.
- Avoid this:

## Drupal 6 (and later) Specific Stuff
- Drupal 6 saw the introduction of JavaScript theming and translation of JavaScript files.

## Theming
- There is a theming mechanism for JavaScript code. Any modules containing JavaScript which produces HTML content MUST provide default theme functions in the Drupal.theme.prototype namespace.

## String Translation
- All strings in JavaScript files SHOULD be wrapped in `Drupal.t()`, which is an equivalent of the well-known [`t()`](http://api.drupal.org/t) function.
- Likewise, there is an equivalent to [`format_plural()`](http://api.drupal.org/format_plural), named `Drupal.formatPlural()`.
- Their parameter order is exactly like their server-side counterparts.
- *See also:**
- [JavaScript coding standards](https://www.drupal.org/node/172169).
- [jQuery coding standards](/docs/develop/standards/javascript/jquery-coding-standards).

- [javascript](/taxonomy/term/188579)
- [best practices](/taxonomy/term/187515)

## JavaScript coding standards

## JavaScript coding standards
- Use [eslint](http://eslint.org/docs/user-guide/command-line-interface) for Drupal JS coding standards. See the [eslint settings information](https://www.drupal.org/node/1955232). Drupal uses 'eslint-config-airbnb' as ESLint shareable config. Therefore it's reasonable to use ['Airbnb JavaScript Style Guide'](https://github.com/airbnb/javascript/) as Drupal JS coding standard.

## Indenting
- All code MUST indent using two (2) space characters,
- All code MUST NOT indent using tab characters,
- All code MUST NOT end with trailing whitespace.

## Semicolons
- JavaScript allows optional "semi-colon insertion". Drupal standards do not.
- All statements (except `for, function, if, switch, try, while`) MUST be followed by a semi-colon (`;`),
- Return values MUST start on the same line as the `return` keyword.
- *EXCEPTIONS:**
- Anonymous functions assigned to a variable MUST be followed by a semi-colon.
- do/while control structures MUST be followed by a semi-colon

## File-closure
- All JavaScript code MUST be declared inside a closure wrapping the whole file.

## CamelCasing
- For variables that are not [constants](#constants) or [constructors](#constructors), multi-word variables and functions SHOULD be lowerCamelCased.
- The first letter of each variable or function SHOULD be lowercase, and the first letter of subsequent words SHOULD be capitalized. There SHOULD NOT be underscores between the words.
- In case a variable contains a jQuery object, the variable MUST start with a dollar sign (`$`):

## Variables and Arrays
- Due to enabled strict mode, an undeclared variable will halt the script, and on old browsers such variables are implicitly exported into global scope.
- All variables MUST be declared with let or const before they are used and SHOULD be declared only once. All variables SHOULD be declared at the beginning of a function.
- Each variable assignment SHOULD be declared on a separate line - including variables that are only declared but do not get a value assigned.

## Global Variables
- Drupal JavaScript MUST NOT define global variables.

## Constants
- Pre-defined constants SHOULD be all-uppercase and words separated by underscores: `UPPER_UNDERSCORED`.
- Variables added via PHP SHOULD be [lowerCamelCased](#camelcasing), so that they are consistent with other JavaScript variables:
- This variable would then be referenced:

## Arrays
- Arrays SHOULD be formatted with one space separating each element and the assignment operator, if applicable:
- If the line is longer than 80 characters, each element SHOULD be broken into its own line, and indented one level.
- Use trailing comma after last element in multi line arrays. Trailing commas simplify adding and removing items to objects and arrays, since only the lines you are modifying must be touched. Also this leads to cleaner git diffs, when an item is added or removed from an object or array.

## Typeof
- In type comparisons, the value tested MUST NOT be wrapped in parenthesis.

## Functions

## Function and method names
- Function names SHOULD begin with the name of the module or theme declaring the function, so as to avoid name collisions.

## Function Declarations
- The `function` keyword MUST be followed by one space.
- Named functions MUST NOT have a space between the function name and the following left parenthesis.
- Optional arguments (using default values) SHOULD be defined at the end of the function signature.
- Every function SHOULD attempt to return a meaningful value.
- Note: The above examples code are lacking JSDoc and comments, only for clarity.

## Function Calls
- Functions SHOULD be called with no spaces between the function name, the opening parenthesis, and the first parameter.
- There SHOULD be one space between commas and each parameter, and there SHOULD NOT be a space between the last parameter, the closing parenthesis, and the semicolon.
- There SHOULD be one space on either side of an equals sign used to assign the return value of a function to a variable.

## Constructors
- Constructors are functions that are designed to be used with the `new` prefix. The `new` prefix creates a new object based on the function's prototype, and binds that object to the function's implied this parameter. JavaScript doesn't issue compile-time warning or run-time warnings if a required `new` is omitted. If you do not use the `new` prefix, no new object will be made and operations will be bound to the global object instead.
- Constructor functions MUST be given names with an initial uppercase character.
- A function with an initial uppercase name MUST NOT be called without a `new` operator.

## Comments
- Inline documentation for source files MUST follow the [JavaScript API documentation and comment standards](https://drupal.org/node/2183405) (based on JSDoc).
- Non-JSDoc comments are strongly RECOMMENDED.
- A general rule of thumb is that if you look at a section of code and think "Wow, I don't want to try and describe that", you SHOULD comment it before you forget how it works. Comments MAY be removed by JS compression utilities later, so they don't negatively impact the file download size.
- Non-JSDoc comments SHOULD use capitalized sentences with punctuation. Comments SHOULD be on a separate line, immediately before the code line or block they reference.
- If each line of a list needs a separate comment, comments MAY be placed on the same line and MAY be formatted to a uniform indent for readability.
- C style comments (`/* */`) and standard C++ comments (`//`) are both allowed.

## String Concatenation
- Expressions SHOULD be separated with one space before and after the `+` operator to improve readability.
- The concatenating assignment operator (`+=`) SHOULD be separated with one space on each side as with the assignment operator:

## Control Structures
- Control statements MUST have one space between the control keyword and opening parenthesis, to distinguish them from function calls.
- Control structures MUST always use curly braces, even in situations where they are optional. Having them increases readability and decreases the likelihood of logic errors being introduced when new lines are added.
- These include `if, for, while, switch`.
- Example `if` statement (the most complicated one):

## switch
- For `switch` statements:

## try
- For `try/catch` statements:

## for in
- The body of every `for in` statement MUST be wrapped in an `if` statement that performs the filtering. It MAY select for a particular type or range of values, or it can exclude functions, or it can exclude properties from the prototype.
- You MUST use the `hasOwnProperty` method to distinguish the true members of the object, which SHOULD be placed inside the loop, not on the same line:

## Operators

## Comparisons
- The `==` and `!=` operators do type coercion before comparing. This can lead to unexpected errors.
- Strict equality MUST be used in comparisons (`===` or `!==`).

## Comma Operator
- You SHOULD NOT use the comma operator, with the exception of the control part in `for` statements.
- The comma operator causes the expressions on either side of it to be executed in left-to-right order, and returns the value of the expression on the right.
- This sets `x` to `9`. This can be confusing for users not familiar with the syntax and makes the code more difficult to read and understand.

- [javascript](/taxonomy/term/188579)
- [coding standards](/taxonomy/term/190104)

## jQuery coding standards

## jQuery coding standards

## Prefix variables that point to jQuery objects with a dollar sign($)
- In any part of your code it should be easy to understand which variables are jQuery objects and which are not.
- *Incorrect**
- When assigning a jQuery object to a variable:
- When assigning a jQuery object to a property:
- When assigning a jQuery object to a variable:
- When assigning a jQuery object to a property:

## Avoid compatibility issues
- jQuery is evolving quickly but attempts to maintain backward compatibility with previous releases. Although multiple jQuery versions are not officially supported within a single Drupal major release, many sites use the [jQuery update](http://drupal.org/project/issues/jquery_update) module to take advantage of performance and bug fixes offered by newer versions of jQuery. Custom modules using jQuery should keep up to date with syntax best-practices in order to avoid conflicts with updated versions.

## Chaining
- For chaining selector you can either use CSS method $(' a b > c') or JavaScript chaining $('a').find('b').children('c'). Second method is slightly faster([test](http://jsperf.com/jquery-chaning/2)). In both cases reduce the weight of selector(if possible). In case .children() and .find() will return the same results, use .find() method ([test](http://jsperf.com/jquery-chaning/2)).
- *Incorrect**

## Event Delegation
- Every event (e.g. click, mouseover, etc.) in JavaScript “bubbles” up the DOM tree to parent elements. This is incredibly useful when you want many elements to call the same function. Instead of binding an event listener function to all of them, you can bind it once to their parent, and have it figure out which node triggered the event.
- In examples of jQuery code, you may often see events simply `return false;` to prevent the default behavior of that event. This type of prevention is often [misused](http://fuelyourcoding.com/jquery-events-stop-misusing-return-false/) and also prevents the "bubbling" propagation of the event. This effect is not always [desired](https://drupal.org/node/1749782). If you wish to either prevent the default behavior or stop propagation, they should be explicitly defined.
- *Incorrect**
- *Correct (Drupal 7)**
- *Correct (Drupal 8)**

## Functions
- Separate your functions into individual functions and call them when needed.
- *Incorrect**

## Context
- Always try to give your selectors a context. The default context will search the entire page's DOM. If the context is a cached selection, use find().
- *Incorrect**
- *Improved**

## Using #id or .class
- Finding elements by the tag ID is *much* faster ([test](http://jsperf.com/id-vs-class-vs-tag-selectors/2)) than by class name. If your target element appears on the page only once, select it by #id. In case when you have more than one, use class but descend from an #id. See the above [context](#context) code examples.

## jQuery.attr()
- *This applies only for D6 and D7** because D8 will ship with jQuery 1.9+ which instead uses .prop() for property.
- Wrong use of .attr is the cause of the many compatibility problems. Use booleans to set a property, not an empty string. Also, do not assume that property values that are returned are always booleans. `.attr('checked')` could return either `true` or `'checked'` depending on jQuery version and markup.
- *Incorrect**

## jQuery.each()
- This method is indeed very powerful (and appropriate) when dealing with existing instantiated jQuery objects and the need to iterate on them.
- It is often misused when needing to iterate over simple native JavaScript arrays or objects. Using native JavaScript `for` loops are *300-1000 times* faster than jQuery.each() ([test](http://jsperf.com/jquery-each-vs-quickeach/83)).
- *Incorrect**

## List of SQL reserved words

## List of SQL reserved words
- The list below represents a combination of the following sources of SQL reserved words:
- [ANSI SQL 92](http://developer.mimer.se/validator/sql-reserved-words.tml)
- [ANSI SQL 99](http://developer.mimer.se/validator/sql-reserved-words.tml)
- [ANSI SQL 2003](http://developer.mimer.se/validator/sql-reserved-words.tml)
- [MySQL 3.23.x](http://www.educat.hu-berlin.de/doc/mysql-3.23/manual_Reference.html#Reserved_words)
- [MySQL 4.x](http://dev.mysql.com/doc/refman/4.1/en/reserved-words.html)
- [MySQL 5.x](http://dev.mysql.com/doc/refman/5.7/en/keywords.html)
- [MySQL 8.x](https://dev.mysql.com/doc/refman/8.0/en/keywords.html)
- [PostGreSQL 8.1](http://www.postgresql.org/docs/8.1/static/sql-keywords-appendix.html)
- [MS SQL Server 2000](http://msdn2.microsoft.com/en-us/library/aa238507)
- [MS ODBC](http://msdn2.microsoft.com/en-us/library/aa238507)
- [Oracle 10.2](http://download-west.oracle.com/docs/cd/B19306_01/server.102/b14200/ap_keywd.htm)
- There are undoubtedly more sources that we should add to this list, but this makes a very good starting point.

## Reserved Words
- 4.  ABSOLUTE
- 11.  AGGREGATE
- 14.  ALLOCATE
- 17.  ALWAYS
- 18.  ANALYSE
- 19.  ANALYZE
- 26.  ASENSITIVE
- 27.  ASSERTION
- 28.  ASSIGNMENT
- 29.  ASYMMETRIC
- 31.  ATOMIC
- 32.  ATTRIBUTE
- 33.  ATTRIBUTES
- 35.  AUTHORIZATION
- 36.  AUTO\_INCREMENT
- 38.  AVG\_ROW\_LENGTH
- 39.  BACKUP
- 40.  BACKWARD
- 41.  BEFORE
- 43.  BERNOULLI
- 44.  BETWEEN
- 45.  BIGINT
- 46.  BINARY
- 48.  BIT\_LENGTH
- 49.  BITVAR
- 52.  BOOLEAN
- 54.  BREADTH
- 56.  BROWSE
- 62.  CALLED
- 63.  CARDINALITY
- 64.  CASCADE
- 65.  CASCADED
- 68.  CATALOG
- 69.  CATALOG\_NAME
- 71.  CEILING
- 73.  CHANGE
- 75.  CHAR\_LENGTH
- 76.  CHARACTER
- 77.  CHARACTER\_LENGTH
- 78.  CHARACTER\_SET\_CATALOG
- 79.  CHARACTER\_SET\_NAME
- 80.  CHARACTER\_SET\_SCHEMA
- 81.  CHARACTERISTICS
- 82.  CHARACTERS
- 84.  CHECKED
- 85.  CHECKPOINT
- 86.  CHECKSUM
- 88.  CLASS\_ORIGIN
- 91.  CLUSTER
- 92.  CLUSTERED
- 93.  COALESCE
- 95.  COLLATE
- 96.  COLLATION
- 97.  COLLATION\_CATALOG
- 98.  COLLATION\_NAME
- 99.  COLLATION\_SCHEMA
- 100.  COLLECT
- 101.  COLUMN
- 102.  COLUMN\_NAME
- 103.  COLUMNS
- 104.  COMMAND\_FUNCTION
- 105.  COMMAND\_FUNCTION\_CODE
- 106.  COMMENT
- 107.  COMMIT
- 108.  COMMITTED
- 109.  COMPLETION
- 110.  COMPRESS
- 111.  COMPUTE
- 112.  CONDITION
- 113.  CONDITION\_NUMBER
- 114.  CONNECT
- 115.  CONNECTION
- 116.  CONNECTION\_NAME
- 117.  CONSTRAINT
- 118.  CONSTRAINT\_CATALOG
- 119.  CONSTRAINT\_NAME
- 120.  CONSTRAINT\_SCHEMA
- 121.  CONSTRAINTS
- 122.  CONSTRUCTOR
- 123.  CONTAINS
- 124.  CONTAINSTABLE
- 125.  CONTINUE
- 126.  CONVERSION
- 127.  CONVERT
- 130.  CORRESPONDING
- 131.  COUNT
- 132.  COVAR\_POP
- 133.  COVAR\_SAMP
- 134.  CREATE
- 135.  CREATEDB
- 136.  CREATEROLE
- 137.  CREATEUSER
- 138.  CROSS
- 141.  CUME\_DIST
- 142.  CURRENT
- 143.  CURRENT\_DATE
- 144.  CURRENT\_DEFAULT\_TRANSFORM\_GROUP
- 145.  CURRENT\_PATH
- 146.  CURRENT\_ROLE
- 147.  CURRENT\_TIME
- 148.  CURRENT\_TIMESTAMP
- 149.  CURRENT\_TRANSFORM\_GROUP\_FOR\_TYPE
- 150.  CURRENT\_USER
- 151.  CURSOR
- 152.  CURSOR\_NAME
- 153.  CYCLE
- 155.  DATABASE
- 156.  DATABASES
- 158.  DATETIME
- 159.  DATETIME\_INTERVAL\_CODE
- 160.  DATETIME\_INTERVAL\_PRECISION
- 162.  DAY\_HOUR
- 163.  DAY\_MICROSECOND
- 164.  DAY\_MINUTE
- 165.  DAY\_SECOND
- 166.  DAYOFMONTH
- 167.  DAYOFWEEK
- 168.  DAYOFYEAR
- 170.  DEALLOCATE
- 172.  DECIMAL
- 173.  DECLARE
- 174.  DEFAULT
- 175.  DEFAULTS
- 176.  DEFERRABLE
- 177.  DEFERRED
- 178.  DEFINED
- 179.  DEFINER
- 180.  DEGREE
- 181.  DELAY\_KEY\_WRITE
- 182.  DELAYED
- 183.  DELETE
- 184.  DELIMITER
- 185.  DELIMITERS
- 186.  DENSE\_RANK
- 188.  DEPTH
- 189.  DEREF
- 190.  DERIVED
- 192.  DESCRIBE
- 193.  DESCRIPTOR
- 194.  DESTROY
- 195.  DESTRUCTOR
- 196.  DETERMINISTIC
- 197.  DIAGNOSTICS
- 198.  DICTIONARY
- 199.  DISABLE
- 200.  DISCONNECT
- 202.  DISPATCH
- 203.  DISTINCT
- 204.  DISTINCTROW
- 205.  DISTRIBUTED
- 208.  DOMAIN
- 209.  DOUBLE
- 212.  DUMMY
- 214.  DYNAMIC
- 215.  DYNAMIC\_FUNCTION
- 216.  DYNAMIC\_FUNCTION\_CODE
- 218.  ELEMENT
- 220.  ELSEIF
- 221.  ENABLE
- 222.  ENCLOSED
- 223.  ENCODING
- 224.  ENCRYPTED
- 226.  END-EXEC
- 228.  EQUALS
- 229.  ERRLVL
- 230.  ESCAPE
- 231.  ESCAPED
- 232.  EVERY
- 233.  EXCEPT
- 234.  EXCEPTION
- 235.  EXCLUDE
- 236.  EXCLUDING
- 237.  EXCLUSIVE
- 239.  EXECUTE
- 240.  EXISTING
- 241.  EXISTS
- 244.  EXPLAIN
- 245.  EXTERNAL
- 246.  EXTRACT
- 247.  FALSE
- 248.  FETCH
- 249.  FIELDS
- 251.  FILLFACTOR
- 252.  FILTER
- 253.  FINAL
- 254.  FIRST
- 255.  FLOAT
- 256.  FLOAT4
- 257.  FLOAT8
- 258.  FLOOR
- 259.  FLUSH
- 260.  FOLLOWING
- 262.  FORCE
- 263.  FOREIGN
- 264.  FORTRAN
- 265.  FORWARD
- 266.  FOUND
- 268.  FREETEXT
- 269.  FREETEXTTABLE
- 270.  FREEZE
- 273.  FULLTEXT
- 274.  FUNCTION
- 275.  FUSION
- 277.  GENERAL
- 278.  GENERATED
- 280.  GLOBAL
- 283.  GRANT
- 284.  GRANTED
- 285.  GRANTS
- 286.  GREATEST
- 287.  GROUP
- 288.  GROUPING
- 289.  HANDLER
- 290.  HAVING
- 291.  HEADER
- 293.  HIERARCHY
- 294.  HIGH\_PRIORITY
- 296.  HOLDLOCK
- 298.  HOSTS
- 300.  HOUR\_MICROSECOND
- 301.  HOUR\_MINUTE
- 302.  HOUR\_SECOND
- 303.  IDENTIFIED
- 304.  IDENTITY
- 305.  IDENTITY\_INSERT
- 306.  IDENTITYCOL
- 308.  IGNORE
- 309.  ILIKE
- 310.  IMMEDIATE
- 311.  IMMUTABLE
- 312.  IMPLEMENTATION
- 313.  IMPLICIT
- 315.  INCLUDE
- 316.  INCLUDING
- 317.  INCREMENT
- 318.  INDEX
- 319.  INDICATOR
- 320.  INFILE
- 321.  INFIX
- 322.  INHERIT
- 323.  INHERITS
- 324.  INITIAL
- 325.  INITIALIZE
- 326.  INITIALLY
- 327.  INNER
- 328.  INOUT
- 329.  INPUT
- 330.  INSENSITIVE
- 331.  INSERT
- 332.  INSERT\_ID
- 333.  INSTANCE
- 334.  INSTANTIABLE
- 335.  INSTEAD
- 342.  INTEGER
- 343.  INTERSECT
- 344.  INTERSECTION
- 345.  INTERVAL
- 347.  INVOKER
- 350.  ISNULL
- 351.  ISOLATION
- 352.  ITERATE
- 356.  KEY\_MEMBER
- 357.  KEY\_TYPE
- 360.  LANCOMPILER
- 361.  LANGUAGE
- 362.  LARGE
- 364.  LAST\_INSERT\_ID
- 365.  LATERAL
- 367.  LEADING
- 368.  LEAST
- 369.  LEAVE
- 371.  LENGTH
- 373.  LEVEL
- 375.  LIMIT
- 376.  LINENO
- 377.  LINES
- 378.  LISTEN
- 381.  LOCAL
- 382.  LOCALTIME
- 383.  LOCALTIMESTAMP
- 384.  LOCATION
- 385.  LOCATOR
- 387.  LOGIN
- 390.  LONGBLOB
- 391.  LONGTEXT
- 393.  LOW\_PRIORITY
- 394.  LOWER
- 397.  MATCH
- 398.  MATCHED
- 400.  MAX\_ROWS
- 401.  MAXEXTENTS
- 402.  MAXVALUE
- 403.  MEDIUMBLOB
- 404.  MEDIUMINT
- 405.  MEDIUMTEXT
- 406.  MEMBER
- 407.  MERGE
- 408.  MESSAGE\_LENGTH
- 409.  MESSAGE\_OCTET\_LENGTH
- 410.  MESSAGE\_TEXT
- 411.  METHOD
- 412.  MIDDLEINT
- 414.  MIN\_ROWS
- 415.  MINUS
- 416.  MINUTE
- 417.  MINUTE\_MICROSECOND
- 418.  MINUTE\_SECOND
- 419.  MINVALUE
- 420.  MLSLABEL
- 423.  MODIFIES
- 424.  MODIFY
- 425.  MODULE
- 426.  MONTH
- 427.  MONTHNAME
- 430.  MULTISET
- 431.  MUMPS
- 432.  MYISAM
- 434.  NAMES
- 435.  NATIONAL
- 436.  NATURAL
- 437.  NCHAR
- 438.  NCLOB
- 439.  NESTING
- 443.  NO\_WRITE\_TO\_BINLOG
- 444.  NOAUDIT
- 445.  NOCHECK
- 446.  NOCOMPRESS
- 447.  NOCREATEDB
- 448.  NOCREATEROLE
- 449.  NOCREATEUSER
- 450.  NOINHERIT
- 451.  NOLOGIN
- 452.  NONCLUSTERED
- 454.  NORMALIZE
- 455.  NORMALIZED
- 456.  NOSUPERUSER
- 458.  NOTHING
- 459.  NOTIFY
- 460.  NOTNULL
- 461.  NOWAIT
- 463.  NULLABLE
- 464.  NULLIF
- 465.  NULLS
- 466.  NUMBER
- 467.  NUMERIC
- 468.  OBJECT
- 469.  OCTET\_LENGTH
- 470.  OCTETS
- 473.  OFFLINE
- 474.  OFFSET
- 475.  OFFSETS
- 479.  ONLINE
- 482.  OPENDATASOURCE
- 483.  OPENQUERY
- 484.  OPENROWSET
- 485.  OPENXML
- 486.  OPERATION
- 487.  OPERATOR
- 488.  OPTIMIZE
- 489.  OPTION
- 490.  OPTIONALLY
- 491.  OPTIONS
- 493.  ORDER
- 494.  ORDERING
- 495.  ORDINALITY
- 496.  OTHERS
- 498.  OUTER
- 499.  OUTFILE
- 500.  OUTPUT
- 502.  OVERLAPS
- 503.  OVERLAY
- 504.  OVERRIDING
- 505.  OWNER
- 506.  PACK\_KEYS
- 508.  PARAMETER
- 509.  PARAMETER\_MODE
- 510.  PARAMETER\_NAME
- 511.  PARAMETER\_ORDINAL\_POSITION
- 512.  PARAMETER\_SPECIFIC\_CATALOG
- 513.  PARAMETER\_SPECIFIC\_NAME
- 514.  PARAMETER\_SPECIFIC\_SCHEMA
- 515.  PARAMETERS
- 516.  PARTIAL
- 517.  PARTITION
- 518.  PASCAL
- 519.  PASSWORD
- 521.  PCTFREE
- 522.  PERCENT
- 523.  PERCENT\_RANK
- 524.  PERCENTILE\_CONT
- 525.  PERCENTILE\_DISC
- 526.  PLACING
- 529.  POSITION
- 530.  POSTFIX
- 531.  POWER
- 532.  PRECEDING
- 533.  PRECISION
- 534.  PREFIX
- 535.  PREORDER
- 536.  PREPARE
- 537.  PREPARED
- 538.  PRESERVE
- 539.  PRIMARY
- 540.  PRINT
- 541.  PRIOR
- 542.  PRIVILEGES
- 544.  PROCEDURAL
- 545.  PROCEDURE
- 546.  PROCESS
- 547.  PROCESSLIST
- 548.  PUBLIC
- 549.  PURGE
- 550.  QUOTE
- 551.  RAID0
- 552.  RAISERROR
- 553.  RANGE
- 557.  READS
- 558.  READTEXT
- 560.  RECHECK
- 561.  RECONFIGURE
- 562.  RECURSIVE
- 564.  REFERENCES
- 565.  REFERENCING
- 566.  REGEXP
- 567.  REGR\_AVGX
- 568.  REGR\_AVGY
- 569.  REGR\_COUNT
- 570.  REGR\_INTERCEPT
- 571.  REGR\_R2
- 572.  REGR\_SLOPE
- 573.  REGR\_SXX
- 574.  REGR\_SXY
- 575.  REGR\_SYY
- 576.  REINDEX
- 577.  RELATIVE
- 578.  RELEASE
- 579.  RELOAD
- 580.  RENAME
- 581.  REPEAT
- 582.  REPEATABLE
- 583.  REPLACE
- 584.  REPLICATION
- 585.  REQUIRE
- 586.  RESET
- 587.  RESIGNAL
- 588.  RESOURCE
- 589.  RESTART
- 590.  RESTORE
- 591.  RESTRICT
- 592.  RESULT
- 593.  RETURN
- 594.  RETURNED\_CARDINALITY
- 595.  RETURNED\_LENGTH
- 596.  RETURNED\_OCTET\_LENGTH
- 597.  RETURNED\_SQLSTATE
- 598.  RETURNS
- 599.  REVOKE
- 600.  RIGHT
- 601.  RLIKE
- 603.  ROLLBACK
- 604.  ROLLUP
- 605.  ROUTINE
- 606.  ROUTINE\_CATALOG
- 607.  ROUTINE\_NAME
- 608.  ROUTINE\_SCHEMA
- 610.  ROW\_COUNT
- 611.  ROW\_NUMBER
- 612.  ROWCOUNT
- 613.  ROWGUIDCOL
- 614.  ROWID
- 615.  ROWNUM
- 619.  SAVEPOINT
- 620.  SCALE
- 621.  SCHEMA
- 622.  SCHEMA\_NAME
- 623.  SCHEMAS
- 624.  SCOPE
- 625.  SCOPE\_CATALOG
- 626.  SCOPE\_NAME
- 627.  SCOPE\_SCHEMA
- 628.  SCROLL
- 629.  SEARCH
- 630.  SECOND
- 631.  SECOND\_MICROSECOND
- 632.  SECTION
- 633.  SECURITY
- 634.  SELECT
- 636.  SENSITIVE
- 637.  SEPARATOR
- 638.  SEQUENCE
- 639.  SERIALIZABLE
- 640.  SERVER\_NAME
- 641.  SESSION
- 642.  SESSION\_USER
- 644.  SETOF
- 646.  SETUSER
- 647.  SHARE
- 649.  SHUTDOWN
- 650.  SIGNAL
- 651.  SIMILAR
- 652.  SIMPLE
- 654.  SMALLINT
- 656.  SONAME
- 657.  SOURCE
- 658.  SPACE
- 659.  SPATIAL
- 660.  SPECIFIC
- 661.  SPECIFIC\_NAME
- 662.  SPECIFICTYPE
- 664.  SQL\_BIG\_RESULT
- 665.  SQL\_BIG\_SELECTS
- 666.  SQL\_BIG\_TABLES
- 667.  SQL\_CALC\_FOUND\_ROWS
- 668.  SQL\_LOG\_OFF
- 669.  SQL\_LOG\_UPDATE
- 670.  SQL\_LOW\_PRIORITY\_UPDATES
- 671.  SQL\_SELECT\_LIMIT
- 672.  SQL\_SMALL\_RESULT
- 673.  SQL\_WARNINGS
- 674.  SQLCA
- 675.  SQLCODE
- 676.  SQLERROR
- 677.  SQLEXCEPTION
- 678.  SQLSTATE
- 679.  SQLWARNING
- 682.  STABLE
- 683.  START
- 684.  STARTING
- 685.  STATE
- 686.  STATEMENT
- 687.  STATIC
- 688.  STATISTICS
- 689.  STATUS
- 690.  STDDEV\_POP
- 691.  STDDEV\_SAMP
- 692.  STDIN
- 693.  STDOUT
- 694.  STORAGE
- 695.  STRAIGHT\_JOIN
- 696.  STRICT
- 697.  STRING
- 698.  STRUCTURE
- 699.  STYLE
- 700.  SUBCLASS\_ORIGIN
- 701.  SUBLIST
- 702.  SUBMULTISET
- 703.  SUBSTRING
- 704.  SUCCESSFUL
- 706.  SUPERUSER
- 707.  SYMMETRIC
- 708.  SYNONYM
- 709.  SYSDATE
- 710.  SYSID
- 711.  SYSTEM
- 712.  SYSTEM\_USER
- 713.  TABLE
- 714.  TABLE\_NAME
- 715.  TABLES
- 716.  TABLESAMPLE
- 717.  TABLESPACE
- 719.  TEMPLATE
- 720.  TEMPORARY
- 721.  TERMINATE
- 722.  TERMINATED
- 724.  TEXTSIZE
- 729.  TIMESTAMP
- 730.  TIMEZONE\_HOUR
- 731.  TIMEZONE\_MINUTE
- 732.  TINYBLOB
- 733.  TINYINT
- 734.  TINYTEXT
- 736.  TOAST
- 738.  TOP\_LEVEL\_COUNT
- 739.  TRAILING
- 741.  TRANSACTION
- 742.  TRANSACTION\_ACTIVE
- 743.  TRANSACTIONS\_COMMITTED
- 744.  TRANSACTIONS\_ROLLED\_BACK
- 745.  TRANSFORM
- 746.  TRANSFORMS
- 747.  TRANSLATE
- 748.  TRANSLATION
- 749.  TREAT
- 750.  TRIGGER
- 751.  TRIGGER\_CATALOG
- 752.  TRIGGER\_NAME
- 753.  TRIGGER\_SCHEMA
- 756.  TRUNCATE
- 757.  TRUSTED
- 758.  TSEQUAL
- 760.  UESCAPE
- 762.  UNBOUNDED
- 763.  UNCOMMITTED
- 764.  UNDER
- 766.  UNENCRYPTED
- 767.  UNION
- 768.  UNIQUE
- 769.  UNKNOWN
- 770.  UNLISTEN
- 771.  UNLOCK
- 772.  UNNAMED
- 773.  UNNEST
- 774.  UNSIGNED
- 775.  UNTIL
- 776.  UPDATE
- 777.  UPDATETEXT
- 778.  UPPER
- 779.  USAGE
- 782.  USER\_DEFINED\_TYPE\_CATALOG
- 783.  USER\_DEFINED\_TYPE\_CODE
- 784.  USER\_DEFINED\_TYPE\_NAME
- 785.  USER\_DEFINED\_TYPE\_SCHEMA
- 786.  USING
- 787.  UTC\_DATE
- 788.  UTC\_TIME
- 789.  UTC\_TIMESTAMP
- 790.  VACUUM
- 791.  VALID
- 792.  VALIDATE
- 793.  VALIDATOR
- 794.  VALUE
- 795.  VALUES
- 796.  VAR\_POP
- 797.  VAR\_SAMP
- 798.  VARBINARY
- 799.  VARCHAR
- 800.  VARCHAR2
- 801.  VARCHARACTER
- 802.  VARIABLE
- 803.  VARIABLES
- 804.  VARYING
- 805.  VERBOSE
- 807.  VOLATILE
- 808.  WAITFOR
- 810.  WHENEVER
- 811.  WHERE
- 812.  WHILE
- 813.  WIDTH\_BUCKET
- 814.  WINDOW
- 816.  WITHIN
- 817.  WITHOUT
- 819.  WRITE
- 820.  WRITETEXT
- 824.  YEAR\_MONTH
- 825.  ZEROFILL

## Markdown

## Markdown
- This topic is currently being discussed:
- [#2952616: Adopt CommonMark spec for Markdown files](/project/coding_standards/issues/2952616 "Status: Needs review")
- [#2191525: \[PP-1\]\[policy, no patch\] Extend Markdown coding standards to support API module (DOXYGEN)](/project/coding_standards/issues/2191525 "Status: Postponed")

- [coding standards](/taxonomy/term/190104)

## Namespaces

## Namespaces
- PHP 5.3 introduces [namespaces](http://www.php.net/namespaces) to the language. This page document shows how namespaces should be referenced within Drupal and it assumes that you are familiar with the concept of namespaces. (If not, you can have a look at this [article introducing namespaces](http://www.sitepoint.com/php-53-namespaces-basics/).)
- Not all files in Drupal declare a namespace. As of Drupal 8 an increasing number of files do, but not all. Prior to Drupal 8 virtually no code used namespaces, in order to remain compatible with PHP 5.2. Therefore there are two slightly different standards.

## "use"-ing classes
- Classes and interfaces with a backslash `\` inside their fully-qualified name (for example: `Drupal\simpletest\WebTestBase`) must not use their fully-qualified name inside the code. If the namespace differs from the namespace of the current file, put a `use` statement on the top of the file. For example:
- Classes and interfaces without a backslash `\` inside their fully-qualified name (for example, the built-in PHP Exception class) must be fully qualified when used in a namespaced file. For example: `new \Exception();`. Do not `use` global classes.
- In a file that does not declare a namespace (and is therefore in the global namespace), classes in any namespace other than global must be specified with a "use" statement at the top of the file.
- When importing a class with "use", do not include a leading `\`. (The [PHP documentation](http://www.php.net/manual/en/language.namespaces.importing.php) makes the same recommendation.)
- When specifying a class name in a string, use its full name including namespace, without leading `\`.
- Escape the namespace separator in double-quoted strings: `"Drupal\\Context\\ContextInterface"`
- Do not escape it in single-quoted strings: `'Drupal\Context\ContextInterface'`
- As stated elsewhere, single-quoted strings are generally preferred.
- Specify a single class per use statement. Do not specify multiple classes in a single use statement.
- If there are multiple use declarations in a file, we do not currently have a standard about what order they should be in. However, consider code readability and do something sensible, especially if there are many use declarations.
- API documentation (in .api.php files) should use full class names. Note that if a class is used more than once in multiple hook signatures, it must still be "use"ed, and then only the short names of the class should be used in the function.

## Class aliasing
- PHP allows classes to be aliased when they are imported into a namespace. In general that should only be done to avoid a name collision. If a collision happens, alias both colliding classes by prefixing the next higher portion of the namespace.
- That helps keep clear which one is which, and where it comes from. Aliasing should only be done to avoid name collisions.

## Order of import
- If there are more than one classes to 'use', there is no specific rule to order them.

## Modules
- Modules creating classes should place their code inside a custom namespace. The convention for those namespaces begins:
- Drupal\\*<module name>*\\...
- [Drupal 8 supports PSR-4](https://www.drupal.org/docs/develop/coding-standards/psr-4-namespaces-and-autoloading-in-drupal-8), so to permit class autodiscovery, a class in the folder:
- <module folder>*/src/SubFolder1/SubFolder2
- should declare the namespace:
- Drupal\\*<module name>*\\SubFolder1\\SubFolder2
- Note that the /src/ subfolder is omitted from the namespace.

## Examples
- Class *Drupal\\example\_module\\Foo* in namespace *Drupal\\example\_module* should be in a file named *example\_module/src/Foo.php*
- Class *Drupal\\example\_module\\Foo\\Bar* in namespace *Drupal\\example\_module\\Foo* should be in a file named *example\_module/src/Foo/Bar.php*

## Naming standards for services and extending Symfony

## Naming standards for services and extending Symfony

## Manipulating the Request object:
- Elements added to the attributes of the Request object by any Drupal module or service should have a "\_" prepended unless they come from the path.
- Only values that come from the path will have the "\_" omitted, for example, the path pattern /node/{node}.
- Drupal core and Symfony typically add some prefixed attributes that should not be overwritten by a contributed module. These include:
- (Note that \_account is being removed in [#2073531: Use current user service instead of \_account, remove \_account from the request object](/project/drupal/issues/2073531 "Status: Closed (fixed)").)
- and from Symfony\\Cmf\\Component\\Routing\\RouteObjectInterface:
- See the [the original change notice](/node/2083979).

## Arrays
- Arrays should be formatted using short array syntax with a space separating each element (after the comma), and spaces around the => key association operator, if applicable:
- Note that if the line declaring an array spans longer than 80 characters (often the case with form and menu declarations), each element should be broken into its own line, and indented one level:
- Note that, as seen above, in multi-line arrays there MUST be a comma after the last array element. This helps prevent parsing errors if another element is placed at the end of the list later.

## Casting
- Put a space between the (type) and the $variable in a cast: `(int) $mynumber`.

## Chaining
- PHP allows objects returned from functions and methods to be "chained", that is, a method on the returned object may be called immediately. This is known as a 'fluent interface.' Here is an example:
- As a general rule, a method should return $this, and thus be chainable, in any case where there is no other logical return value. Common examples are those methods that set some state or property on the object. It is better in those cases to return $this rather than TRUE/FALSE or NULL.
- In the case where you have a fluent interface for a class, and the code spans more than one line, the method calls should be indented with 2 spaces:

## Class Constructor Calls
- When calling class constructors with no arguments, always include parentheses:
- This is to maintain consistency with constructors that have arguments:
- Note that if the class name is a variable, the variable will be evaluated first to get the class name, and then the constructor will be called. Use the same syntax:

## Comments
- Comment standards are discussed on the separate [Doxygen and comment formatting conventions page](http://drupal.org/node/1354).

## Control Structures
- Control structures include if, for, while, switch, etc. Here is a sample if statement, since it is the most complicated of them:
- (Note: Don't use "else if" -- always use elseif.)
- Control statements should have one space between the control keyword and opening parenthesis, to distinguish them from function calls.
- Always use curly braces even in situations where they are technically optional. Having them increases readability and decreases the likelihood of logic errors being introduced when new lines are added. The opening curly should be on the same line as the opening statement, preceded by one space. The closing curly should be on a line by itself and indented to the same level as the opening statement.
- For switch statements, always use a colon after the case condition. There must be no space between the condition and the colon. For example:
- For do-while statements:

## Alternate control statement syntax for templates
- In templates, the alternate control statement syntax using : instead of brackets is allowed. Note that there should not be a space between the closing parenthesis after the control keyword, and the colon, and HTML/PHP inside the control structure should be indented. For example:

## Declaring Classes
- Where to define and place your classes?
- Best practices include having one class or interface or trait per file. That file should be named for the class, such that the file name for `FooInterface` would be `FooInterface.php`.
- From Drupal 8, classes are autoloaded based on the [PSR-4](http://www.php-fig.org/psr/psr-4/) namespacing convention.
- In core, the PSR-4 'tree' starts under `core/lib/`.
- In modules, including contrib, custom and those in core, the PSR-4 'tree' starts under `modulename/src`.
- Defining a class in your module's `.module` file is only possible if the class does not have a superclass which might not be available when the `.module` file is loaded. It's best practice to move such classes into a PSR-4 source directory.

## Example URLs
- Use "example.com" for all example URLs, per [RFC 2606](http://www.rfc-editor.org/rfc/rfc2606.txt).

## Function Calls
- Functions should be called with no spaces between the function name, the opening parenthesis, and the first parameter; spaces between commas and each parameter, and no space between the last parameter, the closing parenthesis, and the semicolon. Here's an example:

## Function Declarations
- Argument lists may be split across multiple lines, where each subsequent line is indented once.
- When the argument list is split across multiple lines
- The first item in the list must be on the next line.
- There must be only one argument per line.
- The last argument in the list must use a trailing comma.
- The closing parenthesis and opening brace must be placed together on their own line with one space between them.
- Anonymous functions should have a space between "function" and its parameters, as in the following example:

## Including Code
- Anywhere you are unconditionally including a class file, use `require_once()`. Anywhere you are conditionally including a class file (for example, factory methods), use `include_once()`. Either of these will ensure that class files are included only once. They share the same file list, so you don't need to worry about mixing them - a file included with `require_once()` will not be included again by `include_once()`.
- Note: `include_once()` and `require_once()` are statements, not functions. You don't need parentheses around the file name to be included.*
- When including code from the same directory or a sub-directory, start the file path with ".":
- `include_once ./includes/mymodule_formatting.inc`
- In Drupal 7.x and later versions, use DRUPAL\_ROOT:
- `require_once DRUPAL_ROOT . '/' . variable_get('cache_inc', 'includes/cache.inc');`
- To include code in a module:

## Indenting and Whitespace
- Use an indent of 2 spaces, with no tabs.
- Lines should have no trailing whitespace at the end.
- Files should be formatted with \\n as the line ending (Unix line endings), not \\r\\n (Windows line endings).
- All text files should end in a single newline (\\n). This avoids the verbose "\\ No newline at end of file" patch warning and makes patches easier to read since it's clearer what is being changed when lines are added to the end of a file.
- All blocks at the beginning of a PHP file should be separated by a blank line. This includes the `/** @file */` block, the namespace declaration and the `use` statements (if present) as well as the subsequent code in the file. So, for example, a file header might look as follows:
- Or, for a non-class file (e.g., `.module`):
- Leave an empty line between start of class/interface definition and property/method definition:
- Leave an empty line between end of property definition and start method definition:
- Leave an empty line between end of method and end of class definition:

## Instantiation
- Creating classes directly is discouraged. Instead, use a factory function that creates the appropriate object and returns it. This provides two benefits:
- 1.  It provides a layer of indirection, as the function may be written to return a different object (with the same interface) in different circumstances as appropriate.
- 2.  PHP does not allow class constructors to be chained, but does allow the return value from a function or method to be chained.

## Line length and wrapping
- The following rules apply to code. See [Doxygen and comment formatting conventions](http://drupal.org/node/1354) for rules pertaining to comments.
- In general, all lines of code should not be longer than 80 characters.
- Lines containing longer function names, function/class definitions, variable declarations, etc are allowed to exceed 80 characters.
- Control structure conditions may exceed 80 characters, if they are simple to read and understand:
- Conditions should not be wrapped into multiple lines.
- Control structure conditions should also NOT attempt to win the *Most Compact Condition In Least Lines Of Code Award™*:
- Instead, it is recommended practice to split out and prepare the conditions separately, which also permits documenting the underlying reasons for the conditions:
- Note: This example is still a bit dense. Always consider and decide on your own whether people unfamiliar with your code will be able to make sense of the logic.*

## Naming Conventions

## Functions and variables
- Functions should be named using lowercase, and words should be separated with an underscore. Functions should in addition have the grouping/module name as a prefix, to avoid name collisions between modules.
- Variables should be named using lowercase, and words should be separated either with uppercase characters (example: `$lowerCamelCase`) or with an underscore (example: `$snake_case`). Be consistent; do not mix camelCase and snake\_case variable naming inside a file.

## Persistent Variables
- Persistent variables (variables/settings defined using Drupal's [variable\_get()](http://api.drupal.org/api/function/variable_get)/[variable\_set()](http://api.drupal.org/api/function/variable_set) functions) should be named using all lowercase letters, and words should be separated with an underscore. They should use the grouping/module name as a prefix, to avoid name collisions between modules.

## Constants
- Constants should always be all-uppercase, with underscores to separate words. (This includes pre-defined PHP constants like `TRUE`, `FALSE`, and `NULL`.)
- Module-defined constant names should also be prefixed by an uppercase spelling of the module that defines them.
- In Drupal 8 and later, constants should be defined using the [`const` PHP language keyword](http://us3.php.net/const) (instead of `define()`), because it is better for performance:
- Note that `const` does not work with PHP expressions. `define()` should be used when defining a constant conditionally or with a non-literal value:

## Global Variables
- If you need to define global variables, their name should start with a single underscore followed by the module/theme name and another underscore.

## Classes, Methods and Properties
- 1.  Classes and interfaces should use UpperCamel naming.
- 2.  Methods and class properties should use lowerCamel naming. In Drupal 8, properties of configuration entities are exempt of these conventions. Those properties are allowed to use underscores.
- 3.  If an acronym is used in a class or method name, make it CamelCase too (SampleXmlClass, not SampleXMLClass). \[Note: this standard was adopted in March 2013, reversing the previous standard.\]
- 4.  Classes should *not* use underscores in class names unless absolutely necessary to derive names inherited class names dynamically. That is quite rare, especially as Drupal does not mandate a class-file naming match.
- 5.  Names should not include "Drupal".
- 6.  Class names should not have "Class" in the name.
- 7.  Interfaces should always have the suffix "Interface".
- 8.  Test classes should always have the suffix "Test".
- 9.  Protected or private properties and methods should not use an underscore prefix.
- 10.  Classes and interfaces should have names that stand alone to tell what they do without having to refer to the namespace, read well, and are as short as possible without losing functionality information or leading to ambiguity. Notes:
- If necessary for clarity or to prevent ambiguity, include the last component of the namespace in the name.
- Exception for Drupal 8.x: due to the way database classes are loaded, do not include the database engine name (MySQL, etc.) in engine-specific database class names.
- Exception for test classes: Test classes only need to be unambiguous within the context of the module they are testing.
- Stand-alone name examples:
- Drupal\\Core\\Database\\Query\\
- QueryCondition
- Condition (ambiguous)
- DatabaseQueryCondition (Database doesn't add to understanding)
- Drupal\\Core\\FileTransfer\\
- LocalFileTransfer
- Local (ambiguous)
- Drupal\\Core\\Cache\\
- CacheDatabaseDriver
- Database (ambiguous/misleading)
- DatabaseDriver (ambiguous/misleading)
- Drupal\\entity\\
- EntityInterface
- DrupalEntity (unnecessary words)
- EntityClass (unnecessary words)
- Drupal\\comment\\Tests\\
- ThreadingTest
- CommentThreadingTest (only needs to be unambiguous in comment context)
- Threading (not ending in Test)
- A complete example of class/interface/method names:

## Enums
- Enums follow the same conventions as [classes](https://www.drupal.org/docs/develop/standards/php/php-coding-standards#s-classes) with the addition that for their cases the enums must use UpperCamelCase.

## File names
- All documentation files should have the file name extension ".txt" to make viewing them on Windows systems easier. Also, the file names for such files should be all-caps (e.g. README.txt instead of readme.txt) while the extension itself is all-lowercase (i.e. txt instead of TXT).
- Examples: README.txt, INSTALL.txt, TODO.txt, CHANGELOG.txt etc.

## Operators
- All binary operators (operators that come between two values), such as `+`, `-`, `=`, `!=`, `==`, `>`, etc. should have a space before and after the operator, for readability. For example, an assignment should be formatted as `$foo = $bar;` rather than `$foo=$bar;`. Unary operators (operators that operate on only one value), such as `++`, should not have a space between the operator and the variable or number they are operating on.
- Checks for weak-typed inequality MUST use the `!=` operator. The `<>` operator MUST NOT be used in PHP code.
- The short ternary operator `?:` must be used where the first operand of a ternary expression matches the condition. For example use:
- instead of:
- since `$condition` matches both the condition and the first operand.
- The null coalescing operator `??` should be used instead of a ternary operator with an isset() condition, to make code more readable. For example use:
- instead of:

## Parameter and return type hinting
- Beginning with Drupal 9, parameter and return type hints should be used wherever possible. Example function definition using parameter and return type hints:

## New functions and methods
- Parameter and return type hints should be included for all new functions and methods, including new child implementations of methods for existing classes and interfaces.

## Existing functions and methods
- Adding type hints to existing code is a backwards compatibility break. Type hints can (and should) be added in a major version if a deprecation warning is first raised in an earlier minor version. See [#3050720: \[Meta\] Implement strict typing in existing code](/project/drupal/issues/3050720 "Status: Active") for strategies and ongoing discussion.

## Notes about specific data types

## Mixed datatypes
- `mixed` is only needed in rare cases where a more specific data type cannot be identified (for example, for the return values of callbacks, or markup strings that can be either markup objects or scalar strings). A need for `mixed` or a [union type](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.union) is often a sign that the code should possibly be refactored.

## Nullable types
- Use [nullable types](https://www.php.net/manual/en/language.types.declarations.php) where the data type may be either a specific type or null.

## Objects
- Use an interface type hint for parameter and return types (not a class). Type hint the most specific interface that encompasses all possible parameter or return values. Do not use `stdClass`.

## Void
- If a function or method does not return anything, use a `void` type hint.
- Always use `<?php ?>` to delimit PHP code, not the shorthand, `<? ?>`. This is required for Drupal compliance and is also the most portable way to include PHP code on differing operating systems and set-ups.
- Note that as of Drupal 4.7, the `?>` at the end of code files is purposely omitted. This includes for module and include files. The reasons for this can be summarized as:
- Removing it eliminates the possibility for unwanted whitespace at the end of files which can cause "header already sent" errors, XHTML/XML validation issues, and other problems.
- The [closing delimiter at the end of a file is optional](http://www.php.net/basic-syntax.instruction-separation).
- PHP.net itself removes the closing delimiter from the end of its files (example: [prepend.inc](https://github.com/php/web-php/blob/master/include/prepend.inc)), so this can be seen as a "best practice."

## Quotes
- Drupal does not have a hard standard for the use of single quotes vs. double quotes. Where possible, keep consistency within each module, and respect the personal style of other developers.
- With that caveat in mind, single quote strings should be used by default. Their use is recommended except in two cases:
- 1.  Deliberate in-line variable interpolation, e.g. "<h2>$header</h2>".
- 2.  Translated strings where one can avoid escaping single quotes by enclosing the string in double quotes. One such string would be "He's a good person." It would be 'He\\'s a good person.' with single quotes. Such escaping may not be handled properly by .pot file generators for text translation, and it's also somewhat awkward to read.

## Semicolons
- The PHP language requires semicolons at the end of most lines, but allows them to be omitted at the end of code blocks. Drupal coding standards require them, even at the end of code blocks. In particular, for one-line PHP blocks:

## Strict type declaration
- If you define strict types for a PHP file, place the declare statement on a new line after the opening PHP tag surrounded by empty newlines. If the PHP file has a file level DocBlock the declare statement should be positioned after that. The declare statement is written without spaces around the equals sign.

## String Concatenations
- Always use a space between the dot and the concatenated parts to improve readability.
- When you concatenate simple variables, you can use double quotes and add the variable inside; otherwise, use single quotes.
- When using the concatenating assignment operator ('.='), use a space on each side as with the assignment operator:

## Use of interfaces
- The use of a separate interface definition from an implementing class is strongly encouraged because it allows more flexibility in extending code later. A separate interface definition also neatly centralizes documentation making it easier to read. All interfaces should be fully documented according to [established documentation standards](http://drupal.org/node/1354#classes).
- If there is even a remote possibility of a class being swapped out for another implementation at some point in the future, split the method definitions off into a formal Interface. A class that is intended to be extended must always provide an Interface that other classes can implement rather than forcing them to extend the base class.

## Visibility

## Methods and Functions
- Visibility must be declared on all methods.
- Method names must not be prefixed with a single underscore to indicate protected or private visibility. That is, an underscore prefix explicitly has no meaning.
- Method and function names must not be declared with space after the method name. The closing brace must go on the next line following the body. There must not be a space after the opening parenthesis, and there must not be a space before the closing parenthesis.

## Properties
- Visibility must be declared on all properties.
- The use of public properties is strongly discouraged, as it allows for unwanted side effects. It also exposes implementation-specific details, which in turn makes swapping out a class for another implementation (one of the key reasons to use objects) much harder. Properties should be considered internal to a class.
- Extract from [PSR-12 section 4.4](https://www.php-fig.org/psr/psr-12/#44-methods-and-functions)*

## abstract, final, and static
- When present, the `abstract` and `final` declarations must precede the visibility declaration.
- When present, the `static` declaration must come after the visibility declaration.
- Extract from [PSR-12 section 4.6](https://www.php-fig.org/psr/psr-12/#46-abstract-final-and-static)*

## Drupal 7 class/interface autoloading
- *Use an .inc file and use files\[\] in the .info file to extend a class or implement an interface.**
- If you include a file that extends a class or implements an interface, PHP generates a fatal error if the parent class or interface is not loaded. So, if a class is provided by a contributed module, or core in some cases, it is not safe to put your classes in a *.module* file. It's better to use an *.inc* file and use `files[]` in your *[.info](/node/542202)* file. For example, even if you have a dependency on a module, it's possible that both your module and the dependency are disabled when your .module file is included. Since the registry won't auto-load a class from a disabled module, this would cause an error. Also, when [hook\_boot()](http://api.drupal.org/api/drupal/core!modules!system!system.api.php/function/hook_boot/7) is run, module dependencies aren't loaded. So, if you add a class, then later implement hook\_boot(), your module could be loaded without the dependency, and that will also generate a fatal error. Using an *.inc* file and using `files[]` in your *[.info](/node/542202)* file is needed to avoid those errors.

## Helper Modules
- There are several contributed modules/projects available to assist with review for coding standards compliance:
- [Coder](http://drupal.org/project/coder) module, which includes both Coder Review (reviews) and Coder Upgrade (updates your code). To use it:
- 1.  Install the module (like any other module)
- 2.  Click on the "Code Review" link in your navigation menu.
- 3.  Scroll down to "Select Specific Modules".
- 4.  Select the module you wish to review, and click the "Submit" button.
- As an alternative to starting from the Code Review link in navigation, you can also review a particular module's code by clicking on the link on the Modules admin screen.
- [Dreditor](https://addons.mozilla.org/en-GB/firefox/addon/dreditor-for-firefox/) (a firefox browser plug-in for reviewing patches and more). [Instructions to install Dreditor on Chrome.](https://www.drupal.org/project/drupal/issues/2281761#comment-13759934)
- [PAReview](http://drupal.org/project/pareviewsh) (a set of scripts for reviewing project applications, which runs some coding tests)
- [Coder Sniffer](http://drupal.org/node/1419980) (runs coding standards validation without loading drupal)
- The [Grammar Parser](http://drupal.org/project/grammar_parser) module provides an automated way of rewriting code files in compliance with code standards. You'll probably also need the [Grammar Parser UI](http://drupal.org/project/grammar_parser_ui) module. These are only available for Drupal 7.

## Basic Exception Naming Conventions
- 1.  As Exceptions are classes, they should follow all [coding standards for object-oriented code](http://drupal.org/node/608152) like any other class.
- 2.  All Exceptions must end with the suffix "Exception".
- 3.  All Exceptions should include an appropriate message and should not be translated. Only messages from the install and update system are currently translated as they are user facing.
- 4.  The Exception's message should include a hint to the values that caused the exception.
- 1.  Formatting messages should be done by concatenating strings or using `sprintf()`.
- 2.  Values should be surrounded by single quotes.
- 3.  **DO NOT** translate the message.
- 4.  **DO NOT** use `SafeMarkup::format()`.
- 5.  Exception classes should be named for the subsystem to which they relate, and the type of error. That is, `[Subsystem][ErrorType]Exception`.

## Exception Subclasses
- The use of subclassed Exceptions is preferred over reusing a single generic Exception class with different error messages as different classes may then be caught separately.

## Example:
- See [the Drupal\\Core\\Entity\\Exception namespace](https://api.drupal.org/api/drupal/namespace/Drupal!Core!Entity!Exception/8.2.x) for real-life examples.

## Try-catch blocks
- Try-catch blocks should follow a similar line-breaking pattern to if-else statements, with each catch statement beginning a new line.

## Inheritance
- PHP requires that all exceptions inherit off of the Exception class, either directly or indirectly.
- When creating a new exception class, it should be named according to the subsystem they relate to and the error message they involve. If a given subsystem includes multiple exceptions, they should all extend from a common base exception. That allows for multiple catch blocks as necessary.

- The Drupal coding standards for PHP.
- PHP standards are enforced using [PHP\_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer). The rules used are from that project as well as the [Drupal coder project](https://drupal.org/project/coder) and [Slevomat](https://github.com/slevomat/coding-standard).
- The Drupal Coding Standards apply to code within Drupal and its contributed modules.
- Standards for API documentation blocks in PHP code
- This page is intended to be a collection of the complete API documentation examples
- Standards having to do with namespaces
- Standards for services and Symfony usage
- Basic conventions, exception subclasses, try-catch blocks, inheritance
- Summary of how Drupal 8 uses the PSR-4 standard for namespace autoloading
- Standards for what to call delimiters and placeholders in code
- Adjusting the error reporting level

- [coding standards](/taxonomy/term/190104)

## Guide maintainers
- [![quietone's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/user-pictures/picture-2572884-1413636022.png?itok=hb37HODX)](/user/2572884 "View quietone's profile")
- [![bbrala's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/user-pictures/picture-3366066-1642414976.jpg?itok=pzSXRszK)](/user/3366066 "View bbrala's profile")

## PSR-4 namespaces and autoloading in Drupal 8

## PSR-4 namespaces and autoloading in Drupal 8

## Summary
- Drupal 8 implements the [PSR-4 standard](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md) for package-based PHP namespace autoloading by the PHP Framework Interoperability Group. Upgrading [Drupal 7 modules to Drupal 8](https://www.drupal.org/update/modules/7/8) will require using [PSR-4](https://www.drupal.org/taxonomy/term/51071) standards. See [more background info on Drupal 8 development here](https://www.drupal.org/getting-started-d8-bkg-prereq). Autoloading works for both modules and themes. (For themes, though, cross-path request may have an issue. See issue [#2763861](/project/bootstrap/issues/2763861).)
- Example `vegetable.module` directory structure:
- modules/vegetable/
- Controller/
- VegetableController.php → class Drupal\\vegetable\\Controller\\VegetableController
- VegetableForm.php → class Drupal\\vegetable\\Form\\VegetableForm
- VegetableBlock.php → class Drupal\\vegetable\\Plugin\\Block\\VegetableBlock
- Tomato.php → class Drupal\\vegetable\\Entity\\Tomato
- Cucumber.php → class Drupal\\vegetable\\Entity\\Cucumber
- TomatoTest.php → class Drupal\\vegetable\\Tests\\TomatoTest
- CucumberTest.php → class Drupal\\vegetable\\Tests\\CucumberTest
- VegetableManagerTest.php → class Drupal\\vegetable\\Tests\\VegetableManagerTest
- weather-data.json
- Functional/
- TomatoTest.php → class Drupal\\Tests\\vegetable\\Unit\\TomatoTest
- VegetableTestTrait.php → trait Drupal\\Tests\\vegetable\\Traits\\VetegableTestTrait
- vegetable.info.yml
- vegetable.routing.yml
- vegetable.module
- Explanation:
- 1.  Each module has a namespace that corresponds to its module name.
- Here: `Drupal\vegetable\`
- 2.  The module's namespace is mapped to the `./src/` folder in the module directory.
- Here: `Drupal\vegetable\` → `modules/vegetable/src/`
- 3.  Anything after the module namespace directly maps to the directory and file structure in the `./src/` folder.
- Here: `Drupal\vegetable\Entity\Tomato` → `modules/vegetable/src/Entity/Tomato.php`
- The identical logic applies to PHPUnit tests contained in `./tests/src/`.
- The `modules/vegetable/src/Tests` folder contains the [SimpleTest](https://www.drupal.org/docs/7/testing/simpletest-testing-overview-drupal-7) test code and the `modules/vegetable/tests` folder contains the [PHPUnit](https://www.drupal.org/docs/8/phpunit) test code. SimpleTest is deprecated in Drupal 8 but is still supported and PHPUnit is the recommended testing framework

## Namespace resolution
- The namespace of all Drupal core components, as well as contributed modules, begins with `Drupal\`
- The first parts of a namespaced class name indicate the base namespace that maps to a registered base directory, in which PHP files will be looked up:
- Base namespace
- Base directory
- Drupal core
- `Drupal\Component\`
- `core/lib/Drupal/Component/`
- Components that are reusable outside of Drupal.
- `Drupal\Core\`
- `core/lib/Drupal/Core/`
- Components that are specific to Drupal.
- `Drupal\Tests\`
- `core/tests/Drupal/Tests/`
- PHPUnit tests of core components.
- `Drupal\$modulename\`
- `modules/$modulename/src/`
- Main integration files.
- `Drupal\$modulename\Tests\`
- `modules/$modulename/src/Tests/`
- Simpletest tests of the module.
- `Drupal\Tests\$modulename\`
- `modules/$modulename/tests/src/`
- PHPUnit tests of the module.
- For modules, `$modulename` is the unique machine name of the module, which consists of lowercase characters and underscores.
- The remaining part of a namespaced class name indicates the relative path within the base directory: each PHP namespace separator (`\`) is replaced with a directory separator (`/`) and the `.php` extension is appended:
- Base namespace
- Relative class name
- Base directory
- Relative file path
- Drupal\\Component\\
- Diff\\Engine\\DiffEngine
- core/lib/Drupal/Component/
- Diff/Engine/DiffEngine.php
- Drupal\\node\\
- Entity\\Node
- core/modules/node/src/
- Entity/Node.php
- Drupal\\Tests\\views\_ui\\
- Form\\Ajax\\RearrangeFilterTest
- core/modules/views\_ui/tests/src/
- Form/Ajax/RearrangeFilterTest.php
- Drupal\\devel\\
- Plugin\\Block\\DevelSwitchUser
- modules/contrib/devel/src/
- Plugin/Block/DevelSwitchUser.php
- Each PHP class, interface, or trait lives in a separate PHP file.
- For example, the class `Drupal\Component\Diff\Engine\DiffEngine` is defined in `core/lib/Drupal/Component/Diff/Engine/DiffEngine.php`.

## Setting up the linter-fixer tool

## Setting up the linter-fixer tool
- Understanding the purpose and nature of Drupal's coding standards for JavaScript from the [previous pages](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards) represents the theory. Now, let's continue with their practical usage in everyday work. This page describes some basic methods of setting up developer aid tools utilizing these rulesets.

## Tools overview
- *ESLint* is the most popular linter utility for JavaScript and EcmaScript-based (hence the name) languages. It analyzes static code to catch syntax issues and enforce coding best practices. (It is loosely comparable to PHPStan on the backend side, but not as type-aware.)
- On the other hand, *Prettier* is a separate tool: an opinionated code formatter that can be integrated into ESLint via plugins. However, unlike ESLint, it doesn’t validate logic or best practices. (It only rewrites code into a consistent format.)
- When working on JavaScript source code for Drupal, these 2 tools, ESLint and Prettier, must be installed on your project's codebase; using a package manager is the easiest way to get them. Although multiple competitor package manager utilities are available in the JavaScript/ECMAScript universe (*NPM* and *Yarn* are the two most popular), the Drupal community has [chosen](https://www.drupal.org/node/2996785/revisions/13574092/view#s-install-pre-requisites:~:text=we%20use%20yarn%20for%20managing%20dependencies) the latter as the recommended one for many reasons. (Evidence is the [presence](https://git.drupalcode.org/project/drupal/-/blob/11.2.2/core/yarn.lock) of the `yarn.lock` file and the [lack](https://git.drupalcode.org/search?search=package-lock.json&nav_source=navbar&project_id=59858&group_id=2&search_code=true&repository_ref=11.2.2) of `package-lock.json` file.) So this guide will also demonstrate Yarn commands.
- [![Screenshot](/files/drupal-core-managaes-its-frontend-dependencies-with-yarn.png)](/files/drupal-core-managaes-its-frontend-dependencies-with-yarn.png "Open in original size")
- All three development tools mentioned till now ([Yarn](https://github.com/yarnpkg/berry/blob/master/package.json#L76), [ESLint](https://github.com/eslint/eslint/blob/main/package.json#L223), and [Prettier](https://github.com/prettier/prettier/blob/main/package.json#L26)) require a Node.js instance to be installed and run on the stack.

## Preparing the environment
- The underlying software stack of a Drupal-based website and its file structure can be installed in several different ways. Still, for the sake of simplicity, this guide will follow the generally suggested method: building upon the `drupal/core-recommended` [meta-package](https://github.com/drupal/core-recommended) and running in a containerized local development environment with *DDEV* (see the [docs](/docs/getting-started/installing-drupal/install-drupal-using-ddev-for-local-development)). Following this platform-agnostic approach ensures the broadest reach of audience of our documentation efforts – even if you have to use a different tool as a component of the stack for any reason, you still can grasp the overall idea.
- One of the many benefits DDEV provides is that it already installs the latest version of Node.js on the backend stack without the need to take care of it manually. (Feel free to check by running `$ ddev . node --version` – it should return a value starting with v22.) "Standing on the shoulders of giants" – you've probably heard the saying many times. The great people behind Node.js and Yarn have joined forces to provide a convenient way of having a package manager already available out-of-the-box without manual installation: this is the [Corepack](https://github.com/nodejs/corepack#readme) initiative.
- The containerization tool DDEV offers this *Corepack* component by default, built into the web container (which runs your website). You just need to enable it:
- 1.  Find the "corepack" term in your `.ddev/config.yaml` file
- 2.  Uncomment it, set its value to "true"
- 3.  Restart your stack: `$ ddev restart`
- 4.  Ensure you have its latest version installed: `$ ddev yarn set version stable`
- 5.  Finally, your package manager should be up and running: `$ ddev yarn --version` responding "4.9.x" or similar version number

## Installing dependencies
- A package manager is only a program alone; now we need the list of required packages to feed it to install. Drupal Core is shipped with its own `package.json` file describing all the frontend-related external dependencies. Roughly simplified, similarly to the `composer.json` file in the root directory of your project, which lists the backend-related packages, but with the significant difference that Node.js' `package.json` file sits two levels deeper, in the `web/core/` directory instead.
- 1.  Stand into this lower directory: `$ cd web/core`
- 2.  Start installing all the dependencies listed in the `package.json` file: `$ ddev yarn install`
- 3.  A new `web/core/node_modules/` directory should appear in your file structure (it is already ignored in Git)
- Within this, the `web/core/node_modules/.bin/` directory should contain two executable files: `eslint` and `prettier` (symlinks, to be precise).
- 4.  Now you can check if they run normally by asking their version number and comparing to these expected values:
- `$ ddev yarn eslint --version` → "8.57.x" or similar
- `$ ddev yarn prettier --version` → "3.5.x" or similar
- One more thing to see: currently, the only single `node_modules/` directory containing all these external dependencies exists down there in `web/core/`, thus it is only relevant for Drupal Core. However, we also want to lint the JavaScript code of contrib and custom modules and themes as well, living in different locations of the codebase. To make the content of `node_modules/` available from other places as well, create a symlink from the topmost project root pointing to its content. This line chains together three commands: jumping up to the project root, creating the symlink, then returning to `web/core/` where we started from.

## Running checks & fixes
- Having everything prepared, now we are ready to run the linting process to check any JavaScript file existing in our project codebase. The syntax of invoking ESLint is `$ ddev yarn eslint &#123;&#123;../relative-path/to-the/file&#125;&#125;`. If you also want ESLint to modify file content where an automatically fixable coding standard violation is detected, plus reformat the style of the entire file too, simply add the "--fix" switch to the command in extra. Some examples:
- Only check (but do not fix) a single file of Drupal Core:
- `$ ddev yarn eslint modules/big_pipe/js/big_pipe.js`
- Check a given file outside of Core (e.g. a contrib theme's):
- `$ ddev yarn eslint ../themes/contrib/gin/js/init.js`
- Check & fix not a single file only, but all JS files within an entire directory of our custom code:
- `$ ddev yarn eslint --fix ../modules/custom/my_module/js`
- Here's an example output of such a command:
- [![Screenshot of CLI](/files/running-eslint-on-ddev-for-a-javascript-file-of-drupal-core.png)](/files/running-eslint-on-ddev-for-a-javascript-file-of-drupal-core.png "Open in original size")

## Special cases
- Some rules need to be changed for specific modules (if they use a third party library and they need to use a new global variable), in that case the module can create it's own `.eslintrc.json` turning some rules on or off and adding global variables they require. When ESLint runs, all the configuration files present in the directory tree are merged together: see [Configuration Cascading and Hierarchy](https://eslint.org/docs/latest/use/configure/configuration-files#cascading-and-hierarchy) for more details. For example, the *Google Analytics* module uses third-party code that defines the global ”ga”, which can be allowed by adding the following code to `.eslintrc.json` in the module directory:

- [Node.js](/taxonomy/term/204552)
- [Yarn](/taxonomy/term/204553)
- [eslint](/taxonomy/term/190105)
- [DDEV](/taxonomy/term/193599)
- [Prettier](/taxonomy/term/204554)
- [Airbnb](/taxonomy/term/204555)

## Spelling

## Spelling
- Drupal Core uses US English spelling for all source code, including comments and names.
- Core code is automatically checked for spelling by [CSpell](https://cspell.org/).

## Spelling of CSpell
- For in line documentation settings use all lower case for cspell. For example, `// cspell:ignore.`

## Ignore word(s) in a file
- Use the `cspell:ignore` directive. The words are listed alphabetically with a single space between the words. Use multiple lines to meet the number of characters per line limit.

## Disable CSpell by line
- if it's not in English or a nonsense string (for example, a random string in a test) disable CSpell for that line. Note that `cspell` is lower case.

## Disable CSpell for multiple lines
- For multiple lines, use disable before the lines and enable after. Note that `cspell` is lower case.
- See the [cspell development tool page](/node/3352552) for more details.

## Related Content
- This section is intended to provide direction for Drupal.org content, particularly documentation and general information pages related to
- User Interface standards for Drupal.

## SQL coding conventions

## SQL coding conventions

## Reserved Words

## Drupal 8 and 9
- All identifiers in SQL query should be quoted. Table names are quoted using curly brackets, for example, `{table_name}`. All other identifiers are quoted using square brackets, for example, `[column_name]`.

## Drupal 7
- Don't use (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names. Even if this may work with your (MySQL) installation, it may not with others or with other databases. Some references:
- [(ANSI) SQL Reserved Words](/node/141051)
- MySQL Reserved Words: [5.1](http://dev.mysql.com/doc/refman/5.1/en/reserved-words.html), [5.0](http://dev.mysql.com/doc/refman/5.0/en/reserved-words.html), [3.23.x, 4.0, 4.1](http://dev.mysql.com/doc/refman/4.1/en/reserved-words.html)
- [PostgreSQL Reserved Words](http://www.postgresql.org/docs/8.1/static/sql-keywords-appendix.html)
- [Oracle Reserved Words](http://download.oracle.com/docs/cd/B19306_01/server.102/b14200/ap_keywd.htm#i690190) (in particular UID is a problem in our context)
- [MS SQL Server Reserved Words](http://msdn2.microsoft.com/en-us/library/ms189822.aspx)
- [DB2 Reserved Words](http://publib.boulder.ibm.com/infocenter/db2luw/v9/index.jsp?topic=/com.ibm.db2.udb.admin.doc/doc/r0001095.htm)
- Some commonly misused keywords: `TIMESTAMP, TYPE, TYPES, MODULE, DATA, DATE, TIME, ...`
- See also [\[bug\] SQL Reserved Words](http://drupal.org/node/371).

## Capitalization and user-supplied data
- Make SQL reserved words UPPERCASE. This is not a suggestion. Drupal db abstraction commands will fail if this convention is not followed.
- Make column and constraint names lowercase.
- Enclose each table name with `{}` (this allows Drupal to prefix table names).
- Variable arguments (which are often user-supplied) should be moved out of the query body and passed in as separate parameters to [`db_query()`](http://api.drupal.org/apis/db_query), [`db_query_range()`](http://api.drupal.org/apis/db_query_range), and [`db_query_temporary()`](http://api.drupal.org/apis/db_query_temporary), etc. The query body should instead contain placeholders specifying the type of each argument (`%d|%s|%|%f|%b`). This ensures that the data will be properly escaped and prevents SQL injection attacks.
- Preventing SQL injection is easy; db\_query provides a way to use parametrized queries. Drupal's database functions replace the sprintf-like placeholders with the properly escaped arguments in order of appearance:
- %d - integers
- %f - floats
- %s - strings, enclose in single quotes
- %b - binary data, do not enclose in single quotes
- % - replaced with %
- Read more about [Database Access](/node/101496)
- Literal (constant) arguments can either be included in the query body or handled in the same way as variable arguments.
- Any string literal or %s placeholder must be enclosed by single quotes: `'` . Never use double quotes.
- *NOTE: as of Drupal 6.x, table definitions and constraints (e.g. primary keys, unique keys, indexes) should be always handled by the [Schema API](/node/146843), which solves cross-database compatibility concerns automatically.**

## Naming
- Use singular nouns for table names since they describe the entity the table represents. Drupal 6.x mixed singular/plural usage and this convention changed for Drupal 7.x.
- It is a good practice to prefix table names with the module name to prevent possible namespace conflicts.
- Name every constraint (primary, foreign, unique keys) yourself. Otherwise, you'll see funny-looking system-generated names in error messages. This happened with the `moderation_roles` table which initially defined a key without explicit name as `KEY (mid)`. This got mysqldump'ed as `KEY mid (mid)` which resulted in a syntax error as `mid()` is a mysql function (see [\[bug\] mysql --ansi cannot import install database](/node/893)).
- Index names should begin with the name of the table they depend on, eg. `INDEX users_sid_idx`.
- *NOTE: as of Drupal 6.x, table definitions and constraints should be always handled by the Schema API.**

## Configure your Database server for standard compliance
- Most Database Servers use extension to standard SQL. However, many of them can be configured to run in a (more) standard compliant mode. Every developer is encouraged to use the mode most standard compliant to avoid sloppy coding and compatibility problems.
- Enable [ANSI](http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html#id2702339) and [Strict](http://dev.mysql.com/doc/refman/5.0/en/server-sql-mode.html#id2702074) Mode
- Please help growing this list for other database servers!*

## References
- [Joe Celko - SQL for Smarties: Advanced SQL Programming](http://www.amazon.com/exec/obidos/tg/detail/-/1558605762/ref=lib_rd_ss_TT04/102-7068143-3629730?v=glance&s=books&vi=reader&img=17#reader-link)
- [RDBMS Naming conventions](http://www.ss64.com/orasyntax/naming.html)

## Indentation
- Drupal does not have a standard method for indentation or formating of longer SQL queries on multiple lines. Some competing strategies include:
- or, using the concept of "rivers" and HEREDOC syntax

## SQL

## SQL
- SQL best practices for Drupal.
- Reserved Words, capitalisation and user-supplied data, naming, configuring DB server for standards compliance
- Reference list of SQL reserved words
- Standard explaining why not to use a certain form of SELECT queries

- [coding standards](/taxonomy/term/190104)

## Guide maintainers
- [![quietone's picture](https://www.drupal.org/files/styles/drupalorg_user_picture/public/user-pictures/picture-2572884-1413636022.png?itok=hb37HODX)](/user/2572884 "View quietone's profile")

## Temporary placeholders and delimiters

## Temporary placeholders and delimiters

## Temporary place-holders and delimiters
- When writing a content filter module, or any code that processes or modifies content, it is tempting to use an obscure character as a place-holder, especially if only your code will see it: But this cannot be guaranteed. Non-printing, invalid or undocumented characters might not be handled correctly in the unlikely event that they are seen by a browser or feed-reader. And the more unlikely they are to be seen – the less likely they are to be tested. This will mean that some code will be written to find and eradicate these insidious characters, possibly including the ones your code is using to do its work.
- To avoid this happening, and extending the lifetime of your code, please use an appropriate alpha-numeric string – prefixed by the name of the module (as a name-space) and a hyphen `-` or underscore `_` – and surrounded by `[`…`]`.
- If you need delimiting place-holders, the closing delimiter can incorporate a `/` after the initial `[` and may suffix the modulename.

## Finding your placeholders
- A PCRE such as
- `'@\[modulename-tag\](.+?)\[/modulename-tag\]@'`
- `'@\[modulename-tag\](.+?)\[/tag-modulename\]@'` if you suffixed the modulename as mentioned above
- can be used to match the string you have previously delimited.

## Twig coding standards

## Twig coding standards
- *The majority of [Twig coding standards](https://twig.symfony.com/doc/coding_standards.html) can be found on the Twig website along with [Twig documentation](https://twig.symfony.com/documentation).** Items on this page (below) are useful when understanding how to write Twig code for Drupal.
- Also see our [preprocess function documentation standards](http://drupal.org/node/1913208).

## The DocBlock
- A docblock at the top of a Twig template should be identical to the docblock at the top of a PHPTemplate file (see [Drupal API documentation standards for theme template files](http://drupal.org/coding-standards/docs#templates)), with the entire docblock wrapped in the twig comment markers, {# and #}.
- Twig template docblocks should only include `@ingroup themeable` if the template is providing the default themeable output. For themes overriding default output the `@ingroup themeable` line should not be included.

## Variables in the DocBlock
- Variables in a twig template docblock should be referenced by name. They will not be surrounded by the Twig print indicators &#123;&#123; and &#125;&#125; and will not be preceded by the PHP variable indicator $. There should be no separate "Other variables" section.
- A good rule of thumb for converting docs at the top of templates is as follows
- Start from what we had in Drupal 7.
- If you see a section of variables titled "Other variables", delete the title and the extra line above.
- if/when variables get deleted from preprocess, delete them from the Twig docs.
- if/when a variable looks useful and is not in the Twig docs, document it.
- if/when you can improve, or reduce the verbosity of the D7 docs, do it.

## Variable definitions in the DocBlock
- Variable definitions should not include any information about the type of variable (array, object, string) since people working in template files should not have to care about type. Everything that can be printed in a Twig template will end up printing as a string.

## Variables referenced inline in the DocBlock
- When a variable is referenced in-line in paragraphs the variable name should be wrapped in single quotes, as follows:

## Expressions
- Twig expressions are very similar to regular PHP expressions, and are most commonly used in Drupal to check if variables are available for printing, for looping, and for setting new variables within templates.

## Expressions: Checking if variables are available for printing
- Sometimes you only want to print a markup container if there is a value to be printed inside it. The way we do this in Drupal is as follows:
- You do not need to use 'is defined' after your variable to determine if it is available.
- There are sometimes issues with using this method for determining emptiness. Discussion and workarounds on [https://www.drupal.org/project/drupal/issues/953034](https://www.drupal.org/project/drupal/issues/953034) .

## Expressions: looping
- Twig uses `for` loops, and in Drupal we are used to using `foreach` loops.
- If you don't need array keys, your loop should look like this:
- If you need both a keys and values, your loop syntax will look like this:

## Expressions: setting variables
- Expressions can also be used for setting variables directly in template files.

## HTML attributes
- HTML attributes in Drupal 8 are drillable. This means that you can print all of them at once by printing `&#123;&#123; attributes &#125;&#125;` or you can print each attribute individually, like so:
- If you choose to print out individual attributes within a HTML tag, you should still include the complete `&#123;&#123; attributes &#125;&#125;` at the end, so that attributes added by modules are still also printed.
- *In Drupal core**, we will print only the class attribute specially, all the others will be printed as part of `&#123;&#123; attributes &#125;&#125;`. The reason for this is that it needs to be very easy for front end developers to be able to add a class, anywhere. By printing the `class=""` attribute directly in the template file, people familiar with HTML and CSS will see and recognize the correct way to add a class without needing to read documentation, or understand that Drupal has a preprocess layer.
- More advanced theme developers may choose to add their classes in preprocess and remove these separately printed classes from templates. This will prevent the empty `class=""` attribute from being printed when an element has no classes.

## Whitespace Control
- Outdated. This section needs to be updated.
- @see [https://www.drupal.org/project/drupal/issues/3094850](https://www.drupal.org/project/drupal/issues/3094850)
- @see [https://symfony.com/blog/better-white-space-control-in-twig-templates](https://symfony.com/blog/better-white-space-control-in-twig-templates)
- There are two whitespace control features in Twig: the `spaceless` filter (used with the `apply` tag) and the dash character (-). The `spaceless` filter removes any whitespace *between* HTML and Twig tags, while the dash character `-`, when set on the inside of Twig tags, removes any whitespace *surrounding* that tag in the direction of the dash. The spaceless filter is more general and its effects are "inward" facing. The dash is more precise and its effects are "outward" facing.

## The spaceless filter
- The [`spaceless`](https://twig.symfony.com/doc/1.x/filters/spaceless.html) filter (used with the `apply` tag) is helpful for removing all non-text whitespace between several tags and statements. It is Drupal core's preferred method for controlling whitespace in blocks of code. However each use introduces one extra level of indentation.
- ([The spaceless filter](https://twig.symfony.com/doc/1.x/filters/spaceless.html) can also be used with a pipe `|` to remove whitespace between HTML tags.)

## The "dash" (-) whitespace modifier
- The `-` dash modifier is a more precise (and sometimes confusing) way of selectively removing whitespace from around one or more sides of a tag. *We do not need to use the `-` dash modifier* very often. Code is usually easier to read when using the spaceless filter.
- Whitespace control features will generally be used sparingly in core.
- Example usage:
- The indented markup should appear as follows:
- We may revisit this decision about use of whitespace controllers later, after converting everything to twig and examining our resulting Twig code, and the markup that is produced. For now, our main goal is not to confuse people who are new to Twig, and that may mean using Twig's built-in tools less frequently.
- DOs and DON'Ts for using spaces and whitespace controllers and spaceless filters in Twig templates:
- If you can remove the whitespace legibly, do so.
- Remove the space before attributes `<div&#123;&#123; attributes &#125;&#125;>`
- Never remove spaces or add a whitespace controllers around classes `class="no &#123;&#123; attributes.class &#125;&#125; no"`
- If you can't remove the whitespace legibly, consider using the spaceless filter. Examples:
- Apply the spaceless filter around commands (`&#123;&#37; if foo &#37;&#125; ...`)
- Apply the spaceless filter around comments `{# this is a comment #}`
- *Caveat regarding newlines at the end of files**
- Git requires that twig files need a newline at the end of the file. This can break tests or may be not wanted in your template output.
- The recommendation to change this:
- Change the test if it needs to pass.
- Or add a twig template tag to the end.
- If you're not in Drupal Core contrib you can just remove the newline character.

## Filters
- Some of the most common Drupal functions like `t` and `url` have been made available in your twig templates as *filters*. Filters are triggered by using the pipe character `|` .
- This is how you would use the t() function as a filter in a twig template.
- See also: [spaceless filter](#spaceless).
- Please do not put spaces on either side of the pipe.

## Comments
- All comments will be surrounded by the twig comment indicator {# and #}.
- Comments that span one line will have the comment indicators on the same line as the comment.
- Comments that span more than one line will have the comment indicators on separate lines. Comments should be wrapped so the line is less than 80 characters.

- [coding standards](/taxonomy/term/190104)

## What to look for when reviewing CSS

## What to look for when reviewing CSS
- There are many things to consider when reviewing CSS against our CSS standards. This is a guide of things to consider and how to present the review when looks at core CSS.

## Architecture guidelines

## Is all the code still in use?
- There are times when markup in core is changed but some CSS files that rely on a particular class or ID have not been updated. Check to make sure that the CSS still applies correctly.
- Example: [#2405213: Remove admin-options component from Seven theme since it is not used](/project/drupal/issues/2405213 "Status: Closed (fixed)")

## Is some code redundant?
- Some CSS is written so it can override CSS that is loaded before it, as Drupal 8 becomes more aligned to the standards, there is less overlap between CSS selectors. There may be some code in place that is no longer required to override previous values. There is sometimes code that overrides browser defaults that are identical.
- Example: [Refactor 'admin-panel' CSS component](https://www.drupal.org/node/2399939#comment-9509045)
- > `+++ b/core/themes/seven/css/components/admin-panel.css
- > @@ -1,20 +1,23 @@
- > +.panel__content {
- >    padding: 0;
- >    clear: left;
- > I think we can delete this CSS, padding is 0 by default anyway so we don't need that. I don't know what clear left does here. Let's try deleting it and seeing what comes up

## Are the components named correctly?
- Does the name of the component correctly describe the design semantics?
- Example: [#2399939: Refactor 'admin-panel' CSS component](/project/drupal/issues/2399939 "Status: Closed (fixed)")

## Should the code be abstracted out into a common reusable class?
- In some situations, the custom CSS written by a module or theme could be abstracted out into a component class that can be reused across modules. The aim in Drupal 8 is to have as much CSS reusable as possible, reducing the need for custom CSS and increasing consistency.
- [#2017257: Create generic layout classes](/project/drupal/issues/2017257 "Status: Closed (fixed)")
- [#2336141: Create reusable color classes](/project/drupal/issues/2336141 "Status: Closed (fixed)")

## Are the selectors correct?
- The CSS standards recommend very short and simple selectors, replacing them with component and sub-component classes.

## Is the code in the correct file?
- For themes, each CSS component should live in it's own file with it's sub-components. All the CSS that effects one component should be in the same place. There are still a few situations where the styling for one element is spread out across several files.
- Some files could be broken down into even smaller files.
- Example: [#2408653: Remove lists.css from Bartik, add it's current code directly to the components it references.](/project/drupal/issues/2408653 "Status: Closed (fixed)")

## Formatting guidelines
- 1.  Add a File comment to the top of the stylesheet - see [here](https://www.drupal.org/node/1887862#file-comments) for guidelines.
- 2.  Check any other comments are formatted correctly - see [here](https://www.drupal.org/node/1887862#comments) for guidelines.
- 3.  Check Whitespace is being used correctly, this includes indentations and line breaks - see [here](https://www.drupal.org/node/1887862#whitespace) for guidelines.
- 4.  Check the formatting of rulesets, properties and media queries are correct - see [here](https://www.drupal.org/node/1887862#format) for guidelines.
- 5.  As mentioned above, check existing RTL styles are formatted correctly - see [here](https://www.drupal.org/node/1887862#rtl) for guidelines.
{% endraw %}
