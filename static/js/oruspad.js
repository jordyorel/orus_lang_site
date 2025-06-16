document.addEventListener('DOMContentLoaded', function() {
    const editor = CodeMirror(document.getElementById('pad-editor'), {
        mode: 'text/x-c++src',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: false
    });

    customizeOrusHighlighting();

    const defaultCode = `// Welcome to OrusPad!
// Click \"Start Session\" to collaborate with others.

fn main() {
    print("Hello from OrusPad!");
}`;
    editor.setValue(defaultCode);

    document.getElementById('collaborate-button').addEventListener('click', function() {
        if (typeof TogetherJS !== 'undefined') {
            TogetherJS(this);
        }
    });

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
