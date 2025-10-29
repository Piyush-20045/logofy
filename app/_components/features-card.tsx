import React from "react";
import { Zap, Palette, Download } from "lucide-react";

// Individual Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 group flex flex-col items-center rounded-xl transition-all text-center border hover:border-blue-500 shadow-md cursor-pointer">
      <div className="mb-4 p-3 inline-flex rounded-lg bg-blue-400/30 text-blue-600 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const FeaturesCard = () => {
  return (
    <div className="my-12 px-4 min-h-screen flex flex-col justify-center">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Get your logo instantly from logofy
        </h2>
        <p className="mt-3 text-lg md:text-xl font-semibold text-gray-500">
          Professional logo ready in 5 minutes, not days.
        </p>
      </div>
      {/* Features Grid */}
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        <FeatureCard
          icon={<Zap className="h-6 w-6" />}
          title="Lightning Fast"
          description="Generate professional logos in seconds with our AI engine"
        />
        <FeatureCard
          icon={<Palette className="h-6 w-6" />}
          title="Infinite Styles"
          description="Explore unlimited design possibilities tailored to your brand"
        />
        <FeatureCard
          icon={<Download className="h-6 w-6" />}
          title="Ready to Use"
          description="Download high-resolution files ready for any platform"
        />
      </div>
    </div>
  );
};

export default FeaturesCard;
