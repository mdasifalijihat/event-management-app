// app/api/bookings/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import { verifyJwt } from "@/lib/auth";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt<{ id: string }>(token) : null;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const booking = await Booking.findById(params.id).populate("event", "title date location");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // শুধু owner দেখতে পারবে
    if (booking.user.toString() !== decoded.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (err) {
    console.error("[BOOKING_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt<{ id: string }>(token) : null;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const booking = await Booking.findById(params.id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.user.toString() !== decoded.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await booking.deleteOne();

    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (err) {
    console.error("[BOOKING_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
