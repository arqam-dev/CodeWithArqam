# AWS (Amazon Web Service)

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- AWS Launch - 2006
- AWS S3 Launch - 2006
- AWS EC2 Launch - 2006
- AWS Lambda Launch - 2014
- AWS Amplify Launch - 2017
- AWS AppSync Launch - 2017

</expand>

<expand title="Primary Concepts">
## Primary Concepts

- General Points:
  - AWS (Amazon Web Services): Comprehensive cloud computing platform
  - Provides on-demand cloud computing services and APIs
  - Pay-as-you-go pricing model
  - Leading cloud service provider globally
  - Biggest client of AWS = Netflix
  - Near Real-time backups = temporary storage of data like storage of file while uploading
  - REST = architecture, HTTP = Protocol
  - Evolution: In-house servers => Cloud => Serverless
- AWS Certifications with Rating:
  - AWS Certified Cloud Practitioner (Rating: 4.72)
  - AWS Certified Solutions Architect Associate (Rating: 7.72)
  - AWS Certified Developer Associate (Rating: 4.67)
  - AWS Certified SysOps Administrator Associate (Rating: 4.69)
  - AWS Certified Solutions Architect Professional (Rating: 4.71)
  - etc.
- AWS Services I can remember (arranged in a way to remember):

- EC2

- Amazon CloudFront

- Amazon CloudFormation - IaaC service

- CloudWatch (CloudWatch Logs + CloudWatch Analytics + CloudWatch Alarm)

- IAM

- Cognito

- Amplify

- AppSync

- WAP

- AWS Network Firewall

- Route 53

- Elastic Load Balancing

- API Gateway

- AWS CodePipeline

- Lambda

- Step Functions

- ASG - Auto Scalling Group

- KMS

- DynamoDB

- DAX - Amazon DynamoDB Accelerator

- RDS

- Amazon Aurora

- S3

- AWS Glue (ETL: Extract → Transform → Load)

- DMS - Data Migration

- SQS

- SNS

- SES

- ECS - Elastic container Service

- ECR - Elastic Container Registry

- EBS - Elastic Block Storage

- Elastic Beanstalk

- ElastiCache

- Amazon Kinesis

- X-Ray

- AWS Services Sequence Flow (Memory Story) - 34 Services

Story: A user comes to your app, interacts with servers, their data is stored, processed, notified, and monitored.

Flow:

1️⃣ Web (How users come in) - 6 Services

- Route 53 → DNS directs the user

- CloudFront → CDN for faster content

- ELB → Load balancer distributes traffic

- API Gateway → API entry point

- WAF → Protects the app

- AWS Network Firewall

2️⃣ Servers (Where code runs) - 6 Services

- EC2 → Virtual server

- Lambda → Serverless functions

- ECS → Containers

- ECR → Containers

- Elastic Beanstalk → Managed app

- ASG → Auto scaling

3️⃣ Security (Who can do what + encryption) - 3 Services

- IAM → Permissions

- Cognito → User login/auth

- KMS → Encrypt data

4️⃣ Data (Where data lives) - 7 Services

- S3 → Files / object storage

- RDS → Relational database

- Aurora → Relational database

- DynamoDB → NoSQL database

- DAX → DynamoDB cache

- EBS → Storage for servers

- ElastiCache → In-memory caching

5️⃣ Move & Process (ETL & Streaming) - 3 Services

- Glue → ETL: clean & transform data

- DMS → Migrate databases

- Kinesis → Stream real-time data

6️⃣ Notify / Messaging - 3 Services

- SQS → Queues for tasks

- SNS → Push notifications

- SES → Send emails

7️⃣ Build & Monitor - 5 Services

- CodePipeline → CI/CD automation

- CloudFormation → Infrastructure as code

- CloudWatch → Logs, metrics, alarms

- Amplify → Frontend + GraphQL backend

- AppSync → Frontend + GraphQL backend

8️⃣ Flow / Orchestration - 1 Service

- Step Functions → Automate multi-step workflows

- X-Ray

🔹 One-line Memory Story

Web (FE) → Servers (BE) → Security → Data (DB) → Move → Notify → Build → orchestration Flow

- Cloud VS Serverless:
  - Serverless:
  - Model: based on "pay-as-you-go" model.
  - A way to describe the services, practices, and strategies that enable you to build more agile applications so you can innovate and respond to change faster.
  - Serverless services like AWS Lambda come with automatic scaling, built-in high availability, and a pay-for-value billing model.
  - Serverless computing is a cloud computing execution model in which the cloud provider allocates machine resources on demand.
- Cloud Computing:
  - Before cloud computing:
  - need to buy complete infrastructure
  - Invest heavily for startup
  - Invest in resources
  - Scalability
  - Last time to focus on bussiness
  - giving resources or services on rent. no need to manage things your ownself.
  - Services:
  - Pay as you go model = pay what you are using.
  - Scalability
  - Flexible
  - Secure and Disaster Recovery
  - Models:
  - Major Types:
    - Iaas (Infrastructure-as-a-Service):
    - take only infrastructure and then define and configure in a custom way.
    - custom configuration
    - They manage network etc and you manages the data.
    - Example:
      - EC2 instance.
      - Digital ocean
      - Azure
      - AWS
      - etc
    - Saas (Software-as-a-Service):
    - not to build only use the software
    - ready to use software.
    - Example:
      - Gmail, Fb, etc
    - manage and use only data. no link with application.
    - Paas (Platform-as-a-Service):
    - already configured and then we will choose lang of our own.
    - Example:
      - Heroku, Azure, AWS elastic bean.
      - etc
    - FaaS (Function-as-a-Service):
    - 
    - 
    - LaaS (Logging-as-a-Service):
    - 
    - BaaS (Backend-as-a-Service):
    - 
    - 
    - Example (Pizza):
    - Iaas: Take and Bake
    - Paas: Delivered (consume and serving)
    - Saas: Dined Out (only consume. no serving)
  - Deployment Models:
    - Public
    - Private
    - Hybrid
    - Community
