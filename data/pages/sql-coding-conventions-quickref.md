## Sql Coding Conventions

### Rules
- All identifiers in SQL query should be quoted. Table names are quoted using curly brackets, for example, `{table_name}`. All other identifiers are quoted using square brackets, for example, `[column_name]`.
- Don't use (ANSI) SQL / MySQL / PostgreSQL / MS SQL Server / ... Reserved Words for column and/or table names. Even if this may work with your (MySQL) installation, it may not with others or with other databases. Some references:
- [(ANSI) SQL Reserved Words](/node/141051)
- Some commonly misused keywords: `TIMESTAMP, TYPE, TYPES, MODULE, DATA, DATE, TIME, ...`
- Make SQL reserved words UPPERCASE. This is not a suggestion. Drupal db abstraction commands will fail if this convention is not followed.
- Make column and constraint names lowercase.
- Enclose each table name with `{}` (this allows Drupal to prefix table names).
- Preventing SQL injection is easy; db\_query provides a way to use parametrized queries. Drupal's database functions replace the sprintf-like placeholders with the properly escaped arguments in order of appearance: