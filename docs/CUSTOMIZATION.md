# 🎨 Customization Guide

This guide covers how to customize your Code Galaxy portfolio to match your personal style and preferences.

## 🌈 Visual Theming

### 🎨 Color Scheme

**Background Gradients** (`src/app/page.tsx`):
```typescript
// Main galaxy background
className="bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900"

// Ambient radial gradient
className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"
```

**UI Component Colors**:
```typescript
// Welcome panel border
border border-purple-500/30

// Developer HUD border  
border border-cyan-500/30

// Time display border
border border-blue-500/30
```

### 🌟 Language Colors

Edit `src/lib/github.ts` to customize programming language colors:

```typescript
export const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6', 
  Python: '#3776ab',
  Java: '#ed8b00',
  Go: '#00add8',
  Rust: '#ce422b',
  C: '#a8b9cc',
  'C++': '#f34b7d',
  PHP: '#777bb4',
  Ruby: '#cc342d',
  Swift: '#fa7343',
  Kotlin: '#7f52ff',
  Dart: '#0175c2',
  HTML: '#e34c26',
  CSS: '#1572b6',
  Shell: '#89e051',
  default: '#8b5cf6' // Fallback color
}
```

## 🪐 Repository Visualization

### 📏 Planet Sizing

Customize how repository metrics affect planet sizes in `src/lib/github.ts`:

```typescript
// Current algorithm
const baseSize = Math.max(0.5, Math.min(2, repository.stars / 200 + repository.size / 10000));

// Alternative algorithms:
// Stars-only sizing
const baseSize = Math.max(0.3, Math.min(1.5, repository.stars / 100));

// Activity-based sizing  
const baseSize = Math.max(0.4, Math.min(2, 
  repository.stars / 500 + 
  repository.commits / 100 + 
  repository.size / 50000
));
```

### 🌌 Galaxy Layout

**Positioning Algorithm** (`src/lib/github.ts`):
```typescript
transformRepositoryFor3D(repositories: GitHubRepository[], index: number) {
  // Current spherical distribution
  const angle = (index / repositories.length) * Math.PI * 2;
  const radius = 8 + Math.random() * 12;
  const height = (Math.random() - 0.5) * 8;
  
  // Alternative layouts:
  
  // Grid layout
  const gridSize = Math.ceil(Math.sqrt(repositories.length));
  const x = (index % gridSize - gridSize / 2) * 3;
  const z = (Math.floor(index / gridSize) - gridSize / 2) * 3;
  const position = [x, Math.random() * 2 - 1, z];
  
  // Spiral layout
  const spiral = index * 0.5;
  const spiralRadius = 5 + index * 0.3;
  const spiralHeight = index * 0.2;
  const position = [
    Math.cos(spiral) * spiralRadius,
    spiralHeight,
    Math.sin(spiral) * spiralRadius
  ];
}
```

### 💫 Orbital Rings

Customize orbital rings in `src/components/CodeGalaxy.tsx`:

```typescript
// Current algorithm
const ringCount = Math.min(3, Math.floor(repository.commits / 50));

// Alternative approaches:
// Stars-based rings
const ringCount = Math.min(4, Math.floor(repository.stars / 100));

// Activity-based rings
const ringCount = repository.lastActive.includes('day') ? 3 : 
                 repository.lastActive.includes('week') ? 2 : 1;
```

## 🎭 UI Components

### 📱 Welcome Message

Edit the welcome panel in `src/app/page.tsx`:

```typescript
<h1 className="text-3xl font-bold text-white mb-2">
  Welcome to 
  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
    {" "}Your Custom Galaxy
  </span>
</h1>
<p className="text-gray-300 text-sm leading-relaxed">
  Your personalized portfolio description here.
</p>
```

### 📊 Developer HUD

Customize statistics display in `src/components/DeveloperHUD.tsx`:

```typescript
// Add custom stats
const customStats = {
  totalRepos: userStats.totalRepos,
  totalStars: userStats.totalStars,
  totalCommits: repositories.reduce((sum, repo) => sum + repo.commits, 0),
  // Add your custom metrics
  totalIssues: repositories.reduce((sum, repo) => sum + (repo.openIssues || 0), 0),
  avgStarsPerRepo: Math.round(userStats.totalStars / userStats.totalRepos),
  mostUsedLanguage: getMostUsedLanguage(userStats.languages)
};
```

### 🎨 Color Themes

Create theme variants by modifying Tailwind classes:

