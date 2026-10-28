import { ArrowUpRight, Mail, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import ContactForm from "./_components/contact-form";

export default function Contact() {
  return (
    <main className="min-h-[75vh] bg-[#f7f7f0] px-5 py-10 text-[#202e29] md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-9">
          <p className="mb-4 text-xs font-semibold tracking-[0.15em] text-[#61735c]">
            GOOD THINGS START WITH A CONVERSATION
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            A question? An idea?
            <br />
            <em className="font-[Georgia,serif] font-normal text-[#087f69]">
              We’re all ears.
            </em>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#63705f]">
            Need a hand with your logo or have something to share? Drop us a
            note.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <aside className="overflow-hidden rounded-2xl bg-[#163f36] p-7 text-[#f4f6e7] lg:p-9">
            <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-[#2e5245] text-[#dceab7]">
              <MessageCircle size={23} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-medium tracking-tight">
              A little help.
              <br />A fresh perspective.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#bdcfc0]">
              Questions about credits, a logo that needs another look, or
              feedback on Logofy—we’d love to hear it.
            </p>
            <div className="my-7 border-y border-[#416156] py-6">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#c7d6b8]">
                <Mail size={16} /> PREFER EMAIL?
              </p>
              <a
                href="mailto:py624833@gmail.com"
                className="inline-flex max-w-full items-center gap-2 rounded text-[15px] text-[#e1edb9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1edb9]"
              >
                <span className="break-all">py624833@gmail.com</span>
                <ArrowUpRight size={17} className="shrink-0" />
              </a>
            </div>
            <Link
              href="/pricing"
              className="flex items-center justify-between gap-3 rounded text-sm text-[#bdcfc0] hover:text-[#e1edb9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e1edb9]"
            >
              Looking for plans and credits?{" "}
              <ArrowUpRight size={17} className="shrink-0" />
            </Link>
            <div className="mt-10 hidden items-center justify-between gap-3 md:flex">
              <p className="font-[Georgia,serif] text-xl italic text-[#dceab7]">
                Here for your next big thing.
              </p>
              <Sparkles
                size={29}
                strokeWidth={1.2}
                className="shrink-0 text-[#dceab7]"
              />
            </div>
          </aside>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
