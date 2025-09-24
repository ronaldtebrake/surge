# Bullet Points for twig-coding-standards.md


## Twig coding standards

## On this page
- [The DocBlock](/docs/develop/coding-standards/twig-coding-standards#docblock)
- [Variables in the DocBlock](/docs/develop/coding-standards/twig-coding-standards#variables)
- [Variable definitions in the DocBlock](/docs/develop/coding-standards/twig-coding-standards#datatypes)
- [Variables referenced inline in the DocBlock](/docs/develop/coding-standards/twig-coding-standards#variables-inline)
- [Expressions](/docs/develop/coding-standards/twig-coding-standards#expressions)
- [Expressions: Checking if variables are available for printing](/docs/develop/coding-standards/twig-coding-standards#s-expressions-checking-if-variables-are-available-for-printing)
- [Expressions: looping](/docs/develop/coding-standards/twig-coding-standards#s-expressions-looping)
- [Expressions: setting variables](/docs/develop/coding-standards/twig-coding-standards#s-expressions-setting-variables)
- [HTML attributes](/docs/develop/coding-standards/twig-coding-standards#attributes)
- [Whitespace Control](/docs/develop/coding-standards/twig-coding-standards#whitespace)
- [The spaceless filter](/docs/develop/coding-standards/twig-coding-standards#spaceless)
- [The "dash" (-) whitespace modifier](/docs/develop/coding-standards/twig-coding-standards#s-the-dash-whitespace-modifier)
- [Filters](/docs/develop/coding-standards/twig-coding-standards#filters)
- [Comments](/docs/develop/coding-standards/twig-coding-standards#comment)

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

## Twig coding standards
- Last [updated](/node/1823416/discuss) on
- 19 January 2023
- This documentation **needs work**. See "Help improve this page" in the sidebar.
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- *The majority of [Twig coding standards](https://twig.symfony.com/doc/coding_standards.html) can be found on the Twig website along with [Twig documentation](https://twig.symfony.com/documentation).** Items on this page (below) are useful when understanding how to write Twig code for Drupal.
- Also see our [preprocess function documentation standards](http://drupal.org/node/1913208).

## [](#docblock "Permalink to this headline")The DocBlock
- A docblock at the top of a Twig template should be identical to the docblock at the top of a PHPTemplate file (see [Drupal API documentation standards for theme template files](http://drupal.org/coding-standards/docs#templates)), with the entire docblock wrapped in the twig comment markers, {# and #}.
- Twig template docblocks should only include `@ingroup themeable` if the template is providing the default themeable output. For themes overriding default output the `@ingroup themeable` line should not be included.
- Default theme implementation for a region.
- Available variables:
- - content: The content for this region, typically blocks.
- - attributes: Remaining HTML attributes for the element, including:
- - class: HTML classes that can be used to style contextually through CSS.
- @see template_preprocess_region()
- @ingroup themeable

## }`

## [](#variables "Permalink to this headline")Variables in the DocBlock
- Variables in a twig template docblock should be referenced by name. They will not be surrounded by the Twig print indicators {{ and }} and will not be preceded by the PHP variable indicator $. There should be no separate "Other variables" section.
- A good rule of thumb for converting docs at the top of templates is as follows
- Start from what we had in Drupal 7.
- If you see a section of variables titled "Other variables", delete the title and the extra line above.
- if/when variables get deleted from preprocess, delete them from the Twig docs.
- if/when a variable looks useful and is not in the Twig docs, document it.
- if/when you can improve, or reduce the verbosity of the D7 docs, do it.

## [](#datatypes "Permalink to this headline")Variable definitions in the DocBlock
- Variable definitions should not include any information about the type of variable (array, object, string) since people working in template files should not have to care about type. Everything that can be printed in a Twig template will end up printing as a string.

## [](#variables-inline "Permalink to this headline")Variables referenced inline in the DocBlock
- When a variable is referenced in-line in paragraphs the variable name should be wrapped in single quotes, as follows:
- `* Field variables: for each field instance attached to the node a corresponding
- variable is defined; for example, 'node.body' becomes 'body'. When needing to
- access a field's raw values, developers/themers are strongly encouraged to
- use these variables. Otherwise they will have to explicitly specify the
- desired field language; for example, 'node.body.en', thus overriding any
- language negotiation rule that was previously applied.`

## [](#expressions "Permalink to this headline")Expressions
- Twig expressions are very similar to regular PHP expressions, and are most commonly used in Drupal to check if variables are available for printing, for looping, and for setting new variables within templates.

## [](#s-expressions-checking-if-variables-are-available-for-printing "Permalink to this headline")Expressions: Checking if variables are available for printing
- Sometimes you only want to print a markup container if there is a value to be printed inside it. The way we do this in Drupal is as follows:
- `{% if foo %}
- <div>{{ foo }}</div>
- {% endif %}`
- You do not need to use 'is defined' after your variable to determine if it is available.
- There are sometimes issues with using this method for determining emptiness. Discussion and workarounds on [https://www.drupal.org/project/drupal/issues/953034](https://www.drupal.org/project/drupal/issues/953034) .

## [](#s-expressions-looping "Permalink to this headline")Expressions: looping
- Twig uses `for` loops, and in Drupal we are used to using `foreach` loops.
- If you don't need array keys, your loop should look like this:
- `{% for item in navigation %}
- <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
- {% endfor %}`
- If you need both a keys and values, your loop syntax will look like this:
- `{% for key, value in items %}
- <div class="{{ key }}">{{ value }}</div>
- {% endfor %}`

## [](#s-expressions-setting-variables "Permalink to this headline")Expressions: setting variables
- Expressions can also be used for setting variables directly in template files.
- `{% set list = ['Alice', 'Bob'] %}
- {% set text = ':person is a Twig fan'|t({':person': list[0] }) %}`

## [](#attributes "Permalink to this headline")HTML attributes
- HTML attributes in Drupal 8 are drillable. This means that you can print all of them at once by printing `{{ attributes }}` or you can print each attribute individually, like so:
- `<div id="{{ attributes.id }}" class="{{ attributes.class }}"{{ attributes }}>
- {{ content }}
- If you choose to print out individual attributes within a HTML tag, you should still include the complete `{{ attributes }}` at the end, so that attributes added by modules are still also printed.
- *In Drupal core**, we will print only the class attribute specially, all the others will be printed as part of `{{ attributes }}`. The reason for this is that it needs to be very easy for front end developers to be able to add a class, anywhere. By printing the `class=""` attribute directly in the template file, people familiar with HTML and CSS will see and recognize the correct way to add a class without needing to read documentation, or understand that Drupal has a preprocess layer.
- `<div class="{{ attributes.class }}"{{ attributes }}>
- {{ content }}
- More advanced theme developers may choose to add their classes in preprocess and remove these separately printed classes from templates. This will prevent the empty `class=""` attribute from being printed when an element has no classes.
- `<div{{ attributes }}>
- {{ content }}

## [](#whitespace "Permalink to this headline")Whitespace Control  
- Outdated. This section needs to be updated.
- @see [https://www.drupal.org/project/drupal/issues/3094850](https://www.drupal.org/project/drupal/issues/3094850)
- @see [https://symfony.com/blog/better-white-space-control-in-twig-templates](https://symfony.com/blog/better-white-space-control-in-twig-templates)
- There are two whitespace control features in Twig: the `spaceless` filter (used with the `apply` tag) and the dash character (-). The `spaceless` filter removes any whitespace *between* HTML and Twig tags, while the dash character `-`, when set on the inside of Twig tags, removes any whitespace *surrounding* that tag in the direction of the dash. The spaceless filter is more general and its effects are "inward" facing. The dash is more precise and its effects are "outward" facing.

## [](#spaceless "Permalink to this headline")The spaceless filter
- The [`spaceless`](https://twig.symfony.com/doc/1.x/filters/spaceless.html) filter (used with the `apply` tag) is helpful for removing all non-text whitespace between several tags and statements. It is Drupal core's preferred method for controlling whitespace in blocks of code. However each use introduces one extra level of indentation.
- ([The spaceless filter](https://twig.symfony.com/doc/1.x/filters/spaceless.html) can also be used with a pipe `|` to remove whitespace between HTML tags.)

## [](#s-the-dash-whitespace-modifier "Permalink to this headline")The "dash" (-) whitespace modifier
- The `-` dash modifier is a more precise (and sometimes confusing) way of selectively removing whitespace from around one or more sides of a tag. *We do not need to use the `-` dash modifier* very often. Code is usually easier to read when using the spaceless filter.
- Whitespace control features will generally be used sparingly in core.
- Example usage:
- `{% if block.show %}
- <div class="admin-panel">
- {% apply spaceless %}
- {% if block.title %}
- {{ title_prefix }}
- <h3>{{ block.title }}</h3>
- {{ title_suffix }}
- {% endif %}
- {% endapply %}
- {% if block.content %}
- <div class="body">{{ block.content }}</div>
- {% elseif block.description %}
- <div class="description">{{ block.description }}</div>
- {% endif %}
- {% endif %}`
- The indented markup should appear as follows:
- `<div class="admin-panel">
- <h3>Title</h3>
- <div class="body">Content</div>
- We may revisit this decision about use of whitespace controllers later, after converting everything to twig and examining our resulting Twig code, and the markup that is produced. For now, our main goal is not to confuse people who are new to Twig, and that may mean using Twig's built-in tools less frequently.
- DOs and DON'Ts for using spaces and whitespace controllers and spaceless filters in Twig templates:
- If you can remove the whitespace legibly, do so.
- Remove the space before attributes `<div{{ attributes }}>`
- Never remove spaces or add a whitespace controllers around classes `class="no {{ attributes.class }} no"`
- If you can't remove the whitespace legibly, consider using the spaceless filter. Examples:
- Apply the spaceless filter around commands (`{% if foo %} ...`)
- Apply the spaceless filter around comments `{# this is a comment #}`
- *Caveat regarding newlines at the end of files**
- Git requires that twig files need a newline at the end of the file. This can break tests or may be not wanted in your template output.
- The recommendation to change this:
- Change the test if it needs to pass.
- Or add a twig template tag to the end.
- If you're not in Drupal Core contrib you can just remove the newline character.

## [](#filters "Permalink to this headline")Filters
- Some of the most common Drupal functions like `t` and `url` have been made available in your twig templates as *filters*. Filters are triggered by using the pipe character `|` .
- This is how you would use the t() function as a filter in a twig template.
- `<div class="preview-image-wrapper">
- {{ 'Original'|t }}
- See also: [spaceless filter](#spaceless).
- Please do not put spaces on either side of the pipe.

## [](#comment "Permalink to this headline")Comments
- All comments will be surrounded by the twig comment indicator {# and #}.
- Comments that span one line will have the comment indicators on the same line as the comment.
- `<div class="image-widget-data">
- {# Render widget data without the image preview that was output already. #}
- {{ data|without('preview') }}
- Comments that span more than one line will have the comment indicators on separate lines. Comments should be wrapped so the line is less than 80 characters.
- This is a very long comment. It spans more than one line. This is a very
- long comment. It spans more than one line. This is a very long comment. It
- spans more than one line. This is a very long comment. It spans more than

## }
- <div class="{{ attributes.class }}"{{ attributes }}>
- {{ content }}

## Tags
- [coding standards](/taxonomy/term/190104)

## Help improve this page
- *Page status:** Needs work
- *You can:**
- Log in, click [Edit](/node/1823416/edit), and edit this page
- Log in, click [Discuss](/node/1823416/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%281823416%29%20Twig%20coding%20standards) with your suggestion