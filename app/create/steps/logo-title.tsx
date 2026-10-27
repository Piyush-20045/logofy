"use client";

import { ArrowRight, Lightbulb } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/steps-store";

interface LogoTitleProps {
  onHandleInputChange: (field: string, value: string) => void;
}

export default function LogoTitle({ onHandleInputChange }: LogoTitleProps) {
  const searchParams = useSearchParams();
  const incStep = useStore((state) => state.incStep);
  const storedTitle = useStore((state) => state.formData.title);
  const description = useStore((state) => state.formData.desc) ?? "";
  const title = storedTitle ?? searchParams.get("title") ?? "";

  return (
    <section aria-labelledby="brand-title">
      <p className="mb-3 text-xs font-semibold tracking-[0.13em] text-[#087f69]">
        01 / THE START OF SOMETHING
      </p>
      <h2 id="brand-title" className="text-3xl font-semibold tracking-tight">
        Tell us your story.
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#63705f]">
        A name and a few words are all we need to get started.
      </p>

      <form
        className="mt-8 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim() || !description.trim()) return;
          onHandleInputChange("title", title.trim());
          onHandleInputChange("desc", description.trim());
          incStep(1);
        }}
      >
        <div>
          <label
            htmlFor="logo-name"
            className="mb-2 block text-sm font-semibold"
          >
            Brand name
          </label>
          <input
            id="logo-name"
            name="title"
            required
            autoComplete="organization"
            value={title}
            onChange={(event) =>
              onHandleInputChange("title", event.target.value)
            }
            placeholder="e.g. Olive & Earth"
            className="w-full rounded-lg border border-[#d2dacb] bg-white px-4 py-3.5 text-base text-[#203b2d] placeholder:text-[#89917f] focus:border-[#087f69] focus:outline-2 focus:outline-offset-2 focus:outline-[#087f69]"
          />
        </div>
        <div>
          <label
            htmlFor="logo-description"
            className="mb-2 block text-sm font-semibold"
          >
            What’s your brand about?
          </label>
          <textarea
            id="logo-description"
            name="description"
            required
            rows={4}
            value={description}
            onChange={(event) =>
              onHandleInputChange("desc", event.target.value)
            }
            aria-describedby="description-help"
            placeholder="e.g. A plant shop bringing a little greenery to everyday spaces. Natural, welcoming, and down to earth."
            className="min-h-32 w-full resize-y rounded-lg border border-[#d2dacb] bg-white px-4 py-3.5 text-base leading-relaxed text-[#203b2d] placeholder:text-[#89917f] focus:border-[#087f69] focus:outline-2 focus:outline-offset-2 focus:outline-[#087f69]"
          />
          <p id="description-help" className="mt-2 text-sm text-[#6c7863]">
            Tell us what you do and the feeling you want your logo to capture.
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-[#eef1e5] p-4 text-sm leading-relaxed text-[#607456]">
          <Lightbulb size={19} className="mt-0.5 shrink-0" />
          <p>
            A little detail goes a long way. Think about your audience,
            personality, or what makes your brand different.
          </p>
        </div>
        <div className="flex justify-end border-t border-[#e0e5d7] pt-6">
          <button
            type="submit"
            disabled={!title.trim() || !description.trim()}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-md bg-[#087f69] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Choose your colors <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </section>
  );
}
