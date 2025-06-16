+++
title = "Built-in Helpers"
description = "Using built-in functions and utilities"
template = "tutorial.html"
weight = 10
+++

# Built-in Helpers

Common functions like `len`, `range` and `timestamp` are always available:

```orus
let now = timestamp()
print(len([1,2,3]))
```

Orus provides several built-in functions for common tasks:

## Array Operations

```orus
// Length of an array
let size = len([1, 2, 3, 4])

// Push and pop
let arr = [1, 2, 3]
push(arr, 4)  // arr is now [1, 2, 3, 4]
let last = pop(arr)  // last = 4, arr is now [1, 2, 3]

// Min and max
let min_val = min([5, 2, 8, 1])  // min_val = 1
let max_val = max([5, 2, 8, 1])  // max_val = 8

// Sum
let total = sum([1, 2, 3, 4])  // total = 10

// Sort
let sorted = sorted([3, 1, 4, 2], false)  // ascending: [1, 2, 3, 4]
let reversed = sorted([3, 1, 4, 2], true)  // descending: [4, 3, 2, 1]
```

## Type Operations

```orus
// Check type
print(type_of(42))  // "i32"
print(type_of("hello"))  // "string"

// Type checking
print(is_type(42, "i32"))  // true
print(is_type("hello", "i32"))  // false

// Type conversion
let num_str = "42"
let num = int(num_str)  // 42

let float_str = "3.14"
let pi = float(float_str)  // 3.14
```

## Input/Output

```orus
// Output
print("Hello, world!")
print("Value: {}", 42)

// Input
let name = input("Enter your name: ")
let age = int(input("Enter your age: "))
```

<div class="tutorial-navigation">
    <a href="/tutorial/error-handling/" class="nav-button prev">Previous: Error Handling</a>
    <a href="/tutorial/creating-a-project/" class="nav-button next">Next: Creating a Project</a>
</div>
