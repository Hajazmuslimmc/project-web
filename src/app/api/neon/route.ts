import { sql } from '@/lib/neon';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query, params } = await request.json();

    const result = await sql.query(query, params || []);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Neon query error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
