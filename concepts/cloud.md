# Cloud

## Primary Concepts

<expand title="Overview of Cloud Computing">
## Overview of Cloud Computing

### What is Cloud Computing?

- **Common Misconception:** "There is no cloud, it's just someone else's computer"
- **Reality:** Much more than just someone else's computer
- **Market Size:** $330 billion in commercial cloud services revenue (2022)
- **Perspective:** If one business, would be 4th or 5th biggest on the planet

### Why It Matters

- **Substance:** Real, significant technology with major impact
- **Hype:** Yes, there's hype, but with good reasons
- **Importance:** Already important and becoming more so
- **Multiple Benefits:** Not just one reason, but many

### Different Perspectives

**Individual:**
- Personal use, backup, streaming
- Products and tools for personal benefit

**Team:**
- Collaboration, shared resources
- Team-level applications

**Organization:**
- Strategic focus, cost reduction
- Different roles and needs

**Clients/Customers:**
- Solutions for external stakeholders
- Customer-facing services

### Key Insight

Cloud computing cannot be explained with just one or two examples. Different people see different benefits because use cases vary dramatically between individuals, teams, and organizations.

</expand>

<expand title="Benefits of Cloud Computing">
## Benefits of Cloud Computing

### Four Core Benefits

**1. Cost:**
- Reduce capital expenditure
- Improve cash flow
- Pay-as-you-go models
- Sometimes much cheaper than alternatives

**2. Convenience:**
- Easier to use than traditional approaches
- Less manual work
- Automated processes
- Access from anywhere with internet

**3. Speed:**
- Faster than traditional methods
- Quicker deployment
- Reduced time to market
- Immediate provisioning

**4. Features (Capabilities):**
- Enable things that weren't possible before
- Cost-prohibitive tasks become feasible
- Time-consuming tasks become practical
- New capabilities and options

### Understanding the Benefits

**First Three (Cost, Convenience, Speed):**
- Often not brand new capabilities
- Things we could do before (backup, websites, databases)
- But now cheaper, easier, and/or faster
- Sometimes a little better, sometimes much better

**Fourth Benefit (Features):**
- Enables new capabilities
- Things that were technically possible but impractical
- Opens up entirely new possibilities

### Priorities

- **Different Organizations:** Prioritize benefits differently
- **Some Focus:** Only on cost reduction
- **Others Focus:** New capabilities, even if more expensive
- **Reality:** All benefits can be explained through these four, with different combinations and priorities

</expand>

<expand title="Characteristics of Cloud Services">
## Characteristics of Cloud Services

### Common Qualities (99% of the time)

**1. Internet Connection Required:**
- Must be connected to internet to use
- Doesn't mean 100% connection required (can work offline temporarily)
- Internet is underlying network that makes it possible
- Not the same as "the internet" (broader concept)

**2. Someone Else's Computing Resource:**
- Using computing hardware owned by cloud provider
- Not just any computer—large tech organizations' data centers
- Dedicated buildings/complexes with thousands of servers
- Multiple redundant internet connections, cooling, security, power backups

**3. On-Demand and Self-Service:**
- Get what you need immediately
- No phone calls, sales reps, quotes, purchase orders
- Management website/portal to interact with
- Provisioned within seconds or minutes

**4. Pay-as-You-Go:**
- Metered usage (like electricity)
- Pay for what you use
- Some services: flat rate per month/hour/day
- Others: based on actual usage

**5. Pooled Resources:**
- Not dedicated hardware per user
- Shared infrastructure across many users
- More efficient and cost-effective
- Better fault tolerance

**6. Software Management Layer:**
- Not just physical infrastructure
- Software layer manages and automates everything
- Interact with software, not hardware directly
- What transforms data center into cloud computing

</expand>

<expand title="Data Centers and Infrastructure">
## Data Centers and Infrastructure

### What Are Cloud Data Centers?

**Built By:**
- Large tech organizations (Microsoft, Google, Amazon, IBM, Oracle, Alibaba, Apple)
- Dedicated buildings or complexes
- Thousands of servers, hard drives, networking hardware
- Multiple redundant internet connections
- Cooling systems, security systems, independent power backups
- Locations around the world

**Purpose:**
- Built to make resources available to outside users
- For a price
- Not just for internal use (like 20 years ago)

### What You Can Use Them For

- Storage for files, documents, data, backups
- Run websites
- Host email servers or databases
- Develop and run internal applications
- Use software running in data center

### Important Distinction

**Not Just Infrastructure:**
- Physical equipment (servers, drives, networking) = just a data center
- Data centers have existed since 1940s
- **What Makes It Cloud:** Additional software layer that manages, connects, controls, and automates everything
- **What You Interact With:** Software, not hardware directly

