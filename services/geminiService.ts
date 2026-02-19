import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const generatePlayerAnalysis = async (playerName: string, category: string): Promise<string> => {
  if (!ai) return "AI Analysis unavailable (Missing API Key)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very short (2 sentences max), punchy scouting report for a cricket player named ${playerName} who is a ${category}. Focus on their strengths in T20 format.`,
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Analysis failed.";
  }
};

export const generateAuctionCommentary = async (player: string, soldPrice: string, team: string): Promise<string> => {
  if (!ai) return "";

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a 1-sentence exciting commentary for an auctioneer selling ${player} to team ${team} for ${soldPrice}.`,
    });
    return response.text || "";
  } catch (e) {
      return "";
  }
}