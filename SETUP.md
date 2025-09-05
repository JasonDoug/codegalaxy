# Portfolio Setup Guide

## Quick Start

Your 3D Code Galaxy portfolio is ready! Here's how to set it up:

### 1. Configure GitHub Integration

You have two options to configure your GitHub credentials:

#### Option A: Environment Variables (Recommended for production)
1. Copy `.env.local.example` to `.env.local`
2. Get a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens/new?description=Portfolio%20App&scopes=public_repo
   - Select "public_repo" scope
   - Generate token
3. Fill in your `.env.local`:
   ```
   NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
   NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```

#### Option B: System Config Panel (Quick setup)
1. Open the portfolio at http://localhost:3001
2. Click the gear icon on the left side
3. Hover to see the navigation menu
4. Click "System Config"
5. Enter your GitHub username and token
6. Click "Test Connection" to verify
7. Click "Save & Apply" to store locally

### 2. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3001 to see your 3D Code Galaxy!

### 3. Deploy to Vercel

1. Push your code to a GitHub repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GITHUB_USERNAME`
   - `NEXT_PUBLIC_GITHUB_TOKEN`
4. Deploy!

## Features

- **3D Repository Visualization**: Your repos as planets in space
- **Real-time GitHub Data**: Live stats and repository information
- **Interactive Navigation**: Orbit controls and clickable repositories
- **Mobile Responsive**: Optimized for all devices
- **System Configuration**: Easy setup through the UI

## Need Help?

- Check the browser console for any errors
- Ensure your GitHub token has `public_repo` permissions
- Make sure your username is correct and public repositories exist