"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session, status } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-lg font-semibold text-gray-900"
        >
          <Image
            src="/mouse.svg"
            alt="Mouse icon"
            width={35}
            height={35}
          />
          <span>FinSight</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-gray-600 transition-colors hover:text-amber-600"
          >
            How it works
          </Link>
          <Link
            href="#features"
            className="text-sm text-gray-600 transition-colors hover:text-amber-600"
          >
            Features
          </Link>
        </nav>

        {status !== 'loading' && (
          <div className="flex items-center gap-3">
            {session?.user ? (
              <>
                <span className="text-sm text-gray-600">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
