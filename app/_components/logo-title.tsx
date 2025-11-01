"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Shapes } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/store";

// Define props interface
interface LogoTitleProps {
  onHandleInputChange: (value: string) => void;
}

// LogoTitle component
const LogoTitle = ({ onHandleInputChange }: LogoTitleProps) => {
  const incStep = useStore((state) => state.incStep);
  const searchParam = useSearchParams();
  const [title, setTitle] = useState(searchParam?.get("title") || "");

  return (
    <div className="mx-2 mt-24 p-4 md:p-6 border rounded-2xl bg-blue-100 max-w-lg shadow-lg shadow-black/10">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 flex items-center gap-1">
        <Shapes />
        Enter a logo name
      </h1>
      <p className="mt-1 text-lg font-semibold text-gray-700">
        Enter your web app name or company name:
      </p>
      {/* Input and Button */}
      <div>
        <Input
          type="text"
          placeholder="Enter a logo name"
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
            onHandleInputChange(e.target.value);
          }}
          className="h-12 mt-8 bg-white text-lg! font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
        <Button
          onClick={() => incStep(1)}
          className="h-12 mt-4 w-full bg-linear-to-tl from-blue-400 via-slate-600 to-blue-400 text-lg shadow-md shadow-black/20 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          Create Logo <PenLine />
        </Button>
      </div>
    </div>
  );
};

export default LogoTitle;
