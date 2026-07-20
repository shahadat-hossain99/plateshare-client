"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  ShoppingCart,
  ChefHat,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import SectionTitle from "@/components/UI/SectionTitle";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const steps = [
  {
    icon: BookOpen,
    title: "Discover & Save",
    desc: "Browse thousands of delicious recipes from home cooks. Save your favorites to your personal digital 'Cookbook' for instant access anytime.",
    color: "bg-[var(--primary)]/10 text-[var(--primary)]",
    highlight: "var(--primary)",
  },
  {
    icon: CalendarDays,
    title: "Plan Your Week",
    desc: "Open the Meal Planner, pick a day and a meal slot (Breakfast, Lunch, Dinner), and simply assign a recipe. If you change your mind, just swap it out!",
    color: "bg-[var(--secondary)]/10 text-[var(--secondary)]",
    highlight: "var(--secondary)",
  },
  {
    icon: ShoppingCart,
    title: "Shop Smart",
    desc: "Watch as PlateShare automatically combines the ingredients from all your planned meals into one unified Shopping List. Checkout has never been faster.",
    color: "bg-orange-500/10 text-orange-500",
    highlight: "#f97316", // Orange highlight
  },
];

const benefits = [
  "Save 2+ hours a week on meal planning",
  "Reduce food waste with precise grocery lists",
  "Discover new cuisines from a global community",
  "Track your weekly cooking habits easily",
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden mt-4">
      {/* =========================================
         1. HERO SECTION (Matching About Page)
         ========================================= */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547592180-85f173990554?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto text-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white/90"
            >
              <Sparkles className="inline h-4 w-4 mr-2 text-[var(--secondary)]" />
              Simple. Streamlined. Delicious.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            >
              How{" "}
              <span className="block text-[var(--secondary)]">
                PlateShare Works
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              Stop wondering what to cook for dinner. From discovering a new
              recipe to walking out of the grocery store with exactly what you
              need, we make the journey effortless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Link href="/register">
                <Button variant="secondary" className="text-lg px-8 py-3">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/recipes">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 text-white border-white/30 hover:bg-white/10 hover:border-white"
                >
                  Browse Recipes
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* =========================================
         2. THE 3-STEP PROCESS
         ========================================= */}
      <section className="py-20 bg-[var(--background)]">
        <Container>
          <SectionTitle
            title="Cooking in 3 Easy Steps"
            subtitle="No fluff. Just a simple, intuitive workflow designed to get you from hungry to happy."
            center={true}
            withAnimation={true}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center rounded-2xl bg-white p-8 shadow-lg border border-gray-100 transition-shadow duration-300 hover:shadow-xl">
                  <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--dark)] text-xs font-bold text-white shadow-md">
                    {index + 1}
                  </div>

                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full ${step.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <step.icon className="h-10 w-10" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-[var(--dark)]">
                    {step.title}
                  </h3>

                  <div className="mt-4 h-px w-12 bg-gray-200" />

                  <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =========================================
         3. WHY IT WORKS (BENEFITS SECTION)
         ========================================= */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                  Why PlateShare
                </span>
              </div>
              <h2 className="text-4xl font-bold text-[var(--dark)]">
                Built for the way{" "}
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                  you cook
                </span>
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                We spent time watching how real families and individuals cook,
                meal prep, and grocery shop. PlateShare is the result of
                simplifying that exact process into an intuitive digital tool.
              </p>

              <div className="mt-6 space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[var(--secondary)] flex-shrink-0" />
                    <span className="text-[var(--dark)] font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link href="/register">
                  <Button
                    variant="primary"
                    className="shadow-lg shadow-[var(--primary)]/20"
                  >
                    Start Saving Time <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
            >
              <Image
                src="/banner/hero-04.jpg" // Using one of your local images
                alt="PlateShare Meal Planner in action"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Floating overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50 flex items-center justify-between">
                <div>
                  <p className="text-[var(--dark)] font-bold text-sm">
                    Meal Planner
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    3 recipes planned this week
                  </p>
                </div>
                <CalendarDays className="h-6 w-6 text-[var(--primary)]" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================================
         4. CTA SECTION
         ========================================= */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to Simplify Your{" "}
              <span className="text-[var(--secondary)]">Kitchen</span>
              <span className="text-white">?</span>
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join thousands of home cooks who have already transformed their
              weeknight dinners with PlateShare.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button variant="secondary" className="text-lg px-8 py-3">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/recipes">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 text-white border-white/30 hover:bg-white/10 hover:border-white"
                >
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
