import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { currentUser } from "@clerk/nextjs/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // creating order here
    const order = await razorpay.orders.create({
      amount: 199 * 100, //Amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error in create-order route:", error);
    return NextResponse.json({ error: "Error creating order" });
    {
      status: 500;
    }
  }
}
