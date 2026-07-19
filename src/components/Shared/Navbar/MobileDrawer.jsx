/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  PlusCircle,
  CalendarDays,
  User,
  LogOut,
  BookOpen,
  Heart,
} from "lucide-react";
import { BsInfoLg } from "react-icons/bs";

import Button from "@/components/UI/Button";
import { signOut } from "@/lib/auth-client";

const MobileDrawer = ({ isLoggedIn = false, user = null }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const mainLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Recipes", href: "/recipes", icon: BookOpen },
    { name: "About", href: "/about", icon: BsInfoLg },
  ];

  const actionLinks = [
    { name: "Add Recipe", href: "/add-recipe", icon: PlusCircle },
    { name: "My Cookbook", href: "/my-cookbook", icon: Heart },
    {
      name: "Meal Planner",
      href: "/meal-planner",
      icon: CalendarDays,
      badge: "Beta",
    },
  ];

  const accountLinks = [{ name: "Profile", href: "/profile", icon: User }];

  const isActiveLink = (href) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  // Mount logic for client-side portals
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-close on routing
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle body element scroll locking
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      setOpen(false);
      await signOut({});
      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <div className="lg:hidden">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
      >
        <Menu size={22} />
      </button>

      {/* Render overlay and drawer out of Navbar stack using portal */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop Overlay */}
            <div
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
                open
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            />

            {/* Sliding Navigation Panel */}
            <div
              className={`fixed right-0 top-0 z-[101] flex h-screen w-full max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b px-5 py-4">
                <h2 className="text-lg font-bold text-[var(--dark)]">
                  Navigation
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Middle Content View */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Discover Links */}
                <div className="space-y-1">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Discover
                  </p>
                  {mainLinks.map((link) => {
                    const active = isActiveLink(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
                          active
                            ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <link.icon
                          className={`h-4 w-4 ${active ? "text-[var(--primary)]" : "text-gray-400"}`}
                        />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Manage Links */}
                {isLoggedIn && (
                  <div className="space-y-1">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Manage
                    </p>
                    {actionLinks.map((link) => {
                      const active = isActiveLink(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
                            active
                              ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <link.icon
                            className={`h-4 w-4 ${active ? "text-[var(--primary)]" : "text-gray-400"}`}
                          />
                          <span>{link.name}</span>
                          {link.badge && (
                            <span className="ml-auto rounded-full bg-[var(--primary)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Account Links */}
                {isLoggedIn && (
                  <div className="space-y-1">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Account
                    </p>
                    {accountLinks.map((link) => {
                      const active = isActiveLink(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition font-medium text-sm ${
                            active
                              ? "bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <link.icon
                            className={`h-4 w-4 ${active ? "text-[var(--primary)]" : "text-gray-400"}`}
                          />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer View Panel */}
              <div className="border-t bg-gray-50/70 p-4">
                {isLoggedIn && user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src={
                            user.image ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              user.name || "User",
                            )}`
                          }
                          alt={user.name || "User profile avatar"}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="truncate font-semibold text-sm text-[var(--dark)]">
                          {user.name}
                        </h3>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="w-full"
                    >
                      <Button variant="secondary" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
};

export default MobileDrawer;
