'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code, Star, GitBranch, Activity, ExternalLink } from 'lucide-react';
import { useGitHubData } from '@/hooks/useGitHubData';
import { LANGUAGE_COLORS } from '@/lib/github';
import { mockUserStats } from '@/lib/mockData';

interface DeveloperStats {
  totalRepos: number;
  totalStars: number;
  totalCommits: number;
  activeProjects: number;
  languages: { name: string; percentage: number; color: string }[];
}

// Mock developer stats - in real implementation, fetch from GitHub API
const mockStats: DeveloperStats = {
  totalRepos: 42,
  totalStars: 3247,
  totalCommits: 1456,
  activeProjects: 8,
  languages: [
    { name: 'TypeScript', percentage: 35, color: '#3178c6' },
    { name: 'JavaScript', percentage: 28, color: '#f7df1e' },
    { name: 'Python', percentage: 20, color: '#3776ab' },
    { name: 'Go', percentage: 12, color: '#00add8' },
    { name: 'Rust', percentage: 5, color: '#ce422b' }
  ]
};

export function DeveloperHUD() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [codeActivity, setCodeActivity] = useState(0);
  const { repositories, userStats, isLoading, isConnected } = useGitHubData();

  useEffect(() => {
    // Set initial time on client
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Calculate activity based on recent repositories
      const recentRepos = repositories.filter(repo => 
        repo.lastActive.includes('day') || repo.lastActive === 'today' || repo.lastActive === 'yesterday'
      );
      const activityScore = Math.min(100, (recentRepos.length / repositories.length) * 100 + 20);
      setCodeActivity(activityScore);
    }, 2000); // Update every 2 seconds instead of 1

    return () => clearInterval(timer);
  }, [repositories]);

  // Use mock data when not connected, real data when connected
  const stats: DeveloperStats = isConnected && userStats ? {
    totalRepos: userStats.totalRepos,
    totalStars: userStats.totalStars,
    totalCommits: repositories.reduce((sum, repo) => sum + repo.commits, 0),
    activeProjects: repositories.filter(repo => repo.lastActive.includes('day') || repo.lastActive === 'today').length,
    languages: Object.entries(userStats.languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, size], index, arr) => {
        const totalSize = arr.reduce((sum, [,s]) => sum + s, 0);
        return {
          name,
          percentage: Math.round((size / totalSize) * 100),
          color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.default
        };
      })
  } : {
    totalRepos: mockStats.totalRepos,
    totalStars: mockStats.totalStars,
    totalCommits: mockStats.totalCommits,
    activeProjects: mockStats.activeProjects,
    languages: Object.entries(mockUserStats.languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, size], index, arr) => {
        const totalSize = arr.reduce((sum, [,s]) => sum + s, 0);
        return {
          name,
          percentage: Math.round((size / totalSize) * 100),
          color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.default
        };
      })
  };

  return (
    <>
      {/* Main HUD Panel - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute top-8 right-8 pointer-events-auto"
      >
        <div className="bg-black/30 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 min-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-mono">SYSTEM ACTIVE</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Activity size={16} />
            </button>
          </div>
          
          {/* Core Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Github size={14} className="text-purple-400" />
                <span className="text-xs text-gray-400">REPOS</span>
              </div>
              <div className="text-xl font-bold text-white">{stats.totalRepos}</div>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Star size={14} className="text-yellow-400" />
                <span className="text-xs text-gray-400">STARS</span>
              </div>
              <div className="text-xl font-bold text-white">{stats.totalStars.toLocaleString()}</div>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch size={14} className="text-green-400" />
                <span className="text-xs text-gray-400">COMMITS</span>
              </div>
              <div className="text-xl font-bold text-white">{stats.totalCommits.toLocaleString()}</div>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Code size={14} className="text-cyan-400" />
                <span className="text-xs text-gray-400">ACTIVE</span>
              </div>
              <div className="text-xl font-bold text-white">{stats.activeProjects}</div>
            </div>
          </div>
          
          {/* Code Activity Monitor */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-mono">CODE ACTIVITY</span>
              <span className="text-xs text-cyan-400">{Math.round(codeActivity)}%</span>
            </div>
            <div className="bg-slate-900/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                style={{ width: `${codeActivity}%` }}
                animate={{ width: `${codeActivity}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Language Distribution */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-700 pt-4"
              >
                <div className="mb-3">
                  <span className="text-xs text-gray-400 font-mono">LANGUAGE DISTRIBUTION</span>
                </div>
                
                {stats.languages.map((lang, index) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between mb-2 last:mb-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-sm text-white">{lang.name}</span>
                    </div>
                    <span className="text-sm text-gray-400">{lang.percentage}%</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Time Display - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-8 pointer-events-auto"
      >
        <div className="bg-black/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-4">
          <div className="text-2xl font-mono text-white mb-1">
            {currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
          </div>
          <div className="text-sm text-blue-300">
            {currentTime ? currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Loading...'}
          </div>
        </div>
      </motion.div>
      
      {/* Social Links - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 right-8 pointer-events-auto"
      >
        <div className="flex gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 backdrop-blur-md border border-gray-500/30 rounded-full p-3 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300"
          >
            <Github size={20} className="text-white" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/30 backdrop-blur-md border border-gray-500/30 rounded-full p-3 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
          >
            <ExternalLink size={20} className="text-white" />
          </a>
        </div>
      </motion.div>
      
      {/* Navigation Hint - Center Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <div className="bg-black/20 backdrop-blur-md border border-emerald-500/30 rounded-full px-6 py-2">
          <div className="flex items-center gap-2 text-emerald-300 text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
            <span>Click any planet to explore its world</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}