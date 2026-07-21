import { getUserSession } from "@/lib/core/session";
import { protectedFetch } from "@/lib/core/server";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[var(--dark)]">
              Please Login
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              You need to be logged in to view your profile.
            </p>
            <a
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  let savedRecipes = [];
  let mealPlanStats = { totalSlots: 0, filledSlots: 0 };
  let error = null;

  try {
    // 1. Fetch Saved Recipes (Cookbook) - ✅ API EXISTS
    const savedRes = await protectedFetch("/api/users/saved-recipes");
    savedRecipes = savedRes.data || [];

    // 2. Fetch Meal Plan stats - ✅ API EXISTS
    const mealRes = await protectedFetch("/api/mealplan");
    if (mealRes.data) {
      const slots = mealRes.data.slots || [];
      mealPlanStats = {
        totalSlots: 21, // 7 days * 3 meals
        filledSlots: slots.length,
      };
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load profile data";
    console.error("Error fetching profile data:", err);
  }

  return (
    <ProfileClient
      user={user}
      savedRecipes={savedRecipes}
      mealPlanStats={mealPlanStats}
      error={error}
    />
  );
}