- Core AWS Services:
  - Compute:
  - EC2 (Elastic Compute Cloud): Virtual servers in the cloud
  - Lambda: Serverless compute service
  - Elastic Beanstalk: Platform-as-a-Service for deploying applications
  - Batch: Run batch computing workloads
  - Storage:
  - S3 (Simple Storage Service): Object storage service
  - EBS (Elastic Block Store): Block storage for EC2 instances
  - Glacier: Low-cost storage for data archiving
  - Database:
  - RDS (Relational Database Service): Managed relational databases
  - DynamoDB: NoSQL database service (serverless)
  - ElastiCache: In-memory caching service
  - Redshift: Data warehousing and analytics
  - Networking:
  - CloudFront: Content delivery network (CDN)
  - API Gateway: API management service
  - VPC (Virtual Private Cloud): Isolated network environment
  - Route 53: DNS web service
  - Monitoring & Management:
  - CloudWatch: Monitoring and observability service
  - IAM: Identity and access management
  - CloudTrail: API call logging and auditing
  - Application Services:
  - AppSync: Managed GraphQL service
  - Cognito: User authentication and authorization
  - Messaging:
  - SNS (Simple Notification Service): Pub/sub messaging
  - SES (Simple Email Service): Email sending service
  - SQS (Simple Queue Service): Message queuing service
  - Workflow:
  - Step Functions: Serverless workflow orchestration
  - Kinesis: Real-time data streaming and analytics
- AWS Console & IAM:
  - AWS Console: Web-based interface for accessing and managing AWS services
  - IAM (Identity and Access Management):
  - Create Groups with policies as permissions
  - Create users and add them to respective group/groups
  - Manages access control and security policies
  - IAM Policies: JSON documents that define permissions
  - IAM Users: Individual accounts with credentials
  - IAM Groups: Collections of users with shared permissions
  - IAM Roles: Temporary credentials for AWS services/resources
  - Root User: Initial account owner (should not be used for daily tasks)
  - Multi-Factor Authentication (MFA): Extra layer of security
- AWS-Amplify VS Google-Firebase:
  - General Intro:
  - Amplify:
    - competitor of firebase.
    - ease the process of full stack app development by managing server-side deoployments.
    - like email authentication, we just need to call the amazon api regarding it.
    - no need to deploy db, etc.
    - features (mini or micro) like chatbots, push notifications, maps for analytics, etc.
    - Auth:
    - Login mechanism
      - phone number, fb, google, amazon, etc
      - Multi factor auth.
      - Configure sign-up attributes like email, etc.
      - Password protection like min length, includes symbols, forgot password through email or sms, etc.
    - User Management:
    - create use and also can add them in a group.
    - Authorizaion roles:
    - Like login user can do specific tasks, any user can read posts, etc.
    - Add to your App:
    - You can the use the amplify library to add login or signup etc functionality to your application.
  - Firebase:
    - Google firebase came out first who proposes the backend as a service (BAAS).
  - Ease of use:
  - difficult <=> easy:
    - actually amplify uses lambda function to implement the logic. So, we need to know the coding of lambda functions but we don't need to learning coding in firebase becoz it gives a complete boiler plate.
  - Flexibility Options:
  - more space of customization and personalization <=> Pre-configured implements with less customization.
  - Number of features:
  - less <=> larger
  - implements selected services <=> pool of services handles almost all the use cases of the server-side
  - Development Time:
  - Higher <=> Less
  - Scale of the Project:
  - Big to interprise level projects <=> Medium to small-sized projects
  - Pricing:
  - Slightly cheaper <=> Prices may not be optimized at times.
  - Data related tasks:
  - Highly suited for Big Data and machine learning tasks <=> Not best
  - Databases:
  - SQL and NoSQL support <=> only NoSQL support
  - Developer Community:
  - Much less <=> Huge
  - APIs:
  - GraphQL + REST apis <=> only Rest apis
  - Integrations with AWS services:
  - Easy <=> Slightly complex
  - Flutter support:
  - in preview <=> Robust flutter support
  - Storage:
  - S3 <=> Google Cloud
  - Open-Soure:
  - its open-source <=> Proprietary (protected/owned)
- AppSync VS Apollo:
  - 
  - 
  - 
- GraphQL Transform Library:
  - 
- Availability zone (AZs) VS Regions:
  - Regions like us-east-1, us-east-2, us-west-1, us-west-2, virginia, etc.
  - Availability Zones like we have 2 zones in us-east and similiar for us-west region.
  - Regions:
  - An AWS account provides multiple Regions so that you can launch Amazon EC2 instances in locations that meet your requirements.
  - Availability Zones:
  - are physically isolated from each other, but are united by private, low-latency, high-throughput, and highly redundant network connections.
  - enable AWS to provide services, including Amazon Cognito, with very high levels of availability and redundancy, while also minimizing latency.
- Amazon Kinesis:
  - Kinesis Data Streams can be used to collect log and event data from sources such as servers, desktops, and mobile devices.
  - You can then build Kinesis Applications to continuously process the data, generate metrics, power live dashboards, and emit aggregated data into stores such as Amazon S3.
  - Kinesis Data Streams segregates(divides) the data records belonging to a stream into multiple shards (pieces).
- Kubernetes:
  - automates work load on the cloud.
  - distribte containers
  - It replaces the server to other automatically when forst fails.
  - manages the clusters
- What is serverless computing:
  - Serverless computing is a cutting-edge computing execution model wherein a cloud provider runs the virtual server and dynamically manages the allocation of machine resources.
  - Serverless computing helps build and run applications and services without being concerned about servers.
- What type of storage is provided by Amazon:
  - EBS
  - EC2
  - Adding storage
- What is your understanding of AMI:
  - AMI is Amazon Machine Image; it provides the information required to launch an instance. One can also launch multiple instances using AMI when there are multiple vendors.
- Do you think there is a relation between Instance and AMI:
  - Yes, they are related to each other. An instance is a virtual machine with particular specifications and OS that one can choose while creating them.
  - While AMI or Amazon Machine Image is the complete backup of an instance.
- What are the best practices for security in Lambda:
  - Using AWS IAM (Identity Access and Management) is one of the widely used security practices in Lambda.
  - Granting specific user access to particular roles is another effective option to enhance security.
- What is elastic blockage storage in Lambda:
  - a virtual storage area network where tasks can be started.
  - It can tolerate faults easily, and users need not worry about loss of data even if the disk is damaged in the RAID.
- How does Lambda handle failure during event processing:
  - In Lambda, a function is run in either synchronous or asynchronous mode.
  - If a function fails in synchronous mode, then it just gives an exception to the calling application.
  - If a function fails in asynchronous mode, then it is retried at least three times.
- How is a Lambda function executed:
  - A Lambda function can be directly invoked by the Lambda console, Lambda API, AWS SDK, AWS CLI, and AWS toolkits.
- Name a simple method to improve performance in AWS Lambda:
  - Performance in AWS Lambda can be simply improved by using RAID, the Linux software. It also helps in increasing security.

</expand>

<expand title="Secondary Concepts">
## Secondary Concepts

