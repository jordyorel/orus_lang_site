+++
title = "Control Flow"
description = "Controlling program flow with loops and conditionals"
template = "tutorial.html"
weight = 3
+++

# Control Flow

For loops iterate over a range:

```orus
for i in range(0, 3) {
    print(i)
}
```

A while loop achieves the same result:

```orus
let mut i = 0
while i < 3 {
    print(i)
    i = i + 1
}
```

Conditional statements use a familiar syntax:

```orus
if x > 5 {
    print("x is greater than 5")
} elif x > 0 {
    print("x is positive but not greater than 5")
} else {
    print("x is not positive")
}
```

Orus also supports `break` and `continue` keywords in loops:

```orus
// Print only even numbers from 0 to 9
for i in range(0, 10) {
    if i % 2 != 0 {
        continue // Skip odd numbers
    }
    print(i)
}

// Exit loop when we find a value greater than 100
let mut j = 0
while true {
    j = j + 20
    print(j)
    if j > 100 {
        break // Stop the loop
    }
}
```

<div class="tutorial-navigation">
    <a href="/tutorial/variables-and-types/" class="nav-button prev">Previous: Variables and Types</a>
    <a href="/tutorial/functions/" class="nav-button next">Next: Functions</a>
</div>
