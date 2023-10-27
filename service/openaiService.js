import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getGPT3Response = async (promptText) => {
  try {
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: promptText,
      max_tokens: 150,
    });
    return gptResponse.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error interacting with GPT-3:", error);
    throw error;
  }
};
