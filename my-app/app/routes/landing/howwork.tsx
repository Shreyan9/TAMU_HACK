"use client"

import { motion } from "framer-motion"
import { UserPlus, Link2, Sparkles } from "lucide-react"
import Image from "next/image"

// Abstract blob graphic (matching wrapped cards style)
function AbstractBlob({ className, colors }: { className?: string; colors: string[] }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id={`grad-how-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <motion.path
          d="M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z"
          transform="translate(100 100)"
          fill={`url(#grad-how-${colors[0]})`}
          animate={{
            d: [
              "M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z",
              "M44.7,-52.4C56.6,-42.1,64.2,-26.8,67.2,-10.4C70.2,6,68.6,23.5,60.1,37.4C51.6,51.3,36.2,61.6,19.1,67.4C2,73.2,-16.8,74.5,-33.2,68.1C-49.6,61.7,-63.6,47.6,-71.3,30.5C-79,13.4,-80.4,-6.7,-74.2,-24.1C-68,-41.5,-54.2,-56.2,-38.6,-65.2C-23,-74.2,-5.6,-77.5,9.8,-73.8C25.2,-70.1,32.8,-62.7,44.7,-52.4Z",
              "M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with secure authentication.",
    step: "01",
    bgColor: "bg-[#7c3aed]",
    blobColors: ["#ec4899", "#f472b6", "#7c3aed"],
  },
  {
    icon: Link2,
    title: "Link Bank",
    description: "Securely connect your accounts with read-only access.",
    step: "02",
    bgColor: "bg-[#0ea5e9]",
    blobColors: ["#7c3aed", "#3b82f6", "#0ea5e9"],
  },
  {
    icon: Sparkles,
    title: "Get Your Wrapped",
    description: "Receive your personalized financial story instantly.",
    step: "03",
    bgColor: "bg-[#1ed760]",
    blobColors: ["#7c3aed", "#3b82f6", "#1ed760"],
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-[#0f172a] py-24 overflow-hidden">
      {/* Background blobs */}
      <AbstractBlob
        className="w-96 h-96 -top-32 -right-32 opacity-20"
        colors={["#1ed760", "#10b981", "#059669"]}
      />
      <AbstractBlob
        className="w-80 h-80 -bottom-40 -left-40 opacity-20"
        colors={["#7c3aed", "#ec4899", "#ff6b6b"]}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            How it works
          </h2>
          <p className="text-lg text-white/70">Three simple steps to your financial insights</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl p-8 text-center transition-all hover:scale-105 ${step.bgColor}`}
            >
              {/* Blob decorations */}
              <AbstractBlob
                className="w-32 h-32 -top-8 -right-8 opacity-30"
                colors={step.blobColors}
              />
              <AbstractBlob
                className="w-24 h-24 -bottom-6 -left-6 opacity-30"
                colors={[...step.blobColors].reverse()}
              />

              <div className="relative z-10">
                <div className="absolute -top-5 left-6">
                  <span className="text-4xl font-black text-black/30">{step.step}</span>
                </div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/20 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-6 mx-auto">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;
