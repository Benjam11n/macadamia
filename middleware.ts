import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { ROUTES } from './constants/routes';

const isPublicRoute = createRouteMatcher([
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.TIPS,
  ROUTES.FAQ,
  ROUTES.TERMS,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
