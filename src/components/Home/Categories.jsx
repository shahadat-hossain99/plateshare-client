"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Pizza,
  Coffee,
  Salad,
  Beef,
  Cake,
  Utensils,
  Flame,
  Egg,
  Croissant,
  Sandwich,
  Fish,
  Leaf,
  Citrus,
  Cookie,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Container from "@/components/UI/Container";

// --- HARDCODED CATEGORIES ---
const categories = [
  {
    name: "Italian",
    icon: Pizza,
    color: "from-red-400 to-orange-400",
    count: 124,
  },
  {
    name: "Asian",
    icon: Utensils,
    color: "from-cyan-400 to-blue-400",
    count: 89,
  },
  {
    name: "Mexican",
    icon: Egg,
    color: "from-yellow-400 to-orange-400",
    count: 67,
  },
  {
    name: "Bengali",
    icon: Fish,
    color: "from-teal-400 to-green-400",
    count: 95,
  },
  {
    name: "Mediterranean",
    icon: Citrus,
    color: "from-blue-400 to-indigo-400",
    count: 45,
  },
  {
    name: "Dessert",
    icon: Cake,
    color: "from-pink-400 to-rose-400",
    count: 210,
  },
  {
    name: "Vegan",
    icon: Leaf,
    color: "from-purple-400 to-indigo-400",
    count: 78,
  },
  {
    name: "Sichuan",
    icon: Flame,
    color: "from-orange-500 to-red-500",
    count: 56,
  },
  {
    name: "Chinese",
    icon: Cookie,
    color: "from-amber-500 to-yellow-500",
    count: 34,
  },
  {
    name: "Indian",
    icon: Flame,
    color: "from-red-500 to-amber-500",
    count: 102,
  },
  {
    name: "French",
    icon: Croissant,
    color: "from-rose-400 to-red-400",
    count: 45,
  },
  {
    name: "BBQ",
    icon: Beef,
    color: "from-orange-500 to-red-500",
    count: 76,
  },
  {
    name: "Fast Food",
    icon: Sandwich,
    color: "from-yellow-400 to-orange-400",
    count: 88,
  },
  {
    name: "Bakery",
    icon: Croissant,
    color: "from-amber-400 to-orange-400",
    count: 44,
  },
  {
    name: "Beverages",
    icon: Coffee,
    color: "from-indigo-400 to-purple-400",
    count: 38,
  },
  {
    name: "Healthy",
    icon: Salad,
    color: "from-green-400 to-emerald-400",
    count: 72,
  },
  {
    name: "Seafood",
    icon: Fish,
    color: "from-cyan-400 to-blue-400",
    count: 55,
  },
];

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function Categories() {
  const [showAll, setShowAll] = useState(false);

  const toggleCategories = () => {
    setShowAll(!showAll);
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 6);
  const hasMore = categories.length > 6;

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        {/* Header matching design system */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block h-1 rounded-full bg-[var(--primary)]"
            />
            <span className="text-xs font-semibold uppercase tracking-[3px] text-[var(--primary)]">
              Taste By Category
            </span>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block h-1 rounded-full bg-[var(--primary)]"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-[var(--dark)]"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Cuisines
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-3 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            Find your next favorite meal by exploring our diverse culinary
            categories.
          </motion.p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          key={showAll ? "expanded" : "collapsed"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6"
        >
          {displayedCategories.map((category) => {
            const IconComponent = category.icon;

            return (
              <Link
                key={category.name}
                href={`/recipes?cuisine=${encodeURIComponent(category.name)}`}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-xl cursor-pointer h-full"
                >
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${category.color} p-3 text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    {category.count} Recipes
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* "See More / See Less" Button */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={toggleCategories}
              className="flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-white px-6 py-3 text-sm font-medium text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-white hover:shadow-lg"
            >
              {showAll ? (
                <>
                  See Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  See More Cuisines <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
