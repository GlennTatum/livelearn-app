import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
// import Spinner from 'react-bootstrap/Spinner';

import { GoogleGenerativeAI } from "@google/generative-ai";
import LoadingSpinner from "./LoadingSpinner";

export async function GeminiClientMessage(options) {
  /*
@param (Object) options - The inputs to the prompt

Example:
let options;
options.prompt = "hello gemini!"
options.file = event.target.files[0] // Must fulfill the File interface
let rest await = GeminiClientMessage(options);
*/

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDjPJrMD5oh0_wIJZRWOXzjAKWep6hHQZ8"
  );

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const filereader = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target.result;
        const content = dataURL.split(",")[1]; // data,base64,<content>
        resolve(content);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file); // read as base64 content
    });
  };

  let prompt = options.prompt;

  if (options.prompt !== undefined && options.file !== null) {
    let blob = await filereader(options.file);

    let geminiFileOptions = {
      inlineData: {
        data: blob, // Should be of type Buffer
        mimeType: "image/png", // TODO check for png mime type
      },
    };

    const result = await model.generateContent([prompt, geminiFileOptions]);

    return result.response.text();
  }

  const result = await model.generateContent([prompt]);

  return result.response.text();
}

export default function StudentContentHelper() {
  const [getResponse, setResponse] = useState("");
  const [getFile, setFile] = useState(null);
  const [getPrompt, setPrompt] = useState("");

  useEffect(() => {}, [getResponse]);

  const handlePromptInputChange = (e) => {
    const v = e.target.value;
    setPrompt(v);
  };

  const handleFileUpdateChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
  };

  const [getSpinner, setSpinner] = useState(false);

  const handleSubmit = async (e) => {
    setSpinner(true);
    let res = await GeminiClientMessage({
      prompt: getPrompt,
      file: getFile,
    });
    setResponse(res);
    setSpinner(false);
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload Content</Form.Label>

        <Form.Control onChange={handleFileUpdateChange} type="file" />
      </Form.Group>
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">Prompt</InputGroup.Text>
        <Form.Control
          onChange={handlePromptInputChange}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
      <LoadingSpinner display={getSpinner} />
      <Button onClick={handleSubmit}>Upload</Button>
      <div>{getResponse}</div>
    </>
  );
}
