+++
title = "Error Handling"
description = "Handling errors with try/catch blocks"
template = "tutorial.html"
weight = 9
+++

# Error Handling

Use `try`/`catch` to deal with failures:

```orus
fn read(path: string) -> string {
    try {
        return std::fs::read_to_string(path)
    } catch err {
        print("failed: {}", err)
        return ""
    }
}
```

You can also nest try/catch blocks:

```orus
fn process_data() {
    try {
        // Outer try block
        open_database()
        
        try {
            // Inner try block
            read_records()
        } catch inner_err {
            print("Record reading failed: {}", inner_err)
        }
        
        close_database()
    } catch outer_err {
        print("Database operation failed: {}", outer_err)
    }
}
```

For functions that might fail, you can use a Result pattern:

```orus
struct Result<T> {
    success: bool,
    value: T,
    error: string
}

fn divide(a: i32, b: i32) -> Result<i32> {
    if b == 0 {
        return Result<i32>{
            success: false,
            value: 0,
            error: "Division by zero"
        }
    }
    
    return Result<i32>{
        success: true,
        value: a / b,
        error: ""
    }
}

fn main() {
    let result = divide(10, 2)
    if result.success {
        print("Result: {}", result.value)
    } else {
        print("Error: {}", result.error)
    }
}
```

<div class="tutorial-navigation">
    <a href="/tutorial/pattern-matching/" class="nav-button prev">Previous: Pattern Matching</a>
    <a href="/tutorial/built-in-helpers/" class="nav-button next">Next: Built-in Helpers</a>
</div>
