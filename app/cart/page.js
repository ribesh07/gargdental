"use client";
import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
// import MainTopBar from "@/components/mainTopbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { updateCart, removeCartItem, clearCart } from "@/utils/apiHelper";
import useCartStore from "@/stores/useCartStore";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const cart = useCartStore((state) => state.getCartCount());
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const router = useRouter();

  const setSelectedItemsStore = useCartStore((state) => state.setSelectedItems);

  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedAddressType, setSelectedAddressType] = useState("");
  const setSelectedShippingAddress = useCartStore((state) => state.setSelectedShippingAddress);

  // Demo address data (replace with real user/account data)
  const homeAddress = {
    fullName: "Gyanendra Sah",
    phone: "9821212332",
    province: "Bagmati",
    city: "Kathmandu",
    zone: "Naxal",
    landmark: "Near Temple",
    localAddress: "Durbar Marg, Street 1",
    addressType: "Home",
  };
  const officeAddress = {
    fullName: "Gyanendra Sah",
    phone: "9821212332",
    province: "Bagmati",
    city: "Kathmandu",
    zone: "Durbarmarg",
    landmark: "Near Office Building",
    localAddress: "New Road, Street 5",
    addressType: "Office",
  };

  useEffect(() => {
    const fetchCart = async () => {
      const response = await apiRequest(`/customer/cart/list`, true);
      if (response) {
        const mappedCartItems = response.cart.items.map((item) => ({
          id: item.id,
          image: item.product.image_full_url,
          name: item.product.product_name,
          product_code: item.product.product_code,
          quantity: item.quantity,
          price: item.price,
          category: item.product.category_id,
        }));

        console.log(mappedCartItems);
        setCartItems(mappedCartItems);
      }
    };

    fetchCart();
    // setIsLoading(false);
    setAdded(false);
  }, [added]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  //update cartItems
  const handleUpdateCartItems = async (id, quantity) => {
    setIsLoading(true);
    // const items = [
    //   {
    //     item_id: id,
    //     quantity: quantity,
    //   },
    // ];

    const response = await updateCart(id, quantity);
    setTimeout(() => {
      setAdded(true);
      setIsLoading(false);
    }, 500);
    // await fetchCart();

    if (response.success) {
      console.log(
        "Cart updated:",
        response.cart.items.map((item) => item.quantity)
      );
    } else {
      console.error("Failed to update cart:", response.message);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    handleUpdateCartItems(id, newQuantity);
  };

  const removeItem = async (id) => {
    setIsLoading(true);
    const response = await removeCartItem(id);
    setIsLoading(false);
    setCartItems((items) => items.filter((item) => item.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const selectedSubtotal = cartItems.reduce((sum, item) => {
    if (selectedItems.has(item.id)) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const shipping = 70;
  const total = selectedSubtotal + (selectedItems.size > 0 ? shipping : 0);

  const handleClearCart = async () => {
    setIsLoading(true);
    const response = await clearCart();
    setIsLoading(false);

    // Clear local state
    setCartItems([]);
    setSelectedItems(new Set());
    setSelectAll(false);

    // Also clear the store as backup (in case API call fails but we want to clear UI)
    if (response && response.success) {
      useCartStore.getState().clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <FullScreenLoader />}
      {/* <MainTopBar /> */}
      {/* Breadcrumb */}
      {/* <div className="bg-gray-50 border-b border-b-gray-200 py-2.5 shadow">
        <div className="max-w-7xl mx-auto px-5 text-sm">
          <Link href="/dashboard" className="text-blue-900 hover:underline">
            Home
          </Link>{" "}
          /
          <Link href="#" className="text-blue-900 ml-1">
            Cart
          </Link>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light text-gray-500 text-center mb-1">
          YOUR SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4  p-6">
          {/* Cart Items */}
          <div className=" relative lg:col-span-2  border border-gray-200 bg-white rounded-lg  p-6 shadow-lg hover:shadow-2xl">
            {cart == 0 && (
              <div className="text-center py-20 text-gray-500 text-xl">
                Your cart is empty
              </div>
            )}
            {cart > 0 && (
              <>
                {/* Select All */}
                <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">
                      SELECT ALL ({cartItems.length} ITEM
                      {cartItems.length !== 1 ? "S" : ""})
                    </span>
                  </label>
                  <button
                    className="text-red-600 font-semibold hover:underline"
                    onClick={handleClearCart}
                  >
                    Clear All
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-6">
                      <div className="flex items-center space-x-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />

                        {/* Product Image */}
                        <div className="w-[40px] h-[40px] bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="w-[40px] h-[40px] bg-white rounded border-1 border-grey-100 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-gray-500 text-sm">
                            Rs. {item.price}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-16 h-8 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-right font-medium text-green-600">
                          Rs. {item.price * item.quantity}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Action Buttons */}
            {/* Fixed at bottom */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center p-4 bg-white">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>CONTINUE SHOPPING</span>
              </Link>

              {cart.length > 0 && (
                <button
                  onClick={() => {
                    router.push("/cart/checkout");
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  CHECKOUT
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 border border-gray-200 bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              {/* Shipping Address */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-500 mb-3">
                  Shipping Address
                </h3>
                <div className="mb-2">
                  <label htmlFor="shipping-address-select" className="block text-sm font-medium text-gray-600 mb-1">Choose Address:</label>
                  <select
                    id="shipping-address-select"
                    value={selectedAddressType}
                    onChange={e => setSelectedAddressType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm mb-2"
                  >
                    <option value="">Select Address</option>
                    <option value="home">Home Address</option>
                    <option value="office">Office Address</option>
                  </select>
                  {selectedAddressType === "home" && (
                    <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700">
                      <div><span className="font-semibold">Name:</span> {homeAddress.fullName}</div>
                      <div><span className="font-semibold">Address:</span> {homeAddress.localAddress}, {homeAddress.zone}, {homeAddress.city}, {homeAddress.province}</div>
                      <div><span className="font-semibold">Phone:</span> {homeAddress.phone}</div>
                      <div className="text-gray-500 pt-1">{homeAddress.addressType} Address</div>
                    </div>
                  )}
                  {selectedAddressType === "office" && (
                    <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700">
                      <div><span className="font-semibold">Name:</span> {officeAddress.fullName}</div>
                      <div><span className="font-semibold">Address:</span> {officeAddress.localAddress}, {officeAddress.zone}, {officeAddress.city}, {officeAddress.province}</div>
                      <div><span className="font-semibold">Phone:</span> {officeAddress.phone}</div>
                      <div className="text-gray-500 pt-1">{officeAddress.addressType} Address</div>
                    </div>
                  )}
                  {selectedAddressType === "" && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                      No Shipping Address Available.
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-2xl font-light text-gray-500 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">SUBTOTAL</span>
                    <span className="font-medium">
                      Rs. {selectedSubtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium">SHIPPING</span>
                    <span className="font-medium">
                      Rs.{" "}
                      {selectedItems.size > 0 ? shipping.toFixed(2) : "0.00"}
                    </span>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between text-lg ">
                    <span className="font-bold">GRAND TOTAL</span>
                    <div className="text-right">
                      <div className="font-bold">Rs. {total.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        All tax included.
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors font-medium"
                      onClick={() => {
                        if (selectedItems.size === 0) {
                          alert("Please select at least one item.");
                          return;
                        }
                        if (!selectedAddressType) {
                          alert("Please select a shipping address.");
                          return;
                        }
                        // Save selected items to store
                        const selectedCartItems = cartItems.filter((item) =>
                          selectedItems.has(item.id)
                        );
                        setSelectedItemsStore(selectedCartItems);
                        // Save selected address to store
                        setSelectedShippingAddress(selectedAddressType === 'home' ? homeAddress : officeAddress);
                        router.push("/cart/checkout");
                      }}
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
