# System Design Interview Questions

## General Questions & Answers

<expand title="When would you choose horizontal scaling over vertical scaling?">
**Question:** When would you choose horizontal scaling over vertical scaling?

**Answer:**
**Choose Horizontal Scaling When:**

1. **High Availability Required:**
   - Need fault tolerance
   - Can't afford single point of failure
   - Multiple servers provide redundancy

2. **Unpredictable Traffic:**
   - Traffic spikes are common
   - Need to scale up/down quickly
   - Auto-scaling capabilities needed

3. **Cost Optimization:**
   - Commodity hardware is cheaper
   - Pay for what you use (cloud)
   - Better long-term cost efficiency

4. **Geographic Distribution:**
   - Need servers in multiple regions
   - Reduce latency for global users
   - Data residency requirements

5. **Stateless Applications:**
   - Application can run on any server
   - No shared state between servers
   - Easy to add/remove servers

**Choose Vertical Scaling When:**
- Small application with predictable load
- Quick temporary solution needed
- Application can't be distributed
- Simplicity is priority over scalability

**Best Practice:**
Design for horizontal scaling from the start. It's easier to scale horizontally than to refactor later.
</expand>

<expand title="How do you choose between different load balancing strategies?">
**Question:** How do you choose between different load balancing strategies?

**Answer:**
**Load Balancing Strategies:**

1. **Round Robin:**
   - **Use When:** Servers have similar capacity
   - **Pros:** Simple, fair distribution
   - **Cons:** Doesn't consider server load
   - **Example:** Static content serving

2. **Least Connections:**
   - **Use When:** Requests have varying processing times
   - **Pros:** Better load distribution
   - **Cons:** Need to track connections
   - **Example:** Long-lived connections, WebSocket servers

3. **Weighted Round Robin:**
   - **Use When:** Servers have different capacities
   - **Pros:** Utilizes powerful servers better
   - **Cons:** Need to configure weights
   - **Example:** Mixed hardware (some servers more powerful)

4. **IP Hash:**
   - **Use When:** Need session persistence
   - **Pros:** Same client to same server
   - **Cons:** Uneven distribution if IPs clustered
   - **Example:** Applications requiring sticky sessions

5. **Geographic:**
   - **Use When:** Global application
   - **Pros:** Reduces latency
   - **Cons:** More complex setup
   - **Example:** CDN, multi-region applications

**Decision Factors:**
- Server capacity (similar vs different)
- Connection type (short vs long-lived)
- Session requirements (stateless vs stateful)
- Geographic distribution needs
</expand>

<expand title="When would you use cache-aside vs write-through caching strategy?">
**Question:** When would you use cache-aside vs write-through caching strategy?

**Answer:**
**Cache-Aside (Lazy Loading):**

**Use When:**
- Read-heavy workloads
- Cache failures are acceptable (graceful degradation)
- Data doesn't change frequently
- Simple implementation needed

**How it works:**
1. Check cache
2. If miss, read from database
3. Store in cache for future reads

**Pros:**
- Simple to implement
- Cache failures don't break application
- Only cache what's accessed

**Cons:**
- Cache miss penalty (two round trips)
- Possible stale data
- Need cache invalidation strategy

**Write-Through:**

**Use When:**
- Write-heavy workloads
- Data consistency is critical
- Cache must always be up-to-date
- Can afford write latency

**How it works:**
1. Write to cache
2. Write to database
3. Return success

**Pros:**
- Cache always consistent
- No stale data
- Simple read path (always in cache)

**Cons:**
- Higher write latency
- Writes data that may never be read
- More complex failure handling

**Hybrid Approach:**
- Write-through for critical data
- Cache-aside for less critical data
- Best of both worlds
</expand>

## Scenario-Based Questions & Answers

<expand title="Scenario: Your system experiences a sudden 50x traffic spike. How do you handle it?">
**Question:** Your system experiences a sudden 50x traffic spike. How do you handle it?

**Answer:**
**Immediate Response:**

