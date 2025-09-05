'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Mail, Settings, Zap } from 'lucide-react';

const navigationItems = [
  { id: 'home', icon: Home, label: 'Galaxy View', color: 'purple' },
  { id: 'about', icon: User, label: 'Developer Core', color: 'blue' },
  { id: 'projects', icon: Code, label: 'Code Worlds', color: 'green' },
  { id: 'skills', icon: Zap, label: 'Tech Stack', color: 'yellow' },
  { id: 'contact', icon: Mail, label: 'Transmission', color: 'pink' },
  { id: 'settings', icon: Settings, label: 'System Config', color: 'cyan' }
];

const colorClasses = {
  purple: 'from-purple-500 to-purple-700 border-purple-400/50',
  blue: 'from-blue-500 to-blue-700 border-blue-400/50',
  green: 'from-green-500 to-green-700 border-green-400/50',
  yellow: 'from-yellow-500 to-yellow-700 border-yellow-400/50',
  pink: 'from-pink-500 to-pink-700 border-pink-400/50',
  cyan: 'from-cyan-500 to-cyan-700 border-cyan-400/50'
};

interface NavigationSphereProps {
  onSystemConfigOpen?: () => void;
}

export function NavigationSphere({ onSystemConfigOpen }: NavigationSphereProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const handleNavigation = (itemId: string) => {
    setActiveItem(itemId);
    setIsExpanded(false); // Close the menu after selection
    
    if (itemId === 'settings' && onSystemConfigOpen) {
      onSystemConfigOpen();
    } else {
      // In a real implementation, this would trigger navigation or view changes
      console.log(`Navigating to: ${itemId}`);
    }
  };

  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-auto">
      {/* Central Navigation Orb */}
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <motion.button
          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-2 border-indigo-400/50 shadow-lg backdrop-blur-md flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isExpanded 
              ? "0 0 30px rgba(99, 102, 241, 0.5)" 
              : "0 0 15px rgba(99, 102, 241, 0.3)"
          }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings size={24} className="text-white" />
          </motion.div>
          
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-indigo-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
        
        {/* Navigation Items */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-20 transform -translate-y-1/2"
            >
              <div className="flex flex-col gap-3">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => handleNavigation(item.id)}
                      className={`
                        relative flex items-center gap-3 px-4 py-3 rounded-full
                        bg-gradient-to-r ${colorClasses[item.color as keyof typeof colorClasses]}
                        border backdrop-blur-md transition-all duration-300 group
                        ${isActive ? 'scale-105 shadow-lg' : 'hover:scale-105'}
                      `}
                      whileHover={{ x: 5 }}
                    >
                      <Icon 
                        size={18} 
                        className={`text-white ${isActive ? 'animate-pulse' : ''}`} 
                      />
                      
                      <span className="text-white text-sm font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      
                      {/* Hover glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorClasses[item.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-20`}
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Navigation hint when collapsed */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute top-1/2 left-20 transform -translate-y-1/2"
            >
              <div className="bg-black/20 backdrop-blur-md border border-gray-500/30 rounded-lg px-3 py-2">
                <span className="text-white text-xs">Hover to navigate</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}