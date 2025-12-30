# Databases Interview Questions

## General Questions & Answers

<expand title="When would you choose SQL over NoSQL for a new project?">
**Question:** When would you choose SQL over NoSQL for a new project?

**Answer:**
**Choose SQL When:**

1. **ACID Compliance Required:**
   - Financial transactions
   - Critical data integrity
   - **Example:** Banking system, payment processing

2. **Complex Queries:**
   - Need joins, aggregations, complex relationships
   - **Example:** Reporting, analytics, data analysis

3. **Structured Data:**
   - Well-defined schema
   - Relationships between entities
   - **Example:** E-commerce (products, orders, users)

4. **Data Consistency:**
   - Strong consistency required
   - **Example:** Inventory management, stock levels

5. **Mature Ecosystem:**
   - Existing tools and expertise
   - Standard SQL knowledge
   - **Example:** Enterprise applications

**Choose NoSQL When:**
- High write throughput needed
- Flexible schema requirements
- Horizontal scaling critical
- Simple queries, no complex joins
- Eventual consistency acceptable

**Hybrid Approach:**
Many applications use both - SQL for transactional data, NoSQL for specific use cases (caching, analytics, flexible content).
</expand>

<expand title="How do you decide which columns to index in a database?">
**Question:** How do you decide which columns to index in a database?

**Answer:**
**Index These Columns:**

1. **Primary Keys:**
   - Automatically indexed
   - Used in joins

2. **Foreign Keys:**
   - Frequently used in JOINs
   - **Example:** `user_id` in orders table

3. **WHERE Clause Columns:**
   - Frequently filtered
   - **Example:** `email` in users table, `status` in orders

4. **ORDER BY Columns:**
   - Used for sorting
   - **Example:** `created_at` for recent items

5. **Composite Indexes:**
   - Multiple columns used together
   - **Example:** `(user_id, created_at)` for user's recent orders

**Don't Index:**

1. **Low Selectivity:**
   - Columns with few unique values
   - **Example:** `gender` (only 2-3 values), `status` with 2 values

2. **Rarely Queried:**
   - Columns not used in queries
   - **Example:** `notes` field rarely searched

3. **Frequently Updated:**
   - High write overhead
   - **Example:** `last_login` updated on every login

4. **Small Tables:**
   - Table scans are fast
   - **Example:** Tables with < 1000 rows

**Best Practices:**
- Monitor slow queries to identify missing indexes
- Use EXPLAIN to verify index usage
- Balance between read and write performance
- Consider composite indexes for multi-column queries
</expand>

<expand title="How do you handle database migrations in production without downtime?">
**Question:** How do you handle database migrations in production without downtime?

**Answer:**
**Zero-Downtime Migration Strategies:**

1. **Additive Changes First:**
   - Add new columns as nullable
   - Add new tables
   - Add new indexes (concurrently if supported)
   - **Example:** Add `email_verified` column as nullable

2. **Backfill Data:**
   - Populate new columns with data
   - Run in background
   - **Example:** Set `email_verified = false` for existing users

3. **Deploy Application Code:**
   - Code handles both old and new schema
   - Write to both old and new columns
   - **Example:** Write to both `email` and `new_email` columns

4. **Migrate Reads:**
   - Gradually switch reads to new columns
   - Monitor for issues
   - **Example:** Read from `new_email` instead of `email`

4. **Remove Old Schema:**
   - After all reads migrated
   - Remove old columns/tables
   - **Example:** Drop `email` column after migration complete

**Example Migration:**
```sql
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN email_new VARCHAR(255);

-- Step 2: Backfill
UPDATE users SET email_new = email;

-- Step 3: Deploy code that writes to both

-- Step 4: Switch reads to email_new

-- Step 5: Drop old column
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users RENAME COLUMN email_new TO email;
```

**Best Practices:**
- Test migrations on staging
- Use feature flags for gradual rollout
- Monitor performance during migration
- Have rollback plan
- Use database migration tools (Flyway, Liquibase)
</expand>

<expand title="How do you optimize a database query that's running slow?">
**Question:** How do you optimize a database query that's running slow?

**Answer:**
**Optimization Steps:**

1. **Use EXPLAIN:**
   ```sql
   EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
   -- Shows execution plan, indexes used, rows scanned
   ```

