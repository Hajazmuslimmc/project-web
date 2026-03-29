import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

type DB = { query: (q: string, p?: unknown[]) => Promise<Record<string, unknown>[]> };
const db = neon(process.env.DATABASE_URL!) as unknown as DB;

export async function POST(request: NextRequest) {
  try {
    const { discord_id, mc_username, edition = 'java' } = await request.json();
    if (!discord_id || !mc_username) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const token = randomBytes(4).toString('hex').toUpperCase();
    await db.query(
      `INSERT INTO nt_verify_tokens (discord_id, mc_username, token, edition)
       VALUES ($1, $2, $3, $4) ON CONFLICT (token) DO NOTHING`,
      [discord_id, mc_username, token, edition]
    );
    return NextResponse.json({ token, mc_username, edition });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { token, mc_username } = await request.json();
    if (!token || !mc_username) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const rows = await db.query(
      `SELECT * FROM nt_verify_tokens WHERE token=$1 AND mc_username=$2 AND used=FALSE`,
      [token, mc_username]
    );
    if (!rows.length) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    const row = rows[0] as { id: number; discord_id: string; edition: string };
    await db.query(`UPDATE nt_verify_tokens SET used=TRUE WHERE id=$1`, [row.id]);
    await db.query(
      `UPDATE nt_players SET verified=TRUE, discord_id=$1 WHERE name=$2 AND edition=$3`,
      [row.discord_id, mc_username, row.edition]
    );
    return NextResponse.json({ ok: true, discord_id: row.discord_id });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
