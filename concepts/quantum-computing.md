# Quantum Computing

## Primary Concepts

<expand title="Introduction to Quantum Computing">
## Introduction to Quantum Computing

- **Emerging Technology**: Still in early days, but real and available
- **Not Just Theoretical**: Can sign up to use quantum computers from Microsoft, IBM, and others online
- **Current State**: More for research, experimentation, and education than production applications
- **Focus**: Understanding why quantum computing matters and what problems it can solve
- **Approach**: Start with the "why" before getting into technical details

- **Key Questions**:
  - Why is quantum computing important?
  - Why are some people enthusiastic?
  - Why are others worried?
  - Why are some skeptical about practical applications?
  - What problems can it solve that regular computers can't?

</expand>

<expand title="Classical vs Quantum Computers">
## Classical vs Quantum Computers

- **Classical Computers**: 
  - Term used to describe regular, normal computers
  - Every computer we've ever used (laptops, desktops, servers, phones, supercomputers)
  - All built on same fundamental ideas
  - Different in size, speed, and power, but same basic approach

- **Quantum Computers**:
  - Not just faster regular computers
  - Built in completely different way
  - Tap into strange behaviors of quantum physics
  - Solve problems too complex or time-consuming for classical computers

- **Key Difference**: 
  - Classical: Based on traditional computing principles
  - Quantum: Based on quantum mechanics principles
  - Different approaches, not just speed improvement

</expand>

<expand title="Problems Classical Computers Struggle With">
## Problems Classical Computers Struggle With

- **Intractable Problems**: 
  - We know how to solve them, but no efficient method exists
  - So incredibly time-consuming, there's no practical point
  - Quantum computing can make some of these manageable

- **Example 1: Integer Factorization**:
  - **Easy Direction**: Multiply two prime numbers together → get result quickly
  - **Hard Direction**: Start with large number → find the two prime factors
  - **Why Hard**: No efficient method, only very time-consuming approaches
  - **Real Example**: Number posted as challenge in 1991, solved in 2020
    - Took network of tens of thousands of computers several months
    - Would take one desktop computer 2,700 years
  - **Why It Matters**: Current cryptography relies on this being hard
    - Encryption uses fact that one direction is easy, other is hard
    - Quantum computers can solve this quickly
    - Threatens current encryption methods

- **Example 2: Optimization Problems**:
  - **Traveling Salesman Problem**: Find shortest route visiting all cities once
  - **Growth Pattern**: Not linear - gets exponentially harder
    - 4 cities: 24 possible routes
    - 5 cities: 120 routes
    - 10 cities: 3.5 million routes (100 hours to calculate)
    - 15 cities: Over 4,000 years to calculate all possibilities
  - **Real-World Applications**:
    - Shipping and logistics (UPS, FedEx routing)
    - Microchip design (component arrangement)
    - Astronomy (telescope positioning)
    - Many business optimization scenarios
  - **Challenge**: Not finding an answer (can guess quickly)
  - **Challenge**: Knowing if it's the best answer (need to check all possibilities)
  - **Classical Approach**: Calculate vast numbers of solutions and compare (very time-consuming)

</expand>

<expand title="Qubits and Superposition">
## Qubits and Superposition

- **Classical Bits**:
  - Billions of tiny electrical switches (transistors)
  - Each switch: on or off (1 or 0)
  - Represents data: numbers, text, graphics, programs
  - Basic fundamental state of classical computers

- **Quantum Bits (Qubits)**:
  - Different kind of bit used by quantum computers
  - Not just 1 or 0
  - Can be 1, can be 0, or **both at the same time**
  - This state is called **superposition**

- **Understanding Superposition**:
  - **Coin Toss Analogy**: 
    - During toss: neither heads nor tails, kind of both
    - Has probability of being heads, probability of being tails
    - Eventually resolves to one state when we look at it
  - **Not Just 3 States**: Not just 1, 0, or "half"
  - **All Probabilities**: Represents all combinations of probabilities of being 1 and 0
  - **Bloch Sphere**: Diagram showing all possible probability combinations
    - Top point: highest probability of 0
    - Bottom point: highest probability of 1
    - All other positions: different probability combinations

