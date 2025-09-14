// app/api/events/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { verifyJwt } from "@/lib/auth";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const event = await Event.findById(params.id).populate("createdBy", "name email");
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.error("[EVENT_GET_ERROR]", err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = token ? verifyJwt<{ id: string }>(token) : null;

    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, location, date, price, seats, image } = body;

    await dbConnect();

    const updated = await Event.findByIdAndUpdate(
      params.id,
      { title, description, location, date, price, seats, image },
      { new: true }
    );

    if (!updated) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("[EVENT_PUT_ERROR]", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
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

    const deleted = await Event.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  } catch (err) {
    console.error("[EVENT_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
