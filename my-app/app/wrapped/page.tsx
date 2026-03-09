"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/app/components/finance-wrapped/loading-screen"
import { WrappedCarousel } from "@/app/components/finance-wrapped/wrapped-carousel"
import type { WrappedData } from "@/app/components/finance-wrapped/wrapped-cards"

type RangeOption = "ytd" | "1y" | "6m" | "1m"

export default function WrappedPage() {
  const router = useRouter()
  const [appState, setAppState] = useState<"loading" | "wrapped">("loading")
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null)
  const [range, setRange] = useState<RangeOption>("ytd")

  const handleLoadingComplete = async () => {
    try {
      const response = await fetch(`/api/generate-wrapped-data?range=${range}`)
      const data = await response.json()
      if (response.ok) {
        setWrappedData(data)
      } else {
        // No bank linked or other error - redirect to dashboard
        router.push("/dashboard")
        return
      }
    } catch (error) {
      console.error("Error fetching wrapped data:", error)
      router.push("/dashboard")
      return
    }
    setAppState("wrapped")
  }

  const handleRestart = () => {
    router.push("/")
  }

  const handleRangeChange = (next: RangeOption) => {
    if (next === range) return
    setRange(next)
    setAppState("loading")
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Range selector */}
      <div className="pointer-events-auto fixed top-4 left-1/2 z-20 -translate-x-1/2">
        <div className="inline-flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-xs text-white shadow-lg">
          {(
            [
              { id: "ytd", label: "YTD" },
              { id: "1y", label: "1 year" },
              { id: "6m", label: "6 months" },
              { id: "1m", label: "1 month" },
            ] as { id: RangeOption; label: string }[]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleRangeChange(opt.id)}
              className={`rounded-full px-3 py-1 transition-colors ${
                range === opt.id
                  ? "bg-white text-black font-semibold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {appState === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {appState === "wrapped" && (
        <WrappedCarousel onRestart={handleRestart} wrappedData={wrappedData} />
      )}
    </main>
  )
}
