+++
title = "Pattern Matching"
description = "Using pattern matching for control flow"
template = "tutorial.html"
weight = 8
+++

# Pattern Matching

`match` expressions select a branch by value:

```orus
match value {
    0 => print("zero"),
    1 => print("one"),
    _ => print("other"),
}
```

You can use blocks for more complex logic in match branches:

```orus
let result = match status {
    "success" => {
        log("Operation successful")
        true
    },
    "error" => {
        log("Operation failed")
        false
    },
    _ => {
        log("Unknown status: " + status)
        false
    }
}
```

Pattern matching is exhaustive, meaning you must cover all possible values. The `_` wildcard pattern is useful as a catch-all.

Match expressions can also be used with other types:

```orus
match temperature {
    t if t < 0 => print("Freezing"),
    t if t < 20 => print("Cool"),
    t if t < 30 => print("Warm"),
    _ => print("Hot")
}
```

<div class="tutorial-navigation">
    <a href="/tutorial/generics/" class="nav-button prev">Previous: Generics</a>
    <a href="/tutorial/error-handling/" class="nav-button next">Next: Error Handling</a>
</div>