- **Information Capacity**:
  - 1 qubit ≈ 2 classical bits (in terms of information states)
  - 2 qubits ≈ 4 classical bits
  - 3 qubits ≈ 8 classical bits
  - **Exponential Growth**: Each additional qubit doubles the capacity
  - 32 qubits ≈ 4.3 billion classical bits
  - 64 qubits: Extremely large number
  - **Current State**: IBM reached 127 qubits (2021), aiming for 433+ by 2022, 1000+ by 2023

- **Key Benefit**: 
  - Not just more efficient data storage
  - Allows supporting multiple possibilities simultaneously
  - Enables dealing with different kinds of problems

</expand>

<expand title="How Quantum Computing Solves Problems">
## How Quantum Computing Solves Problems

- **Maze Analogy**:
  - **Classical Approach**: Try paths one at a time
    - Make choice at each decision point (left/right, 0/1)
    - Hit dead end, go back, try different path
    - Work through huge numbers of potential paths
  
  - **Quantum Approach**: 
    - Each decision point in superposition (all probabilities)
    - Can go down **all possible paths simultaneously**
    - Don't have to calculate each path individually

- **Applications**:
  - Finding items in huge databases
  - Optimization problems (finding best solution out of many)
  - Factorization problems
  - Any problem with many possible solutions to explore

- **Game-Changer**: 
  - Makes intractable problems tractable
  - Problems taking hundreds or thousands of years
  - Can be solved in minutes or seconds with quantum computers

</expand>

<expand title="Measurement and Collapse">
## Measurement and Collapse

- **The Problem**: 
  - If qubits are in superposition (all possibilities)
  - How do we get actual answer (1 or 0)?

- **Measurement**:
  - When we read/look at/measure a qubit in superposition
  - It "collapses" to specific state: either 1 or 0
  - Answer is never "superposition" - always 1 or 0

- **Simple Example**:
  - 1 qubit in superposition, measure it
  - Run program thousands of times
  - 50% of time: 1
  - 50% of time: 0
  - **Not Very Useful**: Need multiple qubits working together

</expand>

<expand title="Quantum Interference and Entanglement">
## Quantum Interference and Entanglement

- **Quantum Interference**:
  - **Not Always Bad**: Can be constructive or destructive
  - **Constructive**: Amplify and reinforce signals
  - **Destructive**: Cancel signals out
  - **In Quantum Computing**: 
    - Multiple qubits working together
    - Use interference to steer qubits
    - Amplify desired results
    - Cancel out unwanted results
    - Helps recognize which paths are good ones

- **Quantum Entanglement**:
  - Qubits can be "entangled" with each other
  - Change state of one qubit → immediately changes entangled qubit
  - Read state of one → know state of other without reading it
  - Connectedness/relationship between qubits

- **Both Are Essential**:
  - Not just characteristics of quantum computers
  - Characteristics of quantum physics itself
  - Essential features for creating quantum computing applications
  - Work together: superposition explores possibilities, interference/entanglement help find best answers

</expand>

<expand title="Cryptography Concerns">
## Cryptography Concerns

- **Current Encryption**:
  - **Public Key Cryptography**: One key to encrypt, different key to decrypt
  - **RSA Algorithm**: Relies on factoring being hard
    - Use large number (product of two primes) to encrypt
    - Only person with the two prime factors can decrypt
    - Large number can be shared publicly
    - Only private key holder can decrypt

- **The Threat**:
  - Quantum computers can factor large numbers efficiently
  - **Shor's Algorithm (1994)**: Describes how quantum computer can factor huge numbers
  - When quantum computers reach sufficient capability, current cryptography becomes trivial to crack
  - **Tipping Point**: We will reach stage where current methods are vulnerable

- **Solutions Being Developed**:
  - **Quantum Cryptography**: Using quantum computers for cryptography
  - **Post-Quantum Cryptography**: Using classical computers with quantum-resistant encryption
    - Encryption methods quantum computers can't crack
    - Not based on factoring large numbers
    - Can be used on regular computers
  - **Timeline**: Not yet at point where quantum computers can crack RSA
    - But work is happening now to prepare

</expand>

<expand title="Current State and Applications">
## Current State and Applications

- **Not Replacing Classical Computers**:
  - Quantum computers won't do everything better
  - Regular computers aren't going away
  - Many applications don't need quantum computing
  - Even quantum applications might be 95% classical, 5% quantum

