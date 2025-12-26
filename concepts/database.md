# Database

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- MySQL 5.0 - 2005
- MySQL 5.1 - 2008
- MySQL 5.5 - 2010
- MySQL 5.6 - 2013
- MySQL 5.7 - 2015
- MySQL 8.0 - 2018
- MySQL 8.1 - 2023
- MySQL 8.2 - 2024

Primary Concepts

</expand>

<expand title="Notes">
## Notes

- MySQL is an open-source relational database management system (RDBMS)
- Written in C and C++, SQL parser written in yacc
- Storage engines are MySQL components that handle SQL operations for different table types
- InnoDB is the default and most commonly used storage engine (MySQL 5.5+)
- Use "EXPLAIN" keyword before query to see how it works internally (useful for optimization)

</expand>

<expand title="Major Topics">
## Major Topics

- Normalization, Stored Procedures (SP), CTE, Temporary Tables, Views, Joins, Indexing, Optimizations

</expand>

<expand title="SQL vs MySQL">
## SQL vs MySQL

- SQL is a computer language, whereas MySQL is a software/application
- SQL is used for creating database management systems
- MySQL is used for data handling, storing, deleting and modifying data

</expand>

<expand title="Data Types">
## Data Types

- Numeric: TINYINT, SMALLINT, INT, BIGINT, FLOAT, DOUBLE, DECIMAL, BIT, BOOL
- Date and Time: YEAR, DATE, TIME, DATETIME, TIMESTAMP
- String: CHAR(size), VARCHAR(size), TEXT, MEDIUMTEXT, LONGTEXT, BINARY, VARBINARY, ENUM, SET
- CHAR vs VARCHAR: CHAR uses fixed space, VARCHAR length varies

</expand>

<expand title="Database Operations">
## Database Operations

- CREATE DATABASE [IF NOT EXISTS] database_name [CHARACTER SET charset_name] [COLLATE collation_name]
- USE database_name
- SHOW DATABASES
- DROP DATABASE [IF EXISTS] database_name

</expand>

<expand title="Table Operations">
## Table Operations

- CREATE TABLE: Define table structure with columns, data types, constraints
- ALTER TABLE: Add, modify, drop columns; rename table
- SHOW TABLES [FROM database_name]
- TRUNCATE TABLE: Removes all data without removing table structure
- DROP TABLE: Removes table completely
- RENAME TABLE old_table TO new_table

</expand>

<expand title="Constraints">
## Constraints

- PRIMARY KEY - Unique identifier for each row
- FOREIGN KEY - Referential integrity between tables
- UNIQUE - Ensures all values in column are different
- NOT NULL - Column cannot contain NULL values
- CHECK - Validates data against condition
- DEFAULT - Sets default value for column
- AUTO_INCREMENT - Auto-generates unique numbers

</expand>

<expand title="Indexes">
## Indexes

- Database index is a data structure that improves speed of operations
- Primary key is default clustered index
- CREATE INDEX [index_name] ON [table_name] (column_names)
- DROP INDEX index_name ON table_name
- SHOW INDEXES FROM table_name
- UNIQUE INDEX: Enforces uniqueness, multiple allowed per table (unlike PRIMARY KEY)
- Types:
  - Clustered Index (Primary Key):
  - Points to location containing actual data
  - Leaf nodes contain actual data sorted by id
  - One table can only have one clustered index
  - Non-Clustered Index (Secondary):
  - Points to location containing reference of actual data
  - Leaf nodes contain row locators (references)

</expand>

<expand title="Views">
## Views

- Virtual table created by query joining one or more tables
- No data stored, only definition
- Updates to base table automatically reflect in view
- Syntax: CREATE VIEW view_name AS SELECT columns FROM table WHERE conditions
- UPDATE: ALTER VIEW view_name AS SELECT columns FROM table WHERE conditions
- DROP: DROP VIEW [IF EXISTS] view_name
- Advantages: Hide complexity, security, space efficient
- View can be nested, CTE cannot
- Updatable View Conditions:
  - Based on single table
  - Must include PRIMARY KEY
  - No aggregate functions, DISTINCT, GROUP BY, HAVING, SUBQUERIES

</expand>

<expand title="Common Table Expressions (CTE)">
## Common Table Expressions (CTE)

- WITH cte_name AS (SELECT ...) SELECT ... FROM cte_name
- Temporary named result set used within query
- Cannot be nested (unlike views)
- Cannot be reused (unlike views)
- Useful when views cannot be created due to permissions
- Recursive CTE:
  - Anchor member (base case)
  - Recursive member (references CTE)
- Maximum recursion level: 1000 iterations (default)

</expand>

<expand title="Temporary Tables">
## Temporary Tables

- CREATE TEMPORARY TABLE table_name AS SELECT ...
- Visible only to current session
- Automatically dropped when session closes
- Stored in TempDB
- Advantages: Fast, simplicity, less logging overhead
- Can be created with same name as permanent table (hides permanent table until temp table dropped)

</expand>

<expand title="Stored Procedures & Functions">
## Stored Procedures & Functions

- Stored Procedures have precompiled execution plan (faster)
- Functions are not precompiled
- Functions can be used in SQL queries, procedures cannot
- Cannot use "USE database" within stored procedures
- Syntax: CREATE PROCEDURE procedure_name() BEGIN ... END

</expand>

<expand title="Variables">
## Variables

- User-Defined Variable: @variable_name (not case-sensitive)
  - SET @var_name = value
  - SELECT @var_name
- Local Variable: DECLARE variable_name datatype DEFAULT value
  - Used in stored programs, strongly typed
- System Variable: Predefined MySQL variables (GLOBAL, SESSION, MIX)

