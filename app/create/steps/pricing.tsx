"use client";

import { ArrowUpRight, Check, LoaderCircle, Sparkles } from "lucide-react";
import { plans } from "@/data/pricing";
import { useEffect, useState } from "react";
import { type CreateFormData } from "@/stores/steps-store";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Pricing({ formData }: { formData: CreateFormData }) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData.title) {
      localStorage.setItem("FormData", JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;

    const fetchPlan = async () => {
      try {
        if (!user) return;
        const { data, error } = await supabase
          .from("users")
          .select("plan_type")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        if (!cancelled && data?.plan_type === "premium") {
          router.push("/generate-logo");
        }
      } catch (error) {
        console.error("Error fetching user's plan type", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPlan();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, user, router]);

  if (!isLoaded || loading) {
    return (
      <div
        role="status"
        className="flex min-h-72 flex-col items-center justify-center gap-4 text-center"
      >
        <LoaderCircle
          size={32}
          className="animate-spin text-[#087f69] motion-reduce:animate-none"
          aria-hidden="true"
        />
        <h2 className="text-2xl font-semibold tracking-tight">
          One last little detail.
        </h2>
        <p className="text-[15px] text-[#63705f]">
          Checking your plan before we bring your idea to life.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="plan-title">
      <p className="mb-3 text-xs font-semibold tracking-[0.13em] text-[#087f69]">
        04 / READY FOR YOUR DEBUT
      </p>
      <h2 id="plan-title" className="text-3xl font-semibold tracking-tight">
        Let’s make your mark.
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#63705f]">
        Your creative brief is ready. Choose how you’d like to bring it to life.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const premium = plan.name === "Premium";
          const destination = !isSignedIn
            ? "/sign-up"
            : premium
              ? "/pricing"
              : "/generate-logo";

          return (
            <article
              key={plan.name}
              className={`flex flex-col rounded-xl border p-5 ${premium ? "border-[#163f36] bg-[#163f36] text-[#f5f5e9]" : "border-[#dce2d4] bg-white"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.recommended && (
                  <Sparkles
                    size={20}
                    className="text-[#dceab7]"
                    aria-label="Recommended"
                  />
                )}
              </div>
              <p className="mt-5 text-4xl font-semibold tracking-tight">
                {premium ? `₹${plan.price.split("₹")[0]}` : plan.price}
              </p>
              <p
                className={`mt-1 text-sm ${premium ? "text-[#bdcfc0]" : "text-[#63705f]"}`}
              >
                {premium
                  ? plan.price.split("/")[1].toLowerCase()
                  : "A first spark of inspiration"}
              </p>
              <ul
                className={`my-6 flex flex-1 flex-col gap-3 border-t pt-5 ${premium ? "border-[#416156]" : "border-[#e0e5d7]"}`}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${premium ? "text-[#dceab7]" : "text-[#087f69]"}`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={destination}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 ${premium ? "bg-[#dfecb7] text-[#203b2d] hover:bg-[#eef5d7] focus-visible:outline-[#dfecb7]" : "bg-[#087f69] text-white hover:bg-[#05614f] focus-visible:outline-[#087f69]"}`}
              >
                {premium ? "Get premium credits" : "Generate my logo"}
                <ArrowUpRight size={17} />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
