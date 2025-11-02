import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

function generateMockAnalysis(answers) {
  const skinTone = answers["How would you describe your overall skin tone?"] || "medium";
  const undertone = answers["Which jewelry complements your skin more?"] || "neutral";
  const preference = answers["Which describes your everyday makeup goal?"] || "natural";
  const eyeShape = answers["What is your natural eye shape?"] || "almond";
  const lipShape = answers["How would you describe your natural lip fullness?"] || "medium";
  
  return {
    profileSummary: `Based on your ${skinTone} skin with ${undertone} undertones and ${preference} preferences, you have a balanced beauty profile that works well with both natural and enhanced makeup looks.`,
    
    beautyPalette: `Your ${undertone} undertones pair beautifully with warm, earthy colors. For foundation, look for shades with golden or neutral undertones. Your complexion shines with peach, rose, and bronze tones.`,
    
    lips: `For your ${lipShape} lips, we recommend creamy satin finishes in neutral pinks for daytime and deeper berry tones for evening. Hydrating formulas will keep your lips looking their best.`,
    
    eyes: `Your ${eyeShape} eyes are perfect for soft, blended eyeshadow looks. Focus on neutral browns and taupes to enhance your natural shape. Use brown eyeliner for subtle definition.`,
    
    contourHighlight: `Apply cool-toned contour powder lightly under cheekbones for subtle definition. Highlight with pearl or champagne shades on cheekbones, brow bones, and cupid's bow for a natural glow.`,
    
    recommendedLooks: {
      day: "Fresh-faced look with tinted moisturizer, neutral eyeshadow, mascara, and lip balm",
      evening: "Soft glam with defined eyes, subtle contour, and bold lip color"
    },
    
    aiInsight: `Your beauty profile suggests a harmonious balance between natural elegance and enhanced features. Your ${undertone} undertones create a versatile canvas that works well with both minimal and polished makeup styles.`
  };
}

function cleanAnalysisResponse(analysis) {
  // Function to parse any string that might be JSON
  const parseIfJson = (str) => {
    if (typeof str !== 'string') return str;
    try {
      const parsed = JSON.parse(str);
      // If it's an object, convert it to a readable string
      if (typeof parsed === 'object' && parsed !== null) {
        return Object.entries(parsed)
          .map(([key, value]) => `${key}: ${value}`)
          .join('. ');
      }
      return parsed;
    } catch {
      return str;
    }
  };

  return {
    profileSummary: parseIfJson(analysis.profileSummary || analysis.Skin || analysis.Hair),
    beautyPalette: parseIfJson(analysis.beautyPalette || analysis.Skin || analysis['Beauty Palette']),
    lips: parseIfJson(analysis.lips || analysis.Lips),
    eyes: parseIfJson(analysis.eyes || analysis.Eyes),
    contourHighlight: parseIfJson(analysis.contourHighlight || analysis.Contour || analysis.Highlight),
    recommendedLooks: {
      day: parseIfJson(analysis.recommendedLooks?.day || analysis.Day || analysis['Day Look']),
      evening: parseIfJson(analysis.recommendedLooks?.evening || analysis.Evening || analysis['Evening Look'])
    },
    aiInsight: parseIfJson(analysis.aiInsight || analysis.Summary || analysis.Insight)
  };
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
You are a professional makeup consultant. Analyze these beauty quiz answers and provide a personalized makeup analysis.

USER ANSWERS:
${JSON.stringify(answers, null, 2)}

CRITICAL: You MUST respond with ONLY a JSON object in this EXACT structure. All values must be plain text, NOT nested JSON:

{
  "profileSummary": "Brief summary text here as plain text only",
  "beautyPalette": "Makeup tone and product suggestions as plain text only",
  "lips": "Lip recommendations as plain text only",
  "eyes": "Eye makeup suggestions as plain text only", 
  "contourHighlight": "Contour and highlight advice as plain text only",
  "recommendedLooks": {
    "day": "Day look description as plain text only",
    "evening": "Evening look description as plain text only"
  },
  "aiInsight": "Final summary text here as plain text only"
}

IMPORTANT: Do NOT use any JSON formatting within the values. Use only natural English sentences.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a makeup expert. You MUST respond with ONLY valid JSON. All values must be plain text sentences, no nested JSON objects or arrays."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const aiResult = data.choices[0].message.content;
    
    console.log("Raw AI response:", aiResult);
    
    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(aiResult);
      console.log("✅ AI insight parsed successfully");
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      parsedResult = generateMockAnalysis(answers);
    }

    // Clean and validate the structure
    const cleanedResult = cleanAnalysisResponse(parsedResult);
    const finalResult = validateAnalysisStructure(cleanedResult, answers);

    console.log("Final cleaned result:", finalResult);

    res.json({ 
      success: true,
      analysis: finalResult 
    });

  } catch (error) {
    console.error("Error generating AI insight:", error);
    
    const { answers } = req.body || {};
    const mockResult = generateMockAnalysis(answers || {});
    
    res.json({ 
      success: false,
      analysis: mockResult,
      note: "Using simulated analysis"
    });
  }
});

function validateAnalysisStructure(analysis, answers) {
  const defaultAnalysis = generateMockAnalysis(answers || {});
  
  // Ensure all values are strings
  const ensureString = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  return {
    profileSummary: ensureString(analysis.profileSummary || defaultAnalysis.profileSummary),
    beautyPalette: ensureString(analysis.beautyPalette || analysis.Skin || defaultAnalysis.beautyPalette),
    lips: ensureString(analysis.lips || analysis.Lips || defaultAnalysis.lips),
    eyes: ensureString(analysis.eyes || analysis.Eyes || defaultAnalysis.eyes),
    contourHighlight: ensureString(analysis.contourHighlight || analysis.Contour || defaultAnalysis.contourHighlight),
    recommendedLooks: {
      day: ensureString(analysis.recommendedLooks?.day || analysis.Day || defaultAnalysis.recommendedLooks.day),
      evening: ensureString(analysis.recommendedLooks?.evening || analysis.Evening || defaultAnalysis.recommendedLooks.evening)
    },
    aiInsight: ensureString(analysis.aiInsight || analysis.Summary || defaultAnalysis.aiInsight)
  };
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    groqKey: !!process.env.GROQ_API_KEY,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));