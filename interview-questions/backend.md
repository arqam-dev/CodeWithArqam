# Backend Interview Questions

## General Questions & Answers

<expand title="When would you choose REST over GraphQL for an API?">
**Question:** When would you choose REST over GraphQL for an API?

**Answer:**
Choose REST when:

1. **Simple CRUD Operations:** Your API primarily handles standard create, read, update, delete operations without complex relationships.

2. **Caching is Critical:** REST works better with HTTP caching mechanisms. CDNs and reverse proxies can cache REST endpoints easily, reducing server load.

3. **File Uploads/Downloads:** REST handles file operations more straightforwardly than GraphQL.

4. **Existing Infrastructure:** Your team is already familiar with REST, and you have existing tooling, monitoring, and documentation.

5. **Stateless Operations:** You need stateless operations that work well with HTTP methods and status codes.

6. **Simple Client Needs:** All clients need similar data structures, so over-fetching isn't a concern.

**Example Scenario:**
A content management system where clients always need full article data. REST endpoints like `GET /articles/:id` work perfectly since the response structure is consistent.

**When NOT to use REST:**
- Mobile apps with limited bandwidth needing only specific fields
- Complex nested data relationships
- Multiple clients needing different data shapes
</expand>

<expand title="How do you handle communication between microservices?">
**Question:** How do you handle communication between microservices?

**Answer:**
**Synchronous Communication:**

1. **REST APIs:**
   - HTTP/HTTPS requests
   - Simple, widely understood
   - Good for request-response patterns
   - **Drawback:** Tight coupling, cascading failures

2. **gRPC:**
   - Protocol buffers, faster than REST
   - Type-safe, supports streaming
   - Better for internal service-to-service communication
   - **Use Case:** High-performance requirements

**Asynchronous Communication:**

1. **Message Queues (RabbitMQ, Amazon SQS):**
   - Decouples services
   - Handles traffic spikes
   - Retry mechanisms
   - **Use Case:** Order processing, notifications

2. **Event Streaming (Kafka, Amazon Kinesis):**
   - Real-time event processing
   - Event sourcing patterns
   - Multiple consumers
   - **Use Case:** Analytics, audit logs, real-time updates

**Best Practices:**
- Use async for non-critical operations
- Implement circuit breakers for sync calls
- Use service mesh (Istio, Linkerd) for complex deployments
- Implement retry with exponential backoff
- Use API gateway for external communication
</expand>

<expand title="How would you implement rate limiting in a distributed system?">
**Question:** How would you implement rate limiting in a distributed system?

**Answer:**
**Challenge:** Multiple servers need to share rate limit state.

**Solution: Distributed Rate Limiting with Redis:**

1. **Token Bucket Algorithm:**
   ```javascript
   // Redis implementation
   const key = `rate_limit:${userId}`;
   const tokens = await redis.incr(key);
   
   if (tokens === 1) {
     await redis.expire(key, 60); // 60 second window
   }
   
   if (tokens > 100) { // 100 requests per minute
     return { error: 'Rate limit exceeded' };
   }
   ```

2. **Sliding Window Log:**
   - Store timestamps of requests in Redis sorted set
   - Remove old timestamps outside window
   - Count remaining timestamps
   - More accurate but uses more memory

3. **Fixed Window Counter:**
   - Simple counter per time window
   - Reset at window boundary
   - Can have burst issues at boundaries

**Implementation Considerations:**
- Use Redis for shared state
- Handle Redis failures gracefully (fallback to local rate limiting)
- Different limits for different user tiers
- Return 429 status code with Retry-After header
- Include rate limit info in response headers

**Alternative: API Gateway Rate Limiting:**
- AWS API Gateway, Kong, Nginx rate limiting
- Handles distribution automatically
- Less control but simpler implementation
</expand>

<expand title="How do you ensure data consistency across microservices?">
**Question:** How do you ensure data consistency across microservices?

**Answer:**
**Challenge:** Each microservice has its own database (no distributed transactions).

**Patterns:**

1. **Saga Pattern:**
   - Sequence of local transactions
   - Each service performs its transaction
   - If one fails, compensating transactions roll back
   - **Types:**
     - Choreography: Services coordinate via events
     - Orchestration: Central coordinator manages flow

2. **Event Sourcing:**
   - Store events instead of current state
   - Rebuild state by replaying events
   - Services react to events
   - **Use Case:** Audit trails, complex business logic

3. **CQRS (Command Query Responsibility Segregation):**
   - Separate read and write models
   - Write model updates, read model syncs asynchronously
   - Eventual consistency acceptable

