## Avoid Select From

### Rules
- [SQL coding conventions](/docs/develop/standards/sql/sql-coding-conventions)
- [List of SQL reserved words](/docs/develop/coding-standards/list-of-sql-reserved-words)
- [Avoid "SELECT \* FROM ..."](/docs/develop/coding-standards/avoid-select-from)
- Last [updated](/node/374660/discuss) on
- 25 April 2024
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- Using `SELECT * FROM {node}` queries in versions prior to Drupal 7 can introduce a potential security issue by causing Drupal's Node Access system to be bypassed. In such cases, private content may be shown to unprivileged users. Therefore, queries that generate lists of nodes should avoid SELECT \* syntax in all cases. Instead use `SELECT nid, ...`.
- It is recommended to avoid SELECT \* queries in general. They are less self-documenting than explicitly listing the fields to be retrieved and also very slightly slower. Generally, SELECT \* should be used in only two cases: