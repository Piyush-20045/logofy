import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogIn } from "lucide-react";

// Header Component
const header = () => {
  return (
    <div className="px-3 md:px-20 2xl:px-56 py-2 flex justify-between items-center shadow-sm">
      {/* LOGO */}
      <div className="flex items-center cursor-pointer">
        <Image width={55} height={55} src="/logo.png" alt="logo" />
        <span className="font-bold text-3xl bg-linear-to-tl from-blue-400 via-slate-600 to-blue-400 bg-clip-text text-transparent">
          logofy
        </span>
      </div>

      {/* NAV LINKS */}
      <Button className="custom-button text-lg">
        <LogIn />
        login
      </Button>
    </div>
  );
};

export default header;
