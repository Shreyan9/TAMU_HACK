"use client";

import { motion } from "framer-motion"
import { ArrowRight, Link2, TrendingUp, Sparkles, PiggyBank } from "lucide-react"
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
          <linearGradient id={`grad-hero-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <motion.path
          d="M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z"
          transform="translate(100 100)"
          fill={`url(#grad-hero-${colors[0]})`}
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

type HeroProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
  onGetStarted: () => void;
  onSeeDemo: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
  };
};

function Hero({
  isLoading,
  isAuthenticated,
  onGetStarted,
  onSeeDemo,
  user,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1ed760] pt-24">
      {/* Abstract blob graphics */}
      <AbstractBlob
        className="w-96 h-96 -top-32 -right-32 opacity-40"
        colors={["#7c3aed", "#3b82f6", "#1ed760"]}
      />
      <AbstractBlob
        className="w-80 h-80 -bottom-40 -left-40 opacity-40"
        colors={["#ff6b6b", "#ec4899", "#7c3aed"]}
      />
      <AbstractBlob
        className="w-64 h-64 top-1/4 left-1/4 opacity-30"
        colors={["#4ecdc4", "#1ed760", "#10b981"]}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Logo/Icon */}
        {/* <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="mx-auto mb-8 w-24 h-24 rounded-3xl bg-black flex items-center justify-center shadow-2xl"
        >
          <Image
            src="/mouse.svg"
            alt="Mouse icon"
            width={48}
            height={48}
            className="invert"
          />
        </motion.div> */}

        {/* Title */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tight text-black"
        >
          FinSight
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-black"
        >
          Your Finance Wrapped
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-black/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Your 2025 in money. Beautifully visualized.
        </motion.p>

        {/* Feature pills */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        > */}
          {/* {[
            { icon: TrendingUp, label: "Spending Trends", color: "#ff6b6b" },
            { icon: PiggyBank, label: "Savings Goals", color: "#0ea5e9" },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/20 backdrop-blur-sm border border-black/30"
            >
              <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
              <span className="text-sm font-semibold text-black">{feature.label}</span>
            </motion.div>
          ))} */}
        {/* </motion.div> */}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <motion.button
            onClick={onGetStarted}
            disabled={isLoading}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-black hover:bg-black/90 text-[#1ed760] font-black text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >

            {isLoading
              ? "Loading..."
              : isAuthenticated
              ? "Go to Dashboard"
              : "Get Started"}
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={onSeeDemo}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-black/30 text-black font-bold text-lg px-10 py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            See Demo
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* {isAuthenticated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-black/60"
          >
            Welcome back, {user?.name || user?.email}
          </motion.p>
        )} */}

        {/* Trust text */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-xs text-black/50 mt-8"
        >
          Securely connects via bank-grade encryption • Read-only access
        </motion.p> */}
      </div>
    </section>
  );
}

export default Hero;
