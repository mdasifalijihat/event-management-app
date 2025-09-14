"use client";

import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