1. **Auto-Scaling:**
   - Trigger aggressive auto-scaling policies
   - Scale from 10 to 500+ servers if needed
   - Pre-configure scaling rules for emergencies
   - **Cloud:** AWS Auto Scaling, GCP Managed Instance Groups

2. **Load Shedding:**
   - Prioritize critical requests
   - Reject or queue non-critical requests
   - Return 503 for low-priority endpoints
   - **Example:** Reject analytics requests, prioritize user-facing APIs

3. **Caching:**
   - Aggressively cache all responses
   - Increase cache TTL temporarily
   - Use CDN for static content
   - Cache database queries

4. **Rate Limiting:**
   - Tighten rate limits
   - Protect backend services
   - Queue requests if possible
   - Different limits for different user tiers

5. **Database Protection:**
   - Route reads to replicas
   - Limit connection pool size
   - Disable expensive queries
   - Use read-only mode if writes aren't critical

**Architecture Patterns:**

1. **Circuit Breaker:**
   - Stop calling failing services
   - Return cached/default responses
   - Prevent cascading failures

2. **Bulkhead:**
   - Isolate resources
   - Failure in one area doesn't affect others
   - Separate thread pools, connections

3. **Throttling:**
   - Queue requests
   - Process at controlled rate
   - Use message queues for async processing

**Monitoring:**
- Real-time dashboards
- Alert on thresholds (CPU > 80%, error rate > 1%)
- Track response times
- Monitor queue depths

**Prevention:**
- Load testing to identify limits
- Capacity planning
- Auto-scaling policies
- Chaos engineering to test resilience
</expand>

<expand title="Scenario: When would you choose microservices over monolithic architecture for a new project?">
**Question:** When would you choose microservices over monolithic architecture for a new project?

**Answer:**
**Choose Microservices When:**

1. **Large, Distributed Team:**
   - Multiple teams (10+ developers)
   - Teams need independence
   - Different release cycles
   - **Example:** E-commerce with separate teams for payments, inventory, shipping

2. **Different Scaling Requirements:**
   - Some features need more resources
   - Independent scaling per service
   - **Example:** Video processing service needs more CPU than user service

3. **Technology Diversity:**
   - Different services need different tech stacks
   - **Example:** Python for ML, Node.js for APIs, Go for high-performance services

4. **Fault Isolation Critical:**
   - Failure in one area can't bring down entire system
   - **Example:** Payment service failure shouldn't affect product catalog

5. **Clear Bounded Contexts:**
   - Well-defined business domains
   - Independent business logic
   - **Example:** User management, order processing, notifications are separate domains

6. **Long-term Maintenance:**
   - Easier to maintain smaller codebases
   - Independent deployments
   - Technology upgrades per service

**Choose Monolithic When:**
- Small team (1-5 developers)
- Simple application
- Early stage (uncertain requirements)
- Tight coupling needed
- Single deployment is acceptable

**Decision Framework:**
- Team size and structure
- Application complexity
- Scaling requirements
- Operational capabilities
- Long-term vision

**Best Practice:**
Start with monolith, extract services when you have clear boundaries and need for separation.
</expand>

<expand title="Scenario: Design a system that can handle 10 million concurrent users. What are the key considerations?">
**Question:** Design a system that can handle 10 million concurrent users. What are the key considerations?

**Answer:**
**Key Considerations:**

1. **Stateless Architecture:**
   - No server-side sessions
   - Use JWT tokens or similar
   - Any server can handle any request
   - Enables horizontal scaling

2. **Load Balancing:**
   - Multiple load balancers (redundancy)
   - Distribute across thousands of servers
   - Health checks and auto-failover
   - Geographic distribution

3. **Caching Strategy:**
   - Multi-level caching (CDN, Redis, application)
   - Cache user sessions, frequently accessed data
   - Cache invalidation strategy
   - **Example:** Redis cluster with 100+ nodes

4. **Database:**
   - Sharding (by user ID, region)
   - Read replicas (100+ replicas)
   - Connection pooling
   - NoSQL for scalability (MongoDB, Cassandra)
   - **Example:** 1000 database shards

