"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Diamond } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useCreditStore } from "@/stores/credit-store";

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { credits, fetchCredits } = useCreditStore();

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchCredits(user.id);
    }
  }, [user?.id, isLoaded, fetchCredits]);

  return (
    <header className="border-b border-[#e3e6dc] bg-[#f7f7f0] text-[#202e29]">
      <div className="mx-auto flex min-h-21 max-w-352 items-center justify-between gap-6 px-6 max-md:min-h-18.5 max-md:flex-wrap max-md:gap-3 max-md:py-3 max-[380px]:gap-1.5 max-[380px]:px-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[29px] font-bold tracking-[-0.075em] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#087f69] max-md:text-[25px] max-[380px]:gap-1"
          aria-label="Logofy home"
        >
          <Image
            width={52}
            height={52}
            src="/logo.png"
            alt=""
            className="size-13 shrink-0 object-contain max-md:size-11"
          />
          <span>
            logofy<span className="text-[#087f69]">.</span>
          </span>
        </Link>

        <nav
          className="ml-auto mr-7 hidden gap-8 text-[15px] text-[#657165] md:flex max-lg:mr-0"
          aria-label="Main navigation"
        >
          <Link
            href="/#how-it-works"
            className="hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-5 max-md:gap-3 max-[380px]:gap-1.5">
          {!isLoaded ? (
            <span className="h-10.5 w-33.75" aria-label="Loading account" />
          ) : isSignedIn ? (
            <>
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-[15px] text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 max-md:gap-1 max-md:text-[13px]"
                aria-label={
                  credits === null
                    ? "View credits and pricing"
                    : `${credits} credits. View pricing`
                }
              >
                <Diamond size={15} />
                <span>{credits ?? "—"}</span>
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-5 rounded-md border border-[#d5dbd0] px-4.5 py-3 text-[15px] font-semibold hover:bg-[#ebeee4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] max-md:gap-2 max-md:px-3 max-md:py-2.5 max-md:text-sm max-[380px]:px-2"
              >
                Dashboard{" "}
                <ArrowUpRight size={15} className="max-[380px]:hidden" />
              </Link>
              <UserButton />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-5 rounded-md bg-[#087f69] px-4.5 py-3 text-[15px] font-semibold text-white hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] max-md:gap-2 max-md:px-3 max-md:py-2.5 max-md:text-sm"
            >
              Get started <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
