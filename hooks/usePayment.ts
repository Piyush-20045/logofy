"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface UsePaymentProps {
  amount: number;
  customerName: string;
  customerEmail: string;
  userId?: string;
}

export const usePayment = ({
  amount,
  customerName,
  customerEmail,
  userId,
}: UsePaymentProps) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // create order on server
      const orderResponse = await axios.post("/api/payment/create-order");

      if (orderResponse.status !== 200) {
        toast.error("Something went wrong, please try again!");
        throw new Error("Failed to create payment order");
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Logofy Corp",
        description: "Token Purchase",
        image: "https://img.icons8.com/clouds/100/l.png",
        order_id: orderResponse.data.orderId,
        handler: function (orderResponse: any) {
          console.log("Payment successful", orderResponse);
          //Handle successful payment (e.g: update UI, send to server and verify the payment)
        },
        prefill: {
          //auto-fill customer's contact information
          name: customerName,
          email: customerEmail,
          contact: "", // phone number not available so let it be empty
        },
        notes: {
          userId: userId || "",
        },
        theme: {
          color: "#3b82f6",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setError("Payment cancelled by user");
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setError(response.error.description || "Payment failed");
        setIsProcessing(false);
      });
      razorpay.open();
    } catch (error: any) {
      console.error("Payment failed", error);
      setError(error.message || "Payment initialization failed");
      setIsProcessing(false);
    }
  };

  return {
    initiatePayment,
    isProcessing,
    error,
    clearError: () => setError(null),
  };
};
