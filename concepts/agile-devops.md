# Agile and DevOps

## Primary Concepts

<expand title="Introduction to Agile and DevOps">
## Introduction to Agile and DevOps

- **Two Complementary Approaches**: Agile and DevOps are different but increasingly part of the same conversation
- **Common in Software Development**: Heard in any organization with active software projects
- **Best Practices**: Part of discussions about planning and delivering successful software
- **Shared Goals**: Both aim to make software development faster, more responsive, and customer-focused.
- **Philosophies, Not Methodologies**: Sets of principles and values that encourage a way of thinking.

</expand>

<expand title="Problems with Waterfall Methodology">
## Problems with Waterfall Methodology

- **Historical Context**: Typical software planning approach from 1950s through 1990s
- **Waterfall Model**: Formalized, highly structured approach with sequential phases
  - Results from each phase flow down to the next phase
  - Like water flowing down a waterfall (hence the name)

- **Five to Six Phases**:
  1. **Requirements Gathering**: Months of research, interviews, documentation
     - Hundreds of pages of documentation
     - No code written yet
     - Attempt to understand every aspect completely
  
  2. **Software Design/Architecture**: Define technical aspects of how to build
     - More documentation
     - No code yet
  
  3. **Development/Implementation**: Programmers actually write code
     - Several months or years into project
     - Finally starting to code
  
  4. **Testing**: Separate team tests the software
     - Bugs found - decisions needed on fixing vs. waiting
     - Often rushed or deferred
  
  5. **Deployment/Operations**: Deploy to production
     - Unexpected problems common
     - Years may have passed since requirements phase

- **Major Problems**:
  - **Too Slow**: Years between requirements and deployment
  - **Requirements Change**: What customer wanted years ago may not work now
  - **Not Flexible**: Hard to go backwards up the waterfall
  - **Poor Feedback**: Customer not involved for long periods
  - **Doesn't Support Evolution**: Software is naturally good at evolving and changing

- **When Waterfall Works**: 
  - Building physical things like bridges
  - Projects with fixed requirements and clear phases
  - Not ideal for software development

</expand>

<expand title="Agile Manifesto - Values">
## Agile Manifesto - Values

- **Created in 2001**: 17 people got together and wrote the Manifesto for Agile Software Development
  - Included developers working on Scrum, XP, and other methodologies
  - Response to problems with waterfall approach

- **Simple Document**: Can be written on one page
  - Four values
  - Twelve principles
  - Plain, non-technical language

- **Values vs. Principles**:
  - **Values**: High-level - What do we value? What's most important?
  - **Principles**: Practical - How do we make it happen?

- **Four Agile Values** (written as comparisons):

  1. **Working Software over Comprehensive Documentation**:
     - Not saying documentation is bad
     - But working software is the goal, not perfect documentation
     - Documentation should exist when needed, but not be the focus
  
  2. **Individuals and Interactions over Processes and Tools**:
     - Focus on actual people, not anonymous roles
     - Consider personalities, skills, strengths, collaboration
     - Processes and tools are important, but people matter more
     - Software development isn't just resource management
  
  3. **Customer Collaboration over Contract Negotiation**:
     - Partner with business, not just service provider
     - Ongoing collaboration, not just initial agreement
     - Contracts are important, but collaboration is higher value
     - Not about minimum requirements and refusing changes
  
  4. **Responding to Change over Following a Plan**:
     - Change will happen - new demands, competition, regulations, devices
     - Build in ability to be responsive and flexible
     - Plan is important, but responding to change is higher value

</expand>

<expand title="Agile Principles and Practices">
## Agile Principles and Practices

- **Key Principles** (from the 12):

  1. **Early and Continuous Delivery**: 
     - Highest priority: satisfy customer through early and continuous delivery
     - Deliver working software frequently (weeks to months, prefer shorter)
     - Huge shift from waterfall (talk to customer, disappear for years)
  
  2. **Iterative and Incremental Approach**:
     - Multiple cycles instead of long phases
     - Each cycle: requirements, planning, implementing, testing, deploying
     - Deliver something valuable each cycle
     - Customer can try, test, and give feedback every time
  
  3. **Embracing Change**:
     - Requirements are never fixed in stone
     - Always changing and evolving
     - Build in flexibility
  
  4. **Communication**:
     - Between business and developers
     - Within the team itself
     - Trust the team
     - Allow team to self-organize

