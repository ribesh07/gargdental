"use client";
import { useState } from "react";
import { HtmlContent } from "@/components/HtmlDataConversion";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [review, setReview] = useState("");

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className=" flex flex-col sm:flex-row gap-2 sm:gap-0 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-2 py-2 font-semibold ${
            activeTab === "description"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          DESCRIPTION
        </button>

        <button
          onClick={() => setActiveTab("specifications")}
          className={` px-2 py-2 font-semibold ${
            activeTab === "specifications"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          SPECIFICATIONS
        </button>

        <button
          onClick={() => setActiveTab("packaging")}
          className={` px-2 py-2 font-semibold ${
            activeTab === "packaging"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          PACKAGING
        </button>

        <button
          onClick={() => setActiveTab("warranty")}
          className={` px-2 py-2 font-semibold ${
            activeTab === "warranty"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          WARRANTY
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={` px-2 py-2 font-semibold ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          REVIEWS(0)
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "description" && (
          <div className="pl-2 sm:pl-4">
            <br />
            <HtmlContent html={product.description} className="table-auto" />
            <br />
            <br />
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="pl-2 sm:pl-4">
            <HtmlContent html={product.specification} className="table" />
          </div>
        )}
        {activeTab === "packaging" && (
          <div className="pl-2 sm:pl-4">
            <HtmlContent html={product.packaging} className="table" />
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="pl-2 sm:pl-4">
            <HtmlContent
              html={product.warranty}
              className="text-gray-700 mb-3 flex-grow"
            />
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="pl-2 sm:pl-4">
            <p className="mb-4">No reviews yet. Be the first to write one!</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thanks for your review! (Functionality not connected to backend yet)"
                );
                setReview(""); // clear after "submit"
              }}
            >
              <label className="block mb-2 font-semibold">
                Write your review:
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Your thoughts about the product..."
                className="w-full border border-gray-300 p-2 rounded-md"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="mt-3 bg-blue-700 text-white  px-2 py-2 rounded hover:bg-blue-800"
              >
                Submit Review
              </button>
            </form>
            <br />
            <strong>Slug: {product.slug}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
