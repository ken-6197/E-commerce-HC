"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Package,
  Heart,
  Shield,
  Crown,
  Truck,
  ChevronRight,
  Gift,
  Star,
  CreditCard,
  ShoppingBag,
  Settings,
  HelpCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setIsLoggedIn(true);

      // Get data from Supabase metadata
      const name = user.user_metadata?.full_name || "";
      const email = user.email || "";
      const phone = user.user_metadata?.phone || "";
      const address = localStorage.getItem("userAddress") || "Imphal, Manipur, India";

      const savedData = { name, email, phone, address };
      setUserData(savedData);
      setFormData(savedData);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          router.push("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(userData);
  };

  const handleSave = async () => {
    // Update Supabase metadata
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: formData.name,
        phone: formData.phone,
      },
    });

    if (error) {
      alert("Failed to update profile: " + error.message);
      return;
    }

    // Update localStorage
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userPhone", formData.phone);
    localStorage.setItem("userAddress", formData.address);

    setUserData(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const menuItems = [
    {
      icon: Package,
      label: "My Orders",
      href: "/orders",
      badge: "12",
      action: () => router.push("/orders"),
    },
    {
      icon: Heart,
      label: "My Wishlist",
      href: "/wishlist",
      badge: "5",
      action: () => router.push("/wishlist"),
    },
    {
      icon: Truck,
      label: "Track Order",
      href: "/track",
      action: () => router.push("/track"),
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/payments",
      action: () => router.push("/payments"),
    },
    {
      icon: Gift,
      label: "My Coupons",
      href: "/coupons",
      badge: "3",
      action: () => router.push("/coupons"),
    },
    {
      icon: Star,
      label: "My Reviews",
      href: "/reviews",
      action: () => router.push("/reviews"),
    },
  ];

  const settingsItems = [
    {
      icon: User,
      label: "Profile Information",
      href: "/profile",
      action: () => setIsEditing(!isEditing),
    },
    {
      icon: MapPin,
      label: "Manage Addresses",
      href: "/addresses",
      action: () => router.push("/addresses"),
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      href: "/privacy",
      action: () => router.push("/privacy"),
    },
    {
      icon: Settings,
      label: "Account Settings",
      href: "/settings",
      action: () => router.push("/settings"),
    },
    {
      icon: HelpCircle,
      label: "Help Center",
      href: "/contact",
      action: () => router.push("/contact"),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border bg-background/80">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground text-lg">
                  {userData.name || "Guest"}
                </h2>
                <p className="text-sm text-muted-foreground truncate">
                  {userData.email}
                </p>
                <Separator className="my-4" />
                <div className="text-left space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Orders</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wishlist</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loyalty Points</span>
                    <span className="font-medium text-primary">450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-background/80">
              <CardContent className="p-4 space-y-2">
                <button
                  onClick={() => router.push("/track")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <span>Track Order</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/contact")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <span>Help Center</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-border bg-background/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hello,</p>
                    <h1 className="text-2xl font-bold text-foreground">
                      {userData.name || "Guest"}
                    </h1>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                {isEditing && (
                  <div className="mt-6 p-4 border border-border rounded-xl space-y-4">
                    <h3 className="font-medium text-foreground">Edit Your Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full mt-1 px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="p-4 bg-background/80 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      {item.badge && (
                        <p className="text-xs text-muted-foreground">
                          {item.badge} items
                        </p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            <Card className="border-border bg-background/80">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 px-2">
                  Account Settings
                </h3>
                <div className="space-y-1">
                  {settingsItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-background/80">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-medium text-foreground">No orders yet</p>
                <p className="text-sm text-muted-foreground">
                  Start shopping to see your orders here
                </p>
                <Button
                  className="mt-4 bg-primary text-white hover:bg-primary/90"
                  onClick={() => router.push("/shop")}
                >
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}