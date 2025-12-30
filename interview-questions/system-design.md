# System Design Interview Questions

## General Questions & Answers

<expand title="What is horizontal scaling vs vertical scaling?">
**Question:** What is horizontal scaling vs vertical scaling?

**Answer:**
**Vertical Scaling (Scale Up):**
- Add more power to existing server (CPU, RAM, storage)
- Upgrade hardware
- Single server becomes more powerful
- **Pros:** Simple, no code changes needed
- **Cons:** Limited by hardware, expensive, single point of failure
- **Example:** Upgrading from 8GB to 32GB RAM

**Horizontal Scaling (Scale Out):**
- Add more servers to handle load
- Distribute load across multiple servers
- **Pros:** Unlimited scaling, cost-effective, fault tolerance
- **Cons:** Requires load balancing, distributed systems complexity
- **Example:** Adding 10 more servers to handle traffic

**When to use Vertical Scaling:**
- Small to medium applications
- When simplicity is priority
- Applications that can't be distributed
- Quick temporary solution

**When to use Horizontal Scaling:**
- Large-scale applications
- Need for high availability
- Cost-effective growth
- Cloud-native applications

**Best Practice:**
Design for horizontal scaling from the start. It's easier to scale horizontally than to refactor later.
</expand>

<expand title="Explain load balancing and its strategies">
**Question:** Explain load balancing and its strategies.

**Answer:**
Load balancing distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed.

**Load Balancing Strategies:**

1. **Round Robin:**
   - Distributes requests sequentially
   - Simple and fair
   - Doesn't consider server load

2. **Least Connections:**
   - Routes to server with fewest active connections
   - Good for long-lived connections
   - Better load distribution

3. **Weighted Round Robin:**
   - Assigns weights to servers
   - More powerful servers get more traffic
   - Useful for heterogeneous servers

4. **IP Hash:**
   - Routes based on client IP hash
   - Same client always goes to same server
   - Good for session persistence

5. **Geographic:**
   - Routes based on geographic location
   - Reduces latency
   - CDN-like behavior

**Types of Load Balancers:**

1. **Hardware Load Balancer:**
   - Physical device (F5, Citrix)
   - High performance
   - Expensive

2. **Software Load Balancer:**
   - Nginx, HAProxy, Apache
   - Flexible, cost-effective
   - Runs on commodity hardware

3. **Cloud Load Balancer:**
   - AWS ELB, Azure Load Balancer, GCP Load Balancer
   - Managed service
   - Auto-scaling

**Health Checks:**
- Monitor server health
- Remove unhealthy servers from pool
- Automatic failover

**Benefits:**
- High availability
- Better performance
- Scalability
- Fault tolerance
</expand>

<expand title="What is caching and what are common caching strategies?">
**Question:** What is caching and what are common caching strategies?

**Answer:**
Caching stores frequently accessed data in fast storage to reduce latency and improve performance.

**Caching Strategies:**

1. **Cache-Aside (Lazy Loading):**
   - Application checks cache first
   - If miss, fetch from database and store in cache
   - **Pros:** Simple, cache failures don't affect app
   - **Cons:** Cache miss penalty, possible stale data

2. **Write-Through:**
   - Write to cache and database simultaneously
   - **Pros:** Cache always up-to-date
   - **Cons:** Write latency, cache may not be needed

3. **Write-Back (Write-Behind):**
   - Write to cache first, write to database later
   - **Pros:** Fast writes, reduces database load
   - **Cons:** Risk of data loss, complexity

4. **Refresh-Ahead:**
   - Proactively refresh cache before expiration
   - **Pros:** Reduces cache misses
   - **Cons:** Wastes resources if data not accessed

**Cache Levels:**
1. **Browser Cache:** Client-side caching
2. **CDN Cache:** Edge caching for static content
3. **Application Cache:** In-memory cache (Redis, Memcached)
4. **Database Cache:** Query result caching

**Cache Invalidation:**
- **TTL (Time To Live):** Automatic expiration
- **Event-based:** Invalidate on data changes
- **Manual:** Explicit invalidation

**Best Practices:**
- Cache frequently accessed, rarely changed data
- Set appropriate TTL
- Handle cache misses gracefully
- Monitor cache hit rates
- Use distributed cache for scalability
</expand>

<expand title="What is database replication and why is it important?">
**Question:** What is database replication and why is it important?

**Answer:**
Database replication is the process of copying and maintaining database objects in multiple databases to improve availability and performance.

**Types of Replication:**

1. **Master-Slave (Primary-Replica):**
   - One master handles writes
   - Multiple replicas handle reads
   - Replicas sync from master
   - **Use Case:** Read-heavy workloads

2. **Master-Master:**
   - Multiple masters can handle writes
   - Bidirectional replication
   - **Use Case:** Geographic distribution, high availability

3. **Multi-Master:**
   - Multiple masters with conflict resolution
   - More complex
   - **Use Case:** Distributed systems

**Replication Methods:**

