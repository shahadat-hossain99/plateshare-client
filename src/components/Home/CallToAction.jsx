"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Utensils,
  ChefHat,
  Users,
  Star,
  Sparkles,
  BookOpen,
} from "lucide-react";
import Container from "@/components/UI/Container";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 8,
    transition: { duration: 0.3 },
  },
};

export default function CallToAction() {
  return (
    <section className="relative w-full py-20 sm:py-32 overflow-hidden">
      {/* ✅ FIX 1: Use the EXACT same Gradient as your About Page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] z-0" />

      {/* ✅ FIX 2: The image is now a subtle background texture (opacity-10) just like About Page */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/banner/hero-01.jpg"
          alt="Culinary background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Ambient Glowing Orbs (Matches About page) */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--secondary)]/30 blur-3xl pointer-events-none z-0" />

      <Container className="relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl text-center text-white"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 shadow-sm backdrop-blur-md mb-6"
          >
            <Sparkles className="h-4 w-4 text-[var(--secondary)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Join the Culinary Community
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] shadow-lg shadow-[var(--primary)]/30"
          >
            <ChefHat className="h-8 w-8 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.15]"
          >
            Ready to Share Your{" "}
            <span className="bg-gradient-to-r from-[var(--secondary)] to-amber-300 bg-clip-text text-transparent">
              Culinary Magic?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with thousands of home cooks. Share your secret recipes,
            plan daily meals, and discover unforgettable flavors from around the
            world.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/recipes" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[var(--secondary)] text-white px-8 py-3.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Explore Recipes
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>

            <Link href="/add-recipe" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 hover:border-white/40 transition-all"
              >
                <Utensils className="h-4 w-4 text-[var(--secondary)]" />
                Add Your Recipe
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80">
              <Users className="h-4 w-4 text-[var(--secondary)] flex-shrink-0" />
              <span>
                <strong className="text-white">12,000+</strong> Food Lovers
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80">
              <BookOpen className="h-4 w-4 text-[var(--secondary)] flex-shrink-0" />
              <span>
                <strong className="text-white">4,500+</strong> Shared Recipes
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/80">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400 flex-shrink-0" />
              <span>
                <strong className="text-white">4.9/5</strong> Community Rating
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
