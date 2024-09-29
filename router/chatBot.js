const express = require('express');
const axios = require('axios');

const router = express.Router();
// Replace with your actual API key
const API_KEY = 'AIzaSyDeU0M4TJUMQZNSqKWUUZmNB3UsDnD-fJk';

// Replace with the correct Google AI API URL
const API_URL = 'https://generativeai.googleapis.com/v1beta2/models/text-bison-001:generateText';

router.get("/ask-ai",(req,res)=>{
    res.render("chatBot.ejs");
})
// API route to handle AI queries
router.post('/ask-ai', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await axios.post(API_URL, {
            prompt: {
                text: prompt
            },
            temperature: 0.7,
            maxOutputTokens: 300
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        res.json({ answer: response.data });
    } catch (error) {
        console.error('Error communicating with Google AI API:', error);
        res.status(500).json({ error: 'Failed to communicate with Google AI API' });
    }
});

module.exports = router;
