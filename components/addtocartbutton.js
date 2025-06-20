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
      className="btn w-full bg-cyan-500 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 mt-auto"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;

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
      className="btn w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 mt-auto"
    >
      <ShoppingCart className="w-5 h-5 m-2" />
      Add to Cart
    </button>
  );
}
