'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sphere, Ring } from '@react-three/drei';
import { Vector3, Group, Color } from 'three';
import * as THREE from 'three';
import type { Repository } from '@/types/repository';

// Mock repository data - in a real implementation, this would come from GitHub API
const mockRepositories: Repository[] = [
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
    lastActive: '2 days ago'
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
    lastActive: '1 week ago'
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
    lastActive: '3 days ago'
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
    lastActive: '5 days ago'
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
    lastActive: 'now'
  }
];


interface RepositoryPlanetProps {
  repository: Repository;
  onClick: (repo: Repository) => void;
  isSelected: boolean;
}

function RepositoryPlanet({ repository, onClick, isSelected }: RepositoryPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calculate planet size based on repository metrics
  const planetSize = useMemo(() => {
    const baseSize = Math.max(0.5, Math.min(2, repository.stars / 200 + repository.size / 10000));
    return baseSize;
  }, [repository.stars, repository.size]);
  
  // Create orbital ring parameters based on activity
  const ringRadius = planetSize + 0.3;
  const ringCount = Math.min(3, Math.floor(repository.commits / 50));
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
      
      // Breathing effect for selected repository
      if (isSelected) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else if (hovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });
  
  const languageColor = new Color(repository.color);
  
  return (
    <group 
      ref={groupRef}
      position={repository.position as [number, number, number]}
    >
      <Float
        speed={hovered ? 3 : 1}
        rotationIntensity={hovered ? 2 : 0.5}
        floatIntensity={hovered ? 2 : 0.8}
      >
        {/* Main planet sphere */}
        <Sphere
          ref={meshRef}
          args={[planetSize, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick(repository)}
        >
          <meshPhysicalMaterial
            color={languageColor}
            roughness={0.3}
            metalness={0.1}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            emissive={languageColor}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </Sphere>
        
        {/* Orbital rings representing activity */}
        {Array.from({ length: ringCount }, (_, i) => (
          <Ring
            key={i}
            args={[ringRadius + i * 0.2, ringRadius + i * 0.2 + 0.02, 64]}
            rotation={[Math.PI / 2, 0, i * Math.PI / 3]}
          >
            <meshBasicMaterial
              color={languageColor}
              transparent
              opacity={0.4 - i * 0.1}
            />
          </Ring>
        ))}
        
        {/* Repository name floating above */}
        {(hovered || isSelected) && (
          <Text
            position={[0, planetSize + 1, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter.woff"
          >
            {repository.name}
          </Text>
        )}
        
        {/* Stats display when selected */}
        {isSelected && (
          <>
            <Text
              position={[0, planetSize + 1.5, 0]}
              fontSize={0.15}
              color="#a855f7"
              anchorX="center"
              anchorY="middle"
            >
              {repository.stars} stars • {repository.commits} commits
            </Text>
            <Text
              position={[0, planetSize + 1.8, 0]}
              fontSize={0.12}
              color="#94a3b8"
              anchorX="center"
              anchorY="middle"
            >
              {repository.language} • Last active: {repository.lastActive}
            </Text>
          </>
        )}
      </Float>
      
      {/* Connection lines to other repositories (gravitational relationships) */}
      {hovered && (
        mockRepositories
          .filter(repo => repo.id !== repository.id && repo.language === repository.language)
          .slice(0, 2)
          .map(connectedRepo => {
            const start = new Vector3(...repository.position as [number, number, number]);
            const end = new Vector3(...connectedRepo.position as [number, number, number]);
            // const distance = start.distanceTo(end);
            // const midPoint = start.clone().add(end).divideScalar(2);
            
            const points = [start, end];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            
            return (
              <primitive key={connectedRepo.id} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ 
                color: repository.color, 
                transparent: true, 
                opacity: 0.3 
              }))} />
            );
          })
      )}
    </group>
  );
}

interface CodeGalaxyProps {
  onRepositorySelect?: (repository: Repository | null) => void;
}

export function CodeGalaxy({ onRepositorySelect }: CodeGalaxyProps) {
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const galaxyRef = useRef<Group>(null);
  
  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001;
    }
  });
  
  const handleRepositoryClick = (repository: Repository) => {
    const newSelection = repository.id === selectedRepository?.id ? null : repository;
    setSelectedRepository(newSelection);
    onRepositorySelect?.(newSelection);
  };
  
  return (
    <group ref={galaxyRef}>
      {/* Central core representing the developer */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            roughness={0}
            metalness={1}
          />
        </Sphere>
        
        {/* Developer name/brand */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter.woff"
        >
          DEVELOPER CORE
        </Text>
      </Float>
      
      {/* Repository planets */}
      {mockRepositories.map(repository => (
        <RepositoryPlanet
          key={repository.id}
          repository={repository}
          onClick={handleRepositoryClick}
          isSelected={selectedRepository?.id === repository.id}
        />
      ))}
      
      {/* Nebula effect for atmosphere */}
      <Float speed={0.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Sphere args={[20, 16, 16]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#1e1b4b"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      </Float>
      
      {/* Ambient particles */}
      {Array.from({ length: 50 }, (_, i) => {
        const position = [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        ] as [number, number, number];
        
        return (
          <Float key={i} speed={Math.random() * 2 + 0.5}>
            <Sphere args={[0.02, 8, 8]} position={position}>
              <meshBasicMaterial
                color="#8b5cf6"
                transparent
                opacity={0.6}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
}