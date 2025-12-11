import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate AI Text Prompt for Logo
export async function aiPrompt(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const text = response.text;

    // trying to parse as JSON; if parse succeeds, return the parsed object, else return the raw string
    try {
      // Clean up the text in case it has markdown code blocks (e.g. ```json ... ```)
      const cleanedText = text?.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanedText!);
    } catch {
      return text;
    }
  } catch (error) {
    console.error("Error generating AI prompt:", error);
    throw error;
  }
}

// Generate Logo from AI Image Model
export const aiImage = async (prompt: string) => {
  // Pollinations.ai - completely free, no API key required
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&model=flux`;

  // Fetch image from Pollinations
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    timeout: 60000,
  });

  // Convert binary data to base64(encoded string)
  const buffer = Buffer.from(response.data, "binary");
  const base64Image = buffer.toString("base64");

  const base64ImageWithMime = `data:image/jpeg;base64,${base64Image}`;

  return base64ImageWithMime;
};
