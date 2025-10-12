## Php Coding Standards

### Rules
- Arrays should be formatted using short array syntax with a space separating each element (after the comma), and spaces around the => key association operator, if applicable:
- Note that if the line declaring an array spans longer than 80 characters (often the case with form and menu declarations), each element should be broken into its own line, and indented one level:
- Note that, as seen above, in multi-line arrays there MUST be a comma after the last array element. This helps prevent parsing errors if another element is placed at the end of the list later.
- Put a space between the (type) and the $variable in a cast: `(int) $mynumber`.
- PHP allows objects returned from functions and methods to be "chained", that is, a method on the returned object may be called immediately. This is known as a 'fluent interface.' Here is an example:
- As a general rule, a method should return $this, and thus be chainable, in any case where there is no other logical return value. Common examples are those methods that set some state or property on the object. It is better in those cases to return $this rather than TRUE/FALSE or NULL.
- In the case where you have a fluent interface for a class, and the code spans more than one line, the method calls should be indented with 2 spaces:
- When calling class constructors with no arguments, always include parentheses: