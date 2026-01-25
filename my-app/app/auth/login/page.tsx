'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import NavBar from '../../components/navbar/navbar';

export default function LoginPage() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && !isLoading) {
      window.location.href = '/dashboard';
    }
  }, [user, isLoading]);

  const handleLogin = () => {
    window.location.href = '/auth/login';
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-md w-full border-2 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome to FinSight</h1>
          <p className="text-gray-600 mb-6">
            Sign in with your email to get started analyzing your spending habits.
          </p>
          
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign In with Email
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account? Signing in will create one for you.
          </p>
        </div>
      </div>
    </div>
  );
}
