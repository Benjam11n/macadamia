import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-6 bg-background/85">
      <Logo className="size-16" />

      <div className="text-center">
        <Loader2 className="mx-auto size-10 animate-spin text-primary" />
        <h2 className="mt-4 text-2xl font-semibold text-primary">
          Loading Macadamia
        </h2>
        <p className="mt-2 text-gray-600">Preparing your interview tools...</p>
      </div>
    </div>
  );
}
