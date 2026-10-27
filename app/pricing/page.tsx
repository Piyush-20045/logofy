"use client";

import { ArrowUpRight, Check, Diamond, Sparkles } from "lucide-react";
import { plans } from "@/data/pricing";
import { useUser } from "@clerk/nextjs";
import { useStore } from "@/stores/steps-store";
import Link from "next/link";

export default function Pricing() {
  const { isSignedIn, isLoaded } = useUser();
  const clearStep = useStore((state) => state.clearStep);

  return (
    <main className="bg-[#f7f7f0] px-6 pb-12 pt-14.5 text-[#202e29] max-sm:px-5 max-sm:py-9.5">
      <div className="mx-auto mb-9.5 max-w-175 text-center max-sm:mb-7">
        <p className="mb-4 text-xs font-semibold tracking-[0.13em] text-[#61735c] max-sm:text-[10px] max-sm:leading-[1.7]">
          A LITTLE INVESTMENT. A BIG IMPRESSION.
        </p>
        <h1 className="text-[clamp(38px,4vw,58px)] font-[550] leading-[1.08] tracking-[-0.055em]">
          Make room for
          <br />
          <em className="font-[Georgia,serif] font-normal text-[#087f69]">
            your next big idea.
          </em>
        </h1>
        <p className="mt-4.5 text-base leading-[1.7] text-[#63705f]">
          Start exploring for free, or give your creativity more possibilities.
        </p>
      </div>

      <div className="mx-auto grid max-w-237.5 gap-6 sm:grid-cols-2 max-sm:max-w-107.5">
        {plans.map((plan) => {
          const premium = plan.name === "Premium";
          const destination = !isSignedIn
            ? "/sign-up"
            : premium
              ? "/payment"
              : "/create";

          return (
            <article
              key={plan.name}
              className={`flex flex-col rounded-xl border p-8 max-md:p-6 max-sm:p-7 ${premium ? "border-[#163f36] bg-[#163f36] text-[#f5f5e9]" : "border-[#dfe3d7] bg-[#fffef9]"}`}
            >
              <div className="mb-5.5 flex items-center justify-between gap-3">
                <span
                  className={`grid size-11.5 place-items-center rounded-full ${premium ? "bg-[#2e5245] text-[#dceab7]" : "bg-[#eef1e3] text-[#466443]"}`}
                >
                  {premium ? <Sparkles size={24} /> : <Diamond size={24} />}
                </span>
                {plan.recommended && (
                  <span className="rounded-full bg-[#2e5245] px-3 py-2 text-[11px] text-[#dceab7] max-md:max-w-36.25 max-md:text-center">
                    A little more possibility
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                {plan.name}
              </h2>
              <p
                className={`mt-1.5 text-sm leading-[1.6] ${premium ? "text-[#bdcfc0]" : "text-[#64715f]"}`}
              >
                {premium
                  ? "For ideas you’re ready to take further."
                  : "For that first spark of inspiration."}
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-2 text-5xl font-semibold tracking-[-0.05em] max-sm:text-[44px]">
                {premium ? `₹${plan.price.split("₹")[0]}` : plan.price}
                <span
                  className={`text-sm font-normal tracking-normal ${premium ? "text-[#bdcfc0]" : "text-[#64715f]"}`}
                >
                  {premium
                    ? ` / ${plan.price.split("/")[1].toLowerCase()}`
                    : " / to get started"}
                </span>
              </div>
              <div
                className={`my-6 h-px ${premium ? "bg-[#416156]" : "bg-[#dfe3d7]"}`}
              />
              <p
                className={`text-[11px] font-semibold tracking-[0.13em] ${premium ? "text-[#c7d6b8]" : ""}`}
              >
                YOUR CREATIVE TOOLKIT
              </p>
              <ul className="mb-7.5 mt-4.5 flex flex-1 list-none flex-col gap-3.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-[15px] leading-normal"
                  >
                    <Check
                      size={17}
                      aria-hidden="true"
                      className={`shrink-0 ${premium ? "text-[#dceab7]" : "text-[#087f69]"}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {isLoaded ? (
                <Link
                  href={destination}
                  onClick={() => {
                    if (!premium) clearStep();
                  }}
                  className={`inline-flex min-h-12 items-center justify-center gap-4 rounded-md px-5 py-3.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none ${premium ? "bg-[#dfecb7] text-[#203b2d] hover:bg-[#eef5d7] focus-visible:outline-[#dfecb7]" : "border border-[#cdd6c6] text-[#294b37] hover:bg-[#edf1e5] focus-visible:outline-[#087f69]"}`}
                >
                  {premium ? "Get premium credits" : "Start creating for free"}
                  <ArrowUpRight size={19} />
                </Link>
              ) : (
                <button
                  disabled
                  className={`min-h-12 cursor-wait rounded-md border border-[#cdd6c6] px-5 py-3.5 text-[15px] font-semibold opacity-60 ${premium ? "text-[#e6efda]" : "text-[#294b37]"}`}
                >
                  Loading account…
                </button>
              )}
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-6.5 flex max-w-237.5 flex-col items-center justify-between gap-5 text-[13px] leading-[1.6] text-[#63705f] md:flex-row max-[420px]:items-start">
        <span className="flex items-center gap-2">
          <Diamond size={17} /> More credits. More room to explore.
        </span>
        <Link
          href="/contact"
          className="flex items-center gap-2 hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
        >
          Need a hand choosing? Let’s talk <ArrowUpRight size={16} />
        </Link>
      </div>
    </main>
  );
}
