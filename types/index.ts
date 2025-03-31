import { Prisma } from "@prisma/client";

export interface Role {
  title: string;
  company: string;
  description: string;
  preset: string;
}

export interface PresetType {
  id: string;
  name: string;
  description: string;
  personality: string;
}

export interface FeedbackMetric {
  category: string;
  score: number;
  feedback: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type InterviewWithRelations = Prisma.InterviewGetPayload<{
  include: {
    role: true;
    preset: true;
    feedback: {
      include: {
        metrics: true;
      };
    };
    messages: true;
  };
}>;