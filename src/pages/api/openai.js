// this is a OpenAI class with a generateText function
import { Configuration, OpenAIApi } from 'openai';
export class OpenAI {
    constructor(apiKey) {
        // Create the Configuration and OpenAIApi instances
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }
    // generate text: only need prompt
    async generateText(prompt, model = "gpt-3.5-turbo", max_tokens = 1000, temperature = 0.85) {
        try {
            // Send a request to the OpenAI API to generate text
            const response = await this.openai.createCompletion({
                model,
                prompt,
                max_tokens,
                n: 1,
                temperature,
            });
            console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
            // Return the text of the response
            return response.data.choices[0].text;
        } catch (error) {
            throw error;
        }
    }
}