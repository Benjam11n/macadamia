'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Building,
  CheckCircle2,
  XCircle,
  User,
  Award,
  Book,
  BarChart4,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

// Define types
interface InterviewSession {
  id: string;
  date: string;
  jobTitle: string;
  company: string;
  duration: string;
  score: number;
  status: 'completed' | 'in-progress';
  interviewerPreset: string;
  feedback: {
    strengths: string[];
    improvements: string[];
    overall: string;
  };
  questions: {
    id: string;
    question: string;
    answer: string;
    score: number;
    feedback: string;
  }[];
  categories: {
    name: string;
    score: number;
  }[];
}

export default function SessionDetail() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      setIsLoading(true);

      // Mock data - replace with actual API call in production
      const mockSession: InterviewSession = {
        id: params.id as string,
        date: '2025-03-28',
        jobTitle: 'Frontend Developer',
        company: 'TechCorp',
        duration: '32m',
        score: 85,
        status: 'completed',
        interviewerPreset: 'Friendly',
        feedback: {
          strengths: [
            'Strong technical knowledge of React and state management',
            'Clear communication of complex concepts',
            'Good problem-solving approach with systematic thinking',
          ],
          improvements: [
            'Could provide more concrete examples from past projects',
            'Sometimes took too long to get to the main point',
            'Consider practicing more system design questions',
          ],
          overall:
            'Overall, you demonstrated solid technical skills and communication ability. Your answers were structured and showed good depth of knowledge. With a bit more practice on conciseness and adding more specific examples from your experience, you should be well-prepared for the actual interview.',
        },
        questions: [
          {
            id: 'q1',
            question: "Can you explain how React's virtual DOM works?",
            answer:
              'The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React creates a tree of JavaScript objects that represent the actual DOM tree. When state changes in a React component, it first updates this virtual representation, then compares it with the previous version using a diffing algorithm. After identifying the differences, React only updates the changed parts in the actual DOM, which is more efficient than updating the entire DOM directly.',
            score: 92,
            feedback:
              'Excellent technical explanation with good depth. You covered the key concepts clearly.',
          },
          {
            id: 'q2',
            question:
              'Describe a challenging project you worked on and how you overcame obstacles.',
            answer:
              'I worked on a real-time dashboard project that had performance issues with large datasets. We were rendering thousands of data points which caused significant lag. I implemented windowing techniques using react-window to only render visible items, added memoization for expensive calculations, and optimized our Redux state structure. This improved performance by 70%.',
            score: 85,
            feedback:
              'Good specific example with quantifiable results. Could have elaborated more on your personal contribution versus team effort.',
          },
          {
            id: 'q3',
            question: 'How do you approach debugging a complex frontend issue?',
            answer:
              "I start by reproducing the issue consistently and isolating when and where it occurs. I use browser devtools to inspect network activity, console logs, and component state. For complex issues, I often implement logging at key points in the code flow. I also check for recent code changes that might have introduced the bug. If needed, I'll create a minimal test case to eliminate variables.",
            score: 78,
            feedback:
              'Your systematic approach is good. Adding a specific example of a bug you solved would strengthen this answer.',
          },
        ],
        categories: [
          { name: 'Technical Knowledge', score: 88 },
          { name: 'Communication', score: 85 },
          { name: 'Problem Solving', score: 82 },
          { name: 'Experience', score: 75 },
        ],
      };

      setTimeout(() => {
        setSession(mockSession);
        setIsLoading(false);
      }, 500); // Simulate network delay
    };

    fetchSessionDetails();
  }, [params.id]);

  // Function to format date in a more readable way
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get the score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <XCircle className="mb-4 size-16 text-red-500" />
            <h3 className="text-xl font-semibold">Session not found</h3>
            <p className="mb-4 text-muted-foreground">
              The interview session you&apos;re looking for doesn&apos;t exist
              or has been removed.
            </p>
            <Link href={ROUTES.DASHBOARD}>
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">{session.jobTitle} Interview</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
              <div className="flex items-center">
                <Building className="mr-1 size-4" />
                <span>{session.company}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 size-4" />
                <span>{formatDate(session.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 size-4" />
                <span>{session.duration}</span>
              </div>
              <Badge variant="outline">
                {session.interviewerPreset} Interviewer
              </Badge>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-muted p-3">
            <div className="mr-3 text-right">
              <p className="text-sm font-medium">Overall Score</p>
              <p
                className={`text-2xl font-bold ${getScoreColor(session.score)}`}
              >
                {session.score}%
              </p>
            </div>
            <Award className={`size-10 ${getScoreColor(session.score)}`} />
          </div>
        </div>
      </div>

      {/* Performance by Category */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Performance by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {session.categories.map((category) => (
            <Card key={category.name} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-medium">{category.name}</p>
                  <span
                    className={`font-bold ${getScoreColor(category.score)}`}
                  >
                    {category.score}%
                  </span>
                </div>
                <Progress
                  value={category.score}
                  className="h-2"
                  style={
                    {
                      '--progress-foreground':
                        getProgressColor(category.score).replace(
                          'bg-',
                          'var(--'
                        ) + ')',
                    } as React.CSSProperties
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feedback Summary */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-500" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc space-y-2">
              {session.feedback.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="size-5 text-yellow-500" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc space-y-2">
              {session.feedback.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Overall Feedback */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="size-5 text-primary" />
            Overall Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">{session.feedback.overall}</p>
        </CardContent>
      </Card>

      {/* Questions and Answers */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Questions & Answers</h2>
        <div className="space-y-6">
          {session.questions.map((qa, index) => (
            <Card key={qa.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Q{index + 1}: {qa.question}
                  </CardTitle>
                  <Badge
                    className={`ml-2 ${qa.score >= 85 ? 'bg-green-500' : qa.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  >
                    {qa.score}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <h4 className="mb-2 flex items-center gap-1 font-medium">
                    <User className="size-4" /> Your Answer
                  </h4>
                  <p className="whitespace-pre-wrap rounded-md bg-muted/30 p-3 text-sm">
                    {qa.answer}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 flex items-center gap-1 font-medium">
                    <Book className="size-4" /> Feedback
                  </h4>
                  <p className="text-sm">{qa.feedback}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
        <Button variant="outline" onClick={() => router.back()}>
          Return to Dashboard
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href={ROUTES.ROLE}>
            <Button className="gap-2">Practice Again</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
