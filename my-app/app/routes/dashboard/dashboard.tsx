"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { usePlaidLink } from "react-plaid-link"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, LogOut, Building2, CheckCircle2 } from "lucide-react"

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
          <linearGradient id={`grad-dash-${colors[0]}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
        <motion.path
          d="M47.5,-57.2C59.1,-46.9,64.8,-29.8,67.1,-12.5C69.4,4.8,68.3,22.3,60.1,36.1C51.9,49.9,36.6,60,19.6,66.1C2.6,72.2,-16.1,74.3,-32.4,68.3C-48.7,62.3,-62.6,48.2,-70.2,31.1C-77.8,14,-79.1,-6.1,-73.1,-23.7C-67.1,-41.3,-53.8,-56.4,-38.5,-65.6C-23.2,-74.8,-5.9,-78.1,9.7,-74.1C25.3,-70.1,35.9,-67.5,47.5,-57.2Z"
          transform="translate(100 100)"
          fill={`url(#grad-dash-${colors[0]})`}
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

function DashboardPage() {
  const router = useRouter()
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [hasLinkedAccount, setHasLinkedAccount] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectError, setConnectError] = useState<string | null>(null)

  const fetchLinkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/plaid/status")
      const data = await res.json()
      setHasLinkedAccount(data.linked)
    } catch {
      setHasLinkedAccount(false)
    }
  }, [])

  useEffect(() => {
    fetchLinkStatus()
  }, [fetchLinkStatus])

  const onPlaidSuccess = useCallback(
    async (publicToken: string) => {
      try {
        const res = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicToken }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || "Failed to link account")
        }
        setHasLinkedAccount(true)
        setConnectError(null)
      } catch (e) {
        setConnectError(e instanceof Error ? e.message : "Failed to link account")
      } finally {
        setIsConnecting(false)
        setLinkToken(null)
      }
    },
    []
  )

  const { open: openPlaidLink, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
    onExit: () => {
      setIsConnecting(false)
      setLinkToken(null)
    },
  })

  useEffect(() => {
    if (linkToken && ready) {
      openPlaidLink()
    }
  }, [linkToken, ready, openPlaidLink])

  const handleConnectNew = async () => {
    setConnectError(null)
    setIsConnecting(true)
    try {
      const res = await fetch("/api/plaid/create-link-token", { method: "POST" })
      if (!res.ok) throw new Error("Failed to get link token")
      const { linkToken: token } = await res.json()
      setLinkToken(token)
    } catch (e) {
      setConnectError(e instanceof Error ? e.message : "Failed to connect")
      setIsConnecting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col w-full bg-[#0f172a] relative overflow-hidden">
      {/* Background blobs */}
      <AbstractBlob
        className="w-96 h-96 -top-32 -right-32 opacity-20"
        colors={["#1ed760", "#10b981", "#059669"]}
      />
      <AbstractBlob
        className="w-80 h-80 -bottom-40 -left-40 opacity-20"
        colors={["#7c3aed", "#ec4899", "#ff6b6b"]}
      />

      <header className="border-b border-white/10 relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-black text-xl text-white">
            <div className="w-10 h-10 rounded-xl bg-[#1ed760] flex items-center justify-center">
              <Image
                src="/mouse.svg"
                alt="Mouse icon"
                width={24}
                height={24}
                className="invert"
              />
            </div>
            <span>FinSight</span>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-white/70 hover:text-white hover:bg-white/10" 
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col px-6 py-8 relative z-10">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-white mb-2"
              >
                Your Accounts
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/60"
              >
                {hasLinkedAccount ? "1 account connected" : "Connect your bank to get started"}
              </motion.p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hasLinkedAccount && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all"
                style={{ backgroundColor: "#0ea5e9" }}
              >
                <AbstractBlob className="w-32 h-32 -top-8 -right-8 opacity-30" colors={["#7c3aed", "#3b82f6", "#0ea5e9"]} />
                <AbstractBlob className="w-24 h-24 -bottom-6 -left-6 opacity-30" colors={["#0ea5e9", "#3b82f6", "#7c3aed"]} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/20 backdrop-blur-sm">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="mb-4">
                    <p className="font-black text-white text-lg">Bank Account</p>
                    <p className="text-sm text-white/70">Connected via Plaid</p>
                  </div>
                  <div className="flex items-center justify-end border-t border-white/20 pt-4">
                    <span className="text-xs text-white/60 uppercase tracking-wider">Linked</span>
                  </div>
                </div>
              </motion.div>
            )}

            {connectError && (
              <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-400 text-sm">
                {connectError}
              </div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleConnectNew}
              disabled={isConnecting}
              className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 backdrop-blur-sm p-6 transition-all hover:border-white/40 hover:bg-white/10 disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Building2 className="h-6 w-6 animate-pulse text-white" />
                  </div>
                  <span className="text-sm text-white/70">Connecting...</span>
                </>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-bold text-white">Connect Account</span>
                  <span className="text-xs text-white/60">Add another bank or card</span>
                </>
              )}
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-2xl p-8 text-center bg-[#1ed760]"
          >
            {/* Blob decorations */}
            <AbstractBlob
              className="w-64 h-64 -top-16 -right-16 opacity-30"
              colors={["#7c3aed", "#3b82f6", "#1ed760"]}
            />
            <AbstractBlob
              className="w-48 h-48 -bottom-12 -left-12 opacity-30"
              colors={["#ff6b6b", "#ec4899", "#1ed760"]}
            />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-black mb-2">Ready to see your Wrapped?</h2>
              <p className="mt-2 text-black/70 text-lg">
                {hasLinkedAccount
                  ? "We'll analyze your transactions and show your year in review"
                  : "Connect your bank above to generate your personalized Wrapped"}
              </p>
              <motion.div
                whileHover={hasLinkedAccount ? { scale: 1.05 } : {}}
                whileTap={hasLinkedAccount ? { scale: 0.95 } : {}}
              >
                <Button
                  size="lg"
                  className="mt-6 bg-black hover:bg-black/90 text-[#1ed760] font-black px-8 py-6 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => hasLinkedAccount && router.push("/wrapped")}
                  disabled={!hasLinkedAccount}
                >
                  Generate My Wrapped
                  <span aria-hidden="true" className="ml-2">→</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
          >
            <p className="text-center text-sm text-white/60">
              <strong className="text-white">Secure connection:</strong> We use read-only access with bank-grade encryption. Your login credentials are never stored.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage;