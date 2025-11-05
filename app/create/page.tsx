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
import { log } from "console";

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
      <div className="mx-2 my-20 p-4 md:p-6 border border-black/10 rounded-2xl bg-blue-100 md:min-w-xl shadow-lg shadow-black/10">
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
            <Button className="custom-button" onClick={() => incStep(1)}>
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
