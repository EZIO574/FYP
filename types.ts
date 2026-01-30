import React from 'react';

export enum Platform {
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  Facebook = 'Facebook'
}

export enum Tone {
  Professional = 'Professional',
  Casual = 'Casual',
  Humorous = 'Humorous',
  Urgent = 'Urgent',
  Inspirational = 'Inspirational'
}

export interface GeneratedContent {
  id: string;
  text: string;
  imagePrompt?: string; 
  imageUrl?: string;
  platform: Platform;
  timestamp: Date;
}

export interface CampaignStrategy {
  overview: string;
  targetAudience: string;
  keyThemes: string[];
  suggestedPosts: {
    platform: Platform;
    content: string;
    hashtags: string[];
    bestTime: string;
  }[];
}

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted';
  score: number; // AI Score 0-100
  aiAnalysis?: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: 'Draft' | 'Scheduled' | 'Sent';
  sentCount: number;
  openRate: number;
  scheduledDate?: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  tool: 'n8n' | 'Zapier';
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
  lastRun: string;
}

// New Types for Gemini 3 Pro Features
export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  strategicAdvice: string;
}

export interface OptimizationResult {
  original: string;
  optimized: string;
  changesMade: string;
}

export interface Persona {
  name: string;
  ageRange: string;
  occupation: string;
  incomeLevel: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  motivations: string[];
  preferredChannels: string[];
}

export interface SeoResult {
  keywords: {term: string, volume: string, difficulty: string}[];
  contentIdeas: string[];
  competitorUrls: string[];
}