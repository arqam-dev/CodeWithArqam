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

<expand title="What is the CAP theorem and how does it apply to distributed systems?">
**Question:** What is the CAP theorem and how does it apply to distributed systems?

**Answer:**
**CAP Theorem:** In a distributed system, you can guarantee at most 2 of 3 properties:

1. **Consistency:** All nodes see same data simultaneously
2. **Availability:** System remains operational
3. **Partition Tolerance:** System continues despite network failures

**Trade-offs:**

- **CP (Consistency + Partition Tolerance):**
  - Sacrifice availability
  - **Example:** Distributed databases (MongoDB, HBase)
  - System may reject requests during partition

- **AP (Availability + Partition Tolerance):**
  - Sacrifice consistency
  - **Example:** DNS, Cassandra
  - System remains available but may return stale data

- **CA (Consistency + Availability):**
  - Sacrifice partition tolerance
  - **Example:** Single-node databases
  - Not practical for distributed systems

**Real-world:**
- Most systems choose AP or CP
- Network partitions are inevitable
- Eventual consistency is often acceptable

**Best Practice:**
Choose based on use case. Most modern systems prioritize AP (availability + partition tolerance) with eventual consistency.
</expand>

<expand title="What is the difference between sharding and replication?">
**Question:** What is the difference between sharding and replication?

**Answer:**
**Sharding:**
- Split data across multiple databases
- Each shard has different data
- **Purpose:** Distribute load, scale horizontally
- **Example:** User data split by user ID

**Replication:**
- Copy data to multiple databases
- Each replica has same data
- **Purpose:** High availability, read scaling
- **Example:** Master-replica setup

**Comparison:**

**Sharding:**
- **Data:** Different data across shards
- **Purpose:** Scale writes, distribute load
- **Complexity:** High
- **Use Case:** Large datasets, need to scale writes

**Replication:**
- **Data:** Same data across replicas
- **Purpose:** Scale reads, high availability
- **Complexity:** Medium
- **Use Case:** Read-heavy workloads, need redundancy

**When to Use:**
- **Sharding:** Large dataset, need to scale writes
- **Replication:** Need high availability, read scaling

**Best Practice:**
Often use both - shard for distribution, replicate each shard for availability.
</expand>

<expand title="What is consistent hashing and why is it important?">
**Question:** What is consistent hashing and why is it important?

**Answer:**
**Consistent Hashing:** Distributes data across nodes in a way that minimizes rehashing when nodes are added/removed.

**Problem with Regular Hashing:**
- Adding/removing nodes requires rehashing all data
- **Example:** 10 nodes → 11 nodes = rehash everything

**Solution:**
- Hash both nodes and keys to same space
- Map keys to nearest node
- Only remap keys from affected nodes

**Benefits:**
- Minimal data movement when nodes change
- Better load distribution
- Handles node failures gracefully

**Use Cases:**
- Distributed caches (Redis Cluster)
- Load balancing
- CDN content distribution
- Database sharding

**Example:**
```
Hash ring: 0 --- 100 --- 200 --- 300 --- 0
Nodes:     A     B       C       A
Keys:     50→A, 150→B, 250→C
```

**Best Practice:**
Use consistent hashing for distributed systems to minimize data movement during scaling.
</expand>

<expand title="What is the difference between message queues and event streaming?">
**Question:** What is the difference between message queues and event streaming?

**Answer:**
**Message Queues (RabbitMQ, SQS):**
- Point-to-point messaging
- Message consumed by one consumer
- Removed after consumption
- **Use Case:** Task processing, job queues

**Event Streaming (Kafka, Kinesis):**
- Publish-subscribe model
- Multiple consumers can read
- Events persist (configurable retention)
- **Use Case:** Event sourcing, analytics, audit logs

**Comparison:**

| Feature | Message Queue | Event Streaming |
|---------|---------------|-----------------|
| Consumers | One per message | Multiple |
| Persistence | Temporary | Configurable |
| Replay | No | Yes |
| Ordering | Per queue | Per partition |

**When to Use:**
- **Message Queue:** Task processing, one consumer per message
- **Event Streaming:** Multiple consumers, event replay, audit trails

**Best Practice:**
Use message queues for task processing, event streaming for event-driven architectures.
</expand>

