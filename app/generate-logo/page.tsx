"use client";
import PROPMT from "@/app/_data/Prompt";
import { useStore } from "@/stores/store";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);
  const [logoImage, setLogoImage] = useState("");
  const [isLoading, setLoading] = useState(true);

  // Wrapping generateLogo in useCallback so it's stable and useEffect doesn't complain
  const generateLogo = useCallback(async () => {
    const prompt = PROPMT.LOGO_PROMPT.replace(
      `{logoTitle}`,
      formData?.title ?? ""
    )
      .replace(`{logoDesc}`, formData?.desc ?? "")
      .replace(`{logoColor}`, formData?.palette ?? "")
      .replace(`{logoDesign}`, formData?.design?.title ?? "")
      .replace(`{logoPrompt}`, formData?.design?.prompt ?? "");

    // Generate logo using AI model
    try {
      const response = await axios.post("/api/ai-logo-model", {
        prompt: prompt,
      });
      console.log(response?.data.image);
      setLogoImage(response?.data.image);
    } catch (error) {
      console.error("Error generating logo:", error);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  useEffect(() => {
    generateLogo();
  }, [generateLogo]);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      {isLoading && <p>Generating you logo...</p>}

      {!isLoading && logoImage && (
        // Only show this block if not loading AND we have an image string
        <>
          <h2 className="text-black text-3xl">This is the logo - </h2>
          <img src={logoImage} alt="logo" className="w-56 h-56" />
        </>
      )}

      {!isLoading && !logoImage && (
        <p>No logo generated yet or failed to load..</p>
      )}
    </div>
  );
};

export default GenerateAILogo;
