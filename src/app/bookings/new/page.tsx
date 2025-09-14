"use client";

import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">
              {booking.event?.title || "Deleted Event"}
            </h2>
            <p>👤 {booking.name}</p>
            <p>✉️ {booking.email}</p>
            <p>🎟️ Seats: {booking.seats}</p>
            <p className="text-sm text-gray-500">
              📅 {new Date(booking.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
