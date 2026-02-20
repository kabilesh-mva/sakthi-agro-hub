-- Update products table policies to allow public access
-- This is needed since we're using code-based authentication instead of Supabase auth

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow authenticated insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated update" ON products;
DROP POLICY IF EXISTS "Allow authenticated delete" ON products;

-- Create new policies that allow public access for all operations
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON products
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON products
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete" ON products
  FOR DELETE
  USING (true);
