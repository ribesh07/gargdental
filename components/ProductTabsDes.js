"use client";
import { useState } from "react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [review, setReview] = useState("");

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

        <button
          onClick={() => setActiveTab("specifications")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "specifications"
              ? "border-b-2 border-blue-700 text-blue-700"
              : "text-gray-600"
          }`}
        >
          SPECIFICATIONS
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "description" && (
          <div>
            <br />
            <strong>{product.description}</strong>
            <br />
            <br />
            <p className="bg-gray-100">
              Fleximeter Strips BK 253 are precision-engineered dental strips
              used for measuring and checking the clearance and contact points
              between teeth. They assist in verifying occlusal space, ensuring
              proper fit for crowns, bridges, and other prosthetic work. Made
              from high-quality, flexible material, these strips provide
              accurate, reliable results without damaging tooth surfaces.
            </p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
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
                className="mt-3 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Submit Review
              </button>
            </form>
            <br />
            <strong>Slug: {product.slug}</strong>
          </div>
        )}
        {activeTab === "specifications" && (
          <div>
            <div className="p-4">
              <table className="min-w-full table-auto border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-[#0072bc] px-4 py-2 text-left">
                      Feature
                    </th>
                    <th className=" px-4 py-2 text-[#0072bc] text-left">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className=" px-4 py-2">Product Name</td>
                    <td className=" px-4 py-2">Fleximeter Strips BK 253</td>
                  </tr>
                  <tr>
                    <td className=" px-4 py-2">Material</td>
                    <td className=" px-4 py-2">Flexible plastic or polymer</td>
                  </tr>
                  <tr>
                    <td className=" px-4 py-2">Thickness Range</td>
                    <td className=" px-4 py-2">
                      0.05 mm, 0.10 mm, 0.20 mm (varies by set)
                    </td>
                  </tr>
                  <tr>
                    <td className=" px-4 py-2">Color Coding</td>
                    <td className=" px-4 py-2">
                      Color-coded for easy thickness identification
                    </td>
                  </tr>
                  <tr>
                    <td className=" px-4 py-2">Application</td>
                    <td className=" px-4 py-2">
                      Checking prosthetic fit, occlusal clearance, marginal fit
                    </td>
                  </tr>
                  <tr>
                    <td className=" px-4 py-2">Packaging</td>
                    <td className=" px-4 py-2">
                      Set of strips with multiple thickness options
                    </td>
                  </tr>
                  <tr>
                    <td className=" px-4 py-2">Sterilization</td>
                    <td className=" px-4 py-2">
                      Disposable, not intended for sterilization
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
