import ResumeForm from '@/components/forms/ResumeForm';
import { getUserPresets } from '@/lib/actions/preset.action';

export default async function ResumePage({ params }: RouteParams) {
  const { roleId } = await params;
  const data = await getUserPresets();

  const presets = data.success ? data.data : [];

  return (
    <div className="container flex justify-center px-4 py-12">
      <ResumeForm roleId={roleId} presets={presets} />
    </div>
  );
}
