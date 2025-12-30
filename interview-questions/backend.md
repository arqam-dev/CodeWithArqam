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

<expand title="What is the difference between authentication and authorization?">
**Question:** What is the difference between authentication and authorization?

**Answer:**
**Authentication (Who you are):**
- Verifies user identity
- Confirms user is who they claim to be
- **Methods:** Username/password, OAuth, JWT tokens, biometrics
- **Example:** Login process

**Authorization (What you can do):**
- Determines user permissions
- Controls access to resources
- **Methods:** Role-based access control (RBAC), permissions, policies
- **Example:** Admin can delete posts, regular users cannot

**Key Difference:**
- Authentication happens first (login)
- Authorization happens after (checking permissions)

**Implementation:**
```javascript
// Authentication
const user = await authenticate(username, password);
if (!user) return 401; // Unauthorized

// Authorization
if (!user.hasPermission('DELETE_POST')) {
  return 403; // Forbidden
}
```

**Best Practices:**
- Use JWT tokens for stateless authentication
- Implement RBAC for authorization
- Use middleware for both
- Never trust client-side authorization checks
</expand>

<expand title="How do you implement API versioning?">
**Question:** How do you implement API versioning?

**Answer:**
**Versioning Strategies:**

1. **URL Path Versioning:**
   ```
   /api/v1/users
   /api/v2/users
   ```
   - Simple, explicit
   - Easy to understand
   - Most common approach

2. **Query Parameter:**
   ```
   /api/users?version=1
   /api/users?version=2
   ```
   - Clean URLs
   - Less explicit
   - Can be confusing

3. **Header Versioning:**
   ```
   Accept: application/vnd.api.v1+json
   ```
   - Clean URLs
   - RESTful
   - Less discoverable

4. **Subdomain:**
   ```
   v1.api.example.com
   v2.api.example.com
   ```
   - Complete isolation
   - Can use different infrastructure
   - More complex setup

**Best Practices:**
- Start with v1 from the beginning
- Maintain backward compatibility when possible
- Deprecate old versions gradually
- Document version changes clearly
- Use semantic versioning (v1.0.0, v1.1.0, v2.0.0)

**Example:**
```javascript
// Express.js route versioning
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
```
</expand>

<expand title="What is idempotency and why is it important in APIs?">
**Question:** What is idempotency and why is it important in APIs?

**Answer:**
**Idempotency:** Performing the same operation multiple times produces the same result as performing it once.

**Why Important:**
- Prevents duplicate operations
- Safe to retry failed requests
- Critical for payment processing, order creation
- Reduces data inconsistencies

**HTTP Methods:**
- **Idempotent:** GET, PUT, DELETE, HEAD, OPTIONS
- **Not Idempotent:** POST, PATCH

**Implementation:**

1. **Idempotency Keys:**
   ```javascript
   // Client sends unique key
   POST /orders
   Headers: { "Idempotency-Key": "unique-key-123" }
   
   // Server checks if key exists
   if (cache.has(idempotencyKey)) {
     return cache.get(idempotencyKey); // Return previous response
   }
   
   // Process request and cache response
   const result = processOrder();
   cache.set(idempotencyKey, result, TTL);
   return result;
   ```

2. **Natural Idempotency:**
   ```javascript
   // PUT is naturally idempotent
   PUT /users/123
   Body: { name: "John" }
   // Multiple calls = same result
   ```

**Best Practices:**
- Use idempotency keys for POST requests
- Store keys in Redis with TTL
- Return same response for duplicate keys
- Use PUT for updates (idempotent by design)
</expand>

<expand title="How do you handle errors in a RESTful API?">
**Question:** How do you handle errors in a RESTful API?

**Answer:**
**HTTP Status Codes:**

1. **4xx Client Errors:**
   - 400 Bad Request: Invalid input
   - 401 Unauthorized: Not authenticated
   - 403 Forbidden: Authenticated but not authorized
   - 404 Not Found: Resource doesn't exist
   - 409 Conflict: Resource conflict
   - 429 Too Many Requests: Rate limit exceeded

