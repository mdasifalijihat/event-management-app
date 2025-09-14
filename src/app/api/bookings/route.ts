// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Booking from "@/models/Booking";
import Event from "@/models/Event";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt<{ id: string }>(token) : null;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const bookings = await Booking.find({ user: decoded.id })
      .populate("event", "title date location")
      .sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (err) {
    console.error("[BOOKINGS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt<{ id: string }>(token) : null;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { eventId, name, email, seats } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const booking = await Booking.create({
      user: decoded.id,
      event: eventId,
      name,
      email,
      seats: seats || 1,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (err) {
    console.error("[BOOKINGS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
