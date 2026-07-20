"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, ShoppingCart } from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";

const steps = [
  {
    icon: BookOpen,
    title: "Discover & Save",
    desc: "Browse thousands of recipes and save your favorites to your personal Cookbook.",
    color: "var(--primary)",
  },
  {
    icon: CalendarDays,
    title: "Plan Your Week",
    desc: "Drag and drop recipes into your Weekly Meal Planner to organize your meals.",
    color: "var(--secondary)",
  },
  {
    icon: ShoppingCart,
    title: "Shop Smart",
    desc: "Generate a unified shopping list from your planned recipes and breeze through the store.",
    color: "var(--primary)",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        <SectionTitle
          title="How It Works"
          subtitle="Get from recipe discovery to the dinner table in three simple steps."
          center={true}
          withAnimation={true}
        />

        <div className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Connecting Line (Desktop Only) - Aligned to icon centers */}
          <div className="absolute left-0 top-10 hidden h-0.5 w-full -translate-y-1/2 bg-gray-100 md:block z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center z-10"
            >
              {/* Icon Container Wrap for Correct Badge Positioning */}
              <div className="relative">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl border-4"
                  style={{
                    borderColor: step.color,
                    boxShadow: `0 0 0 4px white, inset 0 0 0 1px ${step.color}, 0 20px 25px -5px rgb(0 0 0 / 0.1)`,
                  }}
                >
                  <step.icon
                    className="h-8 w-8"
                    style={{ color: step.color }}
                  />
                </div>

                {/* Step Counter Badge */}
                <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--dark)] text-xs font-bold text-white shadow-md">
                  {index + 1}
                </div>
              </div>

              {/* Text Blocks */}
              <h3 className="mt-6 text-lg font-bold text-[var(--dark)]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[var(--text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
