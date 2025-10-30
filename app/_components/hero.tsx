"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight, Star } from "lucide-react";
import Link from "next/link";

// Hero Component
const Hero = () => {
  const [title, setTitle] = useState("");
  return (
    <div className="py-14 md:my-4 px-4 mt-16 text-center flex flex-col bg-[url('/bg.webp')] bg-center bg-cover items-center">
      {/* Title */}
      <p className="flex gap-1 text-lg md:text-xl font-semibold text-gray-400">
        <Star /> Make a Logo in 5 Minutes
      </p>
      <h1 className="mt-5 text-4xl md:text-6xl font-bold text-blue-600">
        The Ultimate AI Logo Maker
      </h1>
      <p className="mt-3 text-xl md:text-2xl text-gray-600 font-semibold">
        Transform your brand identity in seconds. Create and edit logos with
        ease, no design skills required.
      </p>
      {/* Input and Create Btn */}
      <div className="mt-10 w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <Input
          type="text"
          placeholder="Enter your Logo name..."
          onChange={(e) => setTitle(e.target.value)}
          className="h-14 md:w-5/6 text-lg! font-semibold text-gray-800 bg-white shadow-md shadow-black/10 placeholder:text-gray-400 focus:ring-blue-200!"
        />
        <Link href={`/create?title=${title}`} className="w-full md:w-auto">
          <Button className="h-14 w-full md:w-fit bg-linear-to-tl from-blue-400 via-slate-600 to-blue-400 text-lg flex items-center gap-2 shadow-md shadow-black/20 transition-all duration-300 active:scale-95 cursor-pointer">
            Create Logo <ArrowBigRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
