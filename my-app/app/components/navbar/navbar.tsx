"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const { user, isLoading } = useUser();

  const handleLogin = () => {
    window.location.href = "/auth/login";
  };

  const handleLogout = () => {
    window.location.href = "/auth/logout";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
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

        {/* Nav links */}
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

        {/* Auth buttons */}
        {!isLoading && (
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleLogin}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
