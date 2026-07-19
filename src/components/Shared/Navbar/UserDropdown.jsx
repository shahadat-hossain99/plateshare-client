"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  User,
  LogOut,
  Home,
  PlusCircle,
  CalendarDays,
  BookOpen,
} from "lucide-react";

import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      }, 1000);
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "My Cookbook", href: "/my-cookbook", icon: BookOpen },
    { name: "Add Recipe", href: "/add-recipe", icon: PlusCircle },
    { name: "Meal Planner", href: "/meal-planner", icon: CalendarDays },
  ];

  return (
    <div className="relative z-50 flex items-center gap-2" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label="User menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full bg-[var(--secondary)]/10 px-3 py-2 transition hover:bg-[var(--secondary)]/20 hover:shadow-md hover:shadow-[var(--secondary)]/20"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              fill
              sizes="32px"
              className="object-cover"
              onError={(e) => {
                const target = e.target;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("span");
                  fallback.className =
                    "flex h-full w-full items-center justify-center text-sm font-medium text-gray-600 bg-gray-200";
                  fallback.textContent =
                    user.name?.charAt(0).toUpperCase() || "U";
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600 bg-gray-200">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Logout Button - Outside Dropdown */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-300"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className="border-b px-4 py-3">
          <p className="font-semibold text-[var(--dark)] truncate">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>

        <div className="p-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`h-4 w-4 ${isActive ? "text-[var(--primary)]" : "text-gray-400"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t p-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
