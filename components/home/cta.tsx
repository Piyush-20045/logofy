"use client";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";

const Cta = () => {
  const route = useRouter();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-(--gradient-primary) opacity-10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Logo?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who've brought their brand
              vision to life
            </p>
            <Button
              size="lg"
              className="text-lg px-10 py-6 custom-button"
              onClick={() => route.push("/create")}
            >
              Get Started Now
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Cta;
