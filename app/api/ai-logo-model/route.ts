import { aiPrompt, aiImage } from "@/lib/ai-model";
import { NextResponse } from "next/server";
import { saveLogoToDb } from "@/lib/db-actions";

export async function POST(req: Request) {
  try {
    const { prompt, user_id, title, desc } = await req.json();

    // Generate AI Text PROMPT for Logo
    const improvedPrompt = await aiPrompt(prompt);

    // Generate AI LOGO using Image Model
    const aiImgResponse = await aiImage(improvedPrompt.prompt, user_id);

    // Save image to Supabase Storage and record in DB (if user_id exists)
    try {
      if (user_id) {
        await saveLogoToDb({
          user_id,
          title,
          desc,
          image: aiImgResponse.imageUrl,
        });
      }
    } catch (dbErr) {
      console.error("Error saving logo to DB:", dbErr);
    }
    return NextResponse.json({
      image: aiImgResponse.imageUrl,
      creditsUsed: aiImgResponse.creditsUsed,
      remainingCredits: aiImgResponse.creditsUsed,
    });
  } catch (e) {
    console.error("Error generating AI logo prompt:", e);
    return NextResponse.json(
      { error: "Error generating AI logo prompt" },
      { status: 500 }
    );
  }
}
