"use client"

import Link from "next/link"

function NavBar() {
  return (
    <header className="border-b-2 border-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold">
          <span className="text-foreground">$</span>
          <span>SpendWrapped</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#preview" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Preview
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-md border border-foreground bg-transparent px-4 py-2 font-medium hover:bg-black/5">
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default NavBar;