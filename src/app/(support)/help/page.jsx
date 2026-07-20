"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, BookOpen, User, Settings, ArrowRight } from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";

const helpTopics = [
  {
    icon: BookOpen,
    title: "Getting Started",
    desc: "Learn how to create your account, set up your profile, and explore the app.",
    href: "#",
  },
  {
    icon: User,
    title: "Account & Profile",
    desc: "Manage your personal information, change your password, and handle profile photos.",
    href: "#",
  },
  {
    icon: HelpCircle,
    title: "Recipes & Cookbook",
    desc: "How to add, edit, delete recipes and organize your saved Cookbook.",
    href: "#",
  },
  {
    icon: Settings,
    title: "Meal Planner & Lists",
    desc: "Troubleshooting the weekly planner, generating grocery lists, and planning meals.",
    href: "#",
  },
];

export default function HelpPage() {
  return (
    <div className="mt-4 min-h-screen bg-[var(--background)] py-20">
      <Container>
        <SectionTitle
          title="Help Center"
          subtitle="Find answers to common questions and learn how to make the most of PlateShare."
          center={true}
          withAnimation={true}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {helpTopics.map((topic, index) => (
            <Link key={index} href={topic.href}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[var(--primary)]/20 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <div className="rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">
                    <topic.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--dark)] group-hover:text-[var(--primary)] transition-colors">
                      {topic.title}
                    </h3>
                    <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">
                      {topic.desc}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[var(--text-secondary)] transition group-hover:translate-x-1 group-hover:text-[var(--primary)]" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-secondary)]">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link
              href="/contact"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
