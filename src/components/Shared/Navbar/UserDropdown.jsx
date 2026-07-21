"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  LogOut,
  PlusCircle,
  CalendarDays,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      const loadingToast = toast.loading("Logging out...");
      await signOut({});
      toast.dismiss(loadingToast);
      toast.success("👋 Logged out successfully", { duration: 3000 });
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "My Cookbook", href: "/my-cookbook", icon: BookOpen },
    { name: "Add Recipe", href: "/add-recipe", icon: PlusCircle },
    { name: "Meal Planner", href: "/meal-planner", icon: CalendarDays },
  ];

  const userInitial = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative z-50 flex items-center" ref={dropdownRef}>
      {/* Avatar Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
        className="group flex items-center gap-2 rounded-full border border-gray-100 bg-white/80 p-1.5 pr-3 shadow-sm backdrop-blur-md transition-all hover:border-[var(--primary)]/30 hover:bg-white hover:shadow-md"
      >
        <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 text-xs font-bold text-[var(--primary)] ring-2 ring-[var(--primary)]/20 transition-transform group-hover:scale-105">
          {user.image && !imgError ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              fill
              sizes="32px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>

        <span className="hidden text-xs font-semibold text-[var(--dark)] md:inline-block max-w-[100px] truncate">
          {user.name?.split(" ")[0]}
        </span>

        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen
              ? "rotate-180 text-[var(--primary)]"
              : "group-hover:text-gray-600"
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5"
          >
            {/* User Details Box */}
            <div className="flex items-center gap-3 rounded-xl bg-orange-50/50 p-3 mb-1">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-sm font-bold text-white shadow-sm">
                {user.image && !imgError ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User avatar"}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <span>{userInitial}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[var(--dark)] truncate">
                  {user.name}
                </p>
                <p className="text-xs text-[var(--text-secondary)] truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5 py-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[var(--primary)] text-white shadow-sm shadow-[var(--primary)]/30"
                        : "text-gray-600 hover:bg-gray-100/80 hover:text-[var(--dark)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-[var(--primary)]"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {isActive && <Sparkles className="h-3 w-3 text-white/80" />}
                  </Link>
                );
              })}
            </div>

            {/* Logout Action */}
            <div className="mt-1 border-t border-gray-100 pt-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
