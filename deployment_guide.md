# Deployment Guide

This project is a Vite-based React application. Here are the steps to deploy it for a live demo.

## Recommended: Vercel

Vercel is the easiest way to deploy Vite projects.

1. **GitHub Integration**:
   - Go to [Vercel](https://vercel.com/) and sign in with GitHub.
   - Click "New Project".
   - Import the `Portfolio_Website` repository.

2. **Environment Variables**:
   - During the import process, expand the "Environment Variables" section.
   - Add all variables from your local `.env` file:
     - `VITE_GITHUB_URL`
     - `VITE_LINKEDIN_URL`
     - `VITE_INSTAGRAM_URL`
     - `VITE_EMAIL_ADDRESS`
     - `VITE_PHONE_NUMBER`
     - `VITE_PROJECT_1_GITHUB`
     - `VITE_PROJECT_1_DEMO`
     - `VITE_PROJECT_2_GITHUB`
     - `VITE_PROJECT_2_DEMO`
     - `VITE_PROJECT_3_GITHUB`
     - `VITE_PROJECT_3_DEMO`

3. **Build Settings**:
   - Vercel should automatically detect Vite.
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**:
   - Click "Deploy". Vercel will build and host your project at a `.vercel.app` URL.

## Alternative: Netlify

1. **GitHub Integration**:
   - Go to [Netlify](https://www.netlify.com/) and sign in with GitHub.
   - Click "Add new site" -> "Import an existing project".
   - Select the `Portfolio_Website` repository.

2. **Site Configuration**:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**:
   - Go to "Site configuration" -> "Environment variables" to add your `VITE_` variables.

4. **Deploy**:
   - Trigger a new deploy.

## Manual Build (Static Hosting)

If you want to host on a basic static server:
1. Run `npm run build`.
2. Upload the contents of the `dist` folder to your server.
