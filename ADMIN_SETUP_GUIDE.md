# Admin Setup Instructions

## The admin panel now uses Supabase Authentication

### Step 1: Create an Admin User in Supabase

1. Go to: https://supabase.com/dashboard/project/tdncnfwnfzmzqebwgufr
2. Click on **Authentication** → **Users**
3. Click **Add User** button
4. Fill in:
   - **Email**: `admin@sakthiagro.com` (or your preferred email)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ **Enable this** (important!)
5. Click **Add User**

### Step 2: Grant Admin Role to Your User

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Run this SQL (replace with your user's email):

```sql
-- Find your user ID by email and grant admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'admin@sakthiagro.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

4. Click **Run**

### Step 3: Login to Admin Panel

1. Go to your website's admin page: `/admin`
2. Login with the email and password you created
3. You can now manage products and inquiries!

## Why This Change?

The previous simple code-based authentication couldn't work with Supabase's Row Level Security (RLS) policies. Now the admin panel uses proper Supabase authentication which:

- ✅ Works with the existing database security policies
- ✅ More secure with password hashing
- ✅ Supports password recovery
- ✅ Better audit trails
- ✅ Industry-standard authentication

## Troubleshooting

### "Invalid credentials" error
- Make sure you enabled "Auto Confirm User" when creating the user
- Check that you're using the correct email/password

### "Permission denied" error when adding products
- Run the SQL in Step 2 to grant admin role
- Verify in SQL Editor: `SELECT * FROM public.user_roles;`

### Forgot password
- Go to Supabase Dashboard → Authentication → Users
- Find your user and reset the password
