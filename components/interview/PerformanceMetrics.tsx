import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getScoreColor, getProgressColor } from '@/lib/utils';

interface Metric {
  id: string;
  category: string;
  score: number;
}

interface PerformanceMetricsProps {
  metrics?: Metric[];
}

export default function PerformanceMetrics({
  metrics,
}: PerformanceMetricsProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold">Performance by Category</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics?.map((metric) => (
          <Card key={metric.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-medium">{metric.category}</p>
                <span className={`font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}%
                </span>
              </div>
              <Progress
                value={metric.score}
                className={`${getProgressColor(metric.score)} h-2`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
