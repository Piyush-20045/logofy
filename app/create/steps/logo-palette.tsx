"use client";

import { Check } from "lucide-react";
import colors from "@/data/colors";
import { useStore } from "@/stores/steps-store";

interface LogoPaletteProps {
  onHandleInputChange: (value: string) => void;
}

export default function LogoPalette({ onHandleInputChange }: LogoPaletteProps) {
  const selectedPalette = useStore((state) => state.formData.palette);

  return (
    <section aria-labelledby="palette-title">
      <p className="mb-3 text-xs font-semibold tracking-[0.13em] text-[#087f69]">
        02 / SET THE MOOD
      </p>
      <h2 id="palette-title" className="text-3xl font-semibold tracking-tight">
        Find your colors.
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#63705f]">
        Choose a palette that feels like you. Or let AI find the right mix.
      </p>
      <fieldset className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <legend className="sr-only">Choose a color palette</legend>
        {colors.map((palette) => (
          <label key={palette.name} className="relative min-w-0 cursor-pointer">
            <input
              type="radio"
              name="palette"
              value={palette.name}
              checked={selectedPalette === palette.name}
              onChange={() => onHandleInputChange(palette.name)}
              className="peer sr-only"
            />
            <div className="overflow-hidden rounded-lg border border-[#dce2d4] bg-white p-2 transition-colors hover:border-[#97b49c] peer-checked:border-[#087f69] peer-checked:ring-1 peer-checked:ring-[#087f69] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#087f69] motion-reduce:transition-none">
              <svg
                viewBox="0 0 100 64"
                preserveAspectRatio="none"
                className="h-24 w-full rounded sm:h-28"
                aria-hidden="true"
              >
                {palette.colors.map((color, index) => (
                  <rect
                    key={color}
                    x={index * 20}
                    width="20"
                    height="64"
                    fill={color}
                  />
                ))}
              </svg>
              <div className="flex min-h-14 items-center justify-between gap-2 px-1 py-3">
                <span className="text-sm font-medium">{palette.name}</span>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full ${selectedPalette === palette.name ? "bg-[#087f69] text-white" : "border border-[#ccd5c4]"}`}
                >
                  {selectedPalette === palette.name && (
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
