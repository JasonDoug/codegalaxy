export interface Repository {
  id: number;
  name: string;
  language: string;
  stars: number;
  size: number;
  description: string;
  position: [number, number, number];
  color: string;
  commits: number;
  lastActive: string;
  topics?: string[];
  url?: string;
}