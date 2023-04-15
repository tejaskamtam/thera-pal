import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-SZLwyfrU6qwtX9czsudt6bBy",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// function to generate text from a prompt
export default async function handler(req, res) {
    try {
        const response = await openai.complete({
            
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}
