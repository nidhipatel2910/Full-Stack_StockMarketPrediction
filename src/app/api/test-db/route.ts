import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();
    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Database connection error:", error); // Log the error for debugging
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}