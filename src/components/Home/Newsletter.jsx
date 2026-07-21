"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail } from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "../UI/Button";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-[var(--primary)]/5 via-orange-50/40 to-[var(--secondary)]/10 p-8 sm:p-14 border border-[var(--primary)]/15 shadow-sm text-center overflow-hidden"
        >
          {/* Soft Decorative Ambient Glows */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[var(--secondary)]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Header Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block h-1 rounded-full bg-[var(--primary)]"
              />
              <span className="text-xs font-semibold uppercase tracking-[3px] text-[var(--primary)]">
                Stay Inspired
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block h-1 rounded-full bg-[var(--primary)]"
              />
            </div>

            {/* Main Title with crystal clear contrast */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--dark)] tracking-tight">
              Ready to Upgrade Your{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Cooking Journey?
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Join thousands of food lovers. Get hand-picked trending recipes,
              seasonal meal plans, and cooking hacks sent straight to your inbox
              every Sunday.
            </p>

            {/* Form / Success State */}
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-6 py-3 text-emerald-600 font-semibold border border-emerald-200 text-sm"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span>You&apos;re on the list! Welcome to the community.</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full rounded-full border border-gray-200 bg-white pl-11 pr-5 py-3.5 text-sm text-[var(--dark)] placeholder-gray-400 shadow-sm outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                </div>

                <Button
                  type="submit"
                  // className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 px-7 py-3.5"
                >
                  Join Free <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
