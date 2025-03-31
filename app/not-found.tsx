import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="mx-auto max-w-md overflow-hidden">
        <CardHeader className="text-center">
          <div className="relative mb-4 h-64 w-full">
            <Image
              src="/images/dark-illustration.png"
              alt="Error state illustration"
              fill
              className="hidden object-contain dark:block"
            />
            <Image
              src="/images/light-illustration.png"
              alt="Error state illustration"
              fill
              className="block object-contain dark:hidden"
            />
          </div>
          <CardTitle className="text-4xl">404</CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="mb-2 text-xl font-medium">Oops! Page not found</p>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
