"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Pause, Play } from "lucide-react";
import { wrappedCards } from "./wrapped-cards";
import type { WrappedData } from "./wrapped-cards";

interface WrappedCarouselProps {
  onRestart: () => void;
  wrappedData: WrappedData | null;
}

const cards = wrappedCards.map((component, index) => ({
  id: index + 1,
  component,
}));

export function WrappedCarousel({ onRestart, wrappedData }: WrappedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const cardDuration = 6000; // 6 seconds per card

  const goToNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    }
  }, [currentIndex]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Progress tracking and auto-advance
  useEffect(() => {
    if (isPaused || isHolding || currentIndex === cards.length - 1) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const startTime = Date.now() - (progress / 100) * cardDuration;
    
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / cardDuration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        goToNext();
      }
    }, 50);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentIndex, isPaused, isHolding, goToNext, progress]);

  // Reset progress when card changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Mouse/touch hold to pause
  const handlePointerDown = () => setIsHolding(true);
  const handlePointerUp = () => setIsHolding(false);

  const CurrentCard = cards[currentIndex].component;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-3">
        {cards.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 rounded-full overflow-hidden bg-white/20"
          >
            <motion.div
              className="h-full bg-white"
              initial={false}
              animate={{
                width:
                  index < currentIndex
                    ? "100%"
                    : index === currentIndex
                      ? `${progress}%`
                      : "0%",
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        ))}
      </div>

      {/* Top controls */}
      <div className="absolute top-12 right-4 z-50 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused((prev) => !prev);
          }}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused || isHolding ? (
            <Play className="w-5 h-5" />
          ) : (
            <Pause className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRestart();
          }}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          aria-label="Start over"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Pause indicator */}
      <AnimatePresence>
        {(isPaused || isHolding) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm"
          >
            <span className="text-white/80 text-sm font-medium">
              {isHolding ? "Holding..." : "Paused"} - Press space or tap to continue
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card container */}
      <div className="relative w-full h-full max-w-md mx-auto">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <CurrentCard wrappedData={wrappedData} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white disabled:opacity-30 hover:bg-white/20 transition-colors"
        aria-label="Previous card"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        disabled={currentIndex === cards.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white disabled:opacity-30 hover:bg-white/20 transition-colors"
        aria-label="Next card"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Card counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <span className="text-white/60 text-sm font-medium">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>
    </div>
  );
}
