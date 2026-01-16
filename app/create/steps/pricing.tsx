"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Check } from "lucide-react";
import { plans } from "@/data/pricing";
import { useEffect, useState } from "react";
import { CreateFormData } from "@/stores/steps-store";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Pricing = ({ formData }: { formData: CreateFormData }) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [selectedPlan, setSelectedPlan] = useState("Premium");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (formData.title && typeof window !== "undefined") {
      localStorage.setItem("FormData", JSON.stringify(formData));
    }
  }, [formData]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data } = await supabase
          .from("users")
          .select("plan_type")
          .eq("id", user?.id)
          .single();

        if (data?.plan_type === "premium") {
          router.push("/generate-logo");
        }
      } catch (error) {
        console.log("Error in fetching user's plan type", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [user?.id]);

  // LOADING STATE
  if (loading)
    return (
      <div className="my-24 text-center">
        <div className="mb-2 animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid mx-auto"></div>
        <p>Wait, it's loading now...</p>
      </div>
    );

  return (
    <div className="md:px-8">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center flex justify-center items-center gap-1">
        Choose a plan
      </h2>
      <p className="mt-1 mb-8 text-xl font-medium text-gray-700 text-center">
        Select a plan to generate your logo
      </p>
      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 w-full min-w-80 lg:min-w-sm border border-gray-400 bg-gray-50 rounded-xl shadow-lg transition-all duration-200 ${
              selectedPlan === plan.name
                ? "scale-99 border-3 border-teal-500"
                : ""
            }`}
          >
            {/* Plan Name */}
            <div className="flex justify-between">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {plan.name}
              </CardTitle>
              {plan.recommended && (
                <span className="px-3 text-xs font-semibold text-white bg-linear-to-r from-blue-400 via-blue-600 to-blue-500 border border-gray-600 rounded-full flex items-center shadow-md">
                  Recommended
                </span>
              )}
            </div>
            {/* Price and Check sign */}
            <div className="flex items-center justify-between">
              <p className="text-4xl font-semibold text-gray-800">
                {plan.price.split(" ")[0]}
                <span className="text-2xl">{plan.price.split(" ")[1]}</span>
              </p>
              <span>
                {selectedPlan === plan.name ? (
                  <Check className="p-1 rounded-full bg-gray-800 text-white" />
                ) : null}
              </span>
            </div>
            {/* Features */}
            <ul className="mt-3 md:min-h-48">
              <p className="text-lg font-semibold text-gray-900">
                What's included -
              </p>
              {plan.features.map((feature, index) => (
                <li key={index} className="mt-2 flex gap-1.5">
                  <BadgeCheck className="text-gray-500" />
                  <span className="text-sm md:text-base font-medium text-gray-800">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            {/* Select Button */}
            <Link
              href={
                !isSignedIn
                  ? "/sign-up"
                  : selectedPlan === plan.name
                  ? "/pricing"
                  : "/generate-logo"
              }
            >
              <Button
                onClick={() => setSelectedPlan(plan.name)}
                className="w-full text-md rounded-full custom-button"
              >
                Generate Logo
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
