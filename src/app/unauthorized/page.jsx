"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, LogIn, ArrowLeft } from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

export default function Unauthorized() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--background)] py-20 mt-4">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-80 w-80 rounded-full bg-[var(--primary)] blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          {/* Lock Icon Badge */}
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.15, 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-[var(--primary)] bg-[var(--primary)]/10"
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
            >
              <Lock className="h-8 w-8" />
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)]"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>401 • Access Restricted</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl font-black tracking-tight text-[var(--dark)] sm:text-5xl">
            Members-Only Kitchen
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
            You need to be logged in with proper credentials to access this
            section of PlateShare.
          </p>

          {/* High-Contrast Indication Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-6 mx-auto max-w-md rounded-xl border border-[var(--border-color)] bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm"
          >
            <p className="text-xs font-semibold text-[var(--dark)] leading-normal">
              🔒 Please sign in to your PlateShare account or switch to an
              authorized user profile to continue.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full shadow-md shadow-[var(--primary)]/20 hover:scale-105 transition-all"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In Now
              </Button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-[var(--border-color)] bg-white/50 text-[var(--dark)] hover:bg-white hover:scale-105 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4 text-[var(--text-secondary)]" />
                Return to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
