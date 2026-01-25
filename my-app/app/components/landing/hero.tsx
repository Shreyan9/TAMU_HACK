"use client"

import { useRouter } from "next/navigation"
import { Landmark, CreditCard } from "lucide-react"

function Hero() {
  const router = useRouter()

  return (
    <section className="border-b-2 border-foreground">
      <div className='flex flex-col items-center justify-center gap-10 p-10 mt-12'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className="font-bold max-w-sm text-4xl">Your spending, unwrapped.</h1>
            <p className="max-w-md">Upload your bank statement and discover where your money really goes. Get a beautiful, Spotify Wrapped-style breakdown of your spending habits.</p>

              <div className='md:flex flex-row hidden gap-6'>
              <button 
                className="rounded-md border border-foreground bg-transparent px-4 py-2 font-medium hover:bg-black/5"
                onClick={() => router.push("/login")}>
                Get Started</button>
              <button className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
                See Demo</button>
            </div>
          </div>

          <div
            className="flex min-h-70 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-foreground/40 bg-background transition-all hover:border-foreground hover:bg-muted/50"
            onClick={() => router.push("/signup")}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-6 w-6 text-foreground" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-6 w-6 text-foreground" />
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-6 w-6 text-foreground" />
              </div>
            </div>
            <p className="text-lg font-medium text-foreground">Connect all your accounts</p>
            <p className="text-sm text-muted-foreground">See spending across every card</p>
            <p className="mt-4 text-xs text-muted-foreground">Securely connects via bank-grade encryption</p>
          </div>
        </div>

        <div className='flex flex-row md:hidden gap-6'>
          <button className="rounded-md border border-foreground bg-transparent px-4 py-2 font-medium hover:bg-black/5">
            Get Started</button>
          <button className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
            See Demo</button>
        </div>
      </div>
    </section>
  )
}

export default Hero;