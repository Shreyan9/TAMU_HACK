"use client";

import { useRouter } from "next/navigation"
import { Landmark, CreditCard } from "lucide-react"

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
    <section className="border-b-2 border-foreground bg-card">
      <div className="flex flex-col max-w-6xl mx-auto items-center justify-center gap-10 p-10 mt-10 mb-10">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Left content */}
          <div className="flex flex-col gap-4">
            <h1 className="max-w-sm text-4xl font-bold">
              Your spending, unwrapped.
            </h1>

            <p className="max-w-md">
              Upload your bank statement and discover where your money really
              goes. Get a beautiful, Spotify Wrapped-style breakdown of your
              spending habits.
            </p>

            {/* Desktop CTAs */}
            <div className="hidden flex-wrap gap-3 md:flex">
              <button
                onClick={onGetStarted}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-60"
              > 
                <Landmark className="h-4 w-4" />
                {isLoading
                  ? "Loading..."
                  : isAuthenticated
                  ? "Go to Dashboard"
                  : "Get Started"}
              </button>

              <button
                onClick={onSeeDemo}
                className="flex items-center gap-2 rounded-md border border-foreground bg-transparent px-4 py-2 font-medium hover:bg-black/5"
              >
                See Demo
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>

            {isAuthenticated && (
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.name || user?.email}
              </p>
            )}
          </div>

          {/* Right card */}
          <div
            className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-foreground/40 bg-background transition-all hover:border-foreground hover:bg-muted/50"
            onClick={onGetStarted}
          >
            <div className="mb-6 flex items-center gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted"
                >
                  <CreditCard className="h-6 w-6 text-foreground" />
                </div>
              ))}
            </div>

            <p className="text-lg font-medium text-foreground">
              Connect all your accounts
            </p>
            <p className="text-sm text-muted-foreground">
              See spending across every card
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Securely connects via bank-grade encryption
            </p>
          </div>
        </div>

        {/* Mobile CTAs */}
        <div className="flex flex-row gap-6 md:hidden">
          <button
            onClick={onGetStarted}
            disabled={isLoading}
            className="rounded-md border border-foreground bg-transparent px-4 py-2 font-medium hover:bg-black/5"
          >
            {isLoading
              ? "Loading..."
              : isAuthenticated
              ? "Go to Dashboard"
              : "Get Started"}
          </button>

          <button
            onClick={onSeeDemo}
            className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
          >
            See Demo
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