<expand title="What is the difference between SQL and NoSQL databases?">
**Question:** What is the difference between SQL and NoSQL databases?

**Answer:**
**SQL (Relational):**
- Structured schema
- ACID transactions
- Relationships (joins)
- **Examples:** MySQL, PostgreSQL

**NoSQL:**
- Flexible schema
- Eventual consistency
- No joins
- **Examples:** MongoDB, Cassandra, Redis

**Types of NoSQL:**
- **Document:** MongoDB (JSON-like)
- **Key-Value:** Redis, DynamoDB
- **Column:** Cassandra
- **Graph:** Neo4j

**When to Use SQL:**
- Complex queries
- ACID required
- Structured data
- Relationships important

**When to Use NoSQL:**
- High write throughput
- Flexible schema
- Horizontal scaling
- Simple queries

**Best Practice:**
Many systems use both - SQL for transactional data, NoSQL for specific use cases.
</expand>

<expand title="What is the difference between horizontal and vertical partitioning?">
**Question:** What is the difference between horizontal and vertical partitioning?

**Answer:**
**Horizontal Partitioning (Sharding):**
- Split rows across tables
- Same schema, different data
- **Example:** Users 1-1M in shard 1, 1M-2M in shard 2

**Vertical Partitioning:**
- Split columns across tables
- Different schema, same rows
- **Example:** User basic info in one table, profile in another

**Comparison:**

| Feature | Horizontal | Vertical |
|---------|------------|----------|
| Split By | Rows | Columns |
| Schema | Same | Different |
| Use Case | Scale writes | Optimize reads |

**When to Use:**
- **Horizontal:** Large dataset, scale writes
- **Vertical:** Optimize reads, separate hot/cold data

**Best Practice:**
Use horizontal partitioning for scaling, vertical for optimization.
</expand>

<expand title="What is the difference between synchronous and asynchronous replication?">
**Question:** What is the difference between synchronous and asynchronous replication?

**Answer:**
**Synchronous Replication:**
- Write waits for all replicas
- Strong consistency
- Higher latency
- **Use Case:** Critical data, financial systems

**Asynchronous Replication:**
- Write doesn't wait for replicas
- Eventual consistency
- Lower latency
- **Use Case:** Most applications, read scaling

**Comparison:**

| Feature | Synchronous | Asynchronous |
|---------|-------------|--------------|
| Consistency | Strong | Eventual |
| Latency | High | Low |
| Risk | Data loss if master fails | Stale reads |

**When to Use:**
- **Synchronous:** Critical data, can't lose writes
- **Asynchronous:** Performance important, eventual consistency OK

**Best Practice:**
Use asynchronous for most cases, synchronous only for critical data.
</expand>

<expand title="What is the difference between blue-green and canary deployments?">
**Question:** What is the difference between blue-green and canary deployments?

**Answer:**
**Blue-Green Deployment:**
- Two identical environments
- Switch traffic instantly
- **Benefit:** Fast rollback
- **Drawback:** Requires double resources

**Canary Deployment:**
- Gradual rollout
- Small percentage first
- **Benefit:** Lower risk
- **Drawback:** Slower rollout

**Comparison:**

| Feature | Blue-Green | Canary |
|---------|------------|--------|
| Rollout | Instant | Gradual |
| Risk | Low | Very Low |
| Resources | 2x | 1x + small |

**When to Use:**
- **Blue-Green:** Fast rollback needed, can afford resources
- **Canary:** Lower risk, gradual validation

**Best Practice:**
Use canary for production, blue-green for staging/testing.
</expand>

<expand title="How would you manage deployments and rollbacks to reduce downtime?">
**Question:** How would you manage deployments and rollbacks to reduce downtime?

**Answer:**
**Deployment Strategies:**

1. **Blue-Green Deployment:**
   - Two identical environments (blue and green)
   - Deploy new version to inactive environment
   - Switch traffic instantly
   - **Benefit:** Zero downtime, instant rollback
   - **Example:** AWS Elastic Beanstalk, Kubernetes

2. **Canary Deployment:**
   - Deploy to small percentage of traffic first
   - Gradually increase to 100%
   - Monitor for issues
   - **Benefit:** Low risk, catch issues early
   - **Example:** 5% → 25% → 50% → 100%

