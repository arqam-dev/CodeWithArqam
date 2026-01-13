# Prompt Engineering

## Primary Concepts

<expand title="Overview of Prompt Engineering">
## Overview of Prompt Engineering

### What is Prompt Engineering?
Prompt engineering is the practice of designing and optimizing inputs (prompts) to get desired outputs from AI models, particularly large language models (LLMs) like ChatGPT, Claude, Gemini, and others. It involves crafting clear, specific, and structured instructions that guide AI to produce accurate, relevant, and useful responses.

### Purpose
- **Get Accurate Results:** Craft prompts that produce correct and relevant outputs
- **Control AI Behavior:** Guide AI to follow specific formats, styles, or constraints
- **Improve Efficiency:** Reduce back-and-forth iterations by writing better prompts
- **Leverage AI Capabilities:** Maximize the potential of AI tools for development tasks
- **Consistency:** Create reusable prompt templates for common tasks

### When to Use
- **Code Generation:** Writing functions, components, or entire features
- **Debugging:** Getting help with error messages and bug fixes
- **Code Review:** Asking AI to review and suggest improvements
- **Documentation:** Generating code comments, README files, or technical docs
- **Refactoring:** Improving existing code structure and quality
- **Learning:** Understanding complex concepts or codebases
- **Testing:** Generating test cases and test data

</expand>

<expand title="Prompt Elements">
## Prompt Elements

### Overview
A well-structured prompt consists of several key elements that work together to guide AI models effectively. Understanding and using these elements helps create more accurate, reliable, and useful AI responses.

### Core Prompt Elements

**1. #CONTEXT#**
- Provides background information and situational awareness
- Sets the stage for what the AI needs to understand
- Includes relevant details about the current state, environment, or situation
- Helps AI understand the "why" behind the request

**Example:**
```
#CONTEXT#
I'm working on a React application using Next.js 14 with TypeScript. 
The application handles user authentication and I'm currently in the 
login component. The backend API is already set up and working.
```

**2. #OBJECTIVE# or #GOAL#**
- Clearly states what you want to achieve
- Defines the desired outcome or end result
- Should be specific and measurable when possible
- Answers the question: "What do I want to accomplish?"

**Example:**
```
#OBJECTIVE#
Create a secure login form component that validates user credentials, 
handles errors gracefully, and redirects authenticated users to the dashboard.
```

**3. #INSTRUCTION#**
- Provides specific steps or actions to take
- Tells the AI exactly what to do
- Can include multiple instructions in a logical sequence
- Should be clear, actionable, and unambiguous

**Example:**
```
#INSTRUCTION#
1. Create a login form with email and password fields
2. Add client-side validation for email format and password strength
3. Implement error handling for API failures
4. Show loading state during authentication
5. Redirect to /dashboard on successful login
6. Display user-friendly error messages
```

**4. #CONSTRAINTS# (Optional)**
- Specifies limitations, requirements, or restrictions
- Defines what must or must not be done
- Includes technical constraints, business rules, or preferences
- Helps ensure the solution fits your specific needs

**Example:**
```
#CONSTRAINTS#
- Must use TypeScript with strict mode
- Cannot use external UI libraries (use only React and Tailwind CSS)
- Must follow existing code patterns in the project
- Password must be hashed before sending to API
- Must be accessible (WCAG 2.1 AA compliant)
- Must work with existing authentication service
```

**5. #EXAMPLE#**
- Provides concrete examples of desired output or behavior
- Shows the pattern or format you want
- Demonstrates expected structure, style, or approach
- Helps AI understand your preferences through demonstration

**Example:**
```
#EXAMPLE#
Here's an example of the error handling pattern I want:

```typescript
try {
  const response = await loginUser(credentials);
  if (response.success) {
    router.push('/dashboard');
  }
} catch (error) {
  setError(error.message || 'Login failed. Please try again.');
}
```
```

