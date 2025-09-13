// Common types used throughout the application

export interface User {
  id: string;
  email: string;
  displayName?: string;
  avatar?: string;
}

export interface NavItem {
  to: string;
  label: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  userId: string;
  timestamp: Date;
  userName?: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  createdAt: Date;
  authorId: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'rating';
  options?: string[];
  required: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  createdAt: Date;
  authorId: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  publishedAt: Date;
  source: string;
  tags: string[];
}