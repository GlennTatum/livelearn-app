import React, { useState, useRef } from 'react';
import Editor from "@monaco-editor/react";
import Button from "react-bootstrap/Button";

const files = {
    "index.html": {
        name: "index.html",
        language: "html",
        value: "<html>\n" +
            "<head>\n" +
            " <title>Sample Page</title>\n" +
            "</head>\n" +
            "<body>\n" +
            " <script>\n" +
            "   console.log('Hello, world!');\n" + 
            " </script>\n" +
            "</body>\n" +
            "</html>"
    },
    "script.py": {
        name: "script.py",
        language: "Python",
        value: "# Python code goes here\n" +
            "def greet():\n" +
            "   print('Hello, world!')\n"
    },
    "main.java": {
        name: "main.java",
        language: "Java",
        value: "public class Main {\n" +
            "    public static void main(String[] args) {\n" +
            "        // Java code goes here\n" +
            "        System.out.println('Hello, world!');\n" +
            "    }\n" +
            "}"
    },
    "program.cs": {
        name: "program.java",
        language: "#C",
        value: " class Program{\n"+
       
            "static void Main(string[] args)\n"+
            "{"+
               " Console.WriteLine('Hello World!');\n"+
                "// Keep the console window open after the message is displayed.\n"+
               "Console.WriteLine('Press any key to exit.');\n"+
                "Console.ReadKey();\n"+
           " }\n"+
           "}"
        }
    };
const buttonStyle = (isHovered) => ({
    backgroundColor: isHovered ? 'lightgray' : 'darkgray',
    border: "none",
    padding: "10px",
    margin: "10px",
    height: "50px",
    width: "110px",
    cursor: 'pointer',
    boxShadow: isHovered ? "1px 1px 3px white":"2px 2px 5px black"
});
const StudentLab = () => {
    const [fileName, setFileName] = useState("index.html");
    const [output, setOutput] = useState("");
    const file = files[fileName];
    const editorRef = useRef(null);

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

    function evaluateJavaScriptCode() {
        if (fileName === "index.html") {
            if (editorRef.current) {
                try {
                    // Extract <script> tags content from HTML
                    const scriptContent = editorRef.current.getValue().match(/<script>(.*?)<\/script>/s);
                    if (scriptContent && scriptContent[1]) {
                        // Save the original console.log
                        const originalConsoleLog = console.log;
                        let logOutputs = [];
                        // Override console.log to capture outputs
                        console.log = (...args) => {
                            logOutputs.push(args.join(' '));
                        };

                        // Evaluate the JavaScript content within an IIFE
                        eval(`(function() { ${scriptContent[1]} })();`);

                        // Restore original console.log
                        console.log = originalConsoleLog;

                        // Set output to the captured logs
                        setOutput("Logs: " + logOutputs.join('\n'));
                    } else {
                        setOutput("No executable JavaScript found.");
                    }
                } catch (error) {
                    setOutput("Error evaluating JavaScript code: " + error.message);
                }
            } else {
                setOutput("Editor is not initialized yet.");
            }
        } else {
            setOutput("Evaluation of non-JavaScript code is not supported.");
        }
    }

    return (
        <div>
            <ul style={{backgroundColor:"lightgrey",padding:"10px"}}>
                <Button className='editor-button mx-2'style={buttonStyle(false)} onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'}onMouseLeave={e => e.target.style.backgroundColor = 'darkgray'}onClick={() => setFileName("index.html")}>JavaScript</Button>
                <Button className='editor-button' style={buttonStyle(false)} onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'}onMouseLeave={e => e.target.style.backgroundColor = 'darkgray'}onClick={() => setFileName("program.cs")}>C#</Button>
                <Button className='editor-button' style={buttonStyle(false)} onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'}onMouseLeave={e => e.target.style.backgroundColor = 'darkgray'}onClick={() => setFileName("script.py")}>Python</Button>
                <Button className='editor-button mx-2' style={buttonStyle(false)} onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'}onMouseLeave={e => e.target.style.backgroundColor = 'darkgray'}onClick={() => setFileName("main.java")}>Java</Button>
                <Button className='editor-button' style={buttonStyle(false)} onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'}onMouseLeave={e => e.target.style.backgroundColor = 'darkgray'}onClick={getEditorValue}>Show code</Button>
                <Button className='editor-button mx-2'style={buttonStyle(false)} onMouseEnter={e => e.target.style.backgroundColor = 'lightgray'} onMouseLeave={e => e.target.style.backgroundColor = 'darkgray'}onClick={evaluateJavaScriptCode}>Run</Button>
            </ul>
            <Editor
                height="50vh"
                width="100%"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
            ></Editor>

            <div>
                <div style={{ backgroundColor: "#ECE3E3",color:"blue", height: "300px", width:"300vh", padding: "10px"}}>
                <p>Output:</p>
                    {output}
                </div>
            </div>
        </div>
    );
};

export default StudentLab;
