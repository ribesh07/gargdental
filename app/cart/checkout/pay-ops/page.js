"use client";

import { useState } from "react";

const paymentMethods = [
  {
    id: "esewa",
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
    id: "cod",
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

const PayOpsPage = () => {
  const [selected, setSelected] = useState("esewa");

  // Hardcoded summary values for demo
  const subtotal = 900;
  const shipping = 70;
  const total = subtotal + shipping;

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
                className={`flex-1 border rounded-lg p-6 flex flex-col items-center justify-center transition-colors duration-150 ${
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
          {selected === "esewa" && (
            <>
              {esewaDescription}
              <button className="mt-6 w-full bg-blue-900 text-white py-3 rounded font-semibold text-lg hover:bg-blue-800 transition-colors">
                Pay Now
              </button>
            </>
          )}
          {selected === "cod" && (
            <>
              {codDescription}
              <button
                onClick={() => alert("Order Placed Successfully")}
                className="mt-6 w-full bg-blue-900 text-white py-3 rounded font-semibold text-lg hover:bg-blue-800 transition-colors"
              >
                Confirm Order
              </button>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-8 flex flex-col justify-center">
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

export default PayOpsPage;
