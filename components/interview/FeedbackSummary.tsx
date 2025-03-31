import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, BarChart4 } from 'lucide-react';

interface FeedbackSummaryProps {
  strengths: string[];
  improvements: string[];
}

export default function FeedbackSummary({
  strengths,
  improvements,
}: FeedbackSummaryProps) {
  return (
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
            {strengths.length > 0 ? (
              strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))
            ) : (
              <li>No specific strengths highlighted in the feedback.</li>
            )}
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
            {improvements.length > 0 ? (
              improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))
            ) : (
              <li>No specific improvements highlighted in the feedback.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
