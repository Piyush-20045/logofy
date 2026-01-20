import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const ContactForm = () => {
  return (
    <Card className="p-4 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Your Name</Label>
          <Input
            id="name"
            placeholder="Piyush Yadav"
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="logofy@example.com"
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="How can we help?"
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us more about your inquiry..."
            className="bg-background/50 min-h-24"
          />
        </div>
        <Button
          className="w-full bg-teal-400 hover:bg-teal-500 group"
          size="lg"
        >
          Send Message
          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
