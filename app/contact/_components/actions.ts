"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// FormData Interface
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendMessage(formData: FormData) {
  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    return { error: "All fields are required." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <no-reply@piyushh.tech>",
      to: "py624833@gmail.com",
      replyTo: formData.email,
      subject: `Contact Form: ${formData.subject}`,
      html: `
        <h3>New Contact Form Submission from LOGOFY -</h3>
        <p><strong>name:</strong> ${formData.name}</p>
        <p><strong>email:</strong> ${formData.email}</p>
        <p><strong>subject:</strong> ${formData.subject}</p>
        <p><strong>message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: "Failed to send message" };
    }

    return { message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "An error occurred while sending the message." };
  }
}
