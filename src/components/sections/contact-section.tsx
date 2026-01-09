"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SectionWrapper } from "./section-wrapper";
import { Mail, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    // This is a mock submission. In a real app, you would send this data to your backend.
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Your Name" aria-required="true" {...field} />
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
                    <Input id="email" type="email" placeholder="your.email@example.com" aria-required="true" {...field} />
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
                     <Textarea id="message" placeholder="Your message..." aria-required="true" {...field} className="min-h-[120px]" />
                  </FormControl>
                  <FormMessage role="alert" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button type="submit" size="lg" disabled={form.formState.isSubmitting} aria-label="Send contact message">
                    {form.formState.isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" aria-hidden="true"/></>}
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <a href="mailto:hello@example.com" aria-label="Send email directly to Anurag Singh">
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
