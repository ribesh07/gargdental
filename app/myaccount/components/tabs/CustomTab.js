"use client";
import CancellationModal from "@/components/CancellationModal";
import { useState, useEffect } from "react";
import { getCancelledOrders, cancelOrder } from "@/utils/apiHelper";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import ReviewPage from "@/components/AddReview";

export default function CustomTab({ status }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [openOrders, setOpenOrders] = useState({});
  const [cancellationModal, setCancellationModal] = useState({
    isOpen: false,
    orderId: null,
    orderNumber: null,
  });
  const [orderlength, setOrderlength] = useState(0);
  const [showAddReview, setShowAddReview] = useState({});
  const [ischanged, setIsChanged] = useState(false);
  useEffect(() => {
    fetchOrders(status);
  }, [status, ischanged , cancellationModal.isOpen]);

  const fetchOrders = async (status) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCancelledOrders(status);

      if (result.success) {
        console.log("Cancelled orders:", result.orders);
        setOrders(result.orders.orders || []);
        setOrderlength(result.orders.count || 0);
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

  const closeCancellationModal = () => {
    setCancellationModal({
      isOpen: false,
      orderId: null,
      orderNumber: null,
    });
  };

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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "processing":
        return "bg-blue-100 text-blue-600";
      case "shipped":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-50 text-gray-600";
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

  const handleConfirmCancellation = async (
    orderId,
    reasonId,
    reasonDescription,
    iAgree
  ) => {
    try {
      console.log(orderId, reasonId, reasonDescription, iAgree);
      const result = await cancelOrder(
        orderId,
        reasonId,
        reasonDescription,
        iAgree
      );

      if (result.success) {
        // Remove the cancelled order from the current list
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );

        // Update the order count
        setOrderlength((prev) => Math.max(0, prev - 1));

        toast.success("Order cancelled successfully");
      } else {
        toast.error(result.error || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const toggleOrder = (orderId) => {
    setOpenOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleCancelOrder = (orderId, orderNumber) => {
    setCancellationModal({
      isOpen: true,
      orderId,
      orderNumber,
    });
  };

  const handleReturnOrder = (orderId, orderNumber) => {
    // Logic for handling return order can be added here
    console.log("Return order clicked for:", orderId, orderNumber);
    toast.error(`Return request for Order is not implemented yet.`);
  };

  const handleAddReview = (orderId, orderNumber, productId) => {
    console.log("Add review clicked for:", orderId, orderNumber, productId);
    const key = orderId + "-" + productId;
    setShowAddReview((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle
    }));
  };

  const handleCloseAddReview = (orderId, productId) => {
    setShowAddReview((prev) => ({
      ...prev,
      [orderId + "-" + productId]: false,
    }));
  };

  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center py-16 sm:py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 text-base sm:text-lg">
            Loading orders...
          </span>
        </div>
      ) : error ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-red-600 text-base sm:text-lg mb-4">{error}</div>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <div className="text-gray-500 text-base sm:text-lg mb-4">
            No orders found.
          </div>
          <div className="text-gray-400 text-xs sm:text-sm">
            You haven't placed any orders yet.
          </div>
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={order.id || index}
            className="bg-gray-50 rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6 border"
          >
            {/* Header: Order ID + Status */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4 w-full">
              {/* LEFT SIDE */}
              <div className="flex-1 min-w-0">
                <span className="text-blue-700 font-semibold block text-base sm:text-lg">
                  Order #{order.order_id}
                </span>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Placed on {formatDate(order.created_at)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  {order.order_items?.length > 0 && (
                    <span className="text-gray-500">
                      ({order.order_items.length} item Ordered)
                    </span>
                  )}
                </div>
                {order.invoice_email && (
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 break-all">
                    Invoice Email: <strong>{order.invoice_email}</strong>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end w-full lg:w-auto gap-2">
                {/* Order Status */}
                <span
                  className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full text-center break-words whitespace-normal w-full sm:w-auto max-w-full sm:max-w-[200px] lg:max-w-[150px] overflow-hidden ${getStatusColor(
                    order.order_status
                  )}`}
                >
                  {order.order_status}
                </span>

                {/* Cancel Button */}
                {order.order_status !== "cancelled" &&
                  order.order_status !== "shipped" &&
                  order.order_status !== "delivered" && (
                    <button
                      className="text-red-600 text-xs sm:text-sm font-bold underline px-3 py-1 rounded hover:bg-red-50 transition w-full sm:w-auto"
                      onClick={() =>
                        handleCancelOrder(order.id, order.order_id)
                      }
                    >
                      Cancel
                    </button>
                  )}

                {/* Return Button */}
                {order.order_status === "delivered" &&
                  order.return_available && (
                    <Link
                      href={`/myaccount/return?order_id=${order.order_id}`}
                      className="text-red-600 text-xs sm:text-sm font-bold underline px-3 py-1 rounded hover:bg-red-50 transition w-full sm:w-auto"
                    >
                      Return
                    </Link>
                  )}
              </div>
            </div>

            {/* Order Items Dropdown */}
            {order.order_items && order.order_items.length > 0 && (
              <div className="border p-2 border-blue-300  sm:p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    Order Items ({order.order_items.length}):
                  </h4>
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-blue-700 border border-blue-200 rounded hover:bg-blue-50 text-xs"
                    onClick={() => toggleOrder(order.id)}
                    aria-expanded={!!openOrders[order.id]}
                  >
                    {openOrders[order.id] ? "Hide" : "Show"}
                    <span
                      style={{
                        transform: openOrders[order.id]
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    ></span>
                  </button>
                </div>
                {openOrders[order.id] && (
                  <div>
                    <div className="space-y-3 sm:space-y-4">
                      {order.order_items.map((item, idx) => {
                        // Debug: Log the item structure to console
                        console.log(`Item ${idx}:`, item);

                        // Get image URL from the correct path
                        const imageUrl =
                          item.product?.image_full_url ||
                          item.product?.main_image_full_url ||
                          item.product?.files_full_url?.[0] ||
                          "/assets/logo.png";

                        // Get product name from the correct path
                        const productName =
                          item.product?.product_name || "Product";

                        // Get product code from the correct path
                        const productCode =
                          item.product?.product_code ||
                          item.product_code ||
                          "N/A";

                        return (
                          <div
                            key={item.id || idx}
                            className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-2 sm:p-3 bg-gray-50 rounded-lg "
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border-blue-300 border-2 flex-shrink-0 mx-auto sm:mx-0 mb-2 sm:mb-0">
                              <img
                                src={imageUrl}
                                alt={productName}
                                className="w-full h-full object-contain rounded-lg"
                                onLoad={() => {
                                  console.log(
                                    `Image loaded successfully for item ${idx}:`,
                                    imageUrl
                                  );
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0 w-full">
                              <div className="text-gray-800 font-semibold text-base sm:text-lg mb-1">
                                {productName}
                              </div>

                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                                {/* <div className="text-left">
                                  <div className="font-semibold text-green-600 text-base sm:text-lg">
                                    Rs. {parseFloat(item.price || 0).toFixed(2)}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500">
                                    Total: Rs.{" "}
                                    {parseFloat(
                                      item.subtotal_without_tax
                                    ).toFixed(2)}
                                  </div>
                                </div> */}
                                <div className="flex flex-col gap-1  sm:items-center ">
                                  <div className="text-xs sm:text-sm text-gray-700">
                                    <span className="font-medium">
                                      Quantity:
                                    </span>
                                    <span className="text-blue-700 font-bold ml-1">
                                      {item.quantity}
                                    </span>
                                  </div>
                                  {/* Show Add Review button only in delivered tab */}
                                  {status === "delivered" && (
                                    <div className="text-xs sm:text-sm text-gray-500">
                                      <button
                                        disabled={item.reviewed}
                                        onClick={() =>
                                          handleAddReview(
                                            order.id,
                                            order.order_id,
                                            item?.product?.product_code
                                          )
                                        }
                                        className={`text-white font-semibold 
                                         ${
                                           item.reviewed
                                             ? "bg-gray-400"
                                             : "bg-[#0072bc]"
                                         }
                                          m-2  px-2 py-2 rounded 
                                          ${
                                            item.reviewed
                                              ? "cursor-not-allowed"
                                              : "cursor-pointer"
                                          }
                                          ${
                                            item.reviewed
                                              ? ""
                                              : "hover:underline"
                                          }
                                          `}
                                      >
                                        {item.reviewed
                                          ? "Reviewed"
                                          : "Add Review"}
                                      </button>
                                      {showAddReview[
                                        order.id +
                                          "-" +
                                          item.product?.product_code
                                      ] && (
                                        <ReviewPage
                                          orderId={order.id}
                                          orderNumber={order.order_id}
                                          productId={item.product?.product_code}
                                          showAddReview={true}
                                          onClose={() => {
                                            setIsChanged(true);
                                            fetchOrders("delivered");
                                            handleCloseAddReview(
                                              order.id,
                                              item?.product?.product_code
                                            );
                                          }}
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">
                        Payment Information:
                      </h4>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div>
                          <div className="text-xs sm:text-sm text-blue-800">
                            <span className="font-medium">Payment Method:</span>{" "}
                            {getPaymentMethodText(order.payment_method)}
                          </div>
                          {order.invoice_email && (
                            <div className="text-xs sm:text-sm text-blue-700 mt-1">
                              <span className="font-medium">
                                Invoice Email:
                              </span>{" "}
                              {order.invoice_email}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xs sm:text-sm text-blue-600">
                            Order Status:{" "}
                            <span
                              className={`font-semibold ${getStatusColor(
                                order.order_status
                              )
                                .replace("bg-", "text-")
                                .replace("text-", "")}`}
                            >
                              {order.order_status || "Processing"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h4 className="font-semibold text-green-900 text-sm sm:text-base">
                          Order Summary:
                        </h4>
                        { order.payment_status === 'paid' ? 

                        <span className="text-sm sm:text-base font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                          PAID
                        </span>
                        :
                        <span className="text-sm sm:text-base font-medium 
                          px-3 py-1 rounded-full
                          bg-red-100 text-red-600">
                          Unpaid
                        </span>
                      }
                      </div>

                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-green-700 font-medium">
                            Subtotal:
                          </span>
                          <span className="font-semibold text-green-800">
                            Rs.{" "}
                            {parseFloat(
                              order.subtotal_without_tax || 0
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-green-700 font-medium">
                            Shipping:
                          </span>
                          <span className="font-semibold text-green-800">
                            Rs.{" "}
                            {parseFloat(order.shipping_cost || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-green-700 font-medium">
                            Tax:
                          </span>
                          <span className="font-semibold text-green-800">
                            Rs. {parseFloat(order.tax || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-green-700 font-medium">
                            Discount:
                          </span>
                          <span className="font-semibold text-green-800">
                            Rs. {parseFloat(order.discount).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-base sm:text-lg font-bold text-green-900 pt-2 border-t border-green-300">
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
                )}
              </div>
            )}

            {/* Payment Method */}
          </div>
        ))
      )}

      {/* Cancellation Modal */}
      <CancellationModal
        isOpen={cancellationModal.isOpen}
        onClose={closeCancellationModal}
        onConfirm={handleConfirmCancellation}
        orderId={cancellationModal.orderId}
        orderNumber={cancellationModal.orderNumber}
      />
    </div>
  );
}
