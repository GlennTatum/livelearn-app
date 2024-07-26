import React, { useEffect, useState } from "react";
import { GeminiSend } from "./utils";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

const FeedbackGen = () => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");

  // eslint-disable-next-line no-self-compare
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [response]);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFilechange = async (event) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const UploadHandler = async (event) => {
    event.preventDefault();
    let res;
    if (files.length === 0 || !subject) {
      alert("Please enter a subject/feedback and select a file first.");
      return;
    }

    setIsLoading(true);

    try {
      const feedbackprompt = `Note that you are a helpful teacher with years of experience in grading exams, writing feedback and you are also an expert in ${subject}. Given the following graded exam in the png attached below, return your feedback (like a teacher would on the end of an exam) on how the student could improve for next time etc, and be as precise as possible. The student's name is delimted by a square bracket.
  Take a deep breath in between each step; do not forget any of the instructions.
  
  Student's name:
  [${name}]
  
  When writing your feedback, make sure to include the following attributes in your response:
  question_types_to_work_on: Types of questions that the student needs to work on based on what they got wrong, for example "Multiple choice", "Long-form", "Prove ...", "Solve for ...", "Consider ... Find ..." etc. These are just some possible question types that may appear and note that "..." can be a kind of statement in the question, following the command that the student is asked to do.
  subtopics: List the subtopics that the student needs to work on based on what they got wrong or struggled with in the exam. This may vary subject to subject, so you should be able to deduce which subtopics were in the exam based on the questions. Do not make broad statements in this, try to be as specific as possible.
  study_types: list out any recommended types of studying the student should do to improve on a specific subject

  Format the response as follows:
  - Make sure to use the stud ent's name appropriately in sentences WHERE IT IS APPLICABLE and not in every sentence.
  - You must generate feedback for ALL the exam questions. It is CRITICAL that YOU DO NOT LEAVE ANY OUT.
  - The response should be 1-2 paragraphs long, depending on how much they got right or wrong (eg. if more was wrong then there should be more feedback on how to improve)
  - Do not branch off and discuss anything else. Go straight into generating the feedback and fully generate the response and do not leave anything out.
  - Do not hesitate and you must go into extensive detail.
  - You do not need to list the attributes in the format that they are written in, just write them throughout the paragraph like you normally would for the main body of feedback.`;

      for (const file of files) {
        // eslint-disable-next-line no-unused-vars
        res = await GeminiSend({
          prompt: feedbackprompt,
          file: file,
        });
      }

      // eslint-disable-next-line no-undef
      setResponse((prev) => prev + res + "\n\n");
    } catch (error) {
      console.error("error processing file", error);
      setResponse("error with file");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <h1
        className="font-bold p-4 text-center"
        style={{ fontSize: "48px", fontFamily: "Montserrat" }}
      >
        Feedback Generator
      </h1>

      <h3 className="my-4 text-center" style={{ fontFamily: "Montserrat" }}>
        Get feedback for your students. AI does the heavy lifting, simplify
        tasks and provide premium feedback to optimize student improvements
      </h3>
      <div
        className="mt-8"
        style={{ fontFamily: "Montserrat", padding: "8px" }}
      >
        <p className="text-lg" style={{ fontSize: "20px" }}>
          Enter the subject/class you teach, enter the name of your student and
          upload photos of their exam
        </p>
      </div>
      <Form
        onSubmit={UploadHandler}
        className="p-4 flex flex-col items-center"
        style={{ backgroundColor: "azure" }}
      >
        <div className="w-full max-w-md" style={{ backgroundColor: "azure" }}>
          <div className="mb-4">
            <Row>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Subject: </Form.Label>
                <Form.Control
                  type="subject"
                  placeholder="Enter the subject name"
                  id="subject"
                  onChange={handleSubjectChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Student Name: </Form.Label>
                <Form.Control
                  type="subject"
                  placeholder="Enter the student's name"
                  id="subject"
                  onChange={handleNameChange}
                />
              </Form.Group>
            </Row>
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block mb-2">
              Exam:{" .png files ONLY"}
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
          disabled={isLoading || files.length === 0 || !subject}
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