- "AWS Cloud Practitioner Essentials" Certification:
  - Module 1: Introduction:
  - Cloud:
    - On-demand delivery of IT resources and applications through the internet with pay-as-you-go pricing.
  - Client-server model:
    - A client can be a web browser or desktop application that a person interacts with to make requests to computer servers.
    - A server can be services such as Amazon Elastic Compute Cloud (Amazon EC2), a type of virtual server.
  - Deployment models for cloud computing:
    - Cloud-Based Deployment:
    - Run all parts of the application in the cloud.
    - Migrate existing applications to the cloud.
    - Design and build new applications in the cloud.
    - On-Premises Deployment (Private cloud deployment):
    - Deploy resources by using virtualization and resource management tools.
    - Increase resource utilization by using application management and virtualization technologies.
    - Hybrid Deployment:
    - Connect cloud-based resources to on-premises infrastructure.
    - Integrate cloud-based resources with legacy IT applications.
  - Benefits of cloud computing:
    - Trade upfront expense for variable expense.
    - Stop spending money to run and maintain data centers.
    - Stop guessing capacity.
    - Benefits from massive economies of scale.
    - Increase speed and agility.
    - Go global in minutes.
  - Module 2: Compute in the Cloud:
  - Amazon Elastic Compute Cloud (Amazon EC2):
    - provides secure, resizable compute capacity in the cloud as Amazon EC2 instances.
    - Amazon EC2 instance types:
    - General purpose instances:
      - Provide a balance of compute, memory, and networking resources.
      - You can use them for a variety of workloads, such as:
      - application servers
      - gaming servers
      - backend servers for enterprise applications
      - small and medium databases
    - Compute optimized instances:
      - Are ideal for compute-bound applications that benefit from high-performance processors.
      - Ideal for high-performance web servers, compute-intensive applications servers, and dedicated gaming servers.
    - Memory optimized instances:
      - designed to deliver fast performance for workloads that process large datasets in memory.
    - Accelerated computing instances:
      - use hardware accelerators, or coprocessors, to perform some functions more efficiently than is possible in software running on CPUs.
    - Storage optimized instances:
      - designed for workloads that require high, sequential read and write access to large datasets on local storage.
      - Example:
      - distributed file systems, data warehousing applications, and high-frequency online transaction processing (OLTP) systems.
    - Scalability:
    - involves beginning with only the resources you need and designing your architecture to automatically respond to changing demand by scaling out or in.
    - you pay for only the resources you use.
  - Elastic Load Balancing:
    - Automatically distributes incoming application traffic across multiple resources, such as Amazon EC2 instances.
    - A load balancer acts as a single point of contact for all incoming web traffic to your Auto Scaling group.
    - This means that as you add or remove Amazon EC2 instances in response to the amount of incoming traffic, these requests route to the load balancer first.
    - Although Elastic Load Balancing and Amazon EC2 Auto Scaling are separate services, they work together to help ensure that

applications running in Amazon EC2 can provide high performance and availability.

  - Monolithic applications and microservices:
    - Monolithic applications:
    - An application with tightly coupled components. These components might include databases, servers, the user interface, business logic, and so on.
    - Microservices applications:
    - To help maintain application availability when a single component fails, you can design your application through a microservices approach.
    - application components are loosely coupled.
  - Amazon Simple Notification Service (Amazon SNS):
    - a publish/subscribe service.
    - Using Amazon SNS topics, a publisher publishes messages to subscribers.
  - Amazon Simple Queue Service (Amazon SQS):
    - a message queuing service.
    - you can send, store, and receive messages between software components, without losing messages or requiring other services to be available.
    - In Amazon SQS, an application sends messages into a queue. A user or service retrieves a message from the queue, processes it,

and then deletes it from the queue.

  - Serverless computing:
    - Virtual Servers VS Serverless.
    - Zero administration.
    - The term "serverless" means that your code runs on servers, but you do not need to provision or manage these servers.
    - With serverless computing, you can focus more on innovating new products and features instead of maintaining servers.
    - Another benefit of serverless computing is the flexibility to scale serverless applications automatically.
    - An AWS service for serverless computing is AWS Lambda.
    - AWS Lambda:
    - service that lets you run code without needing to provision or manage servers.
    - Example:
      - Resizing uploaded images
    - How AWS Lambda works:
      - Upload code to lambda.
      - Set code to trigger from an event source.
      - Code runs only when triggered.
      - Pay only for the compute time you use.
    - In AWS, you can also build and run containerized applications.
    - Containers:
    - Provide you with a standard way to package your application's code and dependencies into a single object.
    - You can also use containers for processes and workflows in which there are essential requirements for security, reliability, and scalability.
    - Example:
      - Developers can make multiple environments in the form of containers that can test the application in different environments.
    - Amazon Elastic Container Service (Amazon ECS):
      - A highly scalable, high-performance container management system that enables you to run and scale containerized applications on AWS.
      - It supports Docker containers.
      - Docker is a software platform that enables you to build, test, and deploy applications quickly.
      - With Amazon ECS, you can use API calls to launch and stop Docker-enabled applications.
    - Amazon Elastic Kubernetes Service (Amazon EKS):
    - A fully managed service that you can use to run Kubernetes on AWS.
    - Kubernetes is open-source software that enables you to deploy and manage containerized applications at scale.
    - A large community of volunteers maintains Kubernetes, and AWS actively works together with the Kubernetes community.
    - AWS Fargate:
    - A serverless compute engine for containers. It works with both Amazon ECS and Amazon EKS.
  - Module 3: Global Infrastructure and Reliability:
  - Selecting a Region:
    - Compliance with data governance and legal requirements:
    - If you want to run your app within a specific region, you can do it.
    - Proximity to your customers:
    - Selecting a Region that is close to your customers will help you to get content to them faster.
    - Low latency (the time between when content requested and received)
    - Available services within a Region
    - Pricing
  - Availability Zones:
    - A single data center or a group of data centers within a Region.
  - Edge locations:
    - A site that Amazon CloudFront uses to store cached copies of your content closer to your customers for faster delivery.
  - How to provision AWS resources:
    - Ways to interact with AWS services:
    - AWS Management Console:
      - A web-based interface for accessing and managing AWS services.
    - AWS Command Line Interface (AWS CLI):
      - To save time when making API requests, you can use it.
      - AWS CLI enables you to control multiple AWS services directly from the command line within one tool.
      - AWS CLI is available for users on Windows, macOS, and Linux.
      - Main Advantage: By using AWS CLI, you can automate the actions that your services and applications perform through scripts.
      - Example:
      - You can use commands to launch an Amazon EC2 instance, connect an Amazon EC2 instance to a specific Auto Scaling group, and more.
    - software development kits (SDKs):
      - SDKs make it easier for you to use AWS services through an API designed for your programming language or platform.
      - SDKs enable you to use AWS services with your existing applications or create entirely new applications that will run on AWS.
  - AWS Elastic Beanstalk:
    - With AWS Elastic Beanstalk, you provide code and configuration settings, and Elastic Beanstalk deploys the resources necessary to perform the following tasks:
    - Adjust capacity
    - Load Balancing
    - Automatic scaling
    - Application health monitoring
  - AWS CloudFormation:
    - Using it, you can treat your infrastructure as code.
    - This means that you can build an environment by writing lines of code instead of using the AWS Management Console to individually provision resources.
    - AWS CloudFormation provisions your resources in a safe, repeatable manner, enabling you to frequently build your infrastructure and

