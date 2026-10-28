"use client";

import PROMPT from "@/data/Prompt";
import { useStore, type CreateFormData } from "@/stores/steps-store";
import { useCreditStore } from "@/stores/credit-store";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import Success from "./_components/success";
import GenerationError from "./_components/error";

export default function GenerateAILogo() {
  const router = useRouter();
  const formData = useStore((state) => state.formData);
  const clearFormData = useStore((state) => state.clearFormData);
  const clearSteps = useStore((state) => state.clearStep);
  const { credits, fetchCredits } = useCreditStore();
  const { user, isLoaded } = useUser();
  const [logoImage, setLogoImage] = useState("");
  const [generatedBrief, setGeneratedBrief] = useState<CreateFormData>({});
  const [isLoading, setLoading] = useState(true);
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!isLoaded || calledOnce.current) return;
    if (!user) {
      router.replace("/sign-in");
      return;
    }
    if (!formData.title || !formData.desc) {
      router.replace("/create");
      return;
    }
    if (credits === 0) {
      toast.error("You have 0 credits remaining!");
      router.replace("/pricing");
      return;
    }

    // Keep the brief for the result screen after the creation form is cleared.
    calledOnce.current = true;
    setGeneratedBrief(formData);

    const generateLogo = async () => {
      try {
        const response = await axios.post("/api/ai-logo-model", {
          prompt: constructPrompt(formData),
          user_id: user.id,
          title: formData.title,
          desc: formData.desc,
        });
        if (!response.data.image) throw new Error("No logo image returned");
        setLogoImage(response.data.image);
        await fetchCredits(user.id);
        clearFormData();
        clearSteps();
      } catch (error) {
        console.error("Error generating logo:", error);
      } finally {
        setLoading(false);
      }
    };

    generateLogo();
  }, [
    formData,
    isLoaded,
    user,
    credits,
    fetchCredits,
    clearFormData,
    clearSteps,
    router,
  ]);

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f7f7f0] px-5 py-12 text-[#202e29] md:px-8 md:py-16">
      {isLoading ? (
        <section
          className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#dce2d4] bg-[#fffef9]"
          aria-labelledby="generation-title"
          aria-busy="true"
        >
          <div
            className="relative flex h-48 items-center justify-center overflow-hidden bg-[#163f36] sm:h-56"
            aria-hidden="true"
          >
            <div className="absolute size-64 rounded-full border border-[#b4ceae]/15" />
            <div className="absolute size-80 rounded-full border border-[#b4ceae]/10" />
            <div className="flex size-28 rotate-6 items-center justify-center rounded-xl border border-[#dceab7]/20 bg-[#254f41] text-[#dceab7]">
              <Sparkles size={52} strokeWidth={1.2} />
            </div>
          </div>
          <div
            className="px-6 py-9 text-center sm:p-10"
            role="status"
            aria-live="polite"
          >
            <p className="mb-4 text-xs font-semibold tracking-[0.15em] text-[#087f69]">
              A LITTLE IMAGINATION AT WORK
            </p>
            <h1
              id="generation-title"
              className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              Your idea is{" "}
              <em className="font-[Georgia,serif] font-normal text-[#087f69]">
                taking shape.
              </em>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#63705f]">
              We’re turning your creative brief into a logo. Keep this page open
              while we work on the details.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 text-sm font-medium text-[#087f69]">
              <LoaderCircle
                size={19}
                className="animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              Creating your logo…
            </div>
            {generatedBrief.title && (
              <p className="mt-6 wrap-break-word border-t border-[#e0e5d7] pt-5 text-sm text-[#63705f]">
                Made for{" "}
                <span className="font-semibold text-[#203b2d]">
                  {generatedBrief.title}
                </span>
              </p>
            )}
          </div>
        </section>
      ) : logoImage ? (
        <Success formData={generatedBrief} logoImage={logoImage} />
      ) : (
        <GenerationError />
      )}
    </main>
  );
}

function constructPrompt(formData: CreateFormData) {
  return PROMPT.LOGO_PROMPT.replace("{logoTitle}", formData.title ?? "")
    .replace("{logoDesc}", formData.desc ?? "")
    .replace("{logoColor}", formData.palette ?? "")
    .replace("{logoDesign}", formData.design?.title ?? "")
    .replace("{logoPrompt}", formData.design?.prompt ?? "");
}