**6. #OUTPUT FORMAT# (Optional)**
- Specifies how you want the response structured
- Defines the format, style, or organization of the output
- Can include code formatting, documentation style, or response structure
- Ensures consistency in AI-generated content

**Example:**
```
#OUTPUT FORMAT#
Please provide:
1. Complete TypeScript component code
2. Brief explanation of key features
3. Usage example
4. List of dependencies needed
Format code with proper indentation and comments.
```

### Complete Prompt Template

```
#CONTEXT#
[Provide background information about your situation, project, or current state]

#OBJECTIVE#
[State clearly what you want to achieve or the goal you're working toward]

#INSTRUCTION#
[Provide specific, actionable steps or instructions]

#CONSTRAINTS#
[Optional: List any limitations, requirements, or restrictions]

#EXAMPLE#
[Optional: Show examples of desired output or patterns]

#OUTPUT FORMAT#
[Optional: Specify how you want the response structured]
```

### Best Practices

**1. Always Include Context:**
- Context helps AI understand your situation
- More context = better, more relevant responses
- Include relevant technical details, project state, and constraints

**2. Be Specific with Objectives:**
- Vague goals lead to vague results
- Clearly define what success looks like
- Make objectives measurable when possible

**3. Break Down Instructions:**
- Complex tasks should be broken into clear steps
- Number or bullet-point instructions for clarity
- Ensure instructions are actionable

**4. Use Constraints Wisely:**
- Don't over-constrain (can limit creativity)
- Include important technical or business constraints
- Mention style preferences or coding standards

**5. Provide Examples When Helpful:**
- Examples are powerful for showing desired patterns
- Use examples for style, format, or approach
- Can be code snippets, patterns, or templates

**6. Specify Output Format When Needed:**
- Useful for documentation, code structure, or reports
- Ensures consistency across multiple requests
- Helps when you need specific formatting

### When to Use Each Element

**Use All Elements When:**
- Working on complex, multi-step tasks
- Need precise control over output
- Working with critical production code
- Need consistent formatting across requests

**Minimal Elements (Context + Objective + Instruction):**
- Simple, straightforward tasks
- Quick questions or clarifications
- Iterative refinement of previous responses

**Add Constraints When:**
- Working within specific technical limitations
- Need to follow project standards
- Have business rules or requirements

**Add Examples When:**
- Want to match existing code style
- Need specific patterns or structures
- Teaching AI your preferences

**Add Output Format When:**
- Generating documentation
- Need structured responses
- Creating templates or standardized content

### Common Mistakes

**1. Missing Context:**
❌ "Create a login form"
✅ "#CONTEXT# I'm building a React app with Next.js 14..."

**2. Vague Objectives:**
❌ "#OBJECTIVE# Make it better"
✅ "#OBJECTIVE# Improve performance by reducing re-renders and optimizing API calls"

**3. Unclear Instructions:**
❌ "#INSTRUCTION# Add validation"
✅ "#INSTRUCTION# 1. Validate email format using regex. 2. Check password is 8+ characters..."

**4. Over-constraining:**
❌ Listing 20+ constraints for a simple task
✅ Include only relevant, important constraints

**5. Missing Examples for Style:**
❌ Not showing desired code style
✅ Provide examples of existing code patterns you want to match

### Summary

Prompt elements provide a structured approach to communicating with AI models. By organizing your prompts using these elements, you can:
- Get more accurate and relevant responses
- Reduce back-and-forth iterations
- Maintain consistency in AI-generated content
- Better control the output format and style
- Create reusable prompt templates

Remember: Not every prompt needs all elements. Use them based on the complexity and requirements of your task. Start with Context, Objective, and Instruction for most tasks, and add other elements as needed.

</expand>

<expand title="Prompt Engineering for Error Handling">
## Prompt Engineering for Error Handling

### Purpose
Create effective prompts to help AI understand, diagnose, and fix errors in your code.

### Best Practices

