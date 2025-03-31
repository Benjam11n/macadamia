import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="relative h-64 w-80">
            <Image
              src="/images/dark-illustration.png"
              alt="Error state illustration"
              layout="fill"
              objectFit="contain"
              className="hidden dark:block"
            />
            <Image
              src="/images/light-illustration.png"
              alt="Error state illustration"
              layout="fill"
              objectFit="contain"
              className="block dark:hidden"
            />
          </div>
          <h3 className="text-xl font-semibold">Interview Not Found</h3>
          <p className="mb-4 text-muted-foreground">
            The interview you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href={ROUTES.DASHBOARD}>
            <Button>Return to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