- **Early Use Cases**:
  - **Logistics**: Route planning, supply chain optimization
  - **Life Sciences**: Chemical modeling, drug research and development
  - Areas with known optimization problems

- **Hardware Challenges**:
  - **Expensive**: Requires deep pockets, specialized hardware, research labs
  - **Super Cooling**: Needs to be near absolute zero for qubits to work
  - **Sensitive**: Affected by heat, vibration, magnetic interference
  - **Error Correction**: Key challenge - ensuring results aren't affected by interference

- **Cloud Access**:
  - Can pay to use quantum computing infrastructure
  - **Major Providers**: Microsoft, Google, Amazon, IBM
  - **Specialized Companies**: D-Wave, IonQ, Atom, Rigetti
  - Provide resources: sample code, guides, simulators

- **Programming**:
  - **Languages/Frameworks**: 
    - IBM: Qiskit (Python-based SDK)
    - Microsoft: Q# language
  - **Requires More Knowledge**: 
    - Fundamentals of quantum mechanics
    - Comfort with linear algebra
    - More background than classical programming

</expand>

<expand title="Quantum Supremacy/Advantage">
## Quantum Supremacy/Advantage

- **Definition**: 
  - Point where quantum computer can reliably execute calculation
  - That would be intractable problem for classical computer
  - Many prefer term "quantum advantage" over "quantum supremacy"

- **Google's Claim (2019)**:
  - Quantum computer: 200 seconds
  - Classical supercomputer: 10,000 years (Google's claim)
  - **Debate**: IBM said their supercomputer would take 2.5 days, not 10,000 years

- **Not a Single Point**:
  - Demonstrating advantage in one situation doesn't mean everything
  - Different problems have different tipping points
  - Progress is being made, but not uniform

- **Current Status**:
  - **Not Yet**: Can't crack RSA encryption
  - **Not Yet**: Every business use case practical
  - **Needs**: More qubits, better error correction, more skilled programmers
  - **Expert Opinions Vary**: 
    - Some: Few years away from general quantum advantage
    - Others: Decades away
    - Some: May hit technological limitations preventing large-scale quantum computers

</expand>

## Secondary Concepts

<expand title="Why Quantum Computing Matters">
## Why Quantum Computing Matters

- **Wide-Ranging Implications**:
  - Finding cures for diseases
  - Personalized medicine
  - Better materials (solar panels, batteries)
  - Climate change solutions
  - Optimization in many business areas

- **Not Often**: Technology with such wide-ranging implications comes along
- **Early Days**: But people care because of potential
- **Interesting Technology**: Even if parts of it seem weird

</expand>

<expand title="Key Characteristics Summary">
## Key Characteristics Summary

- **Qubits**: Can be 1, 0, or both (superposition)
- **Superposition**: Allows exploring multiple possibilities simultaneously
- **Interference**: Amplifies good results, cancels bad ones
- **Entanglement**: Qubits connected, changing one affects the other
- **Measurement**: Collapses superposition to specific state (1 or 0)
- **Exponential Capacity**: Each qubit doubles information capacity

</expand>

<expand title="Problem Types Quantum Computing Excels At">
## Problem Types Quantum Computing Excels At

- **Factorization**: Breaking large numbers into prime factors
- **Optimization**: Finding best solution from millions/billions of possibilities
- **Search Problems**: Finding items in huge databases
- **Simulation**: Modeling quantum systems (chemistry, materials)
- **Machine Learning**: Certain types of pattern recognition

- **Not Good At**: 
  - General computing tasks
  - Simple calculations
  - Most everyday applications
  - Tasks classical computers handle well

</expand>

<expand title="Future Outlook">
## Future Outlook

- **Rapid Progress**: Last few years show very rapid advancement
- **Potential Benefits**: 
  - Medical breakthroughs
  - Better materials
  - Climate solutions
  - Business optimization

- **Challenges**:
  - Encryption security
  - Hardware limitations
  - Error correction
  - Skilled workforce

- **Optimistic View**: World could be better place with quantum computers
- **Realistic View**: Still early days, many challenges remain
- **Key**: Finding ways to deal with challenges (especially encryption)

</expand>