'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, MapPin, Building, Link, Users, Star, GitBranch } from 'lucide-react';

interface GitHubProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    login: string;
    name: string;
    bio: string;
    avatar_url: string;
    html_url: string;
    location?: string;
    company?: string;
    blog?: string;
    followers: number;
    following: number;
    public_repos: number;
  } | null;
  userStats?: {
    totalStars: number;
    totalForks: number;
  } | null;
}

export function GitHubProfile({ isOpen, onClose, profile, userStats }: GitHubProfileProps) {
  if (!profile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 max-w-lg w-full mx-4 relative overflow-hidden"
          >
            {/* Gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-6 relative">
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                src={profile.avatar_url}
                alt={profile.name || profile.login}
                className="w-20 h-20 rounded-full border-2 border-purple-500/30"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {profile.name || profile.login}
                </h2>
                <p className="text-gray-400 text-sm mb-2">@{profile.login}</p>
                {profile.bio && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-3 mb-6">
              {profile.location && (
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  {profile.location}
                </div>
              )}
              {profile.company && (
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Building size={16} className="text-gray-400" />
                  {profile.company}
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Link size={16} className="text-gray-400" />
                  <a 
                    href={profile.blog} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-purple-400 transition-colors"
                  >
                    {profile.blog.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users size={16} className="text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">{profile.followers.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <GitBranch size={16} className="text-green-400" />
                </div>
                <div className="text-xl font-bold text-white">{profile.public_repos}</div>
                <div className="text-xs text-gray-400">Repositories</div>
              </div>
              
              {userStats && (
                <>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star size={16} className="text-yellow-400" />
                    </div>
                    <div className="text-xl font-bold text-white">{userStats.totalStars.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Stars</div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-white">{profile.following}</div>
                    <div className="text-xs text-gray-400">Following</div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Visit GitHub Profile
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}