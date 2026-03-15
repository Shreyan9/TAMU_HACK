"use client";

import React from "react"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface WrappedData {
  totalEarned: { amount: number; depositCount: number }
  discretionarySpending: { total: number; purchaseCount: number }
  topCategory: { name: string; amount: number }
  categoryBreakdown: Array<{ name: string; color: string; percent: number; amount: number }>
  biggestPurchase: { amount: number; merchant: string; date: string }
  totalTransactions: { total: number; perDay: number }
  mostVisitedPlace: { name: string; visits: number; avgPerVisit: number }
  cashVsCards: { cardPercentage: number; cashPercentage: number; cardTotal: number; cashTotal: number }
  weekendVsWeekday: { weekdayPercentage: number; weekendPercentage: number; busiestDay: string; dailyBreakdown: Array<{ day: string; percentage: number; amount: number }> }
  monthlySpending: Array<{ month: string; amount: number }>
  subscriptions: { services: string[]; monthlyTotal: number; annualTotal: number }
  savingsOpportunity: { category: string; currentSpending: number }
  topMerchantsBySpend?: Array<{ name: string; totalSpent: number; visits: number }>
  peakMonth?: { month: string; amount: number }
  firstPurchase?: { merchant: string; date: string } | null
  savingsRate?: { amountSaved: number; percentSaved: number }
  periodLabel?: string
  periodRange?: { startDate: string; endDate: string }
}

// Animated counter hook
function useAnimatedCounter(
  end: number,
  duration: number = 2000,
  start: number = 0
) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

