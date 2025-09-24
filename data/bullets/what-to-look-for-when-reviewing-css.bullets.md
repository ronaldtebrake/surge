# Bullet Points for what-to-look-for-when-reviewing-css.md


## What to look for when reviewing CSS

## On this page
- [Architecture guidelines](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-architecture-guidelines)
- [Is all the code still in use?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-is-all-the-code-still-in-use)
- [Is some code redundant?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-is-some-code-redundant)
- [Are the components named correctly?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-are-the-components-named-correctly)
- [Should the code be abstracted out into a common reusable class?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-should-the-code-be-abstracted-out-into-a-common-reusable-class)
- [Are the selectors correct?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-are-the-selectors-correct)
- [Is the code in the correct file?](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-is-the-code-in-the-correct-file)
- [Formatting guidelines](/docs/develop/standards/css/what-to-look-for-when-reviewing-css#s-formatting-guidelines)

## [CSS](/docs/develop/standards/css)
- [CSS coding standards](/docs/develop/standards/css/css-coding-standards)
- [CSS formatting guidelines](/docs/develop/standards/css/css-formatting-guidelines)
- [CSScomb settings for Drupal (CSS formatting and sort tool)](/docs/develop/standards/css/csscomb-settings-for-drupal-css-formatting-and-sort-tool)
- [CSS architecture (for Drupal 9)](/docs/develop/standards/css/css-architecture-for-drupal-9)
- [CSS file organization (for Drupal 9)](/docs/develop/standards/css/css-file-organization)
- [What to look for when reviewing CSS](/docs/develop/standards/css/what-to-look-for-when-reviewing-css)

## What to look for when reviewing CSS
- Last [updated](/node/2408617/discuss) on
- 16 October 2020
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- There are many things to consider when reviewing CSS against our CSS standards. This is a guide of things to consider and how to present the review when looks at core CSS.

## [](#s-architecture-guidelines "Permalink to this headline")Architecture guidelines

## [](#s-is-all-the-code-still-in-use "Permalink to this headline")Is all the code still in use?
- There are times when markup in core is changed but some CSS files that rely on a particular class or ID have not been updated. Check to make sure that the CSS still applies correctly.
- Example: [#2405213: Remove admin-options component from Seven theme since it is not used](/project/drupal/issues/2405213 "Status: Closed (fixed)")

## [](#s-is-some-code-redundant "Permalink to this headline")Is some code redundant?
- Some CSS is written so it can override CSS that is loaded before it, as Drupal 8 becomes more aligned to the standards, there is less overlap between CSS selectors. There may be some code in place that is no longer required to override previous values. There is sometimes code that overrides browser defaults that are identical.
- Example: [Refactor 'admin-panel' CSS component](https://www.drupal.org/node/2399939#comment-9509045)
- > `+++ b/core/themes/seven/css/components/admin-panel.css
- > @@ -1,20 +1,23 @@
- > +.panel__content {
- >    padding: 0;
- >    clear: left;
- > I think we can delete this CSS, padding is 0 by default anyway so we don't need that. I don't know what clear left does here. Let's try deleting it and seeing what comes up

## [](#s-are-the-components-named-correctly "Permalink to this headline")Are the components named correctly?
- Does the name of the component correctly describe the design semantics?
- Example: [#2399939: Refactor 'admin-panel' CSS component](/project/drupal/issues/2399939 "Status: Closed (fixed)")

## [](#s-should-the-code-be-abstracted-out-into-a-common-reusable-class "Permalink to this headline")Should the code be abstracted out into a common reusable class?
- In some situations, the custom CSS written by a module or theme could be abstracted out into a component class that can be reused across modules. The aim in Drupal 8 is to have as much CSS reusable as possible, reducing the need for custom CSS and increasing consistency.
- [#2017257: Create generic layout classes](/project/drupal/issues/2017257 "Status: Closed (fixed)")
- [#2336141: Create reusable color classes](/project/drupal/issues/2336141 "Status: Closed (fixed)")

## [](#s-are-the-selectors-correct "Permalink to this headline")Are the selectors correct?
- The CSS standards recommend very short and simple selectors, replacing them with component and sub-component classes.

## [](#s-is-the-code-in-the-correct-file "Permalink to this headline")Is the code in the correct file?
- For themes, each CSS component should live in it's own file with it's sub-components. All the CSS that effects one component should be in the same place. There are still a few situations where the styling for one element is spread out across several files.
- Some files could be broken down into even smaller files.
- Example: [#2408653: Remove lists.css from Bartik, add it's current code directly to the components it references.](/project/drupal/issues/2408653 "Status: Closed (fixed)")

## [](#s-formatting-guidelines "Permalink to this headline")Formatting guidelines
- 1.  Add a File comment to the top of the stylesheet - see [here](https://www.drupal.org/node/1887862#file-comments) for guidelines.
- 2.  Check any other comments are formatted correctly - see [here](https://www.drupal.org/node/1887862#comments) for guidelines.
- 3.  Check Whitespace is being used correctly, this includes indentations and line breaks - see [here](https://www.drupal.org/node/1887862#whitespace) for guidelines.
- 4.  Check the formatting of rulesets, properties and media queries are correct - see [here](https://www.drupal.org/node/1887862#format) for guidelines.
- 5.  As mentioned above, check existing RTL styles are formatted correctly - see [here](https://www.drupal.org/node/1887862#rtl) for guidelines.

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/2408617/edit), and edit this page
- Log in, click [Discuss](/node/2408617/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282408617%29%20What%20to%20look%20for%20when%20reviewing%20CSS) with your suggestion