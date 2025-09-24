# Bullet Points for jquery-coding-standards.md


## jQuery coding standards

## On this page
- [Prefix variables that point to jQuery objects with a dollar sign($)](/docs/develop/standards/javascript/jquery-coding-standards#s-prefix-variables-that-point-to-jquery-objects-with-a-dollar-sign)
- [Avoid compatibility issues](/docs/develop/standards/javascript/jquery-coding-standards#compatibility)
- [Chaining](/docs/develop/standards/javascript/jquery-coding-standards#chaining)
- [Event Delegation](/docs/develop/standards/javascript/jquery-coding-standards#event-delegation)
- [Functions](/docs/develop/standards/javascript/jquery-coding-standards#functions)
- [Context](/docs/develop/standards/javascript/jquery-coding-standards#context)
- [Using #id or .class](/docs/develop/standards/javascript/jquery-coding-standards#id-class)
- [jQuery.attr()](/docs/develop/standards/javascript/jquery-coding-standards#attr)
- [jQuery.each()](/docs/develop/standards/javascript/jquery-coding-standards#each)

## [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards)
- [JavaScript coding standards](/docs/develop/standards/javascript-coding-standards/javascript-coding-standards)
- [JavaScript best practices](/docs/develop/standards/javascript/javascript-best-practices)
- [ESLint settings](/docs/develop/standards/javascript-coding-standards/setting-up-the-linter-fixer-tool)
- [JavaScript API documentation and comment standards](/docs/develop/standards/javascript-coding-standards/javascript-api-documentation-and-comment-standards)
- [jQuery coding standards](/docs/develop/standards/javascript/jquery-coding-standards)

## jQuery coding standards
- Last [updated](/node/1720586/discuss) on
- 11 March 2021
- This documentation **needs work**. See "Help improve this page" in the sidebar.
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

## [](#s-prefix-variables-that-point-to-jquery-objects-with-a-dollar-sign "Permalink to this headline")Prefix variables that point to jQuery objects with a dollar sign($)
- In any part of your code it should be easy to understand which variables are jQuery objects and which are not.
- *Incorrect**
- When assigning a jQuery object to a variable:
- `var foo = $('.foo');`
- When assigning a jQuery object to a property:
- `var object = { bar: $('.bar') };`
- When assigning a jQuery object to a variable:
- `var $foo = $('.foo');`
- When assigning a jQuery object to a property:
- `var object = { $bar: $('.bar') };`

## [](#compatibility "Permalink to this headline")Avoid compatibility issues
- jQuery is evolving quickly but attempts to maintain backward compatibility with previous releases. Although multiple jQuery versions are not officially supported within a single Drupal major release, many sites use the [jQuery update](http://drupal.org/project/issues/jquery_update) module to take advantage of performance and bug fixes offered by newer versions of jQuery. Custom modules using jQuery should keep up to date with syntax best-practices in order to avoid conflicts with updated versions.

## [](#chaining "Permalink to this headline")Chaining
- For chaining selector you can either use CSS method $(' a b > c') or JavaScript chaining $('a').find('b').children('c'). Second method is slightly faster([test](http://jsperf.com/jquery-chaning/2)). In both cases reduce the weight of selector(if possible). In case .children() and .find() will return the same results, use .find() method ([test](http://jsperf.com/jquery-chaning/2)).
- *Incorrect**
- .find('.contextual-links')
- .prop('hidden', !isOpen);`
- `this.$el.find('.contextual-links')
- .prop('hidden', !isOpen);`

## [](#event-delegation "Permalink to this headline")Event Delegation
- Every event (e.g. click, mouseover, etc.) in JavaScript “bubbles” up the DOM tree to parent elements. This is incredibly useful when you want many elements to call the same function. Instead of binding an event listener function to all of them, you can bind it once to their parent, and have it figure out which node triggered the event.
- In examples of jQuery code, you may often see events simply `return false;` to prevent the default behavior of that event. This type of prevention is often [misused](http://fuelyourcoding.com/jquery-events-stop-misusing-return-false/) and also prevents the "bubbling" propagation of the event. This effect is not always [desired](https://drupal.org/node/1749782). If you wish to either prevent the default behavior or stop propagation, they should be explicitly defined.
- *Incorrect**
- `$('.item').click(function(event) {
- // Calls both event.preventDefault() and event.stopPropagation().
- return false;
- *Correct (Drupal 7)**
- `$menus.delegate('.item', 'click', function(event) {
- // Prevents the default behavior (ie: click).
- event.preventDefault();
- // Prevents propagation (ie: "bubbling").
- event.stopPropagation();
- *Correct (Drupal 8)**
- `$menus.on('click', '.item', function(event) {
- // Prevents the default event behavior (ie: click).
- event.preventDefault();
- // Prevents the event from propagating (ie: "bubbling").
- event.stopPropagation();

## [](#functions "Permalink to this headline")Functions
- Separate your functions into individual functions and call them when needed.
- *Incorrect**
- `// Can be called only on click.
- $('.btn').click( function() { ... });`
- `// Can be called anywhere.
- function clickFunction() { ... };
- $('div').click( function() {clickFunction() });`

## [](#context "Permalink to this headline")Context
- Always try to give your selectors a context. The default context will search the entire page's DOM. If the context is a cached selection, use find().
- *Incorrect**
- `// This has no context and is very slow.
- var $element = $('.element');`
- *Improved**
- `// Search only in #sidebar.
- var $element = $('.element', '#sidebar');`
- `var $sidebar = $('#sidebar');
- var $element = $sidebar.find('.element');`

## [](#id-class "Permalink to this headline")Using #id or .class
- Finding elements by the tag ID is *much* faster ([test](http://jsperf.com/id-vs-class-vs-tag-selectors/2)) than by class name. If your target element appears on the page only once, select it by #id. In case when you have more than one, use class but descend from an #id. See the above [context](#context) code examples.

## [](#attr "Permalink to this headline")jQuery.attr()
- *This applies only for D6 and D7** because D8 will ship with jQuery 1.9+ which instead uses .prop() for property.
- Wrong use of .attr is the cause of the many compatibility problems. Use booleans to set a property, not an empty string. Also, do not assume that property values that are returned are always booleans. `.attr('checked')` could return either `true` or `'checked'` depending on jQuery version and markup.
- *Incorrect**
- `$element.attr('disabled', '');
- if ($element.attr('checked') === true) { ... }`
- `$element.attr('disabled', false);
- $element.attr('disabled', true);
- if ($element.attr('checked')) { ... }`

## [](#each "Permalink to this headline")jQuery.each()
- This method is indeed very powerful (and appropriate) when dealing with existing instantiated jQuery objects and the need to iterate on them.
- It is often misused when needing to iterate over simple native JavaScript arrays or objects. Using native JavaScript `for` loops are *300-1000 times* faster than jQuery.each() ([test](http://jsperf.com/jquery-each-vs-quickeach/83)).
- *Incorrect**
- `var array = [ ... ];
- $.each(array, function(i, item) { ... });`
- `var array = [ ... ];
- for (i = 0, len = array.length; i < len; i += 1) {
- var element = array[i];

## Help improve this page
- *Page status:** Needs work
- *You can:**
- Log in, click [Edit](/node/1720586/edit), and edit this page
- Log in, click [Discuss](/node/1720586/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%281720586%29%20jQuery%20coding%20standards) with your suggestion