"use client";
import PROPMT from "@/app/_data/Prompt";
import { useStore } from "@/stores/store";
import axios from "axios";
import { useEffect } from "react";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);

  useEffect(() => {
    generateLogo();
  }, [formData]);

  const generateLogo = async () => {
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
      console.log(response?.data.prompt);
    } catch (error) {
      console.error("Error generating logo:", error);
    }
    return <div>GenerateAILogo</div>;
  };
};

export default GenerateAILogo;
