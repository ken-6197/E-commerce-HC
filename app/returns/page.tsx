"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  RefreshCw,
  Clock,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  const returnSteps = [
    {
      icon: RefreshCw,
      title: "Request a Return",
      description:
        "Contact us within 15 days of delivery with your order ID and reason for return. We'll send you a return confirmation.",
    },
    {
      icon: Truck,
      title: "Pack & Ship",
      description:
        "Pack the item securely in its original packaging. Ship it back to us using a trackable shipping method.",
    },
    {
      icon: CheckCircle,
      title: "Inspection",
      description:
        "Once we receive your return, we'll inspect the item to ensure it meets our return policy requirements.",
    },
    {
      icon: Clock,
      title: "Refund Processing",
      description:
        "After inspection, we'll process your refund within 5-7 business days. You'll receive a confirmation email.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Returns
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Returns & <span className="text-primary">Exchanges</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We want you to love your purchase. Here's how returns and exchanges work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Quick Summary */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                  <p className="text-2xl font-bold text-primary">15</p>
                  <p className="text-sm text-muted-foreground">Days to return</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Money back guarantee</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                  <p className="text-2xl font-bold text-primary">5-7</p>
                  <p className="text-sm text-muted-foreground">Days for refund</p>
                </div>
              </div>

              <Separator />

              {/* Return Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Return Policy</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">15-Day Return Window</p>
                      <p className="text-sm text-muted-foreground">
                        Items must be returned within 15 days of delivery.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Original Condition</p>
                      <p className="text-sm text-muted-foreground">
                        Items must be unused, unworn, and with all original tags and packaging intact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Return Shipping</p>
                      <p className="text-sm text-muted-foreground">
                        Return shipping costs are the responsibility of the customer unless the item is defective or we made an error.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Non-Returnable Items</p>
                      <p className="text-sm text-muted-foreground">
                        Customized or personalized items, and final sale products cannot be returned.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* How It Works */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">How It Works</h2>
                <div className="space-y-4">
                  {returnSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-primary/10 bg-background/30">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {index + 1}. {step.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Exchange Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Exchange Policy</h2>
                <p className="text-muted-foreground text-sm">
                  If you'd like to exchange an item for a different size, color, or style, please follow the same process as a return. Once we receive your return, we'll process the exchange and ship your new item at no additional shipping cost.
                </p>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Note:</span> Exchanges are subject to product availability. If the item you want is unavailable, we'll issue a full refund instead.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Contact Section */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">Need Help?</h2>
                <p className="text-sm text-muted-foreground">
                  Our team is here to help with any questions about returns or exchanges.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-primary text-white hover:bg-primary/90">
                    <Link href="/shop">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}