"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Home, Mail } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-zinc-50 flex items-center justify-center p-4">
      {/* Success Card */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-green-400 to-green-600 rounded-full mb-6 animate-bounce">
          <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for the purchase! Your account has been credited with{" "}
          <span className="font-bold">50 Credits</span>.
        </p>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-lg text-gray-900 mb-4 text-center">
            Transaction Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-mono text-sm text-gray-900 bg-gray-200 px-3 py-1 rounded">
                {paymentId}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Order ID</span>
              <span className="font-mono text-sm text-gray-900 bg-gray-200 px-3 py-1 rounded">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className="flex items-center space-x-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Confirmed</span>
              </span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span>What happens next?</span>
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                1
              </div>
              <span>Premium features activated instantly</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                2
              </div>
              <span>Start creating logos now!</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="w-full">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </button>
        </div>

        {/* Support */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? Contact our support at{" "}
          <a
            href="mailto:py624833@gmail.com"
            className="text-blue-600 hover:underline"
          >
            py624833@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
