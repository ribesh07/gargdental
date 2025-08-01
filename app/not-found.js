// app/not-found.tsx
"use client";
import React from "react";
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">
        Oops! That page could not be found.
      </p>
      <a
        href="/dashboard"
        className="text-white bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 transition"
      >
        Go Back Home
      </a>
    </main>
  );
}