</expand>

<expand title="SQL Commands">
## SQL Commands

- DDL (Data Definition Language): CREATE, ALTER, DROP, RENAME, TRUNCATE
- DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
- DCL (Data Control Language): GRANT, REVOKE
- TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT

</expand>

<expand title="Query Execution Order">
## Query Execution Order

- FROM → ON → OUTER → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT/TOP
- Order is important for optimization

</expand>

<expand title="Key Concepts">
## Key Concepts

- PRIMARY KEY: Unique identifier, default clustered index
- FOREIGN KEY: Referential integrity constraint
- UNIQUE vs DISTINCT:
  - UNIQUE: Constraint ensuring all values in column are different (at creation)
  - DISTINCT: Removes duplicate records when retrieving (at retrieval)
- Composite Key: Combination of multiple columns forming primary key
- Candidate Key: Attribute or set of attributes that uniquely identifies a tuple
- Super Key: Set of attributes that uniquely identifies a tuple (may contain extra attributes)

</expand>

<expand title="Normalization">
## Normalization

- 1NF: Contains atomic values (no multi-valued attributes)
- 2NF: In 1NF + all non-key attributes fully functionally dependent on primary key
- 3NF: In 2NF + no transitive dependency (non-key column depends on non-key column)
- BCNF: Boyce Codd Normal Form (stronger than 3NF)
- 4NF: In BCNF + no multi-valued dependency
- 5NF: In 4NF + no join dependency, lossless join

</expand>

<expand title="Aggregate Functions">
## Aggregate Functions

- COUNT - Counts number of rows
- SUM - Sum of values
- AVG - Average of values
- MAX - Maximum value
- MIN - Minimum value
- Note: Aggregate functions can take long time, use indexes for optimization

</expand>

<expand title="Clauses">
## Clauses

- WHERE: Filters rows before grouping
- GROUP BY: Groups rows that have same values
- HAVING: Filters groups after GROUP BY (used with aggregate functions)
- ORDER BY: Sorts result set
- LIMIT: Restricts number of rows returned
- JOIN: Combines rows from multiple tables
- UNION: Combines result sets from multiple SELECT statements

</expand>

<expand title="Optimization Tips">
## Optimization Tips

- Use INDEXES on frequently queried columns
- Use EXPLAIN to analyze query execution
- UNIQUE is better than DISTINCT for constraints
- Use WHERE instead of HAVING when possible (HAVING doesn't use index)
- Aggregate functions take long time - optimize with proper indexes
- Image processing requires great optimization due to excess data

Secondary Concepts

</expand>

<expand title="Storage Engines">
## Storage Engines

- InnoDB (default):
  - ACID compliant
  - Supports FOREIGN KEY constraints
  - Row-level locking
  - Commit, rollback, crash-recovery capabilities
- MyISAM: Legacy engine (not default anymore)
- Other: Heap, Merge, ISAM

</expand>

<expand title="User Management">
## User Management

- CREATE USER [IF NOT EXISTS] username@hostname IDENTIFIED BY 'password'
- GRANT privileges ON database.table TO username@hostname
- Privileges: ALL PRIVILEGES, CREATE, DROP, SELECT, INSERT, UPDATE, DELETE
- DROP USER 'username'@'hostname'
- ALTER USER 'username'@'hostname' IDENTIFIED BY 'new_password'

</expand>

<expand title="Events (Scheduled Events)">
## Events (Scheduled Events)

- Tasks that run according to schedule
- Run in background (unlike triggers)
- Syntax: CREATE EVENT event_name ON SCHEDULE schedule DO statement
- Types: Recurring (EVERY interval) or One-time (AT timestamp)
- SHOW EVENTS
- ALTER EVENT event_name DISABLE
- DROP EVENT event_name

</expand>

<expand title="Triggers">
## Triggers

- Automatic actions executed before/after INSERT, UPDATE, DELETE
- Types: BEFORE/AFTER INSERT, BEFORE/AFTER UPDATE, BEFORE/AFTER DELETE
- SHOW TRIGGERS

</expand>

<expand title="Prepared Statements">
## Prepared Statements

- Dynamic SQL execution within stored procedures
- Syntax: PREPARE stmt FROM @query; EXECUTE stmt; DEALLOCATE PREPARE stmt
- Useful for dynamic table operations

</expand>

<expand title="Table Locking">
## Table Locking

- LOCK TABLES table_name READ/WRITE
- UNLOCK TABLES
- Types: Shared (S) locks, Exclusive (X) locks
- Levels: Row-level locking, Table-level locking
- May cause deadlocks if not handled properly

</expand>

<expand title="Complex Queries">
## Complex Queries

- Recursive CTE: WITH RECURSIVE cte AS (anchor UNION ALL recursive) SELECT ...
- Subqueries: Nested SELECT statements
- JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS
- UNION: Combines multiple SELECT results (removes duplicates)
- UNION ALL: Combines without removing duplicates

</expand>

<expand title="Common Functions">
## Common Functions

- String: SUBSTRING, CONCAT, UPPER, LOWER, LTRIM, RTRIM, LENGTH, REPLACE
- Date: NOW(), CURDATE(), DATE_FORMAT(), DATEDIFF()
- Aggregate: COUNT, SUM, AVG, MAX, MIN
- Conditional: IF(), CASE WHEN, COALESCE()

</expand>

<expand title="Best Practices">
## Best Practices

- Use proper data types (avoid unnecessary large types)
- Index frequently queried columns
- Normalize database structure (avoid redundancy)
- Use transactions for data integrity
- Optimize queries using EXPLAIN
- Use prepared statements to prevent SQL injection
- Regular backups using mysqldump

</expand>

