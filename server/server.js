import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
console.log("✅ Loaded GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Yes" : "No");

const app = express();
app.use(cors());
app.use(express.json());

// Mock data generator for fallback (moved to top to avoid reference errors)
function generateMockAnalysis(answers) {
  const skinTone = answers["How would you describe your overall skin tone?"] || "medium";
  const undertone = answers["Which jewelry complements your skin more?"] || "neutral";
  const preference = answers["Which describes your everyday makeup goal?"] || "natural";
  const eyeShape = answers["What is your natural eye shape?"] || "almond";
  const lipShape = answers["How would you describe your natural lip fullness?"] || "medium";
  
  return `
Your Personalized Makeup Analysis ✨

Profile Summary
• Skin Tone: ${skinTone}
• Undertone: ${undertone}
• Preference: ${preference}
• Eye Shape: ${eyeShape}
• Lip Fullness: ${lipShape}

💫 Your Beauty Palette
Based on your ${skinTone} skin with ${undertone} undertones, we recommend warm, earthy tones that complement your natural coloring. Perfect foundation matches would be in the beige to golden spectrum.

💋 Lips
For your ${lipShape} lips:
• Everyday: Neutral pink or peach shades with creamy finish
• Special Occasion: Deeper berry or mauve tones
• Recommended: Hydrating lipsticks with satin finish

👁️ Eyes
For your ${eyeShape} eyes:
• Eyeshadows: Neutral browns, taupes, and soft golds
• Techniques: Soft blending to enhance your natural shape
• Eyeliner: Brown or gray for subtle definition

🎨 Contour & Highlight
• Contour: Subtle definition with cool-toned powder under cheekbones
• Highlight: Pearl or champagne on cheekbones, brow bones, and cupid's bow
• Blush: Soft peach or rosy tones on apples of cheeks

💄 Recommended Looks
• Day Look: Fresh-faced with tinted moisturizer, neutral eyes, and lip balm
• Evening Look: Soft glam with defined eyes, contour, and bold lips

🌷 AI Insight
Your beauty profile suggests a balanced approach that enhances your natural features while maintaining a fresh, radiant appearance. Your ${undertone} undertones and ${preference} preferences create a harmonious canvas for both everyday elegance and special occasion glamour.
  `;
}

app.post("/api/generate-insight", async (req, res) => {
  try {
    const { answers } = req.body;
    console.log("🧠 Answers received:", answers);

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ 
        error: "No answers provided",
        message: "Please complete the questionnaire before submitting."
      });
    }

  const prompt = `
  You are a professional makeup consultant. Analyze the user's quiz answers below and generate a personalized makeup analysis.

  IMPORTANT: Do NOT use any markdown formatting like * (asterisks symbol), **bold**, *italic*, or ### headers. Use only plain text with emojis for visual appeal.

  Here are the user's answers:
  ${JSON.stringify(answers, null, 2)}

  Please structure your response like this:

  Your Personalized Makeup Analysis ✨

  Profile Summary
  • [Summary of key characteristics]

  💫 Your Beauty Palette
  [Makeup tone and product suggestions matching the user's profile]

  💋 Lips
  [Ideal lip shades and finishes]

  👁️ Eyes  
  [Eye makeup palette and techniques]

  🎨 Contour & Highlight
  [Contour and highlight advice]

  💄 Recommended Looks
  [Day and Evening look recommendations]

  🌷 AI Insight
  [A short 2-3 sentence summary of the user's beauty profile]

  Remember: Use only plain text, no markdown symbols.
  `;

    // Use current Groq models (updated to avoid decommissioned models)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        // Updated models that are currently available
        model: "llama-3.1-8b-instant", // Alternative: "mixtral-8x7b-32768", "llama-3.1-70b-versatile"
        messages: [
          {
            role: "system",
            content: "You are a professional makeup artist and beauty consultant with expertise in color theory, skin tones, and personalized makeup recommendations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 0.9,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const aiResult = data.choices[0].message.content;

    console.log("✅ AI insight generated successfully with Groq");
    res.json({ result: aiResult });

  } catch (error) {
    console.error("Error generating AI insight:", error);
    
    // Use the answers from the request body in the catch block
    const { answers } = req.body || {};
    
    if (error.message.includes("401")) {
      res.status(500).json({ 
        error: "Invalid Groq API key",
        details: "Please check your GROQ_API_KEY in the .env file"
      });
    } else if (error.message.includes("429")) {
      // Provide mock data when rate limited
      const mockResult = generateMockAnalysis(answers || {});
      res.json({ 
        result: mockResult,
        note: "Free AI service limit reached. Here's a personalized analysis based on your answers."
      });
    } else if (error.message.includes("400") || error.message.includes("model_decommissioned")) {
      // Provide mock data for model errors
      const mockResult = generateMockAnalysis(answers || {});
      res.json({ 
        result: mockResult,
        note: "AI model updating. Here's your personalized makeup analysis."
      });
    } else {
      // General fallback to mock data
      const mockResult = generateMockAnalysis(answers || {});
      res.json({ 
        result: mockResult,
        note: "AI service is temporarily unavailable. Here's a personalized analysis based on your answers."
      });
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    groqKey: !!process.env.GROQ_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// 🔹 Run the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));