2. **5xx Server Errors:**
   - 500 Internal Server Error: Unexpected error
   - 502 Bad Gateway: Upstream server error
   - 503 Service Unavailable: Service down/maintenance
   - 504 Gateway Timeout: Upstream timeout

**Error Response Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "reason": "missing"
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req-123"
  }
}
```

**Best Practices:**
- Use appropriate HTTP status codes
- Provide clear error messages
- Include request ID for debugging
- Log errors server-side
- Don't expose sensitive information
- Use consistent error format
- Include validation errors in 400 responses

**Example:**
```javascript
try {
  const user = await createUser(data);
  return res.status(201).json(user);
} catch (error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
        details: error.details
      }
    });
  }
  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
}
</expand>

<expand title="What is the difference between stateful and stateless APIs?">
**Question:** What is the difference between stateful and stateless APIs?

**Answer:**
**Stateless APIs:**
- Each request contains all information needed
- Server doesn't store client state
- Scalable horizontally
- **Example:** REST APIs with JWT tokens

**Stateful APIs:**
- Server maintains client state
- Session stored on server
- Requires sticky sessions for load balancing
- **Example:** Traditional session-based authentication

**Stateless Example:**
```javascript
// JWT token contains all user info
GET /api/users/me
Headers: { Authorization: "Bearer <jwt-token>" }
// Token decoded on server, no session lookup
```

**Stateful Example:**
```javascript
// Session stored on server
POST /login
// Server creates session, stores in memory/Redis
// Subsequent requests use session ID
GET /api/users/me
Headers: { Cookie: "sessionId=abc123" }
// Server looks up session
```

**When to Use Stateless:**
- Microservices architecture
- Need horizontal scaling
- Mobile apps
- API-first applications

**When to Use Stateful:**
- Traditional web applications
- Need to revoke sessions immediately
- Complex session management
- Legacy systems

**Best Practice:**
Use stateless APIs for modern applications. They're more scalable and work better with microservices.
</expand>

<expand title="How do you secure an API?">
**Question:** How do you secure an API?

**Answer:**
**Security Measures:**

1. **Authentication:**
   - JWT tokens
   - OAuth 2.0
   - API keys (for server-to-server)
   - Multi-factor authentication

2. **Authorization:**
   - Role-based access control (RBAC)
   - Permission-based access
   - Resource-level permissions

3. **HTTPS:**
   - Encrypt all traffic
   - Use TLS 1.2+
   - Prevent man-in-the-middle attacks

4. **Rate Limiting:**
   - Prevent abuse
   - Protect against DDoS
   - Different limits per user tier

5. **Input Validation:**
   - Validate all inputs
   - Sanitize data
   - Prevent SQL injection, XSS

6. **CORS:**
   - Configure allowed origins
   - Restrict methods and headers
   - Don't use wildcard in production

7. **Security Headers:**
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Strict-Transport-Security: max-age=31536000
   ```

8. **API Keys:**
   - Rotate regularly
   - Store securely (environment variables)
   - Use different keys for different environments

9. **Logging & Monitoring:**
   - Log security events
   - Monitor for suspicious activity
   - Set up alerts

10. **Dependencies:**
    - Keep dependencies updated
    - Scan for vulnerabilities
    - Use dependency management tools
</expand>

<expand title="What is API gateway and when would you use it?">
**Question:** What is API gateway and when would you use it?

**Answer:**
**API Gateway:** Single entry point for all client requests, routing to appropriate microservices.

**Features:**
- Request routing
- Authentication/authorization
- Rate limiting
- Load balancing
- Request/response transformation
- API versioning
- Monitoring and logging
- Caching

**When to Use:**
- Microservices architecture
- Multiple clients (web, mobile, third-party)
- Need centralized security
- Complex routing requirements
- API composition needed

**Benefits:**
- Single point of entry
- Centralized security
- Simplified client code
- Better monitoring
- Easier to manage APIs

**Example Architecture:**
```
Client → API Gateway → Microservice 1
                    → Microservice 2
                    → Microservice 3
