// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // শুধু dashboard related রুট প্রটেক্ট করা হবে
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET); // verify jwt
      return NextResponse.next();
    } catch (err) {
      console.error("JWT Verify Error:", err);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

// কোন রুটে এই middleware চলবে সেটার config
export const config = {
  matcher: ["/dashboard/:path*"],
};
