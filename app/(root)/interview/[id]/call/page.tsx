import Interview from '@/components/Interview';

export default async function CallPage({ params }: RouteParams) {
  const { id } = await params;

  return <Interview interviewId={id} />;
}
