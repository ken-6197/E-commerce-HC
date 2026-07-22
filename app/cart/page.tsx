"use client";

import CartItemList from "@/components/cart/CartItemList";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";
import Recommendations from "@/components/cart/Recommendations";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cart() {
  const router = useRouter();
  const { cart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const itemCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  // If not logged in, show login prompt
  if (!loading && !isLoggedIn) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Login Required
              </h2>
              <p className="text-muted-foreground mb-6">
                Please login to view and manage your cart items.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-primary text-white hover:bg-primary/90"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/signup")}
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!cart || cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CartItemList />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 px-8 transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>

        <Recommendations />
      </div>
    </PageTransition>
  );
}