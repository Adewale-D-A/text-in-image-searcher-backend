const { OpenAI } = require("openai");
require("dotenv").config();

const API_KEY = process.env.GPT_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
});

const chatGPT = async (prompt) => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(chatCompletion);
  //   console.log(chatCompletion["data"]["choices"][0]["message"]["content"]);
};

// chatGPT("what are some theories on what is one piece?");
module.exports = chatGPT;
