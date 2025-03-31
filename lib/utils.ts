export const formatDate = (dateString: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  export const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  export const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  import { InterviewWithRelations } from '@/types';

// Parse strengths and improvements from feedback summary
export const parseStrengthsAndImprovements = (interview: InterviewWithRelations) => {
  if (!interview.feedback || !interview.feedback.summary) {
    return { strengths: [], improvements: [] };
  }

  const summary = interview.feedback.summary;

  // This is a simplified approach - you may need to adjust based on your actual data format
  const strengthsMatch = summary.match(
    /Strengths:(.*?)(?:Areas for Improvement:|$)/s
  );
  const improvementsMatch = summary.match(
    /Areas for Improvement:(.*?)(?:$)/s
  );

  const strengths = strengthsMatch
    ? strengthsMatch[1]
        .split('\n')
        .filter((item) => item.trim().length > 0)
        .map((item) => item.trim().replace(/^-\s*/, ''))
    : [];

  const improvements = improvementsMatch
    ? improvementsMatch[1]
        .split('\n')
        .filter((item) => item.trim().length > 0)
        .map((item) => item.trim().replace(/^-\s*/, ''))
    : [];

  return { strengths, improvements };
};

// Extract Q&A from messages
export const extractQuestionsAndAnswers = (interview: InterviewWithRelations, overallScore: number) => {
  if (!interview.messages || interview.messages.length === 0) {
    return [];
  }

  const qaItems = [];
  let currentQuestion = null;

  for (let i = 0; i < interview.messages.length; i++) {
    const message = interview.messages[i];

    if (message.role === 'assistant' && !message.content.startsWith('I')) {
      // Assume this is a question from the interviewer
      currentQuestion = {
        id: message.id,
        question: message.content,
        answer: '',
        feedback: '',
        score: 0,
      };
    } else if (message.role === 'user' && currentQuestion) {
      // This is the candidate's answer
      currentQuestion.answer = message.content;

      // Try to find a feedback message that follows
      if (
        i + 1 < interview.messages.length &&
        interview.messages[i + 1].role === 'assistant'
      ) {
        currentQuestion.feedback = interview.messages[i + 1].content;
      }

      // Set a score - in a real application, you'd get this from actual feedback data
      if (interview.feedback && interview.feedback.metrics.length > 0) {
        // Use the average score as a placeholder for individual question scores
        currentQuestion.score = overallScore;
      }

      qaItems.push(currentQuestion);
      currentQuestion = null;
    }
  }

  return qaItems;
};