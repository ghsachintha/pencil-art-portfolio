"use client";

import { GlassContainer } from "./GlassContainer";
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
    <section className="py-24 relative overflow-hidden bg-material-thin/40 backdrop-blur-glass-regular border-y border-glass-border">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-4">
            The Process
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full opacity-80" />
          <p className="mt-4 text-text-muted max-w-2xl mx-auto text-lg font-light">
            From the first conversation to the final stroke, every step is
            handled with care and precision.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) - Glassy */}
          <div className="hidden md:block absolute top-[3.75rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-glass-border-highlight to-transparent opacity-50 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex flex-col items-center text-center group"
            >
              <GlassContainer
                intensity="regular"
                className="w-32 h-32 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
              >
                <span className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-text-main to-text-muted opacity-80 group-hover:opacity-100 transition-opacity">
                  {step.number}
                </span>
              </GlassContainer>

              <h3 className="text-xl font-serif font-bold text-text-main mb-3">
                {step.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
