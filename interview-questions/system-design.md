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

**Message Queue:**
- **Consumers:** One per message
- **Persistence:** Temporary
- **Replay:** No
- **Ordering:** Per queue

**Event Streaming:**
- **Consumers:** Multiple consumers can read
- **Persistence:** Configurable retention
- **Replay:** Yes, can replay events
- **Ordering:** Per partition

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

**Horizontal Partitioning:**
- **Split By:** Rows
- **Schema:** Same schema across partitions
- **Use Case:** Scale writes, large datasets

**Vertical Partitioning:**
- **Split By:** Columns
- **Schema:** Different schema per partition
- **Use Case:** Optimize reads, separate hot/cold data

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

**Synchronous Replication:**
- **Consistency:** Strong consistency
- **Latency:** High latency
- **Risk:** Data loss if master fails before replication completes

**Asynchronous Replication:**
- **Consistency:** Eventual consistency
- **Latency:** Low latency
- **Risk:** Stale reads possible, but better performance

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

**Blue-Green Deployment:**
- **Rollout:** Instant switch
- **Risk:** Low risk
- **Resources:** Requires 2x resources (both environments running)

**Canary Deployment:**
- **Rollout:** Gradual rollout (small percentage first)
- **Risk:** Very low risk
- **Resources:** 1x + small (only small portion of new version)

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
  - **Sticky Sessions:** All requests from the same user are routed to the same server instance during a session. This ensures session data stored on that server remains accessible for subsequent requests from that user.

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

**Strong Consistency:**
- **Consistency:** Immediate consistency across all nodes
- **Performance:** Slower (waits for all nodes)
- **Availability:** Lower availability (may reject requests during partition)

