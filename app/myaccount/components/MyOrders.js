"use client";
import { useState, useEffect } from "react";
import { getCustomerOrders } from "@/utils/apiHelper";
import useConfirmModalStore from "@/stores/confirmModalStore";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrders, setOpenOrders] = useState({});

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCustomerOrders();
      
      console.log("API Response:", result);
      
      if (result.success) {
        console.log("Orders data:", result.orders);
        
        // Log the first order's complete structure
        if (result.orders && result.orders.length > 0) {
          console.log("First order complete structure:", JSON.stringify(result.orders[0], null, 2));
          
          // Log items from the first order if they exist
          if (result.orders[0].items) {
            console.log("First order items:", result.orders[0].items);
            if (result.orders[0].items.length > 0) {
              console.log("First item complete structure:", JSON.stringify(result.orders[0].items[0], null, 2));
            }
          }
        }
        
        setOrders(result.orders);
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = (orderId) => {
    useConfirmModalStore.getState().open({
      title: "Cancel Order",
      message: "Are you sure you want to cancel this order?",
      onConfirm: () => {
        // TODO: Implement cancel order API call
        toast.error("Cancel order functionality not implemented yet");
      },
      onCancel: () => {},
    });
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'processing':
        return 'bg-blue-100 text-blue-600';
      case 'shipped':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'C':
        return 'Cash on Delivery';
      case 'E':
        return 'eSewa Payment';
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
    <div className="w-full p-2 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900">
          MY ORDERS ({orders.length})
        </h2>
        <button
          onClick={fetchOrders}
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
          <span className="ml-2 text-gray-600 text-base sm:text-lg">Loading orders...</span>
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
          <div className="text-gray-500 text-base sm:text-lg mb-4">No orders found.</div>
          <div className="text-gray-400 text-xs sm:text-sm">
            You haven't placed any orders yet.
          </div>
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={order.id || index}
            className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6 border"
          >
            {/* Header: Order ID + Status */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
              <div className="flex-1 w-full">
                <span className="text-blue-700 font-semibold block text-base sm:text-lg">
                  Order #{order.order_number || order.id || index + 1}
                </span>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Placed on {formatDate(order.created_at)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  Total Amount: <strong>Rs. {order.total_amount || order.grand_total || order.total || 0}</strong>
                  {order.order_items && order.order_items.length > 0 && (
                    <span className="ml-2 text-gray-500">
                      ({order.order_items.length} item{order.order_items.length > 1 ? 's' : ''})
                    </span>
                  )}
                </div>
                {order.invoice_email && (
                  <div className="text-xs sm:text-sm text-gray-600">
                    Invoice Email: <strong>{order.invoice_email}</strong>
                  </div>
                )}
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                <span
                  className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full ${getStatusColor(order.order_status)}`}
                >
                  {order.order_status || "Processing"}
                </span>
                {order.order_status !== "cancelled" && (
                  <button
                    className="text-red-600 text-xs sm:text-sm font-bold underline px-3 sm:px-5 py-1 sm:py-2 rounded-full hover:bg-red-50 cursor-pointer"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Address Information
            {order.billing_address && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Billing Address:</h4>
                <div className="text-xs sm:text-sm text-gray-700">
                  <div><span className="font-medium">Name:</span> {order.billing_address.full_name}</div>
                  <div><span className="font-medium">Phone:</span> {order.billing_address.phone}</div>
                  <div><span className="font-medium">Address:</span> {order.billing_address.address}</div>
                  {order.billing_address.landmark && (
                    <div><span className="font-medium">Landmark:</span> {order.billing_address.landmark}</div>
                  )}
                </div>
              </div>
            )} */}

            {/* Order Items Dropdown */}
            {order.order_items && order.order_items.length > 0 && (
              <div className="border p-2 border-blue-300  sm:p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 sm:gap-0">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Order Items ({order.order_items.length}):</h4>
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-blue-700 border border-blue-200 rounded hover:bg-blue-50 text-xs"
                    onClick={() => toggleOrder(order.id)}
                    aria-expanded={!!openOrders[order.id]}
                  >
                    {openOrders[order.id] ? "Hide" : "Show"}
                    <span style={{transform: openOrders[order.id] ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}>
                      
                    </span>
                  </button>
                </div>
                {openOrders[order.id] && (
                  <div className="space-y-3 sm:space-y-4">
                    {order.order_items.map((item, idx) => {
                      // Debug: Log the item structure to console
                      console.log(`Item ${idx}:`, item);
                      
                      // Get image URL from the correct path
                      const imageUrl = 
                        item.product?.image_full_url || 
                        item.product?.files_full_url?.[0] ||
                        "https://via.placeholder.com/80?text=No+Image";
                      
                      // Get product name from the correct path
                      const productName = 
                        item.product?.product_name ||
                        "Product";
                      
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
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden border flex-shrink-0 mx-auto sm:mx-0 mb-2 sm:mb-0">
                            <img
                              src={imageUrl}
                              alt={productName}
                              className="w-full h-full object-contain rounded-lg"
                              onError={(e) => {
                                console.log(`Image failed to load for item ${idx}:`, imageUrl);
                                e.target.src = "https://via.placeholder.com/80?text=No+Image";
                              }}
                              onLoad={() => {
                                console.log(`Image loaded successfully for item ${idx}:`, imageUrl);
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <div className="text-gray-800 font-semibold text-base sm:text-lg mb-1">
                              {productName}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                              <span className="font-medium">Product Code:</span> {productCode}
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                              <div className="text-xs sm:text-sm text-gray-700">
                                <span className="font-medium">Quantity:</span> 
                                <span className="text-blue-700 font-bold ml-1">{item.quantity}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-600 text-base sm:text-lg">
                                  Rs. {parseFloat(item.price || 0).toFixed(2)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">
                                  Total: Rs. {(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Payment Method */}
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Payment Information:</h4>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <div>
                  <div className="text-xs sm:text-sm text-blue-800">
                    <span className="font-medium">Payment Method:</span> {getPaymentMethodText(order.payment_method)}
                  </div>
                  {order.invoice_email && (
                    <div className="text-xs sm:text-sm text-blue-700 mt-1">
                      <span className="font-medium">Invoice Email:</span> {order.invoice_email}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs sm:text-sm text-blue-600">
                    Order Status: <span className={`font-semibold ${getStatusColor(order.order_status).replace('bg-', 'text-').replace('text-', '')}`}> 
                      {order.order_status || "Processing"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2 sm:mb-3 text-sm sm:text-base">Order Summary:</h4>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-green-700 font-medium">Subtotal:</span>
                  <span className="font-semibold text-green-800">Rs. {parseFloat(order.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-green-700 font-medium">Shipping:</span>
                  <span className="font-semibold text-green-800">Rs. {parseFloat(order.shipping_cost || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-green-700 font-medium">Tax:</span>
                  <span className="font-semibold text-green-800">Rs. {parseFloat(order.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-green-700 font-medium">Discount:</span>
                  <span className="font-semibold text-green-800">Rs. {parseFloat(order.discount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-green-900 pt-2 border-t border-green-300">
                  <span>Grand Total:</span>
                  <span>Rs. {parseFloat(order.total_amount || order.grand_total || order.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
