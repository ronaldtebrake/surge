## Jquery Coding Standards

### Rules
- In any part of your code it should be easy to understand which variables are jQuery objects and which are not.
- *Incorrect**
- When assigning a jQuery object to a variable:
- When assigning a jQuery object to a property:
- When assigning a jQuery object to a variable:
- When assigning a jQuery object to a property:
- *Incorrect**
- Every event (e.g. click, mouseover, etc.) in JavaScript “bubbles” up the DOM tree to parent elements. This is incredibly useful when you want many elements to call the same function. Instead of binding an event listener function to all of them, you can bind it once to their parent, and have it figure out which node triggered the event.