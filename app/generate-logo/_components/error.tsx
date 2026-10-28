"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, WandSparkles } from "lucide-react";
import { useStore } from "@/stores/steps-store";

export default function Error() {
  const clearSteps = useStore((state) => state.clearStep);

  return (
    <section
      className="w-full max-w-xl rounded-2xl border border-[#dce2d4] bg-[#fffef9] p-7 text-center sm:p-10"
      aria-labelledby="error-title"
      role="alert"
    >
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#f5e3d6] text-[#95654b]">
        <WandSparkles size={29} strokeWidth={1.5} />
      </div>
      <p className="mb-3 text-xs font-semibold tracking-[0.13em] text-[#63705f]">
        A SMALL BUMP IN THE CREATIVE PROCESS
      </p>
      <h1 id="error-title" className="text-3xl font-semibold tracking-tight">
        Let’s give that another go.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[#63705f]">
        We couldn’t generate your logo this time. Your brief is still here—head
        back to review it and try again.
      </p>
      <Link
        href="/create"
        onClick={clearSteps}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-[#087f69] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
      >
        <ArrowLeft size={17} /> Back to your brief
      </Link>
      <Link
        href="/dashboard"
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-[#cdd6c6] px-5 py-3 text-[15px] font-medium text-[#294b37] hover:bg-[#edf1e5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
      >
        Go to dashboard <ArrowUpRight size={17} />
      </Link>
      <p className="mt-6 text-sm text-[#6c7863]">
        Still having trouble?{" "}
        <Link
          href="/contact"
          className="rounded text-[#087f69] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Get in touch
        </Link>
      </p>
    </section>
  );
}
