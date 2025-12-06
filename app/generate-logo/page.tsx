"use client";
import PROPMT from "@/app/_data/Prompt";
import { useStore } from "@/stores/store";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);
  const clearFormData = useStore((s) => s.clearFormData);

  const [logoImage, setLogoImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();

  // 3. Create a Ref to track if we have already fired the request
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!formData?.title) redirect("/create");

    // Stop If loading, already called the API
    if (!isLoaded || calledOnce.current) return;

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

        console.log("Success:", response?.data.image);
        setLogoImage(response?.data.image);
        clearFormData(); //clearing the form so if user reloads he will be redirected to other page instead of another request for logo
      } catch (error) {
        console.error("Error generating logo:", error);
      } finally {
        setLoading(false);
      }
    };

    generateLogo();
  }, [formData, isLoaded, user]); // Run effect when these change

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      {/* Show loading if loading OR if we are waiting for Clerk */}
      {(isLoading || !isLoaded) && <p>Generating your logo...</p>}

      {!isLoading && logoImage && (
        <>
          <h2 className="text-black text-3xl">This is the logo - </h2>
          <img src={logoImage} alt="logo" className="w-56 h-56" />
        </>
      )}

      {/* Handle case where loading finished but no image (error state) */}
      {!isLoading && isLoaded && !logoImage && calledOnce.current && (
        <p>Failed to generate logo. Please try again.</p>
      )}
    </div>
  );
};

export default GenerateAILogo;

// constructing prompt for sending it to gemini
const constructPrompt = (formData: any) => {
  if (!formData) return "";

  return PROPMT.LOGO_PROMPT.replace(`{logoTitle}`, formData?.title ?? "")
    .replace(`{logoDesc}`, formData?.desc ?? "")
    .replace(`{logoColor}`, formData?.palette ?? "")
    .replace(`{logoDesign}`, formData?.design?.title ?? "")
    .replace(`{logoPrompt}`, formData?.design?.prompt ?? "");
};