```

**Popular Solutions:**
- AWS API Gateway
- Kong
- Nginx
- Zuul (Netflix)
- Ambassador

**Considerations:**
- Can become bottleneck (scale appropriately)
- Single point of failure (use multiple instances)
- Additional latency (minimize)
- Cost (consider managed vs self-hosted)
</expand>

<expand title="How do you handle long-running operations in an API?">
**Question:** How do you handle long-running operations in an API?

**Answer:**
**Problem:** Long operations (file processing, data export) can't complete in HTTP request timeout.

**Solutions:**

1. **Async Processing with Job Queue:**
   ```javascript
   // 1. Submit job
   POST /api/export
   Response: { jobId: "job-123", status: "processing" }
   
   // 2. Poll for status
   GET /api/jobs/job-123
   Response: { status: "completed", resultUrl: "/download/file.csv" }
   
   // 3. Process in background
   // Worker picks up job from queue
   ```

2. **Webhooks:**
   ```javascript
   // Client provides callback URL
   POST /api/export
   Body: { callbackUrl: "https://client.com/webhook" }
   
   // Server calls webhook when done
   POST https://client.com/webhook
   Body: { status: "completed", downloadUrl: "..." }
   ```

3. **Server-Sent Events (SSE):**
   ```javascript
   // Client opens SSE connection
   GET /api/jobs/job-123/stream
   
   // Server sends updates
   data: { status: "processing", progress: 50 }
   data: { status: "completed", resultUrl: "..." }
   ```

4. **WebSockets:**
   - Real-time bidirectional communication
   - Good for progress updates
   - More complex to implement

**Best Practices:**
- Return job ID immediately
- Provide status endpoint
- Set reasonable timeouts
- Clean up completed jobs
- Handle failures gracefully
- Use message queues (RabbitMQ, SQS)
</expand>

<expand title="What is the difference between PUT and PATCH?">
**Question:** What is the difference between PUT and PATCH?

**Answer:**
**PUT:**
- Replaces entire resource
- Idempotent
- Must send complete resource
- **Use Case:** Update entire resource

**PATCH:**
- Partial update
- Not idempotent (can be made idempotent)
- Send only changed fields
- **Use Case:** Update specific fields

**Example:**

```javascript
// PUT - Replace entire user
PUT /api/users/123
Body: {
  name: "John",
  email: "john@example.com",
  age: 30
}
// All fields required, replaces entire resource

// PATCH - Update only name
PATCH /api/users/123
Body: {
  name: "Jane"
}
// Only updates name field
```

**When to Use PUT:**
- Updating entire resource
- Need idempotency
- Resource replacement

**When to Use PATCH:**
- Partial updates
- Large resources (save bandwidth)
- Flexible updates

**Best Practices:**
- Use PUT for full updates
- Use PATCH for partial updates
- Make PATCH idempotent when possible
- Validate PATCH requests carefully
- Document which fields can be updated
</expand>

<expand title="How do you implement pagination in an API?">
**Question:** How do you implement pagination in an API?

**Answer:**
**Pagination Strategies:**

1. **Offset-Based (Page/Size):**
   ```
   GET /api/users?page=1&size=20
   ```
   - Simple to implement
   - Can have performance issues with large offsets
   - **Example:** Page 1000 requires scanning 20,000 records

2. **Cursor-Based (After/Before):**
   ```
   GET /api/users?after=cursor123&limit=20
   ```
   - Better performance
   - Consistent results (no duplicates)
   - **Example:** Use last item's ID as cursor

3. **Keyset Pagination:**
   ```
   GET /api/users?lastId=123&limit=20
   ```
   - Efficient for sorted data
   - Works well with indexes
   - **Example:** WHERE id > 123 ORDER BY id LIMIT 20

**Response Format:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "size": 20,
    "total": 1000,
    "totalPages": 50,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

**Best Practices:**
- Use cursor-based for large datasets
- Set maximum page size (prevent abuse)
- Include pagination metadata
- Use indexes on pagination fields
- Consider using keyset for sorted data
</expand>

<expand title="What is the difference between synchronous and asynchronous processing?">
**Question:** What is the difference between synchronous and asynchronous processing?

**Answer:**
**Synchronous:**
- Request waits for response
- Blocking operation
- Simple to implement
- **Use Case:** Quick operations, real-time responses

**Asynchronous:**
- Request returns immediately
- Operation continues in background
- More complex
- **Use Case:** Long-running tasks, batch processing

**Synchronous Example:**
```javascript
// User waits for response
POST /api/users
// Server processes, returns result
// Response time: 200ms
```

**Asynchronous Example:**
```javascript
// Returns immediately
POST /api/export
Response: { jobId: "123", status: "processing" }

