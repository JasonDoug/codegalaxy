'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sphere, Ring } from '@react-three/drei';
import { Vector3, Group, Color } from 'three';
import * as THREE from 'three';
import { useGitHubData } from '@/hooks/useGitHubData';
import { mockRepositories } from '@/lib/mockData';
import type { Repository } from '@/types/repository';


interface RepositoryPlanetProps {
  repository: Repository;
  onClick: (repo: Repository) => void;
  isSelected: boolean;
  allRepositories: Repository[];
  clearAllStatsTrigger: number;
}

function RepositoryPlanet({ repository, onClick, isSelected, allRepositories, clearAllStatsTrigger }: RepositoryPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [showFloatingStats, setShowFloatingStats] = useState(false);

  // Clear floating stats when global clear is triggered
  useEffect(() => {
    if (clearAllStatsTrigger > 0) {
      setShowFloatingStats(false);
    }
  }, [clearAllStatsTrigger]);
  
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

  // Handle single click (floating stats) vs double click (modal)
  const handleSingleClick = () => {
    setShowFloatingStats(!showFloatingStats);
  };

  const handleDoubleClick = () => {
    onClick(repository);
  };
  
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
          onClick={handleSingleClick}
          onDoubleClick={handleDoubleClick}
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
            rotation={[Math.PI / 4, i * Math.PI / 6, i * Math.PI / 3]}
          >
            <meshBasicMaterial
              color={languageColor}
              transparent
              opacity={0.4 - i * 0.1}
            />
          </Ring>
        ))}
        
        {/* Repository name when hovered (only if not showing floating stats) */}
        {hovered && !showFloatingStats && (
          <Text
            position={[0, planetSize + 1, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {repository.name}
          </Text>
        )}
        
        {/* Floating stats when clicked (single-click) */}
        {showFloatingStats && (
          <>
            <Text
              position={[0, planetSize + 1, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {repository.name}
            </Text>
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
      
    </group>
  );
}

interface CodeGalaxyProps {
  onRepositorySelect?: (repository: Repository | null) => void;
  onDeveloperCoreClick?: () => void;
}

export function CodeGalaxy({ onRepositorySelect, onDeveloperCoreClick }: CodeGalaxyProps) {
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const [clearAllStats, setClearAllStats] = useState(0); // Trigger to clear all floating stats
  const galaxyRef = useRef<Group>(null);
  const { repositories, isLoading, error, userStats, isConnected } = useGitHubData();
  
  // Use mock data when not connected, real data when connected
  const displayRepositories = isConnected ? repositories : mockRepositories;
  
  // Debug logging
  console.log('CodeGalaxy render:', { 
    repositoriesCount: displayRepositories.length, 
    isLoading, 
    error, 
    isConnected,
    usingMockData: !isConnected 
  });

  // Keyboard shortcut to clear all floating stats (Escape key)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setClearAllStats(prev => prev + 1); // Increment to trigger clear
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
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

  // Show loading state or error if needed
  if (isLoading) {
    return (
      <group ref={galaxyRef}>
        <Float speed={1} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[0.5, 16, 16]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.8}
              roughness={0}
              metalness={1}
            />
          </Sphere>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Loading Galaxy...
          </Text>
        </Float>
      </group>
    );
  }

  if (error) {
    return (
      <group ref={galaxyRef}>
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#ef4444"
              emissive="#ef4444"
              emissiveIntensity={0.3}
              roughness={0.5}
              metalness={0.5}
            />
          </Sphere>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.2}
            color="#ef4444"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            {error}
          </Text>
          <Text
            position={[0, -1.8, 0]}
            fontSize={0.15}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            Check System Config
          </Text>
        </Float>
      </group>
    );
  }
  
  return (
    <group ref={galaxyRef}>
      {/* Central core representing the developer */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere 
          args={[0.3, 16, 16]} 
          position={[0, 0, 0]}
          onClick={onDeveloperCoreClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
        >
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
        >
          DEVELOPER CORE
        </Text>
      </Float>
      
      {/* Repository planets */}
      {displayRepositories.map(repository => (
        <RepositoryPlanet
          key={repository.id}
          repository={repository}
          onClick={handleRepositoryClick}
          isSelected={selectedRepository?.id === repository.id}
          allRepositories={displayRepositories}
          clearAllStatsTrigger={clearAllStats}
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
      {useMemo(() =>
        Array.from({ length: 50 }, (_, i) => {
          const position = [
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
          ] as [number, number, number];
          const speed = Math.random() * 2 + 0.5;
          
          return (
            <Float key={i} speed={speed}>
              <Sphere args={[0.02, 8, 8]} position={position}>
                <meshBasicMaterial
                  color="#8b5cf6"
                  transparent
                  opacity={0.6}
                />
              </Sphere>
            </Float>
          );
        }), []
      )}
    </group>
  );
}