applications without having to perform manual actions.

    - It determines the right operations to perform when managing your stack and rolls back changes automatically if it detects errors.
    - Amazon CloudFront use to cache copies of content for faster delivery to users at any location
    - Example:

Replicate Infrastructure Across Environments

Use Case: Same template for dev → staging → production.

Why memorable: “No configuration drift. Everything stays identical.”

  - Module 4: Networking:
  - Connectivity to AWS:
    - Amazon Virtual Private Cloud (Amazon VPC):
    - A networking service that you can use to establish boundaries around your AWS resources
    - Enables you to provision an isolated section of the AWS Cloud.
    - Within it, you can organize your resources into subnets. A subnet is a section of a VPC that can contain resources such as Amazon EC2 instances.
    - Internet gateway:
      - To allow public traffic from the internet to access your VPC, you attach an internet gateway to the VPC.
      - What if you have a VPC that includes only private resources?
      - Virtual private gateway:
        - To access private resources in a VPC, you can use a virtual private gateway.
        - The component that allows protected internet traffic to enter into the VPC.
        - NOTE: Even though your connection to the coffee shop has extra protection, traffic jams are possible because you're using the same road as other customers.
    - AWS Direct Connect:
    - A service that enables you to establish a dedicated private connection between your data center and a VPC.
    - Example:
      - There is a dedicated road to the Cofee shop where only employees can go.
  - Subnets and network access control lists:
    - Subnet or sub-part of your app is restricted or having some ACLs.
    - Example:
    - Every person is submitting the cash to "Chashier" and then "Barista" serving the cofee. There should be no direct access of the people to the Barista.

