-- ============================================
-- COMPLETE SUPABASE FIX FOR SAKTHI AGRO
-- ============================================
-- Run this ENTIRE SQL in Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/iuuhmkyyalrutbciwwwv/sql/new
-- Copy ALL of this SQL and click RUN

-- ============================================
-- PART 1: REVIEWS TABLE
-- ============================================

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public delete reviews" ON public.reviews;

-- Create policies for reviews
CREATE POLICY "Allow public read reviews" ON public.reviews
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public insert reviews" ON public.reviews
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

-- ============================================
-- PART 2: PRODUCTS TABLE
-- ============================================

-- Create products table if it doesn't exist
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

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow public insert" ON public.products;
DROP POLICY IF EXISTS "Allow public update" ON public.products;
DROP POLICY IF EXISTS "Allow public delete" ON public.products;

-- Create policies for products
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE TO authenticated, anon
  USING (true);

-- ============================================
-- PART 3: INQUIRIES TABLE
-- ============================================

-- Create inquiries table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public update inquiries" ON public.inquiries;

-- Create policies for inquiries
CREATE POLICY "Allow public insert inquiries" ON public.inquiries
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Allow public read inquiries" ON public.inquiries
  FOR SELECT TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated, anon
  USING (true);

-- ============================================
-- PART 4: STORAGE BUCKET FOR PRODUCT IMAGES
-- ============================================

-- Create storage bucket for product-images
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('product-images', 'product-images', true, 5242880)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow public uploads to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete product images" ON storage.objects;

-- Create storage policies
CREATE POLICY "Allow public uploads to product images"
  ON storage.objects FOR INSERT
  TO authenticated, anon
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public read access to product images"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "Allow public update product images"
  ON storage.objects FOR UPDATE
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "Allow public delete product images"
  ON storage.objects FOR DELETE
  TO authenticated, anon
  USING (bucket_id = 'product-images');

-- ============================================
-- ✅ ALL DONE! Database and Storage are ready!
-- ============================================
-- Now you can:
-- 1. Add products with images
-- 2. Submit reviews
-- 3. Send inquiries
-- All features will work!
