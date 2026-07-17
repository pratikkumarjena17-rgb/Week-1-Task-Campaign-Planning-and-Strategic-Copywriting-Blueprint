import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
app.use(express.json());

const PORT = 3000;

app.post('/api/generate-blueprint', async (req, res) => {
  try {
    const { productName, productDescription } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Act as a Virtual Copywriting Apprentice Intern. Develop a comprehensive campaign strategy and blueprint for the following hypothetical product/service:
Product Name: ${productName}
Description: ${productDescription}

Your output must include the following sections with clear headings:
1. Research Findings (Market research, trends)
2. Target Audience Profiles (Demographics, psychographics)
3. Competitor Analysis (Review of competitors and positioning)
4. Creative Direction & Key Messaging (Primary message, tone of voice, narrative)
5. Recommendations for Content Channels and Formats (Distribution strategies)

Ensure the tone is professional, insightful, and ready for stakeholder review. Format the output in clean Markdown. Avoid using HTML tags in the Markdown.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    res.json({ markdown: response.text });
  } catch (error: any) {
    console.error('Error generating blueprint:', error);
    res.status(500).json({ error: error.message || 'Failed to generate blueprint' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
