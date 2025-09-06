/**
 * GitHub API Integration for Revolutionary Developer Portfolio
 * 
 * This module provides functionality to fetch repository data from GitHub
 * and transform it into the immersive 3D visualization format.
 */

import type { Repository } from '@/types/repository';

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  html_url: string;
  topics: string[];
  homepage?: string;
  clone_url: string;
  default_branch: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  blog?: string;
  location?: string;
  company?: string;
}

export interface RepositoryStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: { [key: string]: number };
  recentActivity: {
    repository: string;
    type: 'commit' | 'star' | 'fork';
    date: string;
  }[];
}

// Language color mappings for 3D visualization
export const LANGUAGE_COLORS: { [key: string]: string } = {
  'JavaScript': '#f7df1e',
  'TypeScript': '#3178c6',
  'Python': '#3776ab',
  'Java': '#ed8b00',
  'Go': '#00add8',
  'Rust': '#ce422b',
  'C++': '#00599c',
  'C#': '#239120',
  'PHP': '#777bb4',
  'Ruby': '#cc342d',
  'Swift': '#fa7343',
  'Kotlin': '#7f52ff',
  'HTML': '#e34f26',
  'CSS': '#1572b6',
  'Shell': '#89e051',
  'Dart': '#0175c2',
  'Vue': '#4fc08d',
  'React': '#61dafb',
  'default': '#8b5cf6'
};

export class GitHubAPI {
  private baseURL = 'https://api.github.com';
  private token: string | null = null;

  constructor(token?: string) {
    this.token = token || null;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        endpoint,
        hasToken: !!this.token,
        tokenPrefix: this.token?.substring(0, 10) + '...',
        error: errorText
      });
      throw new Error(`GitHub API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.makeRequest<GitHubUser>(`/users/${username}`);
  }

  async getUserRepositories(username: string, options?: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    type?: 'owner' | 'member' | 'all';
  }): Promise<GitHubRepository[]> {
    const params = new URLSearchParams({
      sort: options?.sort || 'updated',
      direction: options?.direction || 'desc',
      per_page: (options?.per_page || 50).toString(),
      type: options?.type || 'owner'
    });

    return this.makeRequest<GitHubRepository[]>(`/users/${username}/repos?${params}`);
  }

  async getRepositoryLanguages(username: string, repoName: string): Promise<{ [key: string]: number }> {
    return this.makeRequest<{ [key: string]: number }>(`/repos/${username}/${repoName}/languages`);
  }

  async getRepositoryCommits(username: string, repoName: string, options?: {
    per_page?: number;
    since?: string;
  }): Promise<Record<string, unknown>[]> {
    const params = new URLSearchParams({
      per_page: (options?.per_page || 10).toString(),
      ...(options?.since && { since: options.since })
    });

    return this.makeRequest<Record<string, unknown>[]>(`/repos/${username}/${repoName}/commits?${params}`);
  }

  /**
   * Transform repository data for 3D visualization
   */
  transformRepositoryFor3D(repos: GitHubRepository[], index: number): Repository {
    const repo = repos[index];
    
    // Generate 3D position based on repository characteristics
    const angle = (index / repos.length) * Math.PI * 2;
    const radius = 3 + (repo.stargazers_count / 100); // Distance from center based on popularity
    const height = (Math.random() - 0.5) * 4; // Some vertical variation

    const position: [number, number, number] = [
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    ];

    // Calculate days since last activity
    const lastUpdate = new Date(repo.pushed_at);
    const now = new Date();
    const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    
    let lastActiveText = '';
    if (daysSinceUpdate === 0) lastActiveText = 'today';
    else if (daysSinceUpdate === 1) lastActiveText = 'yesterday';
    else if (daysSinceUpdate < 7) lastActiveText = `${daysSinceUpdate} days ago`;
    else if (daysSinceUpdate < 30) lastActiveText = `${Math.floor(daysSinceUpdate / 7)} weeks ago`;
    else lastActiveText = `${Math.floor(daysSinceUpdate / 30)} months ago`;

    return {
      id: repo.id,
      name: repo.name,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      size: repo.size,
      description: repo.description || 'No description available',
      position,
      color: LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.default,
      commits: 0, // Will be fetched separately for real data
      lastActive: lastActiveText,
      topics: repo.topics || [],
      url: repo.html_url
    };
  }

  /**
   * Generate comprehensive developer statistics
   */
  async generateDeveloperStats(username: string): Promise<RepositoryStats> {
    const repos = await this.getUserRepositories(username, { per_page: 100 });
    
    const stats: RepositoryStats = {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: {},
      recentActivity: []
    };

    // Collect language statistics
    for (const repo of repos.slice(0, 20)) { // Limit to avoid rate limiting
      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + repo.size;
      }
    }

    // Generate recent activity (simplified)
    stats.recentActivity = repos.slice(0, 10).map(repo => ({
      repository: repo.name,
      type: 'commit' as const,
      date: repo.pushed_at
    }));

    return stats;
  }
}

// Export singleton instance
export const githubAPI = new GitHubAPI();

// Utility functions for 3D visualization
export function calculateRepositoryPlanetSize(stars: number, size: number): number {
  return Math.max(0.5, Math.min(2.5, (stars / 100) + (size / 10000)));
}

export function generateOrbitingRings(commits: number): number {
  return Math.min(4, Math.max(1, Math.floor(commits / 50)));
}

export function getLanguageEcosystem(language: string): {
  primaryColor: string;
  atmosphereColor: string;
  particleColor: string;
} {
  const baseColor = LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
  
  return {
    primaryColor: baseColor,
    atmosphereColor: `${baseColor}33`, // 20% opacity
    particleColor: `${baseColor}66`   // 40% opacity
  };
}