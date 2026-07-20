"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/UI/Container";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Last updated: July 2026
          </p>

          <div className="mt-8 space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                1. Introduction
              </h2>
              <p>
                Welcome to PlateShare. By accessing or using our platform, you
                agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                2. User Accounts
              </h2>
              <p>
                You must be at least 18 years old to create an account on
                PlateShare. You are responsible for maintaining the
                confidentiality of your password and for all activities that
                occur under your account. You agree to provide accurate and
                complete information when registering.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                3. User-Generated Content
              </h2>
              <p>
                By posting recipes, images, or comments on PlateShare, you grant
                us a non-exclusive, transferable, sub-licensable, royalty-free
                license to host, use, and display your content. You retain
                ownership of your original content, but you are solely
                responsible for ensuring that your content does not violate any
                third-party copyrights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                4. Prohibited Activities
              </h2>
              <p>
                You may not use PlateShare for any illegal purposes, to harass
                or harm other users, or to upload malware or harmful content.
                You may not attempt to reverse engineer our platform or
                circumvent our security measures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                5. Intellectual Property
              </h2>
              <p>
                The PlateShare name, logo, and website design elements are the
                exclusive property of PlateShare. You may not reproduce or use
                these elements without explicit written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                PlateShare is provided &quot;as is&quot; without warranties of
                any kind. We are not liable for any inaccuracies in
                user-submitted recipes, damages resulting from the use of our
                platform, or availability issues.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm">
                For questions regarding these terms, please contact us at{" "}
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
