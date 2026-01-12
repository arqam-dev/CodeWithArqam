# AWS (Amazon Web Services)

## Primary Concepts

<expand title="Version History (Main Versions)">
## Version History (Main Versions)

- AWS Launch - 2006
- AWS S3 Launch - 2006
- AWS EC2 Launch - 2006
- AWS Lambda Launch - 2014
- AWS Amplify Launch - 2017
- AWS AppSync Launch - 2017

</expand>

<expand title="General Points">
## General Points

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

- AWS Services Overview (34 Services):
  - EC2, CloudFront, CloudFormation, CloudWatch, IAM, Cognito, Amplify, AppSync, WAF, AWS Network Firewall, Route 53, Elastic Load Balancing, API Gateway, CodePipeline, Lambda, Step Functions, ASG (Auto Scaling Group), KMS, DynamoDB, DAX (DynamoDB Accelerator), RDS, Aurora, S3, Glue, DMS (Data Migration), SQS, SNS, SES, ECS, ECR, EBS, Elastic Beanstalk, ElastiCache, Kinesis, X-Ray

- AWS Services Sequence Flow (Memory Story):
  - **1️⃣ Web (How users come in)** - 6 Services: Route 53, CloudFront, ELB, API Gateway, WAF, AWS Network Firewall
  - **2️⃣ Servers (Where code runs)** - 6 Services: EC2, Lambda, ECS, ECR, Elastic Beanstalk, ASG
  - **3️⃣ Security (Who can do what + encryption)** - 3 Services: IAM, Cognito, KMS
  - **4️⃣ Data (Where data lives)** - 7 Services: S3, RDS, Aurora, DynamoDB, DAX, EBS, ElastiCache
  - **5️⃣ Move & Process (ETL & Streaming)** - 3 Services: Glue, DMS, Kinesis
  - **6️⃣ Notify / Messaging** - 3 Services: SQS, SNS, SES
  - **7️⃣ Build & Monitor** - 5 Services: CodePipeline, CloudFormation, CloudWatch, Amplify, AppSync
  - **8️⃣ Flow / Orchestration** - 1 Service: Step Functions, X-Ray

- Cloud Computing Models:
  - **IaaS (Infrastructure-as-a-Service)**: Take only infrastructure and configure in a custom way. Example: EC2, Digital Ocean, Azure, AWS
  - **PaaS (Platform-as-a-Service)**: Already configured platform, choose your language. Example: Heroku, Azure, AWS Elastic Beanstalk
  - **SaaS (Software-as-a-Service)**: Ready to use software. Example: Gmail, Facebook
  - **FaaS (Function-as-a-Service)**: Serverless functions
  - **BaaS (Backend-as-a-Service)**: Managed backend services

- Deployment Models:
  - Public Cloud
  - Private Cloud
  - Hybrid Cloud
  - Community Cloud

- Core AWS Services by Category:
  - **Compute**: EC2, Lambda, Elastic Beanstalk, Batch
  - **Storage**: S3, EBS, Glacier
  - **Database**: RDS, DynamoDB, ElastiCache, Redshift
  - **Networking**: CloudFront, API Gateway, VPC, Route 53
  - **Monitoring & Management**: CloudWatch, IAM, CloudTrail
  - **Application Services**: AppSync, Cognito
  - **Messaging**: SNS, SES, SQS
  - **Workflow**: Step Functions, Kinesis

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

- Availability Zones (AZs) vs Regions:
  - **Regions**: Geographic areas like us-east-1, us-east-2, us-west-1, us-west-2, etc.
  - **Availability Zones**: Physically isolated data centers within a region, connected by low-latency, high-throughput network connections
  - Enable high availability and redundancy while minimizing latency

</expand>

<expand title="Core AWS Services">
## Core AWS Services

### Compute Services

- **EC2 (Elastic Compute Cloud)**: Virtual servers in the cloud
  - Instance types: General purpose, Compute optimized, Memory optimized, Accelerated computing, Storage optimized
  - Steps to create EC2: Choose AMI → Choose instance type → Configure Instance → Add Storage → Add tags → Configure Security Groups → Review
  - AMI (Amazon Machine Image): Provides information required to launch an instance

