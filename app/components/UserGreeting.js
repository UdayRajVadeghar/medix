'use client';

import Link from 'next/link';
import { useSession } from '../context/SessionContext';

export default function UserGreeting() {
  const { user, loading, logout } = useSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-6">
        <Link 
          href="/login" 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-medium text-sm">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-gray-800 font-medium">Hi, {user.name}!</span>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
} 