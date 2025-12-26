# Data Structures

<expand title="Notes">
## Notes

- Data structures are ways of organizing and storing data in computer memory
- Algorithms are step-by-step procedures for solving problems
- Choosing appropriate data structure improves efficiency of algorithms

</expand>

<expand title="Why Learn Data Structures and Algorithms">
## Why Learn Data Structures and Algorithms

- Handle data search efficiently (e.g., inventory of millions of items)
- Optimize processor usage (even fast processors fail with billions of records)
- Manage multiple simultaneous requests (thousands of users searching web server)

</expand>

<expand title="Applications">
## Applications

- Search, Sort, Insert, Update, Delete operations
- Database indexing
- Network routing
- Operating system scheduling
- Compiler design

</expand>

<expand title="Foundation Terms">
## Foundation Terms

- Interface:
  - Set of operations a data structure supports
  - Defines operation names, parameters, return types
- Implementation:
  - Internal representation of data structure
  - Algorithm definitions for operations

</expand>

<expand title="Characteristics">
## Characteristics

- Correctness: Implementation should match interface correctly
- Time Complexity: Execution time should be minimal
- Space Complexity: Memory usage should be minimal

</expand>

<expand title="Execution Time Cases">
## Execution Time Cases

- Worst Case: Maximum time required (most important for guarantees)
- Average Case: Expected time for typical input
- Best Case: Minimum time required (least important)

</expand>

<expand title="Basic Terminology">
## Basic Terminology

- Data: Values or set of values
- Data Item: Single unit of value
- Elementary Items: Cannot be divided further
- Group Items: Can be divided into sub-items
- Record: Collection of field values for an entity
- File: Collection of records

</expand>

<expand title="Asymptotic Notations (Big-O)">
## Asymptotic Notations (Big-O)

- Ο (Big O): Upper bound, worst-case time complexity
- Ω (Omega): Lower bound, best-case time complexity
- θ (Theta): Both upper and lower bound (tight bound)
- Common complexities:
  - O(1) - Constant time
  - O(log n) - Logarithmic
  - O(n) - Linear
  - O(n log n) - Linearithmic
  - O(n²) - Quadratic
  - O(2ⁿ) - Exponential
  - O(n!) - Factorial

</expand>

<expand title="Algorithm Design Paradigms">
## Algorithm Design Paradigms

- Greedy Algorithms:
  - Make locally optimal choice at each step
  - May not always lead to globally optimal solution
  - Examples: Counting coins, Huffman coding, Dijkstra's shortest path
- Divide and Conquer:
  - Divide: Break problem into subproblems
  - Conquer: Solve subproblems recursively
  - Merge: Combine solutions
  - Examples: Merge Sort, Quick Sort, Binary Search, Strassen's Matrix Multiplication

</expand>

<expand title="Data Types">
## Data Types

- Built-in: Integer, Boolean, Float, Character, String
- Derived: List, Array, Stack, Queue

</expand>

<expand title="Basic Operations">
## Basic Operations

- Traversing: Accessing each element
- Searching: Finding specific element
- Insertion: Adding new element
- Deletion: Removing element
- Sorting: Arranging in order
- Merging: Combining data structures

</expand>

<expand title="Array">
## Array

- Fixed-size collection of items of same type
- Random access by index: O(1)
- Insertion/Deletion: O(n) in worst case
- Memory: Contiguous allocation
- Syntax: Type Name[Size] = {Elements}

</expand>

<expand title="Linked List">
## Linked List

- Sequence of nodes connected via pointers/links
- Dynamic size, non-contiguous memory
- Access: O(n), Insertion/Deletion: O(1) if position known
- Types:
  - Singly Linked List: Forward navigation only
  - Doubly Linked List: Forward and backward navigation
  - Circular Linked List: Last node points to first node
- Structure: Head → Node(Data, Next) → Node(Data, Next) → NULL

</expand>

<expand title="Stack">
## Stack

- LIFO (Last In First Out) or FILO (First In Last Out)
- Operations:
  - push() - Add element to top
  - pop() - Remove element from top
  - peek() - Get top element without removing
  - isEmpty() - Check if stack is empty
  - isFull() - Check if stack is full
- Applications: Expression evaluation, function calls, undo operations

</expand>

<expand title="Expression Parsing">
## Expression Parsing

- Infix Notation: a + b (operator between operands)
- Prefix Notation (Polish): + a b (operator before operands)
- Postfix Notation (Reverse Polish): a b + (operator after operands)
- Stack used to convert between notations

</expand>

<expand title="Queue">
## Queue

- FIFO (First In First Out)
- Operations:
  - enqueue() - Add element to rear
  - dequeue() - Remove element from front
  - peek() - Get front element
  - isEmpty() - Check if empty
  - isFull() - Check if full
