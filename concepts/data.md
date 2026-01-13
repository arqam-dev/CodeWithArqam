# Data

## Primary Concepts

<expand title="Overview of Data">
## Overview of Data

### What is Data?

- **Definition:** Any and all facts, statistics, values, individual pieces of information
- **Forms:** Numbers, dates, words, sentences, documents, images, audio, video
- **Usage:** Word "data" used in computing regardless of singular/plural
- **Context:** Often used interchangeably with "information" in common usage

### Key Terms in Data

- **Database:** Organized system for storing and managing data
- **Big Data:** Large-scale data with specific characteristics
- **Data Warehouse:** Central repository for analytics and reporting
- **Data Lake:** Repository for structured and unstructured data
- **Data Literacy:** Skills for working with data
- **Data Strategy:** Overall approach to capturing, storing, and using data
- **Data Governance:** Policies and procedures for data management

### Modern Context

- **Shift in Perspective:** Data is an asset, not just a cost center
- **Business Value:** Data is the new oil, currency, capital
- **Organizational Role:** Not just IT function—business strategy
- **Cultural Change:** Moving from restrictive to accessible data culture

</expand>

<expand title="Data vs Information">
## Data vs Information

### The Distinction

**Data:**
- Raw facts, statistics, values
- Without context or meaning
- Example: The number 73 (could be age, temperature, house number, etc.)
- Example: The word "Baker" (could be surname, profession, street name)

**Information:**
- Data with context and explanation
- Answers "What is it?"
- Provides meaning and understanding

### DIKW Pyramid

**Model:** Data → Information → Knowledge → Wisdom

- **Data:** Raw facts and values
- **Information:** Contextualized data (what is it?)
- **Knowledge:** Understanding how to apply information
- **Wisdom:** Deeper understanding and insight

**Business Focus:**
- Move from data to information
- Then from information to insight and business value
- Goal: Deeper understanding, not just facts

### Practical Usage

- **Common Practice:** Use "data" and "information" interchangeably
- **Useful Concept:** Understanding the progression from raw data to actionable insights
- **Business Value:** Transform data into information, then into knowledge and decisions

</expand>

<expand title="Business Value of Data">
## Business Value of Data

### Three Categories of Value

**1. Cheaper:**
- Identify efficiencies in supply chain or purchasing
- Reduce time and expense
- Optimize existing processes

**2. Better:**
- Reveal improvements in products or services
- Identify new products or services
- Enhance offerings

**3. Smarter:**
- Make better decisions
- Understand customers, business, employees
- Gain insights into abilities and health

### Overlap

- Categories can overlap but don't have to
- Can focus on one area (e.g., efficiency) without changing products/services
- Value comes from changing behavior based on data insights

### Modern Approach

- **Past:** Only capture data you know you'll use
- **Present:** Capture more data without being totally sure what you'll do with it
- **Benefit:** Future value from data you didn't initially plan for
- **Attitude Shift:** Data as potential asset, not just immediate need

</expand>

<expand title="History and Evolution of Data Management">
## History and Evolution of Data Management

### Early Record Keeping

**Historical Example:**
- Church ledgers from 1500s
- Freeform journal entries (unstructured)
- Mixed records: births, marriages, deaths, crop failures, donkey illnesses
- Difficult to search and analyze

### Evolution to Structure

**Progression:**
1. **Unstructured:** Freeform journal entries
2. **Separated:** Different books for births, marriages, deaths
3. **Organized:** Columns for easier searching
4. **Formalized:** Printed numbered sheets with rows and columns (mid-1800s)
5. **Computerized:** Electronic storage of well-defined data

### Phase One: Replication

- **Approach:** Replicate existing paper records electronically
- **Benefit:** Faster, more reliable access
- **Example:** Query for "top 3 causes of death 1750-1850" takes minutes instead of months
- **Value:** Even basic approach was incredibly valuable

### Phase Two: Day-to-Day Operations

- **Expansion:** Beyond archival records to operational data
- **Challenge:** New set of problems to solve
- **Evolution:** From recordkeeping to business intelligence

</expand>

<expand title="Databases and Data Management">
## Databases and Data Management

### What is a Database?

**More Than Storage:**
- Not just a place to put data (could use a folder for that)
- Organized system that helps with:
  - Keeping data organized
  - Security
  - Reliable access
  - Sharing between hundreds/thousands of people
  - Managing conflicts
  - Quick access to specific parts

### Database Management Systems (DBMS)

**Long-Lasting Products:**
- IBM DB2 (1983) - still relevant today
- Oracle (1979) - continuously relevant
- Microsoft SQL Server (1980s) - still in use
- PostgreSQL (1980s) - popular open-source option