- **Lambda**: Serverless compute service
  - Run code without provisioning or managing servers
  - Supports: Node.js, Python, Java, C#, Go
  - Pay only for compute time used
  - Automatic scaling
  - Use cases: Image processing, data analysis, real-time file processing

- **Elastic Beanstalk**: Platform-as-a-Service for deploying applications
  - Automatically handles: Capacity, Load Balancing, Auto Scaling, Application health monitoring

- **ECS (Elastic Container Service)**: Highly scalable container management system
  - Supports Docker containers
  - Run and scale containerized applications

- **EKS (Elastic Kubernetes Service)**: Fully managed Kubernetes service

- **ECR (Elastic Container Registry)**: Fully managed Docker container registry

- **Fargate**: Serverless compute engine for containers
  - Works with both ECS and EKS
  - No need to manage underlying infrastructure

### Storage Services

- **S3 (Simple Storage Service)**: Object storage service
  - Stores data as objects in buckets
  - Maximum file size: 5 TB
  - Storage classes: Standard, Standard-IA, One Zone-IA, Intelligent-Tiering, Glacier, Glacier Deep Archive

- **EBS (Elastic Block Store)**: Block storage for EC2 instances
  - Persistent storage that survives instance termination
  - EBS Snapshots: Incremental backups

- **EFS (Elastic File System)**: Scalable file system
  - Multiple clients can access shared file folders
  - Stores data across multiple Availability Zones

- **Glacier**: Low-cost storage for data archiving

### Database Services

- **RDS (Relational Database Service)**: Managed relational databases
  - Supports: Aurora, PostgreSQL, MySQL, MariaDB, Oracle, SQL Server
  - Aurora: Up to 5x faster than standard MySQL, 3x faster than PostgreSQL

- **DynamoDB**: NoSQL database service (serverless)
  - Key-value database
  - Single-digit millisecond performance
  - Automatic scaling

- **DAX (DynamoDB Accelerator)**: In-memory cache for DynamoDB

- **ElastiCache**: In-memory caching service
  - Improves read times of common database requests

- **Redshift**: Data warehousing and analytics service

- **DocumentDB**: Document database supporting MongoDB workloads

- **Neptune**: Graph database service

### Networking Services

- **CloudFront**: Content delivery network (CDN)
  - Caches content closer to users for faster delivery

- **Route 53**: DNS web service
  - Routes end users to internet applications hosted in AWS
  - Manages DNS records for domain names

- **API Gateway**: API management service
  - Entry point for APIs

- **VPC (Virtual Private Cloud)**: Isolated network environment
  - Organize resources into subnets (public/private)
  - Internet Gateway: Allows public traffic
  - Virtual Private Gateway: Allows protected internet traffic

- **Elastic Load Balancing**: Automatically distributes incoming traffic
  - Acts as single point of contact
  - Works with Auto Scaling

### Security Services

- **IAM (Identity and Access Management)**: Manages access to AWS services
  - Users, Groups, Roles, Policies
  - Multi-Factor Authentication (MFA)

- **Cognito**: User authentication and authorization
  - User Pools: Sign-up and sign-in services
  - Identity Pools: Grant access to AWS services through temporary credentials

- **KMS (Key Management Service)**: Encryption key management

- **WAF (Web Application Firewall)**: Protects web applications
  - Monitors network requests
  - Works with CloudFront and Application Load Balancer

- **AWS Shield**: Protects against DDoS attacks
  - Standard: Free, automatic protection
  - Advanced: Paid, additional features

- **GuardDuty**: Intelligent threat detection
  - Continuously monitors network activity and account behavior

- **Inspector**: Automated security assessments

### Monitoring & Management Services

- **CloudWatch**: Monitoring and observability service
  - Metrics, Logs, Alarms, Dashboards
  - Monitors AWS resources and applications

- **CloudTrail**: API call logging and auditing
  - Records API calls, identity of caller, time, source IP address

- **CloudFormation**: Infrastructure as code
  - Build environments by writing code
  - Safe, repeatable resource provisioning

- **Trusted Advisor**: Provides real-time recommendations
  - Inspects AWS environment for best practices

### Application Integration Services

- **Step Functions**: Serverless workflow orchestration
  - Automates multi-step workflows

- **SNS (Simple Notification Service)**: Pub/sub messaging service
  - Publishers publish messages to subscribers via topics

