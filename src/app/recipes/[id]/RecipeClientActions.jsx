"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Bookmark, Pencil, Trash2, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { serverMutation } from "@/lib/core/server";
import RecipeForm from "@/components/Recipe/RecipeForm"; // <-- Import the new form

export default function RecipeClientActions({
  recipeId,
  isOwner,
  recipeTitle,
  recipe,
  initialSavedCount,
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(initialSavedCount);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSaveToCookbook = async () => {
    setIsSaving(true);
    try {
      await serverMutation(`/api/users/save-recipe/${recipeId}`, {}, "PATCH");
      setSavedCount((prev) => prev + 1);
      toast.success("Recipe saved to your Cookbook!");
    } catch (error) {
      if (error.message?.includes("401")) {
        toast.info("Please log in to save recipes");
        router.push(
          `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`,
        );
      } else {
        toast.error(error.message || "Failed to save recipe");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    try {
      await serverMutation(`/api/recipes/${recipeId}`, {}, "DELETE");
      toast.success("Recipe deleted successfully");
      router.push("/my-cookbook");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete recipe");
    }
  };

  const handleUpdate = async (formData) => {
    setIsUpdating(true);
    try {
      await serverMutation(`/api/recipes/${recipeId}`, formData, "PUT");
      setIsEditModalOpen(false);
      toast.success("Recipe updated successfully");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to update recipe");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 space-y-3">
      <button
        onClick={handleSaveToCookbook}
        disabled={isSaving}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[var(--primary)]/20 transition hover:bg-[var(--primary)]/90 hover:shadow-lg disabled:opacity-70"
      >
        <Bookmark className="h-4 w-4" />
        {isSaving ? "Saving..." : "Save to Cookbook"}
      </button>

      {isOwner && (
        <div className="flex gap-3 pt-2 border-t border-gray-100 mt-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[var(--dark)] transition hover:bg-gray-50 hover:border-[var(--primary)]"
          >
            <Pencil className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:border-red-300"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsDeleteModalOpen(false)}
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
                <h3 className="text-lg font-bold">Delete Recipe?</h3>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                Are you sure you want to delete &quot;{recipeTitle}&quot;? This
                action cannot be undone.
              </p>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--dark)] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-600/20 transition hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL (Now using the beautiful RecipeForm) */}
      <AnimatePresence>
        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setIsEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-50 p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-6 border-b border-gray-100 rounded-t-2xl">
                <h3 className="text-xl font-bold text-[var(--dark)]">
                  Edit Recipe
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100 transition text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-b-2xl">
                <RecipeForm
                  initialData={recipe}
                  onSubmit={handleUpdate}
                  isSubmitting={isUpdating}
                  submitLabel="Update Recipe"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
