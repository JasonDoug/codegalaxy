import type { Repository } from '@/types/repository';

// Mock repository data for demo when GitHub is not connected
export const mockRepositories: Repository[] = [
  {
    id: 1,
    name: 'neural-network-visualizer',
    language: 'JavaScript',
    stars: 247,
    size: 15680,
    description: 'Interactive 3D neural network visualization tool',
    position: [0, 0, 0],
    color: '#f7df1e',
    commits: 89,
    lastActive: '2 days ago',
    topics: ['machine-learning', '3d', 'visualization'],
    url: 'https://github.com/demo/neural-network-visualizer'
  },
  {
    id: 2,
    name: 'quantum-chess',
    language: 'Python',
    stars: 1240,
    size: 8950,
    description: 'Chess with quantum mechanics principles',
    position: [5, 2, -3],
    color: '#3776ab',
    commits: 156,
    lastActive: '1 week ago',
    topics: ['quantum-computing', 'chess', 'python'],
    url: 'https://github.com/demo/quantum-chess'
  },
  {
    id: 3,
    name: 'blockchain-explorer',
    language: 'TypeScript',
    stars: 892,
    size: 23400,
    description: 'Advanced blockchain transaction explorer',
    position: [-4, -1, 2],
    color: '#3178c6',
    commits: 203,
    lastActive: '3 days ago',
    topics: ['blockchain', 'web3', 'explorer'],
    url: 'https://github.com/demo/blockchain-explorer'
  },
  {
    id: 4,
    name: 'ai-music-composer',
    language: 'Python',
    stars: 567,
    size: 12800,
    description: 'AI-powered music composition engine',
    position: [2, -3, 4],
    color: '#3776ab',
    commits: 134,
    lastActive: '5 days ago',
    topics: ['ai', 'music', 'composition'],
    url: 'https://github.com/demo/ai-music-composer'
  },
  {
    id: 5,
    name: 'react-3d-portfolio',
    language: 'TypeScript',
    stars: 423,
    size: 18900,
    description: 'This revolutionary 3D portfolio you are experiencing',
    position: [-3, 3, -2],
    color: '#3178c6',
    commits: 67,
    lastActive: 'now',
    topics: ['react', '3d', 'portfolio'],
    url: 'https://github.com/demo/react-3d-portfolio'
  },
  {
    id: 6,
    name: 'microservice-orchestrator',
    language: 'Go',
    stars: 334,
    size: 9800,
    description: 'Lightweight microservice orchestration platform',
    position: [4, -2, -1],
    color: '#00add8',
    commits: 98,
    lastActive: '1 week ago',
    topics: ['microservices', 'orchestration', 'go'],
    url: 'https://github.com/demo/microservice-orchestrator'
  }
];

export const mockUserStats = {
  totalRepos: 42,
  totalStars: 3247,
  totalForks: 891,
  languages: {
    'TypeScript': 25400,
    'JavaScript': 18900,
    'Python': 15200,
    'Go': 9800,
    'Rust': 4200
  }
};