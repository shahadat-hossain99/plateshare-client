"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, ChefHat, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { motion } from "framer-motion";

import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
// Adjust this import to your actual BetterAuth client setup
import { signIn } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setErrors((prev) => ({
          ...prev,
          general:
            result.error.message || "Login failed. Please check credentials.",
        }));
        toast.error("Login failed", {
          description: result.error.message || "Invalid email or password",
        });
        return;
      }

      toast.success("🎉 Welcome back to PlateShare!", {
        description: "Redirecting you to your dashboard...",
        duration: 3000,
      });

      // Use the callbackUrl if present, otherwise go home
      const params = new URLSearchParams(window.location.search);
      const callbackUrl = params.get("callbackUrl") || "/";

      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        general: "An unexpected error occurred. Please try again.",
      }));
      toast.error("Login failed", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[var(--background)] via-white to-[var(--primary)]/10 py-12 flex items-center justify-center relative overflow-hidden mt-4">
      {/* Creative Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[var(--primary)]/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-[var(--secondary)]/10 blur-3xl"
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md"
        >
          {/* Unique Floating Chef Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto -mt-7 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl border-4 border-[var(--background)]"
          >
            <ChefHat className="h-10 w-10 text-[var(--primary)]" />
          </motion.div>

          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-[var(--primary)]" />
                <h1 className="text-3xl font-bold text-[var(--dark)]">
                  Welcome Back
                </h1>
                <Sparkles className="h-5 w-5 text-[var(--secondary)]" />
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Sign in to continue cooking and planning your weekly meals.
              </p>
            </div>

            {/* General Error - Inline */}
            {errors.general && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`pr-10 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/30 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm text-[var(--text-secondary)]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button - (Disabled for now as per your register logic) */}
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 text-sm font-medium text-[var(--dark)] opacity-60"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="font-semibold text-[var(--primary)] hover:underline transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default LoginPage;
