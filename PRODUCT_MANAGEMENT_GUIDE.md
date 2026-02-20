# Product Management System - Setup Guide

## 🎯 Overview

Your website now has a dynamic product management system where you can add, edit, and delete products with images and prices through an admin interface.

## 📋 Setup Steps

### 1. Set Up Supabase Database

You need to run the SQL migration to create the products table:

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Click on your project
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the contents of `supabase/migrations/create_products_table.sql`
6. Paste it into the SQL editor
7. Click **Run** to execute the migration

### 2. Access the Admin Panel

Once the database is set up, you can access the product management interface:

**URL:** `http://localhost:5173/admin/products` (or your production URL + `/admin/products`)

## 🛠️ How to Use

### Adding a New Product

1. Go to `/admin/products`
2. Click **"Add New Product"** button
3. Fill in the product details:
   - **Product Name**: e.g., "Battery Sprayer 16L"
   - **Category**: Choose from Sprayers, Pumps, Engines, or Spare Parts
   - **Description**: Detailed product description
   - **Price**: e.g., "₹15,000" or "Contact for pricing"
   - **Image URL**: Upload your image to a service like:
     - [Imgur](https://imgur.com) - Free image hosting
     - [ImgBB](https://imgbb.com) - Free image hosting
     - Or use any direct image URL
   - **Rating**: 1-5 stars (default: 4.5)
   - **In Stock**: Toggle on/off
4. Click **"Add Product"**

### Editing a Product

1. Find the product in the list
2. Click the **"Edit"** button
3. Update the details
4. Click **"Update Product"**

### Deleting a Product

1. Find the product in the list
2. Click the **"Delete"** button
3. Confirm the deletion

## 📸 Image Upload Options

Since you need image URLs, here are the best free options:

### Option 1: Imgur (Recommended)
1. Go to https://imgur.com
2. Click "New post"
3. Upload your image
4. Right-click the image and select "Copy image address"
5. Paste this URL in the "Image URL" field

### Option 2: ImgBB
1. Go to https://imgbb.com
2. Upload your image
3. Copy the "Direct link"
4. Paste in the "Image URL" field

### Option 3: Your Own Hosting
- If you have a website or cloud storage, upload images there
- Use the direct URL to the image

## 🔒 Security Note

Currently, the admin panel is accessible to anyone with the URL. For production:

1. You should add authentication
2. Only allow authenticated admin users to access `/admin/products`
3. The database already has Row Level Security (RLS) policies that require authentication for add/edit/delete operations

## 📱 Features

### Customer View (`/products`)
- Displays all products dynamically from database
- Category filtering
- Product images, descriptions, and prices
- WhatsApp inquiry buttons
- Stock status indicators

### Admin View (`/admin/products`)
- Add new products
- Edit existing products
- Delete products
- Upload product images
- Set prices and stock status
- Manage categories

## 🎨 Product Categories

- **Sprayers**: Battery sprayers, manual sprayers, power sprayers
- **Pumps**: Diesel pumps, petrol pumps, submersible pumps
- **Engines**: Diesel engines, petrol engines, marine engines
- **Spare Parts**: Nozzles, hoses, engine parts, pump components

## 💡 Tips

1. **Image Quality**: Use high-quality product images (recommended: 800x800px or larger)
2. **Descriptions**: Write clear, detailed descriptions highlighting key features
3. **Pricing**: Be transparent with pricing or use "Contact for pricing"
4. **Stock Status**: Keep stock status updated to avoid customer disappointment
5. **Categories**: Use consistent categories for better organization

## 🚀 Next Steps

1. Run the SQL migration in Supabase
2. Visit `/admin/products` to start adding products
3. Add your first product with all details
4. Check `/products` page to see it live
5. Test the filtering and inquiry features

## ❓ Troubleshooting

**Products not showing?**
- Check if the SQL migration ran successfully
- Check browser console for errors
- Verify Supabase connection in `.env` file

**Can't add products?**
- Make sure you're authenticated (if auth is enabled)
- Check Supabase RLS policies
- Verify all required fields are filled

**Images not loading?**
- Verify the image URL is direct and publicly accessible
- Try opening the URL in a new browser tab
- Use a different image hosting service

## 📞 Need Help?

If you encounter any issues, check:
1. Browser console for error messages
2. Supabase dashboard for database errors
3. Network tab to see API requests

---

**Your product management system is now ready to use!** 🎉