5. **Message Queue:**
   - Async processing for all non-critical operations
   - Kafka or similar for high throughput
   - Background workers
   - **Example:** 1000+ worker instances

6. **CDN:**
   - Serve static content from edge locations
   - Reduce origin server load
   - **Example:** CloudFront, Cloudflare

7. **Auto-Scaling:**
   - Auto-scale based on load
   - Scale from 1000 to 10000+ servers
   - Pre-warm instances if possible

**Architecture:**
```
CDN → Load Balancers (Global) → API Servers (10000+)
                                      ↓
                                Redis Cluster (100+ nodes)
                                      ↓
                                Database Shards (1000+)
                                      ↓
                                Message Queue → Workers (1000+)
```

**Capacity Planning:**
- Each server handles ~1000 concurrent connections
- Need ~10,000 servers (with redundancy)
- Database: 1000 shards, each handling 10K users
- Redis: 100 nodes for caching

**Key Principles:**
- Horizontal scalability
- Fault tolerance
- Geographic distribution
- Caching at every level
- Async processing
</expand>

<expand title="Scenario: When would you choose event-driven architecture over request-response?">
**Question:** When would you choose event-driven architecture over request-response?

**Answer:**
**Choose Event-Driven When:**

1. **Loose Coupling:**
   - Services shouldn't know about each other
   - **Example:** Order service publishes "OrderCreated" event, multiple services react (inventory, shipping, notifications)

2. **Async Processing:**
   - Operations don't need immediate response
   - **Example:** Image processing, email sending, analytics

3. **Multiple Consumers:**
   - Same event needed by multiple services
   - **Example:** User registration event → email service, analytics service, welcome service

4. **Traffic Spikes:**
   - Need to handle sudden load
   - Events can be queued and processed gradually
   - **Example:** Flash sale, viral content

5. **Event Sourcing:**
   - Need audit trail
   - Replay events for debugging
   - **Example:** Financial transactions, compliance requirements

6. **Real-time Updates:**
   - Multiple clients need real-time updates
   - **Example:** Live dashboard, notifications, chat

**Choose Request-Response When:**
- Immediate response needed
- Simple point-to-point communication
- Synchronous operations required
- Simple error handling

**Event-Driven Architecture:**
```
Service A → Event Bus (Kafka) → Service B
                              → Service C
                              → Service D
```

**Benefits:**
- Decoupling
- Scalability
- Resilience
- Flexibility

**Challenges:**
- Eventual consistency
- Complexity
- Debugging
- Event ordering
</expand>

<expand title="Scenario: How would you design a system to handle both read-heavy and write-heavy workloads?">
**Question:** How would you design a system to handle both read-heavy and write-heavy workloads?

**Answer:**
**CQRS (Command Query Responsibility Segregation) Pattern:**

**Separate Read and Write Models:**

1. **Write Model (Command Side):**
   - Optimized for writes
   - Normalized database
   - Handles business logic
   - **Example:** User registration, order creation

2. **Read Model (Query Side):**
   - Optimized for reads
   - Denormalized database
   - Materialized views
   - **Example:** User dashboard, reports

**Architecture:**
```
Write API → Write Database (Normalized)
              ↓ (Events)
          Event Bus
              ↓
          Read Database (Denormalized) ← Read API
```

**Implementation:**

1. **Write Path:**
   - Write to normalized database
   - Publish events
   - Return success

2. **Read Path:**
   - Read from denormalized database
   - Fast queries (no joins needed)
   - Optimized indexes

3. **Sync:**
   - Event handlers update read model
   - Async process
   - Eventual consistency acceptable

**Benefits:**
- Optimize each model independently
- Scale reads and writes separately
- Better performance for both operations

**Use Cases:**
- E-commerce (writes: orders, reads: product catalog)
- Social media (writes: posts, reads: feeds)
- Analytics (writes: events, reads: dashboards)

**Trade-offs:**
- Eventual consistency
- More complexity
- Need to handle sync failures
</expand>

<expand title="Scenario: Design a URL shortener like bit.ly. How would you architect it?">
**Question:** Design a URL shortener like bit.ly. How would you architect it?

