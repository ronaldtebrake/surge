- Reserved Words:
  - In Drupal 8 and 9, all identifiers in SQL query should be quoted. Table names are quoted using curly brackets, for example, `{table_name}`. All other identifiers are quoted using square brackets, for example, `[column_name]`.
  - In Drupal 7, avoid using (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names.

- Capitalization and user-supplied data:
  - Make SQL reserved words UPPERCASE.
  - Make column and constraint names lowercase.
  - Enclose each table name with `{}`.
  - Move variable arguments out of the query body and pass in as separate parameters to db_query functions.
  - Use placeholders specifying the type of each argument in the query body.
  - Enclose any string literal or %s placeholder by single quotes: `'`. Never use double quotes.

- Naming:
  - Use singular nouns for table names.
  - Prefix table names with the module name to prevent possible namespace conflicts.
  - Name every constraint (primary, foreign, unique keys) yourself.
  - Begin index names with the name of the table they depend on.

- Configure your Database server for standard compliance:
  - Enable ANSI and Strict Mode for MySQL.
  - Encourage developers to use the mode most standard compliant to avoid sloppy coding and compatibility problems.

- Indentation:
  - Drupal does not have a standard method for indentation or formatting of longer SQL queries on multiple lines.