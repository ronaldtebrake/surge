- Reserved Words:
  - For Drupal 8 and 9, all identifiers in SQL query should be quoted. Table names are quoted using curly brackets `{table_name}` and all other identifiers are quoted using square brackets `[column_name]`.
  - For Drupal 7, avoid using (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names.

- Capitalization and User-Supplied Data:
  - SQL reserved words should be in UPPERCASE.
  - Column and constraint names should be in lowercase.
  - Enclose each table name with `{}`.
  - Move variable arguments out of the query body and pass them as separate parameters.
  - Use placeholders specifying the type of each argument (`%d|%s|%|%f|%b`) in the query body.
  - Literal arguments can either be included in the query body or handled in the same way as variable arguments.
  - Enclose any string literal or %s placeholder by single quotes `'`.

- Naming:
  - Use singular nouns for table names.
  - Prefix table names with the module name to prevent possible namespace conflicts.
  - Name every constraint (primary, foreign, unique keys) yourself.
  - Begin index names with the name of the table they depend on.

- Database Server Configuration:
  - Configure your Database server for standard compliance.
  - Enable ANSI and Strict Mode for MySQL.

- Indentation:
  - Drupal does not have a standard method for indentation or formatting of longer SQL queries on multiple lines.