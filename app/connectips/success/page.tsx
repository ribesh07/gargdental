
'use client';

import { Suspense } from "react";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}



const validateConnectIPSTransaction = async (refId: string) => {
  const response = await apiRequest("/payment/ips/validate", true, {
       method: "POST",
       body: JSON.stringify({referenceId:refId}),
     });
  if (response.success === false) {
    throw new Error('Failed to validate transaction');
  }
  if(response.success){
    const data = response.response;
    console.log(data);
    return data;
  }
  return response.response;
};

export function SuccessClient() {
  const searchParams = useSearchParams();
  const TXNID = searchParams.get('TXNID') || null;

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (TXNID) {
      validateConnectIPSTransaction(TXNID)
        .then(setResult)
        .catch(console.error);
    }
  }, [TXNID]);

  if (!TXNID) return <div>NO transaction Id</div>;
  if (!result) return <div>Validating transaction...</div>;

  if (result.status === 'SUCCESS') {
    return (
      <div>
        <h1>Payment Success</h1>
        <p>Transaction ID: {TXNID}</p>
        <p>Status : {result.statusDesc}</p>
        <Link href="/">Back to Home →</Link>
      </div>
    );
  }
  if (result.status === 'ERROR') {
    return (
      <div>
        <h1>Validation Failed</h1>
        <p>Transaction ID: {TXNID}</p>
        <p>Message : {result.message}</p>
        <Link href="/">Back to Home →</Link>
      </div>
    );
  }


   return (
  <div>
    <h1>Payment Failed</h1>
    <p>Transaction ID: {TXNID}</p>
    <p>Message: {result.statusDesc || JSON.stringify(result)}</p>
    <Link href="/">Back to Home →</Link>
  </div>
);
}
