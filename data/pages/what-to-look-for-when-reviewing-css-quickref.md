## What To Look For When Reviewing Css

### Rules
- There are many things to consider when reviewing CSS against our CSS standards. This is a guide of things to consider and how to present the review when looks at core CSS.
- There are times when markup in core is changed but some CSS files that rely on a particular class or ID have not been updated. Check to make sure that the CSS still applies correctly.
- Example: [#2405213: Remove admin-options component from Seven theme since it is not used](/project/drupal/issues/2405213 "Status: Closed (fixed)")
- Some CSS is written so it can override CSS that is loaded before it, as Drupal 8 becomes more aligned to the standards, there is less overlap between CSS selectors. There may be some code in place that is no longer required to override previous values. There is sometimes code that overrides browser defaults that are identical.
- > `+++ b/core/themes/seven/css/components/admin-panel.css
- > @@ -1,20 +1,23 @@
- > +.panel__content {
- >    padding: 0;