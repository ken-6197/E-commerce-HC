"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ShippingPage() {
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

  const shippingMethods = [
    {
      icon: Truck,
      title: "Standard Shipping",
      time: "3-5 business days",
      price: "₹50",
      note: "Free on orders above ₹999",
    },
    {
      icon: Package,
      title: "Express Shipping",
      time: "1-2 business days",
      price: "₹150",
      note: "Available for select pin codes",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Shipping
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shipping <span className="text-primary">Information</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Fast and reliable delivery for your tribal fashion
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Shipping Methods */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <Truck className="h-6 w-6 text-primary" />
                    Shipping Methods
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {shippingMethods.map((method, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 rounded-xl border border-primary/10 bg-background/30 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1 cursor-default"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <method.icon className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="font-semibold text-foreground">{method.title}</h3>
                        </div>
                        <div className="space-y-1 pl-11">
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            {method.time}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {method.price}
                          </p>
                          <p className="text-xs text-primary">{method.note}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <Separator />

              {/* Shipping Details */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Shipping Details</h2>
                  <div className="space-y-4">
                    <motion.div 
                      variants={itemVariants}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Order Processing</p>
                        <p className="text-sm text-muted-foreground">
                          Orders are processed within 1-3 business days. You will receive a confirmation 
                          email once your order is shipped.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={itemVariants}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Delivery Areas</p>
                        <p className="text-sm text-muted-foreground">
                          We ship to all locations across India. For remote areas, delivery may take 
                          additional 2-3 business days.
                        </p>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={itemVariants}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Important Notes</p>
                        <p className="text-sm text-muted-foreground">
                          Delivery times are estimates and may vary due to unforeseen circumstances 
                          like weather or courier delays. We strive to keep you updated on your order status.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <Separator />

              {/* Track Order Section - Added for better UX */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.5 }}>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Track Your Order</h2>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text"
                      placeholder="Enter your order ID or tracking number"
                      className="flex-1 px-4 py-2 rounded-lg border border-primary/10 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Track Order
                    </button>
                  </div>
                </div>
              </motion.div>

              <Separator />

              {/* Quick Support */}
              <motion.div variants={itemVariants} transition={{ duration: 0.5, delay: 0.6 }}>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need help with shipping? 
                    <button className="text-primary font-medium mx-1 hover:underline">
                      Chat with us
                    </button>
                    or email 
                    <a href="mailto:support@hillvogue.com" className="text-primary font-medium mx-1 hover:underline">
                      support@hillvogue.com
                    </a>
                  </p>
                </div>
              </motion.div>

              <Separator />

              {/* Footer Note */}
              <motion.div
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center text-xs text-muted-foreground space-y-2"
              >
                <p>© 2026 HillVogue. All rights reserved.</p>
                <p>We're committed to delivering your tribal fashion with care.</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}