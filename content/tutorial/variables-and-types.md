+++
title = "Variables and Types"
description = "Working with variables and data types in Orus"
template = "tutorial.html"
weight = 2
+++

# Variables and Types

Declare immutable bindings with `let`:

```orus
let a = 5
let b: f64 = 1.5
```

Add `mut` to allow reassignment:

```orus
let mut count = 0
count = count + 1
```

Orus supports several primitive types:
- `i32`: 32-bit signed integers
- `i64`: 64-bit signed integers
- `u32`: 32-bit unsigned integers
- `u64`: 64-bit unsigned integers
- `f64`: 64-bit floating point numbers
- `bool`: Boolean values (true/false)
- `string`: Text strings

Orus uses type inference to determine the type of a variable when not explicitly specified, making your code more concise while maintaining type safety.

<div class="tutorial-navigation">
    <a href="/tutorial/hello-world/" class="nav-button prev">Previous: Hello World</a>
    <a href="/tutorial/control-flow/" class="nav-button next">Next: Control Flow</a>
</div>
