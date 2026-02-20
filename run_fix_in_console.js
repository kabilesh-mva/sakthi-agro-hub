// Run this in your browser console on the Admin page to fix the product permissions
// Copy and paste this entire script into the browser console (F12 > Console)

(async function fixProductPermissions() {
  console.log("🔧 Fixing product permissions...");
  
  const SUPABASE_URL = "https://tdncnfwnfzmzqebwgufr.supabase.co";
  const SUPABASE_KEY = "sb_publishable_XeA2LTav7dqlVSnCoeE6jw_SnMS3opZ";
  
  const sql = `
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

-- Create new policies that allow anyone to manage products
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE TO authenticated, anon USING (true);

CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE TO authenticated, anon USING (true);

-- Fix inquiries policies
DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;

CREATE POLICY "Allow public insert inquiries" ON public.inquiries
  FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Allow public read inquiries" ON public.inquiries
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Allow public update inquiries" ON public.inquiries
  FOR UPDATE TO authenticated, anon USING (true);
  `;
  
  try {
    // Note: This requires admin API access which isn't available from client
    // This is just for demonstration - you need to run it in Supabase Dashboard
    console.log("❌ Cannot execute DDL statements from client-side");
    console.log("📋 Please copy this SQL and run it in Supabase Dashboard:");
    console.log("https://supabase.com/dashboard/project/tdncnfwnfzmzqebwgufr/sql");
    console.log("\n" + sql);
  } catch (error) {
    console.error("Error:", error);
  }
})();
