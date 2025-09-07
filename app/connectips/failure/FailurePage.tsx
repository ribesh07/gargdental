"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";


const FailurePage = () => {
  const searchParams = useSearchParams();
  const TXNID = searchParams.get("TXNID") || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Error Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
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
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            PAYMENT FAILURE
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
                PAYMENT FAILED{" "}
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
};

export default FailurePage;