"use client";
// app/cart/page.jsx

// async function getCartData() {
//     const res = await fetch("https://garg.omsok.com/api/v1/customer/cart/list", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzhkZjE5NDhiOTRjMTVhYjU4MzIzYTE1YTk1YWZjOGMxOGMwMDQzMmVkYzMyZmFhN2RiNzZkYTcxMmU1MzUyNDIyMzdlNTE3NDFlNDRmODgiLCJpYXQiOjE3NTA2NzY0MDQuNTgxMzcyMDIyNjI4Nzg0MTc5Njg3NSwibmJmIjoxNzUwNjc2NDA0LjU4MTM3MzkyOTk3NzQxNjk5MjE4NzUsImV4cCI6MTc4MjIxMjQwNC41Njg1Mjg4OTA2MDk3NDEyMTA5Mzc1LCJzdWIiOiIyNyIsInNjb3BlcyI6W119.rQXdJOZ9ECBEt2EZF49Bht6j69mKrKxImwdsynodELRrFAnKd0mxZI5HfwUSYdxzAhJKeuWSeSAH2v2QbS7p3HuDjlSveXf9fUq0PjbeLnnEaEaqqY8LDc0FB6V6Yx07TuHJSqhUc2wEAUuDfe_N9qrf3Vrk1V4WBn52T63gjQAkuYIHiz1HPnOl9Oe8gxaYu6-j1viseE3EHAHLlYvfuCIm0BHWIvyD0tge0pUAAW0mrzQPC-RiwazA62J8iNUvEIvGk8OmObsGKhDFg4RWHlm6mYPU9jqIU_YWJU3qxJz-wqHg4_HP5OUtAW12em4gNFAQnuO-luDDVl76vTaG4M0YlZGUdcHEIWpGpOBoGMnZWjr0We8IrYcJrKQaSfRRY87S9XPhlP-_8JNWBUaQu-l-xo9uBMovO2WYgKcitwyCMsnT4oQs7wpVbT2rCq2__WKPcgChrBjUOOSidPij8l0NWHy_N1bQRTxu0dycUJ8uqIK_aYI1tI1YTKVMI0iPYIg2IWD7JA8rVN0sr-l9Ewnkvs_BwcJXij15b8hO642aEWKW7T3xl-SMeTCaZxbS-RtZEioPzsMsL57tWEg8fAS1ZD9_9EedqnXSiRiy4QQB60RUcZf7W6a0UmlEjKs1GgRyA3ft0Oe7pZoxGIIQehm8VfSQSjLIymgJcl6nRYg"
//       },
//       cache: "no-store"
//     });

//     if (!res.ok) throw new Error("Failed to fetch cart");

//     const data = await res.json();
//     return data.cart;
//   }

//   export default async function CartPage() {
//     const cart = await getCartData();

//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
//         <p className="text-sm text-gray-500 mb-6">Subtotal: NPR {cart.subtotal}</p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {cart.items.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col items-center border rounded-lg p-4 shadow-md"
//             >
//               <img
//                 src={item.product.image_full_url}
//                 alt={item.product.product_name}
//                 className="w-40 h-auto mb-2"
//               />
//               <h2 className="font-semibold text-lg text-center">
//                 {item.product.product_name}
//               </h2>
//               <p className="text-gray-600">Quantity: {item.quantity}</p>
//               <p className="text-green-700 font-medium">Price: NPR {item.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//shop

import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const MobileResponsiveCart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 2500,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Premium Coffee Beans",
      category: "Food & Beverages",
      price: 850,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      category: "Clothing",
      price: 1200,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === cartItems.length);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    const newSelected = new Set(selectedItems);
    newSelected.delete(id);
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === cartItems.length - 1);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        {/* Select All */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              SELECT ALL ({cartItems.length} ITEM
              {cartItems.length !== 1 ? "S" : ""})
            </span>
          </label>
          <button
            className="text-red-600 font-semibold hover:underline text-sm sm:text-base self-start sm:self-auto"
            onClick={handleClearCart}
          >
            Clear All
          </button>
        </div>

        {/* Cart Items List */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 sm:p-6">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <div className="flex items-start space-x-3 mb-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                  />

                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.category}
                    </p>
                    <div className="text-sm text-gray-600 mt-1">
                      Rs. {item.price}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Quantity Controls and Total - Mobile */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 h-8 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Total Price */}
                  <div className="font-medium text-green-600">
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />

                {/* Product Image */}
                <div className="w-[60px] h-[60px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-gray-500 text-sm">Rs. {item.price}</div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-16 h-8 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
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

        {/* Empty Cart Message */}
        {cartItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Your cart is empty</div>
            <div className="text-gray-400 text-sm mt-2">
              Add some items to get started!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileResponsiveCart;
