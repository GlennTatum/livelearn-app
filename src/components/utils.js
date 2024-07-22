import axios from "axios";

export const send = async (text, subject) => {
  const apiKey = "sk-proj-hIQjVns3OHNrnbZElBXiT3BlbkFJJsxCzE7zyVrkRPaeG2Zl";
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${apiKey}`,
  };
  const prompt = `Given the following text delimited by triple brackets of a curriculum for that subject, return me detailed lesson plans for each individual subtopic and be as precise as possible.
  Make sure you take into account this attribute:
  learning_types: Students can be "Auditory", "Kinesthetic", "Visual","Interpersonal", or "Reading and Writing" learners. Generate a different version of each lesson plan for each learning type.
  Take a deep breath in between each step; do not forget any of the instructions.
  Curriculum:
  <<<${text}>>>
  
  Format the response as follows:
  - You must generate ALL the lesson plans for each subtopic. It is CRITICAL that YOU DO NOT LEAVE ANY OUT. Make sure every subtopic listed has a corresponding lesson plan for each learning plan.
  - Separate each learning type with a new paragraph.
  - Use bullet points or a numbered list to organize detailed steps
  - Provide headers for each subtopic and each learning type within that.
  - Do not branch off and discuss anything else. Go straight into talking about the lesson plans and fully generate the response.
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
