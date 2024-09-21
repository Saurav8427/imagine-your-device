const express = require('express');
const OpenAIApi = require('openai'); // Only require OpenAIApi
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Directly instantiate OpenAIApi
const openai = new OpenAIApi({
  apiKey: 'YOUR_API_KEY',
});

app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    res.json({ url: response.data[0].url }); // Adjusted according to the response structure
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const axios = require('axios');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/api/generate-image', async (req, res) => {
//   const { prompt } = req.body;
//   try {
//     // Call DeepAI API
//     const response = await axios.post('https://api.deepai.org/api/text2img', {
//       text: prompt,
//     }, {
//       headers: {
//         'api-key': process.env.DEEPAI_API_KEY, // Store your DeepAI API key in .env
//       }
//     });

//     const imageUrl = response.data.output_url; // Get the image URL from the response
//     res.json({ url: imageUrl });
//   } catch (error) {
//     console.error('Error generating image:', error);
//     res.status(500).send('Error generating image');
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