- Applications: Process scheduling, BFS, print queues

</expand>

<expand title="Searching Algorithms">
## Searching Algorithms

- Linear Search:
  - Time Complexity: O(n)
  - Works on unsorted arrays
  - Simple iteration through all elements
- Binary Search:
  - Time Complexity: O(log n)
  - Requires sorted array
  - Divide and conquer approach
  - mid = low + (high - low) / 2
- Interpolation Search:
  - Time Complexity: O(log log n) average, O(n) worst case
  - Improved binary search for uniformly distributed sorted data

</expand>

<expand title="Hash Table">
## Hash Table

- Key-value pair storage with O(1) average access time
- Hashing: Convert key to array index
- Collision Resolution:
  - Linear Probing: Search next empty cell sequentially
  - Chaining: Store multiple items in same bucket using linked list
  - Open Addressing: Find alternative location when collision occurs

Secondary Concepts

</expand>

<expand title="Sorting Algorithms">
## Sorting Algorithms

- Stable Sorting:
  - Maintains relative order of equal elements
  - Example: Input [2, 3a, 5, 3b] → Output [2, 3a, 3b, 5]
- Unstable Sorting:
  - May change relative order of equal elements
  - Example: Input [2, 3a, 5, 3b] → Output [2, 3b, 3a, 5]
- Bubble Sort:
  - Time Complexity: O(n²)
  - Compares adjacent elements and swaps if out of order
  - Repeats until no swaps needed
- Selection Sort:
  - Time Complexity: O(n²)
  - Finds minimum element, swaps with first position, repeats
  - Divides array into sorted and unsorted parts
- Insertion Sort:
  - Time Complexity: O(n²) worst case, O(n) best case
  - Builds sorted array one element at a time
  - Efficient for small data sets or nearly sorted data
- Merge Sort:
  - Time Complexity: O(n log n) all cases
  - Divide and conquer: split array, sort halves, merge
  - Stable sort, good for large datasets
- Quick Sort:
  - Time Complexity: O(n log n) average, O(n²) worst case
  - Divide and conquer with pivot element
  - In-place sorting, efficient in practice
- Shell Sort:
  - Time Complexity: O(n log² n) average, depends on gap sequence
  - Based on insertion sort with gap intervals

</expand>

<expand title="Tree">
## Tree

- Hierarchical data structure with nodes and edges
- Binary Tree: Each node has at most 2 children
- Important Terms:
  - Root: Topmost node
  - Parent/Child: Relationship between nodes
  - Leaf: Node with no children
  - Path: Sequence of nodes from root to target
  - Subtree: Tree within tree
  - Levels: Depth of nodes from root
- Traversal Methods:
  - Preorder (N-L-R): Visit root, traverse left, traverse right
  - Inorder (L-N-R): Traverse left, visit root, traverse right
  - Postorder (L-R-N): Traverse left, traverse right, visit root
- Binary Search Tree (BST):
  - Left subtree < root < right subtree
  - Enables efficient search: O(log n) average, O(n) worst case
  - Inorder traversal gives sorted sequence

</expand>

<expand title="Heap">
## Heap

- Special binary tree structure
- Min-Heap: Root ≤ children (minimum at root)
- Max-Heap: Root ≥ children (maximum at root)
- Applications: Priority queues, heap sort
- Operations:
  - Insert: Add to end, heapify up
  - Delete: Remove root, move last element to root, heapify down

</expand>

<expand title="Graph">
## Graph

- Collection of nodes (vertices) connected by edges
- Traversal Algorithms:
  - Depth First Search (DFS):
  - Uses Stack (recursion)
  - Goes deep before going wide
  - Time Complexity: O(V + E)
  - Applications: Path finding, cycle detection, topological sorting
  - Breadth First Search (BFS):
  - Uses Queue
  - Goes wide before going deep
  - Time Complexity: O(V + E)
  - Applications: Shortest path (unweighted), network broadcasting, GPS navigation

</expand>

<expand title="Recursion">
## Recursion

- Function calls itself to solve problem
- Components:
  - Base Case: Stopping condition
  - Recursive Case: Function calls itself with modified parameters
- Uses Stack for function calls
- Time Complexity: Often O(n) but depends on problem
- Examples: Fibonacci series, Tower of Hanoi, tree traversals
- Trade-offs: Clean code vs stack overflow risk for deep recursion

</expand>

<expand title="Key Concepts">
## Key Concepts

- Space-Time Tradeoff: Using more memory to reduce computation time
- In-place Algorithm: Uses constant extra space
- Stable Algorithm: Maintains relative order of equal elements
- Comparison vs Non-comparison Sorts
- Amortized Analysis: Average performance over sequence of operations

</expand>

