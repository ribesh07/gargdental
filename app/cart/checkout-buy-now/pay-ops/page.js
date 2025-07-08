"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import { handleOrder } from "@/utils/apiHelper";
import useWarningModalStore from "@/stores/warningModalStore";
import { handleOrderBuyNow } from "@/utils/apiHelper";

const paymentMethods = [
  {
    id: "E",
    label: "eSewa Mobile Wallet",
    icon: (
      <img
        src="https://cdn.esewa.com.np/ui/images/esewa_og.png?111"
        alt="eSewa"
        className="h-10 mx-auto"
      />
    ), // You can use a local asset if you want
  },
  {
    id: "C",
    label: "Cash on Delivery",
    icon: <span className="text-4xl">🚚</span>,
  },
];

const esewaDescription = (
  <div className="mt-6 text-gray-700 text-sm">
    <p className="mb-2">
      You will be redirected to your eSewa account to complete your payment:
    </p>
    <ol className="list-decimal ml-5 mb-2">
      <li>Login to your eSewa account using your eSewa ID and Password.</li>
      <li>Ensure your eSewa account is active and has sufficient balance.</li>
      <li>
        Enter OTP (one-time password) sent to your registered mobile number.
      </li>
    </ol>
    <p className="font-bold text-gray-800 mb-2">
      ***Login with your eSewa mobile and PASSWORD (not MPin)***
    </p>
  </div>
);

const codDescription = (
  <div className="mt-6 text-gray-700 text-sm">
    <p className="mb-2">
      You have selected <span className="font-semibold">Cash on Delivery</span>.
      Your order will be processed and you can pay when your items are delivered
      to your address.
    </p>
    <ul className="list-disc ml-5 mb-2">
      <li>Please ensure your contact number and address are correct.</li>
      <li>Our delivery partner will contact you before delivery.</li>
    </ul>
    <p className="font-bold text-gray-800 mb-2">No advance payment required.</p>
  </div>
);

const PayOpsPageBuyNow = () => {
  const [selected, setSelected] = useState("E");
  const selectedItems = useCartStore((state) => state.selectedItems) || [];
  const selectedShippingAddress = useCartStore(
    (state) => state.selectedShippingAddress
  );
  const selectedBillingAddress = useCartStore(
    (state) => state.selectedBillingAddress
  );

  console.log("selectedShippingAddress", selectedShippingAddress);
  console.log("selectedBillingAddress", selectedBillingAddress);
  const email = useCartStore((state) => state.email);
  const addOrder = useCartStore((state) => state.addOrder);
  const router = useRouter();
  console.log("email", email);

  // Calculate totals from selected items
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const handleConfirmOrderBuyNow = async () => {
    const orderData = {
      payment_method: selected,
      billing_address: selectedBillingAddress.id,
      shipping_address: selectedShippingAddress.id,
      invoice_email: email,
      buy_now_item: {
        product_code: selectedItems[0].product_code,
        quantity: selectedItems[0].quantity,
      },
    };
    console.log("orderData", orderData);
    const result = await handleOrderBuyNow(orderData);
    console.log("result", result.message);
    addOrder({
      items: selectedItems,
      address: selectedShippingAddress,
      paymentMethod: selected,
      total,
      date: new Date().toISOString(),
    });
    router.push("/myaccount");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-8 uppercase">
        Select Payment Method
      </h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow p-8">
          <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelected(method.id)}
                className={`flex-1 border rounded-lg p-6 flex flex-col items-center justify-center transition-colors duration-150 cursor-pointer ${
                  selected === method.id
                    ? "border-blue-700 bg-blue-50 shadow"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {method.icon}
                <span className="mt-3 font-medium text-lg text-gray-800">
                  {method.label}
                </span>
              </button>
            ))}
          </div>

          {/* Description and Button */}
          {selected === "E" && (
            <>
              {esewaDescription}
              <button
                className="mt-6 w-full bg-blue-900 text-white py-3 rounded font-semibold text-lg hover:bg-blue-800 transition-colors cursor-pointer"
                onClick={() => alert("field to payment")}
              >
                Pay Now
              </button>
            </>
          )}
          {selected === "C" && (
            <>
              {codDescription}
              <button
                onClick={handleConfirmOrderBuyNow}
                className="mt-6 w-full bg-blue-900 text-white py-3 rounded font-semibold text-lg hover:bg-blue-800 transition-colors cursor-pointer"
              >
                Confirm Order
              </button>
            </>
          )}
        </div>

        {/* Order Summary + Selected Items & Address */}
        {/* Order Summary + Selected Items & Address */}
        <div className="bg-white rounded-xl shadow p-8 flex flex-col justify-center">
          {/* Shipping Address */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            {selectedShippingAddress ? (
              <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700 mb-2">
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedShippingAddress.full_name}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedShippingAddress.address},{" "}
                  {selectedShippingAddress.landmark},{" "}
                  {selectedShippingAddress.zone?.zone_name},{" "}
                  {selectedShippingAddress.city?.city},{" "}
                  {selectedShippingAddress.province?.province_name}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedShippingAddress.phone}
                </div>
                {/* <div className="text-gray-500 pt-1">
                    {selectedShippingAddress.address_type} Address
                  </div> */}
              </div>
            ) : (
              <div className="text-gray-400 text-sm mb-2">
                No Shipping Address
              </div>
            )}
          </div>
          {/* Selected Items with Images */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Order Items</h4>
            {selectedItems.length === 0 ? (
              <div className="text-gray-400 text-sm">No items selected.</div>
            ) : (
              <ul className="text-sm text-gray-800 space-y-3">
                {selectedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium text-green-700">
                      Rs. {item.price * (item.quantity || 1)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Order Summary */}
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">SUBTOTAL</span>
              <span className="font-bold text-lg">Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">SHIPPING</span>
              <span className="font-bold text-lg">Rs. {shipping}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-xl">GRAND TOTAL</span>
              <span className="font-bold text-xl">Rs. {total}</span>
            </div>
            <div className="text-right font-semibold text-gray-700 mt-2">
              All Tax Included.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayOpsPageBuyNow;
