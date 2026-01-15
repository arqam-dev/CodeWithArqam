# Blockchain

## Primary Concepts

<expand title="Introduction to Blockchain">
## Introduction to Blockchain

- **What It Is**: Technology for creating shared, distributed digital ledgers
- **Age**: A little over 10 years old (since 2008)
- **Origin**: Created as underlying technology for Bitcoin cryptocurrency
- **Beyond Cryptocurrency**: Now used for many purposes beyond finance

- **Common Misunderstandings**:
  - Not just about financial transactions
  - Not just about electronic contracts
  - Not just about Bitcoin (though that's where it started)
  - Not limited to finance

- **Key Point**: Blockchain is the technology; Bitcoin is one application of it
- **Business Focus**: Most businesses using blockchain have nothing to do with cryptocurrency

</expand>

<expand title="History and Origins">
## History and Origins

- **Original White Paper (2008)**: 
  - Published by Satoshi Nakamoto (unknown person or group)
  - Title: "Bitcoin: A Peer-to-Peer Electronic Cash System"
  - Only 8 pages long
  - Word "blockchain" doesn't appear (but "block" and "chain" do)
  - Described technology needed to make Bitcoin possible
  - That underlying technology is what we now call blockchain

- **Similar to World Wide Web**:
  - Web was invented for scientists at CERN to share experiment information
  - Now used for countless purposes
  - Blockchain was invented for Bitcoin
  - Now applied to many different situations

- **Unconventional Adoption**:
  - Didn't follow slow, conventional business adoption
  - Associated with cryptocurrency volatility and sensational news
  - But serious work is being done
  - Major companies investing: IBM, Microsoft, Amazon

</expand>

<expand title="The Ledger Problem">
## The Ledger Problem

- **Traditional Ledgers**:
  - Used for hundreds of years to track accounts and transactions
  - Create permanent record with full history
  - Never change old entries, just add new ones
  - Track: dates, amounts, parties involved, ownership, loans, assets

- **Problems with Physical Ledgers**:
  - Can be damaged or lost
  - Can be filled out incorrectly
  - Can have intentional deception (changing old entries)
  - **Biggest Problem**: Inconsistency between different parties' ledgers
    - Example: I say I paid, you say I didn't
    - Whose ledger is correct?

- **Solution: Trusted Third Parties**:
  - Involve neutral third party as single source of truth
  - Examples: Banks, credit card companies, escrow companies
  - **Cost**: Third parties need to be paid (adds cost and delay)
  - **Institutionalized**: Part of how commerce works now

- **The Thought Exercise**:
  - What if there was one shared ledger?
  - Whatever I write appears in your ledger
  - Whatever you write appears in mine
  - Once written, neither can delete or change it
  - **Result**: No need for middleman, cheaper, quicker, more transactions possible

</expand>

<expand title="What Blockchain Does">
## What Blockchain Does

- **Distributed Ledger**: 
  - Shared digital ledger duplicated across many computers
  - When anyone adds new entry, automatically copied to all participants
  - Each participant is called a "node"

- **Decentralized**:
  - Not owned by one person or organization
  - No single administrator
  - No master location
  - Everyone is a peer
  - New transactions can be added anywhere in network
  - Automatically copied peer-to-peer

- **Single Source of Truth**:
  - Shared, incorruptible, secure, authoritative ledger
  - Includes full history
  - Authoritative record of proof
  - Don't need to trust individual parties
  - Just need to trust the ledger itself

- **Scale**: 
  - Can be between 2 people, 10, 100, or thousands
  - Can be completely public
  - Bitcoin blockchain: tens of thousands of nodes

- **Key Difference from Databases**:
  - Conventional database: owned by one organization, single administrator
  - Blockchain: decentralized, no one in charge, distributed across network

</expand>

<expand title="Blocks and Chains">
## Blocks and Chains

- **What is a Block?**:
  - Small amount of data
  - Way to batch together recent transactions
  - Each block can hold hundreds to thousands of transactions
  - Like a page in a physical ledger

- **The Chain**:
  - Blocks added one after another
  - Always added in sequence (at the end)
  - Cannot add block in middle
  - Cannot rearrange existing blocks
  - Cannot delete or edit earlier blocks
  - **Append Only**: Can only add to the end

- **Why Chain Structure?**:
  - Provides current state AND full history
  - Like physical ledger: never change old entries
  - If error found, add new transaction to reverse it
  - Don't delete or change old entries

- **The Question**: 
  - If blockchain shared across thousands of computers
  - What stops someone from changing an earlier block?
  - Answer: Cryptographic hashing

</expand>

<expand title="Cryptographic Hashing">
## Cryptographic Hashing

- **What is Hashing?**:
  - Take data, perform calculations, get small result
  - Result looks random but based on original data
  - Like chopping ingredients and mixing them up (cooking hash analogy)

- **Key Properties**:
  - **Repeatable**: Same data always gives same hash
  - **Sensitive**: Tiny change in data gives completely different hash
  - **Smaller**: Hash is much smaller than original data
  - **Not Reversible**: Cannot get original data back from hash (not encryption)

- **Why Use Hashing?**:
  - Acts as signature or fingerprint of data
  - Way to verify data hasn't been tampered with
  - Compare hash now vs hash later - if match, data unchanged
  - If different, data was tampered with

- **How Blockchain Uses Hashing**:
  - Each transaction has its own hash
  - Each block has its own hash
  - Each new block stores hash of previous block
  - **Result**: If you change one tiny piece of earlier data:
    - Transaction hash changes
    - Block hash changes
    - Next block's stored hash no longer matches
    - Domino effect on all subsequent blocks
    - **Makes blockchain very resistant to tampering**

</expand>

<expand title="Public vs Private, Permissioned vs Permissionless">
## Public vs Private, Permissioned vs Permissionless

- **Multiple Blockchains**:
  - There isn't just one blockchain
  - Can have independent blockchains for different purposes
  - Bitcoin blockchain, Ethereum blockchain, company supply chain blockchain
  - Each is separate distributed ledger

- **Public vs Private**:
  - **Public**: No access restrictions, no authentication required, anyone can access
  - **Private**: Restricted access, requires authentication
  - Bitcoin uses public blockchain

- **Permissioned vs Permissionless**:
  - **Permissionless**: Don't need permission to use (like Bitcoin)
  - **Permissioned**: Access controlled, unique identity for each allowed user
  - **Business Use**: More common to have permissioned blockchain
  - **Different Permission Levels**:
    - Some users: read only
    - Some users: read specific sections only
    - Some users: can append new data
    - Fine-grained control

</expand>

<expand title="Business Use Cases">
## Business Use Cases

- **Healthcare**:
  - Manage medical records as shared ledger
  - Shared between: individuals, medical professionals, hospitals, insurance companies
  - Tight permissions control what each party can see
  - How long they can see it
  - Maintains compliance with privacy regulations
  - **Problems Solved**:
    - Out-of-date patient addresses
    - Conflicting medical histories
    - Different medication lists
    - Different allergy lists
  - **Benefit**: Everyone has trustable, up-to-date information

- **Digital Assets**:
  - Trusted record of when something was created
  - Who created it, who purchased it
  - Digital rights and royalties management
  - Document and media tracking

- **Supply Chain Management**:
  - Track materials, supplies, components, products
  - Many participants: raw material providers, factories, transportation, warehousing, customs, distributors, retailers
  - **Challenge**: Orchestrating many companies, integrating their systems
  - **Blockchain Solution**: 
    - Shared ledger automatically replicated across all participants
    - Each keeps own systems but can add to ledger
    - Everyone sees current state
    - Better tracking, inventory data, predictions
    - Timestamped entries identify inefficiencies
    - Simplifies adding new participants

- **Insurance Example**:
  - Two cars in accident, both contact insurance companies
  - Each company documents independently
  - Result: Different descriptions of same accident
  - **Blockchain Solution**: 
    - Consortium of insurance companies
    - Shared access to same records in real time
    - Single source of truth
    - Only members and applicable parties (like police) have access

- **Coffee Supply Chain Example**:
  - Farmer creates profile with biometrics
  - Barcode generated with farm and coffee information
  - Temperature, humidity scanned at each step
  - Full traceability from farm to store
  - Consumer can see entire story
  - Can reward farmer directly
  - Turns one-way supply chain into circular supply chain

</expand>

<expand title="Smart Contracts">
## Smart Contracts

- **What They Are**:
  - Not just digitized PDF contracts
  - Mini-computer programs stored on blockchain
  - Predefined list of rules controlling business transactions
  - Written in code

- **Why "Smart"?**:
  - Execute automatically based on rules
  - No intermediary needed
  - Fully automatic
  - Once on blockchain, cannot be changed

- **Examples**:
  - When person A transfers amount to person B → automatically transfer ownership record
  - Rules based on specific date or time
  - Rules based on asset value
  - Automatic execution when conditions met

- **Built into Platforms**: 
  - Feature in many blockchain platforms and services
  - Already available for use

</expand>

<expand title="Blockchain Platforms">
## Blockchain Platforms

- **Major Cloud Providers**:
  - IBM Blockchain Platform
  - Microsoft Azure Blockchain
  - Amazon Managed Blockchain
  - Provide infrastructure and services

- **Other Platforms**:
  - **Ethereum**: Popular blockchain platform
  - **Hyperledger Fabric**: Enterprise-focused
  - **Corda**: Financial services focused
  - All provide underlying blockchain technology
  - You build applications on top

- **Purpose**: 
  - Simplify blockchain technology
  - Handle distributed ledger technology
  - Don't define what you do with it
  - Enable organizations to build own applications

</expand>

## Secondary Concepts

<expand title="Benefits of Blockchain">
## Benefits of Blockchain

- **Three Main Benefits**:

  1. **Reinvents Products and Processes**:
     - Transforms business ecosystems
     - Shared source of truth
     - Eliminates need for intermediaries
     - Reduces costs and delays

  2. **Increases Transparency**:
     - Shared view across companies of all events
     - Consumers can validate product authenticity
     - Build trust in brand values (sustainability, fair labor)
     - Full history accessible (e.g., strawberries from farm to store)
     - Better traceability for recalls

  3. **Improves Productivity and Quality**:
     - Simplifies access to information
     - Reduces redundant processes
     - Eliminates reconciliation steps
     - Better data quality
     - More efficient operations

</expand>

<expand title="How Blockchain Works (Summary)">
## How Blockchain Works (Summary)

- **Shared Distributed Ledger**: Data duplicated across network
- **Cryptography and Hashing**: Ensures tamper-evident
- **Append Only**: Allows additions, prevents changes to previous blocks
- **Consensus**: Automated agreement within network to verify additions
- **Tokenization**: Digital tokens represent things of value
- **Smart Contracts**: Business logic written in code, executes automatically

</expand>

<expand title="Blockchain with Other Technologies">
## Blockchain with Other Technologies

- **Artificial Intelligence**:
  - Anonymized data on blockchain provides holistic dataset
  - AI can revolutionize diagnosis and treatment planning
  - Better data for machine learning

- **Cloud Computing**:
  - Multi-party systems can run locally or in cloud
  - **Blockchain as a Service (BaaS)**: Cloud offerings
  - Automated deployment to existing cloud infrastructure

- **Internet of Things (IoT)**:
  - Embedded sensors automatically capture data
  - Example: Farmer uses IoT equipment to capture climate information
  - Measurements automatically recorded on blockchain
  - Proves quality, allows digital quality seal
  - Consistent, reliable data capture

</expand>

<expand title="Future Outlook">
## Future Outlook

- **Will Blockchain Still Matter?**: 
  - Yes, but may talk about it less
  - Not because it goes away
  - Because it becomes part of technology landscape
  - Like TCP/IP: used every day, but people don't think about it

- **Vital Part of Systems**:
  - Will be part of more and more systems
  - Despite cryptocurrency hype, core value is real
  - Shared, distributed, tamper-evident ledger with high trust
  - Incredibly useful

- **Early Days**:
  - Only begun to realize all applications
  - More use cases being discovered
  - Technology still evolving

- **Business Revolution**:
  - Part of overall business transformation
  - Combining with AI, cloud, IoT will be game-changing
  - Opportunity to reinvent how organizations share information
  - Execute business transactions

</expand>

<expand title="Key Characteristics">
## Key Characteristics

- **Distributed**: Data shared across multiple computers
- **Decentralized**: No single owner or administrator
- **Tamper-Evident**: Cryptographic hashing makes changes obvious
- **Append Only**: Can add, cannot change or delete
- **Consensus-Based**: Network agrees on additions
- **Transparent**: All participants see same data
- **Trustless**: Don't need to trust individual parties, trust the system
- **Immutable**: Once recorded, cannot be altered

</expand>