- **SQS (Simple Queue Service)**: Message queuing service
  - Send, store, and receive messages between components
  - Ensures messages aren't lost

- **SES (Simple Email Service)**: Email sending service

- **AppSync**: Managed GraphQL service
  - Real-time data synchronization
  - Combines data from multiple sources

- **Amplify**: Full-stack development platform
  - Backend services and deployment
  - Integrates with GraphQL, Authentication, Storage, Hosting

### Data Processing Services

- **Glue**: ETL (Extract, Transform, Load) service
  - Clean and transform data

- **DMS (Database Migration Service)**: Migrate databases
  - Supports relational, non-relational, and other data stores

- **Kinesis**: Real-time data streaming and analytics
  - Collects log and event data
  - Segregates data into shards

- **Athena**: Query data in S3 using SQL

</expand>

<expand title="Auto Scaling">
## Auto Scaling

- **Purpose**: Ensures correct number of EC2 instances to handle application load
- **Types**:
  - **Scaling-Out**: Add more instances
  - **Scaling-In**: Terminate instances
- **Components**:
  - **Launch Configuration**: Defines WHAT (AMI, Instance Type, Security Groups, Roles)
  - **Auto Scaling Group**: Defines WHERE (VPC, Subnets, Load Balancer, Min/Max/Desired instances)
  - **Auto Scaling Policy**: Defines WHEN (Scheduled, On-Demand, Scale-Out/In policies)
- **Dynamic Auto Scaling**: Elastic Load Balancing → CloudWatch → Auto Scaling → ELB (continuous loop)

</expand>

## Secondary Concepts

<expand title="AWS Cloud Practitioner Essentials">
## AWS Cloud Practitioner Essentials

### Module 1: Introduction

- **Cloud**: On-demand delivery of IT resources and applications through the internet with pay-as-you-go pricing
- **Client-server model**: Client (web browser/desktop app) makes requests to servers (like EC2)
- **Deployment models**:
  - **Cloud-Based**: Run all parts in the cloud
  - **On-Premises (Private)**: Deploy using virtualization and resource management tools
  - **Hybrid**: Connect cloud-based resources to on-premises infrastructure
- **Benefits of cloud computing**:
  - Trade upfront expense for variable expense
  - Stop spending money on data centers
  - Stop guessing capacity
  - Benefits from massive economies of scale
  - Increase speed and agility
  - Go global in minutes

### Module 2: Compute in the Cloud

- **EC2 Instance Types**:
  - **General purpose**: Balance of compute, memory, networking (application servers, gaming servers, small/medium databases)
  - **Compute optimized**: High-performance processors (high-performance web servers, compute-intensive apps, gaming servers)
  - **Memory optimized**: Fast performance for large datasets in memory
  - **Accelerated computing**: Hardware accelerators/coprocessors
  - **Storage optimized**: High sequential read/write access (distributed file systems, data warehousing, OLTP)
- **Scalability**: Begin with resources you need, design architecture to automatically respond to changing demand
- **Elastic Load Balancing**: Automatically distributes traffic across multiple EC2 instances
- **Monolithic vs Microservices**:
  - **Monolithic**: Tightly coupled components
  - **Microservices**: Loosely coupled components for better availability
- **Serverless Computing**:
  - Code runs on servers, but no need to provision or manage them
  - Focus on innovation instead of server maintenance
  - Automatic scaling
  - **AWS Lambda**: Run code without provisioning servers
- **Containers**:
  - Standard way to package application code and dependencies
  - **ECS**: Highly scalable container management system supporting Docker
  - **EKS**: Fully managed Kubernetes service
  - **Fargate**: Serverless compute engine for containers

### Module 3: Global Infrastructure and Reliability

- **Selecting a Region**:
  - Compliance with data governance and legal requirements
  - Proximity to customers (low latency)
  - Available services within a Region
  - Pricing
- **Availability Zones**: Single data center or group of data centers within a Region
- **Edge locations**: Sites that CloudFront uses to store cached copies of content
- **Ways to interact with AWS**:
  - **AWS Management Console**: Web-based interface
  - **AWS CLI**: Command-line interface for automation
  - **SDKs**: Software development kits for various programming languages

### Module 4: Networking

