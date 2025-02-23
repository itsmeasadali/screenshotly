import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/api/docs",
  "/docs",
  "/pricing",
  "/playground",
  "/api/playground",
  "/api/screenshot(.*)",
  "/api/mockups(.*)",
  "/api/webhook/clerk",
  "/api/webhook/stripe"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For protected routes, ensure user is authenticated
  const session = await auth();
  if (!session.userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Optional: Only run on path regex
    '/(api|trpc)(.*)',
  ],
}; 