"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Calendar,
  Trash2,
  AlertCircle,
  ShoppingCart,
  Plus,
  Sparkles,
  X,
  ChefHat,
  RefreshCw,
} from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import SectionTitle from "@/components/UI/SectionTitle";
import { protectedFetch, serverMutation } from "@/lib/core/server";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

export default function MealPlannerPage() {
  const router = useRouter();
  const [plan, setPlan] = useState({ slots: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // AI Recommendation States
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  // Fetch Meal Plan
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await protectedFetch("/api/mealplan");
        setPlan(res.data);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        toast.error("Failed to load meal plan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlan();
  }, []);

  // --- RESTORE AI SUGGESTIONS FROM LOCAL STORAGE ON RELOAD ---
  useEffect(() => {
    const saved = localStorage.getItem("plateshare_ai_recs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only restore if data is less than 5 minutes old (300,000 ms)
        if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setAiRecommendations(parsed.data);
          if (parsed.data.length > 0) setShowAiPanel(true);
        } else {
          localStorage.removeItem("plateshare_ai_recs"); // Clear stale data
        }
      } catch (error) {
        console.error("Failed to load AI cache", error);
      }
    }
  }, []);

  // --- Count Empty Slots for AI ---
  const emptySlotsCount = useMemo(() => {
    const totalSlots = DAYS.length * MEAL_TYPES.length;
    return totalSlots - plan.slots.length;
  }, [plan.slots]);

  // --- AI: FETCH RECOMMENDATIONS ---
  const fetchAiRecommendations = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    setShowAiPanel(true);
    setAiRecommendations([]);

    try {
      const currentRecipeTitles = plan.slots
        .map((slot) => slot.recipeTitle)
        .filter(Boolean);

      const response = await serverMutation("/api/ai/recommend", {
        savedRecipes: currentRecipeTitles,
        cuisinePreferences: [],
        emptySlots: emptySlotsCount,
      });

      if (response.success && response.data) {
        const recommendations = Array.isArray(response.data)
          ? response.data
          : response.data.recommendations || [];

        setAiRecommendations(recommendations);

        // ✅ Save to browser localStorage so it survives reloads
        localStorage.setItem(
          "plateshare_ai_recs",
          JSON.stringify({
            data: recommendations,
            timestamp: Date.now(),
          }),
        );

        toast.success("AI suggestions loaded!");
      } else {
        toast.error("AI couldn't find suggestions. Try again later.");
      }
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      toast.error(error.message || "Failed to get AI recommendations");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- PLANNER HANDLERS ---
  const handleRemoveClick = (day, mealType, recipeTitle) => {
    setRemoveTarget({ day, mealType, recipeTitle });
    setIsRemoveModalOpen(true);
  };

  const confirmRemove = async () => {
    setIsRemoving(true);
    try {
      await serverMutation(
        "/api/mealplan/remove-slot",
        {
          day: removeTarget.day,
          mealType: removeTarget.mealType,
        },
        "PATCH",
      );

      setPlan((prev) => ({
        ...prev,
        slots: prev.slots.filter(
          (s) =>
            !(
              s.day === removeTarget.day && s.mealType === removeTarget.mealType
            ),
        ),
      }));

      toast.success("Removed from meal plan");
      setIsRemoveModalOpen(false);
    } catch (error) {
      toast.error(error.message || "Failed to remove");
    } finally {
      setIsRemoving(false);
      setRemoveTarget(null);
    }
  };

  // --- RENDER ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12 mt-4">
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-12 w-1/3 bg-gray-200 rounded mx-auto" />
            <div className="h-96 bg-gray-100 rounded-xl" />
          </div>
        </Container>
      </div>
    );
  }

  const getSlotRecipe = (day, mealType) => {
    return plan.slots.find((s) => s.day === day && s.mealType === mealType);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 mt-4">
      <Container>
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SectionTitle
            title="My Meal Planner"
            subtitle="Organize your week, one delicious meal at a time."
            center={false}
            withAnimation={true}
          />
          <div className="flex gap-3">
            <Link href="/my-cookbook">
              <Button
                variant="outline"
                className="gap-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <Plus className="h-4 w-4" /> Add Recipe
              </Button>
            </Link>
            {/* AI Trigger Button */}
            {emptySlotsCount > 0 && (
              <Button
                onClick={fetchAiRecommendations}
                disabled={isAiLoading}
                className="gap-2 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90"
              >
                <Sparkles className="h-4 w-4" />
                {isAiLoading ? "Thinking..." : "AI Suggestions"}
              </Button>
            )}
          </div>
        </div>

        {/* WEEKLY GRID */}
        <div className="overflow-x-auto rounded-2xl bg-white border border-gray-100 shadow-sm">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--primary)] w-32">
                  Meal / Day
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="p-4 text-center text-sm font-semibold text-[var(--dark)]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEAL_TYPES.map((meal) => (
                <tr
                  key={meal}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <td className="p-4 text-sm font-bold text-[var(--dark)] bg-gray-50/30">
                    {meal}
                  </td>
                  {DAYS.map((day) => {
                    const slot = getSlotRecipe(day, meal);
                    return (
                      <td
                        key={`${day}-${meal}`}
                        className="p-2 text-center align-top h-32 w-32"
                      >
                        {slot ? (
                          <div className="group relative flex h-full flex-col items-center justify-center rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-2 transition hover:shadow-md">
                            <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden mb-1">
                              <Image
                                src={
                                  slot.recipeImage || "/placeholder-food.jpg"
                                }
                                alt={slot.recipeTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-[10px] font-medium text-[var(--dark)] line-clamp-2 text-center leading-tight">
                              {slot.recipeTitle}
                            </p>
                            {slot.note && (
                              <span className="mt-1 rounded-full bg-gray-100 px-2 py-0.5 text-[8px] text-gray-500">
                                {slot.note}
                              </span>
                            )}
                            <button
                              onClick={() =>
                                handleRemoveClick(day, meal, slot.recipeTitle)
                              }
                              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 opacity-60 hover:opacity-100 transition">
                            <span className="text-[10px] text-gray-400">
                              + Add
                            </span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI RECOMMENDATIONS PANEL */}
        <AnimatePresence>
          {showAiPanel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 rounded-2xl bg-gradient-to-br from-[var(--secondary)]/5 to-[var(--primary)]/5 border border-[var(--primary)]/20 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[var(--primary)]" />
                  <h2 className="text-xl font-bold text-[var(--dark)]">
                    AI Smart Suggestions
                  </h2>
                  <span className="rounded-full bg-[var(--primary)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[var(--primary)]">
                    Fills {emptySlotsCount} empty slot
                    {emptySlotsCount > 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  onClick={() => setShowAiPanel(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {isAiLoading ? (
                <div className="flex items-center justify-center py-8 gap-3">
                  <RefreshCw className="h-6 w-6 animate-spin text-[var(--primary)]" />
                  <span className="text-[var(--text-secondary)]">
                    Brainstorming meal ideas...
                  </span>
                </div>
              ) : aiRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition"
                    >
                      <h4 className="font-bold text-[var(--dark)]">
                        {rec.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          {rec.cuisine}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                        {rec.reason}
                      </p>

                      {/* BUTTONS WRAPPER - flex-1 ensures both buttons take equal space */}
                      <div className="mt-3 flex items-stretch gap-3">
                        {/* ✅ PERFECT: Using your exact Button component */}
                        <Link
                          href={`/recipes?cuisine=${encodeURIComponent(rec.cuisine || "")}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                          >
                            🔍 Browse {rec.cuisine || "Recipes"}
                          </Button>
                        </Link>

                        {/* ✅ PERFECT: Custom button matched to your size exactly */}
                        <button
                          onClick={async () => {
                            const toastId = toast.loading(
                              "⚡ AI generating recipe...",
                            );
                            try {
                              const aiGenRes = await serverMutation(
                                "/api/ai/generate-recipe-copy",
                                {
                                  ingredients: `Ingredients for a delicious ${rec.cuisine || "home cooked"} meal based on the title: "${rec.title}"`,
                                  steps: `Standard cooking steps to make a perfect dish called "${rec.title}"`,
                                  tone: "casual",
                                  length: "medium",
                                },
                              );

                              if (!aiGenRes.success || !aiGenRes.data) {
                                throw new Error(
                                  "AI returned an invalid response.",
                                );
                              }

                              const aiRecipe = aiGenRes.data;
                              const payload = {
                                title: aiRecipe.title || rec.title,
                                description:
                                  aiRecipe.description ||
                                  `A delicious ${rec.cuisine} dish suggested by AI.`,
                                image:
                                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
                                cookTime: 30,
                                servings: 4,
                                difficulty: "Easy",
                                ingredients: aiRecipe.ingredients || [
                                  { name: "Ingredient 1", quantity: "1 cup" },
                                ],
                                steps: aiRecipe.steps || [
                                  "Cook the dish with love and serve!",
                                ],
                                cuisineTags: [rec.cuisine || "International"],
                              };

                              await serverMutation(
                                "/api/recipes",
                                payload,
                                "POST",
                              );

                              toast.dismiss(toastId);
                              toast.success(
                                `✨ "${rec.title}" added to your Cookbook!`,
                              );

                              setTimeout(() => window.location.reload(), 1500);
                            } catch (error) {
                              toast.dismiss(toastId);
                              console.error(
                                "Error generating AI recipe:",
                                error,
                              );
                              toast.error(
                                error.message || "Failed to generate AI recipe",
                              );
                            }
                          }}
                          className="flex-1 rounded-4xl bg-[var(--primary)] px-4 py-2 text-sm font-medium tracking-tight text-white shadow-sm transition-all duration-150 hover:bg-[var(--primary)]/90 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          ✨ Generate & Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-[var(--text-secondary)] py-4">
                  No recommendations found. Try saving more recipes to your
                  cookbook!
                </p>
              )}

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchAiRecommendations}
                  disabled={isAiLoading}
                  className="gap-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                >
                  <RefreshCw
                    className={`h-3 w-3 ${isAiLoading ? "animate-spin" : ""}`}
                  />
                  Regenerate
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SHOPPING LIST */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--dark)] flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-[var(--primary)]" />{" "}
              Shopping List
            </h2>
          </div>

          {plan.slots.length === 0 ? (
            <div className="rounded-2xl bg-white border border-gray-100 p-8 text-center shadow-sm">
              <ChefHat className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-[var(--text-secondary)]">
                No meals planned yet. Add recipes to generate your grocery list!
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {plan.slots.length} meals planned. Here&apos;s your unified
                grocery list:
              </p>
              <div className="space-y-2">
                {plan.slots.map((slot, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-50 py-2 text-sm"
                  >
                    <span className="font-medium text-[var(--dark)]">
                      {slot.recipeTitle}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {slot.day} - {slot.mealType}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* REMOVE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isRemoveModalOpen && removeTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsRemoveModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-md w-full rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="h-6 w-6" />
                <h3 className="text-lg font-bold">Remove from Planner?</h3>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Are you sure you want to remove{" "}
                <span className="font-bold text-[var(--dark)]">
                  {removeTarget.recipeTitle}
                </span>{" "}
                from your <span className="font-bold">{removeTarget.day}</span>{" "}
                {removeTarget.mealType} slot?
              </p>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--dark)] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  disabled={isRemoving}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-600/20 transition hover:bg-red-700 disabled:opacity-70"
                >
                  {isRemoving ? "Removing..." : "Yes, Remove"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
