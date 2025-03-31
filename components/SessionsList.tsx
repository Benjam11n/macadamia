import { InterviewWithRelations } from '@/types';
import { Card, CardContent } from './ui/card';
import { BarChart } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ROUTES } from '@/constants/routes';
import DataRenderer from './DataRenderer';
import { EMPTY_SESSIONS } from '@/constants/states';
import SessionCard from './SessionCard';

interface SessionsListProps {
  interviews: InterviewWithRelations[];
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  formatDate: (dateString: string | Date) => string;
  getScoreColor: (score: number) => string;
  calculateAverageScore: (interview: InterviewWithRelations) => number;
}

export default function SessionsList({
  interviews,
  success,
  error,
  formatDate,
  getScoreColor,
  calculateAverageScore,
}: SessionsListProps) {
  if (interviews.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <BarChart className="mb-4 size-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No practice sessions yet</h3>
          <p className="mb-4 text-muted-foreground">
            Start your first interview practice to track your progress
          </p>
          <Link href={ROUTES.ROLE}>
            <Button>Start a Practice Interview</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <DataRenderer
      success={success}
      error={error}
      data={interviews}
      empty={EMPTY_SESSIONS}
      render={(interviews) => (
        <div className="space-y-4">
          {interviews.map((intervieew) => (
            <SessionCard
              key={intervieew.id}
              interview={intervieew}
              formatDate={formatDate}
              getScoreColor={getScoreColor}
              calculateAverageScore={calculateAverageScore}
            />
          ))}
        </div>
      )}
    />
  );
}
