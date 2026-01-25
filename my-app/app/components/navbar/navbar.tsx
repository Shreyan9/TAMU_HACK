"use client";

import Link from "next/link";
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
    <header className="border-b-2 border-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-lg font-semibold"
        >
          <span className="text-foreground">$</span>
          <span>SpendWrapped</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#preview"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Preview
          </Link>
        </nav>

        {/* Auth buttons */}
        {!isLoading && (
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-foreground px-4 py-2 font-medium hover:bg-black/5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="rounded-md border border-foreground px-4 py-2 font-medium hover:bg-black/5"
                >
                  Login
                </button>
                <button
                  onClick={handleLogin}
                  className="rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
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
