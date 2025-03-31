import InterviewDetail from '@/components/interview/InterviewDetail';
import { getInterviewById } from '@/lib/actions/interview.action';
import { notFound } from 'next/navigation';

interface RouteParams {
  params: {
    id: string;
  };
}

export default async function InterviewDetailPage({ params }: RouteParams) {
  const { id } = params;
  const result = await getInterviewById({ id });

  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to load interview');
  }

  if (!result.data) {
    notFound();
  }

  return <InterviewDetail interview={result.data} />;
}

export function generateMetadata({ params }: RouteParams) {
  return {
    title: `Interview Details - ${params.id}`,
  };
}
