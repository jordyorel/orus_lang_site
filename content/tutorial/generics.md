+++
title = "Generics"
description = "Creating reusable code with generic types"
template = "tutorial.html"
weight = 7
+++

# Generics

Generic functions work with many types:

```orus
fn identity<T>(val: T) -> T { val }
```

Type parameters may have constraints:

```orus
fn max<T: Comparable>(a: T, b: T) -> T {
    if a > b { a } else { b }
}
```

You can also create generic structs:

```orus
struct Pair<A, B> {
    first: A,
    second: B
}

fn main() {
    let pair = Pair<i32, string>{ first: 1, second: "one" }
    print(pair.first)
    print(pair.second)
}
```

And implement methods for generic structs:

```orus
struct Box<T> {
    value: T
}

impl Box<T> {
    fn new<T>(val: T) -> Box<T> {
        return Box<T>{ value: val }
    }
    
    fn get(self) -> T {
        return self.value
    }
}

fn main() {
    let b = Box.new(42)
    print(b.get())
}
```

Generics allow you to write more reusable code while maintaining type safety.

<div class="tutorial-navigation">
    <a href="/tutorial/modules-and-imports/" class="nav-button prev">Previous: Modules and Imports</a>
    <a href="/tutorial/pattern-matching/" class="nav-button next">Next: Pattern Matching</a>
</div>
