import InterviewDetail from '@/components/interview/InterviewDetail';
import { getInterviewById } from '@/lib/actions/interview.action';
import { notFound } from 'next/navigation';

export default async function InterviewDetailPage({ params }: RouteParams) {
  const { id } = await params;
  const result = await getInterviewById({ id });

  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to load interview');
  }

  if (!result.data) {
    notFound();
  }

  return <InterviewDetail interview={result.data} />;
}