2. **Identify Issues:**
   - Full table scan (no index)
   - Missing indexes
   - Inefficient joins
   - Large result sets

3. **Add Indexes:**
   ```sql
   -- Add index on frequently queried column
   CREATE INDEX idx_user_email ON users(email);
   ```

4. **Optimize Query:**
   ```sql
   -- Bad: SELECT *
   SELECT * FROM users WHERE email = 'user@example.com';
   
   -- Good: Select only needed columns
   SELECT id, name, email FROM users WHERE email = 'user@example.com';
   ```

5. **Fix N+1 Queries:**
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

6. **Use Query Hints:**
   - Force index usage if needed
   - Limit result sets
   - Use pagination

**Monitoring:**
- Enable slow query log
- Track query execution times
- Monitor index usage
- Set up alerts for slow queries
</expand>

<expand title="What is the difference between ACID and BASE?">
**Question:** What is the difference between ACID and BASE?

**Answer:**
**ACID (SQL Databases):**
- Atomicity: All or nothing
- Consistency: Valid state
- Isolation: Concurrent transactions
- Durability: Committed = permanent
- **Use Case:** Financial systems, critical data

**BASE (NoSQL Databases):**
- Basically Available: System available
- Soft state: State may change
- Eventually consistent: Will converge
- **Use Case:** High availability, performance

**Comparison:**

| Feature | ACID | BASE |
|---------|------|------|
| Consistency | Strong | Eventual |
| Availability | Lower | Higher |
| Performance | Slower | Faster |

**When to Use:**
- **ACID:** Critical data, can't have inconsistencies
- **BASE:** Performance important, eventual consistency OK

**Best Practice:**
Use ACID for critical data, BASE for scalable systems.
</expand>

<expand title="What is database normalization and when would you denormalize?">
**Question:** What is database normalization and when would you denormalize?

**Answer:**
**Normalization:** Organize data to reduce redundancy.

**Normal Forms:**
- 1NF: Atomic values
- 2NF: No partial dependencies
- 3NF: No transitive dependencies

**Benefits:**
- Reduces redundancy
- Prevents anomalies
- Saves storage

**Denormalization:**
- Intentionally add redundancy
- **When:** Read performance critical
- **Example:** Store computed values

**When to Denormalize:**
- Read-heavy workloads
- Performance critical
- Joins are expensive
- **Example:** Analytics, reporting

**Best Practice:**
Normalize for writes, denormalize for reads if needed.
</expand>

<expand title="What is the difference between a clustered and non-clustered index?">
**Question:** What is the difference between a clustered and non-clustered index?

**Answer:**
**Clustered Index:**
- Determines physical order of data
- One per table (usually primary key)
- **Example:** Table sorted by primary key

**Non-Clustered Index:**
- Separate structure, points to data
- Multiple per table
- **Example:** Index on email column

**Comparison:**

| Feature | Clustered | Non-Clustered |
|---------|-----------|---------------|
| Physical Order | Yes | No |
| Number | One | Many |
| Speed | Faster | Slower |

**When to Use:**
- **Clustered:** Primary key, frequently queried
- **Non-Clustered:** Other columns, multiple indexes

**Best Practice:**
Use clustered for primary key, non-clustered for other columns.
</expand>

<expand title="What is a database transaction and what are isolation levels?">
**Question:** What is a database transaction and what are isolation levels?

**Answer:**
**Transaction:** Group of operations that succeed or fail together.

**Isolation Levels:**

1. **Read Uncommitted:**
   - Can read uncommitted data
   - Lowest isolation
   - **Issue:** Dirty reads

2. **Read Committed:**
   - Read only committed data
   - **Issue:** Non-repeatable reads

3. **Repeatable Read:**
   - Same read returns same result
   - **Issue:** Phantom reads

4. **Serializable:**
   - Highest isolation
   - Transactions serialized
   - **Issue:** Performance

**When to Use:**
- **Read Committed:** Most applications
- **Repeatable Read:** Need consistency
- **Serializable:** Critical operations

**Best Practice:**
Use Read Committed for most cases, higher levels only when needed.
</expand>

<expand title="What is the difference between a primary key and a foreign key?">
**Question:** What is the difference between a primary key and a foreign key?

