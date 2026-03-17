import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongo = new MongoClient(process.env.MONGO_URI!);
let db: any;

async function getDB() {
  if (!db) {
    await mongo.connect();
    db = mongo.db("mctiers");
  }
  return db;
}

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") || "DiaPot";
  const database = await getDB();

  const data = await database.collection("tiers")
    .find({ mode })
    .sort({ points: -1 })
    .toArray();

  return NextResponse.json(data);
}
