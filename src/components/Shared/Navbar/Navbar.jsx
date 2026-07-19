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
    { name: "Meal Planner", href: "/meal-planner" },
  ];

  const links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "border-gray-200/80 shadow-md"
          : "border-gray-200/50 shadow-sm"
      }`}
    >
      <Container>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Logo isScrolled={isScrolled} />

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-colors duration-200 hover:text-[var(--primary)] ${
                    active ? "text-[var(--primary)]" : "text-gray-600"
                  } group`}
                >
                  {link.name}
                  {/* Animated Accent Line */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[var(--primary)] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Configurations */}
          <div className="hidden lg:flex">
            {isLoggedIn ? (
              <UserDropdown user={user} />
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <MobileDrawer isLoggedIn={isLoggedIn} user={user} />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
