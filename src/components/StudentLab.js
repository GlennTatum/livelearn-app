import React, { useState, useRef, useEffect } from 'react';
import "./StudentLab.css";
import Editor from "@monaco-editor/react";

const files = {
    "index.html": {
        name: "index.html",
        language: "html",
        value: `<html>
<head>
    <title>Hello world</title>
</head>
<body>
    <script>
        
    </script>
</body>
</html>`
    },
    "script.py": {
        name: "script.py",
        language: "python",
        value: `# Example Python code`
    },
    "main.java": {
        name: "main.java",
        language: "java",
        value: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    }
};

const StudentLab = () => {
    const [fileName, setFileName] = useState("index.html");
    const [output, setOutput] = useState("");
    const editorRef = useRef(null);

    const file = files[fileName];

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/brython@3.9.5/brython.min.js";
        script.type = "text/javascript";
        script.onload = () => window.brython();
        document.head.appendChild(script);
    }, []);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function getEditorValue() {
        if (editorRef.current) {
            alert(editorRef.current.getValue());
        } else {
            alert("Editor is not initialized yet.");
        }
    }

    function extractJavaScriptFromHTML(html) {
        const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
        return scriptMatch ? scriptMatch[1] : null;
    }

    function evaluateJavaScriptCode() {
        const code = editorRef.current.getValue();
        const jsCode = extractJavaScriptFromHTML(code);

        if (jsCode) {
            try {
                const log = [];
                const originalConsoleLog = console.log;
                console.log = (...args) => {
                    log.push(args.join(' '));
                    originalConsoleLog(...args);
                };
                eval(jsCode); // Evaluate the extracted JavaScript code
                console.log = originalConsoleLog;
                setOutput(log.join('\n'));
            } catch (error) {
                setOutput("Error evaluating JavaScript code: " + error.message);
            }
        } else {
            setOutput("No JavaScript code found in the HTML.");
        }
    }

    function evaluatePythonCode() {
        const code = editorRef.current.getValue();

        const script = `
from browser import document, console
import sys

class OutputCatcher:
    def __init__(self):
        self.data = ''
    def write(self, s):
        self.data += s
    def flush(self):
        pass

sys.stdout = OutputCatcher()
sys.stderr = OutputCatcher()

${code}

output = sys.stdout.data + sys.stderr.data
console.log(output)
document["output-panel"].textContent = output
        `;

        const scriptElement = document.createElement("script");
        scriptElement.type = "text/python";
        scriptElement.innerHTML = script;
        document.body.appendChild(scriptElement);

        window.setTimeout(() => {
            const outputDiv = document.getElementById("output-panel");
            setOutput(outputDiv ? outputDiv.textContent : "Error running Python code.");
            document.body.removeChild(scriptElement);
        }, 1000);
    }

    function handleRun() {
        setOutput(""); // Clear the previous output
        if (fileName === "script.py") {
            evaluatePythonCode();
        } else if (fileName === "index.html") {
            evaluateJavaScriptCode();
        } else {
            setOutput("Running code for this language is not supported.");
        }
    }

    return (
        <div className="container">
            <div className="buttons">
                <button onClick={() => setFileName("index.html")}>HTML</button>
                <button onClick={() => setFileName("script.py")}>Python</button>
                <button onClick={() => setFileName("main.java")}>Java</button>
                <button onClick={() => getEditorValue()}>Show code</button>
                <button onClick={() => handleRun()}>Run</button>
            </div>
            <div className="editor-container">
                <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    path={file.name}
                    defaultLanguage={file.language}
                    defaultValue={file.value}
                />
            </div>
            <div id="output-panel" className="output-panel">
                {output}
            </div>
        </div>
    );
};

export default StudentLab;
