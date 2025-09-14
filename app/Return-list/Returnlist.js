"use client";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function MyReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReturns = async () => {
      setLoading(true);
      try {
        const response = await apiRequest("/customer/order/return-list", true);
        if (!response.success) {
          toast.error(
            response.errors?.[0]?.message ||
              "Failed to fetch returns, try again later!"
          );
          return;
        }
        console.log("response from fetchReturns", response);
        const data = response.returns || [];
        setReturns(data);
      } catch (error) {
        toast.error("Failed to fetch returns, try again later!");
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const mapStatus = (status) => {
    switch (status) {
      case 0:
        return { text: "Pending Approval", className: "text-orange-600" };
      case 1:
        return { text: "Approved", className: "text-blue-600" };
      case 2:
        return { text: "Label Sent", className: "text-purple-600" };
      case 3:
        return { text: "In Transit", className: "text-indigo-600" };
      case 4:
        return { text: "Received", className: "text-yellow-600" };
      case 5:
        return { text: "Rejected", className: "text-red-600" };
      case 6:
        return { text: "Refunded", className: "text-green-600" };
      case 7:
        return { text: "Escalated", className: "text-pink-600" };
      default:
        return { text: "Unknown", className: "text-gray-500" };
    }
  };

  return (
    <>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <div className="w-full flex flex-col items-center px-4 py-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">MY RETURNS</h2>

          {returns.length === 0 ? (
            <div className="text-gray-400 text-lg mt-12">No return records.</div>
          ) : (
            <div className="w-full flex flex-col items-center overflow-y-scroll h-96 sm:h-148 hide-scrollbar">
              <div className="w-full max-w-5xl space-y-6">
                {returns.map((item) => {
                  const statusInfo = mapStatus(item.return_status);

                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50 shadow rounded-xl p-4 hover:shadow-md transition"
                    >
                      {/* Header Row → Title + Status */}
                      <div className="flex items-start justify-between w-full">
                        <h3 className="text-base font-semibold text-gray-800">
                          Return ID: {item.return_id}
                        </h3>
                        <span
                          className={`text-sm font-semibold ${statusInfo.className}`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>

                      {/* Details */}
                      <p className="text-sm text-gray-500 mt-1">
                        Order ID: {item.order_id}
                      </p>
                      <p className="text-sm mt-1 text-gray-700">
                        Reason: {item.return_description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {item.created_at.split("T")[0]}
                      </p>

                      {/* Images */}
                      {item.image_full_url && item.image_full_url.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {item.image_full_url.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Return image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg "
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
