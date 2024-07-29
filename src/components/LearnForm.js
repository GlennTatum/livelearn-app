import React, { useEffect, useState } from "react";
import { GeminiSend } from "./utils";
import { Form, Row, Col, Button } from "react-bootstrap";

const LearnForm = () => {
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [response]);

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
    setResponse("");
    const APIprompt = `Remember that You are a helpful teacher with years of experience in making lesson plans and you are also an expert in ${subject}
    Given the following text in the png file attached of a curriculum for that subject, return me detailed lesson plans for each individual subtopic and be as precise as possible.
  Make sure you take into account this attribute:
  learning_types: Students can be "Auditory", "Kinesthetic", "Visual","Interpersonal", or "Reading and Writing" learners. Generate a different version of each lesson plan for each learning type.
  
  Take a deep breath in between each step; do not forget any of the instructions. Do not say aloud that you are taking a deep breath.
 
  
  Format the response as follows:
  - You must generate ALL the lesson plans for each subtopic. It is CRITICAL that YOU DO NOT LEAVE ANY OUT. Make sure every subtopic listed has a corresponding lesson plan for each learning plan.
  - Separate each learning type with a new paragraph.
  - Use bullet points or a numbered list to organize detailed steps
  - Provide headers for each subtopic and each learning type within that.
  - Do not branch off and discuss anything else. Go straight into talking about the lesson plans and fully generate the response.
  - Do not hesitate in between creating lesson plans and you must go into extensive detail.`;

    let res = await GeminiSend({
      prompt: APIprompt,
      file: file,
    });
    setResponse(res);
  };

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <h1 className=" p-4 text-center" style={{ fontFamily: "Montserrat" }}>
        Lesson Plan Creator
      </h1>
      <h3 className="my-4 text-center" style={{ fontFamily: "Montserrat" }}>
        This is a tool to help teachers with breaking down curriculums into
        individual lesson plans.
      </h3>
      <div className="mt-8" style={{ fontFamily: "Montserrat" }}>
        <p className="text-lg mt-8">
          Select the subject/class you teach in the dropdown bar, upload a
          photo/s of your curriculum
        </p>
      </div>

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

            <Form.Select
              aria-label="Default select example"
              onChange={handleSubjectChange}
              value={subject}
            >
              <option>Select the subject that you teach</option>
              <option value="Linear Algebra">Linear Algebra</option>
              <option value="Computer Science">
                Intro to Computer Science
              </option>
              <option value="Computer Science">
                Data Structures and Algorithms
              </option>
              <option value="Calculus">Calculus 1</option>
              <option value="Physics">Physics 1</option>
            </Form.Select>
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block mb-2">
              Curriculum:{" "}
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFilechange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 text-black rounded hover:bg-blue-600"
        >
          {isLoading ? "Processing..." : "Upload and Process"}
        </button>
      </form>
      {response && (
        <div className="mt-8 p-4">
          <div className="flex flex-row">
            <Row className="flex">
              <Form.Label
                as={Col}
                className="text-xl font-bold mb-4 grow"
                style={{ fontSize: "36px" }}
              >
                Lesson Plan:
              </Form.Label>
              <Form.Text as={Col}></Form.Text>
              <Form.Text as={Col}></Form.Text>
              <Form.Text as={Col}></Form.Text>
              <Form.Text as={Col}></Form.Text>
              <Form.Text as={Col}></Form.Text>
              <Button as={Col} style={{ height: "36px" }} className="flex-none">
                Export Lesson Plan
              </Button>
            </Row>
          </div>

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
};

export default LearnForm;
