"use client";
import { Input } from "@/components/ui/input";
import HeadingDesc from "../../_components/heading-desc";

// Define props interface
interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
}

const LogoDesc = ({ onHandleInputChange }: LogoTitleProps) => {
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
          onChange={(e) => onHandleInputChange(e.target.value)}
          className="h-12 mt-6 bg-white text-lg! font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
      </div>
    </div>
  );
};

export default LogoDesc;
