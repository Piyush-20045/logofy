import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userId,
    } = body;

    if (!razorpay_order_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment details" },
        { status: 400 }
      );
    }

    // verify payment signature
    const isValid = () => {
      try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
          .update(body)
          .digest("hex");

        return expectedSignature === razorpay_signature;
      } catch (err) {
        console.error("Signature verification error", err);
        return false;
      }
    };
    const isPaymentValid = isValid();

    // if payment is valid then UPDATING THE DATABASE
    if (isPaymentValid) {
      try {
        //get current credits
        const { data: userData } = await supabaseAdmin
          .from("users")
          .select("credits")
          .eq("id", userId)
          .single();

        const currectCredits = userData?.credits || 0;

        // UPDATING USER DB: set plan_type as premium and add 50 credits
        const { error: userError } = await supabaseAdmin
          .from("users")
          .update({ plan_type: "premium", credits: currectCredits + 50 })
          .eq("id", userId);

        if (userError) {
          console.error("Error in updating the user db", userError);
        }

        // UPDATING PAYMENTS DB: insert payment details
        const { error: paymentError } = await supabaseAdmin
          .from("payments")
          .insert({
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            user_id: userId,
          });

        if (paymentError) {
          console.error("Error in updating the payments db", paymentError);
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      //log failed verification attempt
      console.error("Payment verification failed:", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
      return NextResponse.json(
        {
          success: false,
          message: "Payment verfication failed",
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("Error in verifying payment", err);
    return NextResponse.json(
      { error: err.message || "Failed to verify payment" },
      { status: 500 }
    );
  }
}
