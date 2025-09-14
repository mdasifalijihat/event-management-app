"use client";

import { useState, useEffect } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  // Fetch user events
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create new event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const newEvent = await res.json();
      setEvents([newEvent, ...events]);
      setForm({ title: "", description: "", date: "", location: "" });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Events</h1>

      {/* Create Event Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 grid gap-3"
      >
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white py-2 rounded">
          Create Event
        </button>
      </form>

      {/* Events List */}
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              📅 {new Date(event.date).toLocaleDateString()} | 📍{" "}
              {event.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