So, for this, We separate the workspace(Subnet) of both of them and disallow the direct access of traffic to Barista.

    - Subnet:
    - A subnet is a section of a VPC in which you can group resources based on security or operational needs. Subnets can be public or private.
    - Types:
      - Public subnets:
      - contain resources that need to be accessible by the public, such as an online store's website.
      - Private subnets:
      - contain resources that should be accessible only through your private network, such as a database that contains customers' personal information and order histories.
    - Network traffic in a VPC:
    - When a customer requests data from an application hosted in the AWS Cloud, this request is sent as a packet. A packet is a unit of data sent over the internet or a network.
    - Before a packet can enter into a subnet or exit from a subnet, it checks for permissions.
    - The VPC component that checks packet permissions for subnets is a network access control list (ACL).
    - Network access control lists (ACLs):
      - A virtual firewall that controls inbound and outbound traffic at the subnet level.
      - Stateless packet filtering:
      - Network ACLs perform stateless packet filtering.
      - Security groups:
        - The VPC component that checks packet permissions for an Amazon EC2 instance is a security group.
        - A security group is a virtual firewall that controls inbound and outbound traffic for an Amazon EC2 instance.
      - Stateful packet filtering:
      - Security groups perform stateful packet filtering. They remember previous decisions made for incoming packets.
      - AWS account's default network access control list: It is stateless and allows all inbound and outbound traffic.

  - Global networking:
    - Domain Name System (DNS):
    - Domain Name System
    - DNS resolution involves a customer DNS resolver communicating with a company DNS server.
    - DNS resolution is the process of translating a domain name to an IP address.
    - Amazon Route 53:
    - A DNS web service.
    - It gives developers and businesses a reliable way to route end users to internet applications hosted in AWS.
    - Manage the DNS records for domain names.
  - Module 5: Storage & Databases:
  - Instance stores:
    - Block-level storage volumes behave like physical hard drives.
    - An instance store is disk storage that is physically attached to the host computer for an EC2 instance, and therefore has the same lifespan as the instance.
    - When the instance is terminated, you lose any data in the instance store.
  - Amazon Elastic Block Store (Amazon EBS):
    - A service that provides block-level storage volumes that you can use with Amazon EC2 instances.
    - If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.
  - EBS snapshot:
    - An incremental backup.
    - This means that the first backup taken of a volume copies all the data. For subsequent backups, only the blocks of data that have changed since the most recent snapshot are saved.
  - Amazon Simple Storage Service (Amazon S3):
    - Object storage:
    - In object storage, each object consists of data, metadata, and a key.
    - Amazon S3 stores data as objects in buckets.
    - The maximum file size for an object in Amazon S3 is 5 TB.
    - Amazon S3 storage classes:
    - S3 Standard:
      - Designed for frequently accessed data.
      - Stores data in a minimum of three Availability Zones.
    - S3 Standard-Infrequent Access (S3 Standard-IA):
      - Ideal for infrequently accessed data.
      - Similar to S3 Standard but has a lower storage price and higher retrieval price.
    - S3 One Zone-Infrequent Access (S3 One Zone-IA):
      - Stores data in a single Availability Zone.
      - Has a lower storage price than S3 Standard-IA.
    - S3 Intelligent-Tiering:
      - Ideal for data with unknown or changing access patterns.
      - Requires a small monthly monitoring and automation fee per object
    - S3 Glacier:
      - Low-cost storage designed for data archiving.
      - Able to retrieve objects within a few minutes to hours.
    - S3 Glacier Deep Archive:
      - Lowest-cost object storage class ideal for archiving.
      - Able to retrieve objects within 12 hours.
    - Amazon Elastic File System (Amazon EFS):
    - File storage:
      - In file storage, multiple clients (such as users, applications, servers, and so on) can access data that is stored in shared file folders.
      - In this approach, a storage server uses block storage with a local file system to organize files.
      - Clients access data through file paths.
    - Scalable file system used with AWS Cloud services and on-premises resources.
    - EBS vs EFS:
      - stores data in a single Availability Zone => stores data in and across multiple Availability Zones.
  - Amazon Relational Database Service (Amazon RDS):
    - Use structured query language (SQL) to store and query data.
    - Amazon RDS database engines:
    - Amazon RDS is available on six database engines, which optimize for memory, performance, or input/output (I/O).
    - Supported database engines include:
      - Amazon Aurora: It is up to five times faster than standard MySQL databases and up to three times faster than standard PostgreSQL databases.
      - PostgreSQL
      - MySQL
      - MariaDB
      - Oracle Database
      - Microsoft SQL Server
  - Amazon Non-Relational Database Service:
    - DynamoDB:
    - A key-value database service.
    - It delivers single-digit millisecond performance at any scale.
    - Serverless: DynamoDB is serverless, which means that you do not have to provision, patch, or manage servers.
    - Automatic scaling: As the size of your database shrinks or grows, DynamoDB automatically scales to adjust for changes in capacity while maintaining consistent performance.
  - Amazon Redshift:
    - A data warehousing service that you can use for big data analytics.
  - AWS Database Migration Service:
    - It enables you to migrate relational databases, nonrelational databases, and other types of data stores.
    - Use cases for AWS DMS:
    - Development and test database migrations:
      - Enabling developers to test applications against production data without affecting production users
    - Database consolidation:
      - Combining several databases into a single database.
    - Continuous replication:
      - Sending ongoing copies of your data to other target sources instead of doing a one-time migration.
  - Additional database services:
    - Amazon DocumentDB:
    - A document database service that supports MongoDB workloads.
    - Amazon Neptune:
    - A graph database service.
    - Amazon Quantum Ledger Database (Amazon QLDB)
    - Amazon Managed Blockchain
    - Amazon ElastiCache:
    - service that adds caching layers on top of your databases to help improve the read times of common requests.
    - Amazon DynamoDB Accelerator:
    - An in-memory cache for DynamoDB.
  - Module 6: Security:
  - The AWS shared responsibility model:
    - These resources include Amazon EC2 instances, Amazon S3 buckets, and Amazon RDS databases, etc.
    - Environment as a collection of parts that build upon each other.
    - AWS is responsible for some parts of your environment and you (the customer) are responsible for other parts. Thi is "shared responsibility model".
    - Example:
    - Customer Tasks:
      - ACLs, Client-side encryption, server-side encryption, traffic protection, etc.
    - AWS Tasks:
      - Compute, storage, db, networking, regions, availability Zones, edge locations, etc.
  - User permissions and access:
    - AWS Identity and Access Management (IAM):
    - Enables you to manage access to AWS services and resources securely.
    - AWS account root user:
      - When you first create an AWS account, you begin with an identity known as the root user.
      - Best practice:
      - Do not use the root user for everyday tasks.
      - Instead, use the root user to create your first IAM user and assign it permissions to create other users.
    - IAM users
    - IAM policies
    - IAM groups
    - IAM roles
    - In IAM, multi-factor authentication (MFA) provides an extra layer of security for your AWS account.
  - Compliance:
    - AWS Artifact:
    - A service that provides on-demand access to AWS security and compliance reports and select online agreements.
    - AWS Artifact consists of two main sections: AWS Artifact Agreements and AWS Artifact Reports.
  - Denial-of-service attacks:
    - A deliberate attempt to make a website or application unavailable to users.
    - Types:
    - Centralized:
      - Attacks from a single source.
    - Distributed:
      - Attacks from a multiple sources.
    - AWS Shield:
    - A service that protects applications against DDoS attacks.
    - Levels:
      - AWS Shield Standard: automatically protects all AWS customers at no cost.
      - AWS Shield Advanced: paid
  - AWS Key Management Service (AWS KMS):
    - Enables you to perform encryption operations through the use of cryptographic keys.
    - AWS WAF:
    - A web application firewall that lets you monitor network requests that come into your web applications.
    - AWS WAF works together with Amazon CloudFront and an Application Load Balancer.
    - Amazon Inspector:
    - To perform automated security assessments, they decide to use Amazon Inspector.
    - Helps to improve the security and compliance of applications by running automated security assessments.
    - Amazon GuardDuty:
    - A service that provides intelligent threat detection for your AWS infrastructure and resources.
    - It identifies threats by continuously monitoring the network activity and account behavior within your AWS environment.
  - Module 7: Monitoring and Analytics:
  - Amazon CloudWatch:
    - A web service that enables you to monitor and manage various metrics and configure alarm actions based on data from those metrics.
    - CloudWatch uses metrics to represent the data points for your resources.
    - CloudWatch Dashboard
    - CloudWatch Alarms
    - CloudWatch Logs
    - CloudWatch Metrics
    - CloudWatch Events
    - CloudWatch Application Monitoring
    - CloudWatch Insights
  - AWS CloudTrail:
    - It records API calls for your account.
    - The recorded information includes the identity of the API caller, the time of the API call, the source IP address of the API caller, and more.
  - AWS Trusted Advisor:
    - A web service that inspects your AWS environment and provides real-time recommendations in accordance with AWS best practices.
  - Module 8: Pricing and Support:
  - Free trial = 12 months
  - AWS pricing examples:
    - AWS Lambda:
    - Allows 1 million free requests and up to 3.2 million seconds of compute time per month.
  - Module 9: Migration and Innovation:
  - 6 strategies for migration:
    - Rehosting
    - Replatforming
    - Refactoring/re-architecting
    - Repurchasing
    - Retaining
    - Retiring
  - Module 10: The Cloud Journey:
  - The AWS Well-Architected Framework:
    - The Well-Architected Framework is based on five pillars:
    - Operational excellence
    - Security
    - Reliability
    - Performance efficiency
    - Cost optimization

</expand>

<expand title="AWS Services">
## AWS Services

- COMPUTE: "Introduction to Amazon Elastic Compute Cloud (EC2)" Certification
  - What is EC2:
  - having multiple instances.
  - Steps to create EC2:
  - After launching EC2:
  - Step 1: Choose AMI (Amazon Machine Image)
  - Step 2: Choose an instance type (t2.micro is free)
  - Step 3: Configure Instance
  - Step 4: Add Storage
  - Step 5: Add tags
  - Step 6: Configure Security Groups
  - Step 7: Review