**Answer:**
**Primary Key:**
- Uniquely identifies row
- One per table
- Cannot be NULL
- **Example:** User ID

**Foreign Key:**
- References primary key in another table
- Enforces referential integrity
- Can be NULL
- **Example:** Order references User

**Example:**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Benefits:**
- Data integrity
- Relationships
- Cascade operations

**Best Practice:**
Use primary keys for identification, foreign keys for relationships.
</expand>

<expand title="What is database connection pooling and why is it important?">
**Question:** What is database connection pooling and why is it important?

**Answer:**
**Connection Pooling:** Reuse database connections instead of creating new ones.

**How It Works:**
- Create pool of connections at startup
- Reuse connections for requests
- Return to pool after use

**Benefits:**
- Faster (reuse vs create)
- Limits connections
- Better resource usage
- **Example:** 10 connections serve 1000 requests

**Configuration:**
- Min connections: Always available
- Max connections: Limit
- Timeout: Wait for connection

**Best Practice:**
Always use connection pooling. It significantly improves performance.
</expand>

<expand title="What is database sharding and how does it work?">
**Question:** What is database sharding and how does it work?

**Answer:**
**Sharding:** Split database into smaller pieces (shards).

**How It Works:**
- Partition data across shards
- Each shard independent
- **Example:** Users 1-1M in shard 1, 1M-2M in shard 2

**Sharding Strategies:**

1. **Range-Based:**
   - Split by value range
   - **Example:** User ID ranges

2. **Hash-Based:**
   - Hash key to determine shard
   - **Example:** Hash user ID

3. **Directory-Based:**
   - Lookup table for shard
   - **Example:** User ID → Shard mapping

**Challenges:**
- Cross-shard queries
- Rebalancing
- Complexity

**Best Practice:**
Use sharding when single database can't handle load. Consider alternatives first.
</expand>

<expand title="What is database replication and what are the types?">
**Question:** What is database replication and what are the types?

**Answer:**
**Replication:** Copy data to multiple databases.

**Types:**

1. **Master-Slave (Primary-Replica):**
   - One master (writes)
   - Multiple replicas (reads)
   - **Use Case:** Read scaling

2. **Master-Master:**
   - Multiple masters
   - Bidirectional replication
   - **Use Case:** Geographic distribution

3. **Multi-Master:**
   - Multiple masters
   - Conflict resolution
   - **Use Case:** Distributed systems

**Replication Methods:**
- Statement-based: Replicate SQL
- Row-based: Replicate changed rows
- Mixed: Combination

**Best Practice:**
Use master-slave for most cases. Master-master only if needed.
</expand>

<expand title="What is database partitioning and when would you use it?">
**Question:** What is database partitioning and when would you use it?

**Answer:**
**Partitioning:** Split table into smaller pieces.

**Types:**

1. **Range Partitioning:**
   ```sql
   PARTITION BY RANGE (YEAR(created_at)) (
     PARTITION p2020 VALUES LESS THAN (2021),
     PARTITION p2021 VALUES LESS THAN (2022)
   );
   ```
   - Split by value ranges
   - **Example:** By date

2. **Hash Partitioning:**
   - Split by hash function
   - **Example:** By user ID hash

3. **List Partitioning:**
   - Split by list of values
   - **Example:** By region

**Benefits:**
- Faster queries (smaller partitions)
- Easier maintenance
- Archive old partitions

**When to Use:**
- Large tables
- Time-based data
- Need to archive

**Best Practice:**
Use partitioning for large tables, especially time-based data.
</expand>

<expand title="What is a database view and when would you use it?">
**Question:** What is a database view and when would you use it?

**Answer:**
**View:** Virtual table based on query result.

**Example:**
```sql
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';
```

**Benefits:**
- Simplify queries
- Security (hide columns)
- Consistency

**Types:**
- **Simple:** Based on one table
- **Complex:** Based on joins

**When to Use:**
- Simplify complex queries
- Restrict access
- Abstract schema changes

**Best Practice:**
Use views to simplify queries and improve security.
</expand>

<expand title="What is database deadlock and how do you prevent it?">
**Question:** What is database deadlock and how do you prevent it?

**Answer:**
**Deadlock:** Two transactions waiting for each other.

