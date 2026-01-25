"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const mockStats = [
  { label: "Coffee Shops", value: "$847", subtext: "142 visits", color: "#ff9f43" },
  { label: "Dining Out", value: "$1,234", subtext: "67 orders", color: "#4ecdc4" },
  { label: "Subscriptions", value: "$156", subtext: "12 active", color: "#ff6b9d" },
  { label: "Shopping", value: "$2,103", subtext: "89 purchases", color: "#a78bfa" },
]

function PreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="preview" className="relative bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#1ed760] to-[#4ecdc4] bg-clip-text text-transparent">
              See it in action
            </span>
          </h2>
          <p className="text-lg text-white/60">Here{"'"}s what your Wrapped could look like</p>
        </motion.div>

        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1ed760] to-[#4ecdc4] p-1 shadow-2xl"
          >
            <div className="bg-[#0a0a0f] rounded-3xl p-8">
              <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-8">2025 Wrapped</p>
              <div className="space-y-3">
                {mockStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`transform transition-all duration-500 rounded-xl p-4 ${
                      index === activeIndex 
                        ? "bg-white/10 scale-105 border border-white/20" 
                        : "bg-white/5 scale-100 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-4 w-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: stat.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{stat.label}</p>
                        <p className="text-xs text-white/50">{stat.subtext}</p>
                      </div>
                      <p className="font-mono text-xl font-black text-white">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 border-t border-white/10 pt-6"
              >
                <p className="text-center text-sm text-white/70">
                  {"\""}Your top spending category was{" "}
                  <span className="font-bold text-white">Coffee</span> — you could buy a coffee machine!{"\""}
                </p>
              </motion.div>
            </div>
            <div className="flex justify-center gap-2 bg-[#0a0a0f] py-4">
              {mockStats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-[#1ed760]" : "w-2 bg-white/20"
                  }`}
                  aria-label={`View stat ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PreviewSection;