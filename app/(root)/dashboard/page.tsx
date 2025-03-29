'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  Building,
  TrendingUp,
  BarChart,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTES } from '@/constants/routes';

// Define types for the session data
interface InterviewSession {
  id: string;
  date: string;
  jobTitle: string;
  company: string;
  duration: string;
  score: number;
  status: 'completed' | 'in-progress';
  interviewerPreset: string;
}

export default function Dashboard() {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetch from a database
  useEffect(() => {
    // This would normally be an API call to get the user's sessions
    const fetchSessions = async () => {
      setIsLoading(true);

      // Mock data - replace with actual API call in production
      const mockSessions: InterviewSession[] = [
        {
          id: '1',
          date: '2025-03-28',
          jobTitle: 'Frontend Developer',
          company: 'TechCorp',
          duration: '32m',
          score: 85,
          status: 'completed',
          interviewerPreset: 'Friendly',
        },
        {
          id: '2',
          date: '2025-03-25',
          jobTitle: 'UX Designer',
          company: 'DesignHub',
          duration: '28m',
          score: 78,
          status: 'completed',
          interviewerPreset: 'Technical',
        },
        {
          id: '3',
          date: '2025-03-22',
          jobTitle: 'Frontend Developer',
          company: 'TechCorp',
          duration: '15m',
          score: 72,
          status: 'completed',
          interviewerPreset: 'Challenging',
        },
        {
          id: '4',
          date: '2025-03-20',
          jobTitle: 'Product Manager',
          company: 'InnovateCo',
          duration: '45m',
          score: 90,
          status: 'completed',
          interviewerPreset: 'Friendly',
        },
      ];

      setTimeout(() => {
        setSessions(mockSessions);
        setIsLoading(false);
      }, 500); // Simulate network delay
    };

    fetchSessions();
  }, []);

  // Function to format date in a more readable way
  const formatDate = (dateString: string) => {
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

  // Calculate statistics
  const totalSessions = sessions.length;
  const averageScore =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((sum, session) => sum + session.score, 0) /
            sessions.length
        )
      : 0;
  const lastSessionDate =
    sessions.length > 0 ? formatDate(sessions[0].date) : 'N/A';

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
            sessions={sessions}
            isLoading={isLoading}
            formatDate={formatDate}
            getScoreColor={getScoreColor}
          />
        </TabsContent>

        <TabsContent value="recent">
          <SessionsList
            sessions={[...sessions].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )}
            isLoading={isLoading}
            formatDate={formatDate}
            getScoreColor={getScoreColor}
          />
        </TabsContent>

        <TabsContent value="highest">
          <SessionsList
            sessions={[...sessions].sort((a, b) => b.score - a.score)}
            isLoading={isLoading}
            formatDate={formatDate}
            getScoreColor={getScoreColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sessions list component to keep the main component cleaner
interface SessionsListProps {
  sessions: InterviewSession[];
  isLoading: boolean;
  formatDate: (dateString: string) => string;
  getScoreColor: (score: number) => string;
}

function SessionsList({
  sessions,
  isLoading,
  formatDate,
  getScoreColor,
}: SessionsListProps) {
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <BarChart className="mb-4 size-16 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No practice sessions yet</h3>
          <p className="mb-4 text-muted-foreground">
            Start your first interview practice to track your progress
          </p>
          <Link href="/practice/new">
            <Button>Start a Practice Interview</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="overflow-hidden">
          <Link href={ROUTES.DETAILS(session.id)}>
            <div className="flex h-full cursor-pointer flex-col items-start justify-between border-l-4 border-primary p-6 transition-all hover:bg-muted/50 sm:flex-row sm:items-center">
              <div className="mb-4 flex flex-col sm:mb-0">
                <div className="mb-2 flex items-center">
                  <h3 className="mr-2 text-lg font-semibold">
                    {session.jobTitle}
                  </h3>
                  <Badge variant="outline">{session.interviewerPreset}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="mr-1 size-4" />
                  <span className="mr-4">{session.company}</span>
                  <Calendar className="mr-1 size-4" />
                  <span className="mr-4">{formatDate(session.date)}</span>
                  <Clock className="mr-1 size-4" />
                  <span>{session.duration}</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 text-right">
                  <p className="text-sm font-medium text-muted-foreground">
                    Score
                  </p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{session.score}%</span>
                    <div
                      className={`ml-2 size-3 rounded-full ${getScoreColor(session.score)}`}
                    ></div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
}
