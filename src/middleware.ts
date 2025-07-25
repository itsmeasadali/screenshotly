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
  "/api/screenshot-playground",
  "/api/mockups(.*)",
  "/api/webhook/clerk",
  "/api/webhook/stripe"
]);

export default clerkMiddleware(async (auth, req) => {
  // Security headers for all requests
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  if (isPublicRoute(req)) {
    return response;
  }

  try {
    // For protected routes, ensure user is authenticated
    const session = await auth();
    if (!session.userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return response;
  } catch (error) {
    console.error('Middleware auth error:', error);
    // Redirect to sign-in on any auth error
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Optional: Only run on path regex
    '/(api|trpc)(.*)',
  ],
}; 