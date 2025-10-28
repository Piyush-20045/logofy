import React from "react";
import Header from "@/app/_components/header";
import Hero from "./_components/hero";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-green-100">
      <Header />
      <div className="px-10 md:px-16 lg:px-32 xl:px-48 2xl:px-56">
        {children}
        <Hero />
      </div>
    </div>
  );
};

export default Provider;
