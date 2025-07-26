export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-4 text-center">
          About This Project
        </h1>
        <p className="text-gray-600 text-lg text-center mb-2">
          This application demonstrates a modern MERN stack using{" "}
          <span className="font-semibold text-indigo-600">Next.js</span>.
        </p>
        <div className="mt-6 flex flex-col items-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
            MERN • Next.js • Tailwind CSS
          </span>
        </div>
      </section>
    </main>
  );
}