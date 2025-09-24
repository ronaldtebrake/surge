# Bullet Points for composer-package-naming-conventions.md


## Composer package naming conventions

## On this page
- [Drupal Projects](/docs/develop/coding-standards/composer-package-naming-conventions#s-drupal-projects)
- [The vendor part](/docs/develop/coding-standards/composer-package-naming-conventions#s-the-vendor-part)
- [The package name part](/docs/develop/coding-standards/composer-package-naming-conventions#s-the-package-name-part)
- [In Drupal.org URLs](/docs/develop/coding-standards/composer-package-naming-conventions#s-in-drupalorg-urls)
- [Some extraordinary cases](/docs/develop/coding-standards/composer-package-naming-conventions#s-someextraordinary-cases)
- [Drupal (Sub-)Modules, Themes and Profiles](/docs/develop/coding-standards/composer-package-naming-conventions#s-drupal-sub-modules-themes-and-profiles)
- [Convention](/docs/develop/coding-standards/composer-package-naming-conventions#s-convention)
- [Examples](/docs/develop/coding-standards/composer-package-naming-conventions#s-examples)
- [Components](/docs/develop/coding-standards/composer-package-naming-conventions#s-components)
- [Convention](/docs/develop/coding-standards/composer-package-naming-conventions#s-convention--2)
- [Examples](/docs/develop/coding-standards/composer-package-naming-conventions#s-examples--2)

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

## Composer package naming conventions
- Last [updated](/node/2471927/discuss) on
- 19 June 2025
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- With Drupal adopting [Composer](https://getcomposer.org/) as dependency manager, the community has to follow a naming convention for composer package names to avoid conflicts. How you define your own package with a composer.json can be found in [Add a composer.json file to define your module as a PHP package](/node/2514612). In general, Composer [only](https://getcomposer.org/doc/01-basic-usage.md#package-names) allows for package names like so: `vendor/project`. You cannot use more than two levels. This leads to the following conventions.

## [](#s-drupal-projects "Permalink to this headline")Drupal Projects
- Composer uses its own type of registers to track millions of different packages; usually, these are referred to as "Composer repositories" (to avoid any confusion with "Git repositories," which are slightly different things). The factory default Composer repository is seen on Packagist.org, but there can be an unlimited number of such Composer repositories publicly available on the Internet. The Drupal community also has its own: the `https://packages.drupal.org/8` service has no graphical interface as it is not meant for browsing manually from a web browser.

## [](#s-the-vendor-part "Permalink to this headline")The vendor part
- Having several independent registers out on the Internet brings the risk of namespace conflict: when two separate repositories would offer two different software packages with the same name of `great-vendor/fantastic-package`. To avoid such collisions, the global Composer ecosystem applies some countermeasures. The Drupal community has the vendor name "drupal" reserved for itself. Therefore, all software packages available for download from our `https://packages.drupal.org/8` Composer repository must have "drupal" as the first part of their name.

## [](#s-the-package-name-part "Permalink to this headline")The package name part
- As you can see from the above, all software packages within all repositories must also have individually identifiable names. Once the first part, "drupal/", is commonly shared by all in our repository, the second part of the name must be unique. Fortunately, the Drupal ecosystem already has such a distinct naming convention as the "machine names" of modules, themes, and profiles. Thus, using these internally already used machine names as the second part of the Composer package names also seems obvious. An important note here: although the hyphen ("-") is more common for separating words in Composer vendor and package names, Drupal's machine names use an underscore ("\_") for this instead. For example, if you have your contrib module called "My Module" as its human label, then its machine name used within the Drupal world will be derived as "my\_module" probably (not mandatory, but recommended). Finally, its package name in Composer's global namespace derives from the machine name and becomes `drupal/my_module` (required to match).

## [](#s-in-drupalorg-urls "Permalink to this headline")In Drupal.org URLs
- When we said that our own Composer repository at `https://packages.drupal.org/8` is not meant for manual browsing, it's important to note that Drupal.org's project browsing features (the search forms on [/project\_module](/project/project_module) or [/project\_theme](/project/project_theme)) replace that functionality. Whenever you navigate to a dedicated page of a given project (like [drupal.org/project/admin\_toolbar](/project/admin_toolbar), for example), the very same machine name of the project appears in the URL path after `https://drupal.org/project/…` as well. Seeing such a URL, you can be almost 100% certain that the package name of that contrib module is probably `drupal/admin_toolbar`. This general thumb rule for matching Composer package names with Drupal machine names makes the daily work of site builders and developers maintaining Drupal websites much easier. If you are interested about the historical discussions related to establishing this naming convention back in 2015, you can [read more here](/project/drupal/issues/2401519).

## [](#s-someextraordinary-cases "Permalink to this headline")Some extraordinary cases
- *Drupal* itself is a project: drupal.org/project/drupal → `drupal/drupal`
- But *Core* is a subtree of Drupal: drupal.org/project/core → `drupal/core`
- *Datetime* is a module within Drupal Core: drupal.org/project/datetime → `drupal/datetime`
- *Views* in Drupal 7 was a contrib project: drupal.org/project/views → `drupal/view`, but today is part of Drupal core
- Some project URLs are not accessible or point to another project, as they are reserved names. In most cases those are sub-modules or sub-themes of existing projects, like Drupal core.

## [](#s-drupal-sub-modules-themes-and-profiles "Permalink to this headline")Drupal (Sub-)Modules, Themes and Profiles
- Multiple modules, themes and profiles might be part of a single Drupal project, for example `system, node, standard` in [Drupal](https://www.drupal.org/project/drupal) or `page_manager, views_content` in [ctools](https://www.drupal.org/project/ctools). As Drupal won't let you run two modules with the same name, modules, themes, profiles and Drupal projects share the same namespace.

## [](#s-convention "Permalink to this headline")Convention
- Sub-modules, -themes and profiles must use the package name.
- `drupal/SUBPROJECT`
- where `SUBPROJECT` is the machine name of the module, theme or profile.
- This will not conflict with `drupal/PROJECT`, as Project names share the same namespace with modules, themes and profiles due to the way Drupal works.
- Over time, some projects may merge into or were split from another project. For example *Views* was merged into *Drupal 8* or *[Page Manager](https://www.drupal.org/project/page_manager)* was separated from *ctools* for a Drupal 8 release. Because of different version numbers, these cases can be resolved by utilizing [Composer's replace property](https://getcomposer.org/doc/04-schema.md#replace) and/or using different composer repositories.
- In the case naming conflicts cannot be resolved, *Drupal Projects* shall take precedence over (sub-)modules, themes and profiles.
- For avoiding dependency issues, Drupal projects declaring their own composer.json, should also add their submodules and -themes to the `replace`\-section.

## [](#s-examples "Permalink to this headline")Examples
- Module `devel_generate` from [Devel](https://www.drupal.org/project/devel) → `drupal/devel_generate`
- Drupal 8 core's Views module can be specified as `drupal/views`, but the dependency will be resolved as a contrib replacement by `drupal/core`.
- Based on this convention, meta-packages or subtree-splits could be provided for every module, theme and profile.

## [](#s-components "Permalink to this headline")Components
- Drupal projects may also contain custom components (like PHP libraries). As those components are not bound to any namespace, they are likely to conflict with a given Drupal project, module, theme, etc..

## [](#s-convention--2 "Permalink to this headline")Convention
- Package names must be prefixed with their parent's name and a dash (`-`), in the case it will use the `drupal/` vendor:
- `drupal/PARENT-COMPONENT`
- where `PARENT` is the name of the parent package and `COMPONENT` a sufficient name for the component.
- Since the `-` (dash) is **not** used in the existing drupal namespace, it *shouldn't* conflict in anyway to what is currently in Drupal.

## [](#s-examples--2 "Permalink to this headline")Examples
- [Datetime](https://github.com/drupal/drupal/tree/8.0.x/core/lib/Drupal/Component/Datetime) becomes `drupal/core-datetime`
- [Diff](https://github.com/drupal/drupal/tree/8.0.x/core/lib/Drupal/Component/Diff) becomes `drupal/core-diff`
- This also allows contrib to expose components like so: `drupal/panels-renderer` or `drupal/ds-builder`

## Tags
- [coding standards](/taxonomy/term/190104)

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/2471927/edit), and edit this page
- Log in, click [Discuss](/node/2471927/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282471927%29%20Composer%20package%20naming%20conventions) with your suggestion