</expand>

<expand title="Resource Pooling">
## Resource Pooling

### Traditional Approaches (Before Cloud)

**Colocation (Colo):**
- Rent empty space in data center
- Bring your own server
- Plug it into rack
- Company provides building, power, internet, cooling

**Dedicated Servers:**
- Rent specific physical servers
- Server dedicated to you
- Nobody else has access
- Pay for individual, specific hardware

### Cloud Computing Approach

**Pooled Resources:**
- Not dealing with dedicated resources
- Access to large pool of shared resources
- Don't know exactly where your data is stored
- Stored across multiple hard drives for redundancy

### Benefits of Pooling

**Efficiency:**
- Most resources don't run at full capacity
- Can reallocate unused capacity to other users
- Much more efficient than dedicated resources

**Fault Tolerance:**
- System expects hardware failures
- Automatically detects failed drives
- Allocates another drive from pool
- No human intervention needed
- No single point of failure

**Cost:**
- More efficient = cheaper
- Share costs across many users
- Pay only for what you use

**Flexibility:**
- Resources can be moved and rebalanced automatically
- Virtual machines can be duplicated or moved
- System manages everything

</expand>

<expand title="SaaS, IaaS, and PaaS">
## SaaS, IaaS, and PaaS

### Three Main Categories

All cloud services can be categorized as "Something as a Service" - most commonly:

**1. Software as a Service (SaaS)**
- **2. Infrastructure as a Service (IaaS)**
- **3. Platform as a Service (PaaS)**

### Software as a Service (SaaS)

**Definition:** Complete, finished applications delivered over internet

**Examples:**
- Web-based email (Gmail, Outlook, Yahoo Mail)
- Document creation (Office 365, Google Docs)
- Collaboration (Box, Slack)
- File backup/sync (Google Drive, Dropbox, OneDrive, Amazon Drive)
- CRM (Salesforce, HubSpot)
- HR software (Workday, Zenefits)

