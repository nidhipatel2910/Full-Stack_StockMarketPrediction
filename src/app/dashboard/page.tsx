"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-6">
          <p className="text-lg text-indigo-600 font-semibold">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-6">
          <p className="text-lg text-red-600 font-semibold">Access denied.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
            <span className="text-3xl text-indigo-600 font-bold">
              {session.user?.name
                ? session.user.name.charAt(0).toUpperCase()
                : session.user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-1">
            Welcome, {session.user?.name || "User"}!
          </h1>
          <p className="text-gray-500 text-sm">
            Logged in as:{" "}
            <span className="font-medium">{session.user?.email}</span>
          </p>
        </div>
        <div className="w-full mt-4">
          <p className="text-gray-700 text-center">
            Here you can view and manage your account, data, and preferences.
          </p>
        </div>
      </section>
    </main>
  );
}
