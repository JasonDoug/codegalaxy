'use client';

import { useState, useEffect } from 'react';
import { GitHubAPI } from '@/lib/github';
import type { Repository } from '@/types/repository';

interface UseGitHubDataReturn {
  repositories: Repository[];
  isLoading: boolean;
  error: string | null;
  userStats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    languages: { [key: string]: number };
  } | null;
  userProfile: {
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
  isConnected: boolean;
}

export function useGitHubData(): UseGitHubDataReturn {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UseGitHubDataReturn['userStats']>(null);
  const [userProfile, setUserProfile] = useState<UseGitHubDataReturn['userProfile']>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get credentials from localStorage or environment
        const token = localStorage.getItem('github_token') || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const username = localStorage.getItem('github_username') || process.env.NEXT_PUBLIC_GITHUB_USERNAME;

        console.log('GitHub config:', { hasToken: !!token, username });

        if (!token || !username) {
          // No GitHub connection - set as disconnected and show demo
          setIsConnected(false);
          setIsLoading(false);
          return;
        }

        // Create new API instance with fresh token
        const api = new GitHubAPI(token);

        // Fetch user profile
        const profile = await api.getUser(username);
        setUserProfile(profile);

        // Fetch repositories
        const repos = await api.getUserRepositories(username, {
          sort: 'updated',
          per_page: 50,
          type: 'owner'
        });

        console.log('Fetched repos:', repos.length, repos.map(r => r.name));

        // Transform repositories for 3D visualization
        const transformedRepos = repos.map((repo, index: number) => 
          api.transformRepositoryFor3D(repos, index)
        );

        console.log('Transformed repos:', transformedRepos.length, transformedRepos.map(r => r.name));
        console.log('Repository counts:', {
          'fetched for 3D': repos.length,
          'public repos (profile)': profile.public_repos,
          'note': `Showing ${repos.length} of ${profile.public_repos} public repos in 3D galaxy`
        });

        // Fetch commit counts for first 10 repositories (to avoid API limits)
        const reposWithCommits = await Promise.all(
          transformedRepos.slice(0, 10).map(async (repo, index) => {
            try {
              const commits = await api.getRepositoryCommits(username, repos[index].name, { per_page: 1 });
              // Get total commit count from API (this is a simplified approach)
              const commitResponse = await fetch(`https://api.github.com/repos/${username}/${repos[index].name}/commits?per_page=1`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              const linkHeader = commitResponse.headers.get('link');
              const commitCount = linkHeader ? 
                parseInt(linkHeader.match(/page=(\d+)>; rel="last"/)?.[1] || '0') : 
                commits.length;
              
              return { ...repo, commits: commitCount };
            } catch (err) {
              console.warn(`Failed to fetch commits for ${repo.name}:`, err);
              return { ...repo, commits: Math.floor(repo.size / 100) || 1 }; // Estimate based on repo size
            }
          })
        );

        // Combine repos with commit counts + remaining repos
        const allReposWithCommits = [
          ...reposWithCommits,
          ...transformedRepos.slice(10).map(repo => ({
            ...repo,
            commits: Math.floor(repo.size / 100) || 1 // Estimate for remaining repos
          }))
        ];

        setRepositories(allReposWithCommits);

        // Calculate user stats using actual profile data for accurate counts
        const stats = {
          totalRepos: profile.public_repos, // Use profile data for accurate count
          totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
          languages: repos.reduce((acc: { [key: string]: number }, repo) => {
            if (repo.language) {
              acc[repo.language] = (acc[repo.language] || 0) + repo.size;
            }
            return acc;
          }, {})
        };

        setUserStats(stats);
        setIsConnected(true);
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return {
    repositories,
    isLoading,
    error,
    userStats,
    userProfile,
    isConnected
  };
}