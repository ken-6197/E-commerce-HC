"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (data.user) {
      // Save user data from Supabase metadata
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", data.user.email || "");
      localStorage.setItem("userName", data.user.user_metadata?.full_name || "");
      localStorage.setItem("userPhone", data.user.user_metadata?.phone || "");
      router.push("/");
    }

    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: "google" | "facebook" | "linkedin") => {
    setSocialLoading(provider);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setSocialLoading(null);
        return;
      }

      // Store the provider for callback handling
      localStorage.setItem("oauthProvider", provider);
      
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`Failed to login with ${provider.charAt(0).toUpperCase() + provider.slice(1)}. Please try again.`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 to-accent/5 px-4 py-12">
      <Card className="w-full max-w-lg shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-4xl font-bold">Welcome Back</CardTitle>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 py-6 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading || socialLoading !== null}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
              aria-label="Login with Google"
            >
              {socialLoading === "google" ? (
                <div className="w-8 h-8 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaGoogle className="h-8 w-8 text-[#4285F4]" />
              )}
            </button>
            
            <button
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading || socialLoading !== null}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
              aria-label="Login with Facebook"
            >
              {socialLoading === "facebook" ? (
                <div className="w-8 h-8 border-2 border-[#1877F2] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaFacebook className="h-8 w-8 text-[#1877F2]" />
              )}
            </button>
            
            <button
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading || socialLoading !== null}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
              aria-label="Login with LinkedIn"
            >
              {socialLoading === "linkedin" ? (
                <div className="w-8 h-8 border-2 border-[#0A66C2] border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaLinkedin className="h-8 w-8 text-[#0A66C2]" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}