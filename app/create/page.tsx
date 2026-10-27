"use client";

import { Suspense } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { useStore } from "@/stores/steps-store";
import LogoTitle from "./steps/logo-title";
import LogoPalette from "./steps/logo-palette";
import LogoDesigns from "./steps/logo-designs";
import Pricing from "./steps/pricing";

const steps = ["Your brand", "Color palette", "Design style", "Make it yours"];

export default function Create() {
  const { step, decStep, incStep, formData, setFormData } = useStore();
  const canContinue =
    step === 2 ? Boolean(formData.palette) : Boolean(formData.design);

  return (
    <main className="min-h-[75vh] bg-[#f7f7f0] px-5 py-9 text-[#202e29] md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-[#61735c]">
              THE LOGOFY STUDIO
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              A little idea.{" "}
              <em className="font-[Georgia,serif] font-normal text-[#087f69]">
                A whole new identity.
              </em>
            </h1>
          </div>
          <span className="text-sm text-[#63705f]">
            Step {step} of {steps.length}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#dce2d4] bg-[#fffef9] md:grid md:grid-cols-[230px_1fr]">
          <aside className="border-b border-[#dce2d4] bg-[#eef1e5] p-4 md:border-b-0 md:border-r md:p-6">
            <ol
              className="grid grid-cols-4 gap-2 md:grid-cols-1 md:gap-6"
              aria-label="Logo creation progress"
            >
              {steps.map((label, index) => (
                <li
                  key={label}
                  aria-current={step === index + 1 ? "step" : undefined}
                  className="flex flex-col items-center gap-2 md:flex-row md:gap-3"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${step >= index + 1 ? "bg-[#087f69] text-white" : "border border-[#cbd4c0] text-[#77816c]"}`}
                  >
                    {step > index + 1 ? (
                      <Check size={16} aria-label="Completed" />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>
                  <span
                    className={`text-center text-[11px] sm:text-sm md:text-left ${step === index + 1 ? "font-semibold text-[#203b2d]" : "text-[#6c7863]"}`}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 hidden border-t border-[#d3dcc8] pt-6 md:block">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#61735c]">
                <Sparkles size={15} /> YOUR CREATIVE BRIEF
              </p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="mb-1 text-xs text-[#6c7863]">Brand</dt>
                  <dd className="wrap-break-word font-medium">
                    {formData.title || "Your next big idea"}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs text-[#6c7863]">Palette</dt>
                  <dd>{formData.palette || "Still exploring"}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs text-[#6c7863]">Style</dt>
                  <dd>{formData.design?.title || "Still exploring"}</dd>
                </div>
              </dl>
              <p className="mt-8 font-[Georgia,serif] text-lg italic text-[#607456]">
                Make something
                <br />
                unmistakably yours.
              </p>
            </div>
          </aside>

          <div className="min-w-0 p-5 sm:p-8 lg:p-10">
            {step === 1 && (
              <Suspense
                fallback={
                  <p role="status" className="py-12 text-[#63705f]">
                    Opening your canvas…
                  </p>
                }
              >
                <LogoTitle onHandleInputChange={setFormData} />
              </Suspense>
            )}
            {step === 2 && (
              <LogoPalette
                onHandleInputChange={(value) => setFormData("palette", value)}
              />
            )}
            {step === 3 && (
              <LogoDesigns
                onHandleInputChange={(value) => setFormData("design", value)}
              />
            )}
            {step === 4 && <Pricing formData={formData} />}

            {step > 1 && (
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#e0e5d7] pt-6">
                <button
                  type="button"
                  onClick={() => decStep(1)}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-medium text-[#63705f] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
                >
                  <ArrowLeft size={17} /> Back
                </button>
                {step < 4 && (
                  <button
                    type="button"
                    onClick={() => incStep(1)}
                    disabled={!canContinue}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-md bg-[#087f69] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue <ArrowRight size={17} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-[#6c7863]">
          Your vision sets the direction. We’ll take care of the design.
        </p>
      </div>
    </main>
  );
}
