import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const url = new URL(req.url || "", "http://localhost");
  const action = url.searchParams.get("action") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = 10;
  const client = await clientPromise;
  const db = client.db();
  const filter: Record<string, unknown> = {};
  if (action) filter.action = action;
  const totalLogs = await db.collection("audit_logs").countDocuments(filter);
  const logs = await db
    .collection("audit_logs")
    .find(filter)
    .sort({ timestamp: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return NextResponse.json({
    logs,
    totalPages: Math.ceil(totalLogs / pageSize),
  });
} 