**Reality:** Products from 30-40 years ago still completely relevant

### Relational Database Management Systems (RDBMS)

- **Type:** Most common traditional database type
- **Characteristics:** Shared basic ideas about what database should be
- **Success:** Incredibly successful and long-lasting
- **Limitations:** Not great at everything (led to new database types)

</expand>

<expand title="Data Silos and Data Warehouses">
## Data Silos and Data Warehouses

### Data Silos

**Definition:** Department-by-department solutions with separate systems

**Characteristics:**
- Each department has own system (accounting, marketing, sales, HR)
- Independent and disconnected
- Self-contained and walled off
- Incompatible technologies
- Difficult to integrate later

**Problems:**
- No cross-department access
- Duplicate data
- Inconsistent information
- Limited organization-wide insights

### Data Warehouse

**Definition:** Central repository of integrated data from multiple sources

**Characteristics:**
- Pulls data from multiple sources
- Contains both current and historical data
- **Not for:** Day-to-day operations
- **Purpose:** Analytics and reporting across entire organization

**Benefits:**
- Organization-wide insights
- Integrated view of business
- Historical analysis
- Supports business intelligence

**Approach:** Keep existing operational systems, add central warehouse for analysis

</expand>

<expand title="Structured vs Unstructured Data">
## Structured vs Unstructured Data

### Structured Data

**Definition:** Well-defined, formal data with clear structure

**Characteristics:**
- Specific format and schema
- Defined data types (name, date, number)
- Validation rules (min/max values, required/optional)
- Examples: Birth records, financial transactions, customer databases

**Advantages:**
- Easy to query and analyze
- Consistent format
- Reliable for operations

**Limitations:**
- Requires upfront definition
- Less flexible
- Hard to change structure

### Unstructured and Semi-Structured Data

**Semi-Structured Example: Email**
- **Structured Parts:** From address, to address, subject, date/time
- **Unstructured Parts:** Body (text, images, audio, video, formatting)
- **Flexibility:** Can't define everything upfront

**Unstructured Data:**
- Documents, images, audio, video
- Social media posts
- Freeform text
- No predefined structure

**Modern Need:**
- Store flexible data without defining everything upfront
- Ask questions about it later
- Support variety of data types

**Approach:** Store first, structure later when needed

</expand>

<expand title="Big Data">
## Big Data

### Definition

- **Common Description:** Data of at least 1 petabyte (1 million gigabytes)
- **Reality:** Size is least interesting aspect
- **Key Point:** New approach and tools valuable even with modest amounts of data

### The Three Vs (and Fourth V)

**Volume:**
- Size of data
- Easy to understand
- Least interesting aspect

**Variety:**
- Different types of data
- Multiple sources
- Structured, unstructured, semi-structured

**Velocity:**
- Speed data arrives
- Unpredictable times
- Potentially 24/7 from all over the world
- Real-time or near-real-time

**Veracity (Fourth V):**
- Reliability and quality of data
- Data quality concerns
- Applies to all data, not just big data

### Sources of Big Data

- Phones and wearable devices
- Partners and vendors (pushed or pulled)
- Social media
- Online publications
- Multiple formats and structures

### Key Insight

- **Not Just Size:** About different types, unpredictable data, multiple sources, high speed
- **Applies to All Data:** Variety, velocity, veracity matter even without petabytes
- **Most Businesses:** Won't have petabytes, but still need strategy for these characteristics

</expand>

<expand title="Data Strategy">
## Data Strategy

### What is a Data Strategy?

- **Definition:** Overall approach, policies, and guidelines for capturing, storing, and working with data
- **Level:** Organization-level (though may need to work at team/project level)
- **Purpose:** Avoid data silo problems, provide guidance

### Data as an Asset

**Shift in Perspective:**
- **Old View:** Data is IT function, expensive office supplies, cost center
- **New View:** Data is an asset (new oil, currency, capital)
- **Questions to Ask:**
  - How do we obtain this asset?
  - How do we build it?
  - How do we protect it?
  - How do we make the most of it?

### Chief Data Officer (CDO)

- **Role:** Enterprise-level perspective on information as asset
- **Focus:** How to capture and manage data
- **Support:** Board-level involvement needed

### Three Aspects of Data Strategy

**1. Capture/Collect:**
- **Past:** Focus on efficiency, store only necessary data
- **Present:** Wide-ranging, broad capture approach
- **Approach:** Predictive and experimental about future usefulness
- **Example:** Store order details + time to purchase + visits before purchase + items viewed

