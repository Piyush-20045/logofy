import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import Replicate from "replicate";
import { supabaseAdmin } from "./supabaseAdmin";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate AI TEXT PROMPT
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

// Generate Logo from AI IMAGE MODEL
export const aiImage = async (prompt: string, user_id: string) => {
  // Getting user data
  const { data: userData } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", user_id)
    .single();

  // Downgrading plan_type to FREE from PREMIUM
  if (userData.plan_type === "premium" && userData.credits === 0) {
    await supabaseAdmin
      .from("users")
      .update({ plan_type: "free" })
      .eq("id", user_id);
  }
  // DEDUCTING CREDIT
  const { error: deductError } = await supabaseAdmin
    .from("users")
    .update({ credits: userData.credits - 1 })
    .eq("id", user_id);

  if (deductError) {
    throw new Error("Error in deducting credit");
  }

  // REEPLICATE'S PAID AI
  if (userData.plan_type === "premium" && userData.credits > 0) {
    try {
      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });
      const output = await replicate.run(
        "bytedance/hyper-flux-8step:16084e9731223a4367228928a6cb393b21736da2a0ca6a5a492ce311f0a97143",
        {
          input: {
            seed: 0,
            width: 848,
            height: 848,
            prompt: prompt,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "png",
            guidance_scale: 3.5,
            output_quality: 80,
            num_inference_steps: 8,
          },
        }
      );

      const base64ImageWithMime = await ConvertImageToBase64(output);

      return {
        imageUrl: base64ImageWithMime,
        creditsUsed: 1,
        remainingCredits: userData.credits - 1,
        model: "replicate",
      };
    } catch (err) {
      // IF GENERATION FAILS, REFUNDING THE CREDIT
      await supabaseAdmin
        .from("users")
        .update({ credits: userData.credits })
        .eq("id", user_id);

      throw new Error("Image generation failed");
    }
  } else {
    // POLLINATIONS.AI
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

    return {
      imageUrl: base64ImageWithMime,
      creditsUsed: 1,
      remainingCredits: userData.credits - 1,
      model: "pollinations",
    };
  }
};

async function ConvertImageToBase64(image: any) {
  const res = await axios.get(image, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(res.data).toString("base64");
  return `data: image/png;base64,${base64ImageRaw}`;
}