// Process in background
// Client polls for completion
GET /api/jobs/123
```

**When to Use Synchronous:**
- Quick operations (< 1 second)
- Need immediate response
- Simple workflows
- Real-time operations

**When to Use Asynchronous:**
- Long operations (> 1 second)
- Can accept delayed response
- Batch processing
- Resource-intensive tasks

**Best Practices:**
- Use async for operations > 1 second
- Provide job status endpoints
- Use message queues for reliability
- Handle failures gracefully
- Set reasonable timeouts
</expand>

<expand title="How do you implement caching in a backend API?">
**Question:** How do you implement caching in a backend API?

**Answer:**
**Caching Strategies:**

1. **Cache-Aside (Lazy Loading):**
   ```javascript
   // Check cache first
   let data = await cache.get(key);
   if (!data) {
     data = await db.query(...);
     await cache.set(key, data, TTL);
   }
   return data;
   ```

2. **Write-Through:**
   ```javascript
   // Write to both cache and DB
   await cache.set(key, data);
   await db.save(data);
   ```

3. **Write-Back:**
   ```javascript
   // Write to cache, DB later
   await cache.set(key, data);
   // DB write happens asynchronously
   ```

**Cache Levels:**
- **Application Cache:** In-memory (Redis, Memcached)
- **CDN Cache:** Static content
- **Database Query Cache:** Query results
- **HTTP Cache:** Browser/CDN caching

**Cache Invalidation:**
- TTL-based expiration
- Event-based invalidation
- Manual invalidation
- Cache versioning

**Best Practices:**
- Cache frequently accessed, rarely changed data
- Set appropriate TTL
- Use cache keys with versioning
- Handle cache misses gracefully
- Monitor cache hit rates
- Use distributed cache for scalability
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

<expand title="Scenario: Your API is returning inconsistent data to different clients. How would you debug and fix this?">
**Question:** Your API is returning inconsistent data to different clients. How would you debug and fix this?

**Answer:**
**Debugging Steps:**

1. **Check Caching:**
   - Verify cache invalidation
   - Check cache TTL settings
   - Ensure cache keys are consistent
   - **Issue:** Stale cache data

2. **Database Replication Lag:**
   - Check replication status
   - Monitor lag between master and replicas
   - Route critical reads to primary
   - **Issue:** Read replicas have stale data

3. **Race Conditions:**
   - Check for concurrent updates
   - Use database transactions
   - Implement optimistic locking
   - **Issue:** Updates overwriting each other

4. **Request Routing:**
   - Verify load balancer configuration
   - Check if requests go to different servers
   - Ensure stateless design
   - **Issue:** Server-specific state

5. **Data Versioning:**
   - Check API versioning
   - Verify client versions
   - Ensure backward compatibility
   - **Issue:** Different API versions

**Fixes:**
- Implement proper cache invalidation
- Use read-after-write consistency
- Add request IDs for tracing
- Use distributed tracing
- Implement proper locking mechanisms
- Monitor replication lag
</expand>

<expand title="Scenario: You need to migrate from REST to GraphQL. How would you approach this?">
**Question:** You need to migrate from REST to GraphQL. How would you approach this?

**Answer:**
**Migration Strategy:**

1. **Gradual Migration:**
   - Run both APIs in parallel
   - Migrate endpoints one by one
   - Use API gateway to route requests
   - **Benefit:** Low risk, testable

2. **Schema Design:**
   - Map existing REST endpoints to GraphQL schema
   - Design types and relationships
   - Consider data fetching patterns
   - **Example:** REST `/users/:id/posts` → GraphQL `user.posts`

3. **Resolver Implementation:**
   - Create resolvers for each field
   - Reuse existing business logic
   - Optimize N+1 queries (DataLoader)
   - **Example:** User resolver calls existing user service

4. **Client Migration:**
   - Update clients gradually
   - Provide migration guide
   - Support both during transition
   - **Timeline:** 3-6 months typical

5. **Performance Optimization:**
   - Implement query complexity limits
   - Use DataLoader for batching
   - Add query depth limits
   - Cache frequently accessed data

**Best Practices:**
- Start with read-only queries
- Migrate writes after reads
- Monitor performance
- Provide clear documentation
- Train team on GraphQL
</expand>

<expand title="Scenario: Your microservices are experiencing cascading failures. How do you prevent this?">
**Question:** Your microservices are experiencing cascading failures. How do you prevent this?

**Answer:**
**Prevention Strategies:**

1. **Circuit Breaker Pattern:**
   ```javascript
   // Stop calling failing service
   if (circuitBreaker.isOpen()) {
     return fallbackResponse();
   }
   
   try {
     const result = await service.call();
     circuitBreaker.recordSuccess();
     return result;
   } catch (error) {
     circuitBreaker.recordFailure();
     return fallbackResponse();
   }
   ```

2. **Bulkhead Pattern:**
   - Isolate resources
   - Separate thread pools per service
   - Prevent one failure from affecting others
   - **Example:** Payment service failure doesn't affect user service

3. **Timeout Configuration:**
   - Set reasonable timeouts
   - Fail fast, don't wait indefinitely
   - Use different timeouts per service
   - **Example:** 500ms for critical, 2s for non-critical

4. **Retry with Exponential Backoff:**
   ```javascript
   // Retry with increasing delays
   const delays = [100, 200, 400, 800];
   for (const delay of delays) {
     try {
       return await service.call();
     } catch (error) {
       await sleep(delay);
     }
   }
   ```

5. **Health Checks:**
   - Monitor service health
   - Remove unhealthy instances from load balancer
   - Automatic failover
   - **Example:** Health check every 10 seconds

6. **Rate Limiting:**
   - Limit requests to downstream services
   - Prevent overwhelming services
   - Queue requests if needed
   - **Example:** Max 100 requests/second per service

**Best Practices:**
- Implement circuit breakers for all external calls
- Use bulkheads for resource isolation
- Set appropriate timeouts
- Monitor service dependencies
- Have fallback responses ready
</expand>

<expand title="Scenario: You need to implement real-time notifications in your API. How would you design it?">
**Question:** You need to implement real-time notifications in your API. How would you design it?

**Answer:**
**Architecture Options:**

1. **WebSockets:**
   ```javascript
   // Server maintains persistent connection
   const ws = new WebSocket('wss://api.example.com/notifications');
   ws.onmessage = (event) => {
     const notification = JSON.parse(event.data);
     displayNotification(notification);
   };
   ```
   - Bidirectional communication
   - Low latency
   - More complex to scale

2. **Server-Sent Events (SSE):**
   ```javascript
   // Client opens connection
   const eventSource = new EventSource('/api/notifications/stream');
   eventSource.onmessage = (event) => {
     const notification = JSON.parse(event.data);
     displayNotification(notification);
   };
   ```
   - One-way (server to client)
   - Simpler than WebSockets
   - Good for notifications

3. **Polling:**
   ```javascript
   // Client polls for updates
   setInterval(async () => {
     const notifications = await fetch('/api/notifications');
     displayNotifications(notifications);
   }, 5000);
   ```
   - Simple to implement
   - Higher latency
   - More server load

**Recommended Architecture:**
```
API Server → Message Queue (Kafka/RabbitMQ) → Notification Service
                                              ↓
                                        WebSocket/SSE Server
                                              ↓
                                           Clients