**Characteristics:**
- Application already exists, you just use it
- Running on servers in data center
- Access through web browser (usually)
- Subscription model (don't own software)
- May have lightweight apps for sync/backup

**Audience:** Anyone

### Infrastructure as a Service (IaaS)

**Definition:** Deeper access to cloud resources (servers, storage, networking) to build something

**Examples:**
- Amazon AWS
- Google Cloud Platform
- Microsoft Azure
- Alibaba Cloud

**Characteristics:**
- Self-service, on-demand
- Configure resources (RAM, CPU, hard drive size)
- Choose location/region
- Get virtual machines (VMs), not physical machines
- Your responsibility to configure, update, maintain

**Virtual Machines:**
- Emulated computer running on physical server
- Can be saved, moved, duplicated
- One physical server supports multiple VMs
- Each customer's experience = dedicated machine
- Isolated from other tenants (multitenancy)

**Use Cases:**
- Lift and shift (move existing systems to cloud)
- Build custom applications
- Host websites, databases, applications

**Audience:** IT professionals, network administrators, sysadmins

### Platform as a Service (PaaS)

**Definition:** Complete development environment in cloud (between SaaS and IaaS)

**Characteristics:**
- Pre-configured development platform
- Web server, database, frameworks already installed
- Automatic updates and patching
- Don't manage virtual machine directly
- Targeted at specific development types (web, mobile, data analytics)

**Benefits:**
- Automates repeated setup tasks
- Built-in reporting
- Automatic scaling
- Focus on development, not infrastructure

**Use Cases:**
- Web development
- Mobile development
- Data analytics

**Audience:** Software developers

### Stack Relationship

- **SaaS:** Top (finished applications)
- **PaaS:** Middle (development platform)
- **IaaS:** Bottom (infrastructure)

Logically build on each other, but revenue/popularity is different:
- SaaS generates most revenue
- IaaS second
- PaaS third

</expand>

<expand title="Public, Private, Hybrid, and Multi-Cloud">
## Public, Private, Hybrid, and Multi-Cloud

### Public Cloud

- **Definition:** Most common, default option
- **Characteristics:**
  - Data centers owned by third party
  - Available to public
  - Multitenancy (shared resources)
  - Other companies using same servers/storage
- **When Talking About Cloud:** If no modifier mentioned, assume public cloud

### Private Cloud

- **Definition:** Computing resources dedicated to one organization
- **Characteristics:**
  - Not shared with other organizations
  - Usually for larger enterprise-level organizations
  - Can still be hosted by public cloud provider
  - Reserved set of resources
  - Private network with extra authentication layer
- **Benefits:**
  - Extra security and control
  - More customization
- **Cost:** Much more expensive than public cloud

### Hybrid Cloud

- **Definition:** Mix of public cloud, private cloud, and on-premises
- **Characteristics:**
  - Not just unrelated options
  - Communication/orchestration between parts
  - Applications talk to each other using APIs
  - Sharing workload between on-prem and cloud
- **Purpose:** Integrate existing on-premises systems with cloud services

### Multi-Cloud

- **Definition:** Using cloud services from more than one provider
- **Example:** Machine learning from Azure, archival storage from AWS
- **Characteristics:**
  - Part of larger architecture
  - Adds architectural complexity
- **Trend:** Becoming more common expectation
- **Benefit:** Don't have to commit to just one provider

</expand>

<expand title="Elastic Computing">
## Elastic Computing

### What is Elasticity?

- **Definition:** Ability to automatically expand and contract resources based on demand
- **Analogy:** Like elastic material - expands and contracts without additional effort
- **Applies To:** Servers, storage, networking

### Difference from Traditional Scaling

**Traditional Scaling:**
- Scale up to meet increased demand
- Manual process
- Often permanent

**Elastic Computing:**
- Scale up AND scale back down
- Automatic process
- Temporary adjustments

### How It Works

**Automatic Rules:**
- Set up rules in cloud provider's admin website
- Example: If CPU > 95%, automatically allocate more resources
- Can duplicate entire virtual machine
- When demand dies down, reduce resources
- Set up with a few clicks

### Benefits

- **Cost:** Only pay for resources when using them
- **Performance:** Automatically handle increased demand
- **Efficiency:** Resources available when needed, released when not
- **Fault Tolerance:** Part of pooled, virtualized infrastructure

### Key Advantage

One of the key benefits of cloud computing - automatic resource adjustment without manual intervention.

</expand>

<expand title="Serverless Computing">
## Serverless Computing

### What is Serverless?

- **Terrible Name:** Still uses servers (name is misleading)
- **Definition:** Way to run code without thinking about the server
- **Target Audience:** Software developers
- **Also Called:** Functions as a Service (FaaS)

### How It Works

**Comparison:**
- **PaaS:** Full development environment, still think about building full application
- **Serverless:** Just a few lines of code, run on-demand

**Characteristics:**
- Upload code (functions)
- Call on-demand from website or mobile app
- Charged only for computing time actually used
- Don't manage servers, scaling, or infrastructure

### Use Cases

- Small functions or code snippets
- Event-driven applications
- Microservices
- API endpoints

### Benefits

- **Simplicity:** Just write code, don't think about infrastructure
- **Cost:** Pay only when code runs
- **Scalability:** Automatically handles scaling
- **Focus:** Developer focuses on code, not infrastructure

</expand>

<expand title="Service Level Agreements (SLAs)">
## Service Level Agreements (SLAs)

### What are SLAs?

- **Definition:** Agreements describing expectations as paying consumer
- **Purpose:** Measure availability and uptime expectations
- **Reality:** Outages and failures will happen, but expectations are defined

### Example SLA

**Amazon Cloud Service Example:**
- Less than 99.99% availability → 10% off bill
- Less than 95% availability → 100% off bill

### Understanding Availability Percentages

**99% Availability:**
- Sounds good to general public
- Actually means 7-8 hours of downtime per month
- May not be acceptable for critical applications

**Questions to Ask:**
- Is this a critical application?
- How much revenue could we lose?
- What are our SLAs with external customers?
- Is this acceptable?

### Cost vs. Availability

- **Trade-off:** Higher availability = higher cost
- **Factors:** Resources, system complexity, architectural complexity
- **Decision:** Balance cost with availability needs

</expand>

<expand title="Major Cloud Providers">
## Major Cloud Providers

### Top Providers

**Biggest Market Share:**
- Amazon Web Services (AWS)
- Microsoft Azure
- Alibaba Cloud
- Google Cloud Platform

**Other Major Providers:**
- IBM Cloud
- Oracle Cloud

### Challenge

**Immense Options:**
- Each provider offers hundreds of services
- Multiple options for same need (e.g., storage)
- Different pricing tiers
- Services change quickly

**Example - Storage:**
- Not just one storage option
- Options for: long-term backup, disaster recovery, high performance
- Different pricing for each

**Categories:**
- 10-15 different categories
- Each category: 10-15 different services
- Can be overwhelming

### Approach

- **Don't Try to Learn Everything:** Focus on what you need
- **Understand Categories:** SaaS, IaaS, PaaS
- **Know Major Providers:** Recognize names and general capabilities
- **Research When Needed:** Look up specific services as needed

</expand>
