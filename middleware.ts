import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Debugging: Check if environment variables are properly loaded
console.log("Clerk Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
console.log("Clerk Secret Key:", process.env.CLERK_SECRET_KEY);

const protectedRoutes = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",
]);

export default clerkMiddleware((auth, req) => {
  try {
    console.log("Middleware Running... Path:", req.nextUrl.pathname);

    if (protectedRoutes(req)) {
      console.log("Protected Route Accessed:", req.nextUrl.pathname);
      return auth();
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
});

// ✅ Optimized matcher to prevent unnecessary route conflicts
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
