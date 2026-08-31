export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  features: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "archived";
  emoji?: string;
};
