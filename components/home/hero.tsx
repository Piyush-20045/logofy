"use client";

import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/steps-store";

export default function Hero() {
  const router = useRouter();
  const title = useStore((state) => state.formData.title) ?? "";
  const setFormData = useStore((state) => state.setFormData);

  return (
    <section
      className="overflow-hidden bg-[#f7f7f0] px-6 pt-10.5 text-[#202e29] md:pt-16 min-[1600px]:pt-21.5 max-[380px]:px-4.5"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-340">
        <div className="grid items-center gap-11 pb-9 md:grid-cols-[1fr_1.05fr] md:gap-9 md:pb-15.5 lg:gap-[clamp(36px,5vw,84px)] min-[1600px]:pb-21.5">
          <div className="max-md:mx-auto max-md:w-full max-md:max-w-130">
            <div className="mb-7 flex items-center gap-2.5 text-[13px] font-bold tracking-[0.17em]">
              <span className="size-1.75 rounded-full bg-[#087f69] shadow-[0_0_0_4px_#087f6910]" />
              A LITTLE IDEA. A BIG IDENTITY.
            </div>
            <h1
              id="hero-title"
              className="relative w-fit text-[clamp(58px,10vw,76px)] font-[650] leading-[1.04] tracking-[-0.065em] md:text-[62px] lg:text-[clamp(56px,5.5vw,84px)]"
            >
              Your next
              <br />
              big thing.
              <br />
              <span className="font-[Georgia,serif] font-normal italic tracking-[-0.06em] text-[#087f69]">
                Starts here.
              </span>
              <Sparkles
                className="absolute -right-7.5 top-1.5 h-9.75 w-6.75 rotate-10 text-[#087f69] lg:-right-12.5 lg:w-9.75"
                strokeWidth={1.3}
                aria-hidden="true"
              />
            </h1>
            <p className="mb-7.5 mt-6 max-w-115 text-lg leading-[1.8] text-[#68716a] max-md:max-w-100">
              Make a mark that’s unmistakably you. Turn your idea into a
              standout logo with a little help from AI.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(
                  `/create?title=${encodeURIComponent(title.trim())}`,
                );
              }}
            >
              <label
                htmlFor="brand-name"
                className="mb-2.5 block text-[15px] font-semibold"
              >
                What’s your brand called?
              </label>
              <div className="flex rounded-lg border border-[#d9ded5] bg-white p-1.25 shadow-[0_5px_12px_#233d2710] focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-[#087f69] max-[480px]:flex-col">
                <input
                  id="brand-name"
                  name="title"
                  placeholder="Your next big idea"
                  value={title}
                  onChange={(event) => setFormData("title", event.target.value)}
                  autoComplete="organization"
                  required
                  maxLength={80}
                  className="min-w-0 flex-1 bg-transparent p-3 text-base outline-none placeholder:text-[#959b93] max-[480px]:py-3.5"
                />
                <button
                  type="submit"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#087f69] px-3 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] motion-reduce:transition-none lg:gap-4 lg:px-4.5"
                >
                  Create my logo <ArrowUpRight size={19} aria-hidden="true" />
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap gap-5 text-[13px] text-[#707a70] max-[380px]:gap-2.5">
              <span className="flex items-center gap-1">
                <Check size={14} className="text-[#087f69]" /> Made in minutes
              </span>
              <span className="flex items-center gap-1">
                <Check size={14} className="text-[#087f69]" /> No design skills
                needed
              </span>
            </div>
          </div>

          <div className="-rotate-2 max-md:mx-auto max-md:w-[calc(100%-8px)] max-md:max-w-130">
            <div className="mx-1 mb-4 flex items-center justify-between text-xs font-semibold tracking-[0.12em] text-[#70796e] max-[480px]:text-[11px] max-[480px]:tracking-[0.06em]">
              <span>SMALL SPARK. ENDLESS POSSIBILITIES.</span>
              <MoveUpRight size={19} />
            </div>
            <div
              className="grid grid-cols-2 gap-3"
              aria-label="Illustrative brand identity concepts"
            >
              <div className="relative flex aspect-[1.06] min-h-52.5 flex-col justify-between gap-3 overflow-hidden rounded-md bg-[#e4e9d5] p-4 text-[#354c2d] transition duration-300 hover:-translate-y-1 hover:rotate-2 hover:shadow-lg motion-reduce:transition-none md:p-3 lg:p-4.5 max-[480px]:aspect-auto max-[480px]:min-h-57.5 max-[380px]:p-2.5">
                <span className="text-[11px] tracking-wide opacity-85 max-[380px]:text-[10px]">
                  01 / ORGANIC
                </span>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="grid -rotate-8 grid-cols-2 gap-0.75"
                    aria-hidden="true"
                  >
                    <i className="size-5.75 rounded-[2px_20px] bg-[#4c643b]" />
                    <i className="size-5.75 rotate-90 rounded-[2px_20px] bg-[#4c643b]" />
                    <i className="size-5.75 rotate-90 rounded-[2px_20px] bg-[#4c643b]" />
                    <i className="size-5.75 rounded-[2px_20px] bg-[#4c643b]" />
                  </div>
                  <strong className="mt-2.5 font-[Georgia,serif] text-[27px] font-normal tracking-[-0.06em] md:text-[clamp(20px,2.2vw,31px)] max-[380px]:text-[21px]">
                    olive<span className="italic">&</span>earth
                  </strong>
                  <small className="mt-1.5 text-[10px] tracking-[0.2em]">
                    GROW SOMETHING GOOD
                  </small>
                </div>
                <span className="flex items-center justify-between gap-2 text-[10px] leading-[1.4] tracking-wide opacity-85 max-[380px]:text-[9px]">
                  ROOTED IN NATURE <ArrowUpRight size={14} />
                </span>
              </div>

              <div className="relative flex aspect-[1.06] min-h-52.5 flex-col justify-between gap-3 overflow-hidden rounded-md bg-[#b9a4ec] p-4 text-[#2c2147] transition duration-300 hover:-translate-y-1 hover:rotate-2 hover:shadow-lg motion-reduce:transition-none md:p-3 lg:p-4.5 max-[480px]:aspect-auto max-[480px]:min-h-57.5 max-[380px]:p-2.5">
                <span className="text-[11px] tracking-wide opacity-85 max-[380px]:text-[10px]">
                  02 / BOLD
                </span>
                <div className="flex flex-col items-center text-center">
                  <div
                    className="relative mb-2 h-14.25 w-18 -rotate-25"
                    aria-hidden="true"
                  >
                    <i className="absolute inset-x-0 inset-y-1 rounded-full border-2 border-current" />
                    <i className="absolute -inset-x-1.5 inset-y-3.5 rounded-full border-2 border-current" />
                    <i className="absolute inset-x-3.5 -inset-y-0.75 rounded-full border-2 border-current" />
                  </div>
                  <strong className="text-[42px] font-extrabold leading-[1.1] tracking-[-0.09em]">
                    orbit
                    <span className="inline-block pl-1 pt-2 align-top text-[15px]">
                      ®
                    </span>
                  </strong>
                </div>
                <span className="flex items-center justify-between gap-2 text-[10px] leading-[1.4] tracking-wide opacity-85 max-[380px]:text-[9px]">
                  BEYOND THE ORDINARY <ArrowUpRight size={14} />
                </span>
              </div>

              <div className="relative flex aspect-[1.06] min-h-52.5 flex-col justify-between gap-3 overflow-hidden rounded-md bg-[#f1b394] p-4 text-[#622f26] transition duration-300 hover:-translate-y-1 hover:rotate-2 hover:shadow-lg motion-reduce:transition-none md:p-3 lg:p-4.5 max-[480px]:aspect-auto max-[480px]:min-h-57.5 max-[380px]:p-2.5">
                <span className="text-[11px] tracking-wide opacity-85 max-[380px]:text-[10px]">
                  03 / TIMELESS
                </span>
                <div className="flex flex-col items-center text-center">
                  <strong className="font-[Georgia,serif] text-[59px] font-normal leading-none tracking-[-0.085em] md:text-[clamp(45px,5vw,70px)]">
                    muse
                    <span className="-mt-3 ml-1 inline-block align-top font-sans text-[34px]">
                      ✳
                    </span>
                  </strong>
                  <small className="mt-3 text-[10px] tracking-[0.2em]">
                    OBJECTS WITH A SOUL
                  </small>
                </div>
                <span className="flex items-center justify-between gap-2 text-[10px] leading-[1.4] tracking-wide opacity-85 max-[380px]:text-[9px]">
                  LESS, BUT BETTER <ArrowUpRight size={14} />
                </span>
              </div>

              <div className="relative flex aspect-[1.06] min-h-52.5 flex-col justify-between gap-3 overflow-hidden rounded-md bg-[#163f36] p-4 text-[#e2efbb] transition duration-300 hover:-translate-y-1 hover:rotate-2 hover:shadow-lg motion-reduce:transition-none md:p-3 lg:p-4.5 max-[480px]:aspect-auto max-[480px]:min-h-57.5 max-[380px]:p-2.5">
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(#d7e8c109_1px,transparent_1px),linear-gradient(90deg,#d7e8c109_1px,transparent_1px)] bg-size-[24px_24px]"
                  aria-hidden="true"
                />
                <span className="text-[11px] tracking-wide opacity-85 max-[380px]:text-[10px]">
                  04 / YOUR NEXT CHAPTER
                </span>
                <div className="relative flex min-w-0 flex-col items-center text-center">
                  <Sparkles size={35} strokeWidth={1.3} aria-hidden="true" />
                  <strong className="mt-2.5 line-clamp-2 max-w-full text-[29px] font-medium leading-[1.1] tracking-[-0.06em] wrap-anywhere md:text-[clamp(21px,2.4vw,34px)] max-[380px]:text-2xl">
                    {title.trim() || "your brand"}
                    <span className="text-[#a8d882]">.</span>
                  </strong>
                  <small className="mt-2.5 text-[9px] tracking-[0.2em] opacity-85">
                    A LITTLE PREVIEW OF WHAT’S NEXT
                  </small>
                </div>
                <span className="flex items-center justify-between gap-2 text-[10px] leading-[1.4] tracking-wide opacity-85 max-[380px]:text-[9px]">
                  MAKE IT YOURS <ArrowUpRight size={14} />
                </span>
              </div>
            </div>

            <div className="mx-1 mt-4 flex flex-wrap items-center gap-2.5 text-[11px] text-[#7a8075]">
              <span className="flex shrink-0 -space-x-0.5">
                <i className="size-2.75 rounded-full border border-[#f7f7f0] bg-[#d6dfc2]" />
                <i className="size-2.75 rounded-full border border-[#f7f7f0] bg-[#b9a4ec]" />
                <i className="size-2.75 rounded-full border border-[#f7f7f0] bg-[#f1b394]" />
                <i className="size-2.75 rounded-full border border-[#f7f7f0] bg-[#163f36]" />
              </span>
              <span>Different personalities. Same possibilities.</span>
              <span className="ml-auto hidden text-[10px] tracking-wide lg:inline">
                CONCEPTS / 001—004
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 border-t border-[#dce0d6] py-6 text-[13px] text-[#747c70] md:justify-between">
          <a
            href="#how-it-works"
            className="flex items-center gap-4.5 text-xs font-semibold tracking-[0.08em] text-[#344b3f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] max-[480px]:gap-2.5 max-[480px]:text-[11px]"
          >
            BIG IDEAS DESERVE GREAT DESIGN <ArrowDown size={16} />
          </a>
          <span className="hidden md:inline">
            Your vision. Your style. Your logo.
          </span>
          <span className="hidden items-center gap-3.5 font-[Georgia,serif] text-[15px] italic md:flex">
            Made of possibilities. <Sparkles size={16} />
          </span>
        </div>
      </div>
    </section>
  );
}
