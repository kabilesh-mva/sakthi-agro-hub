-- Fix products table schema to match application requirements
-- This migration alters the existing products table to make fields optional
-- and changes price from TEXT to DECIMAL

-- First, drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON products;
DROP POLICY IF EXISTS "Allow authenticated insert" ON products;
DROP POLICY IF EXISTS "Allow authenticated update" ON products;
DROP POLICY IF EXISTS "Allow authenticated delete" ON products;

-- Alter columns to allow NULL values and fix data types
ALTER TABLE products 
  ALTER COLUMN description DROP NOT NULL,
  ALTER COLUMN price DROP NOT NULL,
  ALTER COLUMN image_url DROP NOT NULL;

-- Change price from TEXT to DECIMAL if it's currently TEXT
-- First, try to convert existing data
DO $$ 
BEGIN
  -- Check if price column is TEXT type
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'price' 
    AND data_type = 'text'
  ) THEN
    -- Convert price column from TEXT to DECIMAL
    ALTER TABLE products 
      ALTER COLUMN price TYPE DECIMAL(10,2) 
      USING CASE 
        WHEN price ~ '^[0-9]+\.?[0-9]*$' THEN price::DECIMAL(10,2)
        ELSE NULL 
      END;
  END IF;
END $$;

-- Add specifications column if it doesn't exist
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

-- Recreate policies
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated insert" ON products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON products
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON products
  FOR DELETE
  USING (auth.role() = 'authenticated');
