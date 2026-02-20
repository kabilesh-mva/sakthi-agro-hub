-- ============================================
-- EMERGENCY FIX - RUN THIS IN SUPABASE
-- ============================================
-- This will fix ALL issues at once
-- Copy EVERYTHING below and run in Supabase SQL Editor

-- First, let's check what exists
SELECT 'Checking tables...' as step;

-- Create products table if missing
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  specifications TEXT,
  price DECIMAL(10,2),
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reviews table if missing (with email field)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create inquiries table if missing
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop ALL old policies
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow public insert" ON public.products;
DROP POLICY IF EXISTS "Allow public update" ON public.products;
DROP POLICY IF EXISTS "Allow public delete" ON public.products;

DROP POLICY IF EXISTS "Allow public read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public insert reviews" ON public.reviews;

DROP POLICY IF EXISTS "Allow public insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public read inquiries" ON public.inquiries;

-- Create NEW permissive policies for products
CREATE POLICY "public_full_access_products" ON public.products
  FOR ALL TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Create NEW permissive policies for reviews
CREATE POLICY "public_full_access_reviews" ON public.reviews
  FOR ALL TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Create NEW permissive policies for inquiries
CREATE POLICY "public_full_access_inquiries" ON public.inquiries
  FOR ALL TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- ============================================
-- STORAGE BUCKET - THE MAIN FIX
-- ============================================

-- Delete existing bucket if it exists (clean slate)
DO $$
BEGIN
  DELETE FROM storage.buckets WHERE id = 'product-images';
END $$;

-- Wait a moment for deletion to complete
SELECT pg_sleep(1);

-- Create fresh bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Drop ALL old storage policies
DROP POLICY IF EXISTS "Allow public uploads to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;

-- Create NEW storage policies
CREATE POLICY "public_upload_images"
  ON storage.objects FOR INSERT
  TO authenticated, anon
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "public_read_images"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "public_update_images"
  ON storage.objects FOR UPDATE
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "public_delete_images"
  ON storage.objects FOR DELETE
  TO authenticated, anon
  USING (bucket_id = 'product-images');

-- ============================================
-- VERIFICATION - Check everything was created
-- ============================================

SELECT 'Tables created:' as check;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('products', 'reviews', 'inquiries');

SELECT 'Storage bucket created:' as check;
SELECT id, name, public FROM storage.buckets WHERE id = 'product-images';

SELECT '✅ ALL DONE! Refresh your website and try again!' as status;
