import { GoogleGenerativeAI } from '@google/generative-ai';

async function run() {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
     const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: "You are Krish, answer only about Krish."
     });
     
     const session = model.startChat({
        history: []
     });

     const result = await session.sendMessage("Who are you?");
     console.log("Success with 2.0-flash:", result.response.text());
  } catch(e) {
     console.error("Failed 2.0-flash:", e);
  }
}
run();