4. **Two-Phase Commit (Avoid):**
   - Traditional distributed transactions
   - **Problem:** Locks, poor performance, doesn't scale

**Best Practice:**
Accept eventual consistency where possible. Use sagas for critical workflows that need coordination.
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: Your API suddenly receives 10x normal traffic. How do you handle the spike?">
**Question:** Your API suddenly receives 10x normal traffic. How do you handle the spike?

**Answer:**
**Immediate Actions:**

1. **Auto-Scaling:**
   - Cloud auto-scaling groups (AWS ASG, GCP Managed Instance Groups)
   - Scale based on CPU, memory, or request count
   - Pre-warm instances if possible
   - **Example:** Scale from 10 to 100 servers within 5 minutes

2. **Load Balancing:**
   - Distribute traffic across all available servers
   - Health checks to remove unhealthy instances
   - Use multiple load balancers for redundancy

3. **Caching:**
   - Aggressively cache responses
   - Increase cache TTL temporarily
   - Use CDN for static content
   - Cache database query results

4. **Rate Limiting:**
   - Implement or tighten rate limits
   - Protect backend from overload
   - Queue requests if needed
   - Return 503 with Retry-After for non-critical requests

5. **Database Protection:**
   - Use read replicas for read traffic
   - Connection pooling limits
   - Query result caching
   - Temporarily disable expensive queries

**Architecture Patterns:**

1. **Circuit Breaker:**
   - Stop calling failing services
   - Return cached/default responses
   - Prevent cascading failures

2. **Bulkhead Pattern:**
   - Isolate resources (thread pools, connections)
   - Failure in one area doesn't affect others

3. **Throttling:**
   - Queue requests
   - Process at controlled rate
   - Prioritize critical requests

**Monitoring:**
- Real-time dashboards (CPU, memory, request rate, error rate)
- Set up alerts for thresholds
- Track response times (p50, p95, p99)

**Long-term:**
- Load testing to identify bottlenecks
- Capacity planning
- Implement auto-scaling policies
- Use message queues for async processing
</expand>

<expand title="Scenario: You need to choose between monolithic and microservices architecture. What factors would you consider?">
**Question:** You need to choose between monolithic and microservices architecture. What factors would you consider?

**Answer:**
**Choose Monolithic When:**

1. **Small Team (1-5 developers):**
   - Easier to coordinate
   - Less operational overhead
   - Faster initial development

2. **Simple Application:**
   - Clear boundaries not needed
   - No complex scaling requirements
   - Single deployment unit is manageable

3. **Early Stage Startup:**
   - Need to move fast
   - Uncertain requirements
   - Can refactor later when needed

4. **Tight Coupling:**
   - Services need strong consistency
   - Shared database makes sense
   - High transaction volume across domains

**Choose Microservices When:**

1. **Large Team (10+ developers):**
   - Teams can work independently
   - Different release cycles
   - Technology diversity needed

2. **Different Scaling Needs:**
   - Some features need more resources
   - Independent scaling per service
   - Cost optimization

3. **Complex Domain:**
   - Clear bounded contexts
   - Different business domains
   - Independent business logic

4. **High Availability:**
   - Fault isolation critical
   - Can't afford full system downtime
   - Different reliability requirements

**Decision Framework:**
- Start with monolith if uncertain
- Extract services when you have clear boundaries
- Consider team size and structure
- Evaluate operational complexity
- Assess scaling requirements

**Hybrid Approach:**
- Monolith for core features
- Microservices for specific features (payments, notifications)
- Gradually extract services as needed
</expand>

<expand title="Scenario: Your database queries are slow during peak hours. How would you optimize without changing the database?">
**Question:** Your database queries are slow during peak hours. How would you optimize without changing the database?

**Answer:**
**Optimization Strategies:**

1. **Connection Pooling:**
   - Reuse connections instead of creating new ones
   - Limit pool size to prevent overload
   - Monitor pool usage
   - **Impact:** Reduces connection overhead significantly

2. **Query Optimization:**
   ```sql
   -- Add indexes on frequently queried columns
   CREATE INDEX idx_user_email ON users(email);
   CREATE INDEX idx_order_user_date ON orders(user_id, created_at);
   
   -- Use covering indexes
   CREATE INDEX idx_user_covering ON users(email, name, status);
   ```

3. **Read Replicas:**
   - Route read queries to replicas
   - Keep writes on primary
   - Reduces load on primary database
   - **Implementation:** Use connection string routing or proxy

4. **Query Result Caching:**
   ```javascript
   // Cache frequently accessed data
   const cacheKey = `user:${userId}`;
   let user = await redis.get(cacheKey);
   
   if (!user) {
     user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
     await redis.setex(cacheKey, 3600, JSON.stringify(user));
   }
   ```

