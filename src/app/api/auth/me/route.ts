// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = verifyJwt<{ id: string }>(token);
    if (!decoded || !decoded.id) {
      // invalid token -> clear cookie
      const res = NextResponse.json({ user: null }, { status: 200 });
      res.cookies.set({ name: "token", value: "", path: "/", maxAge: 0 });
      return res;
    }

    await dbConnect();
    const user = await User.findById(decoded.id).select("-password").lean();

    return NextResponse.json({ user: user || null }, { status: 200 });
  } catch (err) {
    console.error("[ME_ERROR]", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
