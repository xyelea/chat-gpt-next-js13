import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const prompt = req.body.prompt;

    const response = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).json({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: error || "terjadi eror yang tidak di ketahui" });
  }
}