```

**Implementation:**
- Use message queue for reliability
- Scale WebSocket servers horizontally
- Use Redis for connection management
- Implement reconnection logic
- Handle connection failures gracefully

**Best Practices:**
- Use SSE for simple notifications
- Use WebSockets for bidirectional needs
- Implement connection pooling
- Handle reconnections
- Scale horizontally
</expand>

<expand title="Scenario: Your API needs to handle file uploads of up to 1GB. How would you implement this?">
**Question:** Your API needs to handle file uploads of up to 1GB. How would you implement this?

**Answer:**
**Challenges:**
- HTTP timeout limits
- Memory constraints
- Network reliability
- Progress tracking

**Solutions:**

1. **Chunked Upload (Multipart):**
   ```javascript
   // Client splits file into chunks
   const chunkSize = 5 * 1024 * 1024; // 5MB chunks
   for (let i = 0; i < file.size; i += chunkSize) {
     const chunk = file.slice(i, i + chunkSize);
     await uploadChunk(uploadId, chunk, i);
   }
   
   // Server reassembles
   POST /api/uploads/{uploadId}/chunks
   ```

2. **Resumable Uploads:**
   ```javascript
   // Check existing chunks
   GET /api/uploads/{uploadId}
   Response: { uploadedChunks: [0, 1, 2], totalChunks: 10 }
   
   // Resume from missing chunks
   POST /api/uploads/{uploadId}/chunks/3
   ```

3. **Direct to Storage:**
   ```javascript
   // Get presigned URL from API
   POST /api/uploads/initiate
   Response: { uploadUrl: "https://s3.amazonaws.com/...", uploadId: "..." }
   
   // Upload directly to S3
   PUT {uploadUrl}
   Body: file data
   
   // Notify API when complete
   POST /api/uploads/{uploadId}/complete
   ```

4. **Progress Tracking:**
   ```javascript
   // Server tracks progress
   GET /api/uploads/{uploadId}/status
   Response: { progress: 45, status: "uploading" }
   ```

**Best Practices:**
- Use chunked uploads for large files
- Support resumable uploads
- Upload directly to object storage (S3)
- Track upload progress
- Validate file types and sizes
- Clean up failed uploads
</expand>

<expand title="Scenario: You need to implement search functionality across multiple microservices. How would you design it?">
**Question:** You need to implement search functionality across multiple microservices. How would you design it?

**Answer:**
**Architecture Options:**

1. **Search Service with Data Sync:**
   ```
   Microservices → Events → Search Service → Elasticsearch
   ```
   - Services publish events
   - Search service indexes data
   - Single search endpoint
   - **Benefit:** Centralized, consistent

2. **API Gateway Aggregation:**
   ```
   Client → API Gateway → Search Service
                              ↓
                    Query Multiple Services
                              ↓
                    Aggregate Results
   ```
   - Gateway queries all services
   - Aggregates results
   - **Benefit:** No data duplication

3. **Event Sourcing:**
   ```
   Services → Event Bus → Search Index
   ```
   - Services emit events
   - Search index updates from events
   - **Benefit:** Decoupled, scalable

**Recommended Approach:**
```
Services → Kafka → Search Service → Elasticsearch
                              ↓
                         Search API
