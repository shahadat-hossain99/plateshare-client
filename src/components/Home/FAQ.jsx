"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import Container from "@/components/UI/Container";

const faqs = [
  {
    q: "Is PlateShare completely free to use?",
    a: "Yes! PlateShare is 100% free for all basic features including browsing recipes, creating a cookbook, and using the weekly meal planner.",
  },
  {
    q: "Can I save recipes from other users?",
    a: "Absolutely. You can save any public recipe to your personal 'My Cookbook' section for quick access later.",
  },
  {
    q: "How does the Meal Planner work?",
    a: "Simply drag recipes from your cookbook onto specific days and meal slots (Breakfast, Lunch, Dinner). The app will automatically generate a combined shopping list for the week.",
  },
  {
    q: "Can I publish my own recipes?",
    a: "Yes! Registered users can add their own recipes, complete with ingredients, steps, cooking time, and images.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // Default open first item

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header matching design system */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block h-1 rounded-full bg-[var(--primary)]"
              />
              <span className="text-xs font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                Got Questions?
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block h-1 rounded-full bg-[var(--primary)]"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[var(--dark)]"
            >
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-3 text-[var(--text-secondary)] leading-relaxed"
            >
              Everything you need to know before getting started.
            </motion.p>
          </motion.div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border bg-white shadow-sm transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--primary)]/40 ring-2 ring-[var(--primary)]/10 shadow-md"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle
                        className={`h-5 w-5 shrink-0 transition-colors ${
                          isOpen ? "text-[var(--primary)]" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-bold transition-colors ${
                          isOpen
                            ? "text-[var(--primary)]"
                            : "text-[var(--dark)]"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[var(--primary)]/10 text-[var(--primary)] rotate-180"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pl-14 pt-1 border-t border-gray-50">
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
