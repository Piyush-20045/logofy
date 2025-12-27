"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Header Component
const header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [credits, setCredits] = useState();

  // FETCHING CREDITS
  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchCredits = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("credits")
          .eq("id", user?.id)
          .single();

        console.log(data?.credits);

        if (error) {
          console.error("Error fetching logos:", error);
        } else {
          setCredits(data.credits);
        }
      } catch (err) {
        console.error("error loading credits", err);
      }
    };
    fetchCredits();
  }, [user, isLoaded]);
  return (
    <div className="px-3 md:px-20 2xl:px-56 py-2 flex justify-between items-center shadow-sm">
      {/* LOGO */}
      <Link href="/" className="flex items-center cursor-pointer">
        <Image width={55} height={55} src="/logo.png" alt="logo" />
      </Link>

      {/* NAV LINKS */}
      {!isLoaded ? null : isSignedIn ? (
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            href="pricing"
            className="px-2 py-1 flex gap-2 border-2 rounded-lg hover:bg-gray-100"
          >
            <img src="credit.webp" className="w-5 h-5" />
            {credits}
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="cursor-pointer">
              Dashboard
            </Button>
          </Link>
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
