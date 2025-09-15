"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import { handleOrder } from "@/utils/apiHelper";
import useWarningModalStore from "@/stores/warningModalStore";
import { handleOrderBuyNow } from "@/utils/apiHelper";
import toast from "react-hot-toast";
import { useFreeShippingStore } from "@/stores/ShippingThreshold";
import FormatCurrencyNPR from "@/components/NprStyleBalance";
import { CONNECTIPS_BASE_URL , CONNECTIPS_API_URL , APPNAME ,APPID ,MERCHANTID } from "@/utils/config"
import { generateUniqueId  } from '@/utils/payments/generateUniqueId'
import { getDate  } from '@/utils/payments/getDate'
import { apiRequest } from "@/utils/ApiSafeCalls";
import FullScreenLoader from "@/components/FullScreenLoader";
import { getToken } from "@/utils/ApiSafeCalls";

const paymentMethods = [
    {
    id: "IPS",
    label: "Nepal Pay",
    icon: (
      <img
        src="/connectIPS.png"
        alt="IPS"
        className="h-10 mx-auto"
      />
    ), // You can use a local asset if you want
  },
  {
    id: "C",
    label: "Cash on Delivery",
    icon: <span className="text-4xl">🚚</span>,
  },
];

// const esewaDescription = (
//   <div className="mt-6 text-gray-700 text-sm">
//     <p className="mb-2">
//       You will be redirected to your eSewa account to complete your payment:
//     </p>
//     <ol className="list-decimal ml-5 mb-2">
//       <li>Login to your eSewa account using your eSewa ID and Password.</li>
//       <li>Ensure your eSewa account is active and has sufficient balance.</li>
//       <li>
//         Enter OTP (one-time password) sent to your registered mobile number.
//       </li>
//     </ol>
//     <p className="font-bold text-gray-800 mb-2">
//       ***Login with your eSewa mobile and PASSWORD (not MPin)***
//     </p>
//   </div>
// );

