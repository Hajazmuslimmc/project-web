import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

let client: MongoClient | null = null;

async function getDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI!);
    await client.connect();
  }
  return client.db("mctiers");
}

export async function GET(req: NextRequest) {
  try {
    const mode = req.nextUrl.searchParams.get("mode") || "DiaPot";
    const db = await getDB();
    const data = await db.collection("tiers")
      .find({ mode })
      .sort({ points: -1 })
      .toArray();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }
}
