"use client";
import PROPMT from "@/app/_data/Prompt";
import { useStore } from "@/stores/store";
import { useEffect } from "react";

const GenerateAILogo = () => {
  const formData = useStore((s) => s.formData);

  useEffect(() => {
    generateLogo();
  }, [formData]);

  const generateLogo = async () => {
    const prompt = PROPMT.LOGO_PROMPT
      .replace(`{logoTitle}`, formData?.title ?? "")
      .replace(`{logoDesc}`, formData?.desc ?? "")
      .replace(`{logoColor}`, formData?.palette ?? "")
      .replace(`{logoDesign}`, formData?.design?.title ?? "")
      .replace(`{logoPrompt}`, formData?.design?.prompt ?? "");

    console.log(prompt);
  };
  return <div>GenerateAILogo</div>;
};

export default GenerateAILogo;
