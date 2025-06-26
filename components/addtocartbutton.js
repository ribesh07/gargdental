"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useCartStore from "@/stores/useCartStore";
import { ShoppingCart } from "lucide-react";

const AddToCartButton = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="btn w-full bg-cyan-500 hover:bg-blue-800 text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center space-x-1 sm:space-x-2 transition-colors duration-200 mt-auto text-xs sm:text-sm"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

//using toast
export function AddToCart({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAdd = () => {
    // setAdded(true);
    addToCart(product);
    toast.success(`${product.product_name} added to cart!`);
  };

  return (
    <button
      onClick={() => handleAdd()}
      // disabled={added}
      className="btn py-1 sm:py-2 bg-gray-600 hover:bg-blue-700 text-white w-full px-1 rounded-md font-medium flex items-center justify-center space-x-1 sm:space-x-2 transition-colors duration-200 text-xs sm:text-sm"
    >
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-3" />
      Add to Cart
    </button>
  );
}

export function AddtoCartFeatured({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.product_name} added to cart!`);
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleAdd()}
        className="bg-gray-600 hover:bg-blue-700 text-white text-xs px-2 sm:px-3 py-1 rounded transition-colors flex items-center"
      >
        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        ADD TO CART
      </button>
    </div>
  );
}
