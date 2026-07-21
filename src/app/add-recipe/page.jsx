"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChefHat,
  AlertCircle,
  CheckCircle2,
  ListOrdered,
  Box,
  Clock,
  Users,
  Flame,
  Sparkles, // Added Sparkles for AI Button
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import ImageUpload from "@/components/UI/ImageUpload";
import AIRecipePolisher from "@/components/Recipe/AIRecipePolisher"; // Import the AI Modal
import { serverMutation } from "@/lib/core/server";

// Constants
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];
const CUISINE_TAGS = [
  "Italian",
  "Asian",
  "Mexican",
  "Bengali",
  "Mediterranean",
  "Dessert",
  "French",
  "Indian",
  "Vegan",
  "Fast Food",
  "Bakery",
  "BBQ",
  "Beverages",
  "Healthy",
  "Seafood",
];

// Framer Motion Variants
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
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function AddRecipePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false); // State for AI Modal

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    cookTime: "",
    servings: "",
    difficulty: "Easy",
    ingredients: [{ name: "", quantity: "" }],
    steps: [""],
    cuisineTags: [],
  });

  // Error State
  const [errors, setErrors] = useState({});

  // --- AI Callback Handler ---
  // This will receive the data from the AI Modal and auto-fill the form!
  const handleApplyAI = (aiData) => {
    setFormData((prev) => ({
      ...prev,
      title: aiData.title || prev.title,
      description: aiData.description || prev.description,
      steps: aiData.steps || prev.steps,
    }));
    toast.success("✨ AI content applied!");
  };

  // --- Standard Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleImageRemove = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  // --- Ingredients Logic ---
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length === 1) return;
    const updatedIngredients = formData.ingredients.filter(
      (_, i) => i !== index,
    );
    setFormData((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  // --- Steps Logic ---
  const handleStepChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const addStep = () => {
    setFormData((prev) => ({ ...prev, steps: [...prev.steps, ""] }));
  };

  const removeStep = (index) => {
    if (formData.steps.length === 1) return;
    const updatedSteps = formData.steps.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, steps: updatedSteps }));
  };

  // --- Cuisine Checkbox Logic ---
  const toggleCuisineTag = (tag) => {
    setFormData((prev) => {
      const currentTags = prev.cuisineTags;
      if (currentTags.includes(tag)) {
        return { ...prev, cuisineTags: currentTags.filter((t) => t !== tag) };
      } else {
        return { ...prev, cuisineTags: [...currentTags, tag] };
      }
    });
  };

  // --- Validation & Submit ---
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.image) {
      newErrors.image = "An image is required for your recipe";
      isValid = false;
    }
    if (!formData.cookTime || isNaN(parseInt(formData.cookTime))) {
      newErrors.cookTime = "Cook time must be a valid number (minutes)";
      isValid = false;
    }
    if (!formData.servings || isNaN(parseInt(formData.servings))) {
      newErrors.servings = "Servings must be a valid number";
      isValid = false;
    }
    if (formData.cuisineTags.length === 0) {
      newErrors.cuisineTags = "Please select at least one cuisine tag";
      isValid = false;
    }

    const invalidIngredientIndex = formData.ingredients.findIndex(
      (ing) => !ing.name.trim() || !ing.quantity.trim(),
    );
    if (invalidIngredientIndex !== -1) {
      newErrors.ingredients = "All ingredients must have a name and quantity";
      isValid = false;
    }

    const invalidStepIndex = formData.steps.findIndex((step) => !step.trim());
    if (invalidStepIndex !== -1) {
      newErrors.steps = "All steps must be filled out";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image,
        cookTime: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        ingredients: formData.ingredients,
        steps: formData.steps.filter((s) => s.trim()),
        cuisineTags: formData.cuisineTags,
      };

      await serverMutation("/api/recipes", payload, "POST");

      toast.success("🎉 Recipe added successfully!", {
        description: "Your recipe is now visible to the community.",
        duration: 4000,
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to add recipe", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-20 mt-4">
      <Container>
        {/* Back Button & Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)]">
              <ChefHat className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--dark)] sm:text-4xl">
                Add New Recipe
              </h1>
              <p className="text-[var(--text-secondary)] mt-1">
                Share your culinary creation with the PlateShare community.
              </p>
            </div>
            {/* AI Polisher Trigger Button Right in the Header */}
            <div className="ml-auto hidden sm:block">
              <Button
                variant="outline"
                onClick={() => setIsAIModalOpen(true)}
                className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]  transition-all"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Polish with AI
              </Button>
            </div>
          </div>

          {/* AI Button on Mobile */}
          <div className="mt-3 sm:hidden">
            <Button
              variant="outline"
              onClick={() => setIsAIModalOpen(true)}
              className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Polish with AI
            </Button>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* ... Basic Information ... */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8"
          >
            {/* (Your existing Basic Information block remains exactly the same) */}
            <h2 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
              <Box className="h-5 w-5 text-[var(--primary)]" /> Basic
              Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                  Recipe Title <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  type="text"
                  placeholder="e.g. Creamy Garlic Parmesan Pasta"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={
                    errors.title
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }
                />
                {errors.title && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Write a brief description..."
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                />
                {errors.description && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                    Cook Time (Minutes) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
                    <Input
                      name="cookTime"
                      type="number"
                      placeholder="25"
                      className={`pl-10 ${errors.cookTime ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                      value={formData.cookTime}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.cookTime && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.cookTime}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                    Servings <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
                    <Input
                      name="servings"
                      type="number"
                      placeholder="4"
                      className={`pl-10 ${errors.servings ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                      value={formData.servings}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.servings && (
                    <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.servings}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                    Difficulty <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[var(--dark)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none bg-white"
                  >
                    {DIFFICULTY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ... Recipe Image ... */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8"
          >
            <h2 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[var(--primary)]" /> Recipe
              Image
            </h2>
            <ImageUpload
              label="Upload a photo of your dish"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              required={true}
            />
            {errors.image && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.image}
              </p>
            )}
          </motion.div>

          {/* ... Cuisine Tags ... */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8"
          >
            <h2 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
              <Flame className="h-5 w-5 text-[var(--primary)]" /> Cuisine Tags{" "}
              <span className="text-red-500 text-sm font-normal">*</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-3">
              Select all that apply to your recipe.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {CUISINE_TAGS.map((tag) => {
                const isSelected = formData.cuisineTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleCuisineTag(tag)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${isSelected ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm" : "bg-white text-[var(--text-secondary)] border-gray-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"}`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {errors.cuisineTags && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.cuisineTags}
              </p>
            )}
          </motion.div>

          {/* ... Ingredients (Dynamic) ... */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--dark)] flex items-center gap-2">
                <Box className="h-5 w-5 text-[var(--primary)]" /> Ingredients{" "}
                <span className="text-red-500 text-sm font-normal">*</span>
              </h2>
              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="gap-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:scale-105"
              >
                <Plus className="h-4 w-4" /> Add Item
              </Button>
            </div>
            {errors.ingredients && (
              <p className="mb-4 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.ingredients}
              </p>
            )}
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {formData.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex gap-3"
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="Ingredient name (e.g. Flour)"
                        value={ingredient.name}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="w-1/3 sm:w-1/4">
                      <Input
                        placeholder="Quantity (e.g. 2 cups)"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "quantity",
                            e.target.value,
                          )
                        }
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      disabled={
                        formData.ingredients.length === 1 || isSubmitting
                      }
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ... Steps (Dynamic Ordered List) ... */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--dark)] flex items-center gap-2">
                <ListOrdered className="h-5 w-5 text-[var(--primary)]" /> Steps{" "}
                <span className="text-red-500 text-sm font-normal">*</span>
              </h2>
              {/* Fixed: Added closing bracket ] for className */}
              <Button
                variant="outline"
                onClick={addStep}
                className="gap-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:scale-105"
              >
                <Plus className="h-4 w-4" /> Add Step
              </Button>
            </div>
            {errors.steps && (
              <p className="mb-4 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.steps}
              </p>
            )}
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {formData.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex gap-3 items-start"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)] mt-0.5">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <textarea
                        rows={2}
                        placeholder={`Step ${index + 1} (e.g. Mix the dry ingredients together.)`}
                        value={step}
                        onChange={(e) =>
                          handleStepChange(index, e.target.value)
                        }
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      disabled={formData.steps.length === 1 || isSubmitting}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-40 mt-0.5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ... Form Actions ... */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-gray-100"
          >
            <Link href="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-gray-200 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:shadow-xl hover:shadow-[var(--primary)]/30 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Publishing Recipe...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Publish Recipe <CheckCircle2 className="h-5 w-5" />
                </span>
              )}
            </Button>
          </motion.div>
        </motion.form>
      </Container>

      {/* =========================================
          AI RECIPE POLISHER MODAL
          ========================================= */}
      <AIRecipePolisher
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onApply={handleApplyAI}
      />
    </div>
  );
}
