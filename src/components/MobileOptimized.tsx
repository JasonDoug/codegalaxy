'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, Code, Calendar } from 'lucide-react';
import type { Repository } from '@/types/repository';

// Mobile-optimized repository card
interface RepositoryCardProps {
  repository: Repository;
  onClick: () => void;
}

function RepositoryCard({ repository, onClick }: RepositoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-slate-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: repository.color }}
          />
          <h3 className="font-semibold text-white truncate">{repository.name}</h3>
        </div>
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <Star size={12} />
          <span>{repository.stars}</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
        {repository.description || 'No description available'}
      </p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Code size={12} />
          <span>{repository.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{repository.lastActive}</span>
        </div>
      </div>
    </motion.div>
  );
}


interface MobileOptimizedProps {
  repositories: Repository[];
  onRepositorySelect: (repo: Repository) => void;
}

export function MobileOptimized({ repositories, onRepositorySelect }: MobileOptimizedProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="md:hidden h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 p-4 overflow-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 pt-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Code
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {" "}Portfolio
          </span>
        </h1>
        <p className="text-gray-400">Exploring repositories in style</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-purple-400">{repositories.length}</div>
          <div className="text-xs text-gray-400">Repos</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-yellow-400">
            {repositories.reduce((sum, repo) => sum + repo.stars, 0)}
          </div>
          <div className="text-xs text-gray-400">Stars</div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-green-400">
            {new Set(repositories.map(repo => repo.language)).size}
          </div>
          <div className="text-xs text-gray-400">Languages</div>
        </div>
      </motion.div>

      {/* Repository Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Featured Projects</h2>
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RepositoryCard
              repository={repo}
              onClick={() => onRepositorySelect(repo)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* GitHub Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-8 pb-8"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
        >
          <Github size={20} />
          View on GitHub
        </a>
      </motion.div>
    </div>
  );
}