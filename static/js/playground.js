document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror
    const editor = CodeMirror(document.getElementById('code-editor'), {
        mode: 'text/x-c++src', // Using C++ highlighting as a base
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: false
    });

    // Customize the C++ mode highlighting for Orus language
    customizeOrusHighlighting();

    // Set initial content
    const defaultCode = `// Welcome to the Orus Playground!
// Try running this example to see how Orus works.

fn main() {
    // Print a greeting
    print("Hello, Orus!");
    
    // Define variables
    let name = "World";
    let year = 2025;
    
    // String interpolation
    print("Hello, {name}! It's currently {year}.");
    
    // Simple calculation
    let result = calculate_sum(5, 7);
    print("5 + 7 = {result}");
}

fn calculate_sum(a: i32, b: i32) -> i32 {
    return a + b;
}`;

    editor.setValue(defaultCode);

    // Set up UI elements
    const runButton = document.getElementById('run-button');
    const shareButton = document.getElementById('share-button');
    const formatButton = document.getElementById('format-button');
    const outputContainer = document.getElementById('output');
    const clearOutputButton = document.getElementById('clear-output');
    const shareModal = document.getElementById('share-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const shareUrlInput = document.getElementById('share-url');
    const copyUrlButton = document.getElementById('copy-url');
    const examplesDropdown = document.getElementById('examples-dropdown');

    // Run button
    runButton.addEventListener('click', function() {
        executeCode(editor.getValue());
    });

    // Format button
    formatButton.addEventListener('click', function() {
        formatCode(editor);
    });

    // Share button
    shareButton.addEventListener('click', function() {
        shareCode(editor.getValue());
    });

    // Clear output button
    clearOutputButton.addEventListener('click', function() {
        outputContainer.innerHTML = '';
    });

    // Modal close
    closeModalButton.addEventListener('click', function() {
        shareModal.style.display = 'none';
    });

    // Copy share URL
    copyUrlButton.addEventListener('click', function() {
        shareUrlInput.select();
        document.execCommand('copy');
        copyUrlButton.textContent = 'Copied!';
        setTimeout(() => {
            copyUrlButton.textContent = 'Copy';
        }, 2000);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == shareModal) {
            shareModal.style.display = 'none';
        }
    });

    // Examples
    examplesDropdown.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const example = e.target.getAttribute('data-example');
            loadExample(example);
        }
    });

    // Check for shared code in URL
    checkUrlForSharedCode();

    // Function to execute code
    function executeCode(code) {
        // Clear previous output
        outputContainer.innerHTML = '';

        // In a real implementation, this would send the code to a backend service
        // Here we'll simulate execution with a mock response
        appendToOutput('Running Orus code...\n', 'console-regular');

        // Simulate execution delay
        setTimeout(() => {
            // Simple parsing to simulate execution
            try {
                const mockExecution = simulateOrusExecution(code);
                if (mockExecution.error) {
                    appendToOutput(mockExecution.error, 'console-error');
                } else {
                    appendToOutput(mockExecution.output, 'console-regular');
                    appendToOutput('\nProgram completed successfully.', 'console-success');
                }
            } catch (e) {
                appendToOutput('Error executing code: ' + e.message, 'console-error');
            }
        }, 500);
    }

    // Function to simulate Orus code execution (mock implementation)
    function simulateOrusExecution(code) {
        // This is a very simplified simulation
        let result = { output: '', error: null };

        // Check for common patterns in the code to generate relevant output
        if (code.includes('Hello, Orus!')) {
            result.output += 'Hello, Orus!\n';
        }
        
        if (code.includes('Hello, {name}!')) {
            result.output += 'Hello, World! It\'s currently 2025.\n';
        }
        
        if (code.includes('calculate_sum')) {
            const match = code.match(/calculate_sum\((\d+),\s*(\d+)\)/);
            if (match) {
                const a = parseInt(match[1], 10);
                const b = parseInt(match[2], 10);
                result.output += `${a} + ${b} = ${a + b}\n`;
            } else {
                result.output += '5 + 7 = 12\n';
            }
        }

        // Check for syntax errors
        if (code.includes('{') && !code.includes('}')) {
            result.error = 'Error: Unclosed brace detected';
            return result;
        }

        if (code.includes('fn') && !code.includes('main()')) {
            result.error = 'Error: No main function found';
            return result;
        }

        return result;
    }

    // Function to format code
    function formatCode(editor) {
        // Real implementation would use a proper formatter
        // Here we just do some basic indentation and spacing
        const code = editor.getValue();
        let lines = code.split('\n');
        let indentLevel = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.endsWith('}') && !line.startsWith('//')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            if (line.length > 0) {
                lines[i] = '    '.repeat(indentLevel) + line;
            } else {
                lines[i] = '';
            }
            
            if ((line.endsWith('{') || line.endsWith('=> {')) && !line.startsWith('//')) {
                indentLevel++;
            }
        }
        
        editor.setValue(lines.join('\n'));
        appendToOutput('Code formatted.', 'console-success');
    }

    // Function to share code
    function shareCode(code) {
        // In a real implementation, this would store the code and generate a unique ID
        const encodedCode = btoa(encodeURIComponent(code));
        const shareUrl = window.location.origin + window.location.pathname + '?code=' + encodedCode;
        
        shareUrlInput.value = shareUrl;
        shareModal.style.display = 'block';
    }

    // Function to check URL for shared code
    function checkUrlForSharedCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedCode = urlParams.get('code');
        
        if (sharedCode) {
            try {
                const decodedCode = decodeURIComponent(atob(sharedCode));
                editor.setValue(decodedCode);
                appendToOutput('Shared code loaded successfully.', 'console-success');
            } catch(e) {
                appendToOutput('Error loading shared code.', 'console-error');
            }
        }
    }

    // Function to load example code
    function loadExample(exampleName) {
        let exampleCode = '';
        
        switch(exampleName) {
            case 'hello-world':
                exampleCode = `// Hello World Example
fn main() {
    print("Hello, World!");
}`;
                break;
            case 'fibonacci':
                exampleCode = `// Fibonacci Sequence Example
fn main() {
    print("Fibonacci Sequence:");
    for i in range(0, 10) {
        print("fib({i}) = {fibonacci(i)}");
    }
}

fn fibonacci(n: i32) -> i32 {
    if n <= 1 {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`;
                break;
            case 'structs':
                exampleCode = `// Structs Example
struct Person {
    name: string,
    age: i32,
    city: string
}

fn main() {
    let alice = Person {
        name: "Alice",
        age: 30,
        city: "New York"
    };
    
    print("Person: {alice.name}, {alice.age} years old, from {alice.city}");
    
    // Modify a field
    alice.age = 31;
    print("Updated age: {alice.age}");
    
    greet(alice);
}

fn greet(p: Person) {
    print("Hello, {p.name}!");
}`;
                break;
            case 'pattern-matching':
                exampleCode = `// Pattern Matching Example
enum Result {
    Success(string),
    Error(string),
    Empty
}

fn main() {
    let results = [
        Result::Success("Operation completed"),
        Result::Error("Connection failed"),
        Result::Empty
    ];
    
    for result in results {
        match result {
            Result::Success(message) => {
                print("Success: {message}");
            },
            Result::Error(error) => {
                print("Error: {error}");
            },
            Result::Empty => {
                print("No result available");
            }
        }
    }
}`;
                break;
            case 'error-handling':
                exampleCode = `// Error Handling Example
fn main() {
    try {
        print("Attempting to read file...");
        let content = read_file("nonexistent.txt");
        print("Content: {content}");
    } catch FileNotFoundError {
        print("Error: The file could not be found.");
    } catch err {
        print("An unexpected error occurred: {err}");
    }
    
    // Alternative with Result
    let result = divide(10, 0);
    match result {
        Ok(value) => print("Result: {value}"),
        Err(msg) => print("Error: {msg}")
    }
}

fn read_file(path: string) -> string {
    // Simulate file read error
    if path == "nonexistent.txt" {
        throw FileNotFoundError("File not found: {path}");
    }
    return "Some file content";
}

fn divide(a: i32, b: i32) -> Result<i32, string> {
    if b == 0 {
        return Err("Division by zero");
    }
    return Ok(a / b);
}`;
                break;
            default:
                exampleCode = defaultCode;
        }
        
        editor.setValue(exampleCode);
        appendToOutput(`Loaded ${exampleName} example.`, 'console-success');
    }

    // Append content to output container
    function appendToOutput(content, className = '') {
        const element = document.createElement('div');
        element.textContent = content;
        if (className) {
            element.className = className;
        }
        outputContainer.appendChild(element);
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    // Customize syntax highlighting for Orus
    function customizeOrusHighlighting() {
        // This is a simplified customization
        // In a real implementation, you would create a proper CodeMirror mode
        CodeMirror.defineMode("orus", function(config) {
            const orusKeywords = /\b(fn|let|mut|if|else|elif|for|in|while|return|struct|pub|use|match|try|catch|throw|const|as|nil|impl|true|false|continue|break|enum)\b/;
            const orusTypes = /\b(i32|i64|f32|f64|bool|char|string|u32|u64)\b/;
            const orusBuiltins = /\b(print|len|range|timestamp|push|pop|sum|min|max|sort|input|int|float|type_of|is_type|Ok|Err)\b/;

            var cppMode = CodeMirror.getMode(config, "text/x-c++src");
            
            return {
                startState: function() {
                    return {
                        tokenize: null,
                        context: null,
                        indented: 0,
                        startOfLine: true
                    };
                },
                
                token: function(stream, state) {
                    if (stream.sol()) {
                        state.startOfLine = true;
                    }
                    
                    if (state.tokenize) {
                        return state.tokenize(stream, state);
                    }
                    
                    var ch = stream.next();
                    
                    if (ch === '/') {
                        if (stream.eat('/')) {
                            stream.skipToEnd();
                            return "comment";
                        }
                    }
                    
                    if (ch === '"') {
                        state.tokenize = tokenString(ch);
                        return state.tokenize(stream, state);
                    }
                    
                    if (/[\[\]{}().,:;]/.test(ch)) {
                        return "punctuation";
                    }
                    
                    if (/\d/.test(ch)) {
                        stream.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/);
                        return "number";
                    }
                    
                    stream.eatWhile(/[\w\$_]/);
                    var cur = stream.current();
                    
                    if (orusKeywords.test(cur)) return "keyword";
                    if (orusTypes.test(cur)) return "type";
                    if (orusBuiltins.test(cur)) return "builtin";
                    
                    return "variable";
                }
            };
            
            function tokenString(quote) {
                return function(stream, state) {
                    var escaped = false, ch;
                    while ((ch = stream.next()) != null) {
                        if (ch === quote && !escaped) {
                            state.tokenize = null;
                            break;
                        }
                        escaped = !escaped && ch === "\\";
                    }
                    return "string";
                };
            }
        });
        
        // Use our custom mode
        editor.setOption("mode", "orus");
    }
});
