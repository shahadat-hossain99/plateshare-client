"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail("");
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-90" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547592180-85f173990554?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Weekly Digest
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Get the Best Recipes Weekly
          </h2>
          <p className="mt-4 text-white/80 max-w-lg mx-auto">
            Join our community and receive delicious, hand-picked recipes and
            meal planning tips directly to your inbox every Monday.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            {!submitted ? (
              <>
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full bg-white/20 border border-white/30 px-6 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-white text-[var(--dark)] hover:bg-gray-100 shadow-lg shadow-black/20"
                >
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500/90 px-6 py-3 text-white shadow-lg backdrop-blur-sm"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Subscribed successfully!</span>
              </motion.div>
            )}
          </form>
          <p className="mt-4 text-xs text-white/50">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Newsletter;