5. **Batch Operations:**
   - Combine multiple queries into one
   - Use IN clauses instead of multiple queries
   - Bulk inserts instead of individual inserts

6. **Query Timeouts:**
   - Set query timeouts
   - Cancel long-running queries
   - Prevent resource exhaustion

7. **Connection Limits:**
   - Limit connections per application
   - Use connection pooling
   - Monitor connection count

**Monitoring:**
- Track slow queries (enable slow query log)
- Monitor connection pool usage
- Track query execution times
- Set up alerts for performance degradation
</expand>

<expand title="Scenario: You need to design an API that handles 1 million requests per minute. How would you architect it?">
**Question:** You need to design an API that handles 1 million requests per minute. How would you architect it?

**Answer:**
**Capacity:** 1M requests/minute = ~16,667 requests/second

**Architecture:**

1. **Load Balancing:**
   - Multiple load balancers (redundancy)
   - Distribute across API servers
   - Health checks and auto-failover
   - **Example:** AWS ALB or Nginx

2. **API Servers (Stateless):**
   - Horizontal scaling
   - Auto-scaling: 10-200 servers based on load
   - Each server handles ~100-200 req/sec
   - Container orchestration (Kubernetes)

3. **Caching Layer:**
   - Redis cluster for hot data
   - CDN for static content
   - Application-level caching
   - **Cache Strategy:** Cache-aside with TTL

4. **Database:**
   - Read replicas (5-10 replicas)
   - Connection pooling (50-100 connections per server)
   - Query optimization and indexing
   - Sharding if single database can't handle writes

5. **Message Queue:**
   - Async processing for heavy operations
   - Kafka or RabbitMQ
   - Background workers for processing
   - Decouples API from heavy work

6. **Rate Limiting:**
   - Per user/IP limits
   - Distributed rate limiting (Redis)
   - Different tiers (free: 100/min, paid: 1000/min)

**Example Architecture:**
```
CDN → Load Balancers → API Servers (Auto-scaling)
                          ↓
                    Redis Cluster
                          ↓
                    Database (Primary + Read Replicas)
                          ↓
                    Message Queue → Workers
```

**Capacity Planning:**
- API Servers: ~100 servers (with 2x redundancy = 200)
- Database: Primary + 10 read replicas
- Redis: 3-node cluster
- Load Balancers: 2 for redundancy

**Key Principles:**
- Stateless design (any server can handle any request)
- Horizontal scalability
- Caching at multiple levels
- Async processing
- Monitoring and alerting
</expand>

<expand title="Scenario: How would you handle a database that's becoming a bottleneck during traffic spikes?">
**Question:** How would you handle a database that's becoming a bottleneck during traffic spikes?

**Answer:**
**Immediate Actions:**

1. **Read Replicas:**
   - Route all read queries to replicas
   - Keep writes on primary
   - **Setup:** Add 2-5 read replicas
   - **Routing:** Use connection proxy or application-level routing

2. **Aggressive Caching:**
   ```javascript
   // Cache everything possible
   const cacheKey = `data:${id}`;
   const cached = await redis.get(cacheKey);
   if (cached) return JSON.parse(cached);
   
   const data = await db.query(...);
   await redis.setex(cacheKey, 300, JSON.stringify(data)); // 5 min TTL
   return data;
   ```

3. **Connection Pooling:**
   - Limit connections per application
   - Reuse connections efficiently
   - Monitor pool usage
   - **Example:** Max 50 connections per app instance

4. **Query Optimization:**
   - Add missing indexes
   - Optimize slow queries
   - Use EXPLAIN to analyze queries
   - Avoid N+1 queries

5. **Write Optimization:**
   - Batch writes instead of individual inserts
   - Use bulk operations
   - Queue writes if possible
   - **Example:** Batch 100 inserts into one query

**Long-term Solutions:**

1. **Database Sharding:**
   - Shard by user ID or region
   - Distribute load across shards
   - Handle cross-shard queries carefully

2. **CQRS Pattern:**
   - Separate read and write databases
   - Write to primary, read from optimized read store
   - Sync asynchronously

3. **NoSQL for Specific Use Cases:**
   - Use Redis for hot data
   - Use MongoDB for flexible schema needs
   - Use time-series DB for analytics

4. **Archiving:**
   - Move old data to cold storage
   - Keep only active data in primary DB
   - Reduces database size and load

**Monitoring:**
- Track query execution times
- Monitor connection pool usage
- Track database CPU and memory
- Set up alerts for slow queries
</expand>
