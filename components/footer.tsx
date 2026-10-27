import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#e3e6dc] bg-[#f7f7f0] text-[#202e29]">
      <div className="mx-auto max-w-352 px-6 max-[380px]:px-4.5">
        <div className="grid grid-cols-2 gap-8 pb-11 pt-9 md:grid-cols-[2fr_1fr_1fr] md:gap-10 md:pt-14">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[29px] font-bold tracking-[-0.075em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] max-md:text-[25px]"
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
            <p className="mt-4 text-[15px] leading-[1.9] text-[#626e5d]">
              A small spark. A lasting impression.
              <br />
              Make something unmistakably yours.
            </p>
          </div>

          <nav
            className="flex flex-col items-start gap-3"
            aria-label="Product links"
          >
            <h2 className="mb-2 mt-3 text-xs font-semibold tracking-[0.14em]">
              MAKE YOUR MARK
            </h2>
            <Link
              href="/create"
              className="inline-flex items-center gap-4 text-[15px] text-[#5f6d5b] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
            >
              Create a logo <ArrowUpRight size={13} />
            </Link>
            <Link
              href="/#how-it-works"
              className="text-[15px] text-[#5f6d5b] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
            >
              How it works
            </Link>
            <Link
              href="/pricing"
              className="text-[15px] text-[#5f6d5b] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
            >
              Pricing
            </Link>
          </nav>

          <nav
            className="flex flex-col items-start gap-3"
            aria-label="Support and legal"
          >
            <h2 className="mb-2 mt-3 text-xs font-semibold tracking-[0.14em]">
              THE SMALL PRINT
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 text-[15px] text-[#5f6d5b] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
            >
              Let’s talk <ArrowUpRight size={13} />
            </Link>
            <Link
              href="/terms"
              className="text-[15px] text-[#5f6d5b] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[15px] text-[#5f6d5b] hover:text-[#087f69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69]"
            >
              Terms of use
            </Link>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#dfe4d7] py-5.5 text-[13px] text-[#65725e] md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Logofy. All rights reserved.</span>
          <span className="flex items-center gap-3.5">
            Built for ideas of every size.
            <span className="text-[21px] text-[#087f69]">✳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
