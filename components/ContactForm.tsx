"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactForm } from "@/app/actions";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.error) {
      setStatus("error");
      setErrorMessage(result.error);
    } else {
      setStatus("success");
      // Reset form
      e.currentTarget.reset();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center p-8 bg-surface rounded-sm border border-border"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">
              Message Sent!
            </h3>
            <p className="text-muted mb-6">
              Thank you for reaching out. I&apos;ll get back to you as soon as
              possible.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-muted"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-muted"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-muted"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="Commission Inquiry"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {status === "error" && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-sm">
                {errorMessage || "Something went wrong. Please try again."}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 bg-primary text-inverted font-serif font-bold rounded-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
