"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Handcrafted with Love",
      description:
        "Every piece is handcrafted by skilled artisans from the hill tribes of Northeast India, preserving centuries-old traditions.",
    },
    {
      title: "Supporting Artisans",
      description:
        "We work directly with tribal communities across Manipur, ensuring fair wages and sustainable livelihoods.",
    },
    {
      title: "Cultural Preservation",
      description:
        "We are dedicated to preserving the rich cultural heritage of Manipur's hill tribes through fashion.",
    },
    {
      title: "Authentic & Genuine",
      description:
        "Every product is 100% authentic, sourced directly from tribal artisans and communities.",
    },
    {
      title: "Sustainable & Ethical",
      description:
        "We use natural, eco-friendly materials and sustainable practices to protect the environment.",
    },
    {
      title: "Quality Craftsmanship",
      description:
        "Each piece is carefully crafted with attention to detail, ensuring the highest quality.",
    },
  ];

  const milestones = [
    { year: "2024", title: "HillVogue Founded", description: "Born from a vision to celebrate Manipur's tribal fashion heritage" },
    { year: "2025", title: "First Artisan Partnership", description: "Collaborated with tribal artisans across Manipur" },
    { year: "2026", title: "Expanded Collection", description: "Added jewelry, accessories, and contemporary tribal fashion" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">Our Story</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Where <span className="text-primary">Hill</span> Heritage Meets <br />
              <span className="text-primary">Modern Vogue</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              HillVogue brings you the beauty of Manipur's hill tribes through thoughtfully 
              crafted fashion, jewelry, and accessories. Each piece is made by hand, rooted 
              in tradition, and designed for the modern wardrobe.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Bringing <span className="text-primary">Tribal Fashion</span> to the World
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                HillVogue was founded with a simple mission: to connect the world 
                with the authentic tribal fashion of Manipur's tribes & communities. We believe 
                that every handcrafted piece carries a story worth sharing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From traditional attire to contemporary jewelry and accessories, 
                we create a platform for tribal artisans to showcase their artistry 
                while preserving the rich cultural tapestry of Northeast India.
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-sm text-muted-foreground">Tribal Communities</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Artisans Supported</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Products Curated</p>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 rounded-2xl p-12 text-center">
              <p className="text-lg font-semibold text-foreground italic">
                "Crafted by Tradition, Designed for Vogue"
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Team HillVogue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We <span className="text-primary">Stand For</span>
            </h2>
            <p className="text-muted-foreground">
              These principles guide everything we do at HillVogue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border hover:shadow-md transition-all">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The HillVogue <span className="text-primary">Story</span>
            </h2>
            <p className="text-muted-foreground">
              How we started and where we're headed.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <Badge className="bg-primary text-white shrink-0 w-16 justify-center">
                  {milestone.year}
                </Badge>
                <div>
                  <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Join Us on This <span className="text-primary">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Support authentic tribal craftsmanship and be part of preserving 
              Manipur's rich cultural heritage with HillVogue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}