**2. Clean and Prepare:**
- **Most Important Aspect:** Data cleaning is critical
- **Data Scientist Time:** 75-80% spent on curation, capture, preparation, cleaning
- **Machine Learning:** Vital to clean data before training
- **Tools Help:** But don't understand data for you

**3. Capitalize:**
- **Value Extraction:** How to obtain value from data
- **Analysis and Reporting:** What kind of analysis to support
- **Access:** Who has access (internal/external)
- **Data Trading:** Do we sell or trade data?

### Governance and Compliance

**Internal Policies:**
- Allowed and disallowed use of data
- For employees, vendors, partners

**Regulatory Requirements:**
- Industry-specific (finance, healthcare)
- General regulations (GDPR, privacy, consent)
- Legal requirements for access, storage, auditing

</expand>

<expand title="Data Quality and Cleaning">
## Data Quality and Cleaning

### Importance

- **Most Critical Aspect:** Data cleaning is the most important part of working with data
- **More Important Than Ever:** Especially with unstructured data
- **Reality:** Can't filter and curate everything upfront

### Data Scientist Reality

- **Time Spent:** 75-80% on curation, capture, preparation, and cleaning
- **Not Just Analysis:** Most time is preparation, not deep analysis
- **Machine Learning:** Vital to clean data before training models
- **Tools Help:** But don't understand data for you

### Data Quality Issues

**Problems:**
- Invalid values
- Missing values
- Conflicting information
- Garbage data

**Principle:** Garbage in, garbage out

**Impact:**
- Poor data = poor results
- Doesn't matter how good algorithms are
- Quality is foundation for everything else

### Process

1. **Capture:** Collect data (may be unstructured)
2. **Curate:** Organize and filter
3. **Clean:** Remove invalid, missing, conflicting data
4. **Prepare:** Format for analysis or machine learning
5. **Validate:** Ensure data is useful and correct

</expand>

<expand title="Data Access and Culture">
## Data Access and Culture

### Shift in Access

**Past Approach:**
- Very strict controls
- Data only accessible to select group
- Limited to specific applications

**Modern Approach:**
- More wide-ranging access to internal data
- Support experimentation and discovery
- Don't need to define use in advance

### Data Culture

**Data Literacy:**
- Skills not limited to developers and IT
- Accessible to wider set of business users
- Self-service education and support
- Technical skills for employees with business knowledge

**Benefits:**
- Existing employees with valuable business context gain technical skills
- More people can explore and analyze data
- Better use of organizational knowledge

### Data Visualization

- **Purpose:** Make results understandable to non-technical stakeholders
- **Skill:** Choosing what data to display and how
- **Tools:** Getting better, but still requires individual ability
- **Goal:** Tell data story, transform data → information → knowledge

### Customer Impact

**Ethical Considerations:**
- Public awareness of data capture and use
- Perception of data monetization and manipulation
- Impact on trust

**Future Requirements:**
- More regulatory requirements about data ownership
- Customer-generated data ownership questions
- Need for transparency and ethical use

**Balance:**
- Broad data capture strategy (useful for business)
- Customer trust and ethical considerations
- Regulatory compliance

</expand>

<expand title="Data Platforms">
## Data Platforms

### What is a Data Platform?

- **Definition:** System for managing, accessing, and working with data
- **Options:** Can be developed in-house or use commercial services
- **Purpose:** Support data strategy and data culture

### Key Characteristics

**Authentication and Permissions:**
- Strong authentication built in
- Single sign-on approach
- Control who accesses each data source
- Audit and logging capabilities

**Data Governance:**
- Manage and report on what data exists
- Track what is being collected
- Support data protection and privacy requirements (GDPR)

**Reporting and Dashboards:**
- Automatic delivery of information
- Visual representations
- Interactive and animated visuals

**API Access:**
- Application Programming Interface
- Allow other systems to access data
- Not just user interface, but programmatic access

### Data Lake

**Definition:** Repository for structured and unstructured data

**Characteristics:**
- Don't have to structure data first
- Pour everything into the lake
- General repository and sandbox
- Run different types of analytics and experiments

**Use Cases:**
- Visualizations
- Dashboards
- Different kinds of reporting
- Experimentation

**Note:** Not all platforms provide data lake, not all organizations need it

### Value Perspective

- **Mindset:** Think about what data platform would look like in your organization
- **More Useful Than:** Statistics about petabytes uploaded to YouTube
- **Focus:** Real business value, not impressive numbers
- **Asset View:** Data as new oil, currency, capital

</expand>