1. **Statement-based:** Replicate SQL statements
2. **Row-based:** Replicate changed rows
3. **Mixed:** Combination of both

**Benefits:**
- **High Availability:** Failover to replica if master fails
- **Performance:** Distribute read load
- **Backup:** Replicas serve as backups
- **Geographic Distribution:** Reduce latency

**Challenges:**
- **Replication Lag:** Delay in syncing
- **Consistency:** Eventual consistency
- **Conflict Resolution:** In multi-master setups
- **Complexity:** Setup and maintenance

**Best Practices:**
- Monitor replication lag
- Use read replicas for analytics
- Implement automatic failover
- Regular backups
- Test failover procedures
</expand>

## Scenario-Based Questions & Answers

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

<expand title="Scenario: Design a distributed cache system. What would you consider?">
**Question:** Design a distributed cache system. What would you consider?

**Answer:**
**Requirements:**
- High availability
- Low latency
- Scalability
- Consistency
- Fault tolerance

**Design Components:**

1. **Cache Nodes:**
   - Multiple cache servers (Redis, Memcached)
   - Distributed across data centers
   - Auto-scaling based on load

2. **Consistent Hashing:**
   - Distribute keys across nodes
   - Minimal rehashing when nodes added/removed
   - Virtual nodes for better distribution

3. **Replication:**
   - Master-replica setup
   - Automatic failover
   - Read from replicas, write to master

4. **Eviction Policy:**
   - LRU (Least Recently Used)
   - LFU (Least Frequently Used)
   - TTL-based expiration
   - Size-based eviction

5. **Cache Invalidation:**
   - TTL-based expiration
   - Event-based invalidation
   - Manual invalidation API
   - Cache versioning

6. **Monitoring:**
   - Cache hit/miss rates
   - Latency metrics
   - Memory usage
   - Node health

**Architecture:**
```
Application
    ↓
Cache Client (with consistent hashing)
    ↓
Cache Cluster (Redis Cluster)
    ├── Node 1 (Master + Replica)
    ├── Node 2 (Master + Replica)
    └── Node 3 (Master + Replica)
```

**Considerations:**

1. **Consistency:**
   - Strong consistency vs eventual consistency
   - Cache-aside pattern
   - Write-through vs write-back

2. **Partitioning:**
   - Consistent hashing
   - Replication factor
   - Data distribution

3. **Failure Handling:**
   - Automatic failover
   - Graceful degradation
   - Circuit breaker pattern

4. **Performance:**
   - Connection pooling
   - Pipeline requests
   - Compression for large values

**Best Practices:**
- Set appropriate TTL
- Monitor cache metrics
- Use connection pooling
- Implement retry logic
- Handle cache failures gracefully
- Use compression for large values
</expand>

<expand title="Scenario: Design a real-time chat system like WhatsApp. What are the key components?">
**Question:** Design a real-time chat system like WhatsApp. What are the key components?

**Answer:**
**Requirements:**
- One-on-one messaging
- Group messaging
- Real-time delivery
- Message persistence
- Read receipts
- Online/offline status
- Handle millions of users

**Key Components:**

1. **Client Applications:**
   - Mobile apps (iOS, Android)
   - Web app
   - Desktop app

2. **API Gateway:**
   - Authentication
   - Rate limiting
   - Request routing

3. **Message Service:**
   - Send/receive messages
   - Message queuing
   - Message routing

4. **Real-time Communication:**
   - WebSocket servers
   - Long polling fallback
   - Connection management

5. **Database:**
   - User data
   - Messages (NoSQL for scalability)
   - Groups
   - Media storage

6. **Notification Service:**
   - Push notifications
   - Email notifications
   - SMS (optional)

**Architecture:**
```
Client → API Gateway → Message Service
                          ↓
                    WebSocket Server
                          ↓
                    Message Queue (Kafka/RabbitMQ)
                          ↓
                    Database (MongoDB/Cassandra)
                          ↓
                    Notification Service
```

**Database Design:**
```javascript
// Messages Collection
{
  messageId: "msg123",
  senderId: "user1",
  receiverId: "user2", // or groupId
  content: "Hello",
  timestamp: ISODate(),
  status: "sent|delivered|read",
  type: "text|image|video"
}

// Users Collection
{
  userId: "user1",
  status: "online|offline",
  lastSeen: ISODate()
}
```

**Scaling Considerations:**

1. **WebSocket Servers:**
   - Horizontal scaling
   - Sticky sessions (same user to same server)
   - Connection pooling

2. **Message Storage:**
   - Shard by user ID
   - Archive old messages
   - Use time-series database

3. **Real-time Delivery:**
   - Message queue for reliability
   - Retry mechanism
   - Dead letter queue

4. **Caching:**
   - Cache online users
   - Cache recent messages
   - Cache user presence

**Features:**
- End-to-end encryption
- Message synchronization across devices
- Media compression
- Typing indicators
- Message search
- Group management

**Performance:**
- Message delivery: < 100ms
- Support 1M+ concurrent connections
- Handle 10K+ messages/second
</expand>

