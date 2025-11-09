- Reserved Words:
  - In SQL queries, all identifiers should be quoted.
  - Table names should be quoted using curly brackets `{table_name}`.
  - All other identifiers should be quoted using square brackets `[column_name]`.
  - Avoid using (ANSI) SQL, MySQL, PostgreSQL, MS SQL Server, etc. reserved words for column and/or table names.

- Capitalization and User-Supplied Data:
  - SQL reserved words should be in UPPERCASE.
  - Column and constraint names should be in lowercase.
  - Enclose each table name with `{}` for Drupal to prefix table names.
  - Move variable arguments out of the query body and pass them as separate parameters to `db_query()`, `db_query_range()`, and `db_query_temporary()`.
  - Use placeholders specifying the type of each argument (`%d|%s|%|%f|%b`) in the query body.
  - String literal or %s placeholder must be enclosed by single quotes `'`. Double quotes should not be used.

- Naming:
  - Use singular nouns for table names.
  - Prefix table names with the module name to prevent possible namespace conflicts.
  - Name every constraint (primary, foreign, unique keys) yourself to avoid system-generated names in error messages.
  - Index names should begin with the name of the table they depend on.

- Database Server Configuration:
  - Configure your Database Server for standard compliance.
  - Enable ANSI and Strict Mode in MySQL.

- Indentation:
  - Drupal does not have a standard method for indentation or formatting of longer SQL queries on multiple lines.