3. **Rolling Deployment:**
   - Update instances one by one
   - Keep old version running
   - **Benefit:** No downtime, gradual update
   - **Example:** Kubernetes rolling update

**Rollback Strategies:**

1. **Instant Rollback:**
   ```yaml
   # Blue-Green: Switch traffic back
   # Canary: Route traffic away from new version
   ```
   - Switch traffic to previous version
   - **Time:** Seconds to minutes

2. **Database Rollback:**
   - Use database migrations that are reversible
   - Keep old schema during transition
   - **Example:** Additive changes first, remove later

3. **Feature Flags:**
   ```javascript
   if (featureFlag.isEnabled('new-feature')) {
     // New code
   } else {
     // Old code
   }
   ```
   - Toggle features without deployment
   - Instant rollback
   - **Example:** LaunchDarkly, custom flags

**Best Practices:**

1. **Database Migrations:**
   - Backward compatible changes
   - Additive changes first
   - **Example:** Add new column as nullable, populate later

2. **Health Checks:**
   - Verify new version is healthy before routing traffic
   - Automatic rollback on health check failure
   - **Example:** Kubernetes readiness probes

3. **Monitoring:**
   - Monitor error rates, latency
   - Set up alerts
   - Automatic rollback on anomalies
   - **Example:** Error rate > 1% triggers rollback

4. **Testing:**
   - Test in staging first
   - Smoke tests after deployment
   - **Example:** Run test suite in production-like environment

5. **Documentation:**
   - Document rollback procedures
   - Runbooks for common issues
   - **Example:** Step-by-step rollback guide

**Tools:**
- Kubernetes (rolling updates, blue-green)
- AWS CodeDeploy (blue-green, canary)
- Spinnaker (advanced deployment strategies)
- Feature flags (LaunchDarkly, Unleash)
</expand>

<expand title="What is the difference between stateful and stateless services?">
**Question:** What is the difference between stateful and stateless services?

**Answer:**
**Stateless:**
- No server-side state
- Each request independent
- Scalable horizontally
- **Example:** REST APIs with JWT

**Stateful:**
- Server maintains state
- Requests depend on previous
- Requires sticky sessions
- **Example:** Session-based auth

**Comparison:**

**Stateless Services:**
- **Scaling:** Easy horizontal scaling
- **Session:** Client-side (JWT tokens)
- **Load Balancing:** Any server can handle any request

**Stateful Services:**
- **Scaling:** Hard to scale (requires sticky sessions)
- **Session:** Server-side session storage
- **Load Balancing:** Requires sticky sessions (same client to same server)

**When to Use:**
- **Stateless:** Modern APIs, microservices
- **Stateful:** Traditional apps, complex sessions

**Best Practice:**
Design stateless services for better scalability.
</expand>

<expand title="What is the difference between eventual and strong consistency?">
**Question:** What is the difference between eventual and strong consistency?

**Answer:**
**Strong Consistency:**
- All nodes see same data immediately
- ACID transactions
- **Use Case:** Financial data, critical operations

**Eventual Consistency:**
- Nodes will converge to same state
- May have temporary inconsistencies
- **Use Case:** Most distributed systems

**Comparison:**

| Feature | Strong | Eventual |
|---------|--------|----------|
| Consistency | Immediate | Eventually |
| Performance | Slower | Faster |
| Availability | Lower | Higher |

**When to Use:**
- **Strong:** Critical data, can't have inconsistencies
- **Eventual:** Performance important, temporary inconsistency OK

**Best Practice:**
Use eventual consistency for most cases, strong only when necessary.
</expand>

<expand title="What is the difference between read and write replicas?">
**Question:** What is the difference between read and write replicas?

**Answer:**
**Write Replica (Master/Primary):**
- Handles all writes
- Single source of truth
- **Use Case:** Write operations

**Read Replica (Slave/Secondary):**
- Handles reads only
- Syncs from master
- **Use Case:** Read scaling

**Architecture:**
```
Master (Writes) → Replicas (Reads)
```

**Benefits:**
- Scale reads independently
- Reduce load on master
- Geographic distribution

**Considerations:**
- Replication lag
- Eventual consistency
- Route critical reads to master

**Best Practice:**
Use read replicas for read-heavy workloads, keep writes on master.
</expand>

<expand title="What is the difference between polling and push notifications?">
**Question:** What is the difference between polling and push notifications?

