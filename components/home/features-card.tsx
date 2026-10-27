import { Check, Download, Sparkles } from "lucide-react";

export default function FeaturesCard() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-352 scroll-mt-6 px-6 pb-24 pt-24 text-[#202e29] max-md:pb-11 max-md:pt-10.5 max-[380px]:px-4.5"
      aria-labelledby="features-title"
    >
      <div className="mb-7 max-md:mb-8">
        <p className="mb-5 text-[13px] font-semibold tracking-[0.16em]">
          THREE STEPS. ONE GREAT FIRST IMPRESSION.
        </p>
        <h2
          id="features-title"
          className="text-[clamp(36px,3.6vw,53px)] font-[550] leading-[1.13] tracking-[-0.055em]"
        >
          Your idea.{" "}
          <em className="font-[Georgia,serif] font-normal text-[#087f69]">
            Made real.
          </em>
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-3 md:gap-5 lg:gap-7.5">
        <article>
          <div
            className="relative mb-7 flex h-65 items-center justify-center overflow-hidden rounded-lg bg-[#f0f1e8] lg:h-62.5"
            aria-hidden="true"
          >
            <div className="w-51.25 shrink-0 translate-y-2 -rotate-6 border border-[#e1e4d8] bg-[#fffef8] p-5.5 shadow-[0_8px_25px_#334c3010]">
              <span className="text-[10px] tracking-[0.13em]">
                THE NEXT BIG THING
              </span>
              <strong className="mb-5 mt-3 block font-[Georgia,serif] text-2xl font-normal leading-[1.1]">
                It starts with
                <br />a little idea<span className="text-[#087f69]">.</span>
              </strong>
              <div>
                <span className="mb-1.5 block text-[11px]">Brand name</span>
                <b className="block rounded-sm border border-[#cbd4c4] p-2.5 text-[13px] font-medium">
                  Olive & Earth <span className="text-[#087f69]">▏</span>
                </b>
              </div>
            </div>
            <div className="absolute right-9.5 top-6 rotate-15 rounded-full bg-[#d9e7a9] p-4 text-[#526736]">
              <Sparkles size={23} strokeWidth={1.4} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#819077]">01</span>
            <h3 className="text-xl font-[550] tracking-[-0.035em]">
              Tell your story.
            </h3>
          </div>
          <p className="mt-3 text-[15px] leading-[1.9] text-[#5f6d5b] md:max-w-83.75">
            Give us a name and a little about your brand.
          </p>
        </article>

        <article>
          <div
            className="relative mb-7 flex h-65 items-center justify-center overflow-hidden rounded-lg bg-[#ede8f5] lg:h-62.5"
            aria-hidden="true"
          >
            <div className="flex h-38.75 w-41.25 -translate-x-5 -translate-y-2 -rotate-9 flex-col items-center justify-center rounded border border-[#ded7e6] bg-[#fffaf4] font-[Georgia,serif] text-[75px] leading-none text-[#5c447b] shadow-[0_8px_18px_#4c336110]">
              Aa
              <span className="mt-3 text-center font-[Arial,sans-serif] text-[9px] leading-[1.4] tracking-[0.13em]">
                YOUR KIND OF CHARACTER
              </span>
            </div>
            <div className="absolute flex translate-x-9 translate-y-14.5 rotate-9 gap-1.5 rounded-md border border-[#ddd5e5] bg-[#fffaf4] p-2">
              <i className="h-9.5 w-7 rounded-sm bg-[#163f36]" />
              <i className="h-9.5 w-7 rounded-sm bg-[#b9a4ec]" />
              <i className="h-9.5 w-7 rounded-sm bg-[#e3e8cd]" />
              <i className="h-9.5 w-7 rounded-sm bg-[#f1b394]" />
              <span className="absolute left-4 top-5 text-white">
                <Check size={13} />
              </span>
            </div>
            <span className="absolute right-4 top-6 flex items-center gap-1 rounded-full bg-[#ded4ee] px-2.5 py-2 text-xs text-[#60487c]">
              <Sparkles size={12} /> A style that feels like you
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#819077]">02</span>
            <h3 className="text-xl font-[550] tracking-[-0.035em]">
              Find your personality.
            </h3>
          </div>
          <p className="mt-3 text-[15px] leading-[1.9] text-[#5f6d5b] md:max-w-83.75">
            Pick the colors and style that feel like you.
          </p>
        </article>

        <article>
          <div
            className="relative mb-7 flex h-65 items-center justify-center overflow-hidden rounded-lg bg-[#f7e6da] lg:h-62.5"
            aria-hidden="true"
          >
            <div className="flex h-42 w-45 -translate-y-2 rotate-6 flex-col items-center justify-center bg-[#e3e8ce] text-[#3b512e] shadow-[0_9px_24px_#53392310]">
              <div className="text-[57px] leading-none">✳</div>
              <strong className="mt-1 font-[Georgia,serif] text-2xl font-normal tracking-[-0.065em]">
                olive&earth
              </strong>
              <span className="mt-1 text-[9px] tracking-[0.15em]">
                GROW SOMETHING GOOD
              </span>
            </div>
            <div className="absolute bottom-6 flex w-54.5 items-center justify-between rounded bg-[#fffdf8] px-4 py-3.5 text-[#366146] shadow-[0_4px_15px_#5339230a]">
              <span className="flex items-center gap-2 text-[13px]">
                <Check size={12} /> Ready for the world
              </span>
              <Download size={16} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#819077]">03</span>
            <h3 className="text-xl font-[550] tracking-[-0.035em]">
              Make your entrance.
            </h3>
          </div>
          <p className="mt-3 text-[15px] leading-[1.9] text-[#5f6d5b] md:max-w-83.75">
            Generate, download, and make your mark.
          </p>
        </article>
      </div>
    </section>
  );
}
