"use client";

import React from "react";
import { motion } from "framer-motion";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]/85 backdrop-blur-md transition-all">
      {/* Central Visual Container */}
      <div className="relative flex items-center justify-center">
        {/* Outer Counter-Rotating Glow Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-full border border-dashed border-[var(--primary)]/30"
        />

        {/* Primary Fast Spinning Arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1 rounded-full border-2 border-transparent border-t-[var(--primary)] border-r-[var(--secondary)]"
        />

        {/* Central Icon Capsule */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: 1,
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.4 },
          }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-xl shadow-[var(--primary)]/20"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl select-none"
          >
            🍽️
          </motion.span>
        </motion.div>
      </div>

      {/* Loading Text & Animated Dots */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 space-y-1.5 text-center"
      >
        <div className="flex items-center justify-center gap-1">
          <h3 className="text-lg font-bold tracking-tight text-[var(--dark)]">
            Loading PlateShare
          </h3>
          {/* Bouncing Dots */}
          <div className="flex items-center gap-1 pt-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]"
              />
            ))}
          </div>
        </div>

        <p className="text-xs font-medium text-[var(--text-secondary)] tracking-wide">
          Preparing your culinary experience...
        </p>
      </motion.div>

      {/* Modern Indeterminate Progress Bar */}
      <div className="mt-6 h-1.5 w-44 overflow-hidden rounded-full bg-[var(--primary)]/15">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
        />
      </div>
    </div>
  );
};

export default GlobalLoading;
