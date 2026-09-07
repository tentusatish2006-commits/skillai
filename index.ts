export interface Skill {
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

export interface RoleRequirement {
  role: string;
  skills: string[];
  description: string;
}

export interface ResumeAnalysis {
  extractedSkills: string[];
  requiredSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  rawText: string;
  targetRole: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  type: 'single' | 'reorder';
  correctOrder?: number[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  skill: string;
  type: 'free' | 'paid';
  price: string;
  duration: string;
  rating: number;
  url: string;
  level: string;
}

export interface RoadmapNode {
  skill: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed';
  resources: { title: string; type: string }[];
  priority: number;
}

export type Page =
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'upload'
  | 'analysis'
  | 'roadmap'
  | 'courses'
  | 'quiz'
  | 'report';
