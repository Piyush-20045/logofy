import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = user.id;
    const name = user.fullName || "Unknown";
    const email = user.primaryEmailAddress?.emailAddress;

    const { data, error } = await supabaseAdmin
      .from("users")
      .insert([{ id, name, email }]);

    if (error && error.code !== "23505") throw error;

    return NextResponse.json({ message: "User saved successfully", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
