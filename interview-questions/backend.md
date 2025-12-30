# Backend Interview Questions

## General Questions & Answers

<expand title="What is the difference between REST and GraphQL?">
**Question:** What is the difference between REST and GraphQL?

**Answer:**
**REST (Representational State Transfer):**
- Uses multiple endpoints for different resources
- Fixed data structure (over-fetching or under-fetching)
- Uses HTTP methods (GET, POST, PUT, DELETE)
- Stateless communication
- Caching is easier (HTTP caching)

**GraphQL:**
- Single endpoint for all queries
- Flexible data fetching (client requests exactly what it needs)
- Query language for APIs
- Strongly typed schema
- Reduces over-fetching and under-fetching

**When to use REST:**
- Simple CRUD operations
- When caching is critical
- When you need HTTP features (status codes, headers)

**When to use GraphQL:**
- Complex data relationships
- Mobile apps with limited bandwidth
- When clients need different data shapes
- Real-time subscriptions needed

Both have their place depending on the use case.
</expand>

<expand title="Explain microservices architecture">
**Question:** Explain microservices architecture.

**Answer:**
Microservices architecture is an approach where an application is built as a collection of small, independent services that communicate over well-defined APIs.

**Key Characteristics:**
1. **Independence:** Each service can be developed, deployed, and scaled independently.

2. **Technology Diversity:** Each service can use different technologies and databases.

3. **Decentralized:** No single database or shared data store.

4. **Fault Isolation:** Failure in one service doesn't bring down the entire system.

5. **Team Autonomy:** Different teams can work on different services.

**Benefits:**
- Scalability (scale individual services)
- Flexibility (use best technology for each service)
- Faster development (parallel development)
- Easier maintenance (smaller codebases)

**Challenges:**
- Service communication complexity
- Data consistency
- Distributed system challenges
- Network latency
- Testing complexity

**When to use:**
- Large, complex applications
- Need for independent scaling
- Multiple teams working on different features
- Different performance requirements per feature
</expand>

<expand title="What is API rate limiting and why is it important?">
**Question:** What is API rate limiting and why is it important?

**Answer:**
API rate limiting controls the number of requests a client can make to an API within a specific time period.

**Why it's important:**
1. **Prevents Abuse:** Protects against DDoS attacks and malicious users.

2. **Fair Usage:** Ensures fair resource distribution among users.

3. **Cost Control:** Prevents excessive server costs from high usage.

4. **Stability:** Maintains system performance and availability.

**Common Strategies:**
1. **Fixed Window:** Allow X requests per Y time period.
   - Simple but can have bursts at window boundaries.

2. **Sliding Window:** Track requests in a rolling time window.
   - More accurate but more complex.

3. **Token Bucket:** Tokens are added at a fixed rate, requests consume tokens.
   - Allows bursts up to bucket size.

4. **Leaky Bucket:** Requests are processed at a fixed rate.
   - Smooths out traffic spikes.

**Implementation:**
- Use Redis for distributed rate limiting
- Return appropriate HTTP status codes (429 Too Many Requests)
- Include rate limit headers in responses
- Provide clear error messages

**Best Practices:**
- Set reasonable limits
- Provide different tiers (free, paid)
- Communicate limits clearly
- Use exponential backoff for retries
</expand>

<expand title="What is database connection pooling?">
**Question:** What is database connection pooling?

**Answer:**
Database connection pooling is a technique where a pool of database connections is created and reused, rather than creating a new connection for each request.

**How it works:**
1. **Pool Creation:** A fixed number of connections are created at startup.
2. **Request Handling:** When a request needs a database connection, it borrows one from the pool.
3. **Reuse:** After the request completes, the connection is returned to the pool.
4. **Management:** The pool manages connection lifecycle, health checks, and cleanup.

**Benefits:**
- **Performance:** Reusing connections is faster than creating new ones.
- **Resource Efficiency:** Limits the number of connections to the database.
- **Scalability:** Handles concurrent requests efficiently.
- **Stability:** Prevents database overload from too many connections.

**Configuration:**
- **Pool Size:** Maximum number of connections (typically 10-20).
- **Min/Max Connections:** Minimum and maximum pool size.
- **Connection Timeout:** Time to wait for an available connection.
- **Idle Timeout:** Time before closing idle connections.

**Common Implementations:**
- Node.js: `pg-pool` (PostgreSQL), `mysql2` (MySQL)
- Java: HikariCP, Apache DBCP
- Python: SQLAlchemy, psycopg2

**Best Practices:**
- Size pool based on expected load
- Monitor pool metrics
- Handle connection errors gracefully
- Use connection health checks
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: Your API is experiencing high latency. How would you diagnose and optimize it?">
**Question:** Your API is experiencing high latency. How would you diagnose and optimize it?

**Answer:**
**Diagnosis Steps:**
1. **Monitor Response Times:** Track p50, p95, p99 latencies.
2. **Identify Slow Endpoints:** Find which endpoints are slowest.
3. **Database Queries:** Check for slow queries, missing indexes, N+1 problems.
4. **External Dependencies:** Check third-party API response times.
5. **Resource Usage:** Monitor CPU, memory, network usage.

