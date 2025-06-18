document.addEventListener('DOMContentLoaded', function() {
    const editor = CodeMirror(document.getElementById('pad-editor'), {
        value: "", // Start with empty editor
        mode: 'javascript', // Use a well-supported mode as fallback
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: false,
        autofocus: true // Automatically focus the editor when page loads
    });
    
    // Force editor to take full height of container
    const editorElement = editor.getWrapperElement();
    editorElement.style.height = '100%';
    setTimeout(() => editor.refresh(), 100); // Refresh after slight delay
    
    // Apply custom syntax highlighting for Orus
    try {
        customizeOrusHighlighting();
    } catch (e) {
        console.error("Error applying syntax highlighting:", e);
        // Continue with default highlighting if custom fails
    }

    const defaultCode = `// Welcome to OrusPad!
// Click "Build" to run this code or "Start Session" to collaborate with others.

fn main() {
    print("Hello from OrusPad!");
    
    // Try adding more code here!
    let name = "Orus";
    print("Welcome to " + name + " programming language!");
    
    // Math operations
    let sum = 5 + 10;
    print("5 + 10 = " + sum);
}`;
    
    // Set the default code with a slight delay to ensure editor is fully initialized
    setTimeout(() => {
        editor.setValue(defaultCode);
        editor.clearHistory(); // Clear undo history for the default code
        editor.focus(); // Ensure editor is focused for typing
    }, 200);

    // Initialize result panel
    const resultPanel = document.getElementById('result-panel');
    const resultOutput = document.getElementById('result-output');
    
    // Build button functionality
    document.getElementById('build-button').addEventListener('click', function() {
        runCode();
    });
    
    // Collaborate button
    document.getElementById('collaborate-button').addEventListener('click', function() {
        if (typeof TogetherJS !== 'undefined') {
            TogetherJS(this);
        }
    });
    
    // Share button functionality
    document.getElementById('share-button').addEventListener('click', function() {
        const code = editor.getValue();
        const encodedCode = encodeURIComponent(code);
        
        // Create a URL with the code as a parameter
        const shareUrl = `${window.location.origin}/pad/?code=${encodedCode}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert('Shareable link copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                // Fallback
                prompt('Copy this link to share your code:', shareUrl);
            });
    });
    
    // Load shared code if present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('code');
    if (sharedCode) {
        editor.setValue(decodeURIComponent(sharedCode));
    }
    
    // Function to run the code
    function runCode() {
        // Show result panel if hidden
        resultPanel.style.display = 'block';
        
        // Show loading indicator
        resultOutput.innerHTML = '<div class="loader"></div> Running code...';
        
        // Get code from editor
        const code = editor.getValue();
        
        // Get build mode
        const buildMode = document.getElementById('build-mode').value;
        
        // Simulate running code (in a real implementation, this would be sent to a backend)
        setTimeout(() => {
            // Mock execution
            try {
                // Parse and execute code (this is a simplified simulation)
                const output = simulateOrusExecution(code, buildMode);
                resultOutput.innerHTML = `<pre class="result-success">${output}</pre>`;
            } catch (error) {
                resultOutput.innerHTML = `<pre class="result-error">Error: ${error.message}</pre>`;
            }
        }, 800); // Simulate processing time
    }
    
    // Function to simulate Orus code execution
    function simulateOrusExecution(code, mode) {
        // Check if code contains main function
        if (!code.includes('fn main()')) {
            throw new Error('No main() function found');
        }
        
        // Extract print statements to simulate output
        let output = '';
        const printRegex = /print\(\s*"([^"]*)"\s*\)/g;
        const printWithVarRegex = /print\(\s*"([^"]*)"\s*\+\s*([A-Za-z0-9_]+)\s*\)/g;
        const varDeclarationRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*"([^"]*)"/g;
        const numberVarRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*([0-9+\-*/\s]+)/g;
        
        // Store variables for simulation
        const variables = {};
        
        // Find variable declarations and store their values
        let varMatch;
        while ((varMatch = varDeclarationRegex.exec(code)) !== null) {
            variables[varMatch[1]] = varMatch[2];
        }
        
        // Find number variables
        while ((varMatch = numberVarRegex.exec(code)) !== null) {
            try {
                // Simple evaluation of basic math expressions
                variables[varMatch[1]] = eval(varMatch[2]);
            } catch (e) {
                variables[varMatch[1]] = varMatch[2]; // Fallback to string if eval fails
            }
        }
        
        // Handle simple print statements
        let match;
        while ((match = printRegex.exec(code)) !== null) {
            output += match[1] + '\n';
        }
        
        // Handle print statements with variables
        let varPrintMatch;
        while ((varPrintMatch = printWithVarRegex.exec(code)) !== null) {
            const text = varPrintMatch[1];
            const varName = varPrintMatch[2];
            const varValue = variables[varName] !== undefined ? variables[varName] : '[undefined]';
            output += text + varValue + '\n';
        }
        
        // If debug mode, add extra information
        if (mode === 'debug') {
            output += '\n--- Debug Information ---\n';
            output += 'Variables: ' + JSON.stringify(variables, null, 2) + '\n';
            output += 'Code size: ' + code.length + ' characters\n';
        }
        
        return output || 'Program executed successfully with no output.';
    }

    function customizeOrusHighlighting() {
        CodeMirror.defineMode("orus", function(config) {
            const orusKeywords = /\b(fn|let|mut|if|else|elif|for|in|while|return|struct|pub|use|match|try|catch|throw|const|as|nil|impl|true|false|continue|break|enum)\b/;
            const orusTypes = /\b(i32|i64|f32|f64|bool|char|string|u32|u64)\b/;
            const orusBuiltins = /\b(print|len|range|timestamp|push|pop|sum|min|max|sort|input|int|float|type_of|is_type|Ok|Err)\b/;
            return {
                startState: function() {
                    return {tokenize: null};
                },
                token: function(stream, state) {
                    if (state.tokenize) return state.tokenize(stream, state);
                    if (stream.sol() && stream.peek() === '/') {
                        stream.skipToEnd();
                        return 'comment';
                    }
                    if (stream.peek() === '"') {
                        stream.next();
                        state.tokenize = tokenString('"');
                        return state.tokenize(stream, state);
                    }
                    if (/[\[\]{}().,:;]/.test(stream.peek())) {
                        stream.next();
                        return 'punctuation';
                    }
                    if (/\d/.test(stream.peek())) {
                        stream.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/);
                        return 'number';
                    }
                    stream.eatWhile(/[\w\$_]/);
                    const cur = stream.current();
                    if (orusKeywords.test(cur)) return 'keyword';
                    if (orusTypes.test(cur)) return 'type';
                    if (orusBuiltins.test(cur)) return 'builtin';
                    return 'variable';
                }
            };
            function tokenString(quote) {
                return function(stream, state) {
                    let escaped = false, ch;
                    while ((ch = stream.next()) != null) {
                        if (ch === quote && !escaped) {
                            state.tokenize = null;
                            break;
                        }
                        escaped = !escaped && ch === "\\";
                    }
                    return 'string';
                };
            }
        });
        editor.setOption('mode', 'orus');
    }
});
