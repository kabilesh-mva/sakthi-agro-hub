-- ============================================
-- FIX: Row-Level Security Policy Error
-- ============================================
-- This fixes: "new row violates row-level security policy"
-- Run in: https://supabase.com/dashboard/project/iuuhmkyyalrutbciwwwv/sql/new

-- Step 1: Drop ALL existing policies on storage.objects
DROP POLICY IF EXISTS "Allow public uploads to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete product images" ON storage.objects;

-- Also try dropping with different names that might exist
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete" ON storage.objects;

DROP POLICY IF EXISTS "Insert Policy" ON storage.objects;
DROP POLICY IF EXISTS "Select Policy" ON storage.objects;
DROP POLICY IF EXISTS "Update Policy" ON storage.objects;
DROP POLICY IF EXISTS "Delete Policy" ON storage.objects;

-- Step 2: Create NEW permissive policies (no conditions)
-- These allow anyone to upload, read, update, delete in the product-images bucket

CREATE POLICY "public_upload_001"
  ON storage.objects FOR INSERT
  TO authenticated, anon
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "public_select_001"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "public_update_001"
  ON storage.objects FOR UPDATE
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "public_delete_001"
  ON storage.objects FOR DELETE
  TO authenticated, anon
  USING (bucket_id = 'product-images');

-- ✅ Done! Try uploading a product image now.
