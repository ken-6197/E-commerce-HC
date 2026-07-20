"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowRight,
  Clock,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@hillvogue.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 9233661750",
      sub: "Mon-Fri, 9am - 6pm IST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Imphal, Manipur",
      sub: "Come experience the heritage",
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        variants={itemVariants}
        transition={{ duration: 0.6 }}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
      >
        {/* Header */}
        <motion.div 
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Get in Touch
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We'd Love to <span className="text-primary">Hear From You</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question about our collection or need styling advice? 
            Reach out and our team will get back to you soon.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form - takes 3/5 columns */}
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Send a Message</h2>
                    <p className="text-sm text-muted-foreground">We'll get back within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all resize-none"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || isSubmitted}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : isSubmitted ? (
                        <div className="flex items-center gap-2">
                          <span>✓</span>
                          Message Sent!
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Send Message
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar - takes 2/5 columns */}
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Methods */}
            <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  Connect With Us
                </h3>
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="p-4 rounded-xl border border-primary/10 bg-background/30 transition-all hover:border-primary/30 hover:bg-background/50 duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{method.title}</p>
                        <p className="text-sm text-foreground/80 font-medium">
                          {method.details}
                        </p>
                        <p className="text-xs text-muted-foreground">{method.sub}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Social & Hours */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Working Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: 9am - 6pm IST
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Saturday: 10am - 4pm IST
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            href={social.href}
                            className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                            aria-label={social.label}
                          >
                            <social.icon className="h-5 w-5" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}