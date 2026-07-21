"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Container from "@/components/UI/Container";

const data = [
  { name: "Jan", recipes: 120 },
  { name: "Feb", recipes: 210 },
  { name: "Mar", recipes: 180 },
  { name: "Apr", recipes: 350 },
  { name: "May", recipes: 420 },
  { name: "Jun", recipes: 500 },
  { name: "Jul", recipes: 680 },
];

const stats = [
  { label: "Recipes Shared", value: "12,450+", suffix: "this month" },
  { label: "Meals Planned", value: "45,200", suffix: "weeks planned" },
  { label: "Active Cooks", value: "8.6k", suffix: "daily users" },
];

export default function Statistics() {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration issues with Recharts on SSR
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
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
            Growing{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Community
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-3 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            See how the PlateShare community is growing every single day.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          {/* Left: The Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[320px] sm:h-[360px]"
          >
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRecipes"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--primary)"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F3F4F6"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      backgroundColor: "#FFFFFF",
                      fontSize: "13px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="recipes"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRecipes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-gray-50 rounded-xl animate-pulse" />
            )}
          </motion.div>

          {/* Right: The Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center transition-all hover:shadow-xl hover:border-[var(--primary)]/20 flex flex-col justify-center items-center"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="mt-2 text-sm font-bold text-[var(--dark)]">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                  {stat.suffix}
                </p>
              </motion.div>
            ))}

            {/* Growth Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 via-[var(--primary)]/5 to-[var(--secondary)]/10 p-6 border border-[var(--primary)]/20 shadow-sm text-center flex flex-col items-center justify-center transition-all hover:shadow-xl"
            >
              <span className="text-2xl font-black text-[var(--primary)]">
                2x
              </span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--dark)]">
                Year Over Year Growth
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
