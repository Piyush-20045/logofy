import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="mt-34 h-screen text-center flex flex-col">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-600">
        Create Stunning Logos with AI Magic
      </h1>
      <p className="mt-3 text-2xl font-semibold">
        Transform your brand identity in seconds. Powered by cutting-edge AI
        technology, designed to make your vision come to life.
      </p>
      <div className="mt-4 w-full max-w-2xl">
        <Button className="bg-blue-500">
          lets make a logo <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
