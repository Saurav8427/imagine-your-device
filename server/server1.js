const express = require('express');
const cors = require("cors");

const { OpenAI } = require('openai');
const app = express();
const port = 5000;
app.use(cors());

// Set up OpenAI API Key
const openai = new OpenAI({
    apiKey: 'YOUR_API_KEY', // Replace with your actual API key
});

// Define the API endpoint for suggested prompts
app.get('/api/suggested-prompts', async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: 'Generate a list of prompts for smartphone specifications.' }
            ],
        });

        const promptsText = response.choices[0].message.content;
        const promptsArray = promptsText.split('\n').filter(prompt => prompt.trim() !== '');

        // Shorten each prompt to a maximum of 5 words and limit to 5 results
        const shortenedPrompts = promptsArray
            .map(prompt => prompt.split(' ').slice(0, 5).join(' ')) // Take the first 5 words
            .slice(0, 5); // Limit to first 5 results

        res.send(shortenedPrompts);
    } catch (error) {
        console.error('Error fetching suggested prompts:', error);
        res.status(500).json({ error: error.message });
    }
});

// Define the API endpoint for product specifications
app.get('/api/product-specifications', async (req, res) => {
    const { prompt } = req.query; // Get the prompt from query parameters

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: `Provide detailed specifications for a smartphone based on this request: "${prompt}"` }
            ],
        });

        const specificationsText = response.choices[0].message.content;

        // Segregate specifications into structured format
        const specifications = {
            design: '',
            color: '',
            performance: '',
            battery: '',
            camera: '',
            additionalFeatures: ''
        };

        // Basic parsing logic to fill in the specifications (adjust based on actual response format)
        const lines = specificationsText.split('\n').filter(line => line.trim() !== '');
        lines.forEach(line => {
            if (line.toLowerCase().includes('design')) {
                specifications.design = line.replace('Design:', '').trim();
            } else if (line.toLowerCase().includes('color')) {
                specifications.color = prompt.match(/color (.+)/i) ? prompt.match(/color (.+)/i)[1].trim() : '';
            } else if (line.toLowerCase().includes('performance')) {
                specifications.performance = line.replace('Performance:', '').trim();
            } else if (line.toLowerCase().includes('battery')) {
                specifications.battery = line.replace('Battery:', '').trim();
            } else if (line.toLowerCase().includes('camera')) {
                specifications.camera = line.replace('Camera:', '').trim();
            } else if (line.toLowerCase().includes('additional features')) {
                specifications.additionalFeatures = line.replace('Additional Features:', '').trim();
            }
        });

        res.json({ specifications });
    } catch (error) {
        console.error('Error fetching product specifications:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}/api/suggested-prompts`);
    console.log(`Product specifications API is available at http://localhost:${port}/api/product-specifications`);
});