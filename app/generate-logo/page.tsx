"use client";
import PROPMT from "@/app/_data/Prompt";
import { useStore } from "@/stores/store";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);
  const [logoImage, setLogoImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();

  // 3. Create a Ref to track if we have already fired the request
  const calledOnce = useRef(false);

  useEffect(() => {
    // GUARD 1: If we already called the API, stop.
    if (calledOnce.current) return;

    // GUARD 2: If Clerk is still loading the user data, stop and wait.
    if (!isLoaded) return;

    // GUARD 3: If formData is empty (user refreshed page?), stop.
    if (!formData?.title) return;

    // --- START GENERATION ---
    calledOnce.current = true; // Lock the door immediately so it doesn't run again
    setLoading(true);

    const generateLogo = async () => {
      const prompt = PROPMT.LOGO_PROMPT.replace(
        `{logoTitle}`,
        formData?.title ?? ""
      )
        .replace(`{logoDesc}`, formData?.desc ?? "")
        .replace(`{logoColor}`, formData?.palette ?? "")
        .replace(`{logoDesign}`, formData?.design?.title ?? "")
        .replace(`{logoPrompt}`, formData?.design?.prompt ?? "");

      try {
        const response = await axios.post("/api/ai-logo-model", {
          prompt: prompt,
          user_id: user?.id, // Now we are sure this exists
          title: formData?.title,
          desc: formData?.desc,
        });

        console.log("Success:", response?.data.image);
        setLogoImage(response?.data.image);
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
      {/* Show loading if explicitly loading OR if we are waiting for Clerk */}
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
