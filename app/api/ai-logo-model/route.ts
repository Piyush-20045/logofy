import { aiLogoPrompt } from "@/lib/ai-model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Generate AI Text Prompt for Logo
    const improvedPrompt = await aiLogoPrompt(prompt);

    return NextResponse.json({ prompt: improvedPrompt });

    // AI logo Image Modal
  } catch (e) {
    console.error("Error generating AI logo prompt:", e);
    return NextResponse.json(
      { error: "Error generating AI logo prompt" },
      { status: 500 }
    );
  }
}
