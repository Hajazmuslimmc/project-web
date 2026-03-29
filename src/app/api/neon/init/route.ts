import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const db = neon(process.env.DATABASE_URL!) as unknown as {
  query: (q: string) => Promise<unknown>;
};

export async function GET() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS nt_players (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        gamemode TEXT NOT NULL,
        rank TEXT NOT NULL,
        retired BOOLEAN DEFAULT FALSE,
        region TEXT DEFAULT 'NA',
        edition TEXT DEFAULT 'java',
        verified BOOLEAN DEFAULT FALSE,
        discord_id TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(name, gamemode, edition)
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS nt_verify_tokens (
        id SERIAL PRIMARY KEY,
        discord_id TEXT NOT NULL,
        mc_username TEXT NOT NULL,
        token TEXT NOT NULL UNIQUE,
        edition TEXT DEFAULT 'java',
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    return NextResponse.json({ ok: true, message: 'Tables created' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