**1. Provide Complete Context:**
- Include the full error message (stack trace, line numbers)
- Share relevant code snippets (the function/component causing the error)
- Mention the environment (browser, Node.js version, framework version)
- Include any relevant configuration files

**Example Good Prompt:**
```
I'm getting this error in my React application:

Error: Cannot read property 'map' of undefined
at UserList.js:15:23

Here's my code:
```javascript
function UserList({ users }) {
  return (
    <div>
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

I'm using React 18.2.0. The component is receiving props from a parent component that fetches data from an API. Sometimes the API returns null or the data hasn't loaded yet.

How can I fix this error and handle the loading/error states properly?
```

**2. Specify What You Need:**
- Do you want just the fix, or also an explanation?
- Do you need error handling patterns?
- Should it follow specific coding standards?

**Example:**
```
Fix this error and add proper error handling following these requirements:
- Use try-catch blocks
- Show user-friendly error messages
- Log errors to console for debugging
- Handle edge cases (null, undefined, empty arrays)
```

**3. Include Expected Behavior:**
- Describe what should happen when there's no error
- Mention what should happen when there is an error
- Specify user experience requirements

**Example:**
```
When the API call fails, I want to:
- Show a friendly error message to the user
- Retry the request automatically once
- Log the error for debugging
- Display a fallback UI instead of crashing
```

### Common Patterns

**Pattern 1: Error Diagnosis**
```
I'm getting [ERROR_MESSAGE] in [FILE] at line [LINE_NUMBER].

Context:
- Framework: [FRAMEWORK]
- Environment: [ENVIRONMENT]
- Code: [CODE_SNIPPET]

What's causing this error and how can I fix it?
```

**Pattern 2: Error Prevention**
```
I have this code that might throw errors:
[CODE]

Add comprehensive error handling that:
1. Catches all possible errors
2. Provides meaningful error messages
3. Handles edge cases
4. Follows best practices for [LANGUAGE/FRAMEWORK]
```

**Pattern 3: Error Recovery**
```
My application crashes when [SCENARIO]. 

Current code:
[CODE]

How can I add error recovery so that:
- The app doesn't crash
- Users see a helpful message
- The app can continue functioning
- Errors are logged for debugging
```

### Interview Tips
- Show you understand error handling best practices
- Demonstrate knowledge of different error types
- Explain your debugging process
- Mention tools you use (DevTools, logging, etc.)

</expand>

<expand title="Prompt Engineering for New Features">
## Prompt Engineering for New Features

### Purpose
Create prompts that help AI generate complete, production-ready features with proper structure, error handling, and best practices.

### Best Practices

**1. Define Requirements Clearly:**
- What should the feature do?
- What are the inputs and outputs?
- What are the constraints and edge cases?
- What are the acceptance criteria?

**Example Good Prompt:**
```
I need to add a user authentication feature to my Next.js application.

Requirements:
- Email/password login
- JWT token-based authentication
- Protected routes
- Session management
- Password hashing using bcrypt
- Error handling for invalid credentials
- Rate limiting for login attempts (5 attempts per 15 minutes)

Tech Stack:
- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL database
- NextAuth.js (optional, but prefer custom implementation)

Please provide:
1. Database schema for users table
2. API route handlers for login and registration
3. Middleware for route protection
4. Client-side login form component
5. Error handling and validation
6. Security best practices implementation
```

**2. Specify Architecture and Patterns:**
- Mention design patterns to use
- Specify file structure
- Include coding standards
- Request specific libraries or frameworks

**Example:**
```
Create a feature following these patterns:
- Repository pattern for data access
- Service layer for business logic
- Controller pattern for API endpoints
- Use TypeScript with strict mode
- Follow RESTful API conventions
- Include input validation using Zod
```

**3. Request Complete Implementation:**
- Ask for all necessary files
- Request tests
- Include documentation
- Ask for error handling

**Example:**
```
Build a complete [FEATURE_NAME] feature including:
- All necessary files and folder structure
- Unit tests for core functionality
- Integration tests for API endpoints
- Error handling and validation
- TypeScript types/interfaces
- README with setup instructions
- Code comments explaining complex logic
```

### Common Patterns

**Pattern 1: Feature Request with Context**
```
I need to add [FEATURE_DESCRIPTION] to my [TECH_STACK] application.

Current setup:
- Framework: [FRAMEWORK]
- Database: [DATABASE]
- Authentication: [AUTH_METHOD]
- Styling: [STYLING_LIBRARY]

Requirements:
1. [REQUIREMENT_1]
2. [REQUIREMENT_2]
3. [REQUIREMENT_3]

Constraints:
- Must work with existing codebase
- Follow current coding patterns
- Include error handling
- Add proper TypeScript types

Please provide a complete implementation.
```

**Pattern 2: Feature with Specific Patterns**
```
Create a [FEATURE] that:
- Uses [DESIGN_PATTERN]
- Follows [ARCHITECTURE_PATTERN]
- Implements [SPECIFIC_REQUIREMENT]
- Includes [TESTING_APPROACH]
- Handles [EDGE_CASES]

Tech stack: [TECH_STACK]
Code style: [CODE_STYLE]
```

**Pattern 3: Incremental Feature Development**
```
I'm building [FEATURE] step by step. 

Step 1: Create the database schema
Step 2: Build the API endpoints
Step 3: Create the UI components
Step 4: Add error handling
Step 5: Write tests

Let's start with Step 1. Here's my current database setup:
[SCHEMA_INFO]
```

### Interview Tips
- Show you can break down features into components
- Demonstrate understanding of full-stack development
- Mention testing and error handling
- Explain your development process

</expand>

<expand title="Prompt Engineering for Code Updates & Refactoring">
## Prompt Engineering for Code Updates & Refactoring

### Purpose
Create prompts that help AI understand existing code and make targeted improvements, updates, or refactorings while maintaining functionality.

### Best Practices

**1. Provide Complete Context:**
- Share the code that needs updating
- Explain what currently works
- Describe what needs to change
- Mention any constraints or requirements

**Example Good Prompt:**
```
I have this React component that works but needs improvement:

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

Please refactor this to:
1. Use async/await instead of promises
2. Add proper TypeScript types
3. Extract API call to a custom hook
4. Improve error handling with specific error types
5. Add loading skeleton instead of simple text
6. Follow React best practices
7. Add proper accessibility attributes
```

**2. Specify What to Keep:**
- Mention what's working well
- Specify what must not change
- Identify dependencies to maintain

**Example:**
```
Update this code but keep:
- The same API interface (don't change the function signature)
- Backward compatibility with existing code
- The same external dependencies
- Current performance characteristics
```

**3. Request Specific Improvements:**
- Performance optimizations
- Code quality improvements
- Security enhancements
- Best practices implementation

**Example:**
```
Refactor this code to:
- Improve performance (reduce re-renders, optimize calculations)
- Follow SOLID principles
- Add proper error boundaries
- Implement proper logging
- Add input validation
- Improve code readability and maintainability
```

### Common Patterns

**Pattern 1: Targeted Update**
```
I need to update this code:
[CODE]

Changes needed:
1. [CHANGE_1]
2. [CHANGE_2]
3. [CHANGE_3]

Keep everything else the same. Provide the updated code with explanations of changes.
```

**Pattern 2: Refactoring Request**
```
Refactor this code following [PRINCIPLES/PATTERNS]:
[CODE]

Requirements:
- Maintain same functionality
- Improve [ASPECT_1]
- Optimize [ASPECT_2]
- Add [FEATURE]
- Follow [STANDARDS]

Provide refactored code with explanation of improvements.
```

**Pattern 3: Migration/Update**
```
I'm migrating from [OLD_VERSION] to [NEW_VERSION] of [LIBRARY/FRAMEWORK].

Current code:
[CODE]

Update this code to work with [NEW_VERSION], following:
- Migration guide best practices
- Breaking changes documentation
- New features and patterns
- Backward compatibility where possible
```

**Pattern 4: Code Review Style**
```
Review and improve this code:
[CODE]

Focus on:
- Code quality and readability
- Performance optimizations
- Security issues
- Best practices
- Error handling
- Testing considerations

Provide improved version with explanations.
```

### Interview Tips
- Show you understand code quality principles
- Demonstrate refactoring skills
- Explain trade-offs in code changes
- Mention testing after refactoring

</expand>

<expand title="Prompt Engineering for Code Review">
## Prompt Engineering for Code Review

### Purpose
Create prompts that help AI review code comprehensively, identifying issues, suggesting improvements, and ensuring code quality.

### Best Practices

**1. Request Comprehensive Review:**
- Code quality and style
- Performance issues
- Security vulnerabilities
- Best practices compliance
- Error handling
- Testing coverage

**Example Good Prompt:**
```
Please review this code comprehensively:

```javascript
[CODE]
```

Review for:
1. Code quality and readability
2. Performance issues and optimizations
3. Security vulnerabilities
4. Best practices for [LANGUAGE/FRAMEWORK]
5. Error handling and edge cases
6. Testing considerations
7. Accessibility concerns
8. Documentation needs

Provide:
- List of issues found
- Severity of each issue (critical, high, medium, low)
- Specific suggestions for improvements
- Code examples for fixes
```

**2. Specify Review Focus:**
- If you want to focus on specific aspects
- Mention coding standards to follow
- Include framework-specific best practices

**Example:**
```
Review this React component focusing on:
- React hooks best practices
- Performance (memoization, re-renders)
- Accessibility (ARIA attributes, keyboard navigation)
- TypeScript type safety
- Component composition patterns

Code:
[CODE]
```

**3. Request Actionable Feedback:**
- Ask for specific improvements
- Request code examples
- Ask for explanations

**Example:**
```
Review this code and provide:
1. Critical issues that must be fixed
2. Code improvements with before/after examples
3. Performance optimizations
4. Security recommendations
5. Best practices suggestions

Code:
[CODE]
```

### Common Patterns

**Pattern 1: General Code Review**
```
Review this code for quality, performance, security, and best practices:

[CODE]

Provide feedback on:
- What's good about this code
- What needs improvement
- Specific suggestions with code examples
- Potential issues or bugs
```

**Pattern 2: Framework-Specific Review**
```
Review this [FRAMEWORK] code following [FRAMEWORK] best practices:

[CODE]

Check for:
- [FRAMEWORK]-specific patterns and anti-patterns
- Performance best practices
- Security considerations
- Code organization
- Testing approach
```

**Pattern 3: Security-Focused Review**
```
Perform a security review of this code:

[CODE]

Check for:
- SQL injection vulnerabilities
- XSS vulnerabilities
- Authentication/authorization issues
- Input validation
- Sensitive data exposure
- Security headers
- Dependency vulnerabilities
```

### Interview Tips
- Show you understand code quality metrics
- Demonstrate knowledge of security best practices
- Explain your review process
- Mention tools you use (linters, security scanners, etc.)

</expand>

<expand title="Prompt Engineering for Documentation">
## Prompt Engineering for Documentation

### Purpose
Create prompts that help AI generate comprehensive, clear, and useful documentation for code, APIs, or systems.

### Best Practices

**1. Specify Documentation Type:**
- Code comments
- API documentation
- README files
- Technical specifications
- User guides

**Example Good Prompt:**
```
Generate comprehensive documentation for this API endpoint:

```javascript
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.json(user);
});
```

Include:
1. Endpoint description
2. Request format (body, headers, query params)
3. Response format (success and error cases)
4. Authentication requirements
5. Rate limiting
6. Example requests (cURL, JavaScript fetch)
7. Error codes and meanings
8. Validation rules
```

**2. Request Specific Sections:**
- Ask for particular documentation sections
- Specify format (Markdown, JSDoc, etc.)
- Include examples and use cases

**Example:**
```
Create README documentation for this project with:
- Project overview and purpose
- Installation instructions
- Configuration options
- Usage examples
- API documentation
- Contributing guidelines
- License information

Project details:
[PROJECT_INFO]
```

**3. Include Context:**
- Provide code or system context
- Mention target audience
- Specify documentation style

**Example:**
```
Write JSDoc comments for this function:

```javascript
function calculateTotal(items, taxRate, discount) {
  // function implementation
}
```

Target audience: Other developers on the team
Style: Detailed with examples
Include: Parameter descriptions, return value, exceptions, usage examples
```

### Common Patterns

**Pattern 1: API Documentation**
```
Document this API endpoint:
[CODE]

Include:
- Endpoint URL and HTTP method
- Request parameters and body
- Response format
- Status codes
- Error responses
- Authentication
- Rate limiting
- Example requests and responses
```

**Pattern 2: Code Documentation**
```
Add comprehensive documentation to this code:
[CODE]

Include:
- Function/class purpose
- Parameter descriptions
- Return value explanation
- Usage examples
- Edge cases
- Performance considerations
- Related functions/classes
```

**Pattern 3: Project Documentation**
```
Create documentation for this project:
[PROJECT_INFO]

Sections needed:
- Overview
- Getting started
- Architecture
- Configuration
- API reference
- Examples
- Troubleshooting
```

### Interview Tips
- Show you understand documentation importance
- Demonstrate ability to write clear documentation
- Mention documentation tools you use
- Explain your documentation process

</expand>

<expand title="Prompt Engineering for Testing">
## Prompt Engineering for Testing

### Purpose
Create prompts that help AI generate comprehensive test cases, test data, and testing strategies.

### Best Practices

**1. Provide Code to Test:**
- Share the function/component to test
- Explain expected behavior
- Mention edge cases
- Specify testing framework

**Example Good Prompt:**
```
Write comprehensive tests for this function:

```javascript
function validateEmail(email) {
  if (!email) return { valid: false, error: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
}
```

Using Jest testing framework.

Include:
1. Unit tests for valid emails
2. Tests for invalid email formats
3. Tests for edge cases (null, undefined, empty string)
4. Tests for special characters
5. Tests for boundary cases
6. Test coverage should be 100%
7. Use descriptive test names
8. Include test data for various scenarios
```

**2. Specify Testing Requirements:**
- Testing framework
- Coverage requirements
- Test types (unit, integration, e2e)
- Mocking requirements

**Example:**
```
Create tests for this React component using React Testing Library:

[COMPONENT_CODE]

Requirements:
- Test user interactions
- Test props and state changes
- Test error states
- Test loading states
- Mock API calls
- Test accessibility
- Achieve 90%+ code coverage
```

**3. Request Test Data:**
- Ask for realistic test data
- Include edge cases
- Request various scenarios

**Example:**
```
Generate test data for this user registration form:

Fields:
- Name (required, 2-50 characters)
- Email (required, valid email format)
- Password (required, min 8 chars, must include uppercase, lowercase, number)
- Age (optional, 18+)

Provide:
- Valid test cases
- Invalid test cases for each field
- Edge cases (boundary values)
- Special characters scenarios
```

### Common Patterns

**Pattern 1: Unit Testing**
```
Write unit tests for this function:
[CODE]

Using [TESTING_FRAMEWORK].

Test:
- Happy path scenarios
- Edge cases
- Error cases
- Boundary conditions
- Different input types
```

**Pattern 2: Integration Testing**
```
Create integration tests for this feature:
[FEATURE_DESCRIPTION]

Test:
- Component interactions
- API integration
- Database operations
- Error handling
- End-to-end user flows
```

**Pattern 3: Test Data Generation**
```
Generate test data for [SCENARIO]:

Requirements:
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

Include:
- Valid test cases
- Invalid test cases
- Edge cases
- Boundary values
```

### Interview Tips
- Show you understand different testing types
- Demonstrate knowledge of testing frameworks
- Explain test coverage importance
- Mention testing best practices

</expand>

<expand title="General Prompt Engineering Best Practices">
## General Prompt Engineering Best Practices

### Structure Your Prompts

**1. Start with Context:**
- What are you trying to achieve?
- What's the current situation?
- What's your tech stack?

**2. Be Specific:**
- Use concrete examples
- Specify requirements clearly
- Mention constraints
- Include acceptance criteria

**3. Request Format:**
- Ask for specific output format
- Request code examples
- Ask for explanations
- Specify level of detail

**4. Iterate and Refine:**
- Start broad, then narrow down
- Ask follow-up questions
- Request clarifications
- Refine based on results

### Common Mistakes to Avoid

**1. Vague Prompts:**
❌ "Fix my code"
✅ "Fix the TypeScript error in UserService.ts at line 45: 'Property 'email' does not exist on type 'User'"

**2. Missing Context:**
❌ "Make this faster"
✅ "Optimize this function to reduce execution time from 2s to <200ms. Current code: [CODE]. It processes 10,000 records."

**3. Too Many Requirements:**
❌ Asking for everything at once
✅ Break into smaller, focused prompts

**4. No Examples:**
❌ "Add error handling"
✅ "Add error handling following this pattern: [EXAMPLE]. Handle these specific errors: [ERROR_LIST]"

### Advanced Techniques

**1. Chain of Thought:**
```
Solve this problem step by step:
1. First, analyze the requirements
2. Then, design the solution
3. Finally, implement the code

Problem: [PROBLEM]
```

**2. Few-Shot Learning:**
```
Here are examples of what I want:

Example 1:
[INPUT] → [OUTPUT]

Example 2:
[INPUT] → [OUTPUT]

Now do the same for:
[NEW_INPUT]
```

**3. Role-Playing:**
```
You are a senior software engineer reviewing code. Review this code:
[CODE]

Provide feedback as if you're doing a code review for a colleague.
```

**4. Iterative Refinement:**
```
First, provide a basic implementation.
Then, I'll ask for improvements in specific areas.
```

### Interview Preparation

**Common Questions:**
- "How do you use AI tools in your development workflow?"
- "What's your process for writing effective prompts?"
- "How do you ensure AI-generated code is production-ready?"
- "What are the limitations of AI coding assistants?"

**How to Answer:**
- Mention specific tools (GitHub Copilot, ChatGPT, Cursor, etc.)
- Explain your prompt engineering process
- Discuss code review and testing of AI-generated code
- Mention when you use AI vs. write code yourself
- Explain how you verify AI suggestions

### Summary

Effective prompt engineering is a skill that improves with practice. The key is to:
- **Be Clear:** Specify exactly what you need
- **Provide Context:** Give enough information for accurate results
- **Iterate:** Refine prompts based on results
- **Verify:** Always review and test AI-generated code
- **Learn:** Understand what works best for different scenarios

Mastering prompt engineering makes you more productive and helps you leverage AI tools effectively in your development workflow.

</expand>

## Secondary Concepts

<expand title="Advanced Prompt Techniques">
## Advanced Prompt Techniques

### Chain of Thought Prompting
- Break down complex problems into steps
- Ask AI to think step by step
- Useful for debugging and problem-solving

### Few-Shot Learning
- Provide examples of desired output
- Show pattern you want AI to follow
- Effective for consistent formatting

### Role-Playing Prompts
- Assign AI a specific role (senior engineer, code reviewer, etc.)
- Gets more contextual and professional responses
- Useful for code reviews and architecture discussions

</expand>
