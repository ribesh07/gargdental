"use client";
import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get("method");

  useEffect(() => {
    if (method) {
      console.log(`Payment successful via ${method}`);
    }
  }, [method]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
       <div className="space-y-4">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                Thank you for your payment. Your transaction has been completed
                successfully.
              </p>
              {method && (
                <p className="text-sm text-gray-500">
                  Payment method:{" "}
                  <span className="font-semibold">{method}</span>
                </p>
              )}
            </div>
          </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}