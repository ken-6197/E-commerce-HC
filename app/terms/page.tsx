"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Legal</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Introduction */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">Welcome to HillVogue</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms & Conditions establish the legal framework for your use of the HillVogue 
                  platform. By accessing or using our website, you acknowledge that you have read, 
                  understood, and agree to be bound by these terms. If you do not agree, please refrain 
                  from using our services.
                </p>
              </div>

              <Separator />

              {/* Section 1 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">1. General Terms</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By accessing and using HillVogue, you agree to comply with these Terms & Conditions. 
                  All products and services are subject to availability. HillVogue reserves the right 
                  to update or modify these terms at any time without prior notice. Your continued 
                  use of the platform constitutes acceptance of any changes.
                </p>
              </div>

              <Separator />

              {/* Section 2 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">2. Orders & Payments</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All orders are subject to acceptance and product availability. Prices are listed 
                  in Indian Rupees (₹) and include applicable taxes. We accept payments through 
                  secure, encrypted payment gateways. HillVogue reserves the right to refuse or 
                  cancel any order at our discretion.
                </p>
              </div>

              <Separator />

              {/* Section 3 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">3. Shipping & Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We offer reliable shipping services across India. Delivery timelines are estimates 
                  and may vary based on location and external factors. Orders are typically processed 
                  within 1-3 business days. A tracking number will be shared via email once your 
                  order has been dispatched.
                </p>
              </div>

              <Separator />

              {/* Section 4 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">4. Returns & Exchanges</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Returns are accepted within 15 days of delivery. Items must be unused, in original 
                  condition, and with all tags attached. Return shipping costs are the responsibility 
                  of the customer. Refunds are processed within 5-7 business days after inspection 
                  of returned items.
                </p>
              </div>

              <Separator />

              {/* Section 5 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">5. Pricing & Taxes</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All prices are quoted in Indian Rupees (₹). HillVogue reserves the right to adjust 
                  prices without prior notice. Applicable taxes will be clearly displayed at checkout. 
                  Any customs duties or import taxes are the sole responsibility of the customer.
                </p>
              </div>

              <Separator />

              {/* Section 6 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">6. Privacy & Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your personal data is handled with the highest level of security. We do not share 
                  or sell your information to third parties without explicit consent. All transactions 
                  are protected using SSL encryption technology. For complete details, please refer 
                  to our Privacy Policy.
                </p>
              </div>

              <Separator />

              {/* Section 7 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">7. Intellectual Property</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All content, designs, and trademarks on this site are the exclusive property of 
                  HillVogue. Unauthorized reproduction, distribution, or use of our content is 
                  strictly prohibited. Product descriptions and imagery are protected under copyright 
                  law. Any misuse of intellectual property will be pursued to the fullest extent 
                  of the law.
                </p>
              </div>

              <Separator />

              {/* Footer Note */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2026 HillVogue. All rights reserved.</p>
                <p>By using our services, you agree to these Terms & Conditions.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}