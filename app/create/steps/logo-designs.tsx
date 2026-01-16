import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Designs from "@/data/designs";
import { useState, useEffect } from "react";
import HeadingDesc from "@/components/heading-desc";
import { useStore } from "@/stores/steps-store";

interface StyleSelectorProps {
  onHandleInputChange: (value: object) => void;
}

const LogoDesigns = ({ onHandleInputChange }: StyleSelectorProps) => {
  const storedDesign = useStore((s) => s.formData.design);
  const [selectedDesign, setSelectedDesign] = useState(
    storedDesign?.title ?? ""
  );

  useEffect(() => {
    if (storedDesign?.title) setSelectedDesign(storedDesign.title);
  }, [storedDesign]);

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
            className={`h-fit md:h-full p-3 md:p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedDesign === style.title
                ? "border-gray-600 shadow-(--shadow-glow)"
                : ""
            }`}
            onClick={() => {
              setSelectedDesign(style.title);
              onHandleInputChange(style);
            }}
          >
            <div className="relative flex items-start justify-between -mb-3 md:-mb-1">
              {/* Style Name */}
              <h3 className="w-5/6 h-10 md:h-5 font-semibold text-sm md:text-md text-wrap">
                {style.title}
              </h3>
              {/* Check Symbol */}
              {selectedDesign === style.title && (
                <div className="absolute right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            {/* Style Image */}
            <img
              src={style.image}
              alt={style.title}
              className="w-48 h-40 object-cover rounded-lg mx-auto"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LogoDesigns;
