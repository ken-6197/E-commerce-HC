"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Privacy</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Introduction */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">Welcome to HillVogue</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take your privacy seriously. This policy explains what information we collect, 
                  how we use it, and how we protect it.
                </p>
              </div>

              <Separator />

              {/* Section 1 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">1. Information We Collect</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When you interact with HillVogue, we collect personal information that you voluntarily provide to us. 
                  This includes your name, email address, phone number, and shipping address. We also collect payment 
                  information, which is processed securely through our trusted payment partners and is never stored on 
                  our servers. Additionally, we gather usage data to understand how you interact with our website and 
                  services, as well as device information such as your browser type, IP address, and device details to 
                  improve your experience.
                </p>
              </div>

              <Separator />

              {/* Section 2 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your information helps us process and fulfill your orders smoothly. We use it to communicate with 
                  you about your orders, inquiries, and to provide customer support. Your data also allows us to improve 
                  our products and services continuously. With your consent, we may send you updates, promotions, and 
                  newsletters. We also use your information to ensure the security and integrity of our platform, 
                  protecting both you and us from fraudulent activities.
                </p>
              </div>

              <Separator />

              {/* Section 3 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">3. Information Sharing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We value your trust and do not sell or rent your personal information to third parties. However, we 
                  may share your information with trusted partners who assist us in order fulfillment, such as shipping 
                  and payment processing services. These partners are bound by strict confidentiality agreements. We may 
                  also disclose your information if required by law or to protect our legal rights and the rights of 
                  our users.
                </p>
              </div>

              <Separator />

              {/* Section 4 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">4. Data Security</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We take data security seriously. We implement industry-standard security measures to protect your 
                  personal information from unauthorized access, alteration, or destruction. All transactions are 
                  encrypted using SSL technology to ensure your data remains safe during transmission. We regularly 
                  review and update our security practices to stay ahead of emerging threats. Access to personal data 
                  is restricted to authorized personnel only.
                </p>
              </div>

              <Separator />

              {/* Section 5 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">5. Cookies & Tracking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies to enhance your browsing experience on HillVogue. Cookies help us remember your 
                  preferences, understand how you use our site, and improve our services. You can control cookie 
                  settings through your browser preferences. We also use third-party analytics tools that may use 
                  cookies for performance tracking, helping us understand how visitors interact with our website 
                  and where we can improve.
                </p>
              </div>

              <Separator />

              {/* Section 6 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">6. Your Rights</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You have full control over your personal data. You have the right to access, update, or delete your 
                  personal information at any time. You can also opt-out of marketing communications by clicking the 
                  unsubscribe link in our emails or by contacting us directly. If you wish to request a copy of the 
                  data we hold about you, we will provide it promptly. You may also withdraw your consent for data 
                  processing where applicable.
                </p>
              </div>

              <Separator />

              {/* Section 7 */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">7. Children's Privacy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  HillVogue is not directed at individuals under 18 years of age. We do not knowingly collect personal 
                  information from children. If we become aware that we have inadvertently collected personal data from 
                  a child, we will take immediate steps to remove it from our records. Parents or guardians who have 
                  concerns about their child's privacy may contact us to address any issues.
                </p>
              </div>

              <Separator />

              {/* Updates Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Updates to This Policy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal 
                  requirements. We encourage you to review this page periodically for any updates. Your continued use 
                  of our services after any changes constitutes acceptance of the updated policy.
                </p>
              </div>

              <Separator />

              {/* Footer Note */}
              <div className="text-center text-xs text-muted-foreground">
                <p>© 2026 HillVogue. All rights reserved.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}