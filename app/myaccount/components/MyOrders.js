import useCartStore from "@/stores/useCartStore";

export default function MyOrders() {
  const orders = useCartStore((state) => state.orders) || [];
  const cancelOrder = useCartStore((state) => state.cancelOrder);
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
        MY ORDERS ({orders.length})
      </h2>
      {orders.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">
          No orders found.
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 mb-6 border"
          >
            {/* Header: Order ID + Status */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-blue-700 font-semibold block">
                  Order #{index + 1}
                </span>
                {order.accountNumber && (
                  <div className="text-xs text-gray-400 mb-1">
                    Account Number:{" "}
                    <span className="font-mono">{order.accountNumber}</span>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Placed on {new Date(order.date).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Pay Amount <strong>{order.total}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  Payment Method <strong>{order.paymentMethod}</strong>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.orderStatus || "Processing"}
                </span>
                {order.orderStatus !== "Cancelled" && (
                  <button
                    className="mt-2 text-red-600 text-sm font-bold underline px-5 py-2 rounded-full"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this order?"
                        )
                      ) {
                        cancelOrder(index);
                      }
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="mb-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {order.address?.fullName}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {order.address?.localAddress}, {typeof order.address?.zone === 'object' ? order.address?.zone?.zone_name : order.address?.zone}, {typeof order.address?.city === 'object' ? order.address?.city?.city : order.address?.city}, {typeof order.address?.province === 'object' ? order.address?.province?.name : order.address?.province}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {order.address?.phone}
              </div>
            </div>
            {/* Product Summary */}
            <div className="border p-4 rounded flex flex-col gap-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-semibold">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      Qty:{" "}
                      <span className="text-blue-700 font-bold">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-medium text-green-600">
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
