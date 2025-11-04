import Hero from "./_components/hero";
import FeaturesCard from "./_components/features-card";

export default function Home() {
  return (
    <div className="md:px-16 lg:px-32 xl:px-48 2xl:px-56">
      <Hero />
      <FeaturesCard />
    </div>
  );
}