// Spotify-style abstract blob graphic
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
          <linearGradient id={`grad-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <motion.path
          d="M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z"
          transform="translate(100 100)"
          fill={`url(#grad-${colors[0]})`}
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

// Wavy line decoration (Spotify style)
function WavyLine({ className, color }: { className?: string; color: string }) {
  return (
    <motion.svg
      className={`absolute ${className}`}
      viewBox="0 0 400 100"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
    >
      <motion.path
        d="M0,50 Q50,10 100,50 T200,50 T300,50 T400,50"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

// Card wrapper with Spotify-style background
function CardWrapper({
  children,
  bgColor,
  blobColors,
  showWave = true,
}: {
  children: React.ReactNode;
  bgColor: string;
  blobColors?: string[];
  showWave?: boolean;
}) {
  return (
    <div className={`relative w-full h-full ${bgColor} overflow-hidden`}>
      {blobColors && (
        <>
          <AbstractBlob
            className="w-48 h-48 -top-10 -right-10"
            colors={blobColors}
          />
          <AbstractBlob
            className="w-40 h-40 -bottom-16 -left-16"
            colors={[...blobColors].reverse()}
          />
        </>
      )}
      {showWave && (
        <WavyLine
          className="bottom-20 left-0 w-full h-16 opacity-30"
          color="rgba(0,0,0,0.3)"
        />
      )}
      {children}
    </div>
  );
}

// ============ CARD 1: INTRO ============
function IntroCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const period = wrappedData?.periodLabel ?? "money story";
  return (
    <CardWrapper
      bgColor="bg-[#1ed760]"
      blobColors={["#7c3aed", "#3b82f6", "#1ed760"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-black/60 uppercase tracking-widest mb-4"
        >
          Your {period}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-5xl md:text-6xl font-black text-black leading-tight"
        >
          Finance Wrapped
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xl text-black/70"
        >
          Let's see what your money was up to.
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 2: TOTAL EARNED ============
function TotalEarnedCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const earnedAmount = wrappedData?.totalEarned?.amount ?? 0;
  const depositCount = wrappedData?.totalEarned?.depositCount ?? 0;
  const earned = useAnimatedCounter(earnedAmount, 2500);

  return (
    <CardWrapper
      bgColor="bg-[#0f172a]"
      blobColors={["#1ed760", "#10b981", "#059669"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/50 uppercase tracking-widest mb-4"
        >
          You earned
        </motion.p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-7xl md:text-8xl font-black text-[#1ed760]"
        >
          ${earned.toLocaleString()}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-lg text-white/40"
        >
          From <span className="text-white font-semibold">{depositCount}</span> salary deposits
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 3: TEASER - SPENDING INTRO ============
function SpendingTeaserCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  return (
    <CardWrapper
      bgColor="bg-[#ff6b6b]"
      blobColors={["#7c3aed", "#ec4899", "#ff6b6b"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight text-balance"
        >
          But earning is only half the story...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xl text-white/80"
        >
          Let's talk about what you spent.
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 4: DISCRETIONARY SPENDING ============
function DiscretionarySpendingCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const spentAmount = wrappedData?.discretionarySpending?.total ?? 0;
  const purchaseCount = wrappedData?.discretionarySpending?.purchaseCount ?? 0;
  const spent = useAnimatedCounter(Math.round(spentAmount), 2500);
  const purchases = useAnimatedCounter(purchaseCount, 2000);

  return (
    <CardWrapper
      bgColor="bg-[#7c3aed]"
      blobColors={["#ec4899", "#f472b6", "#7c3aed"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/60 uppercase tracking-widest mb-4"
        >
          You spent
        </motion.p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-6xl md:text-7xl font-black text-white"
        >
          ${spent.toLocaleString()}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 text-lg text-white/60"
        >
          across <span className="text-white font-semibold">{purchases}</span> purchases
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 5: TEASER - CATEGORY ============
function CategoryTeaserCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  return (
    <CardWrapper
      bgColor="bg-[#ff9f43]"
      blobColors={["#1ed760", "#4ecdc4", "#ff9f43"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-black leading-tight text-balance"
        >
          You definitely had a favorite...
        </motion.h2>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 6: TOP CATEGORY ============
function TopCategoryCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const categoryName = wrappedData?.topCategory?.name ?? "";
  const categoryAmount = wrappedData?.topCategory?.amount ?? 0;
  
  return (
    <CardWrapper
      bgColor="bg-[#ff9f43]"
      blobColors={["#ff6b6b", "#ffd93d", "#ff9f43"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-black/50 uppercase tracking-widest mb-2"
        >
          Your #1 category
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-5xl md:text-6xl font-black text-black"
        >
          {categoryName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-3xl font-bold text-black/80"
        >
          ${categoryAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 7: PIE CHART - ALL CATEGORIES ============
function SpendingPieChartCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const categories = wrappedData?.categoryBreakdown ?? [];

  let cumulativePercent = 0;
  const segments = categories.map((cat) => {
    const start = cumulativePercent;
    cumulativePercent += cat.percent;
    return { ...cat, start, end: cumulativePercent };
  });

  return (
    <CardWrapper bgColor="bg-[#0f172a]" showWave={false}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-white/50 uppercase tracking-widest mb-6"
        >
          Where it all went
        </motion.p>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
          className="relative w-48 h-48 mb-8"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {segments.map((seg, i) => {
              const startAngle = (seg.start / 100) * 360;
              const endAngle = (seg.end / 100) * 360;
              const largeArc = endAngle - startAngle > 180 ? 1 : 0;
              const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
              const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

              return (
                <motion.path
                  key={seg.name}
                  d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`}
                  fill={seg.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              );
            })}
          </svg>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-white/70 text-sm">{cat.name}</span>
              <span className="text-white/40 text-sm">{cat.percent}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 8: BIGGEST PURCHASE ============
function BiggestPurchaseCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const amount = wrappedData?.biggestPurchase?.amount ?? 0;
  const merchant = wrappedData?.biggestPurchase?.merchant ?? "";
  const rawDate = wrappedData?.biggestPurchase?.date;

  const date = rawDate ? new Date(rawDate).toLocaleDateString() : "";
  
  return (
    <CardWrapper
      bgColor="bg-[#0ea5e9]"
      blobColors={["#7c3aed", "#3b82f6", "#0ea5e9"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/60 uppercase tracking-widest mb-4"
        >
          Your biggest single purchase
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-7xl md:text-8xl font-black text-white"
        >
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <p className="text-2xl font-bold text-white">{merchant}</p>
          <p className="text-white/60 mt-1">{date}</p>
        </motion.div>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 9: TOTAL TRANSACTIONS ============
function TotalTransactionsCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const totalTransactions = wrappedData?.totalTransactions?.total ?? 0;
  const perDay = wrappedData?.totalTransactions?.perDay ?? 0;
  const total = useAnimatedCounter(totalTransactions, 2000);

  return (
    <CardWrapper
      bgColor="bg-[#10b981]"
      blobColors={["#1ed760", "#4ecdc4", "#10b981"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/60 uppercase tracking-widest mb-4"
        >
          Total transactions
        </motion.p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-8xl md:text-9xl font-black text-white"
        >
          {total}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 text-xl text-white/70"
        >
          That's about <span className="font-bold text-white">{perDay.toFixed(1)}</span> per day
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 10: TEASER - FAVORITE SPOT ============
function FavoriteSpotTeaserCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  return (
    <CardWrapper
      bgColor="bg-[#6366f1]"
      blobColors={["#ff6b6b", "#ec4899", "#6366f1"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight text-balance"
        >
          You had a favorite hangout spot...
        </motion.h2>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 11: MOST VISITED PLACE ============
function MostVisitedPlaceCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const placeName = wrappedData?.mostVisitedPlace?.name ?? "";
  const visits = useAnimatedCounter(wrappedData?.mostVisitedPlace?.visits ?? 0, 1500);
  const avgPerVisit = wrappedData?.mostVisitedPlace?.avgPerVisit ?? 0;

  return (
    <CardWrapper
      bgColor="bg-[#6366f1]"
      blobColors={["#a78bfa", "#c4b5fd", "#6366f1"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/60 uppercase tracking-widest mb-4"
        >
          Most visited place
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-4xl md:text-5xl font-black text-white"
        >
          {placeName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-6xl font-black text-[#c7d2fe]"
        >
          {visits} visits
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-4 text-lg text-white/60"
        >
          ${avgPerVisit.toFixed(2)} average per visit
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 12: CASH VS CARDS ============
function CashVsCardsCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const cardPercentage = wrappedData?.cashVsCards?.cardPercentage ?? 0;
  const cashPercentage = wrappedData?.cashVsCards?.cashPercentage ?? 0;
  const cardTotal = wrappedData?.cashVsCards?.cardTotal ?? 0;
  const cashTotal = wrappedData?.cashVsCards?.cashTotal ?? 0;
  
  return (
    <CardWrapper bgColor="bg-[#0f172a]" showWave={false}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/50 uppercase tracking-widest mb-8"
        >
          How you pay
        </motion.p>

        <div className="flex items-end gap-8 mb-4">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: (cardPercentage / 100) * 200 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="w-24 bg-[#1ed760] rounded-t-2xl flex items-end justify-center pb-4 origin-bottom"
            >
              <span className="text-2xl font-black text-black">{cardPercentage.toFixed(1)}%</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-3 text-center"
            >
              <p className="text-white font-bold">Card</p>
              <p className="text-white/50 text-sm">${cardTotal.toLocaleString()}</p>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(cashPercentage / 100) * 200}px` }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="w-24 bg-[#ffd93d] rounded-t-2xl flex items-center justify-center origin-bottom"
            >
              <span className="text-xs font-bold text-black">{cashPercentage.toFixed(1)}%</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-3 text-center"
            >
              <p className="text-white font-bold">Cash</p>
              <p className="text-white/50 text-sm">${cashTotal.toLocaleString()}</p>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-2xl font-black text-white"
        >
          You're a card person
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 13: WEEKEND VS WEEKDAY (Daily Bar Chart) ============
function WeekendVsWeekdayCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const dailyBreakdown = wrappedData?.weekendVsWeekday?.dailyBreakdown ?? [];
  const busiestDay = wrappedData?.weekendVsWeekday?.busiestDay ?? "";

  const maxPercentage = dailyBreakdown.length > 0 
    ? Math.max(...dailyBreakdown.map(d => d.percentage)) 
    : 0;
  const chartHeight = 180;
  const barWidth = 35;
  const barGap = 8;

  return (
    <CardWrapper
      bgColor="bg-[#ec4899]"
      blobColors={["#7c3aed", "#f472b6", "#ec4899"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/60 uppercase tracking-widest mb-6"
        >
          When you spend
        </motion.p>

        <div className="flex items-end gap-2 mb-4">
          {dailyBreakdown.map((day, index) => {
            const height = maxPercentage > 0 ? (day.percentage / maxPercentage) * chartHeight : 0;
            return (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: height }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-10 bg-white rounded-t-lg flex items-end justify-center pb-1 min-h-[20px]"
                  style={{ height: `${height}px` }}
                >
                  {height > 20 && (
                    <span className="text-xs font-bold text-[#ec4899]">
                      {day.percentage.toFixed(0)}%
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/70 mt-2 font-medium">
                  {day.day.substring(0, 3)}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xl font-bold text-white mt-4"
        >
          Busiest day: <span className="text-white">{busiestDay}</span>
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 14: MONTHLY SPENDING CHART ============
function MonthlySpendingCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const monthlyData = wrappedData?.monthlySpending ?? [];

  const maxAmount = monthlyData.length > 0 ? Math.max(...monthlyData.map((d) => d.amount)) : 0;
  const chartHeight = 160;
  const chartWidth = 300;

  // Generate path - y-axis starts at 0
  const points = monthlyData.length > 0 ? monthlyData.map((d, i) => {
    const x = (i / (monthlyData.length - 1)) * chartWidth;
    const range = maxAmount > 0 ? maxAmount : 1;
    const y = chartHeight - (d.amount / range) * chartHeight;
    return `${x},${y}`;
  }) : [];
  const linePath = points.length > 0 ? `M ${points.join(" L ")}` : "";

  return (
    <CardWrapper bgColor="bg-[#0f172a]" showWave={false}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-white/50 uppercase tracking-widest mb-6"
        >
          Your spending by month
        </motion.p>

        <div className="relative">
          {/* Y-axis labels - starting at $0 */}
          <div className="absolute -left-12 top-0 h-40 flex flex-col justify-between text-xs text-white/40">
            <span>${(maxAmount / 1000).toFixed(1)}k</span>
            <span>${(maxAmount / 2 / 1000).toFixed(1)}k</span>
            <span>$0</span>
          </div>

          <motion.svg
            width={chartWidth}
            height={chartHeight}
            className="overflow-visible"
          >
            {/* Grid lines */}
            {[0, 0.5, 1].map((ratio, i) => (
              <line
                key={i}
                x1="0"
                y1={chartHeight * ratio}
                x2={chartWidth}
                y2={chartHeight * ratio}
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="4"
              />
            ))}

            {/* Area fill */}
            <motion.path
              d={`${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 1 }}
            />

            {/* Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#1ed760"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1ed760" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Dots */}
            {monthlyData.map((d, i) => {
              const x = (i / (monthlyData.length - 1)) * chartWidth;
              const range = maxAmount > 0 ? maxAmount : 1;
              const y = chartHeight - (d.amount / range) * chartHeight;
              return (
                <motion.circle
                  key={d.month}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#1ed760"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                />
              );
            })}
          </motion.svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between w-[300px] mt-3 px-1">
          {monthlyData.map((d, i) => (
            <motion.span
              key={d.month}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              className="text-[10px] text-white/40"
            >
              {d.month.charAt(0)}
            </motion.span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 15: SUBSCRIPTIONS ============
function SubscriptionsCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const subscriptions = wrappedData?.subscriptions?.services ?? [];
  const monthlyTotal = wrappedData?.subscriptions?.monthlyTotal ?? 0;
  const annualTotal = wrappedData?.subscriptions?.annualTotal ?? 0;

  return (
    <CardWrapper
      bgColor="bg-[#1ed760]"
      blobColors={["#7c3aed", "#3b82f6", "#1ed760"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-black/50 uppercase tracking-widest mb-4"
        >
          Your subscriptions
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-6 max-w-xs"
        >
          {subscriptions.map((sub, i) => (
            <motion.span
              key={sub}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
              className="bg-black/20 text-black font-medium px-3 py-1.5 rounded-full text-sm"
            >
              {sub}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-5xl font-black text-black"
        >
          ${monthlyTotal.toFixed(2)}
          <span className="text-xl font-medium text-black/60">/month</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-2 text-lg text-black/60"
        >
          ${annualTotal.toFixed(2)} per year
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 16: SAVINGS OPPORTUNITY SLIDER ============
function SavingsOpportunityCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const [cutPercent, setCutPercent] = useState(25);
  const category = wrappedData?.savingsOpportunity?.category ?? "";
  const totalFoodSpend = wrappedData?.savingsOpportunity?.currentSpending ?? 0;
  const savings = (totalFoodSpend * cutPercent) / 100;

  return (
    <CardWrapper bgColor="bg-[#0f172a]" showWave={false}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/50 uppercase tracking-widest mb-4"
        >
          Your biggest opportunity
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {category}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/50 mb-8"
        >
          Current: ${totalFoodSpend.toLocaleString()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-xs"
        >
          <p className="text-white/60 mb-3 text-sm">
            If you cut spending by <span className="text-white font-bold">{cutPercent}%</span>
          </p>

          <input
            type="range"
            min="10"
            max="50"
            value={cutPercent}
            onChange={(e) => setCutPercent(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#1ed760]"
          />

          <div className="flex justify-between text-xs text-white/40 mt-1 mb-6">
            <span>10%</span>
            <span>50%</span>
          </div>

          <motion.div
            className="bg-[#1ed760] rounded-2xl px-6 py-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
            key={cutPercent}
          >
            <p className="text-black/60 text-sm">You could save</p>
            <p className="text-4xl font-black text-black">
              ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-black/60 text-sm">over this period</p>
          </motion.div>
        </motion.div>
      </div>
    </CardWrapper>
  );
}

// ============ SAVINGS RATE TEASER ============
function SavingsRateTeaserCard() {
  return (
    <CardWrapper
      bgColor="bg-[#0f172a]"
      blobColors={["#1ed760", "#10b981", "#059669"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight text-balance"
        >
          But what did you actually keep?
        </motion.h2>
      </div>
    </CardWrapper>
  );
}

// ============ SAVINGS RATE ============
function SavingsRateCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const amountSaved = wrappedData?.savingsRate?.amountSaved ?? 0;
  const percentSaved = wrappedData?.savingsRate?.percentSaved ?? 0;
  const saved = useAnimatedCounter(Math.round(Math.abs(amountSaved)), 2200);
  const isNegative = amountSaved < 0;

  return (
    <CardWrapper
      bgColor={isNegative ? "bg-[#dc2626]" : "bg-[#059669]"}
      blobColors={isNegative ? ["#f87171", "#ef4444", "#dc2626"] : ["#34d399", "#10b981", "#059669"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/80 uppercase tracking-widest mb-4"
        >
          {isNegative ? "You spent more than you earned" : "You saved"}
        </motion.p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-6xl md:text-7xl font-black text-white"
        >
          {isNegative ? "-" : ""}${saved.toLocaleString()}
        </motion.div>
        {!isNegative && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 text-xl text-white/90"
          >
            That&apos;s <span className="font-bold">{percentSaved}%</span> of what you earned
          </motion.p>
        )}
      </div>
    </CardWrapper>
  );
}

// ============ FIRST PURCHASE OF THE YEAR ============
function FirstPurchaseCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const first = wrappedData?.firstPurchase;

  return (
    <CardWrapper
      bgColor="bg-[#4f46e5]"
      blobColors={["#818cf8", "#6366f1", "#4f46e5"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/70 uppercase tracking-widest mb-4"
        >
          Your first purchase in this period
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-4xl md:text-5xl font-black text-white"
        >
          {first?.merchant ?? "—"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-xl text-white/80"
        >
          {first?.date ?? "—"}
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ PEAK MONTH ============
function PeakMonthCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const peak = wrappedData?.peakMonth;
  const month = peak?.month ?? "—";
  const amount = peak?.amount ?? 0;
  const animatedAmount = useAnimatedCounter(Math.round(amount), 2000);

  return (
    <CardWrapper
      bgColor="bg-[#ea580c]"
      blobColors={["#fb923c", "#f97316", "#ea580c"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/80 uppercase tracking-widest mb-4"
        >
          Your biggest spending month
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="text-5xl md:text-6xl font-black text-white"
        >
          {month}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-3xl font-bold text-white/90"
        >
          ${animatedAmount.toLocaleString()}
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ TOP 3 MERCHANTS BY SPEND ============
function Top3MerchantsCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const merchants = wrappedData?.topMerchantsBySpend ?? [];
  const maxSpend = merchants.length > 0 ? Math.max(...merchants.map((m) => m.totalSpent)) : 1;

  return (
    <CardWrapper bgColor="bg-[#0f172a]" showWave={false}>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-white/50 uppercase tracking-widest mb-6"
        >
          Where the money went
        </motion.p>
        <div className="w-full max-w-xs space-y-4">
          {merchants.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex flex-col gap-1"
            >
              <div className="flex justify-between text-sm">
                <span className="text-white font-medium truncate pr-2">{m.name}</span>
                <span className="text-white/60 flex-shrink-0">${m.totalSpent.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#1ed760]"
                  initial={{ width: "0%" }}
                  animate={{ width: maxSpend > 0 ? `${(m.totalSpent / maxSpend) * 100}%` : "0%" }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        {merchants.length === 0 && (
          <p className="text-white/50 text-sm">No purchase data</p>
        )}
      </div>
    </CardWrapper>
  );
}

// ============ SPENDING VIBE ============
function SpendingVibeCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const category = wrappedData?.topCategory?.name ?? "";
  const vibeMap: Record<string, string> = {
    "Food & Drink": "Foodie",
    "Gas & Transportation": "Road tripper",
    "Shopping": "Shopper",
    "Entertainment": "Entertainer",
    "Utilities": "Homebody",
    "Health & Fitness": "Wellness seeker",
    "Other": "Mystery spender",
  };
  const vibe = vibeMap[category] ?? "Spender";

  return (
    <CardWrapper
      bgColor="bg-[#ec4899]"
      blobColors={["#f472b6", "#ec4899", "#db2777"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/80 uppercase tracking-widest mb-4"
        >
          Your spending vibe for this period
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-5xl md:text-6xl font-black text-white"
        >
          {vibe}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-lg text-white/80"
        >
          Top category: {category}
        </motion.p>
      </div>
    </CardWrapper>
  );
}

// ============ CARD 17: FINALE ============
function FinalCard({ wrappedData }: { wrappedData: WrappedData | null }) {
  const label = wrappedData?.periodLabel ?? "this period";
  return (
    <CardWrapper
      bgColor="bg-[#1ed760]"
      blobColors={["#7c3aed", "#ec4899", "#1ed760"]}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-4xl md:text-5xl font-black text-black leading-tight"
        >
          That&apos;s your {label.toLowerCase()} in money.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-xl text-black/70"
        >
          Here&apos;s to making 2026 even better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-black/50"
        >
          Tap to restart
        </motion.div>
      </div>
    </CardWrapper>
  );
}

// Export all cards as array
export const wrappedCards = [
  IntroCard,
  TotalEarnedCard,
  SpendingTeaserCard,
  DiscretionarySpendingCard,
  SavingsRateTeaserCard,
  SavingsRateCard,
  CategoryTeaserCard,
  TopCategoryCard,
  SpendingPieChartCard,
  BiggestPurchaseCard,
  FirstPurchaseCard,
  FavoriteSpotTeaserCard,
  MostVisitedPlaceCard,
  Top3MerchantsCard,
  WeekendVsWeekdayCard,
  MonthlySpendingCard,
  PeakMonthCard,
  SubscriptionsCard,
  SavingsOpportunityCard,
  SpendingVibeCard,
  FinalCard,
];
