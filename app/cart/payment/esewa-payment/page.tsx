"use client";
import React from "react";
import { useState, useEffect } from "react";

import { DummyDataResponse } from "@/utils/payments/types";
import { toast } from "react-hot-toast";

interface EsewaConfig {
  tax_amount: number;
  total_amount: number;
  transaction_uuid: string;
  product_code: string;
  product_service_charge: number;
  product_delivery_charge: number;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

interface PaymentResponse {
  amount: string;
  esewaConfig: EsewaConfig;
}

export default function EsewaPayment() {
  const [amount, setAmount] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchDummyData = async () => {
      try {
        const response = await fetch("/api/dummy-data?method=esewa");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DummyDataResponse = await response.json();
        setAmount(data.amount);
        setProductName(data.productName);
        setTransactionId(data.transactionId);

        console.log(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error fetching dummy data:", errorMessage);

        toast.error(
           "Error loading data"
        );
      }
    };

    fetchDummyData();
  }, []);
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "esewa",
          amount,
          productName,
          transactionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Payment initiation failed: ${response.statusText}`);
      }

      const paymentData: PaymentResponse = await response.json();
     toast.success("Payment initiated successfully!");
     console.log(paymentData);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const esewaPayload = {
        amount: paymentData.amount,
        tax_amount: paymentData.esewaConfig.tax_amount,
        total_amount: paymentData.esewaConfig.total_amount,
        transaction_uuid: paymentData.esewaConfig.transaction_uuid,
        product_code: paymentData.esewaConfig.product_code,
        product_service_charge: paymentData.esewaConfig.product_service_charge,
        product_delivery_charge:
          paymentData.esewaConfig.product_delivery_charge,
        success_url: paymentData.esewaConfig.success_url,
        failure_url: paymentData.esewaConfig.failure_url,
        signed_field_names: paymentData.esewaConfig.signed_field_names,
        signature: paymentData.esewaConfig.signature,
      };
      console.log({ esewaPayload });
      Object.entries(esewaPayload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Payment error:", errorMessage);
      setError("Payment initiation failed. Please try again.");
      toast.error("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex space-y-4 items-center justify-center p-4">
    
          <form onSubmit={handlePayment}>
            
            <div className="space-y-2 space-x-1">
              <label htmlFor="amount">Amount (NPR)</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                step="0.01"
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                placeholder="Enter product name"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="transactionId">Transaction ID</label>
              <input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                placeholder="Enter transaction ID"
                maxLength={50}
              />
            </div>
    
          
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading || !amount || !productName || !transactionId}
            >
              {isLoading ? "Processing..." : "Pay with eSewa"}
            </button>
        
        </form>
         
      {error && <p>{error}</p>}
    </div>
  );
}