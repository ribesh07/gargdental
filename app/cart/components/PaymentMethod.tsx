"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const paymentMethods = [
  { name: "eSewa", color: "bg-green-500" },
  { name: "Khalti", color: "bg-purple-500" },
];

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const { push } = useRouter();

  const handlePayment = (method: string) => {
    switch (method) {
      case "eSewa":
        push("/cart/payment/esewa-payment");
        break;
      case "Khalti":
        push("/cart/payment/khalti-payment");
        break;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">Select a Payment Method</h2>
      <div className="flex gap-4">
        {paymentMethods.map((method) => (
          <button
            type="button"
            key={method.name}
            onClick={() => setSelectedMethod(method.name)}
            className={`px-6 py-3 rounded-lg text-white font-medium transition ${
              method.color
            } ${
              selectedMethod === method.name
                ? "ring-4 ring-offset-2 ring-black"
                : "opacity-80"
            }`}
          >
            {method.name}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          if (selectedMethod) {
            handlePayment(selectedMethod);
          } else {
            alert("Please select a payment method first.");
          }
        }}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </div>
  );
}
