# Primary Concepts

<expand title="Category of tasks">
## Category of tasks

    - Features:
        - Functional Testing: Ensure that the new features or enhancements work as intended
        - Integration Testing: Check if the new code integrates seamlessly with the existing system.
        - Regression Testing: Ensure that existing functionality is not negatively impacted by the new features.
    - Bugs:
        - Regression Testing: Ensure that the bug fixes do not introduce new issues.
        - Retesting: Verify that the specific bug reported has been resolved.
    - Production Bugs:
        - Urgent Regression Testing: Verify the fix in the production environment.
        - Performance Testing: Ensure that the production environment is stable after the fix.
    - Change Requests:
        - Impact Analysis: Understand the potential impacts of changes.
        - Regression Testing: Ensure that existing functionality is not affected by the changes.
    - Security Updates:
        - Security Testing: Verify that the implemented security updates effectively address vulnerabilities.
    - Performance Optimization:
        - Performance Testing: Measure and verify improvements in system performance.
    - Code Refactoring:
        - Regression Testing: Ensure that refactoring does not introduce functional issues.
    - Documentation Updates:
        - Documentation Review: Ensure that updated documentation accurately reflects the changes made.
    - Infrastructure Changes:
        - Deployment Testing: Ensure that changes to infrastructure do not disrupt the system.
    - User Interface (UI) Changes:
        - UI Testing: Verify that the UI changes are visually consistent and functionally sound.

</expand>

<expand title="Developer Testing">
## Developer Testing

    - Unit Testing:
        - Def: Test individual functions, components, or modules in isolation using frameworks like:
        - React: Jest + React Testing Library
        - Angular: Jasmine + Karma
        - Node.js: Jest or Mocha + Chai
    - Integration Testing:
        - Def: Test how different parts of the system interact.
        - React/Angular: Mock API calls to ensure frontend and backend communication works.
        - Node.js: Test API endpoints with tools like Supertest or Postman/Newman.
    - Manual / Functional Testing:
        - Def: After unit and integration tests, I run the feature manually in a dev or staging environment.
        - Check all edge cases (empty states, errors, invalid inputs, etc.)
        - Use browser dev tools or Postman to verify backend logic.
    - End-to-End (E2E) Testing:
        - Def: Simulate a real user flow across the full stack.
        - Tools: Cypress, Playwright, or Protractor (for Angular)
        - For Node + Frontend: Use a test database and mock external services.

</expand>

<expand title="CI/CD Methods/Tools">
## CI/CD Methods/Tools

    - These are ways you automate building, testing, and deploying your code:
        - GitHub Actions: GitHub-integrated CI/CD
        - GitLab CI/CD: GitLab-integrated CI/CD
        - Jenkins: Standalone customizable CI/CD server

Secondary Concepts

Selenium

</expand>

<expand title="Selenium WebDriver Commands">
## Selenium WebDriver Commands

- get(String s):
  - This command is used to open any webpage URL
  - driver.get ("https://www.qascript.com") ;
- navigate().to(Url url):
  - To navigate to a particular webpage URL.
  - driver.navigate().to("https://qascript.com/contact-us");
- navigate().forward():
  - The forward command navigates the browser forward by one page recorded in the browsing history.
  - driver.navigate().forward();
- navigate().back():
  - The back command instructs the browser to redirect to the immediate previous webpage.
  - driver.navigate().back();

Angular Testing

</expand>

<expand title="Reference Repo: https://github.com/arqam-dev/AngularTestCases-LearningProject">
## Reference Repo: https://github.com/arqam-dev/AngularTestCases-LearningProject

</expand>

