/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Optimize images from external domains (GitHub avatars)
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable experimental features for better performance
  experimental: {
    // App directory is stable in Next.js 15
    appDir: true,
    // Enable static exports for deployment flexibility
    output: 'standalone',
  },
  
  // Environment variables that should be available at build time
  env: {
    CUSTOM_KEY: 'codegalaxy',
  },
  
  // Headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Performance headers  
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // API routes caching
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for bundle optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle splits
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Separate Three.js into its own chunk
          threejs: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'threejs',
            chunks: 'all',
            priority: 30,
          },
          // Separate large UI libraries  
          ui: {
            test: /[\\/]node_modules[\\/](framer-motion|lucide-react)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 20,
          },
        },
      },
    };
    
    // Alias for cleaner imports (optional)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    
    return config;
  },
  
  // TypeScript configuration
  typescript: {
    // Skip type checking during production builds (handled by CI/CD)
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  
  // ESLint configuration
  eslint: {
    // Skip linting during production builds (handled by CI/CD)  
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  
  // Enable compression
  compress: true,
  
  // Generate source maps in development
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  
  // Custom redirects for better SEO
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/JasonDoug/codegalaxy',
        permanent: true,
      },
    ];
  },
  
  // Trailing slash configuration
  trailingSlash: false,
  
  // Power source for analytics
  poweredByHeader: false,
};

module.exports = nextConfig;