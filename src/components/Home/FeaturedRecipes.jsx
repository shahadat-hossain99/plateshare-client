"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Tag, ArrowRight } from "lucide-react";
import Container from "@/components/UI/Container";
import { serverFetch } from "@/lib/core/server";

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -6,
    transition: { duration: 0.3 },
  },
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop";

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFeaturedRecipes = async () => {
      try {
        const res = await serverFetch("/api/recipes/featured");
        if (res?.success && Array.isArray(res.data)) {
          setRecipes(res.data);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error("Failed to load featured recipes:", err);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    getFeaturedRecipes();
  }, []);

  // Placeholder static cards if no recipes exist in DB
  const placeholders = Array.from({ length: 4 }, (_, i) => ({
    _id: `placeholder-${i + 1}`,
    isPlaceholder: true,
    title: "Coming Soon",
    description: "Share your culinary creation to get featured right here!",
    cookTime: 0,
    servings: 0,
    difficulty: "Easy",
    cuisineTags: ["Community"],
    image: DEFAULT_IMAGE,
  }));

  const displayList = recipes.length > 0 ? recipes : placeholders;

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        {/* About Page Inspired Title Section */}
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
              Trending Dishes
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
            Featured{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Recipes
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-3 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            Discover the latest mouth-watering meals crafted and curated by our
            community.
          </motion.p>
        </motion.div>

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-pulse flex flex-col"
              >
                <div className="h-48 w-full bg-gray-200 rounded-xl" />
                <div className="mt-4 h-5 w-3/4 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-full bg-gray-100 rounded" />
                <div className="mt-2 h-4 w-2/3 bg-gray-100 rounded" />
                <div className="mt-auto pt-4 flex justify-between">
                  <div className="h-4 w-1/3 bg-gray-200 rounded" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Main Cards Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {displayList.map((item) => {
              const isReal = !item.isPlaceholder;
              const recipeImg = item.image || DEFAULT_IMAGE;

              return (
                <motion.div
                  key={item._id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-xl flex flex-col justify-between"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex-1">
                    {/* Image Container */}
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={recipeImg}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Difficulty Flame Badge */}
                      {isReal && (
                        <div className="absolute top-2.5 right-2.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white flex items-center gap-1 shadow-sm">
                          <Flame
                            className={`w-3.5 h-3.5 ${
                              item.difficulty === "Easy"
                                ? "text-green-400"
                                : item.difficulty === "Medium"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }`}
                          />
                          {item.difficulty}
                        </div>
                      )}

                      {/* Primary Cuisine Tag Badge */}
                      {isReal &&
                        item.cuisineTags &&
                        item.cuisineTags.length > 0 && (
                          <div className="absolute top-2.5 left-2.5 rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-gray-800 flex items-center gap-1 shadow-sm">
                            <Tag className="w-2.5 h-2.5 text-[var(--primary)]" />
                            {item.cuisineTags[0]}
                          </div>
                        )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Meta Stats & Link */}
                  <div className="relative mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[var(--primary)]" />
                      <span>
                        {item.cookTime > 0 ? `${item.cookTime} min` : "TBD"}
                      </span>
                    </div>

                    {isReal ? (
                      <Link
                        href={`/recipes/${item._id}`}
                        className="inline-flex items-center gap-1 font-semibold text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                      >
                        View
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-medium">
                        Upcoming
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
