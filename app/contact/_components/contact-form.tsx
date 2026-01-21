"use client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "./actions";
import { Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // SubmitForm function
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await sendMessage(formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message ?? "Message sent successfully!");
    }
  };

  return (
    <Card className="p-4 md:p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
      <form onSubmit={submitForm} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Piyush Yadav"
            value={formData.name ?? ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            className="bg-background/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="logofy@example.com"
            value={formData.email ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isSubmitting}
            className="bg-background/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="How can we help?"
            value={formData.subject ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            disabled={isSubmitting}
            className="bg-background/50"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell us more about your inquiry..."
            value={formData.message ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            disabled={isSubmitting}
            className="bg-background/50 min-h-24"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-teal-400 hover:bg-teal-500 group"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Card>
  );
};

export default ContactForm;
