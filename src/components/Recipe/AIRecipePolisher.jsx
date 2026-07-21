"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, RefreshCw, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { serverMutation } from "@/lib/core/server";

const AIRecipePolisher = ({ isOpen, onClose, onApply }) => {
  const [step, setStep] = useState("input"); // input, loading, results
  const [formData, setFormData] = useState({
    ingredients: "",
    steps: "",
    tone: "casual",
    length: "medium",
  });
  const [aiResult, setAiResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.ingredients.trim() || !formData.steps.trim()) {
      toast.error("Please enter both ingredients and steps.");
      return;
    }

    setIsGenerating(true);
    setStep("loading");
    try {
      // Send the raw string steps. Your backend automatically converts it to an array!
      const response = await serverMutation("/api/ai/generate-recipe-copy", {
        ingredients: formData.ingredients,
        steps: formData.steps,
        tone: formData.tone,
        length: formData.length,
      });

      setAiResult(response.data);
      setStep("results");
      toast.success("AI polished your recipe!");
    } catch (error) {
      toast.error(error.message || "AI generation failed");
      setStep("input");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (aiResult) {
      // 🛡️ Safety check: Ensure steps is an array before passing to parent
      const safeResult = {
        ...aiResult,
        steps: Array.isArray(aiResult.steps)
          ? aiResult.steps
          : [aiResult.steps],
      };
      onApply(safeResult);
      onClose();
      toast.success("AI content applied to your recipe!");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--primary)]" />
              <h3 className="text-xl font-bold text-[var(--dark)]">
                AI Recipe Polisher
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {step === "input" && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--dark)]">
                  Rough Ingredients
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 2 cups flour, 1 egg, salt"
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--dark)]">
                  Rough Steps
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 1. Mix dry. 2. Add wet. 3. Bake."
                  value={formData.steps}
                  onChange={(e) =>
                    setFormData({ ...formData, steps: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) =>
                      setFormData({ ...formData, tone: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="casual">Casual & Friendly</option>
                    <option value="professional">Professional & Elegant</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--dark)]">
                    Length
                  </label>
                  <select
                    value={formData.length}
                    onChange={(e) =>
                      setFormData({ ...formData, length: e.target.value })
                    }
                    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:border-[var(--primary)]"
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-[var(--primary)] text-white"
              >
                <Wand2 className="mr-2 h-4 w-4" /> Generate with AI
              </Button>
            </div>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
              <p className="mt-4 text-[var(--text-secondary)]">
                Cooking up your perfect recipe...
              </p>
            </div>
          )}

          {step === "results" && aiResult && (
            <div className="space-y-4">
              <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> AI successfully polished
                your recipe!
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--dark)]">
                  Polished Title
                </label>
                <Input value={aiResult.title} readOnly className="bg-gray-50" />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--dark)]">
                  Polished Description
                </label>
                <textarea
                  rows={2}
                  value={aiResult.description}
                  readOnly
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--dark)]">
                  Polished Steps
                </label>
                <div className="space-y-1 max-h-40 overflow-y-auto bg-gray-50 rounded-xl p-3 border border-gray-200">
                  {aiResult.steps.map((step, i) => (
                    <div key={i} className="flex gap-2 text-sm py-1">
                      <span className="font-bold text-[var(--primary)]">
                        {i + 1}.
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={() => setStep("input")}
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-2 bg-[var(--primary)] text-white"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Apply to Recipe
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIRecipePolisher;
