import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.isAdmin;
    const path = req.nextUrl.pathname;

    // Redirect admin to admin dashboard if trying to access student dashboard
    if (isAdmin && path === "/dashboard") {
      return NextResponse.redirect(new URL("/admindashboard", req.url));
    }

    // Redirect student to student dashboard if trying to access admin dashboard
    if (!isAdmin && path === "/admindashboard") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/admindashboard"],
}; 