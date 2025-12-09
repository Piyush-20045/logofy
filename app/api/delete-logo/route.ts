import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id, image_url } = await req.json();

    if (!id || !image_url) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // 1. EXTRACT FILE PATH FROM URL
    // URL: https://xyz.../storage/v1/object/public/generated-logos/user_123/logo.png
    // We need just: user_123/logo.png

    // Split by the bucket name ("generated-logos")
    const parts = image_url.split("generated-logos/");
    if (parts.length < 2) {
      throw new Error("Invalid image URL format");
    }
    const filePath = parts[1]; //This is like "user_123/logo.png"

    // 2. DELETE FROM STORAGE
    const { error: storageError } = await supabaseAdmin.storage
      .from("generated-logos")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage delete error:", storageError);
    }

    // 3. DELETE FROM DATABASE
    const { error: dbError } = await supabaseAdmin
      .from("logos")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("logos table delete error", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
