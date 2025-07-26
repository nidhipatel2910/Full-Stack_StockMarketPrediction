"use client";
import { useEffect, useState } from "react";
interface AuditEntry {
  _id: string;
  actorId: string;
  targetUserId: string;
  action: string;
  timestamp: string;
  details: Record<string, unknown>;
}
export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/audit")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setLogs(data.logs))
      .catch(() => setError("Failed to load audit logs"));
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <section className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Audit Logs
        </h1>
        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-50 border-b">
                <th className="text-left px-4 py-3 font-semibold text-indigo-700">Timestamp</th>
                <th className="text-left px-4 py-3 font-semibold text-indigo-700">Action</th>
                <th className="text-left px-4 py-3 font-semibold text-indigo-700">Actor</th>
                <th className="text-left px-4 py-3 font-semibold text-indigo-700">Target</th>
                <th className="text-left px-4 py-3 font-semibold text-indigo-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No audit logs found.
                  </td>
                </tr>
              ) : (
                logs.map((entry) => (
                  <tr key={entry._id} className="border-b hover:bg-indigo-50 transition">
                    <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">
                        {entry.action}
                      </span>
                    </td>
                    <td className="px-4 py-2">{entry.actorId}</td>
                    <td className="px-4 py-2">{entry.targetUserId}</td>
                    <td className="px-4 py-2">
                      <pre className="whitespace-pre-wrap text-xs text-gray-600 bg-gray-50 rounded p-2">
                        {JSON.stringify(entry.details, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}