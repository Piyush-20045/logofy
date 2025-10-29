import React from "react";
import Header from "@/app/_components/header";
import Hero from "./_components/hero";
import FeaturesCard from "./_components/features-card";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      <div className="md:px-16 lg:px-32 xl:px-48 2xl:px-56">
        {children}
        <Hero />
        <FeaturesCard />
      </div>
    </div>
  );
};

export default Provider;
