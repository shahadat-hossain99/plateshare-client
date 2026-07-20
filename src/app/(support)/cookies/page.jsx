"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/UI/Container";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-4xl font-bold text-[var(--dark)]">
            Cookie Policy
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Last updated: July 2026
          </p>

          <div className="mt-8 space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your device by
                websites you visit. They are widely used to make websites work
                more efficiently and to provide information to the site owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                2. How PlateShare Uses Cookies
              </h2>
              <p>
                PlateShare uses cookies to remember your session (keeping you
                logged in), to store your saved recipes temporarily, and to
                analyze traffic to our site via Google Analytics. This helps us
                understand which features are most popular.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                3. Types of Cookies We Use
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the platform
                  to function (e.g., authentication).
                </li>
                <li>
                  <strong>Analytical/Performance Cookies:</strong> Help us
                  improve the site based on user behavior.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember your
                  preferences and settings.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                4. Managing Your Cookies
              </h2>
              <p>
                You can control and manage cookies in your browser settings.
                Please note that disabling certain cookies may impact the
                functionality of PlateShare, such as staying logged in.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm">
                For cookie-related questions, please contact us at{" "}
                <Link
                  href="/contact"
                  className="text-[var(--primary)] font-medium hover:underline"
                >
                  hello@plateshare.com
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
