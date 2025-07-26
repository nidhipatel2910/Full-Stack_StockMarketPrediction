"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();
  return (
    <header className="bg-white/80 backdrop-blur shadow-md rounded-b-2xl mb-8">
      <nav className="flex items-center justify-between max-w-5xl mx-auto px-6 py-3">
        <div className="flex gap-2 sm:gap-4">
          <Link
            href="/"
            className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
          >
            About
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {status === "loading" ? (
            <span className="text-gray-500 text-sm">Loading...</span>
          ) : session ? (
            <>
              <span className="text-sm text-gray-700 bg-indigo-50 px-2 py-1 rounded font-medium">
                {session.user?.email}
              </span>
              <button
                className="text-white bg-indigo-600 hover:bg-indigo-700 transition px-3 py-1 rounded shadow font-semibold"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-indigo-700 font-semibold hover:text-indigo-900 transition-colors px-3 py-1 rounded hover:bg-indigo-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}