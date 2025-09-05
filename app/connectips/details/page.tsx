"use client";

import React, { useState } from "react";

const validateConnectIPSTransaction = async ({
  refId,
  amount,
}: {
  refId: string;
  amount: string | number;
}) => {
  const transactionDetails = {
    REFERENCEID: refId,
    TXNAMT: amount,
  };

  try {
    const response = await fetch(`/connectips/get_details`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionDetails),
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to get details of transaction");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

const TransactionDetailsPage = ({
  searchParams,
}: {
  searchParams: { TXNID?: string };
}) => {
  const TXNID = searchParams.TXNID;
  const [data, setData] = useState<any>(null);

  if (!TXNID) {
    return <div>No Transaction ID provided.</div>;
  }

  const handleClick = async () => {
    alert("Transaction Validated Successfully");
    const res = await validateConnectIPSTransaction({
      refId: TXNID,
      amount: 1000, // fetch from db
    });

    if (!res || res.status !== "SUCCESS") {
      alert("Failed to fetch transaction details");
      return;
    }

    setData(res);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Transaction Details</h1>
      <p>Transaction ID: {TXNID}</p>

      <button
        className="btn btn-primary bg-blue-200 text-black mt-4 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-transform duration-300 ease-in-out"
        onClick={handleClick}
      >
        Validate Transaction
      </button>

      {data && (
        <div className="mt-4">
          <h2 className="font-semibold">Details:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TransactionDetailsPage;