**Answer:**
**Polling:**
- Client requests updates periodically
- Simple to implement
- Higher latency
- **Use Case:** Simple updates

**Push (WebSockets, SSE):**
- Server sends updates immediately
- Lower latency
- More complex
- **Use Case:** Real-time updates

**Comparison:**

| Feature | Polling | Push |
|---------|---------|------|
| Latency | High | Low |
| Complexity | Low | High |
| Server Load | High | Low |

**When to Use:**
- **Polling:** Simple, infrequent updates
- **Push:** Real-time, frequent updates

**Best Practice:**
Use push for real-time, polling for simple cases.
</expand>

## Scenario-Based Questions & Answers

<expand title="How would you respond to a sudden spike in traffic causing performance degradation?">
**Question:** How would you respond to a sudden spike in traffic causing performance degradation?

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

<expand title="Scenario: You need to design a system that processes millions of images per day. How would you architect it?">
**Question:** You need to design a system that processes millions of images per day. How would you architect it?

**Answer:**
**Architecture:**

1. **Upload Service:**
   - Accept image uploads
   - Validate and store
   - Return job ID
   - **Storage:** Object storage (S3)

2. **Message Queue:**
   - Queue processing jobs
   - Handle spikes
   - **Example:** Kafka, RabbitMQ

3. **Processing Workers:**
   - Scale horizontally
   - Process images (resize, compress, format conversion)
   - **Example:** Kubernetes workers

4. **Storage:**
   - Original images: S3
   - Processed images: S3 with CDN
   - Metadata: Database

5. **CDN:**
   - Serve processed images
   - Reduce origin load
   - **Example:** CloudFront, Cloudflare

**Flow:**
```
Upload → Queue → Workers → Process → Store → CDN
```

**Optimizations:**
- Parallel processing
- Different sizes/formats
- Lazy processing
- Caching processed images

**Capacity:**
- 1M images/day = ~12 images/second
- Scale workers based on queue depth
- Use auto-scaling
</expand>

<expand title="Scenario: You need to design a recommendation system. How would you approach it?">
**Question:** You need to design a recommendation system. How would you approach it?

**Answer:**
**Approaches:**

1. **Collaborative Filtering:**
   - User-based: Similar users like similar items
   - Item-based: Similar items liked by same users
   - **Use Case:** E-commerce, content platforms

2. **Content-Based:**
   - Recommend based on item features
   - User preferences
   - **Use Case:** News, articles

3. **Hybrid:**
   - Combine multiple approaches
   - Better accuracy
   - **Use Case:** Most production systems

**Architecture:**

1. **Data Collection:**
   - User behavior (clicks, views, purchases)
   - Item features
   - User preferences

2. **Feature Store:**
   - Store user/item features
   - **Example:** Redis, Feature store

3. **ML Models:**
   - Train recommendation models
   - **Example:** TensorFlow, PyTorch

4. **Recommendation Service:**
   - Generate recommendations
   - Cache popular recommendations
   - **Example:** Real-time API

5. **A/B Testing:**
   - Test different algorithms
   - Measure effectiveness

**Implementation:**
- Batch processing for training
- Real-time for serving
- Cache popular recommendations
- Update models regularly

**Best Practices:**
- Use hybrid approach
- Cache recommendations
- A/B test algorithms
- Monitor performance
</expand>

<expand title="Scenario: You need to design a system that handles time-series data. What would you consider?">
**Question:** You need to design a system that handles time-series data. What would you consider?

**Answer:**
**Considerations:**

1. **Database Choice:**
   - Time-series databases (InfluxDB, TimescaleDB)
   - Optimized for time-based queries
   - **Example:** Metrics, IoT data

2. **Data Model:**
   - Timestamp as primary key
   - Tags for filtering
   - Values for metrics
   - **Example:** (timestamp, device_id, temperature)

3. **Retention:**
   - Keep recent data hot
   - Archive old data
   - **Example:** 30 days hot, 1 year warm, older cold

4. **Compression:**
   - Compress old data
   - Reduce storage
   - **Example:** Downsample hourly → daily

5. **Query Patterns:**
   - Time-range queries
   - Aggregations (avg, sum, max)
   - **Example:** "Temperature last 24 hours"

