import RoleForm from '@/components/forms/RoleForm';
import { getUserPresets } from '@/lib/actions/preset.action';

export default async function RolePage() {
  const data = await getUserPresets();

  const presets = data.success ? data.data : [];

  return <RoleForm presets={presets} />;
}