**Answer:**
**Requirements:**
- Shorten long URLs
- Redirect to original URL
- Handle high traffic (100M URLs/day)
- 7-character short codes
- Analytics (click tracking)

**System Design:**

1. **API Design:**
   ```
   POST /api/v1/shorten
   Body: { "url": "https://example.com/very/long/url" }
   Response: { "shortUrl": "https://short.ly/abc1234" }
   
   GET /abc1234
   Response: 302 Redirect to original URL
   ```

2. **Database Schema:**
   ```sql
   CREATE TABLE short_urls (
     id BIGINT PRIMARY KEY AUTO_INCREMENT,
     short_code VARCHAR(7) UNIQUE NOT NULL,
     original_url TEXT NOT NULL,
     created_at TIMESTAMP,
     expires_at TIMESTAMP,
     click_count INT DEFAULT 0,
     INDEX idx_short_code (short_code)
   );
   ```

3. **Short Code Generation:**
   - **Option 1:** Base62 encoding of auto-increment ID
   - **Option 2:** Random 7-character string (check uniqueness)
   - **Option 3:** Pre-generate codes in batches

4. **Architecture:**
   ```
   Load Balancer
        ↓
   API Servers (Stateless)
        ↓
   Cache (Redis) → Database (MySQL/PostgreSQL)
        ↓
   Analytics Service (Click Tracking)
   ```

5. **Caching Strategy:**
   - Cache short_code → original_url mapping
   - TTL: 24 hours (or based on expiration)
   - Cache frequently accessed URLs

6. **Scaling Considerations:**
   - **Database Sharding:** Shard by short_code hash
   - **Read Replicas:** For analytics queries
   - **CDN:** For static assets
   - **Message Queue:** For async analytics processing

7. **Analytics:**
   - Track clicks, referrers, geolocation
   - Use separate analytics database
   - Process asynchronously

**Capacity Estimation:**
- 100M URLs/day = ~1,200 URLs/second
- 7 characters = 62^7 = 3.5 trillion possible codes
- Storage: ~500 bytes per URL = 50GB for 100M URLs

**Optimizations:**
- Use CDN for redirects
- Cache hot URLs
- Batch database writes
- Use connection pooling
</expand>

<expand title="Scenario: How would you design a distributed cache system that handles failures gracefully?">
**Question:** How would you design a distributed cache system that handles failures gracefully?

**Answer:**
**Requirements:**
- High availability
- Low latency
- Fault tolerance
- Data consistency

**Design Components:**

1. **Cache Cluster:**
   - Multiple cache nodes (Redis Cluster)
   - Distributed across data centers
   - Replication (master-replica)
   - **Example:** 6 nodes (3 masters, 3 replicas)

2. **Consistent Hashing:**
   - Distribute keys across nodes
   - Minimal rehashing when nodes fail
   - Virtual nodes for better distribution
   - **Benefit:** Only remap keys from failed node

3. **Replication:**
   - Each master has 1-2 replicas
   - Automatic failover
   - Read from replicas if master fails
   - **Example:** Redis Sentinel for failover

4. **Failure Handling:**

   **Cache Miss (Node Down):**
   ```javascript
   try {
     const data = await redis.get(key);
     if (data) return data;
   } catch (error) {
     // Node is down, fallback to database
     return await db.query(...);
   }
   ```

   **Circuit Breaker:**
   - Stop calling failing nodes
   - Fallback to database
   - Retry after timeout

5. **Data Consistency:**
   - Accept eventual consistency
   - Use TTL for expiration
   - Cache versioning for invalidation

6. **Monitoring:**
   - Node health checks
   - Cache hit/miss rates
   - Latency metrics
   - Automatic alerts

**Architecture:**
```
Application
    ↓
Cache Client (with consistent hashing)
    ↓
Cache Cluster
    ├── Node 1 (Master) + Replica
    ├── Node 2 (Master) + Replica
    └── Node 3 (Master) + Replica
```

**Best Practices:**
- Set appropriate TTL
- Handle cache failures gracefully
- Use connection pooling
- Implement retry logic
- Monitor node health
</expand>
