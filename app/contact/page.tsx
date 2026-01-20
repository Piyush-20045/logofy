import { Card } from "@/components/ui/card";
import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "./_components/contact-form";

const Contact = () => {
  return (
    <section className="min-h-screen relative py-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-teal-600 mb-6">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            We'd Love to{" "}
            <span className="bg-linear-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Logofy? Need help with your logo? Our team is
            here to assist you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Email */}
          <Card className="h-fit p-4 md:p-6 space-y-8 bg-linear-to-br from-primary/5 to-transparent border-primary/10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Mail className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                <p className="text-muted-foreground mb-2">
                  We'll respond within 24 hours
                </p>
                <a
                  href="mailto:piyushyadav20045@gmail.com"
                  className="text-primary hover:underline hover:text-teal-600 shrink"
                >
                  py624833@gmail.com
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
