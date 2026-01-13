# Agentic AI

## Primary Concepts

<expand title="Overview of Agentic AI">
## Overview of Agentic AI

### What is Agentic AI?

Agentic AI represents the next phase of artificial intelligence where AI systems can not only plan and reason but also take autonomous actions to accomplish goals. Unlike traditional AI chatbots that provide plans or suggestions, agentic AI can execute those plans using tools and applications.

### Key Difference

- **Traditional AI:** Provides plans and suggestions ("Here's how to organize an event")
- **Agentic AI:** Creates plans AND executes them autonomously ("I'll organize the event for you")

### Evolution

- **Past:** AI for single tasks (summarize notes, generate images)
- **Present:** Agentic AI with a toolbox of capabilities
- **Future:** Autonomous systems that work independently toward complex goals

### Core Capability

Agentic AI systems can:
- Understand complex, ambiguous goals
- Break down goals into actionable steps
- Use external tools and applications
- Make decisions and adapt plans
- Work autonomously without constant supervision

</expand>

<expand title="Core Components: Perception, Reasoning, Action, and Memory">
## Core Components: Perception, Reasoning, Action, and Memory

Agentic AI systems operate through four fundamental components:

### Perception
- **Definition:** How the agent gathers information and observes the world
- **Includes:** Ability to pull real-time data, monitor events, receive triggers
- **Examples:** Checking weather, reading files, monitoring API changes, detecting calendar events
- **Purpose:** Provides context and situational awareness

### Reasoning
- **Definition:** How the agent figures out what to do and creates plans
- **Powered by:** Large Language Models (LLMs)
- **Capabilities:** 
  - Breaks down goals into smaller tasks
  - Adapts plans based on new information
  - Makes decisions about which tools to use
  - Handles ambiguous or unpredictable situations
- **Guided by:** System prompts that define behavior, scope, and priorities

### Action
- **Definition:** The doing part - executing plans and interacting with systems
- **Capabilities:**
  - Sending emails
  - Searching the web
  - Calling APIs
  - Writing to documents
  - Triggering workflows
  - Performing calculations
- **Key Difference:** Agents can interact with external systems, not just generate text

### Memory
- **Types:**
  - **Short-term:** Context within a single session or goal
  - **Long-term:** Stored preferences, past decisions, user information
- **Purpose:** 
  - Avoid repeating actions
  - Follow long-running goals
  - Learn from past interactions
  - Maintain context across sessions

### Important Note

The LLM (GPT, Claude, etc.) is not the agent itself - it's just the reasoning component. The agent is the complete system that combines reasoning with perception, action, and memory.

</expand>

<expand title="Autonomy Spectrum">
## Autonomy Spectrum

Autonomy in agentic AI is not binary - it exists on a spectrum from reactive tools to fully autonomous agents.

### Spectrum Levels

**1. Reactive Tools**
- Simple, single-action responses
- Minimal decision-making
- High human oversight required

**2. Semi-Autonomous Agents**
- Can research and handle grunt work
- Requires human approval for final actions
- Most common in business applications
- Example: Vacation planner that researches but needs approval before booking

**3. Fully Autonomous Agents**
- Complete tasks independently
- Minimal human intervention
- Reports when done
- Suitable for well-defined, low-risk scenarios

### Choosing the Right Level

- **Simple tasks:** Direct prompting (no agent needed)
- **Fixed workflows:** Traditional automation (no agent needed)
- **Complex, unpredictable goals:** Agentic AI with appropriate autonomy level
- **Business applications:** Usually semi-autonomous with human oversight

### Key Consideration

Most real-world applications sit in the middle - agents handle research and execution, but humans maintain final approval for critical decisions.

</expand>

<expand title="Types of Agents">
## Types of Agents

Agentic systems are typically built using multiple specialized agents, each with distinct roles, similar to a team structure.

### Worker Agents
- **Role:** Focused on one specific task
- **Characteristics:** Simple, predictable, reusable
- **Examples:** 
  - Document summarization
  - Text translation
  - Data extraction and calculations
  - Email drafting
- **Purpose:** Building blocks of larger systems

