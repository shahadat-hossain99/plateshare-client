"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Utensils,
  Salad,
  ChefHat,
  Clock,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Logo from "../Navbar/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Browse Recipes", href: "/recipes" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Meal Planning Tips", href: "/tips" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebook, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Twitter", icon: BsTwitterX, href: "#" },
    { name: "Youtube", icon: FaYoutube, href: "#" },
  ];

  const features = [
    { icon: Utensils, text: "500+ Home Recipes" },
    { icon: ChefHat, text: "Easy Weekly Meal Plans" },
    { icon: Salad, text: "Healthy & Tasty" },
    { icon: Clock, text: "Cook in Under 30 Mins" },
  ];

  return (
    <footer className="bg-[var(--dark)] text-white/80">
      <Container>
        <div className="py-16">
          {/* Main Structural Grid */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand & Features Area */}
            <div className="md:col-span-2 lg:col-span-2 space-y-6">
              <div>
                <Logo isScrolled={false} />
              </div>

              <p className="text-sm leading-relaxed text-white/60 max-w-sm">
                Cook smarter, plan better. Discover delicious recipes from real
                home cooks, save your favorites, and build your weekly menu in
                minutes with PlateShare.
              </p>

              {/* Minimalist Feature Badges */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-white/90"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--primary)]">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium tracking-tight">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Channels */}
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="rounded-full bg-white/5 p-2.5 text-white/60 transition-all hover:bg-[var(--primary)] hover:text-white hover:scale-105"
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Link Column: Navigation */}
            <div className="lg:pl-6">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-[var(--primary)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link Column: Support */}
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                Support
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-[var(--primary)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Section: Newsletter & Contact info */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
                  Weekly Meal Digest
                </h3>
                <p className="mb-4 text-sm text-white/60 leading-normal">
                  Get the top recipes and meal planning tips delivered weekly!
                </p>
                <form
                  className="space-y-2.5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-4xl bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 border border-white/10 transition focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    required
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    Get Updates
                  </Button>
                </form>
              </div>

              {/* Direct Touch Directory */}
              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex items-center gap-2.5 text-xs text-white/50">
                  <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <a
                    href="mailto:hello@plateshare.com"
                    className="hover:text-white transition"
                  >
                    hello@plateshare.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/50">
                  <Phone className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-white transition"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Underbar Copyright Area */}
      <div className="border-t border-white/5 bg-black/10">
        <Container>
          <div className="flex flex-col items-center justify-between py-6 md:flex-row gap-4">
            <p className="text-xs text-white/40 tracking-wide text-center md:text-left">
              &copy; {currentYear} PlateShare. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-white/40">
              <Link
                href="/privacy"
                className="hover:text-[var(--primary)] transition"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[var(--primary)] transition"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-[var(--primary)] transition"
              >
                Sitemap
              </Link>
              <span className="inline-flex items-center gap-1 text-white/30 border-l border-white/10 pl-6 hidden sm:inline-flex">
                Made with{" "}
                <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />{" "}
                by PlateShare
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