- COMPUTE:	"Introduction to AWS Fargate" Certification:
  - General Points:
  - A new service of AWS for deploying and managing containers
  - You can run a task in any environment you want.
  - You don't need to think about the underline infrastructure.
  - Networking in Fargate:
  - Tasks run in Customer VPC:
    - You define subnets and security group.
  - ALB and NLB Support:
    - ALB = Application Load Balancing.
    - NLB = Network Load Balancing.
    - Allow to use each container just like an EC2 instance.
  - Fargate UseCases:
  - Long running services
  - Highly variable workloads
  - Monolithic app portability
  - Batch jobs and Microservices
  - AWS Container Services Overview:
  - Amazon ECS (Elastic Container):
    - You don't have to install or operate your own container management software.
  - Amazon EKS (Elastic Container for Kubernetes):
    - 
    - 
  - Amazon ECR (Elastic Container Registry):
    - Fully managed docker container registry that manke it easy to developers to store, manage and deploy docker container images.
- COMPUTE: "Introduction to EC2 Auto Scaling" Certification:
  - General Points:
  - Auto Scaling helps you ensure that you have the correct number of amazon EC2 instances available to handle the load for your application.
  - You can monitor your resources using the CloudWatch.
  - Types:
  - Scaling-Out:
    - Add more instances.
  - Scaling-In:
    - Terminate instances.
  - Components:
  - Launch Configuration:
    - This is to find WHAT:
    - AMI
    - Instance Type
    - Security Groups
    - Roles
  - Auto Scaling Group:
    - This is to find WHERE deployment takes place:
    - VPC and Subnets
    - Load Balancer
    - Minimum Instances
    - Desired Capacity
  - Auto Scaling Policy:
    - This is to find WHEN to launch or terminate EC2 instances
    - Scheduled
    - On-Demand
    - Scale-Out Policy
    - Scale-In Policy
  - Dynamic Auto Scaling:
  - Elastic Load Balancing => CloudWatch => Auto Scaling => ELB again and so on.

</expand>

<expand title="Serverless Computing: "Introduction To Serverless Development" Certification">
## Serverless Computing: "Introduction To Serverless Development" Certification

- Writing code:
  - System architecture
  - Design patterns
  - Frameworks and libraries
- Managing Code:
  - Tools (IDEs, SCM, debuggers, etc.)
  - Developer workflow
  - Test/deployment automation
  - Environment management
- Writing Lambda Functions:

|	Handler (function configuration, lambda-specific code, No business logic)   |

|	|																			|

|	Controller (Event Processing, Core business logic)							|

|	|																			|

|	Service (External Integrations, Service abstractions)						|

|_______________________________________________________________________________|

|					|

DynamoDB			?????????

- Managing Serverless Applications:
  - Serverless application framework in the development tool chain:
  - Code (Author) => Compiled App (Build) => Zip Archive (Package) => S3 Bucket => AWS Lambda(Deploy)
  - Where, Author & Build are under "IDE+BuildTool" category AND Package & Deploy are under "Application Framework" category.
- Organizing your Code Repository:
  - Every codebase is unique, but you will probably have multiple Lambda functions as well as other AWS resources per service.
  - Give each service its own template, and use one repository per service and template.
- Serverless development environment options:
  - Option one shows each developer connected to a separate AWS account.
  - Option two illustrates a single shared development account that all developers use to deploy multiple stacks.
- Testing and Debugging Serverless Applications:
  - Suggested Test Hierarchy for Serverless Applications:
  - Local Testing (on local machine)=> Remote Integration Tests (using an application stack in an AWS sandbox account)

=> Automated Integration Testing (across multiple branches of an application that have been deployed via a CI/CD pipeline)

  - Debugging:
  - Local debugging is not posible in lambda fucntions as in traditional applications.
  - Even we cannot deploy the app using the debugger mode open.
  - Local debugging is possible through SAM CLI.
  - SAM CLI provides a Lambda-like execution environment that lets you locally build, test, and debug applications defined by SAM templates or through the AWS Cloud Development Kit (CDK).
  - SAM ClI runs in the docker container.

</expand>

<expand title=""AWS Certified Developer Associate" Certification">
## "AWS Certified Developer Associate" Certification

- 01 Course Introduction - AWS Certified Developer Associate:
  - AWS = Cloud provider
  - Provide servers and services that you can use "on demand" and "scale easily".
  - Web having millions of users can be managed by only 3 or 4 developers using AWS.
- 04 IAM & AWS CLI:
  - IAM Permissions:
  - Users and Groups can be assigned JSON documents called policies.
  - Example:
    - {

"Version": "2012-10-17",

"Statement": [

{

"Effect": "Allow",

"Action": "ec2:Describe*",

"Resource": "*"

},

{

"Effect": "Allow",

"Action": "elasticloadbalancing:Describe*",

"Resource": "*"

}

]

}

NOTE: do it in seperate objects. you cannot add multiple actions in an array.

</expand>

<expand title="AWS Services (Overall)">
## AWS Services (Overall)

- Compute:
  - EC2
  - Lambda
  - Batch
  - Elastic Beanstalk
- Security, Identity, & Compliance:
  - IAM
  - Cognito
  - Secret Manager
- Management & Governance:
  - CloudWatch
  - AWS Auto Scaling
  - CloudFormation
  - Config
  - CloudTrail
- Application Integration:
  - Step Functions
- Front-end Web & Mobile:
  - AWS Amplify
  - AWS AppSync
- Networking & Content Delivery:
  - CloudFront = cdn
  - Route 53
  - API Gateway
- Others:
  - KMS - Key Management Service
  - event bridge
  - SQS
  - IOT (Infrastructure-as-a-Service. building infrastructure using code)
  - RDS - for relational databases
  - Dynammo
  - Support
  - AWS cost explorer
  - Athena - for searching on s3, etc.
- Media Services:
  - Kinesis Video Streams
- Analytics:
  - CloudSearch

</expand>

<expand title="AWS Services (Details)">
## AWS Services (Details)

</expand>

<expand title="Cognito">
## Cognito

  - Amazon Cognito provides authentication, authorization, and user management for your web and mobile apps.
  - Your users can sign in directly with a user name and password, or through a third party such as Facebook, Amazon, Google or Apple.
  - Components:
  - User Pool:
    - It provides:
    - Sign-up and sign-in services.
    - A built-in, customizable web UI to sign in users.
    - Social sign-in with Facebook, Google, Login with Amazon, and Sign in with Apple, and through SAML and OIDC identity providers from your user pool.
    - User directory management and user profiles.
    - Security features such as multi-factor authentication (MFA), checks for compromised credentials, account takeover protection, and phone and email verification.
    - Customized workflows and user migration through AWS Lambda triggers.
    - We can authenticate a user, can access the server-side resources with a user pool, can access resources with API gateway and lambda,

