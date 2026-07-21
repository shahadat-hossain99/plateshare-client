"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChefHat,
  ArrowLeft,
  UtensilsCrossed,
  Search,
  Compass,
} from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--background)] py-20">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] text-gray-200/60 dark:text-white/5"
        >
          <UtensilsCrossed className="h-20 w-20" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-[12%] text-gray-200/60 dark:text-white/5"
        >
          <Compass className="h-24 w-24" />
        </motion.div>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)]"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Error 404 • Missing Recipe</span>
          </motion.div>

          {/* Animated Chef Badge */}
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--primary)]/30"
            />

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white shadow-xl shadow-[var(--primary)]/25"
            >
              <ChefHat className="h-10 w-10" />
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-black tracking-tight text-[var(--dark)] sm:text-6xl">
            Dish Not Found!
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg leading-relaxed max-w-lg mx-auto">
            Looks like this page got burnt or misplaced from our menu.
            Don&apos;t worry, let&apos;s get you back to something delicious.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full shadow-lg shadow-[var(--primary)]/25 hover:scale-105 transition-transform"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>

            <Link href="/recipes" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-gray-200 text-[var(--dark)] hover:bg-gray-100/80 hover:scale-105 transition-transform"
              >
                <Search className="mr-2 h-4 w-4 text-[var(--primary)]" />
                Explore Recipes
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
