"use client";

import Features from "@/components/product/Features";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import ProductNotFound from "@/components/product/ProductNotFound";
import RelatedProducts from "@/components/product/RelatedProducts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import products from "@/data/products.json";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  Facebook,
  Heart,
  Instagram,
  Link2,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Product() {
  const { addToCart } = useCart();
  const { productId } = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const product = products.find((p) => p.id === parseInt(productId as string));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    return <ProductNotFound />;
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    setIsAdding(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    const buyNowItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      total: product.price * quantity,
    };
    sessionStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
    router.push("/buy-now-checkout");
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Helper function to copy text with fallback
  const copyToClipboard = async (text: string) => {
    try {
      // Try using the modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: Use a temporary textarea element
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          textArea.remove();
        } catch (err) {
          textArea.remove();
          throw new Error('Failed to copy text');
        }
      }
      return true;
    } catch (err) {
      console.error('Clipboard error:', err);
      return false;
    }
  };

  // Share functionality with clipboard fallback
  const shareProduct = async (platform?: string) => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on HillVogue! 🛍️`,
      url: `${window.location.origin}/product/${product.id}`,
    };

    if (platform) {
      const encodedUrl = encodeURIComponent(shareData.url);
      const encodedText = encodeURIComponent(shareData.text);
      let shareUrl = "";

      switch (platform) {
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
          break;
        case "instagram": {
          const copied = await copyToClipboard(`${shareData.text} ${shareData.url}`);
          if (copied) {
            toast.success("Link copied! Open Instagram to share.");
          } else {
            toast.error("Unable to copy link. Please copy manually.");
          }
          return;
        }
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
          break;
        case "messenger":
          shareUrl = `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=your_app_id`;
          break;
        case "copy": {
          const copied = await copyToClipboard(`${shareData.text} ${shareData.url}`);
          if (copied) {
            toast.success("Link copied to clipboard!");
          } else {
            toast.error("Unable to copy link. Please copy manually.");
          }
          return;
        }
        default:
          if (navigator.share) {
            try {
              await navigator.share(shareData);
              return;
            } catch (err) {
              if (err instanceof Error && err.name !== "AbortError") {
                console.error("Share error:", err);
                toast.error("Failed to share. Try copying the link.");
              }
              return;
            }
          }
          const copied = await copyToClipboard(`${shareData.text} ${shareData.url}`);
          if (copied) {
            toast.success("Link copied to clipboard!");
          } else {
            toast.error("Unable to copy link. Please copy manually.");
          }
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
      }
    } else {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          if (err instanceof Error && err.name !== "AbortError") {
            console.error("Share error:", err);
            const copied = await copyToClipboard(`${shareData.text} ${shareData.url}`);
            if (copied) {
              toast.success("Link copied to clipboard!");
            } else {
              toast.error("Unable to copy link. Please copy manually.");
            }
          }
          return;
        }
      }
      const copied = await copyToClipboard(`${shareData.text} ${shareData.url}`);
      if (copied) {
        toast.success("Link copied to clipboard!");
      } else {
        toast.error("Unable to copy link. Please copy manually.");
      }
    }
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div
        variants={itemVariants}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <ProductBreadcrumb />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="w-full max-w-[500px] mx-auto flex flex-col items-center px-4">
            <div className="rounded-xl shadow-lg overflow-hidden mb-4 w-full">
              <Image
                src={product.image}
                alt="Selected product"
                width={600}
                height={600}
                priority
                fetchPriority="high"
                className="rounded-xl object-cover w-full h-auto max-h-[500px]"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              (4.8) • 127 reviews
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <Separator />

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("increment")}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  size="lg"
                  className={cn(
                    "w-full transition-all duration-300",
                    justAdded
                      ? "bg-green-600 text-white hover:bg-green-600"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </div>
                  ) : justAdded ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Added to Cart!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </div>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBuyNow}
                  className="w-full"
                >
                  Buy Now
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    isLiked && "text-destructive"
                  )}
                >
                  <Heart
                    className={cn("h-4 w-4 mr-2", isLiked && "fill-current")}
                  />
                  Add to Wishlist
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem
                      onClick={() => shareProduct("whatsapp")}
                      className="cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => shareProduct("facebook")}
                      className="cursor-pointer"
                    >
                      <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                      Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => shareProduct("twitter")}
                      className="cursor-pointer"
                    >
                      <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                      Twitter / X
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => shareProduct("instagram")}
                      className="cursor-pointer"
                    >
                      <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                      Instagram
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => shareProduct("messenger")}
                      className="cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Messenger
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => shareProduct("copy")}
                      className="cursor-pointer"
                    >
                      <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Features />
      </motion.div>

      <motion.div
        variants={itemVariants}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <RelatedProducts product={product} />
      </motion.div>
    </motion.div>
  );
}