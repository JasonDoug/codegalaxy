# 🌌 Code Galaxy - 3D Developer Portfolio Template

[![Deploy Demo](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JasonDoug/codegalaxy)
[![Deploy Personal](https://img.shields.io/badge/Deploy%20Personal-Vercel-black)](https://vercel.com/new/clone?repository-url=https://github.com/JasonDoug/codegalaxy&env=NEXT_PUBLIC_GITHUB_TOKEN,NEXT_PUBLIC_GITHUB_USERNAME&envDescription=GitHub%20API%20credentials%20for%20your%20repository%20data&envLink=https://github.com/JasonDoug/codegalaxy#-environment-setup)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-red)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> 🚀 **Revolutionary 3D Developer Portfolio Template** - Transform your GitHub repositories into an interactive 3D galaxy where each repo exists as an explorable planet in space.

## ✨ Features

### 🌟 Core Experience
- **🪐 3D Repository Visualization** - Your repos become planets with sizes based on stars and activity
- **🔄 Real-time GitHub Integration** - Live data from your actual repositories
- **🎮 Interactive Navigation** - Orbit controls, zoom, and click-to-explore functionality
- **📱 Fully Responsive** - Optimized experience across all devices
- **🌙 Immersion Mode** - Press `F` to hide UI for distraction-free viewing

### 🎛️ Advanced Controls
- **Single-click planets** → Show floating repository stats
- **Double-click planets** → Open detailed repository modal  
- **Click Developer Core** → View your GitHub profile
- **ESC key** → Clear all floating stats
- **F key** → Toggle immersion mode

### 🔧 Technical Features
- **⚡ Next.js 15** with App Router and TypeScript
- **🎨 Three.js + React Three Fiber** for 3D graphics
- **🎭 Framer Motion** for cinematic animations
- **🎨 Tailwind CSS 4** for modern styling
- **🔒 Security-first** approach with sessionStorage
- **📊 Smart Data Visualization** with language-based color coding

## 🚀 Quick Start

### 1️⃣ Use This Template

```bash
# Option A: Use GitHub Template
Click "Use this template" button above

# Option B: Clone directly  
git clone https://github.com/JasonDoug/codegalaxy.git my-portfolio
cd my-portfolio
npm install
```

### 2️⃣ Environment Setup

Create a `.env.local` file:

```bash
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_GITHUB_TOKEN=your-github-token
```

**Get Your GitHub Token:**
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/personal-access-tokens/new)
2. Create a **fine-grained token** with read-only access to public repositories
3. Or create a **classic token** with `public_repo` scope

### 3️⃣ Launch Your Galaxy

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore your Code Galaxy! 🌌

### 4️⃣ Configure Through UI (Optional)

1. Click the gear icon → System Config
2. Enter your GitHub credentials
3. Test connection and save
4. Enjoy your personalized 3D portfolio!

## 🎨 Customization

### 🌈 Themes & Colors

**Language Colors** (`src/lib/github.ts`):
```typescript
export const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  // Add your languages here
}
```

**Galaxy Background** (`src/app/page.tsx`):
```typescript
className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900"
```

### 🪐 Repository Display

**Planet Sizing Algorithm** (`src/lib/github.ts`):
```typescript
// Customize how repository metrics affect planet sizes
const baseSize = Math.max(0.5, Math.min(2, stars / 200 + size / 10000));
```

**Orbital Positioning** (`src/lib/github.ts`):
```typescript
// Modify 3D positioning algorithm
transformRepositoryFor3D(repositories, index)
```

### 🎭 UI Components

- **Welcome Message**: `src/app/page.tsx` 
- **Developer HUD**: `src/components/DeveloperHUD.tsx`
- **Repository Modals**: `src/components/RepositoryDetail.tsx`
- **GitHub Profile**: `src/components/GitHubProfile.tsx`

## 📦 Deployment

### 🎮 Demo Deployment (Zero Configuration!)
[![Deploy Demo](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JasonDoug/codegalaxy)

**🎉 TRUE one-click deployment!**
- No environment variables required
- No configuration needed  
- Deploys instantly with beautiful mock data
- Full 3D portfolio experience ready to go

**Want to connect your GitHub?** Use the System Config (⚙️) in the deployed app to add your credentials through the UI!

### 🔑 Personal Deployment (Your GitHub Data)
[![Deploy Personal](https://img.shields.io/badge/Deploy%20Personal-Vercel-black)](https://vercel.com/new/clone?repository-url=https://github.com/JasonDoug/codegalaxy&env=NEXT_PUBLIC_GITHUB_TOKEN,NEXT_PUBLIC_GITHUB_USERNAME&envDescription=GitHub%20API%20credentials%20for%20your%20repository%20data&envLink=https://github.com/JasonDoug/codegalaxy#-environment-setup)

1. Click "Deploy Personal" button above
2. Connect your GitHub account
3. Add your environment variables:
   - `NEXT_PUBLIC_GITHUB_USERNAME` = your GitHub username
   - `NEXT_PUBLIC_GITHUB_TOKEN` = your GitHub token ([get one here](https://github.com/settings/tokens/new?description=Portfolio%20App&scopes=public_repo))
4. Deploy with your real repository data!

### 🔄 Switch from Demo to Personal Data

**Already deployed the demo?** Here's how to add your GitHub data:

**Option 1: Vercel Dashboard**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   - `NEXT_PUBLIC_GITHUB_USERNAME` = your GitHub username
   - `NEXT_PUBLIC_GITHUB_TOKEN` = your GitHub token
4. Redeploy your project

**Option 2: Built-in System Config**
1. Visit your deployed demo
2. Click the gear icon (⚙️) on the left side
3. Click "System Config" in the menu
4. Enter your GitHub username and token
5. Click "Test Connection" to verify
6. Click "Save & Apply"
7. Your portfolio will instantly load your real repositories!

### Other Platforms

**Netlify:**
```bash
npm run build
npm run export  # Static export
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🛠️ Development

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production  
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Main galaxy interface
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── CodeGalaxy.tsx  # 3D visualization core
│   ├── DeveloperHUD.tsx # Statistics overlay
│   └── *.tsx           # Other UI components
├── lib/               # Utilities & API
│   ├── github.ts      # GitHub API integration
│   └── mockData.ts    # Fallback demo data
├── hooks/             # Custom React hooks
└── types/             # TypeScript definitions
```

### Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript 5
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS 4, Framer Motion
- **API**: GitHub REST API with Bearer authentication
- **Icons**: Lucide React

## 🎮 Interactive Guide

### Controls
| Input | Action |
|-------|--------|
| `Mouse Drag` | Orbit around galaxy |
| `Mouse Wheel` | Zoom in/out |
| `Single Click Planet` | Toggle floating stats |
| `Double Click Planet` | Open repository details |
| `Click Developer Core` | View GitHub profile |
| `ESC` | Clear all floating stats |
| `F` | Toggle immersion mode |

### Navigation Tips
- **Explore freely** - The galaxy rotates slowly automatically
- **Use immersion mode** for presentations or screenshots
- **Check planet sizes** - Larger planets = more stars/activity
- **Orbital rings** indicate repository activity levels
- **Color coding** represents primary programming language

## 🔧 Configuration

### Environment Variables

**Required:**
```bash
NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

**Optional:**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX              # Google Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com  # Plausible Analytics
```

### GitHub Token Scopes

**For Classic Tokens:**
- `public_repo` - Read public repository data
- `read:user` - Read user profile information  

**For Fine-grained Tokens:**
- Repository access: Public repositories (read)
- Account permissions: Profile (read)

## 🌟 Showcase Examples

- **Live Demo**: [codegalaxy-demo.vercel.app](https://codegalaxy-demo.vercel.app)
- **Documentation**: [Full setup guide](./DEPLOYMENT.md)
- **Customization**: [Advanced configuration](./docs/CUSTOMIZATION.md)

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch: `git checkout -b feature/amazing-addition`
3. **💾 Commit** your changes: `git commit -m 'Add amazing feature'`
4. **🚀 Push** to the branch: `git push origin feature/amazing-addition`
5. **🔄 Submit** a Pull Request

### Development Setup

```bash
git clone https://github.com/JasonDoug/codegalaxy.git
cd codegalaxy
npm install
npm run dev
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** for incredible 3D web graphics
- **Vercel Team** for Next.js and deployment platform  
- **GitHub** for providing the API that powers this experience
- **React Three Fiber** for bringing React and Three.js together
- **All Contributors** who help make this project better

## 📞 Support

- **🐛 Issues**: [GitHub Issues](https://github.com/JasonDoug/codegalaxy/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/JasonDoug/codegalaxy/discussions)  
- **📧 Email**: [your-email@domain.com](mailto:your-email@domain.com)

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by developers, for developers

[🎮 Deploy Demo](https://vercel.com/new/clone?repository-url=https://github.com/JasonDoug/codegalaxy) • [🔑 Deploy Personal](https://vercel.com/new/clone?repository-url=https://github.com/JasonDoug/codegalaxy&env=NEXT_PUBLIC_GITHUB_TOKEN,NEXT_PUBLIC_GITHUB_USERNAME) • [📖 Documentation](./docs/)

</div>