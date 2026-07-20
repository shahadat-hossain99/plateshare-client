"use client";

import { motion } from "framer-motion";
import { Clock, Heart, ShoppingCart, Users } from "lucide-react";
import Container from "@/components/UI/Container";
import SectionTitle from "@/components/UI/SectionTitle";

const tips = [
  {
    icon: Clock,
    title: "Prep Ingredients in Bulk",
    desc: "Chop vegetables and cook grains in bulk on Sundays. Store them in airtight containers to cut down weeknight cooking time by 50%.",
  },
  {
    icon: Users,
    title: "Cook Once, Eat Twice",
    desc: "Doubling a recipe doesn't double the work. Cook larger batches and freeze half for busy weeks when you don't feel like cooking.",
  },
  {
    icon: ShoppingCart,
    title: "Shop with a List",
    desc: "Always generate your PlateShare Shopping List before heading to the store. It prevents impulse buying and ensures you never forget an ingredient.",
  },
  {
    icon: Heart,
    title: "Make it Fun",
    desc: "Try a new cuisine every week! PlateShare makes it easy to discover new recipes and expand your cooking skills.",
  },
];

export default function TipsPage() {
  return (
    <div className=" mt-4 min-h-screen bg-[var(--background)] py-20">
      <Container>
        <SectionTitle
          title="Meal Planning Tips"
          subtitle="Practical advice to help you cook smarter, save time, and enjoy your time in the kitchen."
          center={true}
          withAnimation={true}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-12">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[var(--primary)]/20 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                  <tip.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--dark)]">
                  {tip.title}
                </h3>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed pl-14">
                {tip.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
