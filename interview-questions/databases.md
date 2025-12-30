# Databases Interview Questions

## General Questions & Answers

<expand title="What is the difference between SQL and NoSQL databases?">
**Question:** What is the difference between SQL and NoSQL databases?

**Answer:**
**SQL (Relational) Databases:**
- **Structure:** Tables with rows and columns, fixed schema
- **ACID Properties:** Strong consistency, transactions
- **Relationships:** Foreign keys, joins
- **Scalability:** Vertical scaling (more powerful hardware)
- **Examples:** MySQL, PostgreSQL, Oracle, SQL Server

**NoSQL Databases:**
- **Structure:** Flexible schema, various data models (document, key-value, graph, column)
- **Consistency:** Eventual consistency (BASE)
- **Relationships:** No joins, denormalized data
- **Scalability:** Horizontal scaling (more servers)
- **Examples:** MongoDB, Redis, Cassandra, DynamoDB

**When to use SQL:**
- Complex queries and relationships
- ACID compliance required
- Structured data
- Financial transactions
- When consistency is critical

**When to use NoSQL:**
- Large-scale applications
- Flexible schema requirements
- High write throughput
- Horizontal scaling needed
- Real-time analytics

**Hybrid Approach:**
Many applications use both - SQL for transactional data, NoSQL for analytics, caching, or specific use cases.
</expand>

<expand title="Explain database indexing and how it works">
**Question:** Explain database indexing and how it works.

**Answer:**
Database indexing is a data structure that improves the speed of data retrieval operations on a database table.

**How it works:**
1. **Index Creation:** Database creates a separate data structure (usually B-tree) that stores sorted references to table rows.
2. **Query Optimization:** When querying, database uses index to quickly locate rows instead of scanning entire table.
3. **Trade-off:** Faster reads, but slower writes (indexes must be updated).

**Types of Indexes:**
1. **Primary Index:** Automatically created on primary key.
2. **Secondary Index:** Created on non-primary key columns.
3. **Composite Index:** Index on multiple columns.
4. **Unique Index:** Ensures no duplicate values.
5. **Full-Text Index:** For text search (MySQL, PostgreSQL).

**Example:**
```sql
-- Create index
CREATE INDEX idx_user_email ON users(email);

-- Query uses index
SELECT * FROM users WHERE email = 'user@example.com';
-- Without index: Full table scan (slow)
-- With index: Index lookup (fast)
```

**Best Practices:**
- Index frequently queried columns
- Index foreign keys
- Don't over-index (slows writes)
- Use composite indexes for multi-column queries
- Monitor index usage

**When indexes help:**
- WHERE clauses
- JOIN operations
- ORDER BY clauses
- GROUP BY clauses

**When indexes don't help:**
- Small tables
- Columns with low selectivity
- Frequent write operations
- Columns rarely used in queries
</expand>

<expand title="What is ACID in database transactions?">
**Question:** What is ACID in database transactions?

**Answer:**
ACID is a set of properties that guarantee reliable database transactions.

**A - Atomicity:**
- All operations in a transaction succeed or all fail
- No partial updates
- Example: Money transfer - both debit and credit must succeed, or both fail

**C - Consistency:**
- Database remains in a valid state before and after transaction
- All constraints and rules are maintained
- Example: Account balance can't go negative if constraint exists

**I - Isolation:**
- Concurrent transactions don't interfere with each other
- Each transaction sees a consistent view of data
- Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable

**D - Durability:**
- Once transaction is committed, changes are permanent
- Survives system crashes, power failures
- Changes are written to persistent storage

**Example:**
```sql
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
-- If any step fails, entire transaction rolls back
```

**Benefits:**
- Data integrity
- Reliability
- Predictable behavior
- Error recovery

**Trade-offs:**
- Performance overhead
- Locking can cause contention
- May limit scalability

**NoSQL and ACID:**
- Most NoSQL databases sacrifice ACID for performance and scalability
- Some NoSQL databases offer ACID for specific operations
- Choose based on use case requirements
</expand>

<expand title="What is database normalization?">
**Question:** What is database normalization?

**Answer:**
Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.

**Normal Forms:**
1. **1NF (First Normal Form):**
   - Each column contains atomic values
   - No repeating groups
   - Each row is unique

2. **2NF (Second Normal Form):**
   - Must be in 1NF
   - All non-key attributes fully dependent on primary key
   - No partial dependencies

