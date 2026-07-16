"use client";

import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Footer() {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { href: "/shop", label: "All Products" },
        { href: "/shop", label: "New Arrivals" },
        { href: "/shop", label: "Sale" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { href: "/contact", label: "Contact Us" },
        { href: "/shipping", label: "Shipping Info" },
        { href: "/returns", label: "Returns & Exchanges" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms & Conditions" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://facebook.com/hillvogue", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com/hillvogue", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com/hillvogue", icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Brand Section - spans 2 columns */}
            <div className="lg:col-span-2">
              <Link
                className="inline-flex items-center gap-2 text-xl tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
                href="/"
                aria-label="HillVogue Home"
              >
                <Image
                  src="/images/Rongmei-New-2023.svg"
                  alt="HillVogue Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="whitespace-nowrap">
                  Hill<span className="text-primary">Vogue</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2 mb-4 max-w-sm leading-relaxed">
                Premium tribal fashion from Manipur. Where heritage meets modern style.
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>Imphal, Manipur, India</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>+91 9233661750</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>hello@hillvogue.com</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8 rounded-full bg-muted/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Link href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Footer Sections - evenly distributed */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-3 gap-6">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="py-4 flex flex-col md:flex-row justify-center items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>© 2026 HillVogue™. Made with Love. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}