- **VPC (Virtual Private Cloud)**: Networking service to establish boundaries around AWS resources
  - **Subnets**: Sections of VPC containing resources (public/private)
  - **Internet Gateway**: Allows public traffic from internet
  - **Virtual Private Gateway**: Allows protected internet traffic for private resources
- **AWS Direct Connect**: Dedicated private connection between data center and VPC
- **Network ACLs**: Virtual firewall controlling traffic at subnet level (stateless)
- **Security Groups**: Virtual firewall controlling traffic for EC2 instances (stateful)
- **Route 53**: DNS web service for routing end users to applications

### Module 5: Storage & Databases

- **Instance stores**: Block-level storage physically attached to host (temporary, lost when instance terminates)
- **EBS**: Block-level storage volumes for EC2 (persistent)
- **EBS Snapshots**: Incremental backups
- **S3 Storage Classes**:
  - **Standard**: Frequently accessed data, stored in minimum 3 AZs
  - **Standard-IA**: Infrequently accessed, lower storage price, higher retrieval price
  - **One Zone-IA**: Single AZ, lower storage price
  - **Intelligent-Tiering**: Unknown or changing access patterns
  - **Glacier**: Low-cost archiving, retrieval in minutes to hours
  - **Glacier Deep Archive**: Lowest-cost, retrieval within 12 hours
- **RDS Database Engines**: Aurora, PostgreSQL, MySQL, MariaDB, Oracle, SQL Server
- **DynamoDB**: Key-value database, serverless, automatic scaling, single-digit millisecond performance
- **Redshift**: Data warehousing service for big data analytics
- **DMS Use Cases**:
  - Development and test database migrations
  - Database consolidation
  - Continuous replication

### Module 6: Security

- **Shared Responsibility Model**:
  - **AWS**: Compute, storage, database, networking, regions, AZs, edge locations
  - **Customer**: ACLs, encryption (client-side/server-side), traffic protection
