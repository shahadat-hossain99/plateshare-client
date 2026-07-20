"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Container from "@/components/UI/Container";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Fake submission delay
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-20 mt-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[var(--dark)]">
              Get in Touch
            </h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              Have a question, feedback, or a recipe to share? We&apos;d love to
              hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left: Contact Info */}
            <div className="space-y-6 lg:col-span-1">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Email
                    </p>
                    <p className="font-medium text-[var(--dark)]">
                      hello@plateshare.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Phone
                    </p>
                    <p className="font-medium text-[var(--dark)]">
                      +1 (234) 567-890
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--primary)]/10 p-3 rounded-full text-[var(--primary)]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Location
                    </p>
                    <p className="font-medium text-[var(--dark)]">
                      123 Flavor Street, Kitchen City
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4 lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Your Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--dark)]">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none transition"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--primary)] text-white"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
