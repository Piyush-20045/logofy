"use client";
import PROPMT from "@/app/_data/Prompt";
import { useStore } from "@/stores/steps-store";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { downloadLogo } from "@/lib/utils/logo-utils";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);
  const clearFormData = useStore((s) => s.clearFormData);
  const router = useRouter();

  const [logoImage, setLogoImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();

  const calledOnce = useRef(false);

  useEffect(() => {
    if (!isLoaded || calledOnce.current) return;

    if (!formData.title || !formData.desc) redirect("/create");

    // Lock the door immediately so it doesn't run again
    calledOnce.current = true;
    setLoading(true);

    const generateLogo = async () => {
      const prompt = constructPrompt(formData);
      try {
        const response = await axios.post("/api/ai-logo-model", {
          prompt: prompt,
          user_id: user?.id,
          title: formData?.title,
          desc: formData?.desc,
        });
        setLogoImage(response?.data.image);
        clearFormData();
      } catch (error) {
        console.error("Error generating logo:", error);
      } finally {
        setLoading(false);
      }
    };

    generateLogo();
  }, [formData, isLoaded, user]);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col p-8">
      {/* LOADING STATE */}
      {(isLoading || !isLoaded) && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid mb-4 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Creating your logo...
          </h2>
          <p className="text-gray-500">This usually takes 10-20 seconds ✨</p>
        </div>
      )}

      {/* SUCCESS STATE */}
      {!isLoading && logoImage && (
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Logo Generated Successfully!</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {formData?.title || "Your Logo"}
            </h1>
            <p className="text-gray-600">{formData?.desc}</p>
          </div>

          {/* Logo Display */}
          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-6 border border-gray-200">
            <div className="bg-white rounded-xl p-8 shadow-sm flex items-center justify-center">
              <img
                src={logoImage}
                alt={formData?.title || "Generated logo"}
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              onClick={() => downloadLogo(logoImage, formData?.title || "logo")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Logo
            </Button>

            <Link href="/dashboard" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                size="lg"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                View All Logos
              </Button>
            </Link>
          </div>

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 border-gray-200 hover:bg-gray-100"
              size="lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Link href="/create" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Create Another Logo
              </Button>
            </Link>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Your logo has been saved to your
              dashboard. You can download it anytime or generate variations!
            </p>
          </div>
        </div>
      )}

      {/* ERROR STATE */}
      {!isLoading && isLoaded && !logoImage && calledOnce.current && (
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't generate your logo. This might be due to high demand or
            a temporary issue.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/create">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateAILogo;

const constructPrompt = (formData: any) => {
  if (!formData) return "";

  return PROPMT.LOGO_PROMPT.replace(`{logoTitle}`, formData?.title ?? "")
    .replace(`{logoDesc}`, formData?.desc ?? "")
    .replace(`{logoColor}`, formData?.palette ?? "")
    .replace(`{logoDesign}`, formData?.design?.title ?? "")
    .replace(`{logoPrompt}`, formData?.design?.prompt ?? "");
};
