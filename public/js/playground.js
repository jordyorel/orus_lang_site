document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror editor with a more compatible setup
    const editor = CodeMirror(document.getElementById('playground-editor'), {
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

    // Default example code
    const defaultCode = `// Orus Playground
// Try writing and running Orus code!

fn main() {
    print("Welcome to the Orus Playground!");
    
    // Variables and basic operations
    let name = "Orus";
    print("Learning " + name + " is fun!");
    
    // Conditional logic
    let number = 42;
    if number > 40 {
        print("That's a big number!");
    } else {
        print("Just a small number.");
    }
    
    // Working with collections
    let fruits = ["apple", "banana", "cherry"];
    for fruit in fruits {
        print("I like " + fruit);
    }
}`;
    
    // Set the default code with a slight delay to ensure editor is fully initialized
    setTimeout(() => {
        editor.setValue(defaultCode);
        editor.clearHistory(); // Clear undo history for the default code
        editor.focus(); // Ensure editor is focused for typing
    }, 200);

    // Reference to result elements
    const resultPanel = document.getElementById('result-panel');
    const resultOutput = document.getElementById('result-output');
    
    // Build/Run button functionality
    document.getElementById('build-button').addEventListener('click', function() {
        runCode();
    });
    
    // Share button functionality
    document.getElementById('share-button').addEventListener('click', function() {
        const code = editor.getValue();
        const encodedCode = encodeURIComponent(code);
        
        // Create a URL with the code as a parameter
        const shareUrl = `${window.location.origin}/playground/?code=${encodedCode}`;
        
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
        try {
            editor.setValue(decodeURIComponent(sharedCode));
        } catch (e) {
            console.error("Error loading shared code:", e);
            // If there's an error, keep the default code
        }
    }
    
    // Function to run the code
    function runCode() {
        // Make sure result panel is visible
        const resultPanel = document.getElementById('result-panel');
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
        const printWithMultiVarRegex = /print\(\s*"([^"]*)"\s*\+\s*([A-Za-z0-9_]+)\s*\+\s*"([^"]*)"\s*\+\s*([A-Za-z0-9_]+)\s*\)/g;
        const varDeclarationRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*"([^"]*)"/g;
        const numberVarRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*(\d+)/g;
        const mathOperationRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*([A-Za-z0-9_]+)\s*\+\s*([A-Za-z0-9_]+)/g;
        const assignmentRegex = /([A-Za-z0-9_]+)\s*=\s*([A-Za-z0-9_]+)/g;
        const arrayRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*\[(.*?)\]/g;
        const rangeRegex = /range\((\d+),\s*(\d+)\)/g;
        const forLoopRegex = /for\s+([A-Za-z0-9_]+)\s+in\s+([A-Za-z0-9_]+)\s*{([^}]*)}/gs;
        const ifStatementRegex = /if\s+([A-Za-z0-9_]+)\s*>\s*(\d+)\s*{([^}]*)}/gs;
        const elseStatementRegex = /}\s*else\s*{([^}]*)}/gs;
        
        // Store variables for simulation
        const variables = {};
        
        // Find variable declarations and store their values
        let varMatch;
        while ((varMatch = varDeclarationRegex.exec(code)) !== null) {
            variables[varMatch[1]] = varMatch[2];
        }
        
        // Find number variables
        while ((varMatch = numberVarRegex.exec(code)) !== null) {
            variables[varMatch[1]] = parseInt(varMatch[2], 10);
        }
        
        // Process range expressions
        let rangeMatch;
        while ((rangeMatch = rangeRegex.exec(code)) !== null) {
            const start = parseInt(rangeMatch[1], 10);
            const end = parseInt(rangeMatch[2], 10);
            const rangeArray = [];
            for (let i = start; i <= end; i++) {
                rangeArray.push(i);
            }
            variables['range'] = rangeArray;
        }
        
        // Process math operations
        let mathMatch;
        while ((mathMatch = mathOperationRegex.exec(code)) !== null) {
            const resultVar = mathMatch[1];
            const var1 = variables[mathMatch[2]];
            const var2 = variables[mathMatch[3]];
            if (typeof var1 === 'number' && typeof var2 === 'number') {
                variables[resultVar] = var1 + var2;
            } else {
                // String concatenation or default
                variables[resultVar] = var1 + var2;
            }
        }
        
        // Process assignments
        let assignMatch;
        while ((assignMatch = assignmentRegex.exec(code)) !== null) {
            const targetVar = assignMatch[1];
            const sourceVar = assignMatch[2];
            if (sourceVar in variables) {
                variables[targetVar] = variables[sourceVar];
            }
        }
        
        // Find and process arrays
        while ((varMatch = arrayRegex.exec(code)) !== null) {
            const arrayItems = varMatch[2].split(',').map(item => {
                const trimmed = item.trim();
                if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                    return trimmed.slice(1, -1);
                }
                return trimmed;
            });
            variables[varMatch[1]] = arrayItems;
        }
        
        // Process for loops with range
        forLoopMatch = null;
        while ((forLoopMatch = forLoopRegex.exec(code)) !== null) {
            const loopVar = forLoopMatch[1];
            const rangeVar = forLoopMatch[2];
            const loopBody = forLoopMatch[3];
            
            // Get the range to iterate over
            let rangeValues = variables['range'];
            if (rangeValues && Array.isArray(rangeValues)) {
                for (let value of rangeValues) {
                    variables[loopVar] = value;
                    
                    // Process variable assignments in the loop
                    let loopAssignMatch;
                    const loopAssignmentRegex = /([A-Za-z0-9_]+)\s*=\s*([A-Za-z0-9_]+)/g;
                    while ((loopAssignMatch = loopAssignmentRegex.exec(loopBody)) !== null) {
                        variables[loopAssignMatch[1]] = variables[loopAssignMatch[2]];
                    }
                    
                    // Process math operations in the loop
                    let loopMathMatch;
                    const loopMathRegex = /let\s+([A-Za-z0-9_]+)\s*=\s*([A-Za-z0-9_]+)\s*\+\s*([A-Za-z0-9_]+)/g;
                    while ((loopMathMatch = loopMathRegex.exec(loopBody)) !== null) {
                        const resultVar = loopMathMatch[1];
                        const var1 = variables[loopMathMatch[2]];
                        const var2 = variables[loopMathMatch[3]];
                        if (typeof var1 === 'number' && typeof var2 === 'number') {
                            variables[resultVar] = var1 + var2;
                        }
                    }
                    
                    // Check for print statements in the loop
                    let loopPrintMatch;
                    const loopPrintRegex = /print\(\s*"([^"]*)"\s*\+\s*([A-Za-z0-9_]+)\s*\+\s*"([^"]*)"\s*\+\s*([A-Za-z0-9_]+)\s*\)/g;
                    while ((loopPrintMatch = loopPrintRegex.exec(loopBody)) !== null) {
                        const text1 = loopPrintMatch[1];
                        const var1 = variables[loopPrintMatch[2]];
                        const text2 = loopPrintMatch[3];
                        const var2 = variables[loopPrintMatch[4]];
                        output += text1 + var1 + text2 + var2 + '\n';
                    }
                }
            }
        }
        
        // Handle simple print statements
        let match;
        while ((match = printRegex.exec(code)) !== null) {
            output += match[1] + '\n';
        }
        
        // Handle print statements with one variable
        let varPrintMatch;
        while ((varPrintMatch = printWithVarRegex.exec(code)) !== null) {
            const text = varPrintMatch[1];
            const varName = varPrintMatch[2];
            const varValue = variables[varName] !== undefined ? variables[varName] : '[undefined]';
            output += text + varValue + '\n';
        }
        
        // Handle print statements with multiple variables
        let multiVarPrintMatch;
        while ((multiVarPrintMatch = printWithMultiVarRegex.exec(code)) !== null) {
            const text1 = multiVarPrintMatch[1];
            const var1Name = multiVarPrintMatch[2];
            const text2 = multiVarPrintMatch[3];
            const var2Name = multiVarPrintMatch[4];
            
            const var1Value = variables[var1Name] !== undefined ? variables[var1Name] : '[undefined]';
            const var2Value = variables[var2Name] !== undefined ? variables[var2Name] : '[undefined]';
            
            output += text1 + var1Value + text2 + var2Value + '\n';
        }
        
        // Handle for loops (simplified)
        let forLoopMatch;
        while ((forLoopMatch = forLoopRegex.exec(code)) !== null) {
            const loopVar = forLoopMatch[1];
            const arrayVar = forLoopMatch[2];
            
            if (variables[arrayVar] && Array.isArray(variables[arrayVar])) {
                variables[arrayVar].forEach(item => {
                    variables[loopVar] = item;
                    
                    // Look for print statements in the loop body that use the loop variable
                    const loopBody = code.substring(forLoopMatch.index);
                    const loopEndIndex = findMatchingBrace(loopBody, forLoopMatch.index);
                    const loopContent = loopBody.substring(0, loopEndIndex);
                    
                    // Handle loop print statements
                    const loopPrintRegex = new RegExp(`print\\(\\s*"([^"]*)"\\s*\\+\\s*${loopVar}\\s*\\)`, 'g');
                    let loopPrintMatch;
                    while ((loopPrintMatch = loopPrintRegex.exec(loopContent)) !== null) {
                        output += loopPrintMatch[1] + item + '\n';
                    }
                });
            }
        }
        
        // Handle if-else statements (simplified)
        let ifMatch = null;
        while ((ifMatch = ifStatementRegex.exec(code)) !== null) {
            const varName = ifMatch[1];
            const threshold = parseInt(ifMatch[2], 10);
            const ifBody = ifMatch[3];
            
            if (variables[varName] && variables[varName] > threshold) {
                // Extract print statements from if body
                const ifPrintRegex = /print\(\s*"([^"]*)"\s*\)/g;
                let ifPrintMatch;
                while ((ifPrintMatch = ifPrintRegex.exec(ifBody)) !== null) {
                    output += ifPrintMatch[1] + '\n';
                }
            } else {
                // Check for else block
                const afterIf = code.substring(ifMatch.index + ifMatch[0].length);
                const elseMatch = elseStatementRegex.exec(afterIf);
                if (elseMatch) {
                    const elseBody = elseMatch[1];
                    // Extract print statements from else body
                    const elsePrintRegex = /print\(\s*"([^"]*)"\s*\)/g;
                    let elsePrintMatch;
                    while ((elsePrintMatch = elsePrintRegex.exec(elseBody)) !== null) {
                        output += elsePrintMatch[1] + '\n';
                    }
                }
            }
        }
        
        // If debug mode, add extra information
        if (mode === 'debug') {
            output += '\n--- Debug Information ---\n';
            output += 'Variables: ' + JSON.stringify(variables, null, 2) + '\n';
            output += 'Code size: ' + code.length + ' characters\n';
        }
        
        return output || 'Program executed successfully with no output.';
    }
    
    // Helper function to find matching closing brace
    function findMatchingBrace(text, startIndex) {
        let braceCount = 1;
        for (let i = startIndex + 1; i < text.length; i++) {
            if (text[i] === '{') braceCount++;
            if (text[i] === '}') braceCount--;
            if (braceCount === 0) return i;
        }
        return text.length;
    }
    
    // Define custom syntax highlighting for Orus
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
                    if (stream.sol() && stream.match(/\/\/.*$/)) {
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
