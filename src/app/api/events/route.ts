// app/api/events/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().populate("createdBy", "name email").sort({ date: 1 });
    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error("[EVENTS_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, location, date, price, seats, image } = body;

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt<{ id: string }>(token) : null;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const newEvent = await Event.create({
      title,
      description,
      location,
      date,
      price,
      seats,
      image,
      createdBy: decoded.id,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (err) {
    console.error("[EVENTS_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
