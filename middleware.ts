import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { ROUTES } from './constants/routes';

const isPublicRoute = createRouteMatcher([
  ROUTES.HOME,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

<<<<<<< HEAD
  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn();
=======
export async function middleware(request: NextRequest) {
  // Ignore non-page requests and static assets
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const targetPath = request.nextUrl.pathname;

  // Allow unrestricted access to specified pages
  if (UNRESTRICTED_PAGES.includes(targetPath)) {
    return NextResponse.next();
  }

  // Get and parse current navigation progress
  let currentProgress: string[];
  try {
    const progress = request.cookies.get('navigationProgress')?.value;
    currentProgress = progress ? JSON.parse(progress) : [FLOW_STEPS.HOME];
  } catch (error) {
    console.error('Error parsing progress:', error);
    currentProgress = [FLOW_STEPS.HOME];
  }

  // Always allow access to home
  if (targetPath === FLOW_STEPS.HOME) {
    const response = NextResponse.next();
    response.cookies.set(
      'navigationProgress',
      JSON.stringify([FLOW_STEPS.HOME])
    );
    return response;
  }

  // Get allowed steps based on current progress
  const allowedSteps = getAllowedSteps(currentProgress);

  // Check if the requested path is allowed
  if (!allowedSteps.includes(targetPath)) {
    const redirectTo =
      currentProgress[currentProgress.length - 1] || FLOW_STEPS.HOME;
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // If this is a new step in the flow, add it to progress
  if (!currentProgress.includes(targetPath)) {
    currentProgress.push(targetPath);
    const response = NextResponse.next();
    response.cookies.set('navigationProgress', JSON.stringify(currentProgress));
    return response;
>>>>>>> master
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
