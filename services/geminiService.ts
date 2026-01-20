
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function askAssistant(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return response.text || "Maaf, saya tidak dapat memproses permintaan anda sekarang.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, berlaku ralat teknikal dalam sistem bantuan AI.";
  }
}
