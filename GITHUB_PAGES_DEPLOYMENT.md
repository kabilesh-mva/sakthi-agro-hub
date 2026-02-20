# GitHub Pages Deployment Guide

This guide will help you deploy the Sakthi Agro Hub website to GitHub Pages.

## Prerequisites

- Node.js and npm installed
- Git installed
- A GitHub account

## Step 1: Update Configuration Files

### 1.1 Update `package.json`

Make sure the `homepage` field in `package.json` matches your GitHub username and repository name:

```json
"homepage": "https://yourusername.github.io/sakthi-agro-hub"
```

Replace `yourusername` with your actual GitHub username.

### 1.2 Update `vite.config.ts`

The `base` path should match your repository name:

```typescript
base: "/sakthi-agro-hub/",
```

## Step 2: Initialize Git Repository

If you haven't already initialized a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `sakthi-agro-hub`
3. Don't initialize it with a README (since you already have code)
4. Click "Create repository"

## Step 4: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/yourusername/sakthi-agro-hub.git
git branch -M main
git push -u origin main
```

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Deploy to GitHub Pages

### Option A: Manual Deployment

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Push to GitHub

### Option B: Automatic Deployment with GitHub Actions

1. Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Commit and push the workflow file:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

3. Go to your repository Settings → Pages
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"

## Step 7: Enable GitHub Pages

### If using Manual Deployment (gh-pages branch):

1. Go to your repository Settings
2. Navigate to "Pages"
3. Under "Source":
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
4. Click "Save"

### If using GitHub Actions:

1. Go to your repository Settings
2. Navigate to "Pages"
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"

## Step 8: Access Your Deployed Site

Your site will be available at:
```
https://yourusername.github.io/sakthi-agro-hub
```

**Note:** It may take 2-5 minutes for the site to be available after deployment.

## Troubleshooting

### 404 Errors

- Make sure the `base` path in `vite.config.ts` matches your repository name
- Check that the `homepage` field in `package.json` is correct
- Wait a few minutes for GitHub Pages to propagate

### Blank Page

- Open browser DevTools console to check for errors
- Ensure all assets are loading correctly
- Check that the router is using `HashRouter` (already configured)

### Build Errors

```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## Updating the Site

After making changes:

```bash
# For manual deployment
npm run deploy

# For GitHub Actions (just push your changes)
git add .
git commit -m "Your commit message"
git push origin main
```

## Environment Variables

For production, you may want to use environment variables. Create a `.env.production` file:

```env
VITE_SUPABASE_URL=https://iuuhmkyyalrutbciwwwv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-key-here
```

**Important:** Never commit sensitive keys to public repositories!

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   www.sakthiagro.com
   ```

2. In your repository Settings → Pages, add your custom domain

3. Configure DNS records with your domain provider

## Notes

- The site uses `HashRouter` for routing, which is compatible with GitHub Pages
- URLs will have `#` in them (e.g., `/#/products`)
- All routes work without server configuration
- The build output is optimized for production
