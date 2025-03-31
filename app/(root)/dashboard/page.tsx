import Dashboard from '@/components/dashboard/Dashboard';
import { getUserInterviews } from '@/lib/actions/interview.action';

export default async function DashboardPage() {
  const { data: interviews, success, error } = await getUserInterviews();

  return <Dashboard interviews={interviews} success={success} error={error} />;
}
