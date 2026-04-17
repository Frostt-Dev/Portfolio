import { GoogleGenerativeAI } from '@google/generative-ai';
import { CHATBOT_PERSONA_PROMPT } from '../src/utils/chatbotPersona';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing Gemini API Key configuration on server.' });
  }

  try {
    const { history, message } = req.body;
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: CHATBOT_PERSONA_PROMPT,
    });

    // Filter out welcome message or error messages, and format for Gemini SDK
    // Gemini roles must be 'user' or 'model'.
    const formattedHistory = (history || [])
      .filter((msg: any) => msg.id !== 'welcome' && !msg.content.includes('Oops!'))
      .map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

    const session = model.startChat({
      history: formattedHistory,
    });

    const result = await session.sendMessage(message);
    const text = result.response.text();

    return res.status(200).json({ reply: text });
  } catch (error: any) {
    console.error("Vercel Chat API Error:", error);
    return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
}
