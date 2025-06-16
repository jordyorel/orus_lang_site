+++
title = "Functions"
description = "Defining and using functions in Orus"
template = "tutorial.html"
weight = 4
+++

# Functions

Functions return the last expression implicitly:

```orus
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Alternatively, use an explicit `return`:

```orus
fn add(a: i32, b: i32) -> i32 {
    return a + b
}
```

Functions with no return value can omit the return type:

```orus
fn greet(name: string) {
    print("Hello, " + name + "!")
}
```

You can define functions that take multiple parameters and have complex logic:

```orus
fn max(a: i32, b: i32) -> i32 {
    if a > b {
        return a
    }
    return b
}
```

Functions in Orus are first-class citizens, which means you can assign them to variables and pass them as arguments:

```orus
fn apply(func: (i32, i32) -> i32, a: i32, b: i32) -> i32 {
    return func(a, b)
}

fn main() {
    let result = apply(add, 5, 3)
    print(result) // Prints: 8
}
```

<div class="tutorial-navigation">
    <a href="/tutorial/control-flow/" class="nav-button prev">Previous: Control Flow</a>
    <a href="/tutorial/structs/" class="nav-button next">Next: Structs</a>
</div>
