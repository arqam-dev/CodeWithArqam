# Object Oriented Programming

## Primary Concepts

<expand title="Notes">
## Notes

- Static member functions can never be virtual
- OOP concepts allow real objects to be implemented in code and programs

</expand>

<expand title="Interface">
## Interface

- Contains only declarations of methods, properties, indexers, and events (no implementation)
- Can be implemented implicitly or explicitly by a class or struct
- Class implementing interface must use public access modifier for implementing members
- Interface cannot include private, protected, or internal members
- Methods declared in interface are by default abstract (only method signature, no body)
- Variables declared in interface are public, static & final by default
- A class can implement multiple interfaces (enables multiple inheritance)
- The class that implements interface must implement all methods (unless abstract class)
- Example: Media player interface with methods like play, pause, stop, etc.
- Example: HTML "img" tag - must override "src" every time (Full Abstraction)
- Advantages: Multiple inheritance, security, contract enforcement

</expand>

<expand title="Abstract Class">
## Abstract Class

- A class that is declared abstract, may or may not include abstract methods
- The subclass usually provides implementations for all abstract methods in parent class
- If subclass does not implement all abstract methods, it must also be declared abstract
- A class can extend only one abstract class (vs multiple interfaces)
- Abstract classes can have constructors (automatically invoked when concrete subclass object is created)
- Abstract class cannot be instantiated, but pointers and references of abstract class type can be created
- Mainly used for UpCasting
- Example: Shape class - general class with no definition for area, different shapes inherit from it
- Example: HTML "div" has default attributes, can override some (Partial Abstraction)
- Purpose: Define common behavior that can be inherited by multiple subclasses without implementing entire class

</expand>

<expand title="Abstract Function/Method">
## Abstract Function/Method

- Method declared without implementation in abstract class
- Must be implemented by concrete subclasses

</expand>

<expand title="Concrete Class">
## Concrete Class

- A class that has implementation for all of its methods
- Cannot have any unimplemented methods
- Can extend abstract class or implement interface as long as it implements all their methods
- Complete class that can be instantiated

</expand>

<expand title="UpCasting (opposite of DownCasting)">
## UpCasting (opposite of DownCasting)

- Using super class's reference or pointer to refer to sub class's object
- Converting sub class's reference/pointer into super class's reference/pointer
- Example: Super* ptr; Sub obj; ptr = &obj;

</expand>

<expand title="Abstraction VS Encapsulation">
## Abstraction VS Encapsulation

- Abstraction: Works on design level - hides unnecessary data, highlights what object does instead of how it works
- Encapsulation: Works on application level - binds data and functionalities, hides code and data together
- Abstraction: Focuses on outside viewing (e.g., shifting the car) - supported with interface and abstract class
- Encapsulation: Focuses on internal working (e.g., production of car) - supported with access modifiers (public, private, protected)
- Abstraction: Hiding implementation with interface/abstract class
- Encapsulation: Hiding data with getters and setters
- Abstraction + Interface + Encapsulation: Abstraction extracts required attributes from case study, Encapsulation makes a class from those things

</expand>

<expand title="Inheritance Access Modifiers">
## Inheritance Access Modifiers

- Public Inheritance:
  - Public => Public
  - Protected => Protected
  - Private => Private
- Protected Inheritance:
  - Public => Protected
  - Protected => Protected
  - Private => Not Accessible
- Private Inheritance:
  - Public => Not Accessible
  - Protected => Not Accessible
  - Private => Not Accessible

</expand>

<expand title="Composition VS Aggregation VS Association">
## Composition VS Aggregation VS Association

- Association: A relationship between two objects
- Composition: Association where one object owns another (child cannot exist independent of parent)
  - Example: House has Rooms
- Aggregation: Association where one object uses another (child can exist independent of parent)
  - Example: Classroom has Students

</expand>

<expand title="Overloaded Functions (Function Overloading)">
## Overloaded Functions (Function Overloading)

- Can be overloaded by changing number of arguments
- Can be overloaded by having different types of arguments
- Can be overloaded by changing sequence of parameters
- Note: int sum(int, int) and double sum(int, int) are NOT overloaded (same signature)
- Note: func(int i, double j) and func(double i, int j) ARE overloaded (different parameter types/order)
- Note: JavaScript does NOT support function overloading

</expand>

<expand title="Interface VS Abstract Class">
## Interface VS Abstract Class

- Interface: Cannot keep variables and objects, all methods must be implemented
- Abstract Class: Can have variables, objects, and non-abstract methods
- Both: Cannot create objects/instances directly
- Interface: Implements multiple interfaces possible, mandatory to implement all methods
- Abstract Class: Extends only one abstract class, must implement all abstract methods
- Interface: Full abstraction (no implementation at all)
- Abstract Class: Partial abstraction (can have some implementation)

</expand>

<expand title="Final Keyword">
## Final Keyword

- Final Variable: Creates constant variable (cannot be reassigned)
- Final Method: Prevents method overriding
- Final Class: Prevents inheritance

</expand>

<expand title="Virtual Function VS Pure Virtual Function">
## Virtual Function VS Pure Virtual Function

- Virtual Function: Has definition in base class, can be overridden in derived class
- Pure Virtual Function: Only declaration in base class, no definition
- Virtual: If derived class does not implement, no compile error occurs
- Pure Virtual: If derived class does not implement, child class becomes abstract
- Pure Virtual: Can have small default definition in abstract class for all derived classes

</expand>

<expand title="Functions That Are Never Inherited">
## Functions That Are Never Inherited

- Constructors
- Destructors
- Assignment operator

Secondary Concepts

OOP with JavaScript

</expand>

<expand title="Notes">
## Notes

- JavaScript is not a class-based OOP language like Java, C++
- JavaScript uses prototype-based inheritance
- Classes in JavaScript are syntactic sugar over constructor functions
- When using parent class variable in child class, use "this" keyword
- When using parent class method in child class, use "super" keyword
- When using self class method, use "this" keyword
- Cannot call function without "this" or "super" in classes
- Static variable is related to the class, not the object
- Access static variable using parent class name (not "this" keyword)
- Can access static variable outside class using class name
- Can access instance variable outside class using object name
- Can update value of static variable but not const variable
- Static variables reside in memory throughout application life
- Can measure count of objects by declaring static variable, incrementing in constructor, decrementing in destructor
- Static member function can be called even if no objects exist, accessed using class name and scope resolution
- Cannot override static method
- Overloading = static binding (compile-time)
- Overriding = dynamic binding (runtime)
- JavaScript does NOT support function overloading (no compile-time method overloading)

</expand>

<expand title="Access Modifiers">
## Access Modifiers

- Default is public in JavaScript
- Use "#" prefix for private field declaration (ES2022)
- Private fields: #fieldName (cannot be accessed outside class)

</expand>

<expand title="Prototypal Inheritance">
## Prototypal Inheritance

- JavaScript uses prototype chain for inheritance
- All objects inherit from Object.prototype
- Can add methods to prototype: ClassName.prototype.methodName = function() {}

</expand>

## Secondary Concepts

