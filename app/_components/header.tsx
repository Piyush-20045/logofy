import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const header = () => {
  return (
    <div className="px-10 md:px-14 lg:px-24 xl:px-44 2xl:px-56 py-2 flex justify-between items-center shadow-sm">
      {/* LOGO */}
      <div className="flex items-center">
        <Image width={55} height={55} src="/logo.png" alt="logo" />
        <span className="font-bold text-4xl bg-linear-to-tl from-blue-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
          Logofy
        </span>
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-6">
        <Button>Get Started</Button>
        <Button className="bg-blue-700">Login</Button>
      </div>
    </div>
  );
};

export default header;
