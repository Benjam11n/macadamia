'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewWithRelations } from '@/types';
import SessionsList from './SessionsList';
import { formatDate, getScoreColor } from '@/lib/utils';

interface InterviewTabsProps {
  interviews: InterviewWithRelations[];
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  calculateAverageScore: (interview: InterviewWithRelations) => number;
}

export default function InterviewTabs({
  interviews,
  success,
  error,
  calculateAverageScore,
}: InterviewTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Sessions</TabsTrigger>
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="highest">Highest Scores</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <SessionsList
          interviews={interviews}
          success={success}
          error={error}
          formatDate={formatDate}
          getScoreColor={getScoreColor}
          calculateAverageScore={calculateAverageScore}
        />
      </TabsContent>

      <TabsContent value="recent">
        <SessionsList
          interviews={[...interviews].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )}
          success={success}
          error={error}
          formatDate={formatDate}
          getScoreColor={getScoreColor}
          calculateAverageScore={calculateAverageScore}
        />
      </TabsContent>

      <TabsContent value="highest">
        <SessionsList
          interviews={[...interviews].sort(
            (a, b) => calculateAverageScore(b) - calculateAverageScore(a)
          )}
          success={success}
          error={error}
          formatDate={formatDate}
          getScoreColor={getScoreColor}
          calculateAverageScore={calculateAverageScore}
        />
      </TabsContent>
    </Tabs>
  );
}