3. **3NF (Third Normal Form):**
   - Must be in 2NF
   - No transitive dependencies
   - Non-key attributes depend only on primary key

**Benefits:**
- Reduces data redundancy
- Improves data integrity
- Easier to maintain
- Reduces storage space
- Prevents update anomalies

**Drawbacks:**
- More complex queries (requires joins)
- Can impact performance
- May require more tables

**Example:**
```sql
-- Before normalization (redundant data)
Orders: order_id, customer_name, customer_email, product_name, price

-- After normalization
Orders: order_id, customer_id, product_id
Customers: customer_id, name, email
Products: product_id, name, price
```

**When to denormalize:**
- Read-heavy workloads
- Performance critical queries
- Analytics and reporting
- When joins are expensive

**Best Practice:**
- Normalize for write operations
- Denormalize for read operations (if needed)
- Balance between normalization and performance
</expand>

<expand title="In MySQL, what is the difference between InnoDB and MyISAM?">
**Question:** In MySQL, what is the difference between InnoDB and MyISAM?

**Answer:**
**InnoDB:**
- **Storage Engine:** Default since MySQL 5.5
- **ACID Compliance:** Full ACID support, transactions
- **Foreign Keys:** Supports foreign key constraints
- **Row-level Locking:** Locks individual rows
- **Crash Recovery:** Better crash recovery
- **Performance:** Better for write-heavy workloads
- **Use Cases:** Applications requiring transactions, foreign keys, data integrity

**MyISAM:**
- **Storage Engine:** Older, simpler engine
- **ACID Compliance:** No transactions, no ACID
- **Foreign Keys:** No foreign key support
- **Table-level Locking:** Locks entire table
- **Crash Recovery:** Limited crash recovery
- **Performance:** Faster for read-only workloads
- **Use Cases:** Read-heavy applications, logging, simple applications

**Key Differences:**
| Feature | InnoDB | MyISAM |
|---------|--------|--------|
| Transactions | ✅ Yes | ❌ No |
| Foreign Keys | ✅ Yes | ❌ No |
| Locking | Row-level | Table-level |
| Crash Recovery | ✅ Better | ⚠️ Limited |
| Full-Text Search | ✅ Yes (5.6+) | ✅ Yes |
| Compression | ✅ Yes | ✅ Yes |

**Recommendation:**
Use InnoDB for most applications. MyISAM is deprecated and will be removed in future MySQL versions.
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: Your database queries are slow. How would you identify and fix performance issues?">
**Question:** Your database queries are slow. How would you identify and fix performance issues?

**Answer:**
**Identification Steps:**
1. **Enable Slow Query Log:**
   ```sql
   SET GLOBAL slow_query_log = 'ON';
   SET GLOBAL long_query_time = 1; -- Log queries taking > 1 second
   ```

2. **Use EXPLAIN:**
   ```sql
   EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
   -- Shows execution plan, indexes used, rows scanned
   ```

3. **Monitor Database Metrics:**
   - CPU usage
   - Memory usage
   - Disk I/O
   - Connection count
   - Query execution times

4. **Use Profiling Tools:**
   - MySQL: `SHOW PROFILE`, Performance Schema
   - PostgreSQL: `EXPLAIN ANALYZE`, pg_stat_statements

**Common Issues and Fixes:**

1. **Missing Indexes:**
   ```sql
   -- Identify: EXPLAIN shows "Full table scan"
   -- Fix: Add index
   CREATE INDEX idx_email ON users(email);
   ```

2. **Inefficient Queries:**
   ```sql
   -- Bad: SELECT *
   SELECT * FROM users;
   
   -- Good: Select only needed columns
   SELECT id, name, email FROM users;
   ```

3. **N+1 Query Problem:**
   ```javascript
   // Bad: N+1 queries
   const users = await db.query('SELECT * FROM users');
   for (const user of users) {
     const posts = await db.query('SELECT * FROM posts WHERE user_id = ?', [user.id]);
   }
   
   // Good: Single query with JOIN
   const users = await db.query(`
     SELECT u.*, p.* FROM users u
     LEFT JOIN posts p ON u.id = p.user_id
   `);
   ```

4. **Large Result Sets:**
   ```sql
   -- Use pagination
   SELECT * FROM posts LIMIT 20 OFFSET 0;
   ```

