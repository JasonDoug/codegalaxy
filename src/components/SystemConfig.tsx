'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, User, Eye, EyeOff, Check, AlertCircle, ExternalLink } from 'lucide-react';

interface SystemConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SystemConfig({ isOpen, onClose }: SystemConfigProps) {
  const [githubToken, setGithubToken] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load current values from localStorage and environment
  useEffect(() => {
    if (isOpen) {
      const savedToken = localStorage.getItem('github_token') || '';
      const savedUsername = localStorage.getItem('github_username') || 
                           process.env.NEXT_PUBLIC_GITHUB_USERNAME || '';
      
      setGithubToken(savedToken);
      setGithubUsername(savedUsername);
      setHasUnsavedChanges(false);
    }
  }, [isOpen]);

  const handleTokenChange = (value: string) => {
    setGithubToken(value);
    setHasUnsavedChanges(true);
    setConnectionStatus('idle');
  };

  const handleUsernameChange = (value: string) => {
    setGithubUsername(value);
    setHasUnsavedChanges(true);
    setConnectionStatus('idle');
  };

  const testConnection = async () => {
    if (!githubToken || !githubUsername) return;
    
    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const saveConfiguration = () => {
    localStorage.setItem('github_token', githubToken);
    localStorage.setItem('github_username', githubUsername);
    setHasUnsavedChanges(false);
    
    // Trigger a page reload to apply the new configuration
    window.location.reload();
  };

  const clearConfiguration = () => {
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_username');
    setGithubToken('');
    setGithubUsername('');
    setHasUnsavedChanges(true);
    setConnectionStatus('idle');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 max-w-md w-full mx-4 relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Github size={18} className="text-white" />
                </div>
                System Config
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Configuration Form */}
            <div className="space-y-4">
              {/* GitHub Username */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Username
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="your-github-username"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* GitHub Token */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Personal Access Token
                </label>
                <div className="relative">
                  <Github size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={githubToken}
                    onChange={(e) => handleTokenChange(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Help Text */}
              <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-3">
                <p className="text-sm text-blue-300 mb-2">
                  Need a GitHub token? Create one with &apos;public_repo&apos; permissions:
                </p>
                <a
                  href="https://github.com/settings/tokens/new?description=Portfolio%20App&scopes=public_repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Create Token <ExternalLink size={12} />
                </a>
              </div>

              {/* Test Connection */}
              <div className="flex items-center gap-2">
                <button
                  onClick={testConnection}
                  disabled={!githubToken || !githubUsername || isTestingConnection}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 disabled:from-gray-700 disabled:to-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isTestingConnection ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Testing...
                    </>
                  ) : (
                    'Test Connection'
                  )}
                </button>

                {connectionStatus === 'success' && (
                  <div className="flex items-center text-green-400">
                    <Check size={20} />
                  </div>
                )}

                {connectionStatus === 'error' && (
                  <div className="flex items-center text-red-400">
                    <AlertCircle size={20} />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={saveConfiguration}
                  disabled={!hasUnsavedChanges}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-700 disabled:to-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                  Save & Apply
                </button>
                <button
                  onClick={clearConfiguration}
                  className="px-4 py-2 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {connectionStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-green-950/30 border border-green-500/30 rounded-lg p-3"
                >
                  <p className="text-sm text-green-300">
                    ✅ Connection successful! Your GitHub data will be loaded.
                  </p>
                </motion.div>
              )}
              
              {connectionStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 bg-red-950/30 border border-red-500/30 rounded-lg p-3"
                >
                  <p className="text-sm text-red-300">
                    ❌ Connection failed. Please check your token and username.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}