<expand title="Angular Test Cases (using .spec.ts files)">
## Angular Test Cases (using .spec.ts files)

    - Testing Library Used:
        - Jasmine (v5.9.0):
            - This is the main testing library for writing Angular test cases
            - Provides all the syntax: describe(), it(), expect(), toBe(), etc.
            - All test code is written using Jasmine syntax
            - Test files are created as .spec.ts files (e.g., component.spec.ts)
    - Important Notes:
        - Karma:
            - Just a test runner tool that executes the tests
            - Similar to how npm runs scripts - you don't write code for it
            - Handles the execution environment and browser testing
        - TestBed:
            - Angular's built-in testing utility
            - Comes with Angular framework (not a separate library)
            - Used for configuring and creating Angular testing modules
            - Helps set up the testing environment for components, services, etc.
    - Running Tests:
        - Command: npm test or ng test
        - Tests run independently - no need for dev server (npm start) to be running
        - Tests run in their own isolated environment
    - Basic Test Structure (.spec.ts files):
        - All test files end with .spec.ts (e.g., app.spec.ts)
        - Structure:
            - describe('Component Name', () => { ... }) - Test suite
            - beforeEach(async () => { ... }) - Setup before each test
            - it('should do something', () => { ... }) - Individual test
            - expect(component.property).toBe(value) - Assertion
    - Common Test Examples:
        - Test Component Property:
            - expect(component.count).toBe(0);
        - Test Component Method:
            - component.increment();
            - expect(component.count).toBe(1);
        - Test Template Display:
            - component.count = 5;
            - fixture.detectChanges(); // Always required after state change
            - const element = fixture.nativeElement.querySelector('h2');
            - expect(element.textContent).toContain('Counter: 5');
        - Test Button Click:
            - button.click();
            - fixture.detectChanges();
            - expect(component.count).toBe(1);
    - Important: Always Call fixture.detectChanges():
        - Required after modifying component properties or interacting with UI
        - Updates the template to reflect component state changes
        - Without it, template won't update and tests may fail
    - Key Jasmine Matchers:
        - toBe(value) - Exact equality
        - toEqual(value) - Deep equality for objects/arrays
        - toContain(value) - Check if contains value
        - toBeTruthy() - Check if truthy
        - toBeFalsy() - Check if falsy
    - Understanding Test Results:
        - Test Failure (bug in code):
            - Shows test name that failed
            - Shows expected vs actual values
            - Tests can run (code compiles)
            - Example: "Expected 1 to be 2" - fix your component code
        - Code Error (syntax/compilation):
            - Shows ERROR or "Cannot find module"
            - Tests cannot run (code won't compile)
            - Usually TypeScript errors, missing imports, type mismatches
            - Fix syntax/imports/types first, then tests can run
    - Testing Concepts:
        - Unit Testing: Testing components in isolation using Jasmine
        - Component Testing: Testing Angular components (logic + UI, interactions)
        - Test Organization: Separate test files per component, organize tests by priority/criticality
        - Test Execution: Watch mode (auto-rerun on changes), single run mode, component-specific test execution
        - CI/CD Integration: Automated tests on push/PR using GitHub Actions, GitLab CI, or Jenkins
        - Test Structure: Arrange-Act-Assert pattern for organizing test code
        - UI Testing: Template rendering, user interactions, state updates verification
    - Test Commands:
        - npm test or ng test - Run all tests (watch mode)
        - ng test --watch=false - Single run (no watch mode)
        - Custom commands can be created in package.json for specific test scenarios
        - Examples: Run specific test files, run tests for specific components, run critical tests only
    - Test Structure Pattern (Arrange-Act-Assert):
        - Arrange: Set up test data and component state
        - Act: Execute the action being tested
        - Assert: Verify the expected outcome
    - Testing Pyramid:
        - Unit/Component Tests (Many): Foundation - most tests should be at this level
        - Integration Tests (Some): Testing how multiple components/services work together
        - E2E Tests (Few): Testing complete user flows end-to-end
    - Advanced Testing Concepts:
        - Integration Testing: Testing how multiple components work together
        - E2E Testing: Testing entire application flow (Cypress, Playwright, Protractor)
        - Mocking and Spies: Creating fake dependencies for testing isolated components
        - Service Testing: Testing Angular services (business logic, data processing)
        - HTTP Testing: Testing API calls using HttpTestingController
        - Form Testing: Testing Angular forms (validation, submission, error handling)
        - Routing Testing: Testing navigation, route guards, and route parameters
        - Test Coverage: Measuring how much code is tested (code coverage metrics)
    - DevOps & Cloud Testing Tools:
        - CI/CD Tools:
            - Jenkins: Standalone CI/CD server for automated testing pipelines
            - CircleCI: Cloud-based CI/CD platform
            - Azure DevOps: Microsoft's CI/CD and testing platform
            - AWS CodePipeline: AWS cloud-based CI/CD service
            - Travis CI: Cloud-based CI/CD platform
        - Cloud Testing Platforms:
            - BrowserStack: Cross-browser and device testing in the cloud
            - Sauce Labs: Cloud-based automated testing platform
            - LambdaTest: Cross-browser testing on cloud infrastructure
            - AWS Device Farm: Mobile and web app testing on real devices
        - Performance Testing Tools:
            - JMeter: Load testing and performance measurement
            - Gatling: Performance testing tool
        - Visual Regression Testing:
            - Percy: Visual testing and review platform
            - Chromatic: Visual testing for component libraries
            - Applitools: AI-powered visual testing platform

</expand>