**Architecture:**
```
Data Sources → Ingest → Time-Series DB → Query API
                              ↓
                         Archive (old data)
```

**Best Practices:**
- Use time-series database
- Implement retention policies
- Compress old data
- Optimize for time-range queries
- Archive to cold storage
</expand>

<expand title="Scenario: You need to design a system for handling financial transactions. What are the key requirements?">
**Question:** You need to design a system for handling financial transactions. What are the key requirements?

**Answer:**
**Key Requirements:**

1. **ACID Compliance:**
   - Atomicity: All or nothing
   - Consistency: Valid state
   - Isolation: Concurrent transactions
   - Durability: Committed = permanent

2. **Idempotency:**
   - Prevent duplicate transactions
   - Use idempotency keys
   - **Example:** Same request = same result

3. **Audit Trail:**
   - Log all transactions
   - Immutable logs
   - **Example:** Who, what, when, why

4. **Security:**
   - Encrypt sensitive data
   - Strong authentication
   - Authorization checks
   - **Example:** PCI DSS compliance

5. **Reliability:**
   - High availability
   - Backup and recovery
   - **Example:** 99.99% uptime

6. **Monitoring:**
   - Real-time monitoring
   - Fraud detection
   - **Example:** Anomaly detection

**Architecture:**
```
API → Validation → Transaction Service → Database
                      ↓
                 Audit Log
                      ↓
                 Fraud Detection
```

**Best Practices:**
- Use ACID transactions
- Implement idempotency
- Maintain audit trail
- Encrypt sensitive data
- Monitor for fraud
- Test failure scenarios
</expand>

<expand title="Scenario: You need to design a system that handles geolocation data. How would you approach it?">
**Question:** You need to design a system that handles geolocation data. How would you approach it?

**Answer:**
**Considerations:**

1. **Data Storage:**
   - Geospatial databases (PostGIS, MongoDB)
   - Support spatial queries
   - **Example:** "Find restaurants within 5km"

2. **Indexing:**
   - Spatial indexes (R-tree, Geohash)
   - Fast location queries
   - **Example:** Geohash for proximity search

3. **Query Types:**
   - Proximity search
   - Within radius
   - Route calculation
   - **Example:** "Nearby users", "Distance"

4. **Real-time Updates:**
   - Track moving objects
   - Update locations
   - **Example:** Delivery tracking

5. **Caching:**
   - Cache popular locations
   - Reduce database load
   - **Example:** Redis for hot locations

**Architecture:**
```
Location Updates → Geospatial DB → Query API
                         ↓
                    Spatial Index
                         ↓
                    Cache (hot locations)
```

**Best Practices:**
- Use geospatial database
- Implement spatial indexes
- Cache popular queries
- Handle real-time updates
- Optimize for proximity searches
</expand>

<expand title="Scenario: You need to design a system for handling video streaming. What are the key components?">
**Question:** You need to design a system for handling video streaming. What are the key components?

**Answer:**
**Key Components:**

1. **Video Storage:**
   - Object storage (S3, GCS)
   - Multiple quality levels
   - **Example:** 1080p, 720p, 480p

2. **CDN:**
   - Distribute video globally
   - Reduce latency
   - **Example:** CloudFront, Cloudflare

3. **Transcoding:**
   - Convert to multiple formats
   - Different bitrates
   - **Example:** HLS, DASH

4. **Streaming Protocol:**
   - Adaptive bitrate streaming
   - **Example:** HLS, DASH

5. **Player:**
   - Client-side player
   - Adaptive quality
   - **Example:** Video.js, HLS.js

**Architecture:**
```
Upload → Transcode → Store → CDN → Player
```

**Optimizations:**
- Multiple quality levels
- Adaptive bitrate
- CDN distribution
- Caching popular videos

**Best Practices:**
- Use CDN for distribution
- Implement adaptive bitrate
- Cache popular content
- Optimize for mobile
</expand>

<expand title="Scenario: You need to design a system that handles real-time analytics. How would you architect it?">
**Question:** You need to design a system that handles real-time analytics. How would you architect it?

**Answer:**
**Architecture:**

1. **Event Collection:**
   - Collect events from sources
   - **Example:** User actions, system events

2. **Stream Processing:**
   - Process events in real-time
   - **Example:** Kafka Streams, Flink

