"use client";
import { useState, useEffect } from "react";
import { getCustomerOrders, cancelOrder } from "@/utils/apiHelper";
import useConfirmModalStore from "@/stores/confirmModalStore";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";
import CancellationModal from "@/components/CancellationModal";
import CustomTab from "./tabs/CustomTab";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderlength, setOrderlength] = useState(0);

  const [activeTab, setActiveTab] = useState("Processing");
  const [openOrders, setOpenOrders] = useState({});
  const [cancellationModal, setCancellationModal] = useState({
    isOpen: false,
    orderId: null,
    orderNumber: null,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCustomerOrders();

      console.log("API Response:", result);

      if (result.success) {
        console.log("Orders data:", result.orders);

        // Log the first order's complete structure
        if (result.orders && result.orders.orders.length > 0) {
          console.log(
            "First order complete structure:",
            JSON.stringify(result.orders[0], null, 2)
          );

          // Log items from the first order if they exist
          if (result.orders.orders[0].items) {
            console.log("First order items:", result.orders.orders[0].items);
            if (result.orders.orders[0].items.length > 0) {
              console.log(
                "First item complete structure:",
                JSON.stringify(result.orders.orders[0].items[0], null, 2)
              );
            }
          }
        }

        setOrderlength(result.orders.count || 0);
        console.log("orderlength", result.orders.count);
        setOrders(result.orders.orders);
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      // console.error("Error fetching orders:", err);
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId, orderNumber) => {
    setCancellationModal({
      isOpen: true,
      orderId,
      orderNumber,
    });
  };

  const handleConfirmCancellation = async (
    orderId,
    reasonId,
    reasonDescription
  ) => {
    try {
      const result = await cancelOrder(orderId, reasonId, reasonDescription);

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

  const toggleOrder = (orderId) => {
    setOpenOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="w-full p-2 sm:p-4 md:p-6  min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">
          MY ORDERS
        </h2>
      </div>
      <div>
        {/* Tabs */}
        <div className="flex flex-col lg:flex-row gap-4 justify-around p-4 rounded-xl shadow">


          <button
            onClick={() => setActiveTab("Processing")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "Processing"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-blue-100"
            }`}
          >
            Processing
          </button>

          <button
            onClick={() => setActiveTab("Shipped")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "Shipped"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-blue-100"
            }`}
          >
            Shipped
          </button>

          <button
            onClick={() => setActiveTab("Delivered")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "Delivered"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-green-100"
            }`}
          >
            Delivered
          </button>

          <button
            onClick={() => setActiveTab("Cancelled")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === "Cancelled"
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-red-100"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "Processing" && (
          <div className=" p-4 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Orders Currently Processing
            </h2>
            <CustomTab status="processing" />
          </div>
        )}

        {activeTab === "Shipped" && (
          <div className="bg-gray-50 p-4 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Orders Shipped
            </h2>
            <CustomTab status="shipped" />
          </div>
        )}

        {activeTab === "Delivered" && (
          <div className="bg-gray-50 p-4 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Orders Delivered
            </h2>
            <CustomTab status="delivered" />
          </div>
        )}

        {activeTab === "Cancelled" && (
          <div className="bg-gray-50 p-4 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Orders Cancelled
            </h2>
            <CustomTab status="cancelled" />
          </div>
        )}
      </div>
    </div>
  );
}
