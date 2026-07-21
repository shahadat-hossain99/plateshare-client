"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/UI/Container";
// import RecipeCard from "@/components/RecipeCard"; // Adjust import path as needed
import { serverFetch } from "@/lib/core/server";
import RecipeCard from "../Recipe/RecipeCard";

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
        {/* Title Section */}
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
          /* Main Cards Grid using RecipeCard */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {displayList.map((item) => (
              <RecipeCard key={item._id} recipe={item} />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