**Example:**
```
Transaction 1: Locks A, waits for B
Transaction 2: Locks B, waits for A
→ Deadlock
```

**Prevention:**

1. **Lock Ordering:**
   - Always lock in same order
   - **Example:** Always lock A before B

2. **Timeout:**
   - Set lock timeout
   - Abort if timeout

3. **Deadlock Detection:**
   - Database detects and aborts one
   - **Example:** MySQL, PostgreSQL

4. **Minimize Lock Time:**
   - Hold locks briefly
   - Process quickly

**Best Practice:**
Use lock ordering and timeouts. Let database handle detection.
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: Your database is experiencing high CPU usage during peak hours. How would you diagnose and fix it?">
**Question:** Your database is experiencing high CPU usage during peak hours. How would you diagnose and fix it?

**Answer:**
**Diagnosis Steps:**

1. **Identify Slow Queries:**
   ```sql
   -- Enable slow query log
   SET GLOBAL slow_query_log = 'ON';
   SET GLOBAL long_query_time = 1; -- Log queries > 1 second
   ```

2. **Check Active Queries:**
   ```sql
   -- MySQL
   SHOW PROCESSLIST;
   
   -- PostgreSQL
   SELECT * FROM pg_stat_activity;
   ```

3. **Monitor Resource Usage:**
   - CPU usage per query
   - Memory usage
   - I/O wait times
   - Connection count

**Common Causes & Fixes:**

1. **Missing Indexes:**
   - **Symptom:** Full table scans
   - **Fix:** Add indexes on frequently queried columns
   - **Impact:** Reduces CPU by 80-90%

2. **Inefficient Queries:**
   - **Symptom:** Complex joins, subqueries
   - **Fix:** Optimize queries, use EXPLAIN
   - **Impact:** Reduces CPU significantly

3. **Too Many Connections:**
   - **Symptom:** High connection count
   - **Fix:** Connection pooling, limit connections
   - **Impact:** Reduces overhead

4. **Large Result Sets:**
   - **Symptom:** Queries returning too much data
   - **Fix:** Use pagination, LIMIT clauses
   - **Impact:** Reduces processing time

5. **Lock Contention:**
   - **Symptom:** Queries waiting for locks
   - **Fix:** Optimize transactions, reduce lock time
   - **Impact:** Improves throughput

**Optimization Strategies:**
- Add indexes on WHERE, JOIN, ORDER BY columns
- Optimize queries (avoid SELECT *)
- Use read replicas for read-heavy workloads
- Implement connection pooling
- Cache frequently accessed data
- Archive old data

**Monitoring:**
- Track slow queries
- Monitor CPU usage per query
- Set up alerts for high CPU
- Regular performance reviews
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
   - **Example:** Archive orders older than 2 years

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

<expand title="Scenario: How would you handle database replication lag in a read-heavy application?">
**Question:** How would you handle database replication lag in a read-heavy application?

**Answer:**
**Problem:** Read replicas may have stale data due to replication lag.

**Solutions:**

1. **Accept Stale Reads:**
   - For non-critical data, eventual consistency is fine
   - **Example:** Product catalog, blog posts
   - **Benefit:** Better performance, less complexity

2. **Read-After-Write Consistency:**
   ```javascript
   // After write, read from primary
   await db.primary.query('INSERT INTO orders ...');
   const order = await db.primary.query('SELECT * FROM orders WHERE id = ?', [orderId]);
   
   // Subsequent reads can use replica
   ```

3. **Route Critical Reads to Primary:**
   - User account data, payment info
   - **Example:** After updating profile, read from primary

4. **Monitor Replication Lag:**
   ```sql
   -- MySQL
   SHOW SLAVE STATUS;
   -- Check Seconds_Behind_Master
   
   -- PostgreSQL
   SELECT * FROM pg_stat_replication;
   ```

5. **Optimize Replication:**
   - Use row-based replication (more efficient)
   - Optimize network between master and replicas
   - Reduce write load on master
   - **Impact:** Reduces lag significantly

6. **Application-Level Handling:**
   ```javascript
   // Route based on data freshness needs
   if (needsFreshData) {
     return await db.primary.query(...);
   } else {
     return await db.replica.query(...);
   }
   ```