5. **Unoptimized JOINs:**
   - Ensure JOIN columns are indexed
   - Use appropriate JOIN types
   - Avoid cartesian products

6. **Table Scans:**
   - Add indexes on WHERE clause columns
   - Use covering indexes when possible

**Optimization Checklist:**
- ✅ Add indexes on frequently queried columns
- ✅ Optimize queries (avoid SELECT *)
- ✅ Use appropriate data types
- ✅ Normalize/denormalize appropriately
- ✅ Use connection pooling
- ✅ Monitor and analyze slow queries
- ✅ Consider read replicas for read-heavy workloads
</expand>

<expand title="Scenario: You need to design a database schema for an e-commerce platform. What would you consider?">
**Question:** You need to design a database schema for an e-commerce platform. What would you consider?

**Answer:**
**Key Entities:**
1. **Users/Customers**
2. **Products**
3. **Categories**
4. **Orders**
5. **Order Items**
6. **Payments**
7. **Inventory**
8. **Reviews/Ratings**

**Schema Design:**

```sql
-- Users
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Categories
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- Products
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INT,
  sku VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_category (category_id),
  INDEX idx_sku (sku)
);

-- Inventory
CREATE TABLE inventory (
  product_id INT PRIMARY KEY,
  quantity INT NOT NULL DEFAULT 0,
  reserved_quantity INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Orders
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status)
);

-- Order Items
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order (order_id)
);

-- Payments
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  status ENUM('pending', 'completed', 'failed'),
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  INDEX idx_order (order_id)
);
```

**Considerations:**
1. **Normalization:** Balance between normalization and performance
2. **Indexes:** Index foreign keys and frequently queried columns
3. **Data Types:** Use appropriate types (DECIMAL for money)
4. **Constraints:** Use foreign keys, unique constraints, check constraints
5. **Scalability:** Consider partitioning, sharding for large scale
6. **Performance:** Denormalize if needed for read-heavy operations
7. **Data Integrity:** Use transactions for order creation
8. **Audit Trail:** Add created_at, updated_at timestamps

**Additional Considerations:**
- Product variants (size, color)
- Discounts and coupons
- Shipping addresses
- Order history
- Wishlists
- Shopping carts
</expand>

<expand title="Scenario: Your database is running out of storage. How would you handle this?">
**Question:** Your database is running out of storage. How would you handle this?

**Answer:**
**Immediate Actions:**
1. **Identify Large Tables:**
   ```sql
   -- MySQL
   SELECT 
     table_name,
     ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
   FROM information_schema.TABLES
   ORDER BY (data_length + index_length) DESC;
   ```

2. **Find Large Files/Logs:**
   - Check database logs
   - Check binary logs
   - Check temporary files

**Long-term Solutions:**

1. **Data Archiving:**
   - Move old data to archive tables
   - Archive to cold storage (S3, Glacier)
   - Keep only recent data in primary DB

2. **Data Partitioning:**
   ```sql
   -- Partition by date
   CREATE TABLE orders (
     id INT,
     order_date DATE,
     ...
   ) PARTITION BY RANGE (YEAR(order_date)) (
     PARTITION p2020 VALUES LESS THAN (2021),
     PARTITION p2021 VALUES LESS THAN (2022),
     PARTITION p2022 VALUES LESS THAN (2023)
   );
   ```

3. **Data Compression:**
   - Enable table compression
   - Compress old partitions
   - Use columnar storage for analytics

4. **Clean Up:**
   - Remove duplicate data
   - Remove unused indexes
   - Clean up temporary tables
   - Remove old logs

5. **Optimize Storage:**
   - Use appropriate data types (avoid VARCHAR(255) when smaller works)
   - Remove unused columns
   - Compress BLOB/TEXT data

6. **Scale Storage:**
   - Upgrade storage capacity
   - Use database sharding
   - Move to cloud with auto-scaling

7. **Database Maintenance:**
   ```sql
   -- Optimize tables
   OPTIMIZE TABLE large_table;
   
   -- Rebuild indexes
   ALTER TABLE large_table ENGINE=InnoDB;
   ```

**Monitoring:**
- Set up alerts for storage usage
- Monitor growth trends
- Plan capacity in advance
- Regular cleanup schedules

**Best Practices:**
- Implement data retention policies
- Regular archiving of old data
- Monitor storage growth
- Plan for scalability
</expand>

