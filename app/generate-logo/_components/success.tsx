"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Download, Plus } from "lucide-react";
import { downloadLogo } from "@/lib/utils/logo-utils";
import { useStore, type CreateFormData } from "@/stores/steps-store";
import Link from "next/link";

interface SuccessProps {
  formData: CreateFormData;
  logoImage: string;
}

export default function Success({ formData, logoImage }: SuccessProps) {
  const [downloading, setDownloading] = useState(false);
  const clearSteps = useStore((state) => state.clearStep);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadLogo(logoImage, formData.title || "logo");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="w-full max-w-6xl" aria-labelledby="result-title">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.13em] text-[#087f69]">
            <Check size={17} /> YOUR LOGO IS READY
          </p>
          <h1
            id="result-title"
            className="text-3xl font-semibold tracking-tight md:text-4xl"
          >
            An idea,{" "}
            <em className="font-[Georgia,serif] font-normal text-[#087f69]">
              made real.
            </em>
          </h1>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded text-sm font-medium text-[#63705f] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
        >
          View all your logos <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-[#dce2d4] bg-[#fffef9] md:grid-cols-[1.2fr_1fr]">
        <div className="flex items-center justify-center border-b border-[#dce2d4] bg-[#eef1e5] p-5 sm:p-8 md:border-b-0 md:border-r">
          <div className="aspect-square w-full overflow-hidden rounded-lg border border-[#dce2d4] bg-white">
            <img
              src={logoImage}
              alt={
                formData.title
                  ? `${formData.title} logo`
                  : "Your generated logo"
              }
              className="size-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="mb-3 text-xs font-semibold tracking-[0.13em] text-[#63705f]">
            MEET YOUR NEW IDENTITY
          </p>
          <h2 className="break-words text-3xl font-semibold tracking-tight">
            {formData.title || "Your logo"}
          </h2>
          {formData.desc && (
            <p className="mt-4 break-words text-[15px] leading-relaxed text-[#63705f]">
              {formData.desc}
            </p>
          )}
          <dl className="my-7 grid grid-cols-2 gap-4 border-y border-[#e0e5d7] py-5 text-sm">
            <div>
              <dt className="mb-1 text-xs text-[#6c7863]">Color direction</dt>
              <dd className="font-medium">
                {formData.palette || "AI selected"}
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-xs text-[#6c7863]">Design style</dt>
              <dd className="font-medium">
                {formData.design?.title || "Your creative brief"}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-md bg-[#087f69] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] disabled:cursor-wait disabled:opacity-60"
          >
            <Download size={18} />
            {downloading ? "Downloading…" : "Download your logo"}
          </button>
          <Link
            href="/create"
            onClick={clearSteps}
            className="mt-3 inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-[#cdd6c6] px-5 py-3 text-[15px] font-medium text-[#294b37] hover:bg-[#edf1e5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
          >
            <Plus size={18} /> Create another logo
          </Link>
          <p className="mt-5 text-center text-sm leading-relaxed text-[#6c7863]">
            A fresh identity, ready for its next chapter.
          </p>
        </div>
      </div>
    </section>
  );
}
