"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We discuss your vision, select the perfect reference photo, and decide on the size and style.",
  },
  {
    number: "02",
    title: "Sketching",
    description:
      "I create the initial outline, establishing proportions and composition on high-quality paper.",
  },
  {
    number: "03",
    title: "Refining",
    description:
      "Layer by layer, I add depth, shading, and intricate details to bring the subject to life.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "The final piece is sealed, carefully packaged, and shipped to your doorstep.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">
            The Process
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-secondary max-w-2xl mx-auto">
            From the first conversation to the final stroke, every step is
            handled with care and precision.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-neutral-400 dark:bg-neutral-800 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-400 dark:border-neutral-700 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300 z-10">
                <span className="text-3xl font-serif font-bold text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors duration-300">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
