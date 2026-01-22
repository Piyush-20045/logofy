import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";
import { decode } from "base64-arraybuffer";

export async function saveLogoToDb({ user_id, title, desc, image }: any) {
  try {
    // 1. CONVERSION OF BASE64 INTO ArrayBuffer to save into SUPABASE BUCKET
    // Base64 comes with a prefix like "data:image/png;base64,".
    const base64Data = image.includes("base64")
      ? image.split("base64,")[1]
      : image;

    // 2. GENERATING A UNIQUE FILE PATH
    const fileName = `logo_${Date.now()}.jpg`;
    const filePath = `${user_id}/${fileName}`;

    // 3. UPLOAD TO SUPABASE STORAGE
    // Using 'decode' function to turn the string into an ArrayBuffer
    const { error: uploadError } = await supabaseAdmin.storage
      .from("generated-logos")
      .upload(filePath, decode(base64Data), {
        contentType: "image/png",
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      throw uploadError;
    }

    // 4. GET THE PUBLIC URL
    const { data: urlData } = supabaseAdmin.storage
      .from("generated-logos")
      .getPublicUrl(filePath);
    const image_url = urlData.publicUrl;

    // 5. SAVING METADATA in the logos table of supabase
    const { data, error } = await supabaseAdmin
      .from("logos")
      .insert({ user_id, title, desc, image_url });
    if (error) throw Error;

    return NextResponse.json({
      message: "Users logo data updated",
      data: data,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
