import React, { useState } from "react";
import { sendExam } from "./utils";
import Form from "react-bootstrap/Form";

const FeedbackGen = () => {
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
    if (!file || !subject) {
      alert("Please enter a subject/feedback and select a file first.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileContent = e.target.result;

      try {
        const res = await sendExam(fileContent, subject);

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
      <h1 className="font-bold p-4 text-center" style={{ fontSize: "48px" }}>
        Feedback Generator
      </h1>
      <Form
        onSubmit={UploadHandler}
        className="p-4 flex flex-col items-center"
        style={{ backgroundColor: "azure" }}
      >
        <div className="w-full max-w-md" style={{ backgroundColor: "azure" }}>
          <div className="mb-4">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject: </Form.Label>
              <Form.Control
                type="subject"
                placeholder="Enter the subject name"
                id="subject"
                onChange={handleSubjectChange}
              />
            </Form.Group>
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block mb-2">
              Exam:{" "}
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
          {isLoading
            ? "Processing..."
            : "Upload the student's graded exam to LiveLearnAI"}
        </button>
      </Form>
      {response && (
        <div className="mt-8 p-4">
          <h3 className="text-xl font-bold mb-4">Feedback to student</h3>
          <form>
            <div
              className="exam"
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
};

export default FeedbackGen;
