import axios from "axios";

export const send = async (text, subject) => {
  const apiKey = "sk-proj-xH1Hiuz60rtSRbgEJnreT3BlbkFJCVm128xxDGbV5RpDJvN4";
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${apiKey}`,
  };
  const prompt = `Given the following text delimited by triple brackets of a curriculum for that subject, return me detailed lesson plans for each individual subtopic and be as precise as possible.
  Make sure you take into account this attribute:
  learning_types: Students can be "Auditory", "Kinesthetic", "Visual","Interpersonal", or "Reading and Writing" learners. Generate a different version of each lesson plan for each learning type.
  Curriculum:
  <<<${text}>>>
  
  Format the response as follows:
  - Use clear paragraphs for each subtopic.
  - Separate each learning type with a new paragraph.
  - Use bullet points or a numbered list to organize detailed steps
  - Provide headers for each subtopic and each learning type within that.
  - Do not branch off and discuss anything else. Go straight into talking about the lesson plans and fully generate the response, giving all the lesson plans.
  - Do not hesistate in between creating lesson plans and you must go into extensive detail.`;
  const data = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a helpful teacher with years of experience in making lesson plans and you are also an expert in ${subject}`,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 4000,
  };

  try {
    const res = await axios.post(url, data, { headers });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with gpt", error);
    throw error;
  }
};
