"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  BookOpen,
  Clock,
  Users,
  Calendar,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import SectionTitle from "@/components/UI/SectionTitle";
import RecipeCardSkeleton from "@/components/Recipe/RecipeCardSkeleton";
import { protectedFetch, serverMutation } from "@/lib/core/server";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

export default function MyCookbookPage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal States
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Planner Form State
  const [plannerForm, setPlannerForm] = useState({
    day: "Mon",
    mealType: "Breakfast",
    servingsOverride: "",
    note: "",
  });

  // 1. Fetch saved recipes
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await protectedFetch("/api/users/saved-recipes");
        setRecipes(res.data || []);
      } catch (error) {
        console.error("Error fetching cookbook:", error);
        toast.error("Failed to load cookbook");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSaved();
  }, []);

  // --- PLANNER HANDLERS ---

  const openPlanner = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    setConflictData(null);
    setIsConfirming(false);
    setPlannerForm({
      day: "Mon",
      mealType: "Breakfast",
      servingsOverride: "",
      note: "",
    });
  };

  const closePlanner = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setIsConfirming(false);
    setConflictData(null);
  };

  const handleAddToPlanner = async () => {
    setIsAdding(true);
    try {
      const res = await serverMutation("/api/mealplan/slot", {
        day: plannerForm.day,
        mealType: plannerForm.mealType,
        recipeId: selectedRecipe._id,
        servingsOverride: parseInt(plannerForm.servingsOverride) || undefined,
        note: plannerForm.note,
      });

      if (res.conflict) {
        setConflictData({ name: res.conflictRecipeName });
        setIsConfirming(true);
        setIsAdding(false);
        return;
      }

      toast.success("Added to meal plan!");
      closePlanner();
    } catch (err) {
      toast.error(err.message || "Failed to add to plan");
    } finally {
      setIsAdding(false);
    }
  };

  const handleReplace = async () => {
    try {
      await serverMutation("/api/mealplan/slot", {
        day: plannerForm.day,
        mealType: plannerForm.mealType,
        recipeId: selectedRecipe._id,
        servingsOverride: parseInt(plannerForm.servingsOverride) || undefined,
        note: plannerForm.note,
        forceReplace: true,
      });
      toast.success("Recipe replaced!");
      closePlanner();
    } catch (err) {
      toast.error(err.message || "Failed to replace");
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[var(--background)] py-12 mt-4">
      <Container>
        <SectionTitle
          title="My Cookbook"
          subtitle="Your personal collection of saved recipes. Plan your week directly from here."
          center={true}
          withAnimation={true}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <RecipeCardSkeleton key={i} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-[var(--dark)]">
              Your cookbook is empty
            </h3>
            <p className="mt-2 text-[var(--text-secondary)]">
              Start exploring recipes and save your favorites!
            </p>
            <Link href="/recipes">
              <Button variant="primary" className="mt-4">
                Browse Recipes
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={recipe.image || "/placeholder-food.jpg"}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[var(--dark)] line-clamp-1">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {recipe.cookTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {recipe.servings}
                    </span>
                  </div>
                  <button
                    onClick={() => openPlanner(recipe)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)]/10 py-2 text-xs font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                  >
                    <Calendar className="h-3 w-3" /> Add to Planner
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>

      {/* =========================================
          ADD TO PLANNER MODAL (Step 1)
          ========================================= */}
      <AnimatePresence>
        {isModalOpen && !isConfirming && selectedRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={closePlanner}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-md w-full rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-[var(--dark)]">
                  Plan &quot;{selectedRecipe?.title}&quot;
                </h3>
                <button
                  onClick={closePlanner}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddToPlanner();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Day of the Week
                  </label>
                  <select
                    value={plannerForm.day}
                    onChange={(e) =>
                      setPlannerForm({ ...plannerForm, day: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Meal Slot
                  </label>
                  <select
                    value={plannerForm.mealType}
                    onChange={(e) =>
                      setPlannerForm({
                        ...plannerForm,
                        mealType: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    {MEAL_TYPES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Servings (Optional)
                  </label>
                  <Input
                    type="number"
                    placeholder={`Default: ${selectedRecipe?.servings}`}
                    value={plannerForm.servingsOverride}
                    onChange={(e) =>
                      setPlannerForm({
                        ...plannerForm,
                        servingsOverride: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Note (Optional)
                  </label>
                  <Input
                    placeholder="e.g. Add extra garlic"
                    value={plannerForm.note}
                    onChange={(e) =>
                      setPlannerForm({ ...plannerForm, note: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={closePlanner}
                    className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--dark)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAdding}
                    className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-md disabled:opacity-70"
                  >
                    {isAdding ? "Adding..." : "Add to Plan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          CONFLICT CONFIRMATION MODAL (Step 2)
          ========================================= */}
      <AnimatePresence>
        {isConfirming && conflictData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsConfirming(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-md w-full rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 text-amber-600 mb-4">
                <div className="rounded-full bg-amber-100 p-2">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Slot Already Taken!</h3>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                <span className="font-bold text-[var(--dark)]">
                  {conflictData.name}
                </span>{" "}
                is already planned for{" "}
                <span className="font-bold">{plannerForm.day}</span> at{" "}
                <span className="font-bold">{plannerForm.mealType}</span>. Do
                you want to replace it with{" "}
                <span className="font-bold text-[var(--primary)]">
                  {selectedRecipe?.title}
                </span>
                ?
              </p>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setIsConfirming(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--dark)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplace}
                  className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-md"
                >
                  Yes, Replace it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
