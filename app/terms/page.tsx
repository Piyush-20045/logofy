import { Shield, Scale, Lock, Copyright } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Terms = () => {
  // Privacy and terms content
  const privacySections = [
    {
      icon: Shield,
      title: "Data Collection",
      content:
        "We collect basic account info (name, email) and logo generation data to provide our services. Payment info is processed securely through our providers.",
    },
    {
      icon: Lock,
      title: "Data Security",
      content:
        "Your data is protected with encryption, secure cloud storage, and strict access controls. We never sell your personal information.",
    },
  ];

  const termsSections = [
    {
      icon: Copyright,
      title: "Logo Ownership",
      content:
        "Free Plan logos are for personal use only. Pro Plan gives you full commercial rights and ownership of your generated logos.",
    },
    {
      icon: Scale,
      title: "Usage Terms",
      content:
        "Don't use Logofy for ilTerms content, trademark infringement, or to reverse-engineer our technology. Though the logo you generate is free to use.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container px-6 pt-16 pb-12 mx-auto relative overflow-hidden text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terms{" "}
          <span className="bg-linear-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
            Information
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Privacy Policy & Terms of Service
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: January 19, 2026
        </p>
      </section>

      {/* Content */}
      <section className="container mb-12 px-6 pt-12 pb-24 mx-auto max-w-4xl">
        {/* Privacy Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-teal-600" />
            Privacy Policy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {privacySections.map((section, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 border-border/50 hover:border-teal-500/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <section.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Terms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Scale className="w-6 h-6 text-teal-600" />
            Terms of Service
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {termsSections.map((section, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 border-border/50 hover:border-teal-500/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <section.icon className="w-5 h-5 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Card className="p-6 gap-2 bg-linear-to-br from-primary/5 to-accent/5 border-primary/20 text-center">
          <h3 className="text-xl font-bold">Questions?</h3>
          <p className="text-muted-foreground mb-4">
            Reach out if you have any questions about our policies.
          </p>
          <Link href="/contact">
            <Button className="bg-teal-500 hover:bg-teal-600/80">
              Contact Us
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Terms;
