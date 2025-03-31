'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="relative h-64 w-80">
            <Image
              src="/images/dark-error.png"
              alt="Error state illustration"
              layout="fill"
              objectFit="contain"
              className="hidden dark:block"
            />
            <Image
              src="/images/light-error.png"
              alt="Error state illustration"
              layout="fill"
              objectFit="contain"
              className="block dark:hidden"
            />
          </div>
          <h3 className="text-xl font-semibold">Error Loading Interview</h3>
          <p className="mb-4 text-muted-foreground">
            {error.message ||
              'There was a problem loading the interview details.'}
          </p>
          <div className="flex gap-4">
            <Button onClick={reset} variant="outline">
              Try Again
            </Button>
            <Link href={ROUTES.DASHBOARD}>
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
