# API Documentation Examples

### On this page

-   [Files](/docs/develop/standards/php/api-documentation-examples#files)
-   [Module file (\*.module)](/docs/develop/standards/php/api-documentation-examples#module-file)
-   [Install file (\*.install)](/docs/develop/standards/php/api-documentation-examples#install-file)
-   [Include file (\*.inc)](/docs/develop/standards/php/api-documentation-examples#include-file)
-   [PHP theme template file (\*.tpl.php -- theme-specific override )](/docs/develop/standards/php/api-documentation-examples#tpl-file)
-   [File containing a single class](/docs/develop/standards/php/api-documentation-examples#single-class-file)
-   [Functions](/docs/develop/standards/php/api-documentation-examples#functions)
-   [Generic functions](/docs/develop/standards/php/api-documentation-examples#generic-function)
-   [Callback functions](/docs/develop/standards/php/api-documentation-examples#callback-functions)
-   [Hook definition functions](/docs/develop/standards/php/api-documentation-examples#hook-definition)
-   [hook implementation](/docs/develop/standards/php/api-documentation-examples#hook-implementation)
-   [hook\_update\_N implementation (update function)](/docs/develop/standards/php/api-documentation-examples#hook-update-function)
-   [form-generating function (including validate/submit)](/docs/develop/standards/php/api-documentation-examples#form-generating-function)
-   [hook\_menu() callbacks](/docs/develop/standards/php/api-documentation-examples#hook-menu-callback)
-   [render API callback](/docs/develop/standards/php/api-documentation-examples#render-api-callback)
-   [theme\_foo() themeable function](/docs/develop/standards/php/api-documentation-examples#theme-foo-themeable-function)
-   [Classes](/docs/develop/standards/php/api-documentation-examples#classes)
-   [Class with a namespace](/docs/develop/standards/php/api-documentation-examples#class-with-namespace)
-   [Class without a namespace](/docs/develop/standards/php/api-documentation-examples#class-without-namespace)
-   [Interface](/docs/develop/standards/php/api-documentation-examples#interface)
-   [Member function](/docs/develop/standards/php/api-documentation-examples#member-function)
-   [Member function that overrides base class method](/docs/develop/standards/php/api-documentation-examples#member-function-override-base-class)
-   [Member function that implements interface method](/docs/develop/standards/php/api-documentation-examples#member-function-implement-interface-method)
-   [Member constant](/docs/develop/standards/php/api-documentation-examples#member-constant)
-   [Member variable](/docs/develop/standards/php/api-documentation-examples#member-variable)
-   [Plugin annotation](/docs/develop/standards/php/api-documentation-examples#plugin-annotation)
-   [Miscellaneous examples](/docs/develop/standards/php/api-documentation-examples#misc)
-   [Constant](/docs/develop/standards/php/api-documentation-examples#constant)
-   [Global variable](/docs/develop/standards/php/api-documentation-examples#global-variable)
-   [Bullet lists](/docs/develop/standards/php/api-documentation-examples#bullet-lists)
-   [Sections, sub-sections, and in-page references](/docs/develop/standards/php/api-documentation-examples#s-sections-sub-sections-and-in-page-references)
-   [Code samples (@code)](/docs/develop/standards/php/api-documentation-examples#s-code-samples-code)
-   [@link](/docs/develop/standards/php/api-documentation-examples#s-link)
-   [@see](/docs/develop/standards/php/api-documentation-examples#s-see)
-   [Defining a topic/group](/docs/develop/standards/php/api-documentation-examples#topic-group)
-   [@ingroup and @addtogroup](/docs/develop/standards/php/api-documentation-examples#ingroup-addtogroup)

## [PHP](/docs/develop/standards/php)

-   [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
-   [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
-   [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
-   [Namespaces](/docs/develop/coding-standards/namespaces)
-   [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
-   [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)
-   [PSR-4 namespaces and autoloading in Drupal 8](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8)
-   [Temporary placeholders and delimiters](/docs/develop/coding-standards/temporary-placeholders-and-delimiters)
-   [Write E\_ALL compliant code](/docs/develop/coding-standards/write-e_all-compliant-code)

# API Documentation Examples

Last [updated](/node/1918356/discuss) on

19 January 2023

This page is ia collection of the complete API documentation examples, which you can use as starting points to writing documentation that conforms to the Drupal project's [API documentation standards](/node/1354).

## [](#files "Permalink to this headline")Files

[General standards for file documentation](http://drupal.org/coding-standards/docs#file)

### [](#module-file "Permalink to this headline")Module file (\*.module)
```php
`<?php

/**
 * @file
 * Attaches custom data fields to Drupal entities.
 */`
```
### [](#install-file "Permalink to this headline")Install file (\*.install)
```php
`<?php

/**
 * @file
 * Install, update and uninstall functions for the System module.
 */`
```
### [](#include-file "Permalink to this headline")Include file (\*.inc)
```php
`<?php
/**
 * @file
 * Media module integration for the Media module.
 */`
```
### [](#tpl-file "Permalink to this headline")PHP theme template file (\*.tpl.php -- base implementation)

[Special standards for tpl.php files](http://drupal.org/coding-standards/docs#templates)
```php
`<?php

/**
 * @file
 * Displays a block.
 *
 * Available variables:
 * - $block->subject: Block title.
 * (list the other variables here)
 *
 * @see template_preprocess_block()
 *
 * @ingroup themeable
 */
(HTML/PHP code for template starts here)`
```
### [](#single-class-file "Permalink to this headline")File containing a single class

[Object-oriented coding standards](https://www.drupal.org/docs/develop/coding-standards/object-oriented-code).
```php
`<?php

namespace Drupal\commerce\Element;

use Drupal\commerce\EntityHelper;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element\FormElement;

/**
 * Provides a form input element for selecting one or multiple entities.
 *
 * The element is transformed based on the number of available entities:
 *   1..#autocomplete_threshold: Checkboxes/radios element, based on #multiple.
 *   >#autocomplete_threshold: entity autocomplete element.
 * If the element is required, and there's only one available entity, a hidden
 * form element can be used instead of checkboxes/radios.
 *
 * Properties:
 * - #target_type: The entity type being selected.
 * - #multiple: Whether the user may select more than one item.
 * - #default_value: An entity ID or an array of entity IDs.
 * - #hide_single_entity: Whether to use a hidden element when there's only one
 *                        available entity and the element is required.
 * - #autocomplete_threshold: Determines when to use the autocomplete.
 * - #autocomplete_size: The size of the autocomplete element in characters.
 * - #autocomplete_placeholder: The placeholder for the autocomplete element.
 *
 * Example usage:
 * @code
 * $form['entities'] = [
 *   '#type' => 'commerce_entity_select',
 *   '#title' => t('Stores'),
 *   '#target_type' => 'commerce_store',
 *   '#multiple' => TRUE,
 * ];
 * @end
 *
 * @FormElement("commerce_entity_select")
 */
class EntitySelect extends FormElement {`
```
### [](#tpl-file "Permalink to this headline")PHP theme template file (\*.tpl.php -- theme-specific override )

[Special standards for tpl.php files](http://drupal.org/coding-standards/docs#templates) Note that there is no @ingroup themeable in the override!
```php
`<?php

/**
 * @file
 * Displays a block.
 *
 * Available variables:
 * - $block->subject: Block title.
 * (list the other variables here)
 *
 *
 * @see template_preprocess_block()
 */
(HTML/PHP code for template starts here)`
```
## [](#functions "Permalink to this headline")Functions

[Documentation standards for functions](http://drupal.org/coding-standards/docs#functions)

### [](#generic-function "Permalink to this headline")Generic functions
```php
`/**
 * Returns data from the persistent cache.
 *
 * Data may be stored as either plain text or as serialized data. cache_get
 * will automatically return unserialized objects and arrays.
 *
 * @param int $cid
 *   The cache ID of the data to retrieve.
 * @param string $bin
 *   The cache bin to store the data in. Valid core values are 'cache_block',
 *   'cache_bootstrap', 'cache_field', 'cache_filter', 'cache_form',
 *   'cache_menu', 'cache_page', 'cache_path', 'cache_update' or 'cache' for
 *   the default cache.
 *
 * @return mixed
 *   The value from the cache, or FALSE on failure.
 *
 * @see cache_set()
 */
function cache_get($cid, $bin = 'cache') {`
```
### [](#callback-functions "Permalink to this headline")Callback functions

[Standards for documenting callback functions](http://drupal.org/coding-standards/docs#callbacks) -- these are standard-format callback functions that are passed to other functions as arguments.

Callback used in only one API function:
```php
`/**
 * Sorts structured arrays by weight.
 *
 * Callback for uasort() within foo_bar().
 */
function element_sort($a, $b) {`
```
Callback used in a few API functions:
```php
`/**
 * Sorts structured arrays by weight.
 *
 * Callback for uasort() within:
 * - foo()
 * - bar()
 */
function element_sort($a, $b) {`
```
Callback used in many functions, where some explanation is needed for the otherwise standard function arguments:

\[NOTE: NEEDS STANDARDS UPDATE - data types on @param/@return!\]
```php
`/**
 * Sorts a structured array by the 'weight' element.
 *
 * Note that the sorting is by the 'weight' array element, not by the render
 * element property '#weight'.
 *
 * Callback for uasort() used in various functions.
 *
 * @param $a
 *   First item for comparison. The compared items should be associative arrays
 *   that optionally include a 'weight' element. For items without a 'weight'
 *   element, a default value of 0 will be used.
 * @param $b
 *   Second item for comparison.
 */
function drupal_sort_weight($a, $b) {`
```
### [](#hook-definition "Permalink to this headline")Hook definition functions

[Standards for documenting hook definitions](http://drupal.org/coding-standards/docs#hooks)

\[NOTE: NEEDS STANDARDS UPDATE - data types on @param/@return, and function body needs to be provided, as it's part of the documentation.\]
```php
`/**
 * Define the Field API schema for a field structure.
 *
 * This hook MUST be defined in .install for it to be detected during
 * installation and upgrade.
 *
 * @param $field
 *   A field structure.
 *
 * @return
 *   An associative array with the following keys:
 *   - columns: An array of Schema API column specifications, keyed by column
 *     name. This specifies what comprises a value for a given field. For
 *     example, a value for a number field is simply 'value', while a value for
 *     a formatted text field is the combination of 'value' and 'format'. It is
 *     recommended to avoid having the column definitions depend on field
 *     settings when possible. No assumptions should be made on how storage
 *     engines internally use the original column name to structure their
 *     storage.
 *   - indexes: (optional) An array of Schema API indexes definitions. Only
 *     columns that appear in the 'columns' array are allowed. Those indexes
 *     will be used as default indexes. Callers of field_create_field() can
 *     specify additional indexes, or, at their own risk, modify the default
 *     indexes specified by the field-type module. Some storage engines might
 *     not support indexes.
 *   - foreign keys: (optional) An array of Schema API foreign keys
 *     definitions.
 */
function hook_field_schema($field) {`
```
### [](#hook-implementation "Permalink to this headline")hook implementation

[Standards for documenting hook implementations](http://drupal.org/coding-standards/docs#hookimpl)
```php
`/**
 * Implements hook_menu().
 */
function search_menu() {`
```
### [](#hook-update-function "Permalink to this headline")hook\_update\_N implementation (update function)

[Drupal API documentation standards for functions](https://drupal.org/coding-standards/docs#functions)
```php
`/**
 * Upgrade the node type table and fix node type 'module' attribute to avoid name-space conflicts.
 */
function node_update_7000() {
  // Rename the module column to base.`
```
### [](#form-generating-function "Permalink to this headline")form-generating function (including validate/submit)

[Form-generating functions](https://drupal.org/coding-standards/docs#forms)

\[needs an example\]

### [](#hook-menu-callback "Permalink to this headline")hook\_menu() callbacks

\[needs an example\]

[Standards for documenting hook\_menu() callbacks](http://drupal.org/coding-standards/docs#menu-callback)

\[NEEDS STANDARDS UPDATE - data type on parameter, and it needs @return as well!!\]
```php
`/**
 * Page callback: Displays the dashboard.
 *
 * @param $launch_customize
 *   Whether to launch in customization mode right away. TRUE or FALSE.
 */
function dashboard_admin($launch_customize = FALSE) {`
```
### [](#render-api-callback "Permalink to this headline")render API callback

[Render API callback functions](https://drupal.org/coding-standards/docs#render)

(needs an example)

### [](#theme-foo-themeable-function "Permalink to this headline")theme\_foo() themeable function

[Standards for documenting themeable functions](http://drupal.org/coding-standards/docs#themeable)
```php
`/**
 * Returns HTML for a form.
 *
 * @param array $variables
 *   An associative array containing:
 *   - element: An associative array containing the properties of the element.
 *     Properties used: #action, #method, #attributes, #children
 *
 * @ingroup themeable
 */
function theme_form($variables) {`
```
## [](#classes "Permalink to this headline")Classes

[Standards for documenting classes and interfaces](http://drupal.org/coding-standards/docs#classes)

### [](#class-with-namespace "Permalink to this headline")Class with a namespace
```php
`<?php

namespace Drupal\Core\Plugin\Context;

use Drupal\Component\Plugin\Exception\ContextException;
use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\Core\Plugin\ContextAwarePluginInterface;

/**
 * Provides methods to handle sets of contexts.
 */
class ContextHandler implements ContextHandlerInterface {`
```
### [](#class-without-namespace "Permalink to this headline")Class without a namespace

(needs example)

### [](#interface "Permalink to this headline")Interface

\[NEEDS STANDARDS UPDATE - first line does not conform to standards\]
```php
`namespace Drupal\Component\Plugin;

use Drupal\Component\Plugin\Exception\PluginException;

/**
 * Interface for defining context aware plugins.
 *
 * Context aware plugins can specify an array of context definitions keyed by
 * context name at the plugin definition under the "context" key.
 */
interface ContextAwarePluginInterface extends PluginInspectionInterface {`
```
### [](#member-function "Permalink to this headline")Member function

(needs example)

### [](#member-function-override-base-class "Permalink to this headline")Member function that overrides base class method

\[NEEDS STANDARDS UPDATE: first line needs class name and probably namespace\]
```php
  `/**
   * Overrides prepareTimezone().
   *
   * Override basic component timezone handling to use Drupal's
   * knowledge of the preferred user timezone.
   */
  protected function prepareTimezone($timezone) {`
```
### [](#member-function-implement-interface-method "Permalink to this headline")Member function that implements interface method
```php
  `/**
   * Implements ArrayAccess::offsetExists().
   */
  public function offsetExists($offset) {`
```
### [](#member-constant "Permalink to this headline")Member constant

(needs example)

### [](#member-variable "Permalink to this headline")Member variable

(needs example)

### [](#plugin-annotation "Permalink to this headline")Plugin annotation

[Standards for plugin annotation](http://drupal.org/coding-standards/docs#Plugin)

(needs example)

## [](#misc "Permalink to this headline")Miscellaneous examples

### [](#constant "Permalink to this headline")Constant

(needs link to standards)

\[NEEDS GRAMMAR UPDATE - this example is not well written. Maybe pick a different constant? Also, where did this come from? We're looking for a define() here I think, not a class constant.\]
```php
`/**
 * The block or element is the same for every user and page that it is visible.
 */
const DRUPAL_CACHE_GLOBAL = 0x0008;`
```
### [](#global-variable "Permalink to this headline")Global variable

(needs example, and you might note that these are documented in separate api.php files)

### [](#bullet-lists "Permalink to this headline")Bullet lists

[Standards for using lists](http://drupal.org/coding-standards/docs#lists)

(needs example)

### [](#s-sections-sub-sections-and-in-page-references "Permalink to this headline")Sections, sub-sections, and in-page references

[Standards for using sections](http://drupal.org/coding-standards/docs#section)

(needs example)

### [](#s-code-samples-code "Permalink to this headline")Code samples (@code)

[Standards for using @code](http://drupal.org/coding-standards/docs#code)
```php
 `* For example, one might wish to return a list of the most recent 10 nodes
 * authored by a given user. Instead of directly issuing the SQL query
 * @code
 * SELECT n.nid, n.title, n.created FROM node n WHERE n.uid = $uid LIMIT 0, 10;
 * @endcode`
```
### [](#s-link "Permalink to this headline")@link

[Standards for using @link](http://drupal.org/coding-standards/docs#link)
```php
 `* This framework creates a PHP macro language that allows the server to
 * instruct JavaScript to perform actions on the client browser. When using
 * forms, it can be used with the #ajax property.
 * The #ajax property can be used to bind events to the Ajax framework. By
 * default, #ajax uses 'system/ajax' as its path for submission and thus calls
 * ajax_form_callback() and a defined #ajax['callback'] function.
 * However, you may optionally specify a different path to request or a
 * different callback function to invoke, which can return updated HTML or can
 * also return a richer set of
 * @link ajax_commands Ajax framework commands @endlink.`
```
### [](#s-see "Permalink to this headline")@see

[Standards for using @see](http://drupal.org/coding-standards/docs#see)
```php
`/**
 * Respond to a custom menu creation.
 *
 * This hook is used to notify modules that a custom menu has been created.
 * Contributed modules may use the information to perform actions based on the
 * information entered into the menu system.
 *
 * @param \Drupal\system\Plugin\Core\Entity\Menu $menu
 *   A menu entity.
 *
 * @see hook_menu_update()
 * @see hook_menu_delete()
 */
function hook_menu_insert($menu) {`
```
### [](#topic-group "Permalink to this headline")Defining a topic/group

[Standards for using @defgroup, @ingroup, and @addtogroup](http://drupal.org/coding-standards/docs#defgroup)

(needs example)

### [](#ingroup-addtogroup "Permalink to this headline")@ingroup and @addtogroup

[Standards for using @defgroup, @ingroup, and @addtogroup](http://drupal.org/coding-standards/docs#defgroup)
```php
 `* @ingroup php_wrappers
 */
function drupal_parse_url($url) {`
```
(needs example for addtogroup)

## Tags

[coding standards](/taxonomy/term/190104)

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/1918356/edit), and edit this page
-   Log in, click [Discuss](/node/1918356/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%281918356%29%20API%20Documentation%20Examples) with your suggestion