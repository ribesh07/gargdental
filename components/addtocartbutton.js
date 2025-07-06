"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useCartStore from "@/stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/utils/apiHelper";

const AddToCartButton = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      window.location.href = '/account';
      return;
    }
    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn w-full bg-cyan-500 hover:bg-blue-800 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center space-x-1 sm:space-x-2 transition-colors duration-200 mt-auto text-xs sm:text-sm"
    >
      Add to Cart
    </button>
  );
};
export default AddToCartButton;

//using this only for products
export function AddToCart({ product }) {
  const handleAdd = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      window.location.href = '/account';
      return;
    }
    // setAdded(true);
    console.warn(product.sell_price + " inside add to cart ");
    const response = await addToCart(
      product.product_code,
      1,
      product.sell_price
    );
    if (response && response.success) {
      useCartStore.getState().setCart(response.cart);
      console.log(response);
      toast.success(`${product.product_name} added to cart!`);
    }
  };

  return (
    <button
      onClick={handleAdd}
      // disabled={added}
      className="btn py-1 sm:py-2 bg-gray-600 hover:bg-blue-700 text-white w-full px-1 rounded-md font-medium flex items-center justify-center space-x-1 sm:space-x-2 transition-colors duration-200 text-xs sm:text-sm cursor-pointer"
    >
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-3" />
      Add to Cart
    </button>
  );
}

//using this for featured products
export function AddtoCartFeatured({ product }) {
  const handleAdd = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      window.location.href = '/account';
      return;
    }
    // addToCart(product);
    console.warn(product.sell_price + " inside add to cart featured");
    const response = await addToCart(
      product.product_code,
      1,
      product.sell_price
    );

    if (response && response.success) {
      useCartStore.getState().setCart(response.cart);
      console.log(response);
      toast.success(`${product.product_name} added to cart!`);
    }
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={handleAdd}
        className="bg-gray-600 hover:bg-blue-700 text-white text-xs px-2 sm:px-3 py-1 rounded transition-colors flex items-center cursor-pointer"
      >
        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        ADD TO CART
      </button>
    </div>
  );
}
