"use client";
import React, { useState } from "react";
import LogoTitle from "../_components/logo-title";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";

// Create page component
const Create = () => {
  const step = useStore((state) => state.step);
  const decStep = useStore((state) => state.decStep);
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
      {step === 1 ? (
        <LogoTitle
          onHandleInputChange={(v) => onHandleInputChange("title", v)}
        />
      ) : null}

      {step === 1 ? null : (
        <div className="mt-10 w-full flex justify-between">
          <Button onClick={() => decStep(1)} variant={"outline"}>
            <ArrowLeft />
            Previous
          </Button>
          <Button>
            <ArrowRight />
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default Create;
