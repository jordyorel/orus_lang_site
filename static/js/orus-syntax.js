function handleOrusSyntax() {
    // Find all code blocks with language "orus"
    const orusCodeBlocks = document.querySelectorAll('code.language-orus');
    
    // Apply our custom highlighting
    orusCodeBlocks.forEach(block => {
        // Add a custom class
        block.classList.add('orus-syntax');
        
        // Basic syntax highlighting
        const content = block.textContent;
        
        // Apply syntax highlighting manually
        const keywords = ['fn', 'let', 'mut', 'if', 'else', 'elif', 'for', 'in', 'while', 
                        'return', 'struct', 'pub', 'use', 'match', 'try', 'catch', 'throw', 
                        'const', 'as', 'nil', 'impl', 'true', 'false', 'continue', 'break', 'enum'];
        
        const types = ['i32', 'i64', 'f32', 'f64', 'bool', 'char', 'string', 'u32', 'u64'];
        
        const builtins = ['print', 'len', 'range', 'timestamp', 'push', 'pop', 'sum', 'min', 
                        'max', 'sort', 'input', 'int', 'float', 'type_of', 'is_type', 'Ok', 'Err'];
        
        // Replace keywords with spans
        let highlightedCode = content;
        
        // Replace keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="orus-keyword">${keyword}</span>`);
        });
        
        // Replace types
        types.forEach(type => {
            const regex = new RegExp(`\\b${type}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="orus-type">${type}</span>`);
        });
        
        // Replace builtins
        builtins.forEach(builtin => {
            const regex = new RegExp(`\\b${builtin}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="orus-builtin">${builtin}</span>`);
        });
        
        // Replace strings
        highlightedCode = highlightedCode.replace(/"([^"]*)"/g, '<span class="orus-string">"$1"</span>');
        
        // Replace numbers
        highlightedCode = highlightedCode.replace(/\b(\d+)\b/g, '<span class="orus-number">$1</span>');
        
        // Replace comments
        highlightedCode = highlightedCode.replace(/\/\/(.*)/g, '<span class="orus-comment">//$1</span>');
        
        // Apply the highlighted code
        block.innerHTML = highlightedCode;
    });
}

// Run once DOM is loaded
document.addEventListener('DOMContentLoaded', handleOrusSyntax);
