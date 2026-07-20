"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
  Camera,
  CheckCircle,
  LogOut,
  Bell,
  Award,
  TrendingUp,
  Wallet,
  Share2,
  FileText,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    joinDate: "",
    loyaltyPoints: 450,
    totalOrders: 12,
    wishlistCount: 5,
    memberSince: "2025",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  // Create or update user profile
  const upsertUserProfile = async (userId: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          { 
            id: userId, 
            ...updates,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error upserting profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setIsLoggedIn(true);

      // Fetch user profile from profiles table
      const profileData = await fetchUserProfile(user.id);
      
      if (profileData) {
        setProfile(profileData);
        const name = profileData.full_name || "";
        const email = user.email || "";
        const phone = profileData.phone || "";
        const avatar = profileData.avatar_url || "";
        const address = localStorage.getItem("userAddress") || "Imphal, Manipur, India";
        const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : "2025";

        setUserData({
          name,
          email,
          phone,
          address,
          avatar,
          joinDate,
          loyaltyPoints: profileData.loyalty_points || 450,
          totalOrders: 12,
          wishlistCount: 5,
          memberSince: "2025",
        });
        setFormData({ name, email, phone, address });
      } else {
        // If no profile exists, create one with metadata
        const name = user.user_metadata?.full_name || "";
        const email = user.email || "";
        const phone = user.user_metadata?.phone || "";
        const avatar = user.user_metadata?.avatar_url || "";
        const address = localStorage.getItem("userAddress") || "Imphal, Manipur, India";
        const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : "2025";

        // Create profile in database
        try {
          const newProfile = await upsertUserProfile(user.id, {
            full_name: name,
            phone: phone,
            avatar_url: avatar,
            loyalty_points: 450,
          });
          setProfile(newProfile);
        } catch (error) {
          console.error('Failed to create profile:', error);
        }

        setUserData({
          name,
          email,
          phone,
          address,
          avatar,
          joinDate,
          loyaltyPoints: 450,
          totalOrders: 12,
          wishlistCount: 5,
          memberSince: "2025",
        });
        setFormData({ name, email, phone, address });
      }

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
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      // Update profile in Supabase
      await upsertUserProfile(user.id, {
        full_name: formData.name,
        phone: formData.phone,
      });

      // Update local state
      setUserData((prev) => ({
        ...prev,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      }));
      
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Profile Picture Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Update profile in database with avatar URL
      await upsertUserProfile(user.id, {
        avatar_url: publicUrl,
      });

      // Update local state
      setUserData((prev) => ({ ...prev, avatar: publicUrl }));
      toast.success('Profile picture updated!');
    } catch (error: any) {
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!userData.avatar || !user) return;

    try {
      // Remove avatar from profile
      await upsertUserProfile(user.id, {
        avatar_url: null,
      });

      setUserData((prev) => ({ ...prev, avatar: "" }));
      toast.success('Profile picture removed');
    } catch (error: any) {
      toast.error('Failed to remove profile picture: ' + error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    {
      icon: Package,
      label: "My Orders",
      href: "/orders",
      badge: userData.totalOrders.toString(),
      action: () => router.push("/orders"),
    },
    {
      icon: Heart,
      label: "My Wishlist",
      href: "/wishlist",
      badge: userData.wishlistCount.toString(),
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
    {
      icon: Wallet,
      label: "Wallet",
      href: "/wallet",
      action: () => router.push("/wallet"),
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/notifications",
      badge: "4",
      action: () => router.push("/notifications"),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
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
                {/* Profile Picture with Upload */}
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-2 ring-primary/20">
                    {userData.avatar ? (
                      <Image
                        src={userData.avatar}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  
                  {/* Upload Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full border-2 border-background hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* Remove Avatar Button */}
                {userData.avatar && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="text-xs text-destructive hover:underline mb-2 block mx-auto"
                  >
                    Remove photo
                  </button>
                )}

                <h2 className="font-semibold text-foreground text-lg">
                  {userData.name || "Guest"}
                </h2>
                <p className="text-sm text-muted-foreground truncate">
                  {userData.email}
                </p>
                
                {/* Loyalty Badge */}
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  <Crown className="h-3 w-3" />
                  <span>Gold Member</span>
                </div>

                <Separator className="my-4" />
                
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Sidebar Menu */}
            <Card className="border-border bg-background/80">
              <CardContent className="p-4 space-y-1">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Profile Information</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/addresses")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Manage Addresses</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/privacy")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Privacy & Security</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/settings")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/contact")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Help Center</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/terms")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Terms & Conditions</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => router.push("/refer")}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span>Refer a Friend</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <Card className="border-border bg-background/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hello,</p>
                    <h1 className="text-2xl font-bold text-foreground">
                      {userData.name || "Guest"} 👋
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Welcome back to HillVogue
                    </p>
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
                        <CheckCircle className="h-4 w-4 mr-2" />
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

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-border bg-background/80">
                <CardContent className="p-4 text-center">
                  <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userData.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background/80">
                <CardContent className="p-4 text-center">
                  <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userData.wishlistCount}</p>
                  <p className="text-xs text-muted-foreground">Wishlist</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background/80">
                <CardContent className="p-4 text-center">
                  <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userData.loyaltyPoints}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-background/80">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">₹0</p>
                  <p className="text-xs text-muted-foreground">Saved</p>
                </CardContent>
              </Card>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

            {/* Quick Actions */}
            <Card className="border-border bg-background/80">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-medium text-foreground">Explore Our Collection</p>
                <p className="text-sm text-muted-foreground">
                  Discover authentic tribal fashion from Manipur
                </p>
                <div className="flex gap-3 justify-center mt-4">
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={() => router.push("/shop")}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Start Shopping
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/wishlist")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    View Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}