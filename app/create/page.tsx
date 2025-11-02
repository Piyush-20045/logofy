"use client";
import React, { useState } from "react";
import LogoTitle from "../_components/logo-title";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";
import LogoDesc from "../_components/logo-desc";
import LogoPalette from "../_components/logo-palette";
import LogoDesigns from "../_components/logo-designs";
import LogoIdeas from "../_components/logo-ideas";

// Create page component
const Create = () => {
  const step = useStore((state) => state.step);
  const decStep = useStore((state) => state.decStep);
  const incStep = useStore((state) => state.incStep);
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (field: string, value: string) => {
    // Handle input change logic here
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-[url('/bg.webp')] bg-center bg-cover flex flex-col items-center">
      <div className="mx-2 mt-24 p-4 md:p-6 border rounded-2xl bg-blue-100 max-w-lg shadow-lg shadow-black/10">
        {step === 1 ? (
          <LogoTitle
            onHandleInputChange={(v) => onHandleInputChange("title", v)}
          />
        ) : step === 2 ? (
          <LogoDesc
            onHandleInputChange={(v) => onHandleInputChange("desc", v)}
          />
        ) : step === 3 ? (
          <LogoPalette />
        ) : step === 4 ? (
          <LogoDesigns />
        ) : step === 5 ? (
          <LogoIdeas />
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
              className="bg-linear-to-tl from-blue-400 via-slate-600 to-blue-400 hover:scale-105 shadow-md shadow-black/20 transition-all duration-300 active:scale-95 cursor-pointer"
              onClick={() => incStep(1)}
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
