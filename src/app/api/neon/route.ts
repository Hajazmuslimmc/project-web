import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { query, params } = await request.json();
    const result = await sql(query, params || []);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Neon query error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
