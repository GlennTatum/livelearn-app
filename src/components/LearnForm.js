"use client";
import React, { useState } from "react";
import { send } from "./utils";

export default function LearnForm() {
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleFilechange = async (event) => {
    setFile(event.target.files[0]);
  };

  const UploadHandler = async (event) => {
    event.preventDefault();
    if (!subject || !file) {
      alert("Please enter a subject and select a file first.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;

      try {
        const res = await send(fileContent, subject);

        setResponse(res);
      } catch (error) {
        console.error("Error:", error);
        console.log(error, error);
        setResponse("Error processing the request.");
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <h1 className=" p-4 text-center">Lesson Plan Creator</h1>
      <form
        onSubmit={UploadHandler}
        className="p-4 flex flex-col items-center"
        style={{ backgroundColor: "azure" }}
      >
        <div className="w-full max-w-md" style={{ backgroundColor: "azure" }}>
          <div className="mb-4">
            <label htmlFor="subject" className="block mb-4">
              Subject:{" "}
            </label>

            <input
              type="text"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Enter the file's subject"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block mb-2">
              File:{" "}
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFilechange}
              accept=".txt"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 text-black rounded hover:bg-blue-600"
          disabled={isLoading || !file || !subject}
        >
          {isLoading ? "Processing..." : "Upload and Process"}
        </button>
      </form>
      {response && (
        <div className="mt-8 p-4">
          <h3 className="text-xl font-bold mb-4">Lesson Plan:</h3>
          <form>
            <div
              className="lesson-plans"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
                borderRadius: "8px",
                padding: "16px",
                margin: "16px 0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontFamily: "Arial, sans-serif",
                lineHeight: 1.6,
                color: "#333",
              }}
              dangerouslySetInnerHTML={{
                __html: response.replace(/\n/g, "<br/>"),
              }}
            />
          </form>
        </div>
      )}
    </div>
  );
}
