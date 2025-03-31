import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Book } from 'lucide-react';

interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  feedback?: string;
  score: number;
}

interface QuestionsAnswersProps {
  questionsAndAnswers: QuestionAnswer[];
}

export default function QuestionsAnswers({
  questionsAndAnswers,
}: QuestionsAnswersProps) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Questions & Answers</h2>
      <div className="space-y-6">
        {questionsAndAnswers.map((qa, index) => (
          <Card key={qa.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold">
                  Q{index + 1}: {qa.question}
                </CardTitle>
                <Badge
                  className={`ml-2 ${
                    qa.score >= 85
                      ? 'bg-green-500'
                      : qa.score >= 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
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
              {qa.feedback && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1 font-medium">
                    <Book className="size-4" /> Feedback
                  </h4>
                  <p className="text-sm">{qa.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
