## Php Exceptions

### Rules
- 2.  All Exceptions must end with the suffix "Exception".
- 3.  All Exceptions should include an appropriate message and should not be translated. Only messages from the install and update system are currently translated as they are user facing.
- 4.  The Exception's message should include a hint to the values that caused the exception.
- 1.  Formatting messages should be done by concatenating strings or using `sprintf()`.
- 2.  Values should be surrounded by single quotes.
- 3.  **DO NOT** translate the message.
- 4.  **DO NOT** use `SafeMarkup::format()`.
- 5.  Exception classes should be named for the subsystem to which they relate, and the type of error. That is, `[Subsystem][ErrorType]Exception`.