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
        // Your JavaScript here
    </script>
</body>
</html>`
    },
    "script.py": {
        name: "script.py",
        language: "python",
        value: `# Write your Python code here`
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

    useEffect(() => {
        if (fileName === "index.html") {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/brython@3.9.5/brython.min.js";
            script.type = "text/javascript";
            script.onload = () => window.brython();
            document.head.appendChild(script);
        }
    }, [fileName]);

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
                eval(jsCode); 
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

        const script = document.createElement("script");
        script.type = "text/python";
        script.text = `
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
document.getElementById('output-panel').textContent = output
        `;

        document.body.appendChild(script);

        window.setTimeout(() => {
            const outputDiv = document.getElementById("output-panel");
            if(outputDiv) {
                setOutput(outputDiv.textContent);
            } else {
                setOutput("No output generated or error in Python script execution.");
            }
            document.body.removeChild(script);
        }, 1000);
    }

    function evaluateJavaCode() {
        const code = editorRef.current.getValue();
        fetch('http://your-backend-url/execute-java', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setOutput(data.output))
        .catch(error => setOutput("Error evaluating Java code: " + error.message));
    }

    function handleRun() {
        setOutput(""); // Clear the previous output
        if (fileName === "script.py") {
            evaluatePythonCode();
        } else if (fileName === "index.html") {
            evaluateJavaScriptCode();
        } else if (fileName === "main.java") {
            evaluateJavaCode();
        } else {
            setOutput("Running code for this language is not supported.");
        }
    }

    const file = files[fileName]; // Ensure file is defined based on fileName

    return (
        <div className="container">
            <div className="buttons">
                <button onClick={() => setFileName("index.html")}>JavaScript</button>
                <button onClick={() => setFileName("script.py")}>Python</button>
                <button onClick={() => setFileName("main.java")}>Java</button>
                <button onClick={() => getEditorValue()}>Show Code</button>
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
