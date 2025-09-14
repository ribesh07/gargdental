"use client";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullScreenLoader from "@/components/FullScreenLoader";
import Link from "next/link";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        const response = await apiRequest("/customer/reviews/list", true);
        if (!response.success) {
          toast.error(
            response.errors[0]?.message ||
              "Failed to fetch reviews , Try again later !"
          );
          return;
        }
        console.log("response from fetchReview", response);
        const data = response.reviews;
        setReviews(data);
      } catch (error) {
        toast.error("Failed to fetch reviews , Try again later !");
        // console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, []);

  const renderStars = (count) => {
    return "⭐️".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <div className="w-full flex flex-col items-center px-4 py-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">MY REVIEWS</h2>

          {reviews.length === 0 ? (
            <div className="text-gray-400 text-lg mt-12">No data record.</div>
          ) : (
            <div className="w-full flex flex-col items-center overflow-y-scroll h-96 sm:h-148 hide-scrollbar">
              <div className="w-full max-w-5xl space-y-6">
                {reviews.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 shadow rounded-xl p-4 hover:shadow-md transition"
                  >
                    {/* Product Info */}
                    <div className="flex items-start gap-4 w-full sm:w-2/3">
                      <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden">
                        <img
                          src={
                            item.product?.image_full_url ||
                            item.product?.files_full_url[0] ||
                            item.product?.main_image_full_url ||
                            "/assets/logo.png"
                          }
                          alt={item?.product?.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                           <Link href={`/dashboard/${item.product_code}`}>
                            <h3 className="text-base font-semibold text-gray-800 cursor-pointer hover:text-blue-600 hover:underline">
                              {item?.product?.product_name}
                            </h3>
                          </Link>
                            <p className="text-sm text-gray-500 mt-1 mb-1">
                              OrderID: {item.order_id}
                            </p>
                              {item.image_full_url && item.image_full_url.length > 0 && (
                              <div className="flex gap-2">
                                {item.image_full_url.map((image, index) => (
                                  <div
                                    key={index}
                                    className="w-16 h-16 bg-gray-50 m-1 rounded overflow-hidden"
                                  >
                                    <img
                                      src={image}
                                      alt={
                                        item?.product?.product_name ||
                                        `Image ${index + 1}`
                                      }
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            <p className="text-sm m-2 text-yellow-600">
                              {renderStars(item.rating)}
                            </p>
                            Description : {item.review_detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
