"use client";
import { useState } from "react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "description"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          REVIEWS (0)
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "description" && (
          <div>
            <br />
            <strong>{product.description}</strong>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <p>No reviews yet. Be the first to write one!</p>
            <br />
            <strong>Slug: {product.slug}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
