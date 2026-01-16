"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/steps-store";
import LogoTitle from "./steps/logo-title";
import LogoPalette from "./steps/logo-palette";
import LogoDesigns from "./steps/logo-designs";
import Pricing from "./steps/pricing";

// Create page component
const Create = () => {
  const step = useStore((state) => state.step);
  const decStep = useStore((state) => state.decStep);
  const incStep = useStore((state) => state.incStep);
  const formData = useStore((state) => state.formData);
  const setFormData = useStore((state) => state.setFormData);

  const onHandleInputChange = (field: string, value: string | object) => {
    setFormData(field, value);
  };

  return (
    <div className="bg-[url('/bg.webp')] bg-center bg-cover flex flex-col items-center min-h-screen">
      <div className="mx-2 md:mx-28 my-20 p-4 md:p-6 border border-black/10 rounded-2xl bg-blue-100 md:min-w-xl shadow-lg shadow-black/10">
        {step === 1 ? (
          <div>
            <LogoTitle onHandleInputChange={onHandleInputChange} />
          </div>
        ) : step === 2 ? (
          <LogoPalette
            onHandleInputChange={(v) => onHandleInputChange("palette", v)}
          />
        ) : step === 3 ? (
          <LogoDesigns
            onHandleInputChange={(v) => onHandleInputChange("design", v)}
          />
        ) : step === 4 ? (
          <Pricing formData={formData} />
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
            {step === 4 ? null : (
              <Button
                className="custom-button"
                onClick={() => incStep(1)}
                disabled={
                  (formData["title"] === undefined &&
                    formData["desc"] === undefined &&
                    step === 1) ||
                  (formData["palette"] === undefined && step === 2) ||
                  (formData["design"] === undefined && step === 3)
                }
              >
                Continue
                <ArrowRight />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