```typescript
// Dark theme (current)
const darkTheme = {
  background: "from-slate-950 via-purple-950 to-slate-900",
  panels: "bg-black/20 border-purple-500/30",
  text: "text-white",
  accent: "text-purple-400"
};

// Light theme variant
const lightTheme = {
  background: "from-blue-50 via-purple-50 to-indigo-100", 
  panels: "bg-white/70 border-indigo-200",
  text: "text-gray-900",
  accent: "text-indigo-600"
};

// Cyberpunk theme
const cyberpunkTheme = {
  background: "from-gray-900 via-cyan-900 to-gray-900",
  panels: "bg-black/30 border-cyan-500/50",
  text: "text-green-400",
  accent: "text-cyan-400"
};
```

## 🎮 Interactions

### 🖱️ Controls Customization

Modify interaction behavior in `src/components/CodeGalaxy.tsx`:

```typescript
// Current double-click delay
const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

// Custom interaction patterns:
// Long press for stats
const handleLongPress = useCallback(() => {
  setShowFloatingStats(true);
}, []);

// Hover delay for stats
const handleHoverDelay = useMemo(() => 
  debounce(() => setShowFloatingStats(true), 500), []
);
```

### ⌨️ Keyboard Shortcuts

Add custom shortcuts in `src/app/page.tsx`:

```typescript
useEffect(() => {
  const handleKeyPress = (event: KeyboardEvent) => {
    switch(event.key) {
      case 'f':
      case 'F':
        setIsImmersiveMode(prev => !prev);
        break;
      case 'h':
      case 'H':
        // Toggle HUD
        setShowHUD(prev => !prev);
        break;
      case 'r':
      case 'R':
        // Reset camera position
        resetCamera();
        break;
      case '1':
      case '2':
      case '3':
        // Quick theme switching
        setTheme(parseInt(event.key));
        break;
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

## 📱 Responsive Design

### 🖥️ Desktop Optimizations

```typescript
// Enhanced desktop features
const isDesktop = useMediaQuery('(min-width: 1024px)');

{isDesktop && (
  <>
    {/* Desktop-only features */}
    <AdvancedParticleSystem />
    <DetailedOrbitControls />
    <HighQualityRendering />
  </>
)}
```

### 📱 Mobile Optimizations

```typescript
// Simplified mobile experience  
const isMobile = useMediaQuery('(max-width: 768px)');

const mobileConfig = {
  particleCount: isMobile ? 20 : 50,
  renderQuality: isMobile ? 'low' : 'high',
  maxRepositories: isMobile ? 15 : 50
};
```

## 🚀 Performance Tuning

### ⚡ 3D Optimization

```typescript
// LOD (Level of Detail) system
const useLOD = (distance: number) => {
  return useMemo(() => {
    if (distance > 20) return 'low';
    if (distance > 10) return 'medium'; 
    return 'high';
  }, [distance]);
};

// Conditional rendering
{distance < 15 && <DetailedPlanetSurface />}
{distance < 8 && <OrbitingMoons />}
```

### 📊 Memory Management

```typescript
// Cleanup 3D resources
useEffect(() => {
  return () => {
    // Dispose of geometries
    geometry.dispose();
    material.dispose();
    texture?.dispose();
  };
}, []);
```

## 🎨 Advanced Customization

### 🌌 Custom 3D Models

Replace sphere planets with custom models:

```typescript
import { useGLTF } from '@react-three/drei';

function CustomPlanet({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  return <primitive object={scene} />;
}
```

### 🎵 Audio Integration

Add ambient space sounds:

```typescript
import { PositionalAudio } from '@react-three/drei';

function AmbientAudio() {
  return (
    <PositionalAudio 
      url="/sounds/space-ambient.mp3"
      distance={10}
      loop
    />
  );
}
```

### 🌟 Shader Effects

Custom GLSL shaders for planets:

```typescript
const planetShader = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color(repository.color) }
  },
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    
    void main() {
      gl_FragColor = vec4(color, 1.0);
    }
  `
};
```

## 💾 Save Custom Configurations

Store user preferences:

```typescript
// Custom theme persistence
const saveCustomTheme = (theme: CustomTheme) => {
  sessionStorage.setItem('galaxy_theme', JSON.stringify(theme));
};

const loadCustomTheme = (): CustomTheme | null => {
  const saved = sessionStorage.getItem('galaxy_theme');
  return saved ? JSON.parse(saved) : null;
};
```

---

**Need more customization help?** Check out the [examples directory](./examples/) or open a [GitHub Discussion](https://github.com/JasonDoug/codegalaxy/discussions)!