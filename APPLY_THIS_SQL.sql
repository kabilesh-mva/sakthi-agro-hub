-- ⚠️ IMPORTANT: Copy this ENTIRE SQL and run it in Supabase Dashboard
-- This fixes the database schema and enables product creation

-- Step 1: Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow authenticated insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated update" ON products;
DROP POLICY IF EXISTS "Allow authenticated delete" ON products;

-- Step 2: Make optional fields nullable (if they have NOT NULL constraint)
DO $$ 
BEGIN
  -- Drop NOT NULL constraint from description if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'description' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE products ALTER COLUMN description DROP NOT NULL;
  END IF;

  -- Drop NOT NULL constraint from price if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'price' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE products ALTER COLUMN price DROP NOT NULL;
  END IF;

  -- Drop NOT NULL constraint from image_url if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'image_url' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE products ALTER COLUMN image_url DROP NOT NULL;
  END IF;
END $$;

-- Step 3: Convert price from TEXT to DECIMAL
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'price' 
    AND data_type = 'text'
  ) THEN
    ALTER TABLE products 
      ALTER COLUMN price TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price ~ '^[0-9]+\.?[0-9]*$' THEN price::DECIMAL(10,2)
        ELSE NULL 
      END;
  END IF;
END $$;

-- Step 4: Add specifications column if missing
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'specifications'
  ) THEN
    ALTER TABLE products ADD COLUMN specifications TEXT;
  END IF;
END $$;

-- Step 5: Create new policies for public access
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

-- ✅ Done! After running this, you should be able to add products
