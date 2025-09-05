'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Star, GitBranch, Clock, Tag } from 'lucide-react';
import * as THREE from 'three';
import type { Repository } from '@/types/repository';


interface RepositoryDetailProps {
  repository: Repository | null;
  isOpen: boolean;
  onClose: () => void;
}

// 3D File Tree Component
function FileTreeVisualization({ repository }: { repository: Repository }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Mock file structure based on repository language
  const getFileStructure = (language: string) => {
    const structures: { [key: string]: string[] } = {
      'JavaScript': ['src/', 'components/', 'utils/', 'package.json', 'README.md'],
      'TypeScript': ['src/', 'types/', 'components/', 'lib/', 'tsconfig.json'],
      'Python': ['src/', 'tests/', 'requirements.txt', 'setup.py', 'README.md'],
      'Go': ['cmd/', 'pkg/', 'internal/', 'go.mod', 'main.go'],
      'Rust': ['src/', 'tests/', 'Cargo.toml', 'lib.rs', 'main.rs']
    };
    
    return structures[language] || ['src/', 'README.md', 'LICENSE'];
  };

  const files = getFileStructure(repository.language);

  return (
    <group ref={groupRef}>
      {files.map((file, index) => {
        const isFolder = file.endsWith('/');
        const angle = (index / files.length) * Math.PI * 2;
        const radius = 2;
        
        return (
          <group key={file} position={[
            Math.cos(angle) * radius,
            index * 0.3 - files.length * 0.15,
            Math.sin(angle) * radius
          ]}>
            {isFolder ? (
              <Box args={[0.3, 0.3, 0.3]}>
                <meshPhysicalMaterial color="#fbbf24" metalness={0.1} roughness={0.8} />
              </Box>
            ) : (
              <Sphere args={[0.15, 8, 8]}>
                <meshPhysicalMaterial color="#60a5fa" metalness={0.2} roughness={0.6} />
              </Sphere>
            )}
            
            <Html distanceFactor={10}>
              <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {file}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// Repository World Component
function RepositoryWorld({ repository }: { repository: Repository }) {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color={repository.color} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ffffff" />
      
      {/* Ground plane representing the repository base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial 
          color={repository.color} 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* File tree visualization */}
      <FileTreeVisualization repository={repository} />
      
      {/* Repository name in 3D */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {repository.name}
      </Text>
      
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}

export function RepositoryDetail({ repository, isOpen, onClose }: RepositoryDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'world' | 'stats'>('overview');

  if (!repository) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-slate-900/95 backdrop-blur-md border border-gray-700 rounded-2xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: repository.color }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{repository.name}</h2>
                  <p className="text-gray-400">{repository.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Github size={20} className="text-white" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              {[
                { id: 'overview' as const, label: 'Overview' },
                { id: 'world' as const, label: '3D World' },
                { id: 'stats' as const, label: 'Analytics' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-auto">
              {activeTab === 'overview' && (
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Repository Details</h3>
                        <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Star size={16} className="text-yellow-400" />
                            <span className="text-gray-300">{repository.stars.toLocaleString()} stars</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GitBranch size={16} className="text-green-400" />
                            <span className="text-gray-300">{repository.commits} commits</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-400" />
                            <span className="text-gray-300">Last active: {repository.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      
                      {repository.topics && repository.topics.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Topics</h3>
                          <div className="flex flex-wrap gap-2">
                            {repository.topics.map((topic) => (
                              <span
                                key={topic}
                                className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                              >
                                <Tag size={12} className="inline mr-1" />
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Stats Sidebar */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{repository.language}</div>
                        <div className="text-sm text-gray-400">Primary Language</div>
                      </div>
                      
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-white">{(repository.size / 1024).toFixed(1)}MB</div>
                        <div className="text-sm text-gray-400">Repository Size</div>
                      </div>
                      
                      {repository.url && (
                        <a
                          href={repository.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white font-medium"
                        >
                          <ExternalLink size={16} />
                          View on GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'world' && (
                <div className="h-full">
                  <RepositoryWorld repository={repository} />
                </div>
              )}
              
              {activeTab === 'stats' && (
                <div className="p-6">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
                    <p>Detailed repository analytics and insights coming soon...</p>
                    <p className="text-sm mt-2">This will include commit patterns, contributor graphs, and code complexity analysis.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}