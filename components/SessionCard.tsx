import { InterviewWithRelations } from '@/types';
import { Card } from './ui/card';
import { Building, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ROUTES } from '@/constants/routes';
import { Badge } from './ui/badge';

interface SessionsListProps {
  interview: InterviewWithRelations;
  formatDate: (dateString: string | Date) => string;
  getScoreColor: (score: number) => string;
  calculateAverageScore: (interview: InterviewWithRelations) => number;
}

export default function SessionCard({
  interview,
  formatDate,
  getScoreColor,
  calculateAverageScore,
}: SessionsListProps) {
  const score = calculateAverageScore(interview);
  const duration =
    Math.floor(
      (new Date(interview.updatedAt).getTime() -
        new Date(interview.createdAt).getTime()) /
        (1000 * 60)
    ) + ' min';

  return (
    <Card key={interview.id} className="overflow-hidden">
      <Link href={ROUTES.DETAILS(interview.id)}>
        <div className="flex h-full cursor-pointer flex-col items-start justify-between border-l-4 border-primary p-6 transition-all hover:bg-muted/50 sm:flex-row sm:items-center">
          <div className="mb-4 flex flex-col sm:mb-0">
            <div className="mb-2 flex items-center">
              <h3 className="mr-2 text-lg font-semibold">
                {interview.role?.title || 'Untitled Role'}
              </h3>
              <Badge variant="outline">
                {interview.preset?.name || 'Standard'}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Building className="mr-1 size-4" />
              <span className="mr-4">
                {interview.role?.company || 'Company not specified'}
              </span>
              <Calendar className="mr-1 size-4" />
              <span className="mr-4">{formatDate(interview.createdAt)}</span>
              <Clock className="mr-1 size-4" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm font-medium text-muted-foreground">Score</p>
              <div className="flex items-center">
                <span className="text-xl font-bold">{score}%</span>
                <div
                  className={`ml-2 size-3 rounded-full ${getScoreColor(score)}`}
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
  );
}
