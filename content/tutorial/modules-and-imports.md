+++
title = "Modules and Imports"
description = "Organizing code with modules and imports"
template = "tutorial.html"
weight = 6
+++

# Modules and Imports

Split code across files and bring definitions into scope:

```orus
// math.orus
pub fn square(x: i32) -> i32 { x * x }
```

```orus
// main.orus
use math
fn main() {
    print(math.square(3))
}
```

Use `use *` to import everything:

```orus
use math::*
```

You can selectively import specific functions or types:

```orus
use math::{square, cube}

fn main() {
    print(square(3)) // No need for math prefix
    print(cube(2))
}
```

You can also rename imports to avoid name conflicts:

```orus
use math::square as sq

fn main() {
    print(sq(4)) // Calls math.square(4)
}
```

Only items marked with `pub` are accessible from outside their module:

```orus
// helper.orus
pub fn public_function() {
    print("This can be imported")
}

fn private_function() {
    print("This cannot be imported directly")
}
```

<div class="tutorial-navigation">
    <a href="/tutorial/structs/" class="nav-button prev">Previous: Structs</a>
    <a href="/tutorial/generics/" class="nav-button next">Next: Generics</a>
</div>
