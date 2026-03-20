import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("mode") || "DiaPot";

  const { data, error } = await supabase
    .from("tiers")
    .select("*")
    .eq("mode", mode)
    .order("points", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, tier, points, region, mode } = body;

  const { error } = await supabase
    .from("tiers")
    .upsert({ username, tier, points, region, mode }, { onConflict: "username,mode" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