7. **Use Read Replicas Strategically:**
   - Use replicas for analytics, reporting
   - Use primary for transactional reads
   - **Example:** User dashboard uses primary, reports use replica

**Best Practices:**
- Monitor replication lag
- Set up alerts for high lag
- Route critical reads to primary
- Accept eventual consistency where possible
- Optimize replication configuration
</expand>

<expand title="Scenario: In MySQL, when would you choose InnoDB over MyISAM?">
**Question:** In MySQL, when would you choose InnoDB over MyISAM?

**Answer:**
**Choose InnoDB When:**

1. **Transactions Required:**
   - Need ACID compliance
   - **Example:** Financial transactions, order processing
   - **Benefit:** Data integrity, rollback capability

2. **Foreign Keys Needed:**
   - Referential integrity important
   - **Example:** E-commerce with orders referencing users
   - **Benefit:** Database-level constraints

3. **Concurrent Writes:**
   - Multiple users writing simultaneously
   - **Example:** High-traffic application
   - **Benefit:** Row-level locking, better concurrency

4. **Crash Recovery:**
   - Need reliable crash recovery
   - **Example:** Production applications
   - **Benefit:** Better recovery, less data loss risk

5. **Modern MySQL:**
   - Default since MySQL 5.5
   - MyISAM is deprecated
   - **Benefit:** Future-proof, better support

**Choose MyISAM When:**
- Read-only workloads (rare)
- Simple applications with no transactions
- Legacy systems (not recommended for new projects)

**Key Differences:**
- InnoDB: Transactions, foreign keys, row-level locking, better crash recovery
- MyISAM: No transactions, no foreign keys, table-level locking, limited crash recovery

**Recommendation:**
Always use InnoDB for new projects. MyISAM is deprecated and will be removed in future MySQL versions.
</expand>

<expand title="Scenario: Your database has become too large and queries are slow. How would you optimize it?">
**Question:** Your database has become too large and queries are slow. How would you optimize it?

**Answer:**
**Optimization Strategies:**

1. **Partitioning:**
   - Partition large tables
   - **Example:** Partition by date
   - **Impact:** Faster queries on smaller partitions

2. **Archiving:**
   - Move old data to archive
   - Keep only active data
   - **Example:** Archive orders older than 2 years

3. **Indexing:**
   - Add missing indexes
   - Optimize existing indexes
   - **Impact:** Faster lookups

4. **Denormalization:**
   - Add computed columns
   - Reduce joins
   - **Example:** Store order count on user table

5. **Sharding:**
   - Split database into shards
   - Distribute load
   - **Example:** Shard by user ID

6. **Read Replicas:**
   - Route reads to replicas
   - Reduce load on primary
   - **Example:** 5 read replicas

**Best Practices:**
- Partition large tables
- Archive old data
- Add indexes
- Use read replicas
- Consider sharding if needed
</expand>

<expand title="Scenario: You need to migrate data from one database to another without downtime. How would you do it?">
**Question:** You need to migrate data from one database to another without downtime. How would you do it?

**Answer:**
**Migration Strategy:**

1. **Dual Write:**
   - Write to both databases
   - **Example:** Write to old and new DB

2. **Data Sync:**
   - Sync existing data
   - Run in background
   - **Example:** Copy all records

3. **Verify:**
   - Compare data
   - Ensure consistency
   - **Example:** Row counts, checksums

4. **Switch Reads:**
   - Gradually switch reads to new DB
   - Monitor for issues
   - **Example:** 10% → 50% → 100%

5. **Stop Dual Write:**
   - Write only to new DB
   - **Example:** After all reads switched

6. **Cleanup:**
   - Remove old database
   - **Example:** After verification period

**Best Practices:**
- Use dual write
- Sync in background
- Verify data
- Gradual migration
- Have rollback plan
</expand>

<expand title="Scenario: Your database is experiencing lock contention. How would you resolve it?">
**Question:** Your database is experiencing lock contention. How would you resolve it?

**Answer:**
**Causes:**
- Long-running transactions
- Many concurrent updates
- Poor lock ordering

**Solutions:**

1. **Optimize Transactions:**
   - Keep transactions short
   - Process quickly
   - **Example:** Move heavy work outside transaction

2. **Lock Ordering:**
   - Always lock in same order
   - Prevent deadlocks
   - **Example:** Always lock A before B

