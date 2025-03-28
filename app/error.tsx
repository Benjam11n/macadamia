'use client';

import Link from 'next/link';
import { AlertOctagon } from 'lucide-react';
import { useEffect } from 'react';

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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <AlertOctagon className="size-16 text-red-500" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Critical Error
            </h1>
            <p className="mb-2 text-gray-600">
              A critical error has occurred. We&apos;re working on fixing the
              issue.
            </p>

            {/* Show error message if in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 overflow-auto rounded bg-gray-50 p-3 text-left">
                <p className="text-sm font-medium text-red-600">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-1 text-xs text-gray-500">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => reset()}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Try again
              </button>
              <Link
                href="/"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