**Eventual Consistency:**
- **Consistency:** Eventually consistent (nodes converge over time)
- **Performance:** Faster (doesn't wait for all nodes)
- **Availability:** Higher availability (remains operational)

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

**Polling:**
- **Latency:** High latency (periodic checks)
- **Complexity:** Low complexity (simple to implement)
- **Server Load:** High server load (constant requests)

**Push (WebSockets, SSE):**
- **Latency:** Low latency (immediate updates)
- **Complexity:** High complexity (more complex to implement)
- **Server Load:** Low server load (only when updates occur)

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
   - **Request Prioritization:** Configure request priorities server-side (no need to send priority in payload). Define priority rules in configuration files (e.g., YAML, JSON) or middleware that classifies requests based on endpoint patterns, user roles, or request types. Higher priority requests get processed first, while lower priority ones are queued or rejected.
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

<expand title="How do microservices communicate with each other?">
**Question:** How do microservices communicate with each other?

**Answer:**
Microservices can communicate through various patterns, each with different use cases and trade-offs.

**Synchronous Communication:**

1. **REST APIs (HTTP/HTTPS):**
   - **How it works:** Direct HTTP requests between services
   - **Use Case:** 
     - Request-response patterns
     - When immediate response is needed
     - Simple CRUD operations
     - External API integration
   - **Example:** User service calls Payment service to process payment
   - **Pros:** Simple, widely understood, easy to debug
   - **Cons:** Tight coupling, cascading failures, network latency

2. **gRPC (Remote Procedure Calls):**
   - **How it works:** Protocol buffers, binary protocol, faster than REST
   - **Use Case:**
     - High-performance internal communication
     - Real-time streaming
     - Microservices in same data center
     - When type safety is critical
   - **Example:** Real-time analytics service streaming data to dashboard service
   - **Pros:** Faster, type-safe, supports streaming, efficient binary format
   - **Cons:** More complex, less human-readable, requires code generation

3. **GraphQL:**
   - **How it works:** Single endpoint, client specifies needed data
   - **Use Case:**
     - Multiple clients need different data shapes
     - Mobile apps with limited bandwidth
     - Complex nested data relationships
   - **Example:** Mobile app fetching only user name and avatar, web app fetching full profile
   - **Pros:** Flexible queries, reduces over-fetching, single endpoint
   - **Cons:** Query complexity, caching challenges, potential N+1 problems

**Asynchronous Communication:**

1. **Message Queues (RabbitMQ, Amazon SQS, Azure Service Bus):**
   - **How it works:** Producer sends message to queue, consumer processes it
   - **Use Case:**
     - Order processing workflows
     - Email notifications
     - Background job processing
     - Decoupling services
     - Handling traffic spikes
   - **Example:** Order service publishes "OrderCreated" message, Email service consumes and sends confirmation
   - **Pros:** Decoupling, handles spikes, retry mechanisms, load balancing
   - **Cons:** Message ordering challenges, potential message loss, complexity

2. **Event Streaming (Apache Kafka, Amazon Kinesis, Azure Event Hubs):**
   - **How it works:** Events published to topics, multiple consumers can subscribe
   - **Use Case:**
     - Real-time analytics
     - Event sourcing
     - Audit logs
     - Multiple services reacting to same event
     - Data pipeline processing
   - **Example:** User registration event → Email service, Analytics service, Welcome service all react
   - **Pros:** Multiple consumers, event replay, high throughput, event history
   - **Cons:** Eventual consistency, complexity, storage requirements

3. **Pub/Sub (Publish-Subscribe):**
   - **How it works:** Publishers send messages to topics, subscribers receive based on subscriptions
   - **Use Case:**
     - Broadcasting events to multiple services
     - Real-time notifications
     - Decoupled event distribution
   - **Example:** Inventory service publishes "StockLow" event, Alert service and Reorder service both receive it
   - **Pros:** Loose coupling, scalable, flexible routing
   - **Cons:** Message delivery guarantees, ordering challenges

**Hybrid Patterns:**

1. **API Gateway Pattern:**
   - **How it works:** Single entry point routing to multiple microservices
   - **Use Case:**
     - External client communication
     - Aggregating responses from multiple services
     - Authentication/authorization
     - Rate limiting
   - **Example:** Client calls API Gateway → Gateway calls User, Order, and Payment services → Aggregates response
   - **Pros:** Single point of entry, centralized security, simplified client
   - **Cons:** Potential bottleneck, single point of failure

2. **Service Mesh (Istio, Linkerd, Consul Connect):**
   - **How it works:** Infrastructure layer handling service-to-service communication
   - **Use Case:**
     - Complex microservices deployments
     - Need for observability, security, traffic management
     - Multiple services with different communication needs
   - **Example:** Automatic load balancing, circuit breaking, retries, and monitoring across all services
   - **Pros:** Centralized communication logic, observability, security
   - **Cons:** Additional complexity, resource overhead

**Best Practices:**

1. **Choose Based on Requirements:**
   - Use synchronous for immediate responses
   - Use asynchronous for decoupling and scalability
   - Use event streaming for multiple consumers

2. **Resilience Patterns:**
   - Circuit breakers for sync calls
   - Retry with exponential backoff
   - Timeout configuration
   - Dead letter queues for failed messages

3. **Monitoring:**
   - Distributed tracing (Jaeger, Zipkin)
   - Service health checks
   - Message queue monitoring
   - API gateway metrics

4. **Security:**
   - Service-to-service authentication
   - Encrypted communication (TLS)
   - API keys or mTLS for internal services
   - Rate limiting

**Application-Specific Examples:**

**E-Commerce Application (Hybrid Approach):**
- **Payment Service:** REST/gRPC (synchronous) - Immediate response needed, critical transaction
- **Checkout Service:** REST (synchronous) - Needs immediate confirmation from Payment and Inventory
- **Order Processing:** Message Queue (asynchronous) - Can process in background, decouple from checkout
- **Inventory Service:** REST (synchronous) - Real-time stock checks during checkout
- **Notification Service:** Event Streaming (asynchronous) - Order confirmation, shipping updates to multiple consumers
- **Analytics Service:** Event Streaming (asynchronous) - Track user behavior, purchase patterns
- **Recommendation Service:** REST (synchronous) - Real-time product recommendations
- **Search Service:** REST (synchronous) - Immediate search results needed

**Social Media Application (Hybrid Approach):**
- **User Service:** REST (synchronous) - Profile data, authentication
- **Feed Service:** REST (synchronous) - Real-time feed generation
- **Post Service:** REST (synchronous) - Create/update posts immediately
- **Notification Service:** Event Streaming (asynchronous) - Likes, comments, follows broadcast to multiple users
- **Analytics Service:** Event Streaming (asynchronous) - Track engagement metrics
- **Media Service:** REST (synchronous) - Upload/download media files

**Banking/Financial Application:**
- **Transaction Service:** gRPC (synchronous) - High performance, type safety critical
- **Account Service:** REST (synchronous) - Account balance, transaction history
- **Fraud Detection:** Event Streaming (asynchronous) - Real-time fraud analysis
- **Notification Service:** Message Queue (asynchronous) - Transaction alerts, statements

**Most Commonly Used Communication Method:**
- **REST APIs** are the most commonly used method due to simplicity, wide adoption, and ease of debugging
- Most organizations start with REST and gradually introduce async patterns (Message Queues, Event Streaming) for specific use cases
- Hybrid approaches (REST + async) are the most common in production systems

**Decision Matrix:**
- **Need immediate response?** → REST/gRPC
- **Need decoupling?** → Message Queue/Event Streaming
- **Multiple consumers?** → Event Streaming/Pub-Sub
- **High performance?** → gRPC
- **Simple integration?** → REST
- **Complex routing?** → Service Mesh
</expand>

<expand title="How do you convert a monolithic application to microservices and vice versa?">
**Question:** How do you convert a monolithic application to microservices and vice versa?

**Answer:**

**Converting Monolith to Microservices (Strangler Fig Pattern):**

1. **Identify Service Boundaries:**
   - Analyze business domains (bounded contexts)
   - Identify independent modules
   - **Example:** User management, Order processing, Payment, Inventory

2. **Extract Services Incrementally:**
   - Start with least coupled, most independent module
   - Extract one service at a time
   - Keep monolith running during extraction
   - **Example:** Extract User service first, then Order service

3. **Communication Strategy:**
   - **Most Common:** REST APIs (simplest to implement)
   - Start with synchronous REST for extracted services
   - Gradually introduce async patterns (Message Queues) for decoupling
   - **Example:** New User service exposes REST API, monolith calls it

4. **Database Migration:**
   - Extract service's database tables
   - Create separate database for service
   - Use database per service pattern
   - Handle data synchronization during transition

5. **API Gateway:**
   - Introduce API Gateway to route requests
   - Gradually route traffic to new services
   - Keep backward compatibility with monolith

6. **Deployment:**
   - Deploy services independently
   - Use feature flags to toggle between monolith and service
   - Monitor and compare performance

**Example Migration Path:**
```
Monolith (All features)
  ↓
Extract User Service (REST API)
  ↓
Extract Order Service (REST API + Message Queue for notifications)
  ↓
Extract Payment Service (REST API)
  ↓
Full Microservices Architecture
```

**Converting Microservices to Monolith (Rare but Sometimes Needed):**

1. **Identify Consolidation Candidates:**
   - Services that are tightly coupled
   - Services with high communication overhead
   - Services that don't benefit from separation
   - **Example:** Services that always call each other synchronously

2. **Merge Services:**
   - Combine service codebases
   - Merge databases (if appropriate)
   - Consolidate deployment pipelines
   - **Example:** Merge User and Profile services into single service

3. **Communication Simplification:**
   - Remove inter-service communication
   - Convert to in-process calls
   - Simplify from REST/gRPC to function calls
   - Remove message queues where not needed

4. **Database Consolidation:**
   - Merge databases if services share data
   - Or keep separate databases but in same monolith
   - Simplify data access patterns

5. **Deployment Simplification:**
   - Single deployment unit
   - Simplified CI/CD pipeline
   - Reduced operational complexity

**When to Convert:**

**Monolith → Microservices:**
- Team size growing (10+ developers)
- Need independent scaling
- Different services have different tech stack needs
- Clear bounded contexts identified
- Operational maturity to handle complexity

**Microservices → Monolith:**
- Over-engineering (too many small services)
- High communication overhead
- Services too tightly coupled
- Team too small to manage complexity
- Operational burden too high

**Communication Method During Conversion:**
- **Most Common:** REST APIs
  - Easiest to implement during extraction
  - Widely understood
  - Good for gradual migration
- **Alternative:** Start with REST, then optimize to gRPC if performance needed
- **Async:** Introduce Message Queues gradually for decoupling

**Best Practices:**
- Don't convert everything at once
- Use Strangler Fig pattern (gradual replacement)
- Keep both systems running during transition
- Monitor performance and costs
- Have rollback plan
- Start with least risky services
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
The key is to separate and optimize reads and writes independently. Here are multiple approaches, from simple to advanced:

**Approach 1: Read Replicas (Simplest - Most Common):**

**How it works:**
- One master database handles all writes
- Multiple replica databases handle all reads
- Master automatically copies data to replicas

**Architecture:**
```
Write Requests → Master Database (Writes only)
                      ↓ (Replication)
Read Requests → Read Replica 1, 2, 3... (Reads only)
```

**Example:**
- User creates order → Write to master
- User views order history → Read from replica
- **Benefit:** Reads don't slow down writes, can scale reads independently

**When to use:**
- Simple setup needed
- Can tolerate slight delay (few seconds) for read consistency
- Most common first approach

**Approach 2: Caching Layer (Very Common):**

**How it works:**
- Writes go to database
- Frequently read data stored in fast cache (Redis)
- Reads check cache first, then database

**Architecture:**
```
Write → Database
Read → Check Cache (Redis) → If miss, read Database → Store in Cache
```

**Example:**
- User updates profile → Write to database, invalidate cache
- User views profile → Check Redis cache first, if found return immediately, if not read from database
- **Benefit:** Reads are super fast, writes unaffected

**When to use:**
- Same data read many times
- Can accept slightly stale data
- Need very fast reads

**Approach 3: Separate Read/Write Databases (CQRS Pattern):**

**How it works:**
- Write database: Optimized for writes (normalized, fast inserts)
- Read database: Optimized for reads (denormalized, pre-computed data)
- Events sync data from write to read database

**Architecture:**
```
Write API → Write Database (Normalized, fast writes)
                ↓ (Events/Async)
            Event Bus
                ↓
            Read Database (Denormalized, fast reads) ← Read API
```

**Simple Explanation:**
- **Write side:** When user creates order, write to write database (simple, fast)
- **Read side:** Read database has pre-computed order summaries (no joins needed, super fast)
- **Sync:** Background process copies/transforms data from write DB to read DB

**Example:**
- User creates order → Write to write database → Event published
- Background job processes event → Updates read database with order summary
- User views orders → Read from read database (already formatted, no joins)

**When to use:**
- Very different read and write patterns
- Need to optimize both heavily
- Can accept eventual consistency (few seconds delay)

**Approach 4: Database Sharding/Partitioning:**

**How it works:**
- Split database into multiple smaller databases (shards)
- Route writes to different shards based on key (e.g., user ID)
- Route reads to same shard

**Architecture:**
```
Write → Shard 1 (Users 1-1000)
Write → Shard 2 (Users 1001-2000)
Read → Route to correct shard based on user ID
```

**Example:**
- User 500 creates order → Write to Shard 1
- User 500 views orders → Read from Shard 1
- **Benefit:** Each shard handles less load, both reads and writes faster

**When to use:**
- Very large dataset
- Can partition by user/region
- Need to scale beyond single database limits

**Approach 5: Hybrid Approach (Most Production Systems Use This):**

**Combine multiple techniques:**

1. **Read Replicas** for scaling reads
2. **Caching** for frequently accessed data
3. **Write optimization** (batch writes, async processing)
4. **CDN** for static content

**Example E-Commerce System:**
```
Writes:
- Order creation → Master database
- Inventory update → Master database

Reads:
- Product catalog → CDN (static) + Cache (dynamic)
- User orders → Read replica + Cache
- Product search → Read replica (optimized indexes)
```

**Real-World Example:**
- **Write:** User places order → Write to master DB → Update cache
- **Read:** User views product → Check CDN → Check cache → Check read replica → Return

**Which Approach to Choose:**

1. **Start Simple:** Read Replicas + Caching (covers 80% of cases)
2. **If still slow:** Add CQRS for complex read patterns
3. **If very large:** Add Sharding
4. **Most systems:** Use Hybrid (combine 2-3 approaches)

**Best Practices:**
- Always use read replicas for read-heavy workloads
- Always use caching for hot data
- Use CQRS only if read/write patterns are very different
- Monitor and measure before optimizing
- Start simple, add complexity only when needed
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
**The Problem:**
When you have multiple servers, a user's session stored on Server 1 won't be available if their next request goes to Server 2. We need a way for all servers to access the same session data.

**Solution Options:**

1. **Shared Session Store (Recommended - Most Common):**
   
   **How it works:**
   - All servers store sessions in a shared storage (Redis/Memcached)
   - When user logs in on Server 1, session is stored in Redis
   - When user's next request goes to Server 2, Server 2 reads from same Redis
   - All servers can access any user's session
   
   ```
   User → Server 1 → Redis (stores session)
   User → Server 2 → Redis (reads same session)
   ```
   
   **Example:**
   ```javascript
   // Store session (any server can do this)
   await redis.setex(`session:${sessionId}`, 3600, JSON.stringify(sessionData));
   
   // Retrieve session (any server can read this)
   const session = await redis.get(`session:${sessionId}`);
   ```
   
   **Benefits:**
   - Fast access (Redis is in-memory)
   - Shared across all servers
   - Automatic expiration (TTL)
   - Highly scalable
   
   **When to use:** Most common approach, works for almost all cases

2. **Database Sessions:**
   
   **How it works:**
   - Store sessions in database (PostgreSQL, MySQL)
   - All servers read/write from same database
   - Slower than Redis but more persistent
   
   **When to use:** When you need session data to survive Redis restarts, or already have database infrastructure

3. **Stateless (JWT Tokens):**
   
   **How it works:**
   - Session data stored in token itself (JWT)
   - No server storage needed
   - Token sent with every request
   - Any server can verify token
   
   **When to use:** Modern APIs, microservices, when you don't need to revoke sessions immediately

**Recommended Approach: Redis**
- Fastest option
- Most commonly used
- Scales well
- Easy to implement

**Best Practices:**
- Use Redis for sessions (fast, scalable)
- Set appropriate TTL (e.g., 1 hour for user sessions)
- Handle Redis failures (fallback to database or error handling)
- Use Redis cluster for high availability
- Encrypt sensitive session data
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
