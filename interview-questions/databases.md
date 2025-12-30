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
