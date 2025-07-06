// routes/gemini.js
const express = require('express');
const router = express.Router();

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Dummy response for now (replace with Gemini API call later)
    const result = `You asked: "${prompt}"`;

    res.json({ text: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
