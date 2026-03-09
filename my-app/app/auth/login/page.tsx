'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import NavBar from '../../components/navbar/navbar'

function LoginForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const path = callbackUrl.startsWith('/') ? callbackUrl : `/${callbackUrl}`

  // If session check takes too long, show form anyway so user isn't stuck on blank/loading
  useEffect(() => {
    const t = setTimeout(() => setShowForm(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })
      if (res?.error) {
        setError(res.error)
        setLoading(false)
        return
      }
      if (res?.ok) {
        window.location.href = path
        return
      }
    } catch {
      setError('Something went wrong')
    }
    setLoading(false)
  }

  // One loading state: show form after 2s so we never get stuck
  if (status === 'loading' && !showForm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-lg text-gray-900">Loading...</p>
      </div>
    )
  }

  // Already signed in: show a single stable screen with a link (no auto-redirect to avoid loop)
  if (session) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <NavBar />
        <div className="flex flex-1 items-center justify-center p-10">
          <div className="w-full max-w-md rounded-lg border-2 border-gray-200 p-8 shadow-lg text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">You&apos;re already signed in</h1>
            <p className="mb-6 text-gray-600">Go to your dashboard to connect your bank or view your wrapped.</p>
            <a
              href={path}
              className="inline-block w-full rounded-lg bg-black py-3 px-4 font-bold text-white hover:bg-gray-800 transition-colors text-center"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md rounded-lg border-2 border-gray-200 p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold">Welcome to FinSight</h1>
          <p className="mb-6 text-gray-600">
            Sign in with your email to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black py-3 px-4 font-bold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-black underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-lg text-gray-900">Loading...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
