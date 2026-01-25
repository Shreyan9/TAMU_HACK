"use client"

import { useState, useEffect } from "react"

const mockStats = [
  { label: "Coffee Shops", value: "$847", subtext: "142 visits", color: "bg-chart-1" },
  { label: "Dining Out", value: "$1,234", subtext: "67 orders", color: "bg-chart-2" },
  { label: "Subscriptions", value: "$156", subtext: "12 active", color: "bg-chart-3" },
  { label: "Shopping", value: "$2,103", subtext: "89 purchases", color: "bg-chart-4" },
]

export function PreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="preview" className="border-b-2 border-foreground bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground">See it in action</h2>
          <p className="mt-2 text-muted-foreground">Here{"'"}s what your Wrapped could look like</p>
        </div>

        <div className="mx-auto max-w-sm">
          <div className="overflow-hidden rounded-2xl border-2 border-foreground bg-foreground shadow-2xl">
            <div className="p-6">
              <p className="text-xs font-mono text-primary-foreground/60 uppercase tracking-wider">2025 Wrapped</p>
              <div className="mt-8 space-y-1">
                {mockStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`transform transition-all duration-500 ${
                      index === activeIndex ? "scale-105 opacity-100" : "scale-95 opacity-40"
                    }`}
                  >
                    <div className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 p-3">
                      <div className={`h-3 w-3 rounded-full ${stat.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary-foreground">{stat.label}</p>
                        <p className="text-xs text-primary-foreground/60">{stat.subtext}</p>
                      </div>
                      <p className="font-mono text-lg font-bold text-primary-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-primary-foreground/20 pt-6">
                <p className="text-center text-sm text-primary-foreground/80">
                  {"\""}Your top spending category was{" "}
                  <span className="font-semibold text-primary-foreground">Coffee</span> — you could buy a coffee machine!{"\""}
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-2 bg-primary-foreground/5 py-4">
              {mockStats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-primary-foreground" : "bg-primary-foreground/30"
                  }`}
                  aria-label={`View stat ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PreviewSection;