can access aws services, can authticate with third party, access appsync, etc.

  - Identity Pool:
    - Identity pools enable you to grant your users access to other AWS services through temporary credentials.
    - It provides:
    - Amazon Cognito user pools
    - Developer authenticated identities.
  - You can use identity pools and user pools separately or together.
  - An Amazon Cognito user pool and identity pool used together:
  - Step 1:
    - In the first step your app user signs in through a user pool and receives user pool tokens after a successful authentication.
  - Step 2:
    - Next, your app exchanges the user pool tokens for AWS credentials through an identity pool.
  - Step 3:
    - Finally, your app user can then use those AWS credentials to access other AWS services such as Amazon S3 or DynamoDB.
  - User pool attributes/ User Unique Itentifier:
  - User name
  - Email
  - Phone Number
  - Name
  - Given Name
  - Family Name
  - Preferred User Name
  - Enabled
  - Status
  - Tags:
  - A tag is a metadata label that you or AWS assigns to an AWS resource.
  - Each tag consists of a key and a value.
  - A tag is a label that you can use to categorize and manage user pools in different ways, such as by purpose, owner, environment, or other criteria.
  - 
  - Working Flow:
  - Amazon Cognito (use CIAM service that scales to million of users)
  - Add Sign-up: (use frictionless self-registration with a customer user repository/user pool)
    - gather user login and customer attributes
    - verify and save data
  - Add Sign-in: (Deploy user authentication with a hosted UI and SDK support)
    - ensure local, adaptive authentication
    - federate through a third-party login
  - Control Access: (Enforce policies and access application resources)
    - Activate fedrated access (OAuth2, OICD)
    - Activate credential broker access (identity pool)
  - Application Resources: (activate role or attribute based access controls)
    - Any AWS Resources like Application load balancer, api gateway, s3, dynammo, etc)

</expand>

<expand title="AWS Amplify">
## AWS Amplify

  - Full-stack development platform for mobile and web applications
  - Similar to Firebase - provides backend services and deployment
  - JS library that speeds up development
  - To achieve seamless effect
  - Integrates with GraphQL, Authentication, Storage, and Hosting
  - Requirements:
  - AWS IAM account
  - Install Amplify CLI: npm install -g @aws-amplify/cli
  - Configure: amplify configure
  - Commands:
  - amplify init: Initialize new Amplify project
  - amplify status: Show current status of Amplify resources
  - amplify env list: List all environments
  - amplify env checkout <env-name>: Switch between environments
  - amplify add function: Add a new Lambda function
  - amplify update api: Update existing API configuration
  - amplify console api: Open API console in browser
  - amplify mock function <function-name>: Test function locally
  - amplify api gql-compile: Compile GraphQL schema
  - amplify codegen: Generate code from GraphQL schema
  - GraphQL Model Creation:
  - On creating a model, following files will be updated:
    - schema.graphql
    - API.service.ts
    - mutation.graphql
    - queries.graphql
    - subscriptions.graphql
  - Integration with Angular:
  - Example scripts for npm package.json:
    - update-schema: "amplify api gql-compile && amplify codegen"
    - Deploy: "npm run build && aws s3 cp ./dist s3://bucket-name --recursive"
  - Modules:
  - Auth: Authentication and authorization
  - Analytics: Analytics tracking
  - Storage: File storage
  - API: GraphQL + REST APIs
  - Caching: Data caching
  - UI Components: Pre-built UI components
  - DataStore: Offline data synchronization
  - Managed Hosting: Automatic deployment
  - Functions: Serverless functions
  - CI/CD: Continuous integration and deployment
  - Push Notifications: Mobile push notifications
  - PubSub: Real-time messaging
  - Interactions: Chatbot integrations
  - Predictions: AI/ML predictions
  - Structure:
  - Communication between following modules through CLI:
    - Framework
    - Developers Tools
    - Cloud Services
  - Handles auto deploy and also gives facility to go to previous merge
  - Amplify Libraries:
  - Analytics, API (GraphQL + REST), Authentication, DataStore, Geo
  - In-App Messaging (Preview), Interactions, Predictions, PubSub
  - Push Notifications, Storage, XR, Utilities
  - Client Configuration, Server-Side rendering, Troubleshooting

</expand>

<expand title="AWS AppSync">
## AWS AppSync

  - Enterprise-level, fully managed GraphQL service with real-time data synchronization and offline programming features.
  - Provides a robust, scalable GraphQL interface for application developers to combine data from multiple sources, including Amazon DynamoDB, AWS Lambda, and HTTP APIs.
  - Efficient data caching

</expand>

<expand title="AWS Lambda function">
## AWS Lambda function

  - Code run on aws is called lambda function.
  - One of the service that falls under the "Compute" domain of services that AWS provides.
  - Example of Compute services:
  - EC2, EBS, Elastic Load Balancing, Lambda
  - Lambda supports following languages: Node, Python, Java, C# and Go.
  - Helps when the projects grows in size.
  - Applications:
  - To process images when it's uploaded on S3. like converting images to thumbnails based on the device.
  - Analyze the social media data like getting trending hashtag, etc.
    - Trending Hashtags => Social data is added into Amazon Kinesis stream => Lambda trigerred => data stored into database.
  - Backing up data:
    - Near Real-time backups = temporary storage of data like storage of file while uploading.
    - For this:
    - create two S3 buckets. Source and backup bucket.
    - Create IAM roles and policies.
    - Create a lambda function/trigger/event to copy files between the buckets and watch every new uploaded file too.
    - Testing it out.
    - Lambda fucntion invoked every time there is a upload into the bucket. This data is then uploaded into the backup bucket.
  - How does it works:
  - Requests are given to the containers to handle.
  - Container:
    - contains the code the user has provided to satisfy the query.
    - You can package your code and dependencies as a container image using tools such as the Docker command line interface (CLI).
    - You can then upload the image to your container registry hosted on Amazon Elastic Container Registry (Amazon ECR).
  - Flow:
    - Clients(who is sending req to lamda. It could be app or other amazon services) => multiple requests => Lambda => sends multiple requests to multiple containers
  - no of requests is directly proportional to no of containers.

</expand>

<expand title="What are the limitations of AWS Lambda">
## What are the limitations of AWS Lambda

  - The default deployment package size is 50 MB.
  - The ephemeral disk space is limited to 512 MB as the Lambda function will take longer time to execute with a larger package size.
  - The execution time is more when the memory allocation is less.
  - The memory range is from 128 MB to 10,240 MB.
  - The maximum execution timeout for a function is 15 minutes.

</expand>

<expand title="Amazon Prime">
## Amazon Prime

