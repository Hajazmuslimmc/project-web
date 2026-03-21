-- ================================================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- This makes your database match what the HTML file expects
-- ================================================================

-- STEP 1: Drop the tiers table (wrong columns, we don't need it)
-- The HTML uses only ONE table called "players" with all data flat
DROP TABLE IF EXISTS tiers;

-- STEP 2: Rename the "ign" column to "name" so the HTML code works
-- (The HTML uses p.name everywhere)
ALTER TABLE players RENAME COLUMN ign TO name;

-- STEP 3: Drop columns the HTML doesn't use (optional, keeps it clean)
-- ALTER TABLE players DROP COLUMN IF EXISTS retired;
-- ALTER TABLE players DROP COLUMN IF EXISTS results;
-- (Leave commented out if you want to keep them for future use)

-- STEP 4: Add the missing columns the HTML DOES need
ALTER TABLE players ADD COLUMN IF NOT EXISTS gamemode text NOT NULL DEFAULT 'vanilla';
ALTER TABLE players ADD COLUMN IF NOT EXISTS tier     integer NOT NULL DEFAULT 1;
ALTER TABLE players ADD COLUMN IF NOT EXISTS ht       boolean NOT NULL DEFAULT false;

-- STEP 5: Change id from uuid to bigserial so it auto-increments
-- (The HTML uses numeric IDs for deletion)
-- If your id is already uuid, the HTML handles that too — skip this step
-- ALTER TABLE players ALTER COLUMN id TYPE bigint USING id::text::bigint;

-- STEP 6: Fix RLS policies so reads AND writes work with the anon key
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Drop any old policies first to avoid conflicts
DROP POLICY IF EXISTS "Enable read access for all users" ON players;
DROP POLICY IF EXISTS "Public read players" ON players;
DROP POLICY IF EXISTS "Public insert players" ON players;
DROP POLICY IF EXISTS "Public delete players" ON players;
DROP POLICY IF EXISTS "Public update players" ON players;
DROP POLICY IF EXISTS "anon_read" ON players;
DROP POLICY IF EXISTS "anon_insert" ON players;
DROP POLICY IF EXISTS "anon_delete" ON players;

-- Create clean open policies (since you're using the anon key)
CREATE POLICY "allow_select" ON players FOR SELECT USING (true);
CREATE POLICY "allow_insert" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_delete" ON players FOR DELETE USING (true);
CREATE POLICY "allow_update" ON players FOR UPDATE USING (true);

-- STEP 7: Verify the final table structure
-- After running, your players table should look like:
--
--   id       | uuid or bigint  | PRIMARY KEY
--   name     | text            | player's Minecraft IGN
--   region   | text            | NA / EU / AS
--   gamemode | text            | vanilla / sword / uhc / etc
--   tier     | integer         | 1-5
--   ht       | boolean         | true = High Tier
--   retired  | bool            | (kept for future use)
--   results  | jsonb           | (kept for future use)

-- DONE! Now open your mctiers.html file in a browser.
-- It will auto-seed all the player data on first load.
