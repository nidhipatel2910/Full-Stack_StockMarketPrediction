"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ConfirmModal from "@/components/ConfirmModal";
interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}
export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const session = useSession().data;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setUsers(data.users);
      setError("");
    } catch {
      setError("Access denied or failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    setActionError("");
    setConfirmDeleteId(userId); // Open modal
  };
  const confirmDelete = async () => {
    if (!confirmDeleteId) return;
    setLoading(true);
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: confirmDeleteId }),
    });
    setLoading(false);
    setConfirmDeleteId(null);
    if (res.status !== 200) {
      setActionError((await res.json()).error || "Failed to delete user");
    } else {
      fetchUsers();
    }
  };

  function RoleControl({ user }: { user: User }) {
    const [updating, setUpdating] = useState(false);
    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActionError("");
      const newRole = e.target.value;
      setUpdating(true);
      const res = await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, newRole }),
      });
      setUpdating(false);
      if (res.status !== 200) {
        setActionError((await res.json()).error || "Failed to update role");
      } else {
        fetchUsers();
      }
    };
    return (
      <select
        value={user.role}
        onChange={handleChange}
        disabled={updating}
        className="border px-2 py-1"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <input
        type="text"
        placeholder="Search by email, name, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-600">{error}</p>}
      {actionError && <p className="text-red-600">{actionError}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Name</th>
            <th className="text-left py-2 px-3">Role</th>
            <th className="text-left py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-3">{user.email}</td>
              <td className="py-2 px-3">{user.name}</td>
              <td className="py-2 px-3">
                <RoleControl user={user} />
              </td>
              <td className="py-2 px-3 flex gap-2">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmDeleteId && (
        <ConfirmModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </main>
  );
} 