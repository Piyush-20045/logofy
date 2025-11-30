import { aiPrompt, aiImage } from "@/lib/ai-model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Generate AI Text PROMPT for Logo
    const improvedPrompt = await aiPrompt(prompt);
    console.log("improvedPrompt -- ", improvedPrompt.prompt);

    // Generate AI LOGO using Image Model
    const logoImage = await aiImage(improvedPrompt.prompt);
    return NextResponse.json({ image: logoImage });
  } catch (e) {
    console.error("Error generating AI logo prompt:", e);
    return NextResponse.json(
      { error: "Error generating AI logo prompt" },
      { status: 500 }
    );
  }
}
