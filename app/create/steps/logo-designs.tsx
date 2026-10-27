"use client";

import { Check } from "lucide-react";
import designs from "@/data/designs";
import { useStore, type CreateFormData } from "@/stores/steps-store";

interface LogoDesignsProps {
  onHandleInputChange: (value: NonNullable<CreateFormData["design"]>) => void;
}

export default function LogoDesigns({ onHandleInputChange }: LogoDesignsProps) {
  const selectedDesign = useStore((state) => state.formData.design?.title);

  return (
    <section aria-labelledby="design-title">
      <p className="mb-3 text-xs font-semibold tracking-[0.13em] text-[#087f69]">
        03 / A LITTLE PERSONALITY
      </p>
      <h2 id="design-title" className="text-3xl font-semibold tracking-tight">
        Make it your style.
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#63705f]">
        Pick a direction for your logo. These examples are your starting point.
      </p>
      <fieldset className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <legend className="sr-only">Choose a logo design style</legend>
        {designs.map((design) => (
          <label key={design.title} className="relative min-w-0 cursor-pointer">
            <input
              type="radio"
              name="design"
              value={design.title}
              checked={selectedDesign === design.title}
              onChange={() => onHandleInputChange(design)}
              className="peer sr-only"
            />
            <div className="h-full overflow-hidden rounded-lg border border-[#dce2d4] bg-white p-2 transition-colors hover:border-[#97b49c] peer-checked:border-[#087f69] peer-checked:ring-1 peer-checked:ring-[#087f69] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#087f69] motion-reduce:transition-none">
              <img
                src={design.image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full rounded bg-[#eef1e5] object-cover"
              />
              <div className="flex items-start justify-between gap-2 px-1 pb-1 pt-3">
                <span className="text-sm font-medium leading-snug">
                  {design.title}
                </span>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full ${selectedDesign === design.title ? "bg-[#087f69] text-white" : "border border-[#ccd5c4]"}`}
                >
                  {selectedDesign === design.title && (
                    <Check size={13} aria-hidden="true" />
                  )}
                </span>
              </div>
            </div>
          </label>
        ))}
      </fieldset>
    </section>
  );
}
