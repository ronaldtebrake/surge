# Bullet Points for psr-4-namespaces-and-autoloading-in-drupal-8.md


## PSR-4 namespaces and autoloading in Drupal 8

## On this page
- [Summary](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8#s-summary)
- [Namespace resolution](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8#s-namespace-resolution)

## [PHP](/docs/develop/standards/php)
- [PHP coding standards](/docs/develop/standards/php/php-coding-standards)
- [API documentation and comment standards](/docs/develop/standards/php/api-documentation-and-comment-standards)
- [API Documentation Samples](/docs/develop/standards/php/api-documentation-examples)
- [Namespaces](/docs/develop/coding-standards/namespaces)
- [Naming standards for services and extending Symfony](/docs/develop/coding-standards/naming-standards-for-services-and-extending-symfony)
- [PHP Exceptions](/docs/develop/coding-standards/php-exceptions)
- [PSR-4 namespaces and autoloading in Drupal 8](/docs/develop/standards/php/psr-4-namespaces-and-autoloading-in-drupal-8)
- [Temporary placeholders and delimiters](/docs/develop/coding-standards/temporary-placeholders-and-delimiters)
- [Write E\_ALL compliant code](/docs/develop/coding-standards/write-e_all-compliant-code)

## PSR-4 namespaces and autoloading in Drupal 8
- Last [updated](/node/2156625/discuss) on
- 13 December 2022
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).

## [](#s-summary "Permalink to this headline")Summary
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

## [](#s-namespace-resolution "Permalink to this headline")Namespace resolution
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

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/2156625/edit), and edit this page
- Log in, click [Discuss](/node/2156625/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%282156625%29%20PSR-4%20namespaces%20and%20autoloading%20in%20Drupal%208) with your suggestion