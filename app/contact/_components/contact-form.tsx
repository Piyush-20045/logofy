"use client";

import { sendMessage } from "./actions";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSent(false);

    try {
      const response = await sendMessage(formData);
      if (response.error) {
        toast.error(response.error);
        return;
      }
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSent(true);
      toast.success(response.message ?? "Message sent successfully!");
    } catch {
      toast.error("Couldn’t send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="rounded-2xl border border-[#dce2d4] bg-[#fffef9] p-6 sm:p-8"
      aria-labelledby="contact-form-title"
    >
      <h2
        id="contact-form-title"
        className="text-2xl font-semibold tracking-tight"
      >
        Leave us a note.
      </h2>
      <p className="mb-7 mt-2 text-sm leading-relaxed text-[#63705f]">
        Tell us a little about what’s on your mind. All fields are required.
      </p>
      {sent && (
        <p
          role="status"
          className="mb-6 flex items-start gap-3 rounded-lg bg-[#eaf1e1] p-4 text-sm leading-relaxed text-[#366146]"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          Your message is on its way. Thanks for reaching out!
        </p>
      )}
      <form
        onSubmit={submitForm}
        className="space-y-5"
        aria-busy={isSubmitting}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="mb-2 block text-sm font-semibold"
            >
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              disabled={isSubmitting}
              required
              className="w-full rounded-lg border border-[#d2dacb] bg-white px-4 py-3 text-base placeholder:text-[#89917f] focus:border-[#087f69] focus:outline-2 focus:outline-offset-2 focus:outline-[#087f69] disabled:opacity-60"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-2 block text-sm font-semibold"
            >
              Email address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              disabled={isSubmitting}
              required
              className="w-full rounded-lg border border-[#d2dacb] bg-white px-4 py-3 text-base placeholder:text-[#89917f] focus:border-[#087f69] focus:outline-2 focus:outline-offset-2 focus:outline-[#087f69] disabled:opacity-60"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="contact-subject"
            className="mb-2 block text-sm font-semibold"
          >
            What’s it about?
          </label>
          <input
            id="contact-subject"
            name="subject"
            placeholder="A question, some feedback, a little help…"
            value={formData.subject}
            onChange={(event) =>
              setFormData({ ...formData, subject: event.target.value })
            }
            disabled={isSubmitting}
            required
            className="w-full rounded-lg border border-[#d2dacb] bg-white px-4 py-3 text-base placeholder:text-[#89917f] focus:border-[#087f69] focus:outline-2 focus:outline-offset-2 focus:outline-[#087f69] disabled:opacity-60"
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-semibold"
          >
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Tell us a little more…"
            value={formData.message}
            onChange={(event) =>
              setFormData({ ...formData, message: event.target.value })
            }
            disabled={isSubmitting}
            required
            className="min-h-36 w-full resize-y rounded-lg border border-[#d2dacb] bg-white px-4 py-3 text-base leading-relaxed placeholder:text-[#89917f] focus:border-[#087f69] focus:outline-2 focus:outline-offset-2 focus:outline-[#087f69] disabled:opacity-60"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e0e5d7] pt-5">
          <p className="text-sm text-[#6c7863]">We’ll reply to your email.</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-md bg-[#087f69] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send message"}
            {isSubmitting ? (
              <LoaderCircle
                size={18}
                className="animate-spin motion-reduce:animate-none"
              />
            ) : (
              <ArrowUpRight size={18} />
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
