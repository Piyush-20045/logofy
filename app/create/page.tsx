"use client";
import { useState } from "react";
import LogoTitle from "./steps/logo-title";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";
import LogoDesc from "./steps/logo-desc";
import LogoPalette from "./steps/logo-palette";
import LogoDesigns from "./steps/logo-designs";
import LogoIdeas from "./steps/logo-ideas";
import Pricing from "./steps/pricing";

interface FormData {
  title?: string;
  desc?: string;
  palette?: string;
  design?: {
    image: string;
    prompt: string;
    title: string;
  };
}

// Create page component
const Create = () => {
  const step = useStore((state) => state.step);
  const decStep = useStore((state) => state.decStep);
  const incStep = useStore((state) => state.incStep);
  const [formData, setFormData] = useState<FormData>({});

  const onHandleInputChange = (field: string, value: string | object) => {
    // Handle input change logic here
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  return (
    <div className="bg-[url('/bg.webp')] bg-center bg-cover flex flex-col items-center">
      <div className="mx-2 md:mx-28 my-20 p-4 md:p-6 border border-black/10 rounded-2xl bg-blue-100 md:min-w-xl shadow-lg shadow-black/10">
        {step === 1 ? (
          <LogoTitle
            onHandleInputChange={(v) => onHandleInputChange("title", v)}
          />
        ) : step === 2 ? (
          <LogoDesc
            onHandleInputChange={(v) => onHandleInputChange("desc", v)}
          />
        ) : step === 3 ? (
          <LogoPalette
            onHandleInputChange={(v) => onHandleInputChange("palette", v)}
          />
        ) : step === 4 ? (
          <LogoDesigns
            onHandleInputChange={(v) => onHandleInputChange("design", v)}
          />
        ) : step === 5 ? (
          <LogoIdeas />
        ) : step === 6 ? (
          <Pricing />
        ) : null}

        {step === 1 ? null : (
          <div className="mt-11 w-full flex justify-between">
            <Button
              className="hover:scale-105 shadow-md shadow-black/20 transition-all duration-300 active:scale-95 cursor-pointer"
              onClick={() => decStep(1)}
              variant={"outline"}
            >
              <ArrowLeft />
              Go Back
            </Button>
            <Button
              className="custom-button"
              onClick={() => incStep(1)}
              disabled={
                (formData["title"] === undefined && step === 1) ||
                (formData["desc"] === undefined && step === 2) ||
                (formData["palette"] === undefined && step === 3) ||
                (formData["design"] === undefined && step === 4) ||
                step === 6
              }
            >
              Continue
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
