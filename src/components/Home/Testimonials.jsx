"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Star, Quote, Utensils, Users, Award } from "lucide-react";
import Container from "@/components/UI/Container";

const testimonials = [
  {
    id: 1,
    name: "Chef Marcus Vance",
    role: "Professional Pastry Chef",
    location: "New York, NY",
    avatar:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    recipeTried: "Sourdough Brioche",
    review:
      "PlateShare has transformed how I document and share experimental bakes. The community feedback on crumb structure is top-tier!",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Home Cook & Foodie",
    location: "Austin, TX",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    recipeTried: "Smoked Birria Tacos",
    review:
      "I found my all-time favorite taco recipe on PlateShare last month. Step-by-step cook notes from real home cooks made all the difference.",
  },
  {
    id: 3,
    name: "David Sterling",
    role: "Meal Prep Enthusiast",
    location: "Seattle, WA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.5,
    recipeTried: "Thai Green Curry",
    review:
      "The meal planner integration directly with saved recipes saves me hours every week. PlateShare is an indispensable kitchen tool.",
  },
  {
    id: 4,
    name: "Amina Al-Mansoor",
    role: "Culinary Blogger",
    location: "Chicago, IL",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    recipeTried: "Saffron Seafood Paella",
    review:
      "Sharing authentic family recipes here feels special. The visual layout and supportive comments make cooking feel so connected.",
  },
  {
    id: 5,
    name: "Liam O'Connor",
    role: "Weekend BBQ Master",
    location: "Denver, CO",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    recipeTried: "12-Hour Smoked Brisket",
    review:
      "The precision in spice rub ratios shared by fellow pitmasters here took my Sunday briskets to a whole new championship level.",
  },
  {
    id: 6,
    name: "Elena Rostova",
    role: "Plant-Based Chef",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 4.5,
    recipeTried: "Cashew Cream Ramen",
    review:
      "Finding high-flavor vegan variations can be tough. PlateShare’s filter options make discovering creative plant-forward dishes seamless.",
  },
];

// Reusable Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : star - 0.5 <= rating
                ? "fill-amber-400/50 text-amber-400"
                : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        {/* Header - Styled like FAQ Section */}
        <div className="relative mx-auto mb-14 max-w-2xl text-center">
          {/* Sub-badge with side lines */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="h-0.5 w-8 rounded-full bg-[var(--primary)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
              TESTIMONIALS
            </span>
            <span className="h-0.5 w-8 rounded-full bg-[var(--primary)]" />
          </motion.div>

          {/* Title matching FAQ gradient phrasing */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-[var(--dark)] sm:text-4xl"
          >
            Loved by Home Cooks &{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Food Creators
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed"
          >
            Discover how PlateShare brings food enthusiasts together to cook,
            share recipes, and inspire everyday meals.
          </motion.p>
        </div>
      </Container>

      {/* SINGLE LINE MARQUEE */}
      <div className="relative w-full">
        {/* Soft edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

        <Marquee gradient={false} speed={35} pauseOnHover className="py-2">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative mx-3.5 w-80 sm:w-96 shrink-0 rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-sm hover:border-[var(--primary)]/30 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--primary)]/20">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[var(--dark)] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-[var(--primary)]/20 group-hover:text-[var(--primary)]/40 transition-colors shrink-0" />
                </div>

                {/* Recipe Badge */}
                <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-md bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-[var(--primary)]">
                  <Utensils className="h-3 w-3" />
                  <span>
                    Made:{" "}
                    <strong className="font-semibold">
                      {item.recipeTried}
                    </strong>
                  </span>
                </div>

                {/* Review Body */}
                <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  &quot;{item.review}&quot;
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <StarRating rating={item.rating} />
                <span className="text-[11px] font-medium text-gray-400">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Subtle Bottom Stats Bar */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[var(--text-secondary)]"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[var(--primary)]" />
            <span>
              <strong className="text-[var(--dark)]">12,000+</strong> Food
              Lovers
            </span>
          </div>

          <span className="hidden h-3.5 w-px bg-gray-200 sm:block" />

          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[var(--primary)]" />
            <span>
              <strong className="text-[var(--dark)]">4,500+</strong> Shared
              Recipes
            </span>
          </div>

          <span className="hidden h-3.5 w-px bg-gray-200 sm:block" />

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>
              <strong className="text-[var(--dark)]">4.9/5</strong> Community
              Rating
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
