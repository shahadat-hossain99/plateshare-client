"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";
import MobileDrawer from "./MobileDrawer";

const Navbar = ({ user }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = !!user;

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "About", href: "/about" },
  ];

  const privateLinks = [
    { name: "Add Recipe", href: "/add-recipe" },
    { name: "My Cookbook", href: "/my-cookbook" },
    { name: "Meal Planner", href: "/meal-planner", badge: "Beta" },
  ];

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-4 z-50 w-full transition-all duration-500 ease-in-out">
      {/* 
        The Container handles:
        1. max-w-7xl
        2. mx-auto (centering)
        3. px-4 md:px-6 lg:px-8
      */}
      <Container>
        <nav
          className={`relative flex items-center justify-between rounded-full border transition-all duration-500 ease-in-out ${
            isScrolled
              ? "h-16 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl border-white/40"
              : "h-20 bg-white/70 shadow-sm backdrop-blur-md border-white/50"
          }`}
        >
          {/* Inner Gradient Glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5" />

          <div className="flex w-full items-center justify-between px-4 md:px-6 lg:px-8">
            {/* Logo */}
            <Logo isScrolled={isScrolled} />

            {/* Desktop Menu */}
            <div className="hidden items-center gap-2 lg:flex">
              {links.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      active
                        ? "bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm"
                        : "text-gray-600 hover:bg-gray-100/80 hover:text-[var(--dark)]"
                    }`}
                  >
                    {link.name}

                    {/* Premium Badge */}
                    {link.badge && (
                      <span className="absolute -top-1.5 -right-2 rounded-full bg-[var(--primary)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {link.badge}
                      </span>
                    )}

                    {/* Animated Dot */}
                    <span
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--primary)] transition-all duration-300 ${
                        active
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Configurations */}
            <div className="hidden items-center gap-3 lg:flex">
              {isLoggedIn ? (
                <UserDropdown user={user} />
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-gray-200 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="secondary"
                      className="bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-md shadow-[var(--primary)]/20"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Drawer Trigger */}
            <div className="flex lg:hidden">
              <MobileDrawer isLoggedIn={isLoggedIn} user={user} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
