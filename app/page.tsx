import Hero from "@/components/home/hero";
import FeaturesCard from "@/components/home/features-card";
import Cta from "@/components/home/cta";

export default function Home() {
  return (
    <div className="md:px-16 lg:px-32 xl:px-48 2xl:px-56">
      <Hero />
      <FeaturesCard />
      <Cta />
    </div>
  );
}
