"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";

const faqs = [
  {
    q: "Is PlateShare completely free to use?",
    a: "Yes! PlateShare is completely free for all users. You can browse recipes, save them to your cookbook, and use the weekly meal planner without any subscription fees.",
  },
  {
    q: "Do I need to create an account to save recipes?",
    a: "Yes, you need to register for a free account to save recipes to your 'My Cookbook' and to use the Meal Planner. However, you can browse and view all public recipes without an account.",
  },
  {
    q: "Can I edit or delete a recipe I published?",
    a: "Absolutely. You have full control over your recipes. If you are the owner of a recipe, you can edit the title, description, ingredients, steps, and images, or delete it permanently from your profile.",
  },
  {
    q: "How does the Meal Planner generate a shopping list?",
    a: "The Meal Planner scans all the recipes assigned to your week, combines their ingredients, and generates a unified shopping list. Duplicate items are automatically merged, making your grocery trips faster!",
  },
  {
    q: "What happens if I delete a recipe that's in someone's Meal Plan?",
    a: "If you delete a recipe you published, it will be automatically removed from any user's Meal Planner and Cookbook to prevent broken links.",
  },
  {
    q: "Is my personal data safe on PlateShare?",
    a: "Yes, we take privacy seriously. Your password is hashed, your data is securely stored, and we strictly follow our Privacy Policy and Terms of Service to protect your information.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-4 min-h-screen bg-[var(--background)] py-20">
      <Container>
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about using PlateShare."
          center={true}
          withAnimation={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
              >
                <span className="font-semibold text-[var(--dark)]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-[var(--primary)] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
