"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, RotateCcw, Home, AlertOctagon } from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

export default function Error({ error, reset }) {
  // Log the error to the console (or an error tracking service like Sentry)
  useEffect(() => {
    console.error("PlateShare Caught Error:", error);
  }, [error]);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--background)] py-20">
      {/* Subtle Background Glow for Error State */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-96 w-96 rounded-full bg-red-500 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Animated Error Badge */}
          <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
            {/* Pulsing Alert Ring */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-red-500/30 bg-red-50/50"
            />

            {/* Shaking Icon Container */}
            <motion.div
              animate={{ rotate: [-5, 5, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-xl shadow-red-500/25"
            >
              <Flame className="h-10 w-10" />
            </motion.div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-black tracking-tight text-[var(--dark)] sm:text-5xl">
            Kitchen Disaster!
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg leading-relaxed max-w-lg mx-auto">
            Something went terribly wrong in the backend kitchen. Our chefs are
            looking into it right now.
          </p>

          {/* Error Indication Box */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-6 mx-auto max-w-lg overflow-hidden rounded-xl border border-red-200 bg-red-50/50 p-4 text-left shadow-inner backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-2 text-red-600">
              <AlertOctagon className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Error Details
              </span>
            </div>
            <p className="font-mono text-sm text-red-800 break-words line-clamp-3">
              {error?.message ||
                "An unexpected system error occurred while processing your request."}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Retry Button */}
            <Button
              onClick={() => reset()}
              variant="primary"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/25 hover:scale-105 transition-all border-none"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            {/* Go Home Button */}
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-gray-200 text-[var(--dark)] hover:bg-gray-100/80 hover:scale-105 transition-transform"
              >
                <Home className="mr-2 h-4 w-4 text-gray-500" />
                Return to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
