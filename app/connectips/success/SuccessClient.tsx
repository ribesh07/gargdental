
"use client"

import Link from "next/link";
import { useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { apiRequest } from '@/utils/ApiSafeCalls'
import FullScreenLoader from "@/components/FullScreenLoader";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const TXNID = searchParams.get("TXNID") || null;

  const [result, setResult] = useState<any>(null);

  const validateConnectIPSTransaction = async (refId: string) => {
    const response = await apiRequest("/payment/ips/validate", true, {
      method: "POST",
      body: JSON.stringify({ referenceId: refId }),
    });
    if (!response.success) {
      setResult([
        {
          status: "FAIILED",
        },
      ]);
    }
    if (response.success) {
      const data = response.response;
      console.log(data);
      return data;
    }
    return response;
  };

  useEffect(() => {
    if (TXNID) {
      validateConnectIPSTransaction(TXNID).then(setResult).catch(console.error);
    }
  }, [TXNID]);

  if (!TXNID) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            No Transaction ID
          </h1>
          <p className="text-gray-600 mb-8">
            Unable to process the payment verification.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Home
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }
  if (!result) return <FullScreenLoader />;

  if (result.status === "SUCCESS") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-50 text-green-600">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Payment Successful!
            </h1>
            <p className="text-green-100 text-center">
              Your transaction has been completed successfully
            </p>
          </div>

          {/* Success Content */}
          <div className="px-8 py-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center py-2 gap-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-600 font-medium">
                  Transaction ID{" "}
                </span>
                <span className="text-gray-900 font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                  {TXNID}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6 sm:flex-col flex-row">
              <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Payment Verified</span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Back to Home
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (result.status === "ERROR") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Error Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Something Went Wrong
            </h1>

            <p className="text-red-100 text-center">
              There was an issue processing your payment
            </p>
          </div>

          {/* Error Content */}
          <div className="px-8 py-6">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">
                  Transaction ID
                </span>
                <span className="text-gray-900 font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                  {TXNID}
                </span>
              </div>
              <div className="flex justify-between items-start py-2">
                <span className="text-gray-600 font-medium">Error</span>
                <span className="text-red-600 font-medium text-right text-sm">
                  {result.statusDesc}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-full">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Transaction Failed</span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Back to Home
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Error Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Something Went Wrong
          </h1>
          <p className="text-red-100 text-center">
            There was an issue processing your payment
          </p>
        </div>

        {/* Error Content */}
        <div className="px-8 py-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Transaction ID</span>
              <span className="text-gray-900 font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                {TXNID}
              </span>
            </div>
            <div className="flex justify-between items-start py-2">
              <span className="text-gray-600 font-medium">STATUS</span>
              <span className="text-red-600 font-medium text-right text-sm">
                FAILED TO VALIDATE{" "}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-full">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">Transaction Failed</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Home
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
