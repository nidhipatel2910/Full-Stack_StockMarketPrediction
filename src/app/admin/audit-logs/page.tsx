"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AuditLog {
  _id: string;
  timestamp: string;
  actorId: string;
  targetUserId: string;
  action: string;
  details: Record<string, unknown>;
}

export default function AuditLogsPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (!session || session.user.role !== "admin") return;
    fetch(`/api/admin/audit-logs?action=${actionFilter}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => setError("Failed to load audit logs."));
  }, [session, actionFilter, page]);

  if (!session || session.user.role !== "admin") {
    return <p className="p-6 text-red-600">Access Denied</p>;
  }

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Audit Logs</h1>
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Filter by action (e.g., UPDATE_ROLE)"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setActionFilter("")}
        >
          Clear
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3">Timestamp</th>
            <th className="text-left py-2 px-3">Action</th>
            <th className="text-left py-2 px-3">Actor</th>
            <th className="text-left py-2 px-3">Target</th>
            <th className="text-left py-2 px-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b">
              <td className="py-2 px-3">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="py-2 px-3">{log.action}</td>
              <td className="py-2 px-3">{log.actorId}</td>
              <td className="py-2 px-3">{log.targetUserId}</td>
              <td className="py-2 px-3">
                <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 rounded">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-4 justify-center">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
} 