-- Sakthi Agro Database Setup
-- Run this in: https://supabase.com/dashboard/project/iuuhmkyyalrutbciwwwv/sql/new

-- Create products table if not exists
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

-- Create inquiries table if not exists
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
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- DROP EXISTING POLICIES FIRST (Fixes the error)
-- ============================================
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow public insert" ON public.products;
DROP POLICY IF EXISTS "Allow public update" ON public.products;
DROP POLICY IF EXISTS "Allow public delete" ON public.products;

DROP POLICY IF EXISTS "Allow public insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public update inquiries" ON public.inquiries;

-- Also drop storage policies if they exist
DROP POLICY IF EXISTS "Allow public uploads to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete product images" ON storage.objects;

-- ============================================
-- CREATE NEW POLICIES
-- ============================================

-- Policies for products (allow public access)
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE TO authenticated, anon USING (true);

CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE TO authenticated, anon USING (true);

-- Policies for inquiries
CREATE POLICY "Allow public insert inquiries" ON public.inquiries
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Allow public read inquiries" ON public.inquiries
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Allow public update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated, anon USING (true);

-- ============================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- ============================================

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('product-images', 'product-images', true, 5242880)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for product-images bucket
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

-- ✅ Database and Storage are ready!
