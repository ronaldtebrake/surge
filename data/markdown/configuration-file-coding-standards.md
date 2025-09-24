# YAML Configuration files

### On this page

-   [Format](/docs/develop/coding-standards/configuration-file-coding-standards#format)
-   [Filename](/docs/develop/coding-standards/configuration-file-coding-standards#filename)
-   [Simple configuration](/docs/develop/coding-standards/configuration-file-coding-standards#s-simple-configuration)
-   [Configuration entities](/docs/develop/coding-standards/configuration-file-coding-standards#s-configuration-entities)
-   [Comments](/docs/develop/coding-standards/configuration-file-coding-standards#comments)
-   [Whitespace](/docs/develop/coding-standards/configuration-file-coding-standards#whitespace)

## [Coding standards](/docs/develop/standards)

-   [PHP](/docs/develop/standards/php)
-   [Accessibility Coding Standards](/docs/develop/standards/accessibility-coding-standards)
-   [CSS](/docs/develop/standards/css)
-   [JavaScript](/docs/develop/standards/javascript-coding-standards)
-   [Markdown coding standards](/docs/develop/coding-standards/markdown-coding-standards)
-   [SQL](/docs/develop/standards/sql)
-   [Twig coding standards](/docs/develop/coding-standards/twig-coding-standards)
-   [Drupal Markup Style Guide](/docs/develop/coding-standards/drupal-markup-style-guide)
-   [Spelling](/docs/develop/standards/spelling)
-   [Configuration file coding standards](/docs/develop/coding-standards/configuration-file-coding-standards)
-   [Composer package naming conventions](/docs/develop/coding-standards/composer-package-naming-conventions)

# YAML Configuration files

Last [updated](/node/2315769/discuss) on

19 January 2023

Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

## [](#format "Permalink to this headline")Format

Configuration files use [YAML syntax](https://yaml.org/spec/).

## [](#filename "Permalink to this headline")Filename

The configuration file name is equal to the unique configuration name with **`.yml`** extension.

The unique configuration name cannot exceed 250 characters.

### [](#s-simple-configuration "Permalink to this headline")Simple configuration

For simple configuration, the unique configuration name **must** start with the extension name (the machine name of the module, theme, or install profile that owns the configuration).

For example, a module with the machine name `mymodule` wants to create a simple configuration for storing the module settings, the configuration name may be `mymodule.settings`, but it may not be `my_module.settings`.

Extensions can also have multiple configuration files, the use of the name `settings` is common practice but is not required, `mymodule` could also create a configuration named `mymodule.features`, if separating them makes logical sense.

### [](#s-configuration-entities "Permalink to this headline")Configuration entities

For configuration entities, the unique configuration name has a prefix, which is equal to `(extension).(config_prefix)`. Here, `(extension)` is the machine name of the module that defines the config entity, or "core" for core entities; `(config_prefix)` is defined in the entity annotation, and defaults to the machine name (ID) of the config entity if it has not been overridden by a `config_prefix` annotation in the entity class. Extension names cannot exceed 50 characters, and config entity config prefixes cannot exceed 32 characters.

The rest of the unique configuration name for a config entity (which is called the *suffix* in the rest of this section) is limited to 150 characters.

For many configuration entities, the suffix consists solely of the individual machine name of the item. For instance, the unique configuration name for an image style is `image.style.(machine_name_of_style)`, and for a view it is `views.view.(machine_name_of_view)`. In these cases, the machine name of the item cannot exceed 150 characters.

For entity bundles, the unique configuration name for the bundle configuration is `(extension).(entity_id).(bundle_config_prefix).(bundle_machine_name)`, where `(extension)` is the module that defines the entity (or "core"), `(entity_id)` is the machine name of the entity this is a bundle of, `(bundle_config_prefix)` is the config prefix defined in the bundle configuration entity class annotation (defaulting to the config entity ID if not defined), and `(bundle_machine_name)` is the machine name of that particular bundle. So for example, the unique configuration name for the Book module's "book" content type for nodes is `node.type.book`, because the config prefix for the NodeType entity is "type", and the node type's machine name in this case is "book". Entity and bundle IDs and config prefixes are limited to 32 characters.

For configuration like field instances and view modes, it's an even more complex structure. For instance, the view mode structure is `entity.view_mode.(target_entity_type).(view_mode_machine_name)` (example: entity.view\_mode.node.teaser), and field instances are `field.instance.(target_entity_type).(target_bundle).(field_machine_name)` (example: field.instance.node.article.body). In these cases, sensible maximums need to be chosen for each component of the unique configuration name, so that the suffix portion does not exceed 150 characters.

## [](#comments "Permalink to this headline")Comments

Comments are not typically in config files, but can be made using `#`.

## [](#whitespace "Permalink to this headline")Whitespace

Use two spaces to indent in config files. In [YAML](https://yaml.org/), the white space has semantic meaning to represent nested structures.

## Tags

[coding standards](/taxonomy/term/190104)

## Help improve this page

**Page status:** No known problems

  
**You can:**  

-   Log in, click [Edit](/node/2315769/edit), and edit this page
-   Log in, click [Discuss](/node/2315769/discuss), update the Page status value, and suggest an improvement
-   Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282315769%29%20YAML%20Configuration%20files) with your suggestion