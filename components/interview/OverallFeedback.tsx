import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface OverallFeedbackProps {
  feedback: string | null | undefined;
}

export default function OverallFeedback({ feedback }: OverallFeedbackProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="size-5 text-primary" />
          Overall Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed">
          {feedback || 'No detailed feedback available.'}
        </p>
      </CardContent>
    </Card>
  );
}
