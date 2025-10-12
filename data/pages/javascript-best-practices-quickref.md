## Javascript Best Practices

### Rules
- This page covers DOM and Drupal specific code styles.
- JavaScript code SHOULD NOT be embedded in the HTML where possible, as it adds significantly to page weight with no opportunity for mitigation by caching and compression.
- Code SHOULD use literal expressions instead of the `new` operator:
- Use `[]` instead of `new Array()`
- Use `{}` instead of `new Object()`
- It is RECOMMENDED to use literal expressions instead of the wrapper forms `new Number`, `new String`, `new Boolean` in situations where the literal expression is the same. However, you MAY use object instances in which it matters:
- The `with` statement MUST NOT be used, since it is not possible to use `with` with enabled strict mode.
- Instead, you SHOULD use the explicit longer version: