import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Cta() {
  return (
    <section
      className="mx-auto max-w-352 px-6 pb-15 md:pb-22.5 max-[380px]:px-4.5"
      aria-labelledby="cta-title"
    >
      <div className="relative grid items-center gap-8 overflow-hidden rounded-lg bg-[#163f36] px-7 py-9 text-[#f4f6e7] md:grid-cols-[1.2fr_1fr] md:gap-6 md:px-9 md:py-12.5 lg:gap-10 lg:px-17.5 lg:py-16 max-[380px]:px-5.5">
        <div className="relative z-10">
          <p className="mb-5 text-xs font-semibold leading-relaxed tracking-[0.16em] text-[#becdb0]">
            THAT IDEA YOU CAN’T STOP THINKING ABOUT?
          </p>
          <h2
            id="cta-title"
            className="text-[clamp(36px,3.7vw,55px)] font-[550] leading-[1.13] tracking-[-0.055em]"
          >
            Give it a name.
            <br />
            <em className="font-[Georgia,serif] font-normal text-[#d8e7ac]">
              We’ll give it a look.
            </em>
          </h2>
          <p className="my-6 text-[15px] leading-[1.9] text-[#b3c6b9]">
            Your next chapter deserves a great first impression.
            <br />
            Let’s make something that’s yours.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-6 rounded bg-[#e1edb9] px-5 py-4 text-[15px] font-semibold text-[#203b2d] transition-colors hover:bg-[#f1f8da] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1edb9] motion-reduce:transition-none"
          >
            Let’s make your logo <ArrowUpRight size={19} />
          </Link>
          <span className="mt-3.5 block text-xs text-[#b3c6b9]">
            A little imagination. A few minutes. A fresh start.
          </span>
        </div>

        <div
          className="relative flex min-h-75 items-center justify-center md:min-h-77.5"
          aria-hidden="true"
        >
          <span className="absolute size-95 rounded-full border border-[#b4ceae20]" />
          <span className="absolute size-115 rounded-full border border-[#b4ceae20]" />
          <div className="relative w-61.25 rotate-9 bg-[#e7ecd8] p-6 text-[#2b4937] shadow-[0_20px_35px_#061b3020]">
            <span className="text-[10px] leading-normal tracking-widest">
              YOUR NEXT BIG THING
            </span>
            <Sparkles size={64} strokeWidth={1} className="mx-auto mb-4 mt-7" />
            <strong className="mb-7.5 block font-[Georgia,serif] text-[39px] font-normal leading-[0.98] tracking-[-0.05em]">
              hello,
              <br />
              <em>possibility.</em>
            </strong>
            <span className="flex items-center justify-between gap-2 text-[10px] leading-normal tracking-widest">
              EST. WHENEVER YOU’RE READY <ArrowUpRight size={16} />
            </span>
          </div>
          <div className="absolute bottom-4 right-[max(0px,calc(50%-160px))] flex size-23.75 -rotate-12 flex-col items-center justify-center rounded-full border-5 border-double border-[#163f3630] bg-[#b9a4ec] font-[Georgia,serif] text-[27px] text-[#33294a] md:-right-4.5 lg:-right-2">
            100%
            <span className="mt-1 text-center font-[Arial,sans-serif] text-[9px] leading-[1.2] tracking-wide">
              YOUR NEXT CHAPTER
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
