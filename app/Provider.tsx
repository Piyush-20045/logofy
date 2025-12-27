"use client";
import React, { useEffect } from "react";
import Header from "@/components/header";
import { useUser } from "@clerk/nextjs";
import Footer from "../components/footer";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  // sending the post request to save user details in the supabase db
  useEffect(() => {
    if (user) {
      fetch("/api/users", { method: "POST" });
    }
  }, [user]);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Provider;
