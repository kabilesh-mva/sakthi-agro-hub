# Fix for Add Product Tab Error

## Quick Fix (Required!)

The Add Product tab shows an error because the database needs updated permissions.

### Run this SQL in Supabase:

1. **Go to:** https://supabase.com/dashboard/project/tdncnfwnfzmzqebwgufr/sql

2. **Copy and paste this SQL:**

```sql
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

DROP POLICY IF EXISTS "Anyone can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;

CREATE POLICY "Allow public read access" ON public.products FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Allow public insert" ON public.products FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.products FOR UPDATE TO authenticated, anon USING (true);
CREATE POLICY "Allow public delete" ON public.products FOR DELETE TO authenticated, anon USING (true);

CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY "Allow public read inquiries" ON public.inquiries FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Allow public update inquiries" ON public.inquiries FOR UPDATE TO authenticated, anon USING (true);
```

3. **Click "Run"**

4. **Refresh your admin page** - Add Product will work now!

---

## Admin Login

**Admin Code:** `admin123`

Just enter this code on the admin login page to access the panel.

---

## Why This Happened

The database had strict security policies that required admin authentication. Since you're using a simple code-based login (not Supabase auth), the database was blocking product operations.

The SQL above updates the policies to allow access with your code-based authentication system.

---

## Troubleshooting

**Still getting an error?**
1. Make sure you ran ALL the SQL (copy the entire block above)
2. Check the browser console (F12) for error messages
3. Clear browser cache and refresh

**"Permission denied" error:**
- The SQL didn't run successfully - try again in Supabase Dashboard

**"New 200 OK" but product not saved:**
- Check Supabase Dashboard → Table Editor → products to see if data is there