**Optimization Strategies:**

1. **Database Optimization:**
   - Add indexes on frequently queried columns
   - Optimize queries (avoid SELECT *)
   - Use query caching
   - Implement database connection pooling
   - Use read replicas for read-heavy workloads

2. **Caching:**
   ```javascript
   // Redis caching example
   const cached = await redis.get(key);
   if (cached) return JSON.parse(cached);
   const data = await db.query(...);
   await redis.setex(key, 3600, JSON.stringify(data));
   return data;
   ```

3. **Async Processing:**
   - Move heavy operations to background jobs
   - Use message queues (RabbitMQ, Kafka)
   - Process in batches

4. **API Optimization:**
   - Implement pagination
   - Use GraphQL for flexible queries
   - Compress responses (gzip)
   - Use CDN for static assets

5. **Code Optimization:**
   - Profile code to find bottlenecks
   - Optimize algorithms
   - Use efficient data structures
   - Avoid blocking operations

6. **Infrastructure:**
   - Scale horizontally (add more servers)
   - Use load balancers
   - Optimize server configuration
   - Use faster databases (Redis for hot data)

**Monitoring:**
- Set up APM (Application Performance Monitoring)
- Track key metrics (latency, throughput, error rate)
- Set up alerts for performance degradation
</expand>

<expand title="Scenario: You need to design an API that handles 1 million requests per minute. How would you architect it?">
**Question:** You need to design an API that handles 1 million requests per minute. How would you architect it?

**Answer:**
**Architecture Design:**

1. **Load Balancing:**
   - Use multiple load balancers (redundancy)
   - Distribute traffic across multiple API servers
   - Use health checks to route traffic

2. **Horizontal Scaling:**
   - Stateless API servers (can scale horizontally)
   - Auto-scaling based on load
   - Use container orchestration (Kubernetes)

3. **Caching Strategy:**
   - Redis for frequently accessed data
   - CDN for static content
   - Application-level caching
   - Cache invalidation strategy

4. **Database:**
   - Read replicas for read-heavy operations
   - Database sharding if needed
   - Connection pooling
   - Query optimization and indexing

5. **Message Queue:**
   - Use message queues for async processing
   - Decouple heavy operations
   - Process in background

6. **Rate Limiting:**
   - Implement rate limiting per user/IP
   - Use distributed rate limiting (Redis)
   - Different tiers for different users

7. **Monitoring:**
   - Real-time monitoring and alerting
   - Log aggregation
   - Performance metrics tracking

**Example Architecture:**
```
Load Balancer → API Servers (Stateless) → Redis Cache
                                      ↓
                              Database (with replicas)
                                      ↓
                              Message Queue → Workers
```

**Capacity Planning:**
- Each server handles ~10k requests/minute
- Need ~100 servers (with redundancy)
- Use auto-scaling to adjust based on load

**Key Principles:**
- Stateless design
- Horizontal scalability
- Caching at multiple levels
- Async processing
- Monitoring and alerting
</expand>

<expand title="Scenario: Your database is becoming a bottleneck. What strategies would you use to optimize it?">
**Question:** Your database is becoming a bottleneck. What strategies would you use to optimize it?

**Answer:**
**Optimization Strategies:**

1. **Query Optimization:**
   - Add indexes on frequently queried columns
   - Optimize slow queries (use EXPLAIN)
   - Avoid N+1 queries (use joins or batch loading)
   - Use SELECT only needed columns
   - Avoid SELECT * queries

2. **Database Design:**
   - Normalize for write operations
   - Denormalize for read operations (if needed)
   - Use appropriate data types
   - Partition large tables

3. **Caching:**
   - Cache frequently accessed data (Redis, Memcached)
   - Cache query results
   - Use application-level caching
   - Implement cache invalidation strategy

4. **Read Replicas:**
   - Use read replicas for read-heavy workloads
   - Route read queries to replicas
   - Keep writes on primary database

5. **Connection Pooling:**
   - Implement connection pooling
   - Limit connection pool size
   - Reuse connections efficiently

6. **Database Sharding:**
   - Shard by user ID, region, or other criteria
   - Distribute load across multiple databases
   - Handle cross-shard queries carefully

7. **Database Selection:**
   - Use NoSQL for specific use cases (high write, flexible schema)
   - Use time-series databases for time-based data
   - Use search engines (Elasticsearch) for search

8. **Archiving:**
   - Archive old data
   - Move historical data to cold storage
   - Keep only active data in primary database

**Monitoring:**
- Track slow queries
- Monitor connection pool usage
- Track database CPU and memory
- Set up alerts for performance issues

**Example:**
```sql
-- Add index
CREATE INDEX idx_user_email ON users(email);

-- Optimize query
SELECT id, name, email FROM users WHERE email = 'user@example.com';
-- Instead of
SELECT * FROM users WHERE email = 'user@example.com';
```
</expand>

