"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Star,
  Clock,
  Users,
  Flame,
  ChefHat,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

// Framer Motion Variants for Staggered Children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const Hero = () => {
  // Your exact local images
  const imagePool = [
    "/banner/hero-01.jpg",
    "/banner/hero-02.jpg",
    "/banner/hero-03.jpg",
    "/banner/hero-04.jpg",
    "/banner/hero-05.jpg",
    "/banner/hero-06.jpg",
    "/banner/hero-07.jpg",
    "/banner/hero-09.jpg",
    "/banner/hero-10.jpg",
  ];

  const trendingIngredients = [
    "Chicken",
    "Garlic",
    "Pasta",
    "Olive Oil",
    "Tomato",
    "Basil",
    "Parmesan",
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-50/70 via-white to-amber-50/60 overflow-hidden min-h-[80vh] flex items-center py-1 ">
      {/* 1. ANIMATED AMBIENT BACKGROUND BLOBS (Spice/Food Colors) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-red-200/35 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl"
        />
      </div>

      {/* 2. DRIFTING FOOD PATTERN BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none z-0">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ["0px 0px", "160px 120px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-40 40 Q 20 10, 80 40 T 200 40' stroke='%23c0522d' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-40 80 Q 20 50, 80 80 T 200 80' stroke='%23c0522d' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-40 0 Q 20 -30, 80 0 T 200 0' stroke='%23c0522d' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-40 120 Q 20 90, 80 120 T 200 120' stroke='%23c0522d' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E`,
          }}
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-12 py-12 xl:grid-cols-2 xl:py-20 xl:gap-16">
          {/* LEFT: Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center w-full max-w-3xl xl:max-w-none mx-auto xl:mx-0 min-w-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--dark)] shadow-xs backdrop-blur-xs">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                Your Ultimate Recipe Hub
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-4xl font-extrabold leading-[1.3] text-[var(--dark)] sm:text-5xl md:text-6xl xl:text-7xl tracking-tight"
            >
              Cook Smarter,
              <br />
              Eat Better With
              <span className="relative inline-block sm:ml-3 mt-2 sm:mt-0">
                <span className="relative z-10 text-white px-3">
                  PlateShare.
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: "circOut" }}
                  className="absolute inset-0 z-0 bg-[var(--primary)] rounded-2xl origin-left scale-105 -rotate-1 shadow-md"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg max-w-xl"
            >
              Discover authentic meals cooked by home chefs. Build functional
              dynamic menus, optimize your weekly grocery checklists, and map
              out your health goals accurately.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-row gap-4"
            >
              <Link href="/recipes">
                <Button
                  variant="primary"
                  className="shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all duration-300"
                >
                  Explore Recipes
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link href="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </motion.div>

            {/* Trending Ingredients Marquee (Replaced "Partners") */}
            <motion.div
              variants={itemVariants}
              className="mt-12 border-t border-gray-100 pt-8 w-full max-w-xl overflow-hidden min-w-0"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-5">
                Trending Ingredients Right Now:
              </p>

              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <motion.div
                  className="flex gap-8 items-center w-max pr-8"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                  }}
                >
                  {[...Array(2)].map((_, setIdx) => (
                    <div
                      key={setIdx}
                      className="flex items-center gap-8 text-gray-500 shrink-0"
                    >
                      {trendingIngredients.map((ingredient, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 tracking-wide text-xs font-bold hover:text-[var(--primary)] transition-colors duration-200"
                        >
                          <ChefHat className="w-4 h-4 text-[var(--secondary)]" />
                          <span>{ingredient}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Image Mosaic Section (Using your local images) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl mx-auto xl:max-w-none h-[420px] sm:h-[480px] md:h-[520px] xl:h-[560px]"
          >
            {/* Main Application Mock Container */}
            <div className="relative w-full h-full flex flex-col rounded-3xl border border-gray-100 bg-white/70 p-4 shadow-2xl backdrop-blur-md">
              {/* UNIQUE: Nutritional Macros Header (Replaced Browser Dots) */}
              <div className="flex items-center justify-between pb-4 px-1 border-b border-gray-100/80 mb-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                    PlateShare
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500" /> 450 Cal
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>{" "}
                    28g Protein
                  </div>
                </div>
              </div>

              {/* Grid Dashboard Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-4 flex-1 min-h-0 overflow-hidden">
                {/* Left Large Column */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-md min-h-[180px] sm:min-h-0"
                >
                  <Image
                    src={imagePool[0]}
                    alt="Featured recipe main dish"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* UNIQUE: Cooking Filters Widget inside Image Frame (Replaced Location/Date) */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between rounded-xl border border-white/20 bg-white/95 p-2 shadow-lg backdrop-blur-md text-[11px] font-medium">
                    <div className="flex items-center gap-1 text-gray-500 border-r border-gray-100 pr-1.5 flex-1 justify-center">
                      <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span>25 min</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 border-r border-gray-100 px-1.5 flex-1 justify-center">
                      <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span>4 Servings</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-[var(--dark)] pl-1.5 flex-1 justify-center">
                      <ChefHat className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span>Easy</span>
                    </div>
                  </div>
                </motion.div>

                {/* Vertical Stack Right Column (Using your local images) */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-xs aspect-square sm:aspect-auto"
                  >
                    <Image
                      src={imagePool[1]}
                      alt="Side dish recipe"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 15vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-2xl overflow-hidden shadow-xs aspect-square sm:aspect-auto"
                  >
                    <Image
                      src={imagePool[2]}
                      alt="Dessert or side dish"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 15vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Overlapping Absolute Rating Badge Component */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex absolute -bottom-5 right-8 items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-xl border border-gray-100"
            >
              <span className="text-xs font-bold text-[var(--dark)]">
                Community Favorite
              </span>
              <div className="flex items-center gap-0.5 border-l border-gray-200 pl-3">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
