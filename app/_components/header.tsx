"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

// Header Component
const header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(isLoaded, isSignedIn, user);

  return (
    <div className="px-3 md:px-20 2xl:px-56 py-2 flex justify-between items-center shadow-sm">
      {/* LOGO */}
      <Link href="/" className="flex items-center cursor-pointer">
        <Image width={55} height={55} src="/logo.png" alt="logo" />
        <span className="font-bold text-3xl bg-linear-to-tl from-blue-400 via-slate-600 to-blue-400 bg-clip-text text-transparent">
          logofy
        </span>
      </Link>

      {/* NAV LINKS */}
      {!isLoaded ? null : isSignedIn ? (
        <div className="flex items-center gap-2 md:gap-6">
          <Button variant="outline" className="cursor-pointer">
            Dashboard
          </Button>
          <UserButton />
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button className="custom-button text-lg">
            <LogIn />
            login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default header;
