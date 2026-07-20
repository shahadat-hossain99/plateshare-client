"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Users,
  Award,
  Clock,
  ArrowRight,
  Star,
  ChefHat,
  BookOpen,
  Heart,
  Sparkles,
} from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
    },
  },
};

export default function AboutPage() {
  // Core Values mapped to cooking & community
  const values = [
    {
      icon: BookOpen,
      title: "Recipe Discovery",
      desc: "Explore thousands of curated recipes from home cooks all over the world.",
      color: "from-[var(--primary)] to-orange-500",
    },
    {
      icon: Users,
      title: "Community First",
      desc: "Built by cooks, for cooks. Share your culinary creations and learn from others.",
      color: "from-[var(--secondary)] to-emerald-500",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      desc: "Verified users, secure data, and a safe environment for your food journey.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Stats relavant to a Recipe App
  const stats = [
    { number: "12K+", label: "Active Home Cooks", icon: Users },
    { number: "500+", label: "Curated Recipes", icon: ChefHat },
    { number: "4.9★", label: "Average Rating", icon: Star },
    { number: "45K+", label: "Meals Planned", icon: Clock },
  ];

  // Replace these with your actual team photos if you have them
  const team = [
    {
      name: "Shahadat Hossain",
      role: "Founder & Lead Developer",
      avatar: "https://i.ibb.co.com/hxS97HZ3/800kb.png",
    },
    {
      name: "Ruhin Ahmed",
      role: "UI/UX Designer",
      avatar:
        "https://i.ibb.co.com/Psb6SdnL/Whats-App-Image-2026-05-07-at-2-19-54-PM.jpg",
    },
    {
      name: "Hasotullah Khan",
      role: "Community Manager",
      avatar:
        "https://i.ibb.co.com/xt0nBhZM/Whats-App-Image-2026-05-07-at-2-41-33-PM.jpg",
    },
    {
      name: "Sarah Al-Mansur",
      role: "Recipe Curator",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Idea was Born",
      desc: "PlateShare started as a simple idea to help friends share meal plans and grocery lists.",
    },
    {
      year: "2024",
      title: "500+ Recipes Published",
      desc: "Our community grew rapidly, publishing over 500 unique and delicious recipes.",
    },
    {
      year: "2025",
      title: "The Meal Planner Launched",
      desc: "We introduced the drag-and-drop Weekly Meal Planner, changing how people cook.",
    },
    {
      year: "2026",
      title: "Building the Future",
      desc: "Expanding AI tools to help chefs polish their recipes and organize their kitchens.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden mt-4">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-[var(--primary)] to-[var(--dark)] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] rounded-full blur-3xl" />
        </div>

        {/* Subtle Background Image */}
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
              <ChefHat className="inline h-4 w-4 mr-2 text-[var(--secondary)]" />
              Welcome to PlateShare
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            >
              Connecting You to
              <span className="block text-[var(--secondary)]">
                Culinary Community
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              We are building a warm, digital kitchen where home cooks share
              recipes, plan their weeks, and inspire each other to cook smarter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Link href="/recipes">
                <Button variant="secondary" className="text-lg px-8 py-3">
                  Explore Recipes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 text-white border-white/30 hover:bg-white/10 hover:border-white"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--background)]">
        <Container>
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
                Our Impact
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
              PlateShare by the{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Numbers
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3 },
                }}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-lg"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative text-center">
                  <stat.icon className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[var(--dark)]">
                    {stat.number}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Who We Are - About the App */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
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
                About Us
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
              Who We{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Are
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 space-y-4 text-[var(--text-secondary)] leading-relaxed"
            >
              <p>
                Founded by passionate home cooks and developers, PlateShare
                bridges the gap between cooking inspiration and practical
                execution. We make meal planning effortless and sharing
                delicious food fun.
              </p>
              <p>
                We believe that everyone deserves to enjoy home-cooked meals
                without the daily stress of &quot;What&apos;s for dinner?&quot;
                Our platform is dedicated to simplifying the kitchen, one recipe
                at a time.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[var(--background)]">
        <Container>
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
                Our Values
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
              What We{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Stand For
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover="hover"
                className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${v.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 inline-flex rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition"
                  >
                    <v.icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition mb-2">
                    {v.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${v.color}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Milestones / Timeline */}
      <section className="py-20 bg-white">
        <Container>
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
                Journey
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
              Our{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Milestones
              </span>
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex gap-6 py-6 border-b border-gray-100 last:border-b-0 hover:border-[var(--primary)]/20 transition-colors"
              >
                <div className="flex-shrink-0 w-20 text-[var(--primary)] font-bold text-2xl group-hover:text-[var(--secondary)] transition-colors">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[var(--background)]">
        <Container>
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
                Team
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
              Meet the{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Team
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-lg"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative mx-auto h-32 w-32 rounded-full overflow-hidden ring-4 ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/40 transition-all"
                  >
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <h3 className="mt-4 font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
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
              Ready to Start Your{" "}
              <span className="text-[var(--secondary)]">Cooking</span>
              <span className="text-white"> Journey?</span>
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join thousands of home cooks who save time, cook delicious meals,
              and plan their week effortlessly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button variant="secondary" className="text-lg px-8 py-3">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 text-white border-white/30 hover:bg-white/10 hover:border-white"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
