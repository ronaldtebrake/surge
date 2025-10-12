## Psr 4 Namespaces And Autoloading In Drupal 8

### Rules
- Example `vegetable.module` directory structure:
- modules/vegetable/
- Controller/
- VegetableController.php → class Drupal\\vegetable\\Controller\\VegetableController
- VegetableForm.php → class Drupal\\vegetable\\Form\\VegetableForm
- VegetableBlock.php → class Drupal\\vegetable\\Plugin\\Block\\VegetableBlock
- Tomato.php → class Drupal\\vegetable\\Entity\\Tomato
- Cucumber.php → class Drupal\\vegetable\\Entity\\Cucumber