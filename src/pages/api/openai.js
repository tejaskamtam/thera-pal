// this is a OpenAI class with a generateText function
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-SZLwyfrU6qwtX9czsudt6bBy',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { prompt } = req.body;
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a therapist playing the role of my mental health aid.',
      },
      { role: 'user', content: prompt },
    ],
  });

  res
    .status(200)
    .json({ response: completion.data.choices[0].message.content });
}
