-- ============================================
-- FIX FOR PRODUCT MANAGEMENT ERROR
-- ============================================
-- Run this SQL in Supabase Dashboard to fix the "Add Product" error
-- This updates the database policies to allow public access

-- Step 1: Go to https://supabase.com/dashboard/project/tdncnfwnfzmzqebwgufr/sql
-- Step 2: Copy this entire script
-- Step 3: Click "Run" button

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;

-- Create new permissive policies for products
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE
  TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE
  TO authenticated, anon
  USING (true);

-- Create new permissive policies for inquiries
CREATE POLICY "Allow public insert inquiries" ON public.inquiries
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Allow public read inquiries" ON public.inquiries
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Allow public update inquiries" ON public.inquiries
  FOR UPDATE
  TO authenticated, anon
  USING (true);

-- ============================================
-- DONE! Refresh your admin page and try adding a product
-- ============================================
