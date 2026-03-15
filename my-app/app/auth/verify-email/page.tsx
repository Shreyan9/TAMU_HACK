'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import NavBar from '../../components/navbar/navbar'
import { Suspense, useState } from 'react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const verified = searchParams.get('verified')
  const [resendEmail, setResendEmail] = useState('')
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [resendError, setResendError] = useState('')

  async function handleResend(e: React.FormEvent) {
    e.preventDefault()
    if (!resendEmail.trim()) return
    setResendStatus('loading')
    setResendError('')
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setResendStatus('sent')
      } else {
        setResendStatus('error')
        setResendError(data.error || 'Failed to send')
      }
    } catch {
      setResendStatus('error')
      setResendError('Something went wrong')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md rounded-lg border-2 border-gray-200 p-8 shadow-lg text-center">
          {error ? (
            <>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Verification failed</h1>
              <p className="mb-6 text-gray-600">{error}</p>
              <p className="text-sm text-gray-500 mb-4">
                The link may have expired (links are valid for 24 hours), or your email client may have broken the link. Request a new one below.
              </p>
              <form onSubmit={handleResend} className="mb-6 text-left">
                <label className="mb-2 block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                  required
                />
                <button
                  type="submit"
                  disabled={resendStatus === 'loading'}
                  className="w-full rounded-lg bg-black py-3 px-4 font-bold text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {resendStatus === 'loading' ? 'Sending…' : resendStatus === 'sent' ? 'Check your email' : 'Send new verification link'}
                </button>
                {resendStatus === 'sent' && (
                  <p className="mt-2 text-sm text-green-600">A new link was sent. Check your inbox (and spam).</p>
                )}
                {resendStatus === 'error' && resendError && (
                  <p className="mt-2 text-sm text-red-600">{resendError}</p>
                )}
              </form>
              <Link
                href="/auth/login"
                className="inline-block rounded-lg border-2 border-gray-300 py-2 px-4 font-medium text-gray-700 hover:bg-gray-100"
              >
                Back to Sign in
              </Link>
            </>
          ) : verified ? (
            <>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Email verified</h1>
              <p className="mb-6 text-gray-600">You can now sign in to your account.</p>
              <Link
                href="/auth/login"
                className="inline-block rounded-lg bg-black py-3 px-4 font-bold text-white hover:bg-gray-800"
              >
                Sign in
              </Link>
            </>
          ) : (
            <>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">Check your email</h1>
              <p className="mb-6 text-gray-600">
                We sent a verification link to your email. Click the link to verify your account, then sign in.
              </p>
              <p className="text-sm text-gray-500">
                Didn&apos;t get the email? Check your spam folder or try signing up again.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-lg text-gray-900">Loading...</p>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
