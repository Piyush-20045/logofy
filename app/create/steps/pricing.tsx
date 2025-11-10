import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Check, CircleDollarSign, DollarSign } from "lucide-react";
import { plans } from "@/app/_data/pricing";
import { useState } from "react";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Premium");
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
                ? "scale-99 border-3 border-blue-500"
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
                {plan.price}
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
            <Button
              onClick={() => setSelectedPlan(plan.name)}
              className="text-md rounded-full custom-button"
            >
              {selectedPlan === plan.name ? "Selected" : "Select"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
