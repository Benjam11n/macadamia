import InterviewCall from '@/components/interview/InterviewCall';

export default async function CallPage({ params }: RouteParams) {
  const { id } = await params;

  return <InterviewCall interviewId={id} />;
}
