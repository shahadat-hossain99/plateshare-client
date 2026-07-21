"use client";

import { motion } from "framer-motion";
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
  Coffee as CoffeeIcon,
} from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";
import Link from "next/link";

// --- HARDCODED CATEGORIES FROM YOUR MAP ---
// These perfectly match your dropdown filters and icon/color map
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
  { name: "BBQ", icon: Beef, color: "from-orange-500 to-red-500", count: 76 },
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
    icon: CoffeeIcon,
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
    transition: { staggerChildren: 0.1 },
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

const Categories = () => {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)] overflow-hidden">
      <Container>
        <SectionTitle
          title="Explore Cuisines"
          subtitle="Find your next favorite meal by exploring our diverse culinary categories."
          center={true}
          withAnimation={true}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <Link key={index} href={`/recipes?cuisine=${category.name}`}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl cursor-pointer"
                >
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${category.color} p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[var(--dark)]">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {category.count} Recipes
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default Categories;
