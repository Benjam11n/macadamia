import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <FileQuestion className="size-16 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl">Oops! Page not found</p>
        <p className="mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button>
          <Link href="/" className="text-white dark:text-black">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
