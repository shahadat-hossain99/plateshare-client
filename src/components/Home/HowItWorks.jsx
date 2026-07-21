"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, ShoppingCart } from "lucide-react";
import Container from "@/components/UI/Container";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        {/* Header matching design system */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
              Simple Process
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
            How It{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-3 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            Get from recipe discovery to the dinner table in three simple steps.
          </motion.p>
        </motion.div>

        {/* Steps Grid Container */}
        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="absolute left-[15%] right-[15%] top-10 hidden h-[2px] bg-dashed border-b-2 border-dashed border-gray-200 md:block z-0" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8 relative z-10"
          >
            {steps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-xl"
                >
                  {/* Icon Container Wrap */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl border-4 transition-transform duration-300"
                      style={{
                        borderColor: step.color,
                        boxShadow: `0 0 0 4px white, inset 0 0 0 1px ${step.color}, 0 20px 25px -5px rgb(0 0 0 / 0.1)`,
                      }}
                    >
                      <StepIcon
                        className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: step.color }}
                      />
                    </motion.div>

                    {/* Step Counter Badge */}
                    <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--dark)] text-xs font-bold text-white shadow-md">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Text Blocks */}
                  <h3 className="text-lg font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
