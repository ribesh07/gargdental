"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import { getAddress, userDetails } from "@/utils/apiHelper";
// import MainTopBar from "@/components/mainTopbar";
import useInfoModalStore from "@/stores/infoModalStore";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useFreeShippingStore } from "@/stores/ShippingThreshold";
import FormatCurrencyNPR from "@/components/NprStyleBalance";
import { useUserStore } from "@/stores/useUserStore";
import { apiRequest } from "@/utils/ApiSafeCalls";
import FullScreenLoader from "@/components/FullScreenLoader";


export default function OrderSummaryBuyNow() {
  const [couponCode, setCouponCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShipping , setShowShipping] = useState(0);
  // const [selectedAddressType, setSelectedAddressType] = useState("");
  // const [addresses, setAddresses] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(null);
  const [shipping, setShipping] = useState(50);
   const {
  getInsideOfValleyThreshold,
  getOutOfValleyThreshold,
} = useFreeShippingStore();

  // const { setSelectedShippingAddress, setSelectedBillingAddress } =
  //   useCartStore();
        const { addresses, fetchUserData } = useUserStore();
  
  
    const [selectedId, setSelectedId] = useState(null);
    const [selectedId2, setSelectedId2] = useState(null);
    const [ loading, setLoading ] = useState(false);
  
    const selectedShippingAddress = addresses.find(addr => addr.id === selectedId);
    const selectedBillingAddress = addresses.find(addr => addr.id === selectedId2);
    
  const { setSelectedShippingAddress, setSelectedBillingAddress } =
    useCartStore();
  const router = useRouter();
  const setEmail = useCartStore((state) => state.setEmail);
  // Get selected items from Zustand store
  const selectedItems = useCartStore((state) => state.selectedItems);
  console.log("selectedItems in checkout:", selectedItems);

  const setSelectedItems = useCartStore((state) => state.setSelectedItems);
  // const selectedShippingAddress = useCartStore(
  //   (state) => state.selectedShippingAddress
  // );
  const [userProfile, setUserProfile] = useState(null);
  const [isFreeShipping, setisFreeShipping] = useState(false);

  const [currentThreshold , setcurrentThreshold] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { email } = await userDetails();
      console.log("email", email);
      setUserProfile(email);
      setEmail(email);
    };
    fetchUserProfile();
    fetchUserData();

    // const fetchAddresses = async () => {
    //   const { allAddresses, defaultBillingAddress, defaultShippingAddress } =
    //     await getAddress();

    //   setAddresses(allAddresses);
    //   setDefaultBillingAddress(defaultBillingAddress);
    //   if (defaultShippingAddress.city?.shipping_cost) {
    //     const cost = parseFloat(defaultShippingAddress.city?.shipping_cost);
    //     setShipping(cost);
    //   }
    //   setDefaultShippingAddress(defaultShippingAddress);
    //   console.log("result", allAddresses);
    // };
    // fetchAddresses();
  }, []);
  useEffect(() => {
    if (selectedItems.length === 0) {
      toast.error("Please don't refresh the page.");
      router.push("/dashboard");
      return;
    }
  }, [selectedItems.length]);

  const handleProceedToPay = () => {
    if (!defaultBillingAddress) {
      useInfoModalStore.getState().open({
        title: "Info",
        message: (
          <span>
            Please Add Address.{" "}
            <a
              href="/myaccount"
              className="text-blue-600 underline hover:text-blue-800"
              style={{ cursor: "pointer" }}
            >
              Go to My Account
            </a>{" "}
            to add your address.
          </span>
        ),
      });
      return;
    }

    if (selectedItems.length === 0) {
      useInfoModalStore.getState().open({
        title: "Info",
        message: (
          <span>
            Please Add Item.{" "}
            <a
              href="/product"
              className="text-blue-600 underline hover:text-blue-800"
              style={{ cursor: "pointer" }}
            >
              Go to Product List
            </a>{" "}
            to buy your item.
          </span>
        ),
      });
      return;
    }
    setIsProcessing(true);
    setSelectedShippingAddress(defaultShippingAddress);
    setSelectedBillingAddress(defaultBillingAddress);
    console.log("defaultShippingAddress", defaultShippingAddress);
    console.log("defaultBillingAddress", defaultBillingAddress);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1000);
    router.push("/cart/checkout-buy-now/pay-ops");
  };

  // const handleProceedToPay = () => {
  //   setIsProcessing(true);
  //   setSelectedShippingAddress(defaultShippingAddress);
  //   setSelectedBillingAddress(defaultBillingAddress);
  //   console.log("defaultShippingAddress", defaultShippingAddress);
  //   console.log("defaultBillingAddress", defaultBillingAddress);
  //   setTimeout(() => {
  //     setIsProcessing(false);
  //   }, 1000);
  //   router.push("/cart/checkout-buy-now/pay-ops");
  // };

  const handleRemoveItem = () => {
    alert("Item removed from cart");
  };

   useEffect(() => {
      console.log("currentThreshold:", getInsideOfValleyThreshold(), getOutOfValleyThreshold());
      console.log("defaukt shippingaddress :", defaultShippingAddress);
      
       if ( defaultShippingAddress && defaultShippingAddress?.shipping_cost) {
        console.log("defaultShippingAddress changed:", defaultShippingAddress);
        console.log("defaultShippingAddress cost:", defaultShippingAddress?.shipping_cost);
        const cost = parseFloat(defaultShippingAddress?.shipping_cost);
        setShipping(cost);
        setShowShipping(cost);
      }
    }, [selectedId]);

  // const subtotal = selectedItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
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

  const fetchShippingCost =async () => {
    setLoading(true);
    if(!defaultShippingAddress){
      setLoading(false);
      return;
    }
    try{
      const checkCost = await apiRequest(
        '/customer/check-valley',
      true , {
      method: "POST",
      body: JSON.stringify({
        address_id: defaultShippingAddress?.id,
      }),
    }
      );
      if(checkCost && checkCost.success){
        const { inside_valley } = checkCost;
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
    }, [defaultShippingAddress]);

  useEffect(() => {
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

  if( loading ){
    return (
      <FullScreenLoader />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* <MainTopBar /> */}
      <div className="max-w-4xl mx-auto my-5 border border-gray-200 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
              ORDER SUMMARY
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Shipping & Product */}
            <div className="space-y-8">
              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  SHIPPING ADDRESS
                </h2>
              { addresses && addresses.length > 0 &&   
              
              ( 
                <>
                   <select
                    className="mb-2 p-2 border rounded text-sm w-full"
                    value={selectedId || ""}
                    onChange={(e) => {setSelectedId(Number(e.target.value));
                      setDefaultShippingAddress(addresses.find(addr => addr.id === Number(e.target.value)));

                    }}
                  >
                    <option value="" disabled>
                      Select Shipping Address
                    </option>
                    {addresses.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.full_name} - {addr.address}, {addr.landmark}, {addr?.province_name}
                      </option>
                    ))}
                  </select>
                </>

                )
              }
                <div className="space-y-2">
                  {defaultShippingAddress ? (
                    <div className="bg-gray-50 border-gray-200 border-2 rounded-lg p-3 text-sm text-gray-700">
                      <div>
                        <span className="font-semibold">Name:</span>{" "}
                        {defaultShippingAddress.full_name}
                      </div>
                      <div>
                        <span className="font-semibold">Address:</span>{" "}
                        {defaultShippingAddress.address},{" "}
                        {defaultShippingAddress.landmark},{" "}
                        {defaultShippingAddress?.province_name}
                      </div>
                      <div>
                        <span className="font-semibold">Phone:</span>{" "}
                        {defaultShippingAddress.phone}
                      </div>
                      {/* <div className="text-gray-500 pt-1">
                        {defaultShippingAddress.address_type} Address
                      </div> */}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">
                      No Shipping Address available.
                    </p>
                  )}
                </div>
              </div>

              {/* Product Items */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-18 h-18  rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16  rounded flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity x {item.quantity}
                        </p>
                        <p className="font-semibold text-gray-800">
                          Rs. {FormatCurrencyNPR(item.price)}
                        </p>
                      </div>
                      {/* Remove button can be implemented if needed */}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center">
                    No items selected.
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Billing & Payment */}
            <div className="space-y-8">
              {/* Invoice & Billing */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  INVOICE & BILLING
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Invoice Email
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail size={16} />
                      {/* <span>{userProfile || "Enter email !"}</span> */}
                      <input
                        type="email"
                        placeholder="Enter email"
                        value={userProfile || ""}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Billing Address
                    </p>

                     { addresses && addresses.length > 0 &&   
                      ( 
                        <>
                          <select
                            className="mb-2 p-2 border rounded text-sm w-full"
                            value={selectedId2 || ""}
                            onChange={(e) => {setSelectedId2(Number(e.target.value));
                              setDefaultBillingAddress(addresses.find(addr => addr.id === Number(e.target.value)));
                            }}
                          >
                            <option value="" disabled>
                              Select Billing Address
                            </option>
                            {addresses.map((addr) => (
                              <option key={addr.id} value={addr.id}>
                                {addr.full_name} - {addr.address}, {addr.landmark}, {addr?.province_name}
                              </option>
                            ))}
                          </select>
                        </>
                        )
                      }
                    {defaultBillingAddress ? (
                      <p className="text-sm text-gray-500">
                        {defaultBillingAddress.address},{" "}
                        {defaultBillingAddress.landmark},{" "}
                        {defaultBillingAddress?.province_name} <br />
                        {defaultBillingAddress.full_name} (
                        {defaultBillingAddress.phone})
                      </p>
                    )  : (
                      <p className="text-sm text-gray-500">
                        No Billing Address available.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Totals */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    SUBTOTAL
                  </span>
                  <span className="font-semibold text-gray-800">
                    Rs.{" "}
                    {subtotal.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}                  </span>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    VAT {"13%"}
                  </span>
                  <span className="font-semibold text-gray-800">
                    Rs.{" "}
                    {totalVatAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div> */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    SHIPPING
                  </span>
                  <span className={`font-semibold text-gray-800 ${isFreeShipping ? "line-through text-gray-500" : ""
                    }`}>
                    Rs. {showShipping.toFixed(2)}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    GRAND TOTAL
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    Rs.{" "}
                    {total.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}                  </span>
                </div>
                <label htmlFor="terms" className="text-sm text-gray-700">
                  By Continuing, you agree to our{" "}
                  <Link
                    href="/returnpolicy"
                    className="text-blue-600 underline cursor-pointer"
                  >
                    terms
                  </Link>
                  <label> & policies</label>
                </label>
              </div>

              {/* Coupon Code */}
              {/* <div>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div> */}

              {/* Proceed to Pay */}
              <div className="space-y-4">
                <button
                  onClick={handleProceedToPay}
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer ${isProcessing
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-gray-50-300"
                    }`}
                >
                  {isProcessing ? "Processing..." : "Proceed to Pay"}
                </button>

                {/* <div className="text-center">
                  <p className="text-sm text-red-500">
                    Please add an address{" "}
                    <button className="text-blue-500 hover:underline">
                      here
                    </button>{" "}
                    to proceed.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
