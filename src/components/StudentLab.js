/* eslint no-eval: 0 */
import React, { useState,useRef } from 'react';
import Editor from "@monaco-editor/react";
import Button from "react-bootstrap/Button";
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
             <Button className='editor-button mx-2' onClick={() => setFileName("index.html")}>HTML</Button>
             <Button className='editor-button' onClick={() => setFileName("script.py")}>Python</Button>
             <Button className='editor-button mx-2' onClick={() => setFileName("main.java")}>Java</Button>
             <Button className='editor-button' onClick={() => getEditorValue()}>Show code</Button>
             <Button className='editor-button mx-2' onClick={() => evaluateJavaScriptCode()}>Run</Button>
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

          <div>
            <p>Output Panel</p>
          </div>
        </div>
    );
};

export default StudentLab;