"use client";
import { useState, useEffect } from "react";
import { getCancelledOrders } from "@/utils/apiHelper";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MyCancellations() {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCancelledOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCancelledOrders("cancelled");

      if (result.success) {
        console.log("Cancelled orders:", result.orders);
        setCancelledOrders(result.orders.orders || []);
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      console.error("Error fetching cancelled orders:", err);
      setError("Failed to load cancelled orders");
      toast.error("Failed to load cancelled orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCancelledOrders();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "C":
        return "Cash on Delivery";
      case "E":
        return "eSewa Payment";
      default:
        return method;
    }
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900">
          MY CANCELLATIONS ({cancelledOrders.length})
        </h2>
        <button
          onClick={fetchCancelledOrders}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16 sm:py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 text-base sm:text-lg">
            Loading cancelled orders...
          </span>
        </div>
      ) : error ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-red-600 text-base sm:text-lg mb-4">{error}</div>
          <button
            onClick={fetchCancelledOrders}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      ) : cancelledOrders.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">
          No cancelled orders found.
        </div>
      ) : (
        cancelledOrders.map((order, index) => (
          <div
            key={order.id || index}
            className="bg-gray-50 rounded-lg shadow p-4 mb-6 border"
          >
            {/* Header: Order ID + Status */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-blue-700 font-semibold block">
                  Order #{order.order_number || order.id || index + 1}
                </span>
                <div className="text-sm text-gray-500">
                  Placed on {formatDate(order.created_at)}
                </div>
                <div className="text-sm text-gray-600">
                  Total Amount:{" "}
                  <strong>
                    Rs.{" "}
                    {order.total_amount ||
                      order.grand_total ||
                      order.total ||
                      0}
                  </strong>
                </div>
                <div className="text-sm text-gray-600">
                  Payment Method:{" "}
                  <strong>{getPaymentMethodText(order.payment_method)}</strong>
                </div>
                {order.updated_at && (
                  <div className="text-sm text-gray-600">
                    Cancelled At:{" "}
                    <strong>{formatDate(order.updated_at)}</strong>
                  </div>
                )}
                {order.invoice_email && (
                  <div className="text-sm text-gray-600">
                    Invoice Email: <strong>{order.invoice_email}</strong>
                  </div>
                )}
              </div>
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                Cancelled
              </span>
            </div>

            {/* Order Items */}
            {order.order_items && order.order_items.length > 0 && (
              <div className="border p-4 rounded flex flex-col gap-2">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Cancelled Items ({order.order_items.length}):
                </h4>
                {order.order_items.map((item, idx) => {
                  // Get image URL from the correct path
                  const imageUrl =
                    item.product?.image_full_url ||
                    item.product?.files_full_url?.[0] ||
                    "https://via.placeholder.com/80?text=No+Image";

                  // Get product name from the correct path
                  const productName = item.product?.product_name || "Product";

                  return (
                    <div
                      key={item.id || idx}
                      className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="w-14 h-14 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={productName}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-800 font-semibold">
                          {productName}
                        </div>
                        <div className="text-sm text-gray-700">
                          Qty:{" "}
                          <span className="text-blue-700 font-bold">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Product Code:{" "}
                          {item.product?.product_code ||
                            item.product_code ||
                            "N/A"}
                        </div>
                      </div>
                      <div className="text-right font-medium text-green-600">
                        Rs. {parseFloat(item.price || 0).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Order Summary */}
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2 text-sm">
                Order Summary:
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-red-700 font-medium">Subtotal:</span>
                  <span className="font-semibold text-red-800">
                    Rs. {parseFloat(order.subtotal || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-red-700 font-medium">Shipping:</span>
                  <span className="font-semibold text-red-800">
                    Rs. {parseFloat(order.shipping_cost || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-red-700 font-medium">Tax:</span>
                  <span className="font-semibold text-red-800">
                    Rs. {parseFloat(order.tax || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-red-700 font-medium">Discount:</span>
                  <span className="font-semibold text-red-800">
                    Rs. {parseFloat(order.discount || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-red-900 pt-2 border-t border-red-300">
                  <span>Grand Total:</span>
                  <span>
                    Rs.{" "}
                    {parseFloat(
                      order.total_amount ||
                        order.grand_total ||
                        order.total ||
                        0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
