/* eslint no-eval: 0 */
import React, { useState,useRef } from 'react';
import Editor from "@monaco-editor/react";
const files ={
    "index.html" :{
        name:"index.html",
        language:"html",
        value:"//start from here"
    }, 
    "script.py" :{
        name:"script.py",
        language:"Python",
        value:"//write your code here"
    },
    "main.java" :{
        name:"main.java",
        language:"Java",
        value:"public class Main{\n"+
        "public static void void main(String[] args){\n"+
        "//write your code here}\n"+
       " }"
    }
}
const StudentLab = () => {
    const [fileName, setFileName]= useState("index.html");
    const file =files[fileName]
    const editorRef = useRef(null);

    function handleEditorDidMount(editor,monaco){
        editorRef.current = editor;

    }
   function getEditorValue(){
    if (editorRef.current) {
        alert(editorRef.current.getValue());
    } else {
        alert("Editor is not initialized yet.");
    }
   }
   function evaluateJavaScriptCode() {
    if (editorRef.current) {
        try {
            const result = eval(editorRef.current.getValue());  // Evaluate the code from the editor
            alert("Result: " + result);
        } catch (error) {
            alert("Error evaluating JavaScript code: " + error.message);
        }
    } else {
        alert("Editor is not initialized yet.");
    }
}
    return (
        <div>
             <ul>
             <button onClick={() => setFileName("index.html")}>HTML</button>
             <button onClick={() => setFileName("script.py")}>Python</button>
             <button onClick={() => setFileName("main.java")}>Java</button>
             <button onClick={() => getEditorValue()}>Show code</button>
             <button onClick={() => evaluateJavaScriptCode()}>Run</button>
             
            </ul>
          <Editor
          height= "50vh"
          width="100%" 
          theme="vs-dark"
          onMount={handleEditorDidMount}
          path={file.name}
          defaultLanguage={file.language}
          defaultValue={file.value}
          ></Editor> 
        </div>
    );
};

export default StudentLab;