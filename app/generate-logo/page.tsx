"use client";
import PROPMT from "@/data/Prompt";
import { useStore } from "@/stores/steps-store";
import { useCreditStore } from "@/stores/credit-store";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import Success from "./_components/success";
import Error from "./_components/error";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);
  const clearFormData = useStore((s) => s.clearFormData);
  const clearSteps = useStore((s) => s.clearStep);
  const { credits, fetchCredits } = useCreditStore();

  const [logoImage, setLogoImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();

  const calledOnce = useRef(false);

  useEffect(() => {
    if (!isLoaded || calledOnce.current) return;

    if (!formData.title || !formData.desc) redirect("/create");

    if (credits === 0) {
      toast.error("You have 0 credits remaining!");
      redirect("/pricing");
    }

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
        if (user?.id) {
          await fetchCredits(user?.id);
        }
        clearFormData();
        clearSteps();
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
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid mb-4 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Creating your logo...
          </h2>
          <p className="text-gray-500">This usually takes 10-20 seconds ✨</p>
        </div>
      )}

      {/* SUCCESS STATE */}
      {!isLoading && logoImage && (
        <Success formData={formData} logoImage={logoImage} />
      )}

      {/* ERROR STATE */}
      {!isLoading && isLoaded && !logoImage && calledOnce.current && <Error />}
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
