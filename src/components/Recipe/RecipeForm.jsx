"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Clock,
  Users,
  Box,
  ListOrdered,
  Flame,
} from "lucide-react";
import Input from "@/components/UI/Input";
import ImageUpload from "@/components/UI/ImageUpload";

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

const RecipeForm = ({
  initialData = {},
  onSubmit,
  isSubmitting,
  submitLabel = "Save Recipe",
  onImageUpload,
  onImageRemove,
}) => {
  // Default empty state if no data is passed (for Add Recipe)
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    image: initialData.image || "",
    cookTime: initialData.cookTime || "",
    servings: initialData.servings || "",
    difficulty: initialData.difficulty || "Easy",
    ingredients:
      initialData.ingredients?.length > 0
        ? initialData.ingredients
        : [{ name: "", quantity: "" }],
    steps: initialData.steps?.length > 0 ? initialData.steps : [""],
    cuisineTags: initialData.cuisineTags || [],
  });

  // Local error state for the form
  const [errors, setErrors] = useState({});

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageUploadLocal = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
    if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    if (onImageUpload) onImageUpload(url);
  };

  const handleImageRemoveLocal = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    if (onImageRemove) onImageRemove();
  };

  // Ingredients Logic
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

  // Steps Logic
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

  // Cuisine Tags Logic
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

  // Validate & Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
      isValid = false;
    }
    if (!formData.cookTime || isNaN(parseInt(formData.cookTime))) {
      newErrors.cookTime = "Valid cook time required";
      isValid = false;
    }
    if (!formData.servings || isNaN(parseInt(formData.servings))) {
      newErrors.servings = "Valid servings required";
      isValid = false;
    }
    if (formData.cuisineTags.length === 0) {
      newErrors.cuisineTags = "Select at least one cuisine tag";
      isValid = false;
    }

    // Validate ingredients & steps (ensure no empty strings)
    if (
      formData.ingredients.some(
        (ing) => !ing.name.trim() || !ing.quantity.trim(),
      )
    ) {
      newErrors.ingredients = "All ingredients need a name and quantity";
      isValid = false;
    }
    if (formData.steps.some((step) => !step.trim())) {
      newErrors.steps = "All steps must be filled out";
      isValid = false;
    }

    setErrors(newErrors);
    if (isValid) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Basic Information */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
        <h2 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
          <Box className="h-5 w-5 text-[var(--primary)]" /> Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
              Recipe Title <span className="text-red-500">*</span>
            </label>
            <Input
              name="title"
              placeholder="e.g. Creamy Garlic Parmesan Pasta"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-500">{errors.title}</p>
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
              className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                Cook Time (Min) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  name="cookTime"
                  type="number"
                  placeholder="25"
                  className={`pl-10 ${errors.cookTime ? "border-red-500" : ""}`}
                  value={formData.cookTime}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.cookTime && (
                <p className="mt-1.5 text-sm text-red-500">{errors.cookTime}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--dark)]">
                Servings <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  name="servings"
                  type="number"
                  placeholder="4"
                  className={`pl-10 ${errors.servings ? "border-red-500" : ""}`}
                  value={formData.servings}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.servings && (
                <p className="mt-1.5 text-sm text-red-500">{errors.servings}</p>
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
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white focus:border-[var(--primary)] focus:outline-none"
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
      </div>

      {/* 2. Recipe Image */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
        <h2 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[var(--primary)]" /> Recipe
          Image
        </h2>
        <ImageUpload
          label="Upload a photo of your dish"
          onImageUpload={handleImageUploadLocal}
          onImageRemove={handleImageRemoveLocal}
          required={true}
          defaultImage={formData.image}
        />
        {errors.image && (
          <p className="mt-2 text-sm text-red-500">{errors.image}</p>
        )}
      </div>

      {/* 3. Cuisine Tags */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
        <h2 className="text-lg font-bold text-[var(--dark)] mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-[var(--primary)]" /> Cuisine Tags{" "}
          <span className="text-red-500 text-sm font-normal">*</span>
        </h2>
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
          <p className="mt-2 text-sm text-red-500">{errors.cuisineTags}</p>
        )}
      </div>

      {/* 4. Ingredients (Dynamic) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--dark)] flex items-center gap-2">
            <Box className="h-5 w-5 text-[var(--primary)]" /> Ingredients{" "}
            <span className="text-red-500 text-sm font-normal">*</span>
          </h2>
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center gap-1 rounded-lg border border-[var(--primary)] px-3 py-1.5 text-xs font-medium text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
          >
            {" "}
            <Plus className="h-3.5 w-3.5" /> Add Item
          </button>
        </div>
        {errors.ingredients && (
          <p className="mb-4 text-sm text-red-500">{errors.ingredients}</p>
        )}
        <div className="space-y-3">
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-3">
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
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                disabled={formData.ingredients.length === 1 || isSubmitting}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Steps (Dynamic) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--dark)] flex items-center gap-2">
            <ListOrdered className="h-5 w-5 text-[var(--primary)]" /> Steps{" "}
            <span className="text-red-500 text-sm font-normal">*</span>
          </h2>
          <button
            type="button"
            onClick={addStep}
            className="flex items-center gap-1 rounded-lg border border-[var(--primary)] px-3 py-1.5 text-xs font-medium text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
          >
            {" "}
            <Plus className="h-3.5 w-3.5" /> Add Step
          </button>
        </div>
        {errors.steps && (
          <p className="mb-4 text-sm text-red-500">{errors.steps}</p>
        )}
        <div className="space-y-3">
          {formData.steps.map((step, index) => (
            <div key={index} className="flex gap-3 items-start">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)] mt-0.5">
                {index + 1}
              </span>
              <div className="flex-1">
                <textarea
                  rows={2}
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
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
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-[var(--primary)] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-[var(--primary)]/20 transition hover:bg-[var(--primary)]/90 hover:shadow-lg disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

import { CheckCircle2 } from "lucide-react"; // Add this at the top of the file (if not already present)
export default RecipeForm;
