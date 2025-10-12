## Configuration File Coding Standards

### Rules
- The configuration file name is equal to the unique configuration name with **`.yml`** extension.
- The unique configuration name cannot exceed 250 characters.
- For simple configuration, the unique configuration name **must** start with the extension name (the machine name of the module, theme, or install profile that owns the configuration).
- For example, a module with the machine name `mymodule` wants to create a simple configuration for storing the module settings, the configuration name may be `mymodule.settings`, but it may not be `my_module.settings`.
- Extensions can also have multiple configuration files, the use of the name `settings` is common practice but is not required, `mymodule` could also create a configuration named `mymodule.features`, if separating them makes logical sense.
- For configuration entities, the unique configuration name has a prefix, which is equal to `(extension).(config_prefix)`. Here, `(extension)` is the machine name of the module that defines the config entity, or "core" for core entities; `(config_prefix)` is defined in the entity annotation, and defaults to the machine name (ID) of the config entity if it has not been overridden by a `config_prefix` annotation in the entity class. Extension names cannot exceed 50 characters, and config entity config prefixes cannot exceed 32 characters.
- The rest of the unique configuration name for a config entity (which is called the *suffix* in the rest of this section) is limited to 150 characters.
- For many configuration entities, the suffix consists solely of the individual machine name of the item. For instance, the unique configuration name for an image style is `image.style.(machine_name_of_style)`, and for a view it is `views.view.(machine_name_of_view)`. In these cases, the machine name of the item cannot exceed 150 characters.