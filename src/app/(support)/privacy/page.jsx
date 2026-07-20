"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/UI/Container";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Last updated: July 2026
          </p>

          <div className="mt-8 space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as your
                name, email address, profile picture, and any recipes or meal
                plans you upload. We also automatically collect certain data
                about your device and how you interact with our platform to
                improve user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                Your data is used to provide, maintain, and improve
                PlateShare&apos;s services. This includes personalizing your
                recipe recommendations, generating your grocery lists, and
                communicating important updates or security alerts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                3. Data Storage & Security
              </h2>
              <p>
                Your data is securely stored on MongoDB Atlas. Passwords are
                encrypted using advanced hashing algorithms. We implement strict
                security measures to protect your personal information from
                unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                4. Sharing Your Information
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. Your recipes and public profile are visible to
                the community, but your private account details remain secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                5. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                data at any time. You can manage your account settings or
                request data deletion by contacting our support team.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm">
                For privacy-specific inquiries, please contact us at{" "}
                <Link
                  href="/contact"
                  className="text-[var(--primary)] font-medium hover:underline"
                >
                  privacy@plateshare.com
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
