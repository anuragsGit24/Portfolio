"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SectionWrapper } from "./section-wrapper";
import { Mail, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name is too long."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(1000, "Message is too long."),
  honeypot: z.string().max(0, "Invalid submission"), // Anti-spam honeypot
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: FormData) {
    // Honeypot spam protection - if filled, it's a bot
    if (data.honeypot) {
      console.warn("Spam detected via honeypot");
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration missing. Please check environment variables.");
      }

      // Sanitize inputs
      const sanitizedData = {
        from_name: data.name.trim(),
        from_email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
        to_name: "Anurag Singh", // Your name
      };

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        sanitizedData,
        publicKey
      );

      if (response.status === 200) {
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "Thanks for reaching out. I'll get back to you within 24-48 hours.",
          variant: "default",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SectionWrapper id="contact" className="bg-secondary/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Have a project in mind, want to collaborate, or just say hi? Drop me a line.
        </p>
      </div>
      <a href="#contact-form" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground">
        Skip to contact form
      </a>
      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Contact form">
            {/* Honeypot field - hidden from users, catches bots */}
            <FormField
              control={form.control}
              name="honeypot"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} tabIndex={-1} autoComplete="off" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input 
                      id="name" 
                      placeholder="Your Name" 
                      aria-required="true" 
                      disabled={isSubmitting}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      aria-required="true" 
                      disabled={isSubmitting}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <FormControl>
                     <Textarea 
                       id="message" 
                       placeholder="Your message..." 
                       aria-required="true" 
                       disabled={isSubmitting}
                       {...field} 
                       className="min-h-[120px]" 
                     />
                  </FormControl>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button 
                   type="submit" 
                   size="lg" 
                   disabled={isSubmitting} 
                   aria-label="Send contact message"
                   className="relative"
                 >
                    {isSubmitting ? (
                      <>
                        <span className="opacity-0">Send Message</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                          Sending...
                        </span>
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" aria-hidden="true"/>
                      </>
                    )}
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anuragsinghm08@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Send email directly to Anurag Singh via Gmail">
                        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                        Email Me Directly
                    </a>
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </SectionWrapper>
  );
}
