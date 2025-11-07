import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Designs from "@/app/_data/designs";
import { useState } from "react";
import HeadingDesc from "@/app/_components/heading-desc";

interface StyleSelectorProps {
  onHandleInputChange: (value: object) => void;
}

const LogoDesigns = ({ onHandleInputChange }: StyleSelectorProps) => {
  const [selectedDesign, setSelectedDesign] = useState("");

  return (
    <div>
      {/* Heading */}
      <HeadingDesc
        title="Select a design style"
        desc="Choose the style that best fits your vision"
      />
      {/* All Logo Designs */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 place-items-center gap-4">
        {Designs.map((style) => (
          // Single design style
          <Card
            key={style.title}
            className={`h-fit md:h-full p-3 md:p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedDesign === style.title
                ? "border-gray-600 shadow-(--shadow-glow)"
                : ""
            }`}
            onClick={() => {
              setSelectedDesign(style.title);
              onHandleInputChange(style);
            }}
          >
            <div className="flex items-start justify-between -mb-3 md:-mb-1">
              {/* Style Name */}
              <h3 className="w-5/6 md:w-full font-semibold text-sm md:text-lg">
                {style.title}
              </h3>
              {/* Check Symbol */}
              {selectedDesign === style.title && (
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
              )}
            </div>
            {/* Style Image */}
            <img
              src={style.image}
              alt={style.title}
              className="w-full rounded-lg"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LogoDesigns;
