import HeadingDesc from "../../../components/heading-desc";
import colors from "../../../data/colors";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useStore } from "@/stores/steps-store";

// Define props interface
interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
}

const LogoPalette = ({ onHandleInputChange }: LogoTitleProps) => {
  const storedPalette = useStore((s) => s.formData.palette);
  const [selectedPalette, setSelectedPalette] = useState(storedPalette ?? "");

  useEffect(() => {
    if (storedPalette) setSelectedPalette(storedPalette);
  }, [storedPalette]);
  return (
    <div>
      {/* Heading */}
      <HeadingDesc
        title="Pick a color tone"
        desc="Pick the color tone that can most represent your company."
      />

      {/* All Color Swatches */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 place-items-center gap-4">
        {colors.map((palette) => (
          // Label & Single Palette
          <div
            key={palette.name}
            className="group h-36 w-full flex flex-col border rounded"
          >
            <div
              className={`flex cursor-pointer hover:scale-95 duration-300 transition-all active:scale-95 rounded ${
                selectedPalette === palette.name &&
                "p-0.5 border-2 border-gray-400 rounded"
              }`}
            >
              {palette.colors.map((color) => (
                // Single Color Box
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className="flex h-24 w-full"
                  onClick={() => {
                    setSelectedPalette(palette.name);
                    onHandleInputChange(palette.name);
                  }}
                ></div>
              ))}
            </div>
            <Label className="p-1.5 w-fit border border-gray-300 rounded bg-blue-200 text-gray-800 group-hover:bg-blue-300 duration-300 transition-all">
              {palette.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoPalette;
