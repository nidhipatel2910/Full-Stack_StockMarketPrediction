import "./globals.css";
import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "MERN Full-Stack App",
  description: "A production-grade web application using Next.js 15",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
        <SessionWrapper>
          <NavBar />
          <main className="flex-1 flex justify-center items-start px-4 py-8">
            <div className="w-full max-w-6xl">{children}</div>
          </main>
          <footer className="bg-white/80 backdrop-blur border-t p-4 text-center text-sm text-gray-500 rounded-t-xl shadow-inner">
            &copy; 2025 MERN Full-Stack Tutorial
          </footer>
        </SessionWrapper>
      </body>
    </html>
  );
}