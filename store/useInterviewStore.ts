import { create } from 'zustand';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { ChatMessage } from '@/types';

GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

interface InterviewState {
  role: {
    id: string;
    title: string;
    company: string;
    description: string;
  };
  roleId: string;
  resume: string;

  isTranscribing: boolean;
  conversationHistory: ChatMessage[];
  setRole: (role: InterviewState['role']) => void;
  setRoleId: (roleId: string) => void;
  setConversationHistory: (conversationHistory: ChatMessage[]) => void;
  setResume: (resume: string) => void;
  setIsTranscribing: (isTranscribing: boolean) => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  role: {
    id: '',
    title: '',
    company: '',
    description: '',
  },
  roleId: '',
  resume: '',
  isTranscribing: false,
  conversationHistory: [],
  setRole: (role) => set({ role }),
  setRoleId: (roleId) => set({ roleId }),
  setConversationHistory: (conversationHistory) => set({ conversationHistory }),
  setResume: (resume) => set({ resume }),
  setIsTranscribing: (isTranscribing) => set({ isTranscribing }),
}));