3. **Indexes:**
   - Add indexes to reduce lock scope
   - **Example:** Index on WHERE clause

4. **Isolation Level:**
   - Use appropriate level
   - **Example:** Read Committed vs Serializable

5. **Batch Operations:**
   - Batch updates
   - Reduce lock time
   - **Example:** Update 100 rows at once

6. **Read Replicas:**
   - Route reads to replicas
   - Reduce locks on primary
   - **Example:** All reads to replicas

**Best Practices:**
- Keep transactions short
- Use proper lock ordering
- Add indexes
- Use read replicas
- Monitor lock waits
</expand>

<expand title="Scenario: You need to design a database for a social media platform. What would you consider?">
**Question:** You need to design a database for a social media platform. What would you consider?

**Answer:**
**Key Entities:**
- Users
- Posts
- Comments
- Likes
- Follows
- Messages

**Design Considerations:**

1. **Scalability:**
   - Shard by user ID
   - **Example:** User 1-1M in shard 1

2. **Read-Heavy:**
   - Read replicas
   - Caching
   - **Example:** Cache popular posts

3. **Timeline:**
   - Denormalize for feeds
   - **Example:** Store user's feed

4. **Relationships:**
   - Follows (many-to-many)
   - **Example:** Followers table

5. **Media:**
   - Store in object storage
   - Reference in database
   - **Example:** S3 for images

6. **Real-time:**
   - Use message queue
   - **Example:** Kafka for notifications

**Best Practices:**
- Shard for scale
- Use read replicas
- Denormalize feeds
- Cache popular content
- Store media separately
</expand>

<expand title="Scenario: Your database queries are timing out. How would you diagnose and fix this?">
**Question:** Your database queries are timing out. How would you diagnose and fix this?

**Answer:**
**Diagnosis:**

1. **Check Slow Queries:**
   ```sql
   SET GLOBAL slow_query_log = 'ON';
   SET GLOBAL long_query_time = 1;
   ```

2. **Identify Blocking:**
   ```sql
   SHOW PROCESSLIST;
   -- Find blocking queries
   ```

3. **Check Indexes:**
   ```sql
   EXPLAIN SELECT ...;
   -- Check if indexes used
   ```

**Fixes:**

1. **Add Indexes:**
   - Missing indexes cause full scans
   - **Example:** Index on WHERE clause

2. **Optimize Queries:**
   - Avoid SELECT *
   - Use LIMIT
   - **Example:** Select only needed columns

3. **Connection Pooling:**
   - Limit connections
   - Reuse connections
   - **Example:** Max 50 connections

4. **Query Timeout:**
   - Set query timeout
   - Cancel long queries
   - **Example:** 5 second timeout

5. **Read Replicas:**
   - Route reads to replicas
   - **Example:** Reduce load on primary

**Best Practices:**
- Add indexes
- Optimize queries
- Use connection pooling
- Set timeouts
- Use read replicas
</expand>

<expand title="Scenario: You need to handle database backups and disaster recovery. How would you design it?">
**Question:** You need to handle database backups and disaster recovery. How would you design it?

**Answer:**
**Backup Strategy:**

1. **Full Backups:**
   - Complete database copy
   - **Frequency:** Daily
   - **Storage:** Offsite, encrypted

2. **Incremental Backups:**
   - Only changed data
   - **Frequency:** Hourly
   - **Storage:** Faster, smaller

3. **Point-in-Time Recovery:**
   - Binary logs
   - **Example:** Restore to specific time

4. **Testing:**
   - Test restore regularly
   - **Example:** Monthly restore tests

5. **Automation:**
   - Automated backups
   - **Example:** Cron jobs, cloud tools

**Disaster Recovery:**

1. **RTO (Recovery Time Objective):**
   - Target recovery time
   - **Example:** 4 hours

2. **RPO (Recovery Point Objective):**
   - Acceptable data loss
   - **Example:** 1 hour

3. **Replication:**
   - Real-time replication
   - **Example:** Master-replica setup

4. **Failover:**
   - Automatic failover
   - **Example:** Promote replica to master

**Best Practices:**
- Automated backups
- Test restores
- Offsite storage
- Replication for DR
- Document procedures
</expand>

