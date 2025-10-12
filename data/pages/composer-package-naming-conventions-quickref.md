## Composer Package Naming Conventions

### Rules
- As you can see from the above, all software packages within all repositories must also have individually identifiable names. Once the first part, "drupal/", is commonly shared by all in our repository, the second part of the name must be unique. Fortunately, the Drupal ecosystem already has such a distinct naming convention as the "machine names" of modules, themes, and profiles. Thus, using these internally already used machine names as the second part of the Composer package names also seems obvious. An important note here: although the hyphen ("-") is more common for separating words in Composer vendor and package names, Drupal's machine names use an underscore ("\_") for this instead. For example, if you have your contrib module called "My Module" as its human label, then its machine name used within the Drupal world will be derived as "my\_module" probably (not mandatory, but recommended). Finally, its package name in Composer's global namespace derives from the machine name and becomes `drupal/my_module` (required to match).
- *Drupal* itself is a project: drupal.org/project/drupal → `drupal/drupal`
- But *Core* is a subtree of Drupal: drupal.org/project/core → `drupal/core`
- *Datetime* is a module within Drupal Core: drupal.org/project/datetime → `drupal/datetime`
- *Views* in Drupal 7 was a contrib project: drupal.org/project/views → `drupal/view`, but today is part of Drupal core
- Some project URLs are not accessible or point to another project, as they are reserved names. In most cases those are sub-modules or sub-themes of existing projects, like Drupal core.
- Sub-modules, -themes and profiles must use the package name.
- where `SUBPROJECT` is the machine name of the module, theme or profile.