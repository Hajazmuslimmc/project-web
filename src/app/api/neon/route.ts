import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { query, params } = await request.json();
    // neon tagged-template doesn't support dynamic queries directly,
    // so we use the underlying query method via sql.query
    const result = await (sql as unknown as { query: (q: string, p: unknown[]) => Promise<unknown> }).query(query, params || []);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Neon query error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
