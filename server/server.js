import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate-insight", async (req, res) => {
  try {
    const { answers } = req.body;

    const prompt = `
You are a professional makeup consultant. Analyze the user's quiz answers below and generate a personalized makeup analysis in this structured format:

Your Personalized Makeup Analysis

Profile Summary
${JSON.stringify(answers, null, 2)}

💫 Your Beauty Palette
(Generate makeup tone and product suggestions matching the user's profile.)

💋 Lips
(Recommend ideal lip shades and finishes.)

👁️ Eyes
(Suggest eye makeup palette and techniques.)

🎨 Contour & Highlight
(Give contour and highlight advice.)

💄 Recommended Looks
(Provide Day and Evening look recommendations.)

🌷 AI Insight
(A short 2–3 sentence summary of the user's beauty profile.)
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const aiResult = result.response.text();

    res.json({ result: aiResult });
  } catch (error) {
    console.error("Error generating AI insight:", error);
    res.status(500).json({ error: "Failed to generate insights" });
  }
});

// 🔹 Run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
