# Security

## Primary Concepts

<expand title="Overview of Security">
## Overview of Security

### What is Security?

Security (also called information security, cybersecurity, or InfoSec) is about protecting the systems and information that businesses rely on. This includes protection from malicious actors, bad decisions, and even bad luck.

### Scope of Modern Security

- **Hardware:** Laptops, phones, printers, smart locks, security cameras, thermostats
- **Software:** Applications, cloud services, AI tools, shadow IT
- **Data:** Intellectual property, customer data, employee information, strategic plans, contracts, financial records
- **Systems:** All systems that store and transmit business-critical information

### Key Challenge

Modern systems must be connected and accessible to teams, clients, and contractors globally. What makes them powerful also makes them vulnerable. Security isn't about locking everything down—it's about enabling safe operations in a world full of evolving risks.

### Beyond Personal Habits

Security extends beyond:
- Strong passwords
- Not clicking suspicious links
- Individual security awareness

It encompasses organizational security, business processes, and how every role contributes to overall security posture.

</expand>

<expand title="Threat Actors and Attack Vectors">
## Threat Actors and Attack Vectors

### Who Are Threat Actors?

**Threat Actor:** General term for anyone trying to compromise a system, covering:
- Individual attackers (amateur to professional)
- Organized criminal groups
- Nation-state actors (North Korea, Russia, Iran)
- Internal threats (disgruntled employees, contractors with retained access)

### Attack Vectors

**Definition:** Specific paths or approaches attackers use to gain access

**Common Examples:**
- Phishing emails
- Stolen credentials
- Unpatched vulnerabilities
- Physical access to devices
- Contractor accounts never disabled
- Weak points that go unnoticed

**Analogy:** Like a house—attackers don't use the front door. They look for side windows, basement latches, default codes.

### Internal Threats

- Employees uploading sensitive data to personal cloud drives
- Contractors with access after contract ends
- Frustrated team members deleting files on their last day
- Often as damaging as external breaches

### Attacker Motivations

- **Financial:** Ransomware, stealing valuable data
- **Disruption:** Taking down systems for political points
- **Access:** Long-term spying, stealing, planning future attacks
- **Chaos:** Breaking things just because they can

### Advanced Persistent Threats (APT)

- **Definition:** Long-term, hidden attacks by sophisticated actors
- **Characteristics:** 
  - Not quick hits
  - Stay hidden for weeks, months, or years
  - Move carefully
  - Maintain access for future actions
- **Common Perpetrators:** Nation-state actors

### Attack Surface

- **Definition:** Every system, login, and habit that could be exploited
- **Reality:** Automated scripts constantly scan for weak spots
- **Not Personal:** Attacks aren't targeted—they're like shaking every doorknob to see which opens
- **Cascade Effect:** Your compromised account can become a bridge to others' data

</expand>

<expand title="Impact of Security Breaches">
## Impact of Security Breaches

### Beyond Data Theft

While data breaches are serious, attacks can cause other critical impacts:

### Operational Disruption

**Ransomware Examples:**
- **Colonial Pipeline (2021):** Forced shutdown of fuel distribution across US East Coast
  - People lined up for gas
  - Flights delayed
  - Businesses couldn't get deliveries
  - State of emergency declared

- **Ireland Healthcare System (2021):** More than 50 hospitals locked out
  - Medical staff back to pencil and paper
  - Appointments canceled
  - No access to patient records, scans, test results
  - Traced to single email with infected spreadsheet
  - Attackers waited 2 months before launching ransomware

### Impact Categories

**Technical:** System failures, data loss, service disruption

**Operational:** Business processes halted, supply chain disruption

**Reputational:** Loss of trust, customer confidence damaged

**Physical:** In critical infrastructure, can affect public safety

**Financial:** Millions in costs, legal issues, regulatory penalties

### Why This Matters

Security failures aren't just IT problems—they can become infrastructure crises, care failures, or business disasters depending on the industry and systems affected.

</expand>

<expand title="Zero Trust Security Model">
## Zero Trust Security Model

### Traditional Model

- **Approach:** Once inside the network, you're trusted
- **Process:** Connect to Wi-Fi/VPN and login → full access assumed
- **Analogy:** Show ID once at building entrance → access to any office, cabinet, key
- **Problem:** If attacker gets in, they have broad access

### Zero Trust Model

- **Principle:** Being in the network doesn't mean access to everything
- **Approach:** Every access request is treated as potentially risky
- **Verification:** Continuously checks:
  - Who you are
  - What device you're using
  - How you're connecting
  - Whether the request makes sense
- **Trust:** Earned continuously, not granted once

### Characteristics

