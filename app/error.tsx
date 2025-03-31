'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error occurred:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="mx-auto max-w-md overflow-hidden">
            <CardHeader className="text-center">
              <div className="relative mb-4 h-64 w-full">
                <Image
                  src="/images/dark-error.png"
                  alt="Error state illustration"
                  fill
                  className="hidden object-contain dark:block"
                />
                <Image
                  src="/images/light-error.png"
                  alt="Error state illustration"
                  fill
                  className="block object-contain dark:hidden"
                />
              </div>
              <CardTitle className="text-3xl">Critical Error</CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <p className="mb-4 text-muted-foreground">
                A critical error has occurred. We&apos;re working on fixing the
                issue.
              </p>

              {/* Show error message if in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mb-6 overflow-auto rounded bg-muted p-3 text-left">
                  <p className="text-sm font-medium text-red-600">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-center space-x-4">
              <Button onClick={() => reset()} variant="destructive">
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline">Return home</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}
