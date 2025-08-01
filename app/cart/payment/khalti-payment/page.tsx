"use client";

import React from "react";
import { useState, useEffect } from "react";
import Script from "next/script";

export default function KhaltiPayment() {
  const [amount, setAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetch("/api/dummy-data?method=khalti");
        if (!response.ok) {
          throw new Error("Failed to fetch dummy data");
        }
        const data = await response.json();
        setAmount(data.amount);
        setProductName(data.productName);
        setTransactionId(data.transactionId);
      } catch (error) {
        console.error("Error fetching dummy data:", error);
      }
    };

    fetchDummyData();
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "khalti",
          amount,
          productName,
          transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment initiation failed");
      }

      const data = await response.json();
      console.log("Payment data:", data.khaltiPaymentUrl);

      if (!data.khaltiPaymentUrl) {
        throw new Error("Khalti payment URL not received");
      }
      window.location.href = data.khaltiPaymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <Script
        src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js"
        strategy="lazyOnload"
      /> */}
      <div className="flex max-w-4xl max-h-50 mx-auto justify-center items-center min-h-screen bg-gray-50">
        <form onSubmit={handlePayment}>
          <div className="space-y-2">
            <label htmlFor="amount">Amount (NPR) : </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="productName">Product Name : </label>
            <input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

          </div>
          <div className="space-y-2">
            <label htmlFor="transactionId">Transaction ID : </label>
            <input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay with Khalti"}
          </button>
        </form>
      </div>
    </>
  );
}