3. **Aggregation:**
   - Aggregate metrics
   - **Example:** Counts, sums, averages

4. **Storage:**
   - Time-series database
   - **Example:** InfluxDB, TimescaleDB

5. **Dashboard:**
   - Real-time visualization
   - **Example:** Grafana, custom dashboards

**Flow:**
```
Events → Kafka → Stream Processor → Time-Series DB → Dashboard
```

**Technologies:**
- Kafka for event streaming
- Flink/Spark for processing
- InfluxDB for storage
- Grafana for visualization

**Best Practices:**
- Use stream processing
- Store in time-series DB
- Cache aggregations
- Update dashboards in real-time
</expand>

<expand title="Scenario: You need to design a system for handling user sessions across multiple servers. How would you do it?">
**Question:** You need to design a system for handling user sessions across multiple servers. How would you do it?

**Answer:**
**Options:**

1. **Shared Session Store:**
   ```
   Servers → Redis/Memcached → Sessions
   ```
   - Centralized storage
   - All servers access same store
   - **Example:** Redis cluster

2. **Database Sessions:**
   - Store in database
   - Slower but persistent
   - **Example:** PostgreSQL, MySQL

3. **Stateless (JWT):**
   - Token contains session data
   - No server storage
   - **Example:** JWT tokens

**Recommended: Redis**
```javascript
// Store session
await redis.setex(`session:${sessionId}`, 3600, JSON.stringify(sessionData));

// Retrieve session
const session = await redis.get(`session:${sessionId}`);
```

**Benefits:**
- Fast access
- Shared across servers
- TTL support
- Scalable

**Best Practices:**
- Use Redis for sessions
- Set appropriate TTL
- Handle Redis failures
- Use session clustering
</expand>

<expand title="How would you set up automation using serverless services?">
**Question:** How would you set up automation using serverless services?

**Answer:**
**Serverless Automation Use Cases:**

1. **Scheduled Tasks (Cron Jobs):**
   ```yaml
   # AWS Lambda with EventBridge
   Schedule: rate(1 hour)
   # Or cron(0 12 * * ? *)
   ```
   - Run periodic tasks
   - **Example:** Daily reports, data cleanup, backups
   - **Services:** AWS Lambda + EventBridge, Google Cloud Functions + Cloud Scheduler

2. **Event-Driven Automation:**
   ```javascript
   // Trigger on S3 upload
   exports.handler = async (event) => {
     const file = event.Records[0].s3.object.key;
     // Process file automatically
   };
   ```
   - React to events automatically
   - **Example:** Process uploaded files, send notifications
   - **Services:** AWS Lambda, Azure Functions, Google Cloud Functions

3. **API Automation:**
   - Serverless API endpoints
   - Auto-scaling
   - **Example:** REST APIs, webhooks
   - **Services:** AWS API Gateway + Lambda, Azure Functions

4. **Data Processing:**
   ```javascript
   // Process messages from queue
   exports.handler = async (event) => {
     for (const record of event.Records) {
       await processMessage(record.body);
     }
   };
   ```
   - Process data from queues/streams
   - **Example:** Process images, transform data
   - **Services:** AWS Lambda + SQS/Kinesis, Google Cloud Functions + Pub/Sub

5. **Infrastructure Automation:**
   - Auto-scaling policies
   - Resource provisioning
   - **Example:** Auto-create resources, cleanup unused resources
   - **Services:** AWS Lambda + CloudFormation, Terraform Cloud

**Architecture Patterns:**

1. **Event-Driven Architecture:**
   ```
   Event Source → Serverless Function → Action
   (S3, SQS, API)    (Lambda)         (Process, Store, Notify)
   ```

2. **Workflow Automation:**
   ```
   Step Functions / Workflows
   → Orchestrate multiple serverless functions
   → Handle retries, error handling
   ```

3. **Serverless Pipeline:**
   ```
   Source → Trigger → Process → Store → Notify
   (S3)    (Lambda)  (Lambda)  (S3/DB) (SNS/SES)
   ```

**Best Practices:**

1. **Error Handling:**
   - Retry with exponential backoff
   - Dead letter queues
   - **Example:** Failed messages go to DLQ for manual review

2. **Monitoring:**
   - CloudWatch, Azure Monitor
   - Log all executions
   - Set up alerts
   - **Example:** Alert on function failures

