"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Shapes } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Create page component
const Create = () => {
  const title = useSearchParams().get("title") || "";
  return (
    <div className="bg-[url('/bg.webp')] bg-center bg-cover flex flex-col items-center">
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
        <form>
          <Input
            type="text"
            placeholder="Enter a logo name"
            className="h-12 mt-8 bg-white text-lg! font-semibold text-gray-800 shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
          />
          <Button className="h-12 mt-4 w-full bg-linear-to-tl from-blue-400 via-slate-600 to-blue-400 text-lg shadow-md shadow-black/20 transition-all duration-300 active:scale-95 cursor-pointer">
            Create Logo <PenLine />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Create;
