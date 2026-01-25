"use client"

import { motion } from "framer-motion"
import { TrendingUp, Shield, CreditCard } from "lucide-react"

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
          <linearGradient id={`grad-features-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <motion.path
          d="M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z"
          transform="translate(100 100)"
          fill={`url(#grad-features-${colors[0]})`}
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

const features = [
  {
    icon: CreditCard,
    title: "All Cards, One View",
    description: "See spending across all your accounts. Know which card you reach for most.",
    bgColor: "bg-[#ff6b6b]",
    blobColors: ["#ff9f43", "#ffd93d", "#ff6b6b"],
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description: "Discover patterns you never knew existed in your spending habits.",
    bgColor: "bg-[#10b981]",
    blobColors: ["#1ed760", "#4ecdc4", "#10b981"],
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Read-only access with 256-bit encryption. We never see your login credentials.",
    bgColor: "bg-[#6366f1]",
    blobColors: ["#a78bfa", "#c4b5fd", "#6366f1"],
  },
]

function WhyFinSight() {
  return (
    <section id="features" className="relative bg-white py-24 overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-black">
            Why Finance Wrapped?
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            We built this because we were tired of boring budget apps. Your spending tells a story — let{"'"}s make it interesting.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl p-8 transition-all hover:scale-105 ${feature.bgColor}`}
            >
              {/* Blob decorations */}
              <AbstractBlob
                className="w-32 h-32 -top-8 -right-8 opacity-30"
                colors={feature.blobColors}
              />
              <AbstractBlob
                className="w-24 h-24 -bottom-6 -left-6 opacity-30"
                colors={[...feature.blobColors].reverse()}
              />

              <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/20 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-black text-2xl text-white mb-3">{feature.title}</h3>
                <p className="text-base text-white/90 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyFinSight;
