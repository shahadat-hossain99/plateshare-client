"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[var(--background)] overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before getting started."
            center={true}
            withAnimation={true}
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50/50"
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
                      className="px-6 pb-4"
                    >
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
