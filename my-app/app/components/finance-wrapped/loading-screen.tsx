"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

const loadingMessages = [
  "Collecting transactions...",
  "Counting purchases...",
  "Analyzing spending...",
  "Calculating totals...",
  "Finding patterns...",
  "Generating insights...",
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalDuration = 5000 // 5 seconds total
    const messageDuration = totalDuration / loadingMessages.length
    const progressInterval = 50 // Update progress every 50ms

    // Update progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + (100 / (totalDuration / progressInterval))
      })
    }, progressInterval)

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, messageDuration)

    // Complete after total duration
    const timeout = setTimeout(() => {
      clearInterval(progressTimer)
      clearInterval(messageInterval)
      onComplete()
    }, totalDuration)

    return () => {
      clearInterval(progressTimer)
      clearInterval(messageInterval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background similar to landing page */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #1ed760 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ff6b9d 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center">
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-black mb-8 text-black"
        >
          Generating your Wrapped
        </motion.h1>

        {/* Swiping message animation */}
        <div className="h-12 mb-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-lg text-white/80 font-medium absolute inset-0 flex items-center justify-center"
            >
              {loadingMessages[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Simple progress bar */}
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#1ed760] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}
