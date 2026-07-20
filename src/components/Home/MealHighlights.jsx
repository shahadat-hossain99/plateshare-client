"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Clock, ArrowUpRight } from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";

const highlights = [
  {
    src: "/banner/hero-01.jpg",
    alt: "Fluffy Buttermilk Pancakes",
    time: "20m",
    likes: "1.4k",
  },
  {
    src: "/banner/hero-03.jpg",
    alt: "Citrus Garden Salad",
    time: "15m",
    likes: "2.3k",
  },
  {
    src: "/banner/hero-06.jpg",
    alt: "Decadent Chocolate Tart",
    time: "40m",
    likes: "1.8k",
  },
  {
    src: "/banner/hero-02.jpg",
    alt: "Herb Grilled Chicken",
    time: "45m",
    likes: "982",
  },
  {
    src: "/banner/hero-04.jpg",
    alt: "Pan-Seared Sea Bass",
    time: "30m",
    likes: "654",
  },
  {
    src: "/banner/hero-07.jpg",
    alt: "Artisan Tomato Pasta",
    time: "25m",
    likes: "3.1k",
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const MealHighlights = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] overflow-hidden">
      <Container>
        <SectionTitle
          title="Trending Meals"
          subtitle="Explore the most loved recipes from our community right now."
          center={true}
          withAnimation={true}
        />

        {/* Fixed: Replaced column-masonry with a stable CSS Grid layout */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Container with Fixed Aspect Ratio to prevent distortion */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 3}
                />

                {/* Floating Time Label */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-gray-700 shadow-xs">
                    <Clock className="w-3 h-3 text-[var(--primary)]" />{" "}
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Card Information Footer */}
              <div className="p-5 bg-white flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-[var(--primary)] transition-colors duration-300 line-clamp-2">
                      {item.alt}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>

                {/* Lower Action Info Panel */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider group-hover:text-[var(--primary)] transition-colors">
                    View Recipe
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-bold bg-gray-50 px-2.5 py-1 rounded-full">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default MealHighlights;
