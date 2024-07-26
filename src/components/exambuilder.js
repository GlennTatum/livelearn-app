import React, { useEffect, useState } from "react";
import { GeminiSend } from "./utils";
import Form from "react-bootstrap/Form";

const ExamBuilder = () => {
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [response]);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleFilechange = async (event) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const UploadHandler = async (event) => {
    event.preventDefault();
    let res;
    if (!feedback || files.length === 0 || !subject) {
      alert("Please enter a subject/feedback and select a file first.");
      return;
    }

    setIsLoading(true);
    setResponse("");
    try {
      const prompt = `Note that you are a helpful teacher with years of experience in writing exams and you are also an expert in ${subject}. 
    Given the following text delimited by triple brackets of feedback to a student after an exam and the png attached below of the actual exam questions (and what the student got correct or wrong), return me a new exam similar - BUT NOT EXACT -  to the one provided, and be as precise as possible.
    Take a deep breath in between each step; do not forget any of the instructions.
    
    Exam feedback: 
    <<<${feedback}>>>
    
    Format the response as follows:
    - You must generate ALL the exam questions for each subtopic. It is CRITICAL that YOU DO NOT LEAVE ANY OUT.
    - Separate each question
    - Make sure to take into account every facet and aspect of the provided feedback, based on that, make questions that would most benefit the student's learning process from that feedback
    - Use bullet points or a numbered list to organize detailed question parts
    - DO NOT PROVIDE THE SOLUTIONS IN YOUR RESPONSE
    - Do not branch off and discuss anything else. Go straight into creating the new practice exam and fully generate the response.
    - Do not hesitate in between creating questions and you must go into extensive detail.`;
      for (const file of files) {
        res = await GeminiSend({
          prompt: prompt,
          file: file,
        });
      }

      setResponse((prev) => prev + res + "\n\n");
    } catch (error) {
      console.error("error processing file", error);
      setResponse("Error with file");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Form
        onSubmit={UploadHandler}
        className="p-4 flex flex-col items-center"
      >
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject: </Form.Label>
              <Form.Control
                type="subject"
                placeholder="Enter the name of your class/subject"
                id="subject"
                onChange={handleSubjectChange}
              />
            </Form.Group>
          </div>
          <div className="mb-4">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Teacher's feedback: </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                type="feedback"
                id="feedback"
                onChange={handleFeedbackChange}
              />
            </Form.Group>
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block mb-2">
              Past exam:{" "}
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFilechange}
              className="w-full p-2 border rounded"
              multiple
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 text-black rounded hover:bg-blue-600"
          disabled={isLoading || files.length === 0 || !feedback || !subject}
        >
          {isLoading ? "Processing..." : "Upload your past exam to LiveLearnAI"}
        </button>
      </Form>
      {(isLoading || response) && (
        <div className="mt-8 p-4">
          <h3 className="text-xl font-bold mb-4">Practice exam:</h3>
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
            >
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: response.replace(/\n/g, "<br/>"),
                  }}
                />
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExamBuilder;
