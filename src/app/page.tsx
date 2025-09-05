'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { CodeGalaxy } from '@/components/CodeGalaxy';
import { DeveloperHUD } from '@/components/DeveloperHUD';
import { NavigationSphere } from '@/components/NavigationSphere';
import { RepositoryDetail } from '@/components/RepositoryDetail';
import { SystemConfig } from '@/components/SystemConfig';
import { GitHubProfile } from '@/components/GitHubProfile';
import { useGitHubData } from '@/hooks/useGitHubData';
import { useState, useEffect } from 'react';
import type { Repository } from '@/types/repository';

export default function Home() {
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const [isSystemConfigOpen, setIsSystemConfigOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const { userProfile, userStats } = useGitHubData();
  
  // Keyboard shortcut for immersion mode (F key)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'f' || event.key === 'F') {
        setIsImmersiveMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 overflow-hidden relative">
      {/* Background ambient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      {/* Main 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#a855f7" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
          
          {/* Background stars */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0.8} 
            fade 
            speed={1}
          />
          
          {/* Main portfolio galaxy */}
          <CodeGalaxy 
            onRepositorySelect={setSelectedRepository} 
            onDeveloperCoreClick={() => setIsProfileOpen(true)}
          />
          
          {/* Navigation controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay - Hidden in immersion mode */}
      <AnimatePresence>
        {!isImmersiveMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Developer HUD */}
            <DeveloperHUD />
            
            {/* Welcome message */}
            <div className="absolute top-8 left-8 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-black/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 max-w-md"
              >
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome to the
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {" "}Code Galaxy
                  </span>
                </h1>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Navigate through an immersive 3D space where each repository exists as a living world. 
                  Click and explore to discover the architecture of innovation.
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  Scroll to zoom • Drag to orbit • Click for stats • Double-click for details • ESC to clear all • F for immersion
                </div>
              </motion.div>
            </div>
            
            {/* Navigation sphere indicator */}
            <NavigationSphere onSystemConfigOpen={() => setIsSystemConfigOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Loading overlay - Hidden in immersion mode */}
      {!isImmersiveMode && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute inset-0 bg-slate-950 flex items-center justify-center pointer-events-none z-50"
        >
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Initializing Code Galaxy...</p>
          </div>
        </motion.div>
      )}

      {/* Immersion Mode Indicator */}
      <AnimatePresence>
        {isImmersiveMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-40"
          >
            <div className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-1">
              <div className="flex items-center gap-2 text-purple-300 text-xs">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                <span>IMMERSION MODE • Press F to exit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Repository Detail Modal */}
      <RepositoryDetail
        repository={selectedRepository}
        isOpen={!!selectedRepository}
        onClose={() => setSelectedRepository(null)}
      />
      
      {/* System Configuration Modal */}
      <SystemConfig
        isOpen={isSystemConfigOpen}
        onClose={() => setIsSystemConfigOpen(false)}
      />
      
      {/* GitHub Profile Modal */}
      <GitHubProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        userStats={userStats ? {
          totalStars: userStats.totalStars,
          totalForks: userStats.totalForks
        } : null}
      />
    </div>
  );
}