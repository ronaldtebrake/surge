- Reserved Words:
  - In SQL queries, all identifiers should be quoted.
  - Table names should be quoted using curly brackets, for example, `{table_name}`.
  - All other identifiers should be quoted using square brackets, for example, `[column_name]`.
  - Avoid using (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names.

- Capitalization and User-Supplied Data:
  - SQL reserved words should be in UPPERCASE.
  - Column and constraint names should be in lowercase.
  - Enclose each table name with `{}`.
  - Move variable arguments out of the query body and pass them in as separate parameters.
  - Use placeholders specifying the type of each argument (`%d|%s|%|%f|%b`) in the query body.
  - String literal or %s placeholder must be enclosed by single quotes: `'`. Never use double quotes.

- Naming:
  - Use singular nouns for table names.
  - Prefix table names with the module name to prevent possible namespace conflicts.
  - Name every constraint (primary, foreign, unique keys) yourself.
  - Index names should begin with the name of the table they depend on.

- Configure your Database Server for Standard Compliance:
  - Configure your database server to run in a (more) standard compliant mode.
  - For MySQL, enable ANSI and Strict Mode.

- Indentation:
  - Drupal does not have a standard method for indentation or formatting of longer SQL queries on multiple lines.