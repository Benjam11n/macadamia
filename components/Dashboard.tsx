'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES } from '@/constants/routes';
import { InterviewWithRelations } from '@/types';
import SessionsList from './SessionsList';

interface DashboardProps {
  interviews?: InterviewWithRelations[];
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
}

export default function Dashboard({
  interviews = [],
  success,
  error,
}: DashboardProps) {
  const formatDate = (dateString: string | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get the score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Calculate average score from feedback metrics
  const calculateAverageScore = (interview: InterviewWithRelations) => {
    if (!interview.feedback || !interview.feedback.metrics.length) return 0;

    const sum = interview.feedback.metrics.reduce(
      (acc, metric) => acc + metric.score,
      0
    );
    return Math.round(sum / interview.feedback.metrics.length);
  };

  // Calculate statistics
  const totalSessions = interviews.length;

  // Calculate average score across all interviews
  const averageScore =
    interviews.length > 0
      ? Math.round(
          interviews.reduce(
            (sum, interview) => sum + calculateAverageScore(interview),
            0
          ) / interviews.length
        )
      : 0;

  // Get last session date
  const lastSessionDate =
    interviews.length > 0 ? formatDate(interviews[0].createdAt) : 'N/A';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Track your interview practice progress and performance
          </p>
        </div>
        <Link href={ROUTES.ROLE}>
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            New Practice Interview
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Sessions
              </p>
              <p className="text-3xl font-bold">{totalSessions}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="size-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Score
              </p>
              <p className="text-3xl font-bold">{averageScore}%</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <TrendingUp className="size-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Practice
              </p>
              <p className="text-xl font-bold">{lastSessionDate}</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="size-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Tabs */}
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
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
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
    </div>
  );
}
