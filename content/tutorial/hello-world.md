+++
title = "Hello World"
description = "Getting started with your first Orus program"
template = "tutorial.html"
weight = 1
+++

# Hello World

```orus
fn main() {
    print("Hello, Orus!")
}
```

You can also write the entry point using an explicit return:

```orus
fn main() -> i32 {
    print("Hello, Orus!")
    return 0
}
```

Both examples above showcase how to create the simplest possible Orus program. The `fn main()` function is the entry point of your program, meaning it's where execution begins when you run your code.

<div class="tutorial-navigation">
    <a href="/tutorial/" class="nav-button prev">Tutorial Index</a>
    <a href="/tutorial/variables-and-types/" class="nav-button next">Next: Variables and Types</a>
</div>
