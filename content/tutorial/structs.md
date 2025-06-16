+++
title = "Structs"
description = "Creating and using composite data types"
template = "tutorial.html"
weight = 5
+++

# Structs

Create composite types with `struct`:

```orus
struct Point { x: i32, y: i32 }
```

Instantiate and access fields:

```orus
let p = Point { x: 1, y: 2 }
print(p.x)
```

You can implement methods for your structs:

```orus
struct Rectangle {
    width: i32,
    height: i32
}

impl Rectangle {
    fn area(self) -> i32 {
        return self.width * self.height
    }
    
    fn new(w: i32, h: i32) -> Rectangle {
        return Rectangle { width: w, height: h }
    }
}

fn main() {
    let rect = Rectangle.new(5, 10)
    print(rect.area()) // Prints: 50
}
```

Note that methods that don't use `self` act like static methods and are called using the struct name, while methods that use `self` are called on instances of the struct.

<div class="tutorial-navigation">
    <a href="/tutorial/functions/" class="nav-button prev">Previous: Functions</a>
    <a href="/tutorial/modules-and-imports/" class="nav-button next">Next: Modules and Imports</a>
</div>
