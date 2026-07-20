import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import RecipeClientActions from "./RecipeClientActions";

// This is a SERVER COMPONENT
export default async function RecipeDetailsPage({ params }) {
  // ⚠️ FIX: In Next.js 15+, params is a Promise and MUST be awaited!
  const { id } = await params;

  // 1. Fetch Data logic in try/catch
  let recipe = null;
  let user = null;
  let error = null;

  try {
    const recipeRes = await serverFetch(`/api/recipes/${id}`);
    recipe = recipeRes.data;
    user = await getUserSession();
  } catch (err) {
    console.error("Error loading recipe details:", err);
    error = err;
  }

  // 2. Handle Edge Cases OUTSIDE the try/catch
  if (error || !recipe) {
    // If the recipe is missing or error, show the Next.js 404 page
    notFound();
  }

  // 3. Now it is SAFE to return JSX
  const isOwner = user && recipe.ownerUserId === user.id;

  return (
    <div className="min-h-screen bg-[var(--background)] py-10 mt-4">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors mb-6"
        >
          <span className="text-lg leading-none">←</span> Back to Recipes
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT COLUMN: IMAGE & OVERVIEW */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src={recipe.image || "/placeholder-food.jpg"}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-3xl font-bold text-[var(--dark)] sm:text-4xl">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                {recipe.cuisineTags?.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {recipe.description}
              </p>
            </div>

            {/* Ingredients Section */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[var(--dark)] flex items-center gap-2 mb-4">
                <span className="text-[var(--primary)]">🧑‍🍳</span> Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ing, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-gray-50 py-2 text-sm"
                  >
                    <span className="text-[var(--dark)] font-medium">
                      {ing.name}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {ing.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps Section */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[var(--dark)] flex items-center gap-2 mb-4">
                <span className="text-[var(--primary)]">🔥</span> Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.steps?.map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-xs font-bold text-[var(--primary)]">
                      {index + 1}
                    </span>
                    <span className="text-[var(--text-secondary)] leading-relaxed pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT COLUMN: STATS & ACTIONS */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-[var(--dark)] mb-4">
                Recipe Overview
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                  <span className="text-[var(--text-secondary)]">
                    Cook Time
                  </span>
                  <span className="font-medium text-[var(--dark)] flex items-center gap-1">
                    <span className="text-[var(--primary)]">⏱️</span>{" "}
                    {recipe.cookTime} min
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                  <span className="text-[var(--text-secondary)]">Servings</span>
                  <span className="font-medium text-[var(--dark)] flex items-center gap-1">
                    <span className="text-[var(--primary)]">👥</span>{" "}
                    {recipe.servings}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                  <span className="text-[var(--text-secondary)]">
                    Difficulty
                  </span>
                  <span className="font-medium text-[var(--dark)] flex items-center gap-1">
                    <span
                      className={`${
                        recipe.difficulty === "Easy"
                          ? "text-green-500"
                          : recipe.difficulty === "Medium"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      🔥
                    </span>{" "}
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Saved by</span>
                  <span className="font-medium text-[var(--dark)] flex items-center gap-1">
                    <span className="text-red-500">❤️</span>{" "}
                    {recipe.savedCount || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* CLIENT ACTIONS WRAPPER */}
            <RecipeClientActions
              recipeId={recipe._id}
              isOwner={isOwner}
              recipeTitle={recipe.title}
              recipe={recipe}
              initialSavedCount={recipe.savedCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
