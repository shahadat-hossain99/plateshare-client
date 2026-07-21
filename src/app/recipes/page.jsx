"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Clock,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import SectionTitle from "@/components/UI/SectionTitle";
import RecipeCard from "@/components/Recipe/RecipeCard";
import RecipeCardSkeleton from "@/components/Recipe/RecipeCardSkeleton";
import { serverFetch } from "@/lib/core/server";

const RecipesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 1. INITIALIZE PAGINATION FROM URL
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    cuisine: searchParams.get("cuisine") || "",
    difficulty: searchParams.get("difficulty") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  // --- Data Fetching ---
  // ✅ FIXED: Added `pageOverride = null` to prevent ReferenceError
  const fetchRecipes = useCallback(
    async (pageOverride = null) => {
      setIsLoading(true);
      try {
        const targetPage = pageOverride || pagination.currentPage;

        const params = new URLSearchParams({
          page: targetPage,
          limit: pagination.itemsPerPage,
        });

        if (debouncedSearch) params.set("search", debouncedSearch);
        if (filters.cuisine && filters.cuisine !== "all")
          params.set("cuisine", filters.cuisine);
        if (filters.difficulty && filters.difficulty !== "all")
          params.set("difficulty", filters.difficulty);
        if (filters.sortBy) params.set("sortBy", filters.sortBy);
        if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

        const response = await serverFetch(`/api/recipes?${params.toString()}`);

        setRecipes(response.data);
        setPagination({
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalItems: response.pagination.totalItems,
          itemsPerPage: response.pagination.itemsPerPage,
          hasNextPage: response.pagination.hasNextPage,
          hasPrevPage: response.pagination.hasPrevPage,
        });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast.error("Failed to load recipes");
      } finally {
        setIsLoading(false);
      }
    },
    [
      pagination.currentPage,
      pagination.itemsPerPage,
      debouncedSearch,
      filters.cuisine,
      filters.difficulty,
      filters.sortBy,
      filters.sortOrder,
    ],
  );

  // ✅ FIXED: Restored useEffect to trigger fetch on load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecipes();
  }, [fetchRecipes]);

  // --- URL State Sync ---
  const updateFilters = useCallback(
    (newFilters, page) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value && value !== "all") {
          params.set(key, value);
        }
      });

      const targetPage = page || 1;
      if (targetPage > 1) {
        params.set("page", targetPage.toString());
      }

      router.push(`/recipes?${params.toString()}`);
    },
    [filters, router],
  );

  const clearFilters = () => {
    setFilters({
      search: "",
      cuisine: "",
      difficulty: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    router.push("/recipes");
  };

  // ✅ CRITICAL FIX: Optimized Page Change
  const handlePageChange = (page) => {
    if (page === pagination.currentPage) return;

    setPagination((prev) => ({ ...prev, currentPage: page }));
    setIsLoading(true);
    updateFilters({}, page);
    fetchRecipes(page); // Pass page explicitly

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Pagination Renderer ---
  const renderPagination = () => {
    const {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage,
      hasPrevPage,
    } = pagination;

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-200 pt-6">
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                page === currentPage
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-[var(--text-secondary)]">
          Showing {startItem} - {endItem} of {totalItems} results
        </p>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-[var(--background)] py-12 mt-4">
      <Container>
        <SectionTitle
          title="Browse Recipes"
          subtitle="Discover delicious meals crafted by home cooks from around the world."
          center={true}
          withAnimation={true}
        />

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search recipes by title..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value }, 1)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {(filters.cuisine || filters.difficulty) && (
                  <span className="ml-1 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs text-white">
                    {
                      [filters.cuisine, filters.difficulty].filter(Boolean)
                        .length
                    }
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Cuisine Tag
                  </label>
                  <select
                    value={filters.cuisine}
                    onChange={(e) =>
                      updateFilters({ cuisine: e.target.value }, 1)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="all">All Cuisines</option>
                    <option value="Italian">🇮🇹 Italian</option>
                    <option value="Asian">🥢 Asian</option>
                    <option value="Sichuan">🌶️ Sichuan</option>
                    <option value="Chinese">🥡 Chinese</option>

                    <option value="Mexican">🌮 Mexican</option>
                    <option value="Bengali">🍛 Bengali</option>
                    <option value="Mediterranean">🥗 Mediterranean</option>
                    <option value="Vegan">🌱 Vegan</option>
                    <option value="Indian">🍛 Indian</option>
                    <option value="French">🥐 French</option>
                    <option value="Dessert">🧁 Dessert</option>
                    <option value="BBQ">🍖 BBQ</option>
                    <option value="Fast Food">🍔 Fast Food</option>

                    <option value="Bakery">🥐 Bakery</option>
                    <option value="Beverages">🥤 Beverages</option>
                    <option value="Healthy">🥗 Healthy</option>
                    <option value="Seafood">🐟 Seafood</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) =>
                      updateFilters({ difficulty: e.target.value }, 1)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="all">All Levels</option>
                    <option value="Easy">🟢 Easy</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Hard">🔴 Hard</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      updateFilters({ sortBy: e.target.value }, 1)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="createdAt">Date Added</option>
                    <option value="title">Alphabetical (A-Z)</option>
                    <option value="cookTime">Cook Time</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) =>
                      updateFilters({ sortOrder: e.target.value }, 1)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="desc">Newest / Highest</option>
                    <option value="asc">Oldest / Lowest</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Clock className="h-4 w-4" />
                  <span>
                    Filtering by {pagination.totalItems} available recipes
                  </span>
                </div>

                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-[var(--text-secondary)]">
              {pagination.totalItems} recipe
              {pagination.totalItems !== 1 ? "s" : ""} found
            </p>
            {pagination.totalPages > 1 && (
              <p className="text-sm text-[var(--text-secondary)]">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>
            )}
          </div>
        )}

        {/* Recipe Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-100 p-6">
              <Utensils className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[var(--dark)]">
              No recipes found
            </h3>
            <p className="mt-2 text-[var(--text-secondary)] max-w-md">
              We couldn&apos;t find any recipes matching your search or filters.
              Try adjusting your criteria.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
            {renderPagination()}
          </>
        )}
      </Container>
    </div>
  );
};

export default RecipesPage;
