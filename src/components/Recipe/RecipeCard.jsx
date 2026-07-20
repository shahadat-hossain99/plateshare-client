"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Flame, ChefHat } from "lucide-react";

const RecipeCard = ({ recipe }) => {
  // Create a truncated description
  const shortDescription =
    recipe.description?.length > 80
      ? recipe.description.substring(0, 80) + "..."
      : recipe.description;

  // Limit cuisine tags to a max of 3
  const displayedTags = recipe.cuisineTags?.slice(0, 3) || [];
  const remainingTags = (recipe.cuisineTags?.length || 0) - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={recipe.image || "/placeholder-food.jpg"}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Difficulty Badge Overlay */}
        <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white flex items-center gap-1">
          <Flame
            className={`w-3 h-3 ${
              recipe.difficulty === "Easy"
                ? "text-green-400"
                : recipe.difficulty === "Medium"
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          />
          {recipe.difficulty}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        {/* Cuisine Tags */}
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {displayedTags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[var(--primary)]"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-500">
              +{remainingTags}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-[var(--dark)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        {/* Spacer to push Meta to bottom */}
        <div className="flex-1" />

        {/* Meta Information */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-medium text-[var(--primary)]">
            <ChefHat className="h-3.5 w-3.5" />
            <span>Cook</span>
          </div>
        </div>

        {/* Bottom Action Button */}
        <Link href={`/recipes/${recipe._id}`}>
          <button className="mt-4 w-full rounded-xl bg-[var(--primary)]/10 py-2 text-xs font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
