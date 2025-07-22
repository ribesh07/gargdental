"use client";
import { useState } from "react";
import { HtmlContent } from "@/components/HtmlDataConversion";
// import Reviews from "@/app/dashboard/[code]/Reviews";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [review, setReview] = useState("");

  const renderStars = (count) => {
    return "⭐️".repeat(count) + "☆".repeat(5 - count);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-full sm:max-w-3xl mx-auto">
  <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-4 border-b border-gray-300">

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
          REVIEWS
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {activeTab === "description" && (
          <div className="pl-2 sm:pl-4">
            <br />
            {product.description ? (
              <HtmlContent html={product.description} className="table-auto" />
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">
                No Description Available !
              </div>
            )}
            <br />
            <br />
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="pl-2 sm:pl-4">
            {product.specifications ? (
              <HtmlContent html={product.specifications} className="table" />
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">
                No Specifications Available !
              </div>
            )}
          </div>
        )}
        {activeTab === "packaging" && (
          <div className="pl-2 sm:pl-4">
            {product.packaging ? (
              <HtmlContent html={product.packaging} className="table" />
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">
                No Packaging Available !
              </div>
            )}
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="pl-2 sm:pl-4">
            {product.warranty ? (
              <HtmlContent html={product.warranty} className="table" />
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">
                No Warranty Available !
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="pl-2 sm:pl-4">
            {product.reviews.length > 0 ? (
              (console.log("product.reviews", product.reviews),
              (
                <div className="w-full flex flex-col items-center px-4 py-2">
                  <h2 className="text-[20px] font-semibold text-gray-800">
                    {product.reviews.length} Reviews
                  </h2>
                  {product.reviews.length === 0 ? (
                    <div className="text-gray-400 text-lg mt-12">....</div>
                  ) : (
                    <div className="w-full max-w-5xl h-80 space-y-6 overflow-y-scroll border-2 border-gray-200 rounded-2xl ">
                      {product.reviews?.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow rounded-xl p-4 hover:shadow-md transition "
                        >
                          {/* Product Info */}
                          <div className="flex items-start gap-4 w-full sm:w-2/3">
                            <div className="w-18 h-18 rounded justify-center overflow-hidden">
                              <img
                                src={
                                  item.customer?.image_full_url ||
                                  "assets/logo.png"
                                }
                                alt={item?.customer?.full_name}
                                className="w-full h-full object-cover p-2 m-2 rounded-full"
                              />
                            </div>

                            <div className="flex flex-col ml-1 self-center">
                              <h3 className="text-base font-semibold text-gray-800">
                                {item?.customer?.full_name}
                              </h3>
                              <p className="text-sm m-1 text-yellow-600">
                                {renderStars(parseInt(item.rating))}
                              </p>
                              <p className="text-sm m-1 text-gray-600">
                                {" "}
                                Description : {item.review_detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              // <Reviews products={product} />
              <p className="mb-4">No reviews yet. Be the first to write one!</p>
            )}
            {/*data fecth */}
          </div>
        )}
      </div>
    </div>
  );
}
