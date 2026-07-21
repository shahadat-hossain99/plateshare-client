"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Lock, LogIn, ArrowLeft } from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

export default function Unauthorized() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--background)] py-20">
      {/* Background Warning Mesh */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
        <div className="h-96 w-96 rounded-full bg-amber-500 blur-[130px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Lock Icon Badge */}
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.2, 0.4] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-amber-500/30 bg-amber-50/50"
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-500/25"
            >
              <Lock className="h-10 w-10" />
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>401 • Access Restricted</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl font-black tracking-tight text-[var(--dark)] sm:text-5xl">
            Members-Only Kitchen
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg leading-relaxed max-w-lg mx-auto">
            You need to be logged in with proper credentials to access this
            section of PlateShare.
          </p>

          {/* Indication Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-6 mx-auto max-w-lg rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-center shadow-inner dark:border-amber-900/40 dark:bg-amber-950/20"
          >
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              🔒 Please sign in to your PlateShare account or switch to an
              authorized user profile to continue.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/25 hover:scale-105 transition-all border-none"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In Now
              </Button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-gray-200 text-[var(--dark)] hover:bg-gray-100/80 hover:scale-105 transition-transform"
              >
                <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                Return to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
