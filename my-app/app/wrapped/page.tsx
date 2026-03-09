"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/app/components/finance-wrapped/loading-screen"
import { WrappedCarousel } from "@/app/components/finance-wrapped/wrapped-carousel"
import type { WrappedData } from "@/app/components/finance-wrapped/wrapped-cards"

export default function WrappedPage() {
  const router = useRouter()
  const [appState, setAppState] = useState<"loading" | "wrapped">("loading")
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null)

  const handleLoadingComplete = async () => {
    try {
      const response = await fetch("/api/generate-wrapped-data")
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

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {appState === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {appState === "wrapped" && (
        <WrappedCarousel onRestart={handleRestart} wrappedData={wrappedData} />
      )}
    </main>
  )
}