<expand title="Scenario: Your database needs to handle both OLTP and OLAP workloads. How would you design it?">
**Question:** Your database needs to handle both OLTP and OLAP workloads. How would you design it?

**Answer:**
**OLTP vs OLAP:**

- **OLTP:** Online Transaction Processing
  - Many small transactions
  - Real-time
  - **Example:** E-commerce orders

- **OLAP:** Online Analytical Processing
  - Few large queries
  - Historical data
  - **Example:** Reports, analytics

**Design:**

1. **Separate Databases:**
   - OLTP: Transactional database
   - OLAP: Data warehouse
   - **Example:** MySQL for OLTP, Redshift for OLAP

2. **ETL Process:**
   - Extract from OLTP
   - Transform data
   - Load to OLAP
   - **Example:** Nightly ETL job

3. **Read Replicas:**
   - Use replicas for OLAP
   - Don't impact OLTP
   - **Example:** Analytics on replica

4. **Denormalization:**
   - Denormalize for OLAP
   - Faster queries
   - **Example:** Star schema

**Best Practices:**
- Separate OLTP and OLAP
- Use ETL for sync
- Use replicas for analytics
- Denormalize OLAP database
</expand>

<expand title="Scenario: You need to implement database-level security. What measures would you take?">
**Question:** You need to implement database-level security. What measures would you take?

**Answer:**
**Security Measures:**

1. **Access Control:**
   - Role-based access
   - Least privilege
   - **Example:** Read-only users

2. **Encryption:**
   - Encrypt data at rest
   - Encrypt in transit (TLS)
   - **Example:** AES-256 encryption

3. **Authentication:**
   - Strong passwords
   - Multi-factor authentication
   - **Example:** 2FA for admin

4. **Audit Logging:**
   - Log all access
   - Track changes
   - **Example:** Who accessed what

5. **Network Security:**
   - Firewall rules
   - VPN access
   - **Example:** Only allow from app servers

6. **Backup Security:**
   - Encrypt backups
   - Secure storage
   - **Example:** Encrypted S3

**Best Practices:**
- Use role-based access
- Encrypt sensitive data
- Enable audit logging
- Restrict network access
- Regular security audits
</expand>

<expand title="Scenario: Your database needs to support full-text search. How would you implement it?">
**Question:** Your database needs to support full-text search. How would you implement it?

**Answer:**
**Options:**

1. **Database Full-Text Index:**
   ```sql
   CREATE FULLTEXT INDEX ON posts(title, content);
   SELECT * FROM posts WHERE MATCH(title, content) AGAINST('search term');
   ```
   - Built-in support
   - **Example:** MySQL, PostgreSQL

2. **Dedicated Search Engine:**
   - Elasticsearch
   - Better features
   - **Example:** Complex queries, faceting

3. **Hybrid:**
   - Database for data
   - Search engine for search
   - **Example:** Sync to Elasticsearch

**Implementation:**

1. **Indexing:**
   - Index searchable fields
   - **Example:** Title, content

2. **Syncing:**
   - Sync data to search engine
   - **Example:** Real-time or batch

3. **Querying:**
   - Query search engine
   - Return IDs
   - Fetch from database

**Best Practices:**
- Use Elasticsearch for complex search
- Sync data asynchronously
- Index only searchable fields
- Cache popular searches
</expand>

<expand title="Scenario: You need to optimize a database for write-heavy workloads. How would you do it?">
**Question:** You need to optimize a database for write-heavy workloads. How would you do it?

**Answer:**
**Optimization Strategies:**

1. **Minimize Indexes:**
   - Fewer indexes = faster writes
   - **Example:** Only essential indexes

2. **Batch Writes:**
   - Batch inserts
   - **Example:** INSERT multiple rows

3. **Connection Pooling:**
   - Reuse connections
   - **Example:** Pool of connections

4. **Asynchronous Writes:**
   - Queue writes
   - Process asynchronously
   - **Example:** Message queue

5. **Partitioning:**
   - Partition by write pattern
   - **Example:** Partition by date

6. **Hardware:**
   - Fast storage (SSD)
   - More RAM
   - **Example:** NVMe SSDs

**Best Practices:**
- Minimize indexes
- Batch writes
- Use connection pooling
- Consider async writes
- Optimize hardware
</expand>