const connectIPSDescprition = (
  <div className="mt-6 text-gray-700 text-sm">
    <p className="mb-2">
      You will be redirected to ConnnectIPS Page to complete your payment:
    </p>
    <ol className="list-decimal ml-5 mb-2">
      <li>Login to your connectIPS account using your ID and Password.</li>
      <li>Ensure your account is active and has sufficient balance.</li>
      <li>
        Enter OTP (one-time password) sent to your registered mobile number.
      </li>
    </ol>
   
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

const PayOpsPageBuyNow = () => {
  const [selected, setSelected] = useState("IPS");
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedItems = useCartStore((state) => state.selectedItems) || [];
  const [shipping, setShipping] = useState(50);
  const [isFreeShipping, setisFreeShipping] = useState(false);
  const [currentThreshold , setcurrentThreshold] = useState(0);
  const [showShipping , setShowShipping] = useState(0);
  const selectedShippingAddress = useCartStore(
    (state) => state.selectedShippingAddress
  );
  const selectedBillingAddress = useCartStore(
    (state) => state.selectedBillingAddress
  );

   const { getInsideOfValleyThreshold,
    getOutOfValleyThreshold,
  } = useFreeShippingStore();

  // console.log("selectedShippingAddress", selectedShippingAddress);
  // console.log("selectedBillingAddress", selectedBillingAddress);
  const email = useCartStore((state) => state.email);
  const addOrder = useCartStore((state) => state.addOrder);
  const router = useRouter();
  // console.log("email", email);

  // Calculate totals from selected items
  // const subtotal = selectedItems.reduce(
  //   (sum, item) => sum + item.price * (item.quantity || 1),
  //   0
  // );
  // const total = subtotal + shipping;

  const itemsWithVat = selectedItems.map((item) => ({
    ...item,
    vatAmount: Number((item.price * item.quantity * 0.13).toFixed(3)),
  }));

  const totalVatAmount = itemsWithVat.reduce(
    (sum, item) => sum + item.vatAmount,
    0
  );

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );



  const taxtotal = subtotal - totalVatAmount;
const [ loading , setLoading ] = useState(false);
const fetchShippingCost =async () => {
      setLoading(true);
     
      try{
        const checkCost = await apiRequest(
          '/customer/check-valley',
        true , {
        method: "POST",
        body: JSON.stringify({
          address_id: selectedShippingAddress?.id,
        }),
      }
        );
        if(checkCost && checkCost.success){
          const { inside_valley } = checkCost;
          // setIsInsideOfValley(inside_valley);
          if(inside_valley){
            const threshold = getInsideOfValleyThreshold();
            setcurrentThreshold(threshold);
            console.log("Inside of valley threshold:", threshold);
          }else{
            const threshold = getOutOfValleyThreshold();
            setcurrentThreshold(threshold);
            console.log("Outside of valley threshold:", threshold);
          }
        }
      }catch(error){
        console.log("Error fetching shipping cost:", error);
      }finally{
        setLoading(false);
      }
      }
  

  useEffect(() => {
    fetchShippingCost();
    console.log("current  threshold:", currentThreshold);
    if (subtotal >= currentThreshold) {

      setisFreeShipping(true);
      setShipping(0);
      console.log("current threshold : ", currentThreshold);
    } else {
      setisFreeShipping(false);
    }
  }, [subtotal, currentThreshold]);

  // const total = subtotal + totalVatAmount + shipping;
  const total = subtotal + (subtotal >= currentThreshold ? 0 : shipping);
  useEffect(() => {
    if (email === null || email === "") {
      toast.error("Please don't refresh the page.");
      router.push("/dashboard");
      return;
    }
    if (selectedShippingAddress?.city === null) {
      toast.error("Please don't refresh the page.");
      router.push("/dashboard");
      return;
    }
    if (selectedShippingAddress?.city?.shipping_cost !== null) {
      const cost = parseFloat(selectedShippingAddress?.shipping_cost);
      setShipping(cost);
      setShowShipping(cost);
    } else {
      toast.error("Please don't refresh the page.");
      router.push("/dashboard");
      return;
    }
  }, [selectedShippingAddress]);

  const handleConfirmOrderBuyNow = async () => {
    setIsProcessing(true);
    const orderData = {
      payment_method: selected,
      billing_address: selectedBillingAddress.id,
      shipping_address: selectedShippingAddress.id,
      token: getToken(),
      invoice_email: email,
      buy_now_item: {
        product_code: selectedItems[0].product_code,
        quantity: selectedItems[0].quantity,
      },
    };
    console.log("orderData", orderData);
    const result = await handleOrderBuyNow(orderData);
    // console.log("result", result.message);
    // if (result.success) {
    //    useInfoModalStore.getState().open({
    //     title: "Info",
    //     message: result.message || "Order placed successfully",
    //   });
    // }
    addOrder({
      items: selectedItems,
      address: selectedShippingAddress,
      paymentMethod: selected,
      total,
      date: new Date().toISOString(),
    });
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/product");
    }, 400);
  };


  const handleConfirmOrderIPS = async () =>{
    const transId = `Tx${generateUniqueId()}`;
    const refId = `Rf${generateUniqueId()}`
    const orderData = {
      payment_method: selected,
      billing_address: selectedBillingAddress.id,
      shipping_address: selectedShippingAddress.id,
       token: getToken(),
      invoice_email: email,
      transaction_id : transId,
      buy_now_item: {
        product_code: selectedItems[0].product_code,
        quantity: selectedItems[0].quantity,
      }
    };
    console.log("orderData", orderData);
    const result = await handleOrderBuyNow(orderData);
    addOrder({
        items: selectedItems,
        address: selectedShippingAddress,
        paymentMethod: selected,
        total,
        date: new Date().toISOString(),
      });

        const transactionDetails = {
              MERCHANTID,
              APPID,
              APPNAME,
              TXNID: transId,
              TXNDATE: getDate(),
              TXNCRNCY: 'NPR',
              TXNAMT: total*100,                                 
              REFERENCEID: refId,
              REMARKS:   "Garg dental Services !",
              PARTICULARS: result.order_id,
              TOKEN: 'TOKEN',

            };

        const tokenResponse = await fetch('/connectips/get_token', {
          method: 'POST',
          body: JSON.stringify(transactionDetails),
        });

          if (!tokenResponse.ok) {
                    throw new Error('Failed to get payment token');
                  }
        
          const { TOKEN } = await tokenResponse.json();

          const payload = { ...transactionDetails, TOKEN };

          const form = document.createElement('form');
          form.method = 'POST';
          form.action = CONNECTIPS_API_URL;

          Object.entries(payload).forEach(([key, value]) => {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = value;
            form.appendChild(hiddenField);
          });

          document.body.appendChild(form);
          form.submit();


  }
  if( loading ){
      return (
        <FullScreenLoader />
      );
    }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-8 uppercase">
        Select Payment Method
      </h2>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="bg-gray-50 rounded-xl shadow p-8">
          <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelected(method.id)}
                className={`flex-1 border rounded-lg p-6 flex flex-col items-center justify-center transition-colors duration-150 cursor-pointer ${selected === method.id
                    ? "border-blue-700 bg-blue-50 shadow"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-50"
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
          {selected === "IPS" && (
            <>
              {connectIPSDescprition}
              <button
                disabled={isProcessing}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer ${isProcessing
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-gray-50-300"
                  }`}
                onClick={() => handleConfirmOrderIPS()}
              >
                Pay Now
              </button>
            </>
          )}
          {selected === "C" && (
            <>
              {codDescription}
              <button
                disabled={isProcessing}
                onClick={handleConfirmOrderBuyNow}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer ${isProcessing
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-gray-50-300"
                  }`}
              >
                {isProcessing ? "Processing..." : "Confirm Order"}
              </button>
            </>
          )}
        </div>

        {/* Order Summary + Selected Items & Address */}
        {/* Order Summary + Selected Items & Address */}
        <div className="bg-gray-50 rounded-xl shadow p-8 flex flex-col justify-center">
          {/* Shipping Address */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            {selectedShippingAddress ? (
              <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700 mb-2">
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedShippingAddress.full_name}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedShippingAddress.address},{" "}
                  {selectedShippingAddress.landmark},{" "}
                  {selectedShippingAddress?.province_name}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedShippingAddress.phone}
                </div>
                {/* <div className="text-gray-500 pt-1">
                    {selectedShippingAddress.address_type} Address
                  </div> */}
              </div>
            ) : (
              <div className="text-gray-400 text-sm mb-2">
                No Shipping Address
              </div>
            )}
          </div>
          {/* Selected Items with Images */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Order Items</h4>
            {selectedItems.length === 0 ? (
              <div className="text-gray-400 text-sm">No items selected.</div>
            ) : (
              <ul className="text-sm text-gray-800 space-y-3">
                {selectedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium text-green-700">
                      Rs. {FormatCurrencyNPR(item.price * item.quantity)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Order Summary */}
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">SUBTOTAL</span>
              <span className="font-bold text-lg">Rs. {FormatCurrencyNPR(subtotal)}</span>
            </div>
            {/* <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">VAT {"13%"}</span>
              <span className="font-bold text-lg">
                Rs. {totalVatAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div> */}
            <div className="flex justify-between mb-4">
              <span className="font-bold text-lg">SHIPPING</span>
              <span className={`font-semibold text-gray-800 ${isFreeShipping ? "line-through text-gray-500" : ""
                }`}>Rs. {showShipping}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-xl">GRAND TOTAL</span>
              <span className="font-bold text-xl">Rs. {FormatCurrencyNPR(total)}</span>
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

export default PayOpsPageBuyNow;
