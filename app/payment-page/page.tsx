"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Razorpay from "razorpay";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CreditCard, Zap } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const customerName = user?.fullName || user?.firstName || "";
  const customerEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userId = user?.id;
  const AMOUNT = 199;

  const { initiatePayment, isProcessing, error, clearError } = usePayment({
    amount: AMOUNT,
    customerEmail,
    customerName,
    userId,
  });

  // Checking if the user is signed in or not
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in?redirect_url=/payment-page");
    }
  }, [isLoaded, isSignedIn, router]);

  // Loading state
  if (!isLoaded || !isSignedIn)
    return (
      <div className="text-center mt-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Loading user data...
        </h2>
      </div>
    );
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="md:flex justify-center items-center md:gap-3">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-r from-blue-600 to-blue-500  rounded-full mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Upgrade to Premium
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              Unlock all features and take your logos to the next level
            </p>
          </div>
        </div>

        {/* Payment Card */}
        <div className="md:w-3/5 lg:w-2/5 mx-auto bg-gray-50 rounded-2xl shadow-xl p-8 sticky top-8">
          <div className="mb-6 ml-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Summary
            </h2>
            <p className="text-gray-600">Complete your purchase below</p>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {customerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{customerName}</p>
                <p className="text-sm text-gray-600">{customerEmail}</p>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Premium Plan</span>
              <span className="font-semibold text-gray-900">₹{AMOUNT}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes (18%)</span>
              <span className="font-semibold text-gray-900">Included</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
            <span className="text-2xl font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-gray-800">₹{AMOUNT}</span>
          </div>

          {/* Payment Button */}
          <button
            onClick={initiatePayment}
            disabled={isProcessing}
            className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-bold text-lg py-4 px-6 rounded-xl hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-3"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-t-4 border-gray-100"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                <span>Proceed to Payment</span>
              </>
            )}
          </button>

          {/* Payment Methods */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-3">
              Secure payment powered by Razorpay
            </p>
            <div className="flex justify-center items-center space-x-3">
              <img
                src="https://img.icons8.com/color/48/visa.png"
                alt="Visa"
                className="h-8"
              />
              <img
                src="https://img.icons8.com/color/48/mastercard.png"
                alt="Mastercard"
                className="h-8"
              />
              <img
                src="https://img.icons8.com/color/48/amex.png"
                alt="Amex"
                className="h-8"
              />
              <img
                src="https://img.icons8.com/color/48/rupay.png"
                alt="RuPay"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
