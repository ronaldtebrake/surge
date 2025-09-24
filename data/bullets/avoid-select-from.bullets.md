# Bullet Points for avoid-select-from.md


## Avoid "SELECT * FROM ..."

## [SQL](/docs/develop/standards/sql)
- [SQL coding conventions](/docs/develop/standards/sql/sql-coding-conventions)
- [List of SQL reserved words](/docs/develop/coding-standards/list-of-sql-reserved-words)
- [Avoid "SELECT \* FROM ..."](/docs/develop/coding-standards/avoid-select-from)

## Avoid "SELECT \* FROM ..."
- Last [updated](/node/374660/discuss) on
- 25 April 2024
- Note: Changes to Drupal coding standards are proposed and discussed in issues in the [Coding Standards project](/project/coding_standards).
- Using `SELECT * FROM {node}` queries in versions prior to Drupal 7 can introduce a potential security issue by causing Drupal's Node Access system to be bypassed. In such cases, private content may be shown to unprivileged users. Therefore, queries that generate lists of nodes should avoid SELECT \* syntax in all cases. Instead use `SELECT nid, ...`.
- It is recommended to avoid SELECT \* queries in general. They are less self-documenting than explicitly listing the fields to be retrieved and also very slightly slower. Generally, SELECT \* should be used in only two cases:
- 1.  The fields in the table being selected from are dynamic and not known definitively at development time. (This is extremely rare and generally bad practice anyway.)
- 2.  The list of fields to select is prohibitively long.
- [development\] Is "SELECT \* FROM ..." ok?](http://lists.drupal.org/pipermail/development/2009-February/thread.html#31953) : discussion on the development list.
- [SELECT \* IS EVIL](//www.parseerror.com/sql/select*isevil.html): one developer's perspective.

## Help improve this page
- *Page status:** No known problems
- *You can:**
- Log in, click [Edit](/node/374660/edit), and edit this page
- Log in, click [Discuss](/node/374660/discuss), update the Page status value, and suggest an improvement
- Log in and [create a Documentation issue](/node/add/project-issue/documentation?title=Suggestion%20for%3A%20%28374660%29%20Avoid%20%22SELECT%20%2A%20FROM%20...%22) with your suggestion