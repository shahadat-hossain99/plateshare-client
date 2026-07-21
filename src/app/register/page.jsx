"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, ChefHat } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { motion } from "framer-motion";

import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import ImageUpload from "@/components/UI/ImageUpload";
// Adjust this import to your actual BetterAuth client setup
import { signUp } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [success, setSuccess] = useState("");

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 6) errors.push("at least 6 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");

    return errors;
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
      general: "",
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "Photo is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(", ")}`;
        isValid = false;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (
      formData.password &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
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
    if (success) setSuccess("");
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsLoading(true);
    setErrors({
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
      general: "",
    });
    setSuccess("");

    try {
      const result = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.image,
      });

      if (result.error) {
        setErrors((prev) => ({
          ...prev,
          general: result.error.message || "Registration failed",
        }));
        toast.error("Registration failed", {
          description: result.error.message || "Please try again",
        });
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      toast.success("🎉 Registration successful!", {
        description: "Please check your email to verify your account.",
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        general: "Registration failed. Please try again.",
      }));
      toast.error("Registration failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[var(--background)] via-white to-[var(--secondary)]/10 py-12 flex items-center justify-center relative overflow-hidden mt-4">
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
          {/* <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto -mt-16 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl border-4 border-[var(--background)]"
          >
            <ChefHat className="h-10 w-10 text-[var(--primary)]" />
          </motion.div> */}

          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-[var(--dark)]">
                Join PlateShare
              </h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Start cooking smarter and planning better today.
              </p>
            </div>

            {/* Success & Error Inline Messages */}
            {success && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {errors.general && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Profile Photo - Your Reusable Component */}
              <div>
                <ImageUpload
                  label="Profile Photo"
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                  required={true}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Name Field */}
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

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
                    placeholder="Create password"
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
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">
                    Minimum 6 characters with uppercase & lowercase letters.
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <Input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
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
                    Creating Account...
                  </span>
                ) : (
                  "Register"
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

            {/* Google Button */}
            <button
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 text-sm font-medium text-[var(--dark)] opacity-60"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--primary)] hover:underline transition"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default RegisterPage;
