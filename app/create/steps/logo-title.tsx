"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/steps-store";
import HeadingDesc from "../../../components/heading-desc";

// Define props interface
interface LogoTitleProps {
  onHandleInputChange: (field: string, value: string) => void;
}

// LogoTitle component
const LogoTitle = ({ onHandleInputChange }: LogoTitleProps) => {
  const searchParam = useSearchParams();
  const incStep = useStore((state) => state.incStep);
  const storedTitle = useStore((s) => s.formData.title);
  const storedDesc = useStore((s) => s.formData.desc);

  const [title, setTitle] = useState(
    storedTitle ?? searchParam?.get("title") ?? ""
  );
  const [desc, setDesc] = useState<string>(storedDesc ?? "");

  useEffect(() => {
    if (storedTitle) setTitle(storedTitle);
    if (storedDesc) setDesc(storedDesc);
  }, [storedTitle, storedDesc]);

  return (
    <div>
      {/* Heading */}
      <HeadingDesc
        title="Enter logo name and description"
        desc="Enter your web app name or company name and a short description:"
      />
      {/* Input and Button */}
      <div>
        <Input
          type="text"
          placeholder="Logo name..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            onHandleInputChange("title", e.target.value);
          }}
          className="h-12 mt-8 bg-white font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
        <Input
          type="text"
          placeholder="Description..."
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
            onHandleInputChange("desc", e.target.value);
          }}
          className="h-12 mt-4 bg-white font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
        <Button
          onClick={() => incStep(1)}
          className="h-12 mt-6 w-full text-lg custom-button"
          disabled={title === ""}
        >
          Create Logo <PenLine />
        </Button>
      </div>
    </div>
  );
};

export default LogoTitle;
