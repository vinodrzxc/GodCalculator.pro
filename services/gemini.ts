import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables");
      throw new Error("API Key not found");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const solveMathProblem = async (problem: string): Promise<string> => {
  try {
    const client = getClient();
    // Using gemini-2.5-flash for fast, reasoning-capable responses
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: problem,
      config: {
        systemInstruction: `You are an advanced mathematical assistant. 
        Your goal is to solve the user's math problem, conversion, or logic puzzle.
        
        Rules:
        1. If the user asks a simple calculation, provide the result directly.
        2. If the user asks a complex problem, provide a step-by-step explanation followed by the final answer clearly labeled.
        3. Format your response with clear Markdown. Use LaTeX-style formatting for math equations if possible (e.g. $x^2$), or standard clear text.
        4. Be concise but helpful.`,
        temperature: 0.3, // Lower temperature for more deterministic math results
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to solve the problem. Please try again.");
  }
};