3. **Cost Optimization:**
   - Right-size memory allocation
   - Optimize execution time
   - Use provisioned concurrency for critical functions
   - **Example:** 128MB vs 512MB memory (cost difference)

4. **Security:**
   - Least privilege IAM roles
   - Encrypt environment variables
   - Use VPC for database access
   - **Example:** Lambda only has access to required resources

5. **Testing:**
   - Test locally (SAM, Serverless Framework)
   - Integration tests
   - **Example:** Test Lambda functions before deployment

**Tools:**
- AWS Lambda + EventBridge/SQS/SNS
- Azure Functions + Event Grid
- Google Cloud Functions + Cloud Scheduler
- Serverless Framework (multi-cloud)
- AWS Step Functions (workflows)
</expand>

<expand title="How would you plan for future scalability while controlling costs?">
**Question:** How would you plan for future scalability while controlling costs?

**Answer:**
**Cost-Effective Scalability Strategies:**

1. **Right-Sizing:**
   - Start with smaller instances
   - Monitor and adjust
   - **Example:** t3.small → t3.medium based on metrics
   - **Impact:** 30-50% cost savings

2. **Auto-Scaling:**
   ```yaml
   # Scale based on demand
   Min: 2 instances
   Max: 20 instances
   Target: 70% CPU
   ```
   - Scale up during peak, down during off-peak
   - **Example:** 2 instances at night, 10 during day
   - **Impact:** Pay only for what you use

3. **Reserved Instances / Savings Plans:**
   - Commit to 1-3 years for discount
   - **Example:** 40-60% discount for reserved instances
   - **Use Case:** Predictable baseline load

4. **Spot Instances:**
   - Use for non-critical workloads
   - **Example:** 70-90% discount
   - **Use Case:** Batch processing, dev/test

5. **Serverless:**
   - Pay per execution
   - No idle costs
   - **Example:** Lambda, Fargate
   - **Use Case:** Sporadic workloads

**Architecture Optimizations:**

1. **Caching:**
   - Reduce database load
   - Lower compute needs
   - **Example:** Redis cache → 80% cache hit rate → fewer DB queries
   - **Impact:** 50-70% cost reduction

2. **CDN:**
   - Offload static content
   - Reduce origin server load
   - **Example:** CloudFront, Cloudflare
   - **Impact:** 60-80% bandwidth cost reduction

3. **Database Optimization:**
   - Read replicas for scaling reads
   - Connection pooling
   - Query optimization
   - **Example:** 1 write DB + 3 read replicas vs 4 write DBs
   - **Impact:** 50% cost reduction

4. **Async Processing:**
   - Use message queues
   - Process during off-peak
   - **Example:** Queue heavy operations, process at night
   - **Impact:** Lower peak load = smaller instances

5. **Data Archiving:**
   - Move old data to cold storage
   - **Example:** S3 Glacier, Azure Archive
   - **Impact:** 80-90% storage cost reduction

**Cost Monitoring:**

1. **Cost Allocation Tags:**
   - Tag resources by team/project
   - Track costs per service
   - **Example:** Tag: Environment=prod, Team=backend

2. **Cost Alerts:**
   - Set budget alerts
   - Monitor spending trends
   - **Example:** Alert at 80% of monthly budget

3. **Cost Analysis:**
   - Identify expensive services
   - Optimize high-cost areas
   - **Example:** Database = 40% of costs → optimize queries

**Planning for Growth:**

1. **Horizontal Scaling:**
   - Design for horizontal scaling
   - Add more instances, not bigger ones
   - **Example:** 10 small instances vs 2 large instances

2. **Stateless Design:**
   - Any server can handle any request
   - Easy to scale
   - **Example:** No server-side sessions

3. **Microservices:**
   - Scale services independently
   - **Example:** Scale payment service during peak, not user service
   - **Impact:** Scale only what's needed

4. **Load Testing:**
   - Identify bottlenecks early
   - Plan capacity
   - **Example:** Load test to find breaking point

**Best Practices:**
- Start small, scale as needed
- Use auto-scaling
- Monitor costs continuously
- Optimize before scaling
- Use reserved instances for baseline
- Use spot instances for non-critical
- Cache aggressively
- Archive old data
- Right-size continuously
</expand>
