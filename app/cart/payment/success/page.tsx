"use client";
import React from "react";
import { useEffect , useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import toast from "react-hot-toast";

function PaymentSuccessContent() {

  const searchParams = useSearchParams();
  const method = searchParams?.get("method");
  const encodeddata = searchParams?.get("data");
  const [loading, setLoading] = useState(false);
  type EsewaDecodedData = {
  status: string;
  transaction_code?: string;
  total_amount?: string;
  transaction_uuid?: string;
  product_code?: string;
  signature?: string;
};

const [decodedData, setDecodedData] = useState<EsewaDecodedData | null>(null);


  useEffect( () => {
    const decodeapi = async () => {
        const response = await fetch("/api/decode-esewa", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            console.log(data);
            if(data.success){
                console.log(data.decoded);
                toast.success(data.decoded.status);
            }
            else{
                toast.error(data.error || "Something went wrong , try again later");
            }

    }
    if (encodeddata) {
        setLoading(true);
        console.log(`Encoded data: ${encodeddata}`);
        try {
            const decodedData = atob(encodeddata);
            const jsonData = JSON.parse(decodedData);
            console.log(`Decoded data: ${jsonData}`);
            // decodeapi();
            console.log(jsonData.status);
            setDecodedData(jsonData);
        } catch (error) {
            console.error("Error decoding data:", error);   
        }finally{
            setLoading(false);
        }
    }
    if(method){
          console.log(`Payment successful via ${method}`);
    }
  }, [encodeddata , method]);

  if(loading){
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Loader2 className="animate-spin" />
        </div>
      );
  }
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
              {!method && decodedData && (
                <div>
                <p className="text-sm  text-gray-500">
                  Payment method:{" "}
                  <span className="font-semibold">ESEWA</span>
                </p>
                  <span className="font-semibold"> {decodedData.status}</span>
                  </div>
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