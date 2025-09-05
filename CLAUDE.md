# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a revolutionary 3D developer portfolio called "Code Galaxy" - an immersive 3D experience where GitHub repositories exist as explorable planets in space.

## Essential Commands

```bash
# Development
npm run dev          # Start development server (usually localhost:3001)
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Dependencies
npm install          # Install all dependencies
```

## Architecture Overview

### Core Technology Stack
- **Next.js 15** with App Router and TypeScript
- **Three.js + React Three Fiber** for 3D graphics and repository visualization
- **Tailwind CSS 4** for styling with custom gradients
- **Framer Motion** for cinematic UI animations
- **GitHub API integration** for real repository data

### Key Components
- `src/app/page.tsx` - Main galaxy interface with 3D Canvas
- `src/components/CodeGalaxy.tsx` - 3D repository visualization system
- `src/components/DeveloperHUD.tsx` - Statistics overlay and UI elements
- `src/components/RepositoryDetail.tsx` - Interactive repository exploration modals
- `src/components/NavigationSphere.tsx` - Orbital navigation menu system
- `src/lib/github.ts` - GitHub API integration with intelligent caching

### Environment Setup

Required environment variables for GitHub integration:
```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
```

## Deployment

### Vercel Deployment
- Pre-configured with `vercel.json` for optimal performance
- Automatic static generation and edge function optimization
- Environment variables should be set in Vercel dashboard
- One-click deployment ready

### Development Features
- **3D Navigation**: Orbit controls for exploring repository planets
- **Responsive Design**: Full 3D on desktop, optimized cards on mobile  
- **Real-time Data**: Live GitHub statistics and repository information
- **Interactive Exploration**: Click repositories to explore detailed worlds
- **Performance Optimized**: Progressive loading and device-adaptive rendering

## Project Structure Philosophy

This portfolio reimagines developer presentation through spatial computing - repositories become celestial bodies in an explorable 3D universe, demonstrating both technical skills and creative vision.