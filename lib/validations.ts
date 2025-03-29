import { z } from 'zod';

export const InterviewerPresetSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  personality: z
    .string()
    .min(10, 'Personality description must be at least 10 characters'),
});

export const TargetRoleSchema = z.object({
  jobTitle: z
    .string()
    .min(1, { message: 'Job Title is required' })
    .max(100, { message: 'Job Title cannot exceed 100 characters' }),
  companyName: z
    .string()
    .max(100, { message: 'Company Name cannot exceed 100 characters' }),
  jobDescription: z
    .string()
    .max(3000, { message: 'Job Description cannot exceed 3000 characters' }),
  interviewerPreset: InterviewerPresetSchema,
});

export const RoleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string()
});

export const CreateInterviewSchema = z.object({
  roleId: z.string().min(1, "Role is required"),
  presetId: z.string().min(1, "Preset is required"),
  resume: z.string()
});

export const UpdateInterviewSchema = z.object({
  roleId: z.string().min(1, "Role is required").optional(),
  presetId: z.string().min(1, "Preset is required").optional(),
  resume: z.string().optional(),
  isTranscribing: z.boolean().optional()
});

export const AddMessageSchema = z.object({
  interviewId: z.string().min(1, "Interview ID is required"),
  role: z.enum(['user', 'assistant'], {
    errorMap: () => ({ message: "Role must be either 'user' or 'assistant'" })
  }),
  content: z.string().min(1, "Message content is required")
});

export const FeedbackMetricSchema = z.object({
  category: z.string().min(1, "Category is required"),
  score: z.number().min(0).max(10),
  comment: z.string().min(1, "Comment is required")
});

export const CreateFeedbackSchema = z.object({
  interviewId: z.string().min(1, "Interview ID is required"),
  summary: z.string().min(1, "Summary is required"),
  metrics: z.array(FeedbackMetricSchema).min(1, "At least one metric is required")
});

export const CreatePresetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  personality: z.string().min(1, "Personality is required")
});

export const UpdatePresetSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  personality: z.string().min(1, "Personality is required").optional()
});
