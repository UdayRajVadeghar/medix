'use client';

import Link from 'next/link';
import { useSession } from '../context/SessionContext';

export default function UserGreeting() {
  const { user, loading, logout } = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
        <Link href="/register" className="text-blue-500 hover:text-blue-700">
          Register
        </Link>
      </div>
    );
  }
  console.log(user.name);

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700">Hi, {user.name}!</span>
      <button
        onClick={logout}
        className="text-red-500 hover:text-red-700"
      >
        Logout
      </button>
    </div>
  );
} 