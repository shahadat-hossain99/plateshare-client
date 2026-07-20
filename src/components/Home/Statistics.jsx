"use client";

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
import SectionTitle from "@/components/UI/SectionTitle";

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
  { label: "Recipes Shared", value: "12,450+", suffix: "+ this month" },
  { label: "Meals Planned", value: "45,200", suffix: " weeks planned" },
  { label: "Active Cooks", value: "8.6k", suffix: " daily users" },
];

const Statistics = () => {
  return (
    <section className="py-16 sm:py-24 bg-[var(--background)] overflow-hidden">
      <Container>
        <SectionTitle
          title="Growing Community"
          subtitle="See how the PlateShare community is growing every single day."
          center={true}
          withAnimation={true}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left: The Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-[300px] md:h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRecipes" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.3}
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
                  stroke="#E5E7EB"
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
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="recipes"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorRecipes)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Right: The Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 text-center"
              >
                <h3 className="text-3xl font-extrabold text-[var(--primary)]">
                  {stat.value}
                </h3>
                <p className="mt-1 text-sm font-bold text-[var(--dark)]">
                  {stat.label}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {stat.suffix}
                </p>
              </motion.div>
            ))}
            {/* Spacer for layout alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="hidden sm:flex rounded-2xl bg-white p-6 shadow-lg border border-gray-100 text-center items-center justify-center bg-gradient-to-br from-[var(--primary)]/5 to-[var(--secondary)]/5"
            >
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                2x Growth <br />
                YoY
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
