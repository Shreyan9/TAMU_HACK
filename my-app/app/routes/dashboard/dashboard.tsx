"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, LogOut, Sparkles, Building2, CheckCircle2 } from "lucide-react"

const connectedAccounts = [
  {
    id: 1,
    name: "Chase Sapphire",
    type: "Credit Card",
    lastFour: "4821",
    institution: "Chase",
    balance: 2340.50,
    color: "bg-blue-900",
  },
  {
    id: 2,
    name: "Apple Card",
    type: "Credit Card",
    lastFour: "9012",
    institution: "Goldman Sachs",
    balance: 847.23,
    color: "bg-neutral-800",
  },
  {
    id: 3,
    name: "Checking Account",
    type: "Checking",
    lastFour: "3456",
    institution: "Bank of America",
    balance: 5621.89,
    color: "bg-red-800",
  },
]

function DashboardPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectNew = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col w-full">
      <header className="border-b-2 border-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold">
            <Image
              src="/mouse.svg"
              alt="Mouse icon"
              width={35}
              height={35}
            />
            <span>FinSight</span>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => router.push("/")}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col px-6 py-8">
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Accounts</h1>
              <p className="mt-1 text-muted-foreground">
                {connectedAccounts.length} accounts connected
              </p>
            </div>
            <Button
              className="gap-2"
              size="lg"
              onClick={() => router.push("/wrapped")}
            >
              <Sparkles className="h-4 w-4" />
              View My Wrapped
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="group relative overflow-hidden rounded-xl border-2 border-foreground/20 bg-card p-6 transition-all hover:border-foreground hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${account.color}`}>
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-foreground">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.institution} **** {account.lastFour}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">{account.type}</span>
                  <span className="font-mono text-sm font-medium text-foreground">
                    ${account.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <button
              onClick={handleConnectNew}
              disabled={isConnecting}
              className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-foreground/30 bg-muted/30 p-6 transition-all hover:border-foreground hover:bg-muted/50 disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-6 w-6 animate-pulse text-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">Connecting...</span>
                </>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Plus className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Connect Account</span>
                  <span className="text-xs text-muted-foreground">Add another bank or card</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl border-2 border-foreground bg-foreground p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground">Ready to see your Wrapped?</h2>
            <p className="mt-2 text-primary-foreground/70">
              We{"'"}ve analyzed 847 transactions across your 3 accounts
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-6 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => router.push("/wrapped")}
            >
              Generate My Wrapped
              <span aria-hidden="true" className="ml-2">-&gt;</span>
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-center text-sm text-muted-foreground">
              <strong className="text-foreground">Secure connection:</strong> We use read-only access with bank-grade encryption. Your login credentials are never stored.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage;