import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HillVogue - Where hill heritage meets modern fashion",
  description:
    "Discover premium tribal fashion from Manipur's hill tribes. Authentic traditional attire, handcrafted jewelry, and ethnic accessories. Where hill heritage meets modern vogue.",
  keywords:
    "HillVogue, tribal fashion, Manipur, traditional attire, ethnic wear, handcrafted jewelry, hill tribes",
  openGraph: {
    title: "HillVogue - Where hill heritage meets modern fashion",
    description: "Discover premium tribal fashion from Manipur's hill tribes.",
    type: "website",
    url: "https://hillvogue.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors closeButton duration={3000} />
        </CartProvider>
      </body>
    </html>
  );
}