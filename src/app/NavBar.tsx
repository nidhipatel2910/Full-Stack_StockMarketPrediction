import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-center gap-6 py-4 px-6 bg-white/80 backdrop-blur shadow-md rounded-b-2xl mb-8">
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
    </nav>
  );
}