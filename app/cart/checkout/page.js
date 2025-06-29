"use client";
import React, { useState } from "react";
import { Trash2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
// import MainTopBar from "@/components/mainTopbar";

export default function OrderSummary() {
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAddressType, setSelectedAddressType] = useState("");
  const router = useRouter();

  // Get selected items from Zustand store
  const selectedItems = useCartStore((state) => state.selectedItems);
  const setSelectedItems = useCartStore((state) => state.setSelectedItems);
  const selectedShippingAddress = useCartStore((state) => state.selectedShippingAddress);
  const userProfile = useCartStore((state) => state.userProfile);

  // Demo address data (replace with real user/account data)
  const homeAddress = {
    fullName: "Gyanendra Sah",
    phone: "9821212332",
    province: "Bagmati",
    city: "Kathmandu",
    zone: "Naxal",
    landmark: "Near Temple",
    localAddress: "Durbar Marg, Street 1",
    addressType: "Home",
  };
  const officeAddress = {
    fullName: "Gyanendra Sah",
    phone: "9821212332",
    province: "Bagmati",
    city: "Kathmandu",
    zone: "Durbarmarg",
    landmark: "Near Office Building",
    localAddress: "New Road, Street 5",
    addressType: "Office",
  };

  const handleProceedToPay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // alert("Please add an address to proceed.");
    }, 1000);
    router.push("/cart/checkout/pay-ops");
  };

  const handleRemoveItem = () => {
    alert("Item removed from cart");
  };

  // Calculate totals from selected items
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* <MainTopBar /> */}
      <div className="max-w-4xl mx-auto my-5 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
              ORDER SUMMARY
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Shipping & Product */}
            <div className="space-y-8">
              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  SHIPPING ADDRESS
                </h2>
                <div className="space-y-2">
                  {selectedShippingAddress ? (
                    <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700">
                      <div><span className="font-semibold">Name:</span> {selectedShippingAddress.fullName}</div>
                      <div><span className="font-semibold">Address:</span> {selectedShippingAddress.localAddress}, {selectedShippingAddress.zone}, {selectedShippingAddress.city}, {selectedShippingAddress.province}</div>
                      <div><span className="font-semibold">Phone:</span> {selectedShippingAddress.phone}</div>
                      <div className="text-gray-500 pt-1">{selectedShippingAddress.addressType} Address</div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No Shipping Address available.</p>
                  )}
                </div>
              </div>

              {/* Product Items */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                {selectedItems.length === 0 ? (
                  <div className="text-gray-500 text-center">No items selected.</div>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity x {item.quantity}</p>
                        <p className="font-semibold text-gray-800">Rs. {item.price}</p>
                      </div>
                      {/* Remove button can be implemented if needed */}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column - Billing & Payment */}
            <div className="space-y-8">
              {/* Invoice & Billing */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  INVOICE & BILLING
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Invoice Email
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail size={16} />
                      <span>{userProfile?.email || "No email available."}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Billing Address
                    </p>
                    {userProfile?.billingAddress ? (
                      <p className="text-sm text-gray-500">
                        {userProfile.billingAddress.localAddress}, {userProfile.billingAddress.zone}, {userProfile.billingAddress.city}, {userProfile.billingAddress.province} <br/>
                        {userProfile.billingAddress.fullName} ({userProfile.billingAddress.phone})
                      </p>
                    ) : selectedShippingAddress ? (
                      <p className="text-sm text-gray-500">
                        {selectedShippingAddress.localAddress}, {selectedShippingAddress.zone}, {selectedShippingAddress.city}, {selectedShippingAddress.province} <br/>
                        {selectedShippingAddress.fullName} ({selectedShippingAddress.phone})
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No Billing Address available.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Totals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    SUBTOTAL
                  </span>
                  <span className="font-semibold text-gray-800">
                    Rs. {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    SHIPPING
                  </span>
                  <span className="font-semibold text-gray-800">Rs. {shipping.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    GRAND TOTAL
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    Rs. {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Coupon Code */}
              <div>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>

              {/* Proceed to Pay */}
              <div className="space-y-4">
              
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    PROCEED TO PAY
                  </p>
                </div>

                <button
                  onClick={handleProceedToPay}
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    isProcessing
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-white-300"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Proceed to Pay"}
                </button>

                <div className="text-center">
                  <p className="text-sm text-red-500">
                    Please add an address{" "}
                    <button className="text-blue-500 hover:underline">
                      here
                    </button>{" "}
                    to proceed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
