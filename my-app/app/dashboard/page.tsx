'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import NavBar from '../components/navbar/navbar';

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      window.location.href = '/auth/login';
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Welcome back, {user.name || user.email}!
          </p>

          <div className="border-2 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Your Spending Wrapped</h2>
            <p className="text-gray-600 mb-6">
              Upload your bank statement to get started
            </p>
            <div className="border-2 border-dashed rounded-lg p-12 mb-4">
              <p className="text-lg mb-2">Drop your bank statement here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
              <p className="text-sm text-gray-500 mt-2">Supports PDF files from most major banks</p>
            </div>
            <button className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors">
              Upload Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
