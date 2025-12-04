import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tyewbfzjxroqnyuzqvdb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZXdiZnpqeHJvcW55dXpxdmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTY5NzUsImV4cCI6MjA4MDM5Mjk3NX0.YRV_uKSwAhYwZm1jSwevl0SzMdmedl4EQMDK8Fu1mUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  email: string;
  role: 'learner' | 'teacher';
  full_name: string;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  title: string;
  content: string;
  order: number;
}

export interface Quiz {
  id: string;
  subject_id: string;
  topic_id?: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  time_limit?: number;
  passing_score: number;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'fill_in_blank';
  options?: string[];
  correct_answer: string;
  explanation?: string;
  points: number;
  order: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_points: number;
  percentage: number;
  started_at: string;
  completed_at?: string;
  answers: Record<string, string>;
}

export interface Progress {
  id: string;
  user_id: string;
  subject_id: string;
  topic_id?: string;
  mastery_level: number;
  last_accessed: string;
}
