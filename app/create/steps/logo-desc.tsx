"use client";
import { Input } from "@/components/ui/input";
import HeadingDesc from "../../../components/heading-desc";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/steps-store";

// Define props interface
interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
}

const LogoDesc = ({ onHandleInputChange }: LogoTitleProps) => {
  const storedDesc = useStore((s) => s.formData.desc);
  const [value, setValue] = useState<string>(storedDesc ?? "");

  useEffect(() => {
    if (storedDesc) setValue(storedDesc);
  }, [storedDesc]);

  return (
    <div>
      {/* Heading */}
      <HeadingDesc
        title="Describe your logo"
        desc="Enter your ideas, themes, or inspirations that you want the logo to
        reflect:"
      />
      {/* Input */}
      <div>
        <Input
          type="text"
          placeholder="Enter logo description..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onHandleInputChange(e.target.value);
          }}
          className="h-12 mt-6 bg-white text-lg! font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
      </div>
    </div>
  );
};

export default LogoDesc;
