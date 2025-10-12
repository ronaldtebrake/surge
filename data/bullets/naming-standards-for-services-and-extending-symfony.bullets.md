
## Naming standards for services and extending Symfony

## Naming standards for services and extending Symfony

## Manipulating the Request object:
- Elements added to the attributes of the Request object by any Drupal module or service should have a "\_" prepended unless they come from the path.
- Only values that come from the path will have the "\_" omitted, for example, the path pattern /node/{node}.
- Drupal core and Symfony typically add some prefixed attributes that should not be overwritten by a contributed module. These include:
- (Note that \_account is being removed in [#2073531: Use current user service instead of \_account, remove \_account from the request object](/project/drupal/issues/2073531 "Status: Closed (fixed)").)
- and from Symfony\\Cmf\\Component\\Routing\\RouteObjectInterface:
- See the [the original change notice](/node/2083979).