- **Typical Agile Practices**:

  - **Small Teams**: 
    - Waterfall: 40-100 people
    - Agile: Typically 10 people or so
    - "Two-pizza team" rule: If you need more than two pizzas, team is too big
  
  - **Sprints/Iterations**:
    - Defined time periods (timebox)
    - Often 2-3 weeks
    - Team builds, tests, and releases new software
    - Break workload into small chunks
  
  - **Backlog**:
    - Team's to-do list
    - Estimate which items can be done during sprint
    - Prioritized list of work
  
  - **Technical Excellence**:
    - Quality is continuous responsibility of team
    - Not passed to separate testing team
    - Focus on quality throughout development
  
  - **Unit Testing**:
    - Small automated tests for single behaviors
    - Developers write tests as they write code
    - Testing becomes part of development
    - Run tests with click of button
    - Reduces time to release, increases quality

</expand>

<expand title="DevOps Overview">
## DevOps Overview

- **What It Is**: Mix of "development" and "operations"
- **Goals**: Fast, responsive, customer-focused (like Agile)
- **Key Idea**: Deployment and operations become part of full delivery lifecycle
  - Not stuck at end of waterfall process
  - Everyone works together to deliver value

- **Strong Focus on Automation**: Automate as much as possible

- **Example DevOps Process**:
  1. Developer finishes code and checks it into source control
  2. Automated process begins (created by DevOps team)
  3. Reads software's environmental requirements
  4. Creates that environment automatically
  5. Deploys new software into environment
  6. Kicks off automated unit tests
  7. If tests pass: software ready for deployment
  8. If tests fail: developer notified, goes back to fix
  9. Deployment can also be automated
  10. In cloud: launch into containers/virtual machines
  11. Delete old version, users get new version

- **CI/CD Pipeline**:
  - **Continuous Integration (CI)**: Automatically test code when checked in
  - **Continuous Delivery (CD)**: Automatically deploy when tests pass
  - **Pipeline**: Entire automated process from code to production

- **Real-World Example**: 
  - Smartphone app automatically updating
  - Team completed sprint
  - Automated testing and continuous delivery
  - Enhanced app with new features and bug fixes
  - Little or no interruption to user

</expand>

<expand title="How Agile and DevOps Work Together">
## How Agile and DevOps Work Together

- **Complementary**: Like "milk and cookies" - they go together well
- **Agile Focus**: Producing small improvements in continuous series of short sprints
- **DevOps Focus**: Automating testing and pain-free deployment
- **Combined Result**:
  - Agile: Small, frequent improvements
  - DevOps: Automated testing ensures quality
  - DevOps: Automated deployment makes it painless
  - Result: Fast, reliable, frequent software updates

- **Not in Agile Manifesto**: DevOps term doesn't appear, but they complement perfectly
- **Shared Philosophy**: Both are mindsets, not rigid methodologies
- **No One Correct Way**: Different frameworks and approaches, but same values

</expand>

<expand title="Enterprise Agile and Business Agility">
## Enterprise Agile and Business Agility

- **Beyond Software**: Organizations wanted Agile benefits across entire business
- **Enterprise Agile**: Applying Agile practices and principles in other areas
- **Business Agility**: Being more broadly agile (lowercase 'a') across organization

- **Why It Works**: Agile is just principles and values
  - Roots in software development
  - But applicable anywhere

- **Examples**:
  - **Finance Team**: Roll out expense reporting system, monitor, adjust based on observations
  - **Strategy Team**: Adopt new pricing model, gauge market reaction, adjust
  - **Marketing Team**: Series of smaller campaigns instead of one massive campaign
     - Test ideas, sharpen aim, react quickly

- **Benefits**:
  - More adaptive organizations
  - Quickly roll out something small
  - See how it does
  - Move to next improvements
  - Test ideas and features
  - React quickly to find best path
  - Avoid massive, expensive, multiyear investments