```

**Implementation:**
- Use Elasticsearch for full-text search
- Sync data via events (Kafka)
- Implement search service
- Support filtering, sorting, pagination
- Cache popular searches

**Features:**
- Full-text search
- Faceted search
- Autocomplete
- Fuzzy matching
- Relevance scoring

**Best Practices:**
- Use dedicated search engine (Elasticsearch)
- Sync data asynchronously
- Index only searchable fields
- Implement caching
- Monitor search performance
</expand>

<expand title="Scenario: Your API response times are inconsistent. Some requests are fast, others are slow. How would you diagnose this?">
**Question:** Your API response times are inconsistent. Some requests are fast, others are slow. How would you diagnose this?

**Answer:**
**Diagnosis Steps:**

1. **Add Distributed Tracing:**
   ```javascript
   // Track request across services
   const trace = tracer.startSpan('api-request');
   // ... process request
   trace.finish();
   ```
   - Identify slow services
   - Find bottlenecks
   - Track request flow

2. **Monitor Database Queries:**
   - Enable slow query log
   - Check for missing indexes
   - Identify N+1 queries
   - **Example:** Some queries use index, others don't

3. **Check Caching:**
   - Monitor cache hit rates
   - Check cache key patterns
   - Verify TTL settings
   - **Issue:** Cache misses cause slow responses

4. **Analyze Request Patterns:**
   - Check request payload sizes
   - Identify complex queries
   - Monitor external API calls
   - **Issue:** Large payloads or complex operations

5. **Resource Monitoring:**
   - CPU usage per request
   - Memory usage
   - Network latency
   - **Issue:** Resource contention

6. **Check Dependencies:**
   - External API response times
   - Database connection pool
   - Third-party service latency
   - **Issue:** Slow downstream services

**Fixes:**
- Add indexes for slow queries
- Implement caching
- Optimize database queries
- Use connection pooling
- Add request timeouts
- Implement circuit breakers
- Use async processing for heavy operations
</expand>

<expand title="Scenario: You need to implement API analytics and monitoring. What metrics would you track?">
**Question:** You need to implement API analytics and monitoring. What metrics would you track?

**Answer:**
**Key Metrics:**

1. **Performance Metrics:**
   - Response time (p50, p95, p99)
   - Throughput (requests per second)
   - Error rate
   - Availability (uptime %)

2. **Business Metrics:**
   - API usage by endpoint
   - User activity
   - Feature adoption
   - Revenue per API call

3. **Technical Metrics:**
   - CPU usage
   - Memory usage
   - Database query times
   - Cache hit rates
   - Queue depths

4. **Error Metrics:**
   - Error rate by type
   - 4xx vs 5xx errors
   - Failed requests
   - Timeout rate

5. **User Metrics:**
   - Active users
   - Requests per user
   - Geographic distribution
   - Client types (web, mobile, API)

**Implementation:**
```javascript
// Middleware to track metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.record({
      endpoint: req.path,
      method: req.method,
      statusCode: res.statusCode,
      duration,
      userId: req.user?.id
    });
  });
  
  next();
});
```

**Tools:**
- Prometheus + Grafana
- Datadog
- New Relic
- Custom dashboards

**Best Practices:**
- Track metrics at multiple levels
- Set up alerts for anomalies
- Monitor trends over time
- Correlate metrics
- Use percentiles (p95, p99)
</expand>

<expand title="Scenario: You need to support multiple API clients (web, mobile, third-party) with different requirements. How would you design the API?">
**Question:** You need to support multiple API clients (web, mobile, third-party) with different requirements. How would you design the API?

**Answer:**
**Design Considerations:**

1. **API Versioning:**
   ```
   /api/v1/users  (Web)
   /api/v2/users  (Mobile - optimized)
   /api/v1/users  (Third-party - stable)
   ```

2. **Different Response Formats:**
   ```javascript
   // Web - Full data
   GET /api/v1/users/123
   Response: { id, name, email, profile, settings, ... }
   
   // Mobile - Minimal data
   GET /api/v2/users/123?fields=id,name,avatar
   Response: { id, name, avatar }
   
   // Third-party - Standard format
   GET /api/v1/users/123
   Response: { ... } // Consistent format
   ```

3. **Rate Limiting:**
   - Web: 1000 requests/minute
   - Mobile: 500 requests/minute
   - Third-party: 100 requests/minute (tiered)

4. **Authentication:**
   - Web: Session-based or JWT
   - Mobile: JWT tokens
   - Third-party: API keys + OAuth

5. **API Gateway:**
   ```
   Client → API Gateway → Routes based on client type
                              ↓
                    Different rate limits, auth, formats
   ```

6. **Field Selection:**
   ```javascript
   // GraphQL or query parameters
   GET /api/users/123?fields=id,name,email
   GET /api/users/123?fields=id,name,profile.avatar
   ```

**Best Practices:**
- Use API gateway for routing
- Implement field selection
- Different rate limits per client
- Version APIs appropriately
- Document client-specific requirements
- Monitor usage per client type
</expand>

<expand title="Scenario: Your API needs to process payments. How would you ensure security and reliability?">
**Question:** Your API needs to process payments. How would you ensure security and reliability?

**Answer:**
**Security Measures:**

1. **PCI DSS Compliance:**
   - Never store credit card numbers
   - Use tokenization
   - Use payment processors (Stripe, PayPal)
   - **Example:** Store only payment tokens

2. **Encryption:**
   - HTTPS for all communication
   - Encrypt sensitive data at rest
   - Use TLS 1.2+
   - **Example:** Encrypt payment tokens in database

3. **Authentication:**
   - Strong authentication required
   - Multi-factor authentication
   - API keys for server-to-server
   - **Example:** Require 2FA for payment operations

4. **Idempotency:**
   ```javascript
   // Prevent duplicate charges
   POST /api/payments
   Headers: { "Idempotency-Key": "unique-key" }
   // Same key = same result
   ```

5. **Input Validation:**
   - Validate all payment data
   - Sanitize inputs
   - Check for fraud patterns
   - **Example:** Validate card numbers, amounts

6. **Audit Logging:**
   - Log all payment operations
   - Track who, what, when
   - Immutable logs
   - **Example:** Log every payment attempt

**Reliability:**

1. **Idempotent Operations:**
   - Same request = same result
   - Prevent duplicate charges
   - Use idempotency keys

2. **Transaction Management:**
   - Use database transactions
   - Rollback on failure
   - Ensure atomicity
   - **Example:** Update order + create payment in transaction

3. **Retry Logic:**
   - Retry failed payments
   - Exponential backoff
   - Maximum retry attempts
   - **Example:** Retry 3 times with delays

4. **Webhooks:**
   - Handle payment status updates
   - Verify webhook signatures
   - Idempotent webhook processing
   - **Example:** Stripe webhook for payment confirmation

**Best Practices:**
- Use payment processors (don't handle cards directly)
- Implement idempotency
- Use transactions
- Log everything
- Monitor for fraud
- Test failure scenarios
</expand>

<expand title="Scenario: You need to implement API rate limiting that works across multiple servers. How would you do it?">
**Question:** You need to implement API rate limiting that works across multiple servers. How would you do it?

**Answer:**
**Challenge:** Multiple servers need shared rate limit state.

**Solutions:**

1. **Redis-Based Rate Limiting:**
   ```javascript
   // Distributed rate limiting with Redis
   const key = `rate_limit:${userId}:${endpoint}`;
   const current = await redis.incr(key);
   
   if (current === 1) {
     await redis.expire(key, 60); // 60 second window
   }
   
   if (current > 100) {
     return { error: 'Rate limit exceeded' };
   }
   ```

2. **Token Bucket Algorithm:**
   ```javascript
   // More sophisticated algorithm
   const tokens = await redis.get(`tokens:${userId}`);
   if (tokens >= 1) {
     await redis.decr(`tokens:${userId}`);
     // Allow request
   } else {
     // Rate limited
   }
   
   // Refill tokens periodically
   setInterval(() => {
     await redis.incrby(`tokens:${userId}`, refillRate);
   }, refillInterval);
   ```

3. **Sliding Window:**
   ```javascript
   // More accurate, uses more memory
   const now = Date.now();
   const window = 60000; // 1 minute
   const key = `rate_limit:${userId}`;
   
   // Remove old entries
   await redis.zremrangebyscore(key, 0, now - window);
   
   // Count current requests
   const count = await redis.zcard(key);
   
   if (count < limit) {
     await redis.zadd(key, now, `${now}-${Math.random()}`);
     // Allow request
   } else {
     // Rate limited
   }
   ```

4. **API Gateway Rate Limiting:**
   - AWS API Gateway
   - Kong
   - Nginx
   - Handles distribution automatically

**Best Practices:**
- Use Redis for shared state
- Return 429 status code
- Include rate limit headers
- Different limits per user tier
- Handle Redis failures gracefully
- Monitor rate limit effectiveness
</expand>
