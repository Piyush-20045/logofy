import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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
    const isValidPayment = isValid();

    if (isValidPayment) {
      // Payment is verified successfully
      // Update database here
      console.log("Payment verified successfully:", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        userId,
      });

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
