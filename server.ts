import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Prediction & Insights Endpoint
app.post("/api/predict", async (req, res) => {
  try {
    const { employeeData } = req.body;

    const prompt = `
      You are an industrial HR Analyst & Data Scientist.
      Given the following employee data (simulated):
      ${JSON.stringify(employeeData, null, 2)}

      Tasks:
      1. Predict the Performance Rating: High, Medium, or Low.
      2. Give 3 actionable drivers (why they got this score).
      3. Suggest 2 specific coaching interventions.
      4. Provide a SHAP-style explanation of feature importance (percentage influence).

      Return JSON format (do not include markdown formatting):
      {
        "rating": "High/Medium/Low",
        "confidence": 0.0-1.0,
        "drivers": ["driver1", "driver2", "driver3"],
        "interventions": ["action1", "action2"],
        "importance": { "experience": 0.2, "training": 0.3 }
      }
    `;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    const responseText = result.text.replace(/```json|```/g, "").trim();
    res.json(JSON.parse(responseText));
  } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Prediction failed" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
