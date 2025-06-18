// Custom syntax highlighting for Orus language
Prism.languages.orus = {
    'comment': {
        pattern: /(\/\/.*|\/\*[\s\S]*?\*\/)/,
        greedy: true
    },
    'string': {
        pattern: /"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
    },
    'keyword': /\b(?:fn|let|mut|if|else|elif|match|for|in|while|return|struct|pub|use|try|catch|const|as|nil|impl|break|continue)\b/,
    'boolean': /\b(?:true|false|nil)\b/,
    'number': /\b(?:0x[\da-f]+(?:_[\da-f]+)*|(?:\d+(?:_\d+)*)?\.?\d+(?:_\d+)*(?:e[+-]?\d+(?:_\d+)*)?|\d+(?:_\d+)*)\b/i,
    'operator': /[+\-*\/%=<>!&|^]=?|[?:~]/,
    'punctuation': /[{}[\];(),.:]/,
    'class-name': {
        pattern: /(\b(?:struct|fn|impl)\s+)[A-Za-z_]\w*/,
        lookbehind: true
    },
    'builtin': /\b(?:print|len|range|timestamp|push|pop|sum|min|max|sorted|input|int|float|type_of|is_type|substring)\b/,
    'type': /\b(?:i32|i64|f32|f64|bool|char|string|u32|u64)\b/,
};