### Tool-Using Agents
- **Role:** Specialized in connecting to external systems
- **Capabilities:** 
  - Database queries
  - Web searches
  - API calls
  - Application integrations
- **Purpose:** Enable agents to access real-world data and systems

### Planner Agents
- **Role:** Break down larger goals into smaller steps
- **Function:** Create roadmaps and strategies
- **Examples:**
  - Plan content calendar
  - Outline employee onboarding steps
  - Design project workflows
- **Note:** Usually don't execute work themselves - they create the plan

### Orchestrator Agents
- **Role:** Coordinate and manage other agents
- **Responsibilities:**
  - Assign tasks to appropriate agents
  - Monitor progress
  - Manage workflow order
  - Handle failures and retries
  - Compose final outputs
- **Analogy:** Like a conductor managing an orchestra

### Multi-Agent Systems

Most complex agentic systems combine multiple agent types:
- **Planner** creates the strategy
- **Orchestrator** manages execution
- **Worker agents** perform specific tasks
- **Tool-using agents** access external data

This approach is more practical and reliable than one giant agent doing everything.

</expand>

<expand title="Agentic AI vs Traditional Automation">
## Agentic AI vs Traditional Automation

### Traditional Automation
- **Approach:** Follows predefined, fixed workflows
- **Structure:** Step A → Step B → Step C (predetermined)
- **Flexibility:** Breaks when unexpected situations occur
- **Best for:** Well-defined, repetitive processes
- **Limitation:** Cannot handle ambiguity or adapt to unknowns

### Agentic AI
- **Approach:** Creates plans dynamically based on goals
- **Structure:** Adapts and reasons through steps in real-time
- **Flexibility:** Handles unpredictable situations and adapts
- **Best for:** Complex, ambiguous problems requiring judgment
- **Capability:** Can rethink approaches mid-process

### Key Differences

| Aspect | Traditional Automation | Agentic AI |
|--------|----------------------|------------|
| Planning | Fixed, predefined | Dynamic, created on-the-fly |
| Adaptability | Breaks on unexpected input | Adapts to new information |
| Decision-making | Rule-based | Reasoning-based |
| Ambiguity | Cannot handle | Can work with unclear goals |
| LLM Usage | Optional (for text generation) | Core component (for reasoning) |

### When to Use Each

- **Traditional Automation:** When you can fully define all steps and rules in advance
- **Agentic AI:** When problems are too complex for fixed workflows but don't need a full human team

### Example Comparison

**Traditional Automation:**
- Customer ticket → Pull customer info → Assign to rep → Send templated email

**Agentic AI:**
- Customer ticket → Analyze tone and sentiment → Check past cases → Draft custom response → Flag potential issues → Adapt based on context

</expand>

<expand title="When to Use Agentic AI">
## When to Use Agentic AI

### Ideal Use Cases

Agentic AI excels in the "messy middle" - problems that are:
- Too complex for a single prompt
- Too unpredictable for fixed workflows
- Not large enough to require a full human team
- Have clear goals but uncertain paths

### Characteristics of Good Agentic AI Problems

- **Clear goal** with some uncertainty about how to achieve it
- **Multiple steps** required to complete
- **Multiple tools** or systems need to be involved
- **Unpredictable inputs** that require adaptation
- **Need for reasoning** rather than just following rules

### Not Suitable For

- **Simple tasks:** Use direct prompting (e.g., rewrite email, summarize notes)
- **Fully defined workflows:** Use traditional automation
- **Highly repetitive, rule-based processes:** Use traditional programming

### Real-World Examples

- **Customer support:** Handle complex tickets requiring context and judgment
- **Content planning:** Create and adapt marketing calendars
- **Data analysis:** Summarize feedback and suggest action items
- **Project management:** Anticipate blockers and suggest next steps
- **Software development:** Debug code, write tests, open pull requests

### Decision Framework

Ask: "Can I fully describe this with rules and conditions?"
- **Yes:** Use traditional automation
- **No, but goal is clear:** Consider agentic AI
- **Too ambiguous:** May need human team

</expand>

<expand title="Building Agents">
## Building Agents

### Platforms and Frameworks

**Code-Focused:**
- LangChain
- LangGraph
- AutoGen

