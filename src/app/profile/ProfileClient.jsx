"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Camera,
  BookOpen,
  Calendar,
  TrendingUp,
  Flame,
  Utensils,
  Clock,
  Eye,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

const COLORS = ["#c0522d", "#6a8f3c", "#2b1f18", "#add8f1", "#c8ded2"];

const ProfileClient = ({ user, savedRecipes, mealPlanStats, error }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // --- CHART DATA PREPARATION ---
  const cuisineCounts = {};
  savedRecipes.forEach((recipe) => {
    (recipe.cuisineTags || []).forEach((tag) => {
      cuisineCounts[tag] = (cuisineCounts[tag] || 0) + 1;
    });
  });
  const cuisineData = Object.entries(cuisineCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyPlans = [
    { month: "Jun", meals: 12 },
    { month: "Jul", meals: 18 },
    { month: "Aug", meals: 15 },
    { month: "Sep", meals: 21 },
    { month: "Oct", meals: 14 },
    { month: "Nov", meals: mealPlanStats.filledSlots },
  ];

  // --- STAT CALCULATIONS ---
  const totalSaved = savedRecipes.length;
  const currentWeekProgress = Math.round(
    (mealPlanStats.filledSlots / mealPlanStats.totalSlots) * 100,
  );

  // --- REDIRECT HANDLERS ---
  const goToCookbook = () => router.push("/my-cookbook");
  const goToMealPlanner = () => router.push("/meal-planner");

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--background)] py-12">
        <Container>
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-[var(--dark)]">
              Something went wrong
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition"
            >
              Try Again
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 mt-4">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="relative mx-auto h-24 w-24">
                  <Image
                    src={user.image || "https://i.pravatar.cc/150?img=12"}
                    alt={user.name || "User"}
                    fill
                    className="rounded-full object-cover ring-4 ring-[var(--primary)]/20"
                  />
                  <button className="absolute bottom-0 right-0 rounded-full bg-[var(--primary)] p-1.5 text-white shadow-lg hover:bg-[var(--primary)]/90 transition">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-[var(--dark)]">
                  {user.name || "User"}
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  {user.email}
                </p>
                <div className="mt-3 flex justify-center gap-4 text-sm">
                  <div>
                    <p className="font-bold text-[var(--dark)]">{totalSaved}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Saved
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--dark)]">
                      {mealPlanStats.filledSlots}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Planned
                    </p>
                  </div>
                </div>
              </div>

              <nav className="mt-6 border-t border-gray-100 pt-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${activeTab === "overview" ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium" : "text-[var(--text-secondary)] hover:bg-gray-50"}`}
                    >
                      <TrendingUp className="h-4 w-4" /> Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("cookbook")}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${activeTab === "cookbook" ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium" : "text-[var(--text-secondary)] hover:bg-gray-50"}`}
                    >
                      <BookOpen className="h-4 w-4" /> My Cookbook
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("planner")}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${activeTab === "planner" ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium" : "text-[var(--text-secondary)] hover:bg-gray-50"}`}
                    >
                      <Calendar className="h-4 w-4" /> Meal Planner
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-[var(--primary)]" />{" "}
                      Cookbook
                    </p>
                    <p className="text-2xl font-bold text-[var(--dark)]">
                      {totalSaved}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Saved Recipes
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                      <Utensils className="h-3 w-3 text-[var(--primary)]" />{" "}
                      Planned
                    </p>
                    <p className="text-2xl font-bold text-[var(--primary)]">
                      {mealPlanStats.filledSlots}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Meals This Week
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                      <Flame className="h-3 w-3 text-green-600" /> Progress
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {currentWeekProgress}%
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Week Goal
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
                    <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[var(--primary)]" /> Time
                      Saved
                    </p>
                    <p className="text-2xl font-bold text-[var(--dark)]">~4h</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Meal Prep Saved
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
                      <Flame className="h-5 w-5 text-[var(--primary)]" />{" "}
                      Cuisine Preferences
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={
                              cuisineData.length > 0
                                ? cuisineData
                                : [{ name: "No Data", value: 1 }]
                            }
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {cuisineData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[var(--primary)]" />{" "}
                      Monthly Planning
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyPlans}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="meals" fill="#c0522d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    onClick={goToCookbook}
                    className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--primary)]/20 transition group"
                  >
                    <div>
                      <p className="font-semibold text-[var(--dark)]">
                        My Cookbook
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Manage your saved recipes
                      </p>
                    </div>
                    <Eye className="h-6 w-6 text-[var(--primary)] group-hover:translate-x-1 transition" />
                  </button>
                  <button
                    onClick={goToMealPlanner}
                    className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--primary)]/20 transition group"
                  >
                    <div>
                      <p className="font-semibold text-[var(--dark)]">
                        Meal Planner
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        View your weekly meal plan
                      </p>
                    </div>
                    <Calendar className="h-6 w-6 text-[var(--primary)] group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            )}

            {/* COOKBOOK TAB */}
            {activeTab === "cookbook" && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="mx-auto rounded-full bg-[var(--primary)]/10 p-6 w-fit">
                  <BookOpen className="h-16 w-16 text-[var(--primary)]" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-[var(--dark)]">
                  My Cookbook
                </h3>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Go to your Cookbook to view, edit, and organize your saved
                  recipes.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={goToCookbook}
                >
                  Go to Cookbook <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {/* PLANNER TAB */}
            {activeTab === "planner" && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="mx-auto rounded-full bg-[var(--primary)]/10 p-6 w-fit">
                  <Calendar className="h-16 w-16 text-[var(--primary)]" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-[var(--dark)]">
                  Meal Planner
                </h3>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Go to your Meal Planner to build your weekly menu.
                </p>
                <Button
                  variant="primary"
                  className="mt-6"
                  onClick={goToMealPlanner}
                >
                  Go to Planner <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfileClient;
