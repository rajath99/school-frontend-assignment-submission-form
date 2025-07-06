const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Gemini AI model
// This uses the API key from your .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ success: true, text });

  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ success: false, message: "Failed to generate content from AI." });
  }
};

module.exports = { generateContent };