**No-Code/Low-Code:**
- Zapier
- UiPath
- Make
- CrewAI
- Langflow
- Flowise
- n8n

**Enterprise:**
- Microsoft Copilot Studio
- Salesforce Agentforce
- SAP Joule
- Accenture AI Refinery

### Core Components to Configure

**1. Trigger**
- What initiates the agent (manual, schedule, event, file drop, API call)

**2. LLM Selection**
- Choose the language model (GPT-4, Claude, Gemini, etc.)
- Configure authentication and API keys

**3. System Prompt**
- Define agent's role and behavior
- Set scope, priorities, and constraints
- Guide reasoning without hardcoding logic

**4. Tools**
- Connect external systems (databases, APIs, applications)
- Configure authentication for each tool
- Examples: Google Sheets, email, web search, databases

**5. Memory**
- Short-term: Session context
- Long-term: User preferences, past decisions

**6. Actions**
- Define what the agent can do (send emails, update documents, etc.)

### Building Process

1. Define the goal and trigger
2. Select LLM and configure system prompt
3. Connect required tools and data sources
4. Set up memory if needed
5. Configure output actions
6. Test and refine based on results

### Key Principle

Focus on **what** you want accomplished, not **how** - let the agent figure out the steps.

</expand>

<expand title="Monitoring and Managing Agents">
## Monitoring and Managing Agents

### Why Monitoring Matters

Autonomous doesn't mean unmanaged. Agents need oversight to ensure they're working correctly and can be improved over time.

### Types of Monitoring

**Technical Monitoring:**
- Are prompts working as expected?
- Is the agent completing tasks successfully?
- System errors, API failures, authentication issues
- Platform logs and dashboards

**Business Monitoring:**
- Is output actually useful and accurate?
- Is it saving time or money?
- Is it generating noise or value?
- Outcome-focused rather than technical details

### Feedback Loops

Agents need feedback to improve:
- Add clarifications to system prompts
- Adjust logical flow and behavior
- Introduce examples or constraints
- Add human-in-the-loop steps for review
- Small changes can make huge differences

### Escalation Rules

Define when agents should:
- Make decisions autonomously
- Ask for human help
- Pause for review
- Log issues and continue

### Management Approach

Think of managing agents like managing a junior team member:
- **Not:** Hovering and micromanaging everything
- **Yes:** Review, guide, and improve over time
- **Goal:** Leave them alone for more of their work as they improve

### Key Principles

- **Observable:** You can see what they're doing
- **Tunable:** You can adjust their behavior
- **Improvable:** They learn from what they produce
- **Balanced:** Right mix of freedom and feedback

</expand>

<expand title="Impact on Work and Roles">
## Impact on Work and Roles

### Changing Nature of Work

Agentic AI adoption is both a technical and cultural shift. These systems can perceive, reason, and act, which changes how work gets done.

### Task Distribution

- **Easier tasks:** Get automated first
- **Harder tasks:** Remain for humans
- **Result:** Human work becomes more cognitively and emotionally demanding

### Example: Customer Support

- **Before:** Humans handle all tickets
- **After:** Agents handle straightforward questions
- **Remaining for humans:** Edge cases, complex accounts, emotionally sensitive conversations

### Shifting Skills

Most valuable skills in agent-enhanced workplaces:
- **Prompt design:** Defining clear goals and constraints
- **Structured feedback:** Improving AI system outputs
- **Quality judgment:** Spotting when something is off
- **Strategic communication:** Working with AI systems as collaborators

### Working with Agents

- **Not just using a tool:** Working with a system that has agency
- **Clear communication:** Essential for effective collaboration
- **Goal-setting:** Give goals, not micromanage steps
- **Knowing when to step in:** Balance autonomy with oversight

### Future Outlook

- Agents will reshape every business function
- Marketing: Campaign planning and optimization
- Finance: Anomaly detection and risk analysis
- Support: Autonomous issue resolution
- Project Management: Blocker anticipation and status updates
- Software Development: Bug fixes, test writing, pull requests

### Key Takeaway

Understanding both what agents can do and what should remain human-driven will be essential skills.

</expand>