- **Repeated Authentication:** May need to reauthenticate multiple times per day
- **Feels Untrusting:** System doesn't trust by default (by design)
- **Not Bad Design:** Intentional choice to reduce risk
- **No Free Passes:** No session, access point, or device gets automatic trust

### Benefits

- **Assumes Breach:** Plans for inevitable compromise
- **Limits Blast Radius:** Contains damage when breach occurs
- **Prevents Lateral Movement:** Makes it hard for attackers to move around
- **Mindset Shift:** From "keep people out" to "contain damage when they get in"

### AI-Enhanced Attacks

- **Phishing:** AI-generated emails matching company tone and vocabulary
- **Fake Documents:** Resumes, invoices, credentials that look authentic
- **Voice Cloning:** Spoofed phone calls using cloned voices from recordings
- **Scale:** Thousands of attempts per day, adjusting on the fly
- **Defense:** AI also used to scan logs, detect patterns, respond faster

</expand>

<expand title="CIA Triad: Confidentiality, Integrity, Availability">
## CIA Triad: Confidentiality, Integrity, Availability

### Framework Overview

The CIA Triad forms the backbone of security decisions:
- **C**onfidentiality
- **I**ntegrity  
- **A**vailability

### Confidentiality

- **Definition:** Only the right people can access the right things
- **Examples:** 
  - Customer records
  - Internal files
  - Application installation permissions
- **Goal:** Keep the right people in, wrong people out

### Integrity

- **Definition:** Information hasn't been tampered with
- **Examples:**
  - Reporting dashboards show real data
  - Documents aren't secretly altered
  - Systems behave as expected
- **Goal:** Ensure what we're seeing is real and unaltered

### Availability

- **Definition:** Systems are up and running when needed
- **Examples:**
  - Clients can access your site
  - Teams can use core tools
  - Critical systems remain operational
- **Goal:** Systems and data available when needed

### Real-World Impact

**Healthcare:**
- System downtime = delay in care
- Missing patient records = care failure, not just system failure

**Finance:**
- Incorrect prices or delays = millions in losses
- Bad information = regulatory violations

**Agriculture:**
- Tampered sensor data = entire harvest at risk
- Small mistakes = catastrophic losses

### Your Role

Even if not in IT, you interact with these principles daily:
- Deciding who gets document access
- Uploading files to right or wrong places
- Reporting or ignoring weird system behavior
- Every choice has security impact

</expand>

<expand title="Security Focus Areas">
## Security Focus Areas

### Six Key Areas

Organizations break security work into these focus areas (not strict departments, but lenses for thinking about security):

### 1. Product Security

- **Definition:** Building software and systems secure by design
- **Approach:** Think about risks from the start, not just react after problems
- **Scope:** 
  - Software applications
  - Physical products (supply chain, hardware tampering)
  - Cloud platforms, vendor tools, AI models
- **Goal:** Prevent misuse or attacks through design

### 2. Identity and Access Management (IAM)

- **Two Questions:** Who are you? What are you allowed to do?
- **Includes:**
  - User accounts, roles, permissions, logins
  - Third-party access (contractors, automated systems)
- **Risk:** Former employees with retained access
- **Goal:** People only access what they need, nothing more

### 3. Data Security

**Three States of Data:**

- **Data at Rest:** Stored on hard drives, databases, cloud storage
- **Data in Transit:** Being transmitted between systems, networks, devices
- **Data in Use:** Being accessed, processed, or edited in applications

**Goal:** Keep data intact, protected, and trusted in all states

### 4. Governance, Risk, and Compliance (GRC)

**Governance (G):**
- Who is responsible for what?
- Who sets policies, rules, processes?

**Risk (R):**
- Identifying and understanding threats
- Assessing likelihood and impact
- Determining acceptable risk levels

**Compliance (C):**
- Meeting industry regulations
- Following internal policies
- Passing external audits

**Goal:** Cohesive security system aligned with business operations

### 5. Secure Operations

- **Definition:** Day-to-day work of keeping everything running securely
- **Includes:**
  - IT processes, patching rules, device management
  - Software deployment
  - Responding to alerts and incidents
- **Role:** First to know, first to act

### 6. Threat Intelligence and Testing

- **Purpose:** Stay ahead of attackers
- **Activities:**
  - Learn what attackers are doing
  - Test defenses before attackers do
  - Penetration testing
  - Red team exercises (simulate full attacks)
- **Approach:** Proactive, hands-on resilience building

### Shadow IT

- **Definition:** People using unapproved tools without IT/security knowledge
- **Examples:** File sharing apps, project trackers, new AI applications
- **Risk:** Unknown security, data storage location, data access
- **Reality:** Can represent significant risk in fast-moving companies

</expand>

<expand title="Security Frameworks and Compliance">
## Security Frameworks and Compliance

### Why Frameworks Matter

