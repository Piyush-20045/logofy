"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";
import HeadingDesc from "../../_components/heading-desc";

// Define props interface
interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
}

// LogoTitle component
const LogoTitle = ({ onHandleInputChange }: LogoTitleProps) => {
  const searchParam = useSearchParams();
  const incStep = useStore((state) => state.incStep);

  const storedTitle = useStore((s) => s.formData.title);
  const [title, setTitle] = useState(
    storedTitle ?? searchParam?.get("title") ?? ""
  );

  useEffect(() => {
    if (storedTitle) setTitle(storedTitle);
  }, [storedTitle]);

  return (
    <div>
      {/* Heading */}
      <HeadingDesc
        title="Enter a logo name"
        desc="Enter your web app name or company name:"
      />
      {/* Input and Button */}
      <div>
        <Input
          type="text"
          placeholder="Enter a logo name"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            onHandleInputChange(e.target.value);
          }}
          className="h-12 mt-8 bg-white text-lg! font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
        <Button
          onClick={() => incStep(1)}
          className="h-12 mt-4 w-full text-lg custom-button"
          disabled={title === ""}
        >
          Create Logo <PenLine />
        </Button>
      </div>
    </div>
  );
};

export default LogoTitle;
