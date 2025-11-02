- Reserved Words:
  - All identifiers in SQL query should be quoted. 
  - Table names are quoted using curly brackets, for example, `{table_name}`. 
  - All other identifiers are quoted using square brackets, for example, `[column_name]`.
  - Do not use (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names.

- Capitalization and user-supplied data:
  - Make SQL reserved words UPPERCASE. 
  - Make column and constraint names lowercase.
  - Enclose each table name with `{}`.
  - Move variable arguments out of the query body and pass in as separate parameters to db_query functions.
  - Use placeholders specifying the type of each argument (`%d|%s|%|%f|%b`) in the query body.
  - Literal arguments can either be included in the query body or handled in the same way as variable arguments.
  - Any string literal or %s placeholder must be enclosed by single quotes: `'`. Never use double quotes.

- Naming:
  - Use singular nouns for table names.
  - Prefix table names with the module name to prevent possible namespace conflicts.
  - Name every constraint (primary, foreign, unique keys) yourself.
  - Index names should begin with the name of the table they depend on.

- Configure your Database server for standard compliance:
  - Configure Database Servers to run in a (more) standard compliant mode.
  - Enable ANSI and Strict Mode for MySQL.

- Indentation:
  - Drupal does not have a standard method for indentation or formatting of longer SQL queries on multiple lines.