import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Building, Award } from 'lucide-react';
import { InterviewWithRelations } from '@/types';
import { formatDate, getScoreColor } from '@/lib/utils';

interface InterviewHeaderProps {
  interview: InterviewWithRelations;
  duration: string;
  overallScore: number;
}

export default function InterviewHeader({
  interview,
  duration,
  overallScore,
}: InterviewHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold">
          {interview.role?.title || 'Interview'} Interview
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
          <div className="flex items-center">
            <Building className="mr-1 size-4" />
            <span>{interview.role?.company || 'Not specified'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 size-4" />
            <span>{formatDate(interview.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 size-4" />
            <span>{duration}</span>
          </div>
          <Badge variant="outline">
            {interview.preset?.name || 'Standard'} Interviewer
          </Badge>
        </div>
      </div>

      <div className="flex items-center rounded-lg bg-muted p-3">
        <div className="mr-3 text-right">
          <p className="text-sm font-medium">Overall Score</p>
          <p className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </p>
        </div>
        <Award className={`size-10 ${getScoreColor(overallScore)}`} />
      </div>
    </div>
  );
}
