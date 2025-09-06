# 🤝 Contributing to Code Galaxy

Thank you for your interest in contributing to Code Galaxy! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/codegalaxy.git
   cd codegalaxy
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Set up** your environment:
   ```bash
   cp .env.local.example .env.local
   # Fill in your GitHub credentials
   ```
5. **Start** development:
   ```bash
   npm run dev
   ```

## 🎯 Ways to Contribute

### 🐛 Bug Reports
- Use the [GitHub issue tracker](https://github.com/JasonDoug/codegalaxy/issues)
- Check existing issues before creating new ones
- Include reproduction steps and environment details
- Add screenshots/videos for visual issues

### ✨ Feature Requests
- Open an issue with the `enhancement` label
- Describe the use case and expected behavior
- Include mockups or examples when relevant

### 🛠️ Code Contributions
- Fix bugs, implement features, improve documentation
- Follow the coding standards below
- Add tests when applicable
- Update documentation as needed

### 📖 Documentation
- Fix typos, improve clarity, add examples
- Update setup guides and API documentation
- Create tutorials and guides

## 🏗️ Development Guidelines

### 📁 Project Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components  
│   └── *.tsx           # Feature components
├── lib/                # Utilities and services
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
└── styles/             # CSS and styling
```

### 🎨 Code Style

**TypeScript:**
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible

**React:**
- Use functional components with hooks
- Follow React best practices
- Use proper dependency arrays in `useEffect`

**3D/Three.js:**
- Optimize geometry and materials
- Use `useMemo` for expensive calculations  
- Clean up resources in `useEffect` cleanup

**Styling:**
- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography

### 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production (test build)
npm run build

# Test with different screen sizes
# Use browser dev tools responsive mode
```

### 🎛️ Pull Request Guidelines

1. **Branch naming:**
   - `feature/description` for new features
   - `fix/description` for bug fixes
   - `docs/description` for documentation

2. **Commits:**
   - Use conventional commits: `feat:`, `fix:`, `docs:`, etc.
   - Keep commits focused and atomic
   - Write clear commit messages

3. **PR Description:**
   - Explain what changes were made and why
   - Include screenshots/videos for UI changes
   - Reference related issues: `Fixes #123`

4. **Before submitting:**
   - Test your changes thoroughly
   - Run `npm run lint` and fix any issues
   - Ensure `npm run build` succeeds
   - Update documentation if needed

## 🌟 Feature Development

### 🪐 Adding New 3D Elements
- Keep performance in mind (mobile devices)
- Use instancing for repeated geometries
- Implement proper cleanup in `useEffect`

### 🎨 UI Components
- Follow existing design patterns
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on different screen sizes
- Use semantic HTML elements

### 🔌 API Integrations
- Handle loading and error states
- Implement proper caching
- Follow GitHub API rate limits
- Provide fallback data

### 📱 Responsive Design
- Test on mobile, tablet, and desktop
- Consider touch interactions
- Optimize 3D performance for mobile
- Provide simplified mobile interfaces when needed

## 🚀 Performance Guidelines

### ⚡ 3D Optimization
- Use `useMemo` for expensive calculations
- Implement LOD (Level of Detail) when possible
- Limit particle counts on mobile
- Use efficient geometries and materials

### 📦 Bundle Size
- Avoid large dependencies
- Use dynamic imports for heavy features
- Monitor bundle size with `npm run build`

### 🏃 Runtime Performance  
- Optimize React re-renders
- Use proper dependency arrays
- Implement virtualization for large lists
- Profile with React DevTools

## 🐛 Debugging

### 🔍 Common Issues
- **3D not rendering**: Check WebGL support and console errors
- **GitHub API errors**: Verify token scopes and rate limits
- **Mobile performance**: Reduce particle counts and geometry complexity

### 🛠️ Debug Tools
- React DevTools for component inspection
- Chrome DevTools for performance profiling
- Console logging with `?debug=true` URL parameter

## 📋 Release Process

### 🏷️ Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Breaking changes increment MAJOR
- New features increment MINOR  
- Bug fixes increment PATCH

### 🚀 Release Checklist
1. Update version in `package.json`
2. Update `CHANGELOG.md` with new features/fixes
3. Test deployment thoroughly
4. Create GitHub release with notes
5. Update documentation if needed

## 🎨 Design Guidelines

### 🌌 Visual Theme
- Space/galaxy theme with purple/blue gradients
- Clean, modern interface design
- Consistent spacing using Tailwind scale
- Accessible color contrast ratios

### 🎭 Animations
- Use Framer Motion for UI animations
- Keep animations smooth (60fps)
- Provide reduced motion alternatives
- Use easing curves for natural feel

### 📱 Mobile Experience
- Touch-friendly controls (minimum 44px targets)
- Simplified 3D interactions
- Readable text sizes
- Optimized performance

## 🤗 Community

### 💬 Communication
- [GitHub Discussions](https://github.com/JasonDoug/codegalaxy/discussions) for general questions
- [GitHub Issues](https://github.com/JasonDoug/codegalaxy/issues) for bugs and features
- Be respectful and constructive
- Help others when you can

### 🌟 Recognition
- Contributors are listed in `package.json` and releases
- Significant contributions receive special recognition
- All contributions are valued, big or small

## 📜 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment
- Report inappropriate behavior

## ❓ Questions?

- Check [GitHub Discussions](https://github.com/JasonDoug/codegalaxy/discussions)
- Read the [README](./README.md) and [documentation](./docs/)
- Open an issue if you're stuck

---

**Thank you for contributing to Code Galaxy! 🌌**

Every contribution helps make this project better for the entire developer community.