- **IAM**:
  - Root user: Initial account owner (don't use for daily tasks)
  - IAM users, policies, groups, roles
  - Multi-Factor Authentication (MFA)
- **AWS Artifact**: On-demand access to security and compliance reports
- **DDoS Attacks**:
  - Centralized: Single source
  - Distributed: Multiple sources
  - **AWS Shield**: Protects against DDoS (Standard free, Advanced paid)
- **KMS**: Encryption operations through cryptographic keys
- **WAF**: Web application firewall monitoring network requests
- **Inspector**: Automated security assessments
- **GuardDuty**: Intelligent threat detection through continuous monitoring

### Module 7: Monitoring and Analytics

- **CloudWatch**: Monitor and manage metrics, configure alarms
  - CloudWatch Dashboard, Alarms, Logs, Metrics, Events, Application Monitoring, Insights
- **CloudTrail**: Records API calls with identity, time, source IP
- **Trusted Advisor**: Real-time recommendations based on AWS best practices

### Module 8: Pricing and Support

- Free trial: 12 months
- **AWS Lambda**: 1 million free requests and 3.2 million seconds of compute time per month

### Module 9: Migration and Innovation

- **6 Migration Strategies**:
  - Rehosting
  - Replatforming
  - Refactoring/re-architecting
  - Repurchasing
  - Retaining
  - Retiring

### Module 10: The Cloud Journey

- **AWS Well-Architected Framework** (5 Pillars):
  - Operational excellence
  - Security
  - Reliability
  - Performance efficiency
  - Cost optimization

</expand>

<expand title="AWS Certified Developer Associate">
## AWS Certified Developer Associate

- **Course Introduction**:
  - AWS = Cloud provider
  - Provides servers and services "on demand" and "scale easily"
  - Web with millions of users can be managed by 3-4 developers using AWS

- **IAM & AWS CLI**:
  - **IAM Permissions**: Users and Groups assigned JSON documents called policies
  - Policy example structure:
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": "ec2:Describe*",
          "Resource": "*"
        }
      ]
    }
    ```
  - **Note**: Do actions in separate objects, cannot add multiple actions in an array

</expand>

<expand title="Serverless Development">
## Serverless Development

- **Writing Code**:
  - System architecture
  - Design patterns
  - Frameworks and libraries

- **Managing Code**:
  - Tools (IDEs, SCM, debuggers)
  - Developer workflow
  - Test/deployment automation
  - Environment management

- **Lambda Function Structure**:
  - **Handler**: Function configuration, lambda-specific code, no business logic
  - **Controller**: Event processing, core business logic
  - **Service**: External integrations, service abstractions
  - Integration with DynamoDB

- **Serverless Application Framework**:
  - Code (Author) → Compiled App (Build) → Zip Archive (Package) → S3 Bucket → AWS Lambda (Deploy)
  - Author & Build: IDE + Build Tool
  - Package & Deploy: Application Framework

- **Code Repository Organization**:
  - Multiple Lambda functions and AWS resources per service
  - Give each service its own template
  - Use one repository per service and template

- **Development Environment Options**:
  - Option 1: Each developer connected to separate AWS account
  - Option 2: Single shared development account with multiple stacks

- **Testing and Debugging**:
  - **Test Hierarchy**:
    1. Local Testing (on local machine)
    2. Remote Integration Tests (AWS sandbox account)
    3. Automated Integration Testing (CI/CD pipeline across branches)
  - **Debugging**: Local debugging not possible in Lambda as in traditional apps
  - **SAM CLI**: Provides Lambda-like execution environment for local build, test, and debug
  - SAM CLI runs in Docker container

</expand>

<expand title="AWS Services Details">
## AWS Services Details

### EC2 Auto Scaling

- **General Points**:
  - Ensures correct number of EC2 instances available to handle load
  - Monitor resources using CloudWatch
  - **Scaling-Out**: Add more instances
  - **Scaling-In**: Terminate instances

- **Components**:
  - **Launch Configuration**: WHAT (AMI, Instance Type, Security Groups, Roles)
  - **Auto Scaling Group**: WHERE (VPC, Subnets, Load Balancer, Min/Desired instances)
  - **Auto Scaling Policy**: WHEN (Scheduled, On-Demand, Scale-Out/In policies)

- **Dynamic Auto Scaling Flow**: Elastic Load Balancing → CloudWatch → Auto Scaling → ELB (continuous)

### AWS Fargate

- **General Points**:
  - Service for deploying and managing containers
  - Run tasks in any environment
  - No need to think about underlying infrastructure

- **Networking**:
  - Tasks run in Customer VPC
  - Define subnets and security groups
  - ALB (Application Load Balancer) and NLB (Network Load Balancer) support
  - Each container works like an EC2 instance

- **Use Cases**:
  - Long running services
  - Highly variable workloads
  - Monolithic app portability
  - Batch jobs and Microservices

### AWS Lambda

- **General Points**:
  - Code run on AWS is called Lambda function
  - Part of "Compute" domain
  - Supports: Node.js, Python, Java, C#, Go
  - Helps when projects grow in size

- **Applications**:
  - Process images when uploaded to S3 (thumbnails based on device)
  - Analyze social media data (trending hashtags)
  - Backing up data (near real-time backups)

- **How it Works**:
  - Requests given to containers to handle
  - Container contains user-provided code
  - Package code and dependencies as container image (Docker CLI)
  - Upload image to Amazon ECR
  - Flow: Clients → Multiple requests → Lambda → Multiple containers
  - Number of requests proportional to number of containers

- **Limitations**:
  - Default deployment package size: 50 MB
  - Ephemeral disk space: 512 MB
  - Memory range: 128 MB to 10,240 MB
  - Maximum execution timeout: 15 minutes

### Cognito

- **General Points**:
  - Provides authentication, authorization, and user management for web and mobile apps
  - Users can sign in with username/password or third party (Facebook, Amazon, Google, Apple)

- **Components**:
  - **User Pool**:
    - Sign-up and sign-in services
    - Built-in customizable web UI
    - Social sign-in (Facebook, Google, Amazon, Apple, SAML, OIDC)
    - User directory management and profiles
    - Security features (MFA, compromised credentials checks, account takeover protection)
    - Customized workflows through AWS Lambda triggers
    - Can authenticate users, access server-side resources, API Gateway, Lambda, AWS services, AppSync

  - **Identity Pool**:
    - Grants users access to other AWS services through temporary credentials
    - Provides: Cognito user pools, Developer authenticated identities

- **Working Flow**:
  1. User signs in through user pool → receives user pool tokens
  2. App exchanges user pool tokens for AWS credentials through identity pool
  3. User can use AWS credentials to access AWS services (S3, DynamoDB, etc.)

- **User Pool Attributes**: Username, Email, Phone Number, Name, Given Name, Family Name, Preferred Username, Enabled, Status

- **Tags**: Metadata labels for categorizing and managing user pools

### AWS Amplify

- **General Points**:
  - Full-stack development platform for mobile and web applications
  - Similar to Firebase - provides backend services and deployment
  - JS library that speeds up development
  - Integrates with GraphQL, Authentication, Storage, Hosting

- **Requirements**:
  - AWS IAM account
  - Install Amplify CLI: `npm install -g @aws-amplify/cli`
  - Configure: `amplify configure`

- **Commands**:
  - `amplify init`: Initialize new Amplify project
  - `amplify status`: Show current status of Amplify resources
  - `amplify env list`: List all environments
  - `amplify env checkout <env-name>`: Switch between environments
  - `amplify add function`: Add new Lambda function
  - `amplify update api`: Update existing API configuration
  - `amplify console api`: Open API console in browser
  - `amplify mock function <function-name>`: Test function locally
  - `amplify api gql-compile`: Compile GraphQL schema
  - `amplify codegen`: Generate code from GraphQL schema

- **GraphQL Model Creation**: Updates schema.graphql, API.service.ts, mutation.graphql, queries.graphql, subscriptions.graphql

- **Modules**:
  - Auth, Analytics, Storage, API (GraphQL + REST), Caching, UI Components, DataStore, Managed Hosting, Functions, CI/CD, Push Notifications, PubSub, Interactions, Predictions

### AWS AppSync

- **General Points**:
  - Enterprise-level, fully managed GraphQL service
  - Real-time data synchronization and offline programming features
  - Robust, scalable GraphQL interface
  - Combines data from multiple sources (DynamoDB, Lambda, HTTP APIs)
  - Efficient data caching

### AWS Amplify vs Google Firebase

- **Ease of Use**: Amplify uses Lambda functions (need coding knowledge) vs Firebase (complete boilerplate, no coding needed)
- **Flexibility**: Amplify offers more customization vs Firebase (pre-configured, less customization)
- **Features**: Amplify has fewer features vs Firebase (larger pool of services)
- **Development Time**: Amplify higher vs Firebase less
- **Scale**: Amplify for big to enterprise projects vs Firebase for medium to small projects
- **Pricing**: Amplify slightly cheaper vs Firebase may not be optimized
- **Data Tasks**: Amplify highly suited for Big Data and ML vs Firebase not best
- **Databases**: Amplify supports SQL and NoSQL vs Firebase only NoSQL
- **Developer Community**: Amplify much less vs Firebase huge
- **APIs**: Amplify GraphQL + REST vs Firebase only REST
- **AWS Integration**: Amplify easy vs Firebase slightly complex
- **Flutter Support**: Amplify in preview vs Firebase robust support
- **Storage**: Amplify uses S3 vs Firebase uses Google Cloud
- **Open Source**: Amplify open-source vs Firebase proprietary

</expand>

<expand title="AWS Best Practices">
## AWS Best Practices

- **Security in Lambda**:
  - Use AWS IAM (Identity Access and Management)
  - Grant specific user access to particular roles

- **Elastic Block Storage in Lambda**:
  - Virtual storage area network where tasks can be started
  - Tolerates faults easily
  - No worry about data loss even if disk damaged in RAID

- **Lambda Failure Handling**:
  - **Synchronous mode**: Function failure gives exception to calling application
  - **Asynchronous mode**: Function retried at least three times on failure

- **Lambda Function Execution**:
  - Can be invoked by: Lambda console, Lambda API, AWS SDK, AWS CLI, AWS toolkits

- **Improving Lambda Performance**:
  - Use RAID (Linux software)
  - Helps increase security

- **AMI Understanding**:
  - AMI (Amazon Machine Image) provides information required to launch an instance
  - Can launch multiple instances using AMI when there are multiple vendors
  - Instance: Virtual machine with particular specifications and OS
  - AMI: Complete backup of an instance

</expand>

<expand title="References">
## References

- AWS Events Channel: https://www.youtube.com/@AWSEventsChannel
- Introduction to AWS Services: https://www.youtube.com/watch?v=Z3SYDTMP3ME

</expand>
