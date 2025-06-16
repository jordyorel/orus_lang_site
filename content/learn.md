+++
title = "Learn"
description = "Learn how to program in Orus"
template = "learn.html"
weight = 2
+++

# Learn Orus

Welcome to the Orus learning materials. Whether you're new to programming or coming from another language, these resources will help you start writing Orus code.

<div class="learn-options">
    <a href="/tutorial/" class="learn-card">
        <h3>Full Orus Tutorial</h3>
        <p>A comprehensive step-by-step guide to learning Orus from the basics to advanced concepts</p>
    </a>
    <a href="/playground/" class="learn-card">
        <h3>Online Playground</h3>
        <p>Try Orus in your browser without installing anything, with live code execution and examples</p>
    </a>
</div>

## First Steps with Orus

### Hello World

Create a file called `hello.orus` with the following content:

```orus
fn main() {
    println("Hello, Orus World!");
}
```

Compile and run it:

```bash
orus build hello.orus
orusc hello.orus
```

### Basic Concepts

#### Variables and Types

```orus
fn main() {
    // Type inference
    let name = "Orus";
    
    // Explicit typing
    let age: i32 = 1;
    
    // Constants
    const VERSION: f32 = 0.1;
    
    println("Language: {}, Age: {}, Version: {}", name, age, VERSION);
}
```

#### Functions

```orus
// Basic function
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}

// Function with multiple return values
fn divide_remainder(dividend: i32, divisor: i32) -> (i32, i32) {
    let quotient = dividend / divisor;
    let remainder = dividend % divisor;
    return (quotient, remainder);
}

fn main() {
    let sum = add(5, 7);
    let (quotient, remainder) = divide_remainder(10, 3);
    
    println("Sum: {}", sum);
    println("Quotient: {}, Remainder: {}", quotient, remainder);
}
```

## Learning Resources

- [The Orus Book](/docs/book/): A comprehensive guide to the Orus programming language
- [Orus by Example](/learn/by-example/): Learn Orus through practical examples
- [Standard Library Documentation](/docs/std/): Reference for Orus's standard library
- [Orus Cookbook](/learn/cookbook/): Recipes for common programming tasks in Orus

## Going Further

- [Effective Orus](/learn/effective-orus/): Best practices for writing idiomatic Orus code
- [Concurrency in Orus](/learn/concurrency/): Working with threads, async/await, and parallelism
- [Memory Management](/learn/memory/): Understanding Orus's memory model and optimizations