- Headings:
  - Introduction:
  - Introduction to Amazon
  - Introduction to AWS
  - Introduction to Amazon Prime:
    - Introduced in 2005
    - Purpose, 3 parts
    - Users
    - Transition of architect - saves upto 90% or cost
  - Amazon Prime Old Architecture - Microservices:
  - Micro-services:
    - Introduction
    - Service Independence
    - Communication
    - Decentralized Data Management
    - Service Discovery
    - Resilience and Fault Isolation
    - Scalability
    - Deployment Independence
    - Monitoring and Observability
  - What Happened at Amazon:
    - Why AWS Step Functions Didn't Work
    - Why Amazon S3 Didn't Work

GCP (Google Cloud Platform)

</expand>

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- Google App Engine - 2008
- Google Cloud Platform Launch - 2011
- Google Compute Engine - 2012
- Google Cloud Functions - 2016
- Google Cloud Run - 2019

</expand>

<expand title="Primary Concepts">
## Primary Concepts

- General Points:
  - Google Cloud Platform (GCP): Suite of cloud computing services provided by Google
  - Provides infrastructure, platform, and serverless services
  - Pay-as-you-go pricing model
  - Strong focus on data analytics and machine learning
  - Global network infrastructure
- Core GCP Services:
  - Compute:
  - Compute Engine: Virtual machines (similar to EC2)
  - App Engine: Platform-as-a-Service (PaaS)
  - Cloud Functions: Serverless functions (similar to Lambda)
  - Cloud Run: Serverless container platform
  - Storage:
  - Cloud Storage: Object storage (similar to S3)
  - Persistent Disk: Block storage (similar to EBS)
  - Cloud Filestore: Managed file storage
  - Database:
  - Cloud SQL: Managed relational databases
  - Firestore: NoSQL document database
  - Bigtable: NoSQL wide-column database
  - Cloud Spanner: Globally distributed relational database
  - Networking:
  - Cloud Load Balancing: Load distribution
  - Cloud CDN: Content delivery network
  - VPC: Virtual Private Cloud
  - Big Data & Analytics:
  - BigQuery: Serverless data warehouse
  - Dataflow: Stream and batch data processing
  - Pub/Sub: Messaging service
  - AI/ML:
  - Vertex AI: Machine learning platform
  - AutoML: Automated machine learning
  - Cloud Vision API: Image analysis
  - Cloud Speech-to-Text: Speech recognition
  - Identity & Security:
  - Identity and Access Management (IAM): Access control
  - Cloud Identity: Identity management
  - Cloud Security Command Center: Security monitoring
- GCP Key Features:
  - Global infrastructure with low latency
  - Strong data analytics and ML capabilities
  - Kubernetes-native (originator of Kubernetes)
  - Open source friendly
  - Excellent integration with Google services

</expand>

<expand title="Secondary Concepts">
## Secondary Concepts

- GCP vs AWS:
  - Pricing: GCP often more competitive, especially for compute
  - Machine Learning: GCP has stronger ML/AI services
  - Kubernetes: GCP originated Kubernetes, strong native support
  - Global Network: GCP's private fiber network
  - Market Share: AWS leads, but GCP growing rapidly
  - Database: GCP has unique offerings like Spanner (globally distributed SQL)

Azure (Microsoft Azure)

</expand>

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- Windows Azure Platform Launch - 2010
- Microsoft Azure Rebrand - 2014
- Azure Functions - 2016
- Azure Kubernetes Service (AKS) - 2017
- Azure Arc - 2019

</expand>

<expand title="Primary Concepts">
## Primary Concepts

- General Points:
  - Microsoft Azure: Cloud computing platform by Microsoft
  - Provides infrastructure, platform, and serverless services
  - Pay-as-you-go pricing model
  - Strong integration with Microsoft ecosystem (Windows, Office 365, Active Directory)
  - Hybrid cloud capabilities
- Core Azure Services:
  - Compute:
  - Virtual Machines: Infrastructure-as-a-Service (IaaS)
  - App Service: Platform-as-a-Service for web apps
  - Azure Functions: Serverless functions (similar to Lambda)
  - Azure Container Instances: Container hosting
  - Azure Kubernetes Service (AKS): Managed Kubernetes
  - Storage:
  - Blob Storage: Object storage (similar to S3)
  - Azure Files: Managed file shares
  - Disk Storage: Block storage (similar to EBS)
  - Data Lake Storage: Big data storage
  - Database:
  - SQL Database: Managed SQL database
  - Cosmos DB: Globally distributed NoSQL database
  - Azure Database for PostgreSQL/MySQL: Managed relational databases
  - Redis Cache: In-memory caching
  - Networking:
  - Virtual Network (VNet): Isolated network environment
  - Load Balancer: Traffic distribution
  - Azure CDN: Content delivery network
  - Azure DNS: DNS hosting
  - Identity & Security:
  - Azure Active Directory (Azure AD): Identity and access management
  - Key Vault: Secrets management
  - Security Center: Security monitoring
  - Azure Sentinel: Security information and event management (SIEM)
  - Integration:
  - Service Bus: Messaging service
  - Event Grid: Event routing service
  - API Management: API gateway
  - Analytics:
  - Azure Synapse Analytics: Data warehouse
  - HDInsight: Big data analytics
  - Azure Stream Analytics: Real-time stream processing
- Azure Key Features:
  - Hybrid cloud capabilities (integrate on-premises with cloud)
  - Strong Microsoft ecosystem integration
  - Enterprise-focused security and compliance
  - Excellent Windows Server support
  - Active Directory integration
  - .NET and Visual Studio optimized

</expand>

<expand title="Secondary Concepts">
## Secondary Concepts

- Azure vs AWS:
  - Enterprise Integration: Azure better for Microsoft environments
  - Hybrid Cloud: Azure stronger hybrid capabilities
  - Pricing: Azure often competitive, especially for Windows workloads
  - Market Position: AWS leads, Azure second in market share
  - Open Source: AWS traditionally stronger, Azure improving
  - Compliance: Azure strong in enterprise compliance certifications
- Cloud Provider Comparison:
  - AWS: Largest market share, comprehensive services, enterprise-ready
  - GCP: Strong ML/AI, data analytics, Kubernetes-native
  - Azure: Best Microsoft integration, hybrid cloud, enterprise focus
  - Choosing: Depends on existing infrastructure, tech stack, and specific needs

</expand>

<expand title="References">
## References

- AWS Events Channel: https://www.youtube.com/@AWSEventsChannel
- Introduction to AWS Services: https://www.youtube.com/watch?v=Z3SYDTMP3ME

</expand>