</expand>

<expand title="Agile Frameworks">
## Agile Frameworks

- **Not a Methodology**: Agile intentionally avoids being prescriptive
  - Not a formalized project management template
  - Trying to get away from "follow process to the letter" thinking

- **Frameworks Support Agile**:
  - **Scrum**: Specific guidelines for planning, meetings, communication
  - **XP (Extreme Programming)**: Practices for development
  - **Crystal**: Another framework approach
  - **Unified Process**: Alternative methodology

- **Why "Framework" Not "Methodology"**:
  - Framework suggests flexibility and support
  - Not trying to find methodology to follow
  - Trying to find framework that supports building something

- **Structures Still Important**:
  - Provide consistency
  - Clarity around expectations
  - Promote transparency
  - But flexible, not rigid

</expand>

## Secondary Concepts

<expand title="Challenges and Adoption">
## Challenges and Adoption

- **Organizational Change**: 
  - Agile is intentional way of working
  - Applies to all levels of organization
  - Team level requires manager understanding
  - Manager support requires executive buy-in

- **Executive Support Needed**:
  - Requires compelling vision
  - Leaders must communicate why and what they expect
  - Relentlessly share vision
  - Help everyone understand direction and reasons

- **Change is Hard**: 
  - For many organizations, Agile is big change
  - Requires education and thoughtfulness
  - May require cultural changes
  - May require org chart realignment

- **Not All or Nothing**:
  - Some parts of organization may use Agile/DevOps
  - Others may not
  - Use where they make sense
  - Use other methodologies where appropriate

- **Starting Approach**:
  - Most organizations start with small number of projects
  - Gain experience
  - Evolve practices based on what they learn
  - Expand gradually

</expand>

<expand title="Where Agile and DevOps Apply">
## Where Agile and DevOps Apply

- **Customer-Facing Software**:
  - Mobile apps
  - Websites
  - Any software with users

- **Internal Software**:
  - Custom line-of-business applications
  - Internal tools
  - Any software that benefits from rapid release cycles

- **Key Requirement**: Software that can benefit from:
  - Smaller releases
  - More rapid cycles
  - More frequent updates

- **Beyond Software**:
  - Finance projects
  - Marketing campaigns
  - Strategy initiatives
  - Anywhere rapid iteration and feedback helps

</expand>

<expand title="Tools and Technologies">
## Tools and Technologies

- **No Specific Requirements**: Agile and DevOps don't impose specific platforms or tools

- **Common Development Tools**:
  - Integrated Development Environments (IDEs): Visual Studio, Eclipse
  - Source Code Control: Git
  - Programming languages and frameworks (whatever team uses)

- **Testing Tools**:
  - Unit testing tools (huge variety)
  - Automated testing software
  - Part of Agile and DevOps environments

- **DevOps Tools**:
  - Continuous Integration tools
  - Continuous Delivery tools
  - Automation software
  - Container technologies (Docker, Kubernetes)
  - Virtual machines

- **Supporting Tools**:
  - Kanban boards
  - Whiteboards
  - Real-time collaboration tools
  - Information sharing tools

- **Important Note**: 
  - Tools alone don't create Agile or DevOps
  - Require education and thoughtfulness
  - Require buy-in at highest levels
  - May require cultural changes
  - Tools support principles, but don't create outcomes

</expand>

<expand title="Key Takeaways">
## Key Takeaways

- **Philosophies, Not Methodologies**: 
  - Sets of principles and values
  - Encourage way of thinking
  - No one correct way to do them

- **Complementary**: 
  - Agile and DevOps work well together
  - Agile: Small, frequent improvements
  - DevOps: Automated testing and deployment

- **Flexible Application**:
  - Can be applied to specific projects
  - Can be applied across organization
  - Use where they make sense

- **Ongoing Evolution**:
  - Organizations start small
  - Gain experience
  - Evolve practices
  - Expand gradually

- **Future Outlook**:
  - More organizations exploring benefits
  - Markets and consumer needs keep evolving
  - Agile organizations ready to respond rapidly
  - Bring value to customers quickly

</expand>