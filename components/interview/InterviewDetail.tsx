'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { InterviewWithRelations } from '@/types';
import InterviewHeader from './InterviewHeader';
import PerformanceMetrics from './PerformanceMetrics';
import FeedbackSummary from './FeedbackSummary';
import OverallFeedback from './OverallFeedback';
import QuestionsAnswers from './QuestionsAnswers';
import {
  extractQuestionsAndAnswers,
  parseStrengthsAndImprovements,
} from '@/lib/utils';

interface InterviewDetailProps {
  interview: InterviewWithRelations;
}

export default function InterviewDetail({ interview }: InterviewDetailProps) {
  const router = useRouter();

  // Calculate overall score
  const calculateOverallScore = () => {
    if (
      !interview.feedback ||
      !interview.feedback.metrics ||
      interview.feedback.metrics.length === 0
    ) {
      return 0;
    }

    const totalScore = interview.feedback.metrics.reduce(
      (sum, metric) => sum + metric.score,
      0
    );
    return Math.round(totalScore / interview.feedback.metrics.length);
  };

  // Calculate interview duration in minutes
  const calculateDuration = () => {
    const start = new Date(interview.createdAt);
    const end = new Date(interview.updatedAt);
    const durationMinutes = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60)
    );
    return `${durationMinutes} min`;
  };

  const overallScore = calculateOverallScore();
  const duration = calculateDuration();
  const { strengths, improvements } = parseStrengthsAndImprovements(interview);
  const questionsAndAnswers = extractQuestionsAndAnswers(
    interview,
    overallScore
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 pl-0 hover:bg-transparent hover:pl-0"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Button>

        <InterviewHeader
          interview={interview}
          duration={duration}
          overallScore={overallScore}
        />
      </div>

      {/* Performance by Category */}
      {(interview.feedback?.metrics ?? []).length > 0 && (
        <PerformanceMetrics metrics={interview?.feedback?.metrics} />
      )}

      {/* Feedback Summary */}
      {interview.feedback && (
        <FeedbackSummary strengths={strengths} improvements={improvements} />
      )}

      {/* Overall Feedback */}
      {interview.feedback && (
        <OverallFeedback feedback={interview.feedback.summary} />
      )}

      {/* Questions and Answers */}
      {questionsAndAnswers.length > 0 && (
        <QuestionsAnswers questionsAndAnswers={questionsAndAnswers} />
      )}

      {/* Action buttons */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
        <Button variant="outline" onClick={() => router.back()}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