- **Purpose:** Structured guidelines for security best practices
- **Benefits:**
  - Common language for security work
  - Identify gaps and priorities
  - Prove security to regulators, clients, board
  - Repeatable, well-thought-out approach

### NIST Framework

- **Full Name:** National Institute of Standards and Technologies
- **Type:** US government agency, leading voice in cybersecurity
- **Structure:** Categories:
  - Identify
  - Protect
  - Detect
  - Respond
  - Recover
- **Not a Playbook:** Common language to map security work, not step-by-step instructions
- **Influence:** Thinking appears everywhere, especially in consulting, finance, healthcare, government

### Compliance Regulations

**GDPR (Europe):**
- Data protection regulation
- Gives individuals control over personal data use
- Example: Customer in Germany requests data deletion → company must comply quickly (emails, logs, backups)

**HIPAA (US Healthcare):**
- Governs health information storage, privacy, security
- Example: Email patient lab results to wrong person = violation, serious penalties

**Other Regulations:**
- PCI DSS (credit card processing)
- SOX, CCPA, FRPA, ISO 27001
- Industry and region-specific rules

### Compliance Requirements

- **Documentation:** Prove how data is handled
- **Monitoring:** Prove monitoring for unauthorized access
- **Training:** Prove staff training
- **Audits:** Ready for external audits
- **Purpose:** Trust isn't just earned—it's enforced

### Business Impact

- **Non-Negotiable:** Required for cross-border work, regulated industries
- **Affects:** Hiring, contracts, vendor choices, project bidding
- **Baseline:** Creates common expectations for "secure"

</expand>

<expand title="Personal Security Practices">
## Personal Security Practices

### Know How to Report

- **Critical:** Know who to tell and how when you see something suspicious
- **Examples:** Weird email, login alert, suspicious file
- **Reality:** Biggest missed opportunity isn't fancy firewall—it's someone who saw something and said nothing

### Know What to Look For

**Red Flags:**
- Urgent message from leader that feels unusual
- Login notification from location you weren't in
- File sharing link you didn't ask for or expect
- Coworker with access to systems they don't use anymore

**Note:** These don't confirm attacks, but they're the start of a story. Catching things early makes a huge difference.

### Question Convenience

**Common Shortcuts (Risky):**
- Upload sensitive file to personal drive "just for now"
- Share passwords between systems
- Turn off multi-factor authentication because it's annoying

**Reality:** These are cracks in the foundation that attackers look for.

### Client-Facing Roles

- **Higher Stakes:** Your mistakes become someone else's problem
- **Cascade Effect:** Compromised laptop or misused access spreads risk to partners, clients, their customers
- **Responsibility:** Not just protecting your house—not leaving door open to someone else's house

### AI-Enhanced Threats

**What Attackers Use AI For:**
- Highly personalized phishing emails with real names, roles, company style
- Voice cloning from voicemails or meetings
- Realistic fake invoices, resumes
- Scaling attacks to thousands of targets

**Defense:** Defenders also use AI to scan patterns, block suspicious behavior, flag anomalies

**Your Job:** Stay alert, ask questions, speak up when something feels wrong

</expand>

<expand title="Building Security Culture">
## Building Security Culture

### Team Mindset

- **Not About Perfection:** About staying aware, asking questions, making small decisions that prevent big problems
- **Daily Habits:** Security built into day-to-day work, not just policies or annual training
- **Examples of Good Questions:**
  - "Should we send this as attachment or link?"
  - "Should vendor get full access or view-only?"

### Client and Customer Focus

- **Understanding:** Your systems, tools, credentials don't exist in isolation
- **Risk:** Compromised account can access client systems
- **Impact:** Damages trust, costs future work, risks others' customers and data
- **Approach:** Treat access as responsibility and privilege, not just convenience

### Technical Roles

**Secure by Design:**
- Think ahead, not just secure after the fact
- Build systems that log what needs logging
- Systems that can be monitored and maintained

**DevSecOps:**
- Security part of development conversation from the beginning
- Self-checking for vulnerabilities
- Automated configuration scanning
- Direct collaboration with security teams

### Leadership and Culture

**What Creates Culture:**
- Do managers reward shortcuts or careful choices?
- Do people feel comfortable reporting weird things?
- Is security brought up in project planning or only after breaks?

**Strong Teams:**
- Security is fundamental part of how they work
- Not a speed bump or panic button
- Part of being responsible professionals

### Key Principles

- **Everyone's Responsibility:** Every file sent, access approved, tool installed is part of security
- **Small Actions Matter:** Multiplied across company, they make the biggest difference
- **Know What to Ask:** What to notice, what's worth a second look
- **Not Starting from Scratch:** You're already part of the security posture

</expand>
