import { clerkMiddleware, createRouteMatcher, redirectToSignIn } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)',
]);

export default clerkMiddleware((auth, req) => {
    // If the user is not signed in and trying to access a protected route, redirect them
    if (protectedRoutes(req) && !auth().userId) {
        return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If authenticated or not accessing a protected route, continue as usual
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
