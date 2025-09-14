import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-32">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600 text-white text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Manage Your Events Easily</h1>
        <p className="text-xl mb-6">Create, Book, and Track Events with our App</p>
        <Link href="/auth/register" className="bg-white text-blue-600 px-6 py-3 rounded font-bold hover:bg-gray-100">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Create Events</h3>
          <p>Easily add and manage your events with simple UI.</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Book & Track</h3>
          <p>Track bookings and user registrations seamlessly.</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Dashboard</h3>
          <p>View your events and bookings in a single dashboard.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold">What Users Say</h2>
        <p className="max-w-2xl mx-auto">"This app made managing events so simple!" - Jane D.</p>
        <p className="max-w-2xl mx-auto">"I can now track bookings easily and efficiently." - Mark S.</p>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto p-8 space-y-4">
        <h2 className="text-3xl font-bold mb-4 text-center">FAQ</h2>
        <div>
          <h4 className="font-semibold">Q: Can I manage multiple events?</h4>
          <p>A: Yes! You can create, edit, and delete as many events as you want.</p>
        </div>
        <div>
          <h4 className="font-semibold">Q: Is booking free?</h4>
          <p>A: Yes, currently booking is free in this demo version.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center p-16 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Start Managing Your Events Today</h2>
        <Link href="/auth/register" className="bg-white text-blue-600 px-6 py-3 rounded font-bold hover:bg-gray-100">
          Sign Up Now
        </Link>
      </section>
    </main>
  );
}
