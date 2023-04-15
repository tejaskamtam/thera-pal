import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-SZLwyfrU6qwtX9czsudt6bBy",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();