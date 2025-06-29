"use client";

import React from "react";
import { Share2, Heart } from "lucide-react";
import useCartStore from "@/stores/useCartStore";

const FilledHeart = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="#bf0000"
    stroke="#bf0000"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 mr-1"
    {...props}
  >
    <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.04 3 12.54 3.81 13.35 5.08C14.16 3.81 15.66 3 17.2 3C20.28 3 22.7 5.42 22.7 8.5C22.7 13.36 15 21 15 21H12Z" />
  </svg>
);

export default function ButtonForShare({ product }) {
  const wishlist = useCartStore((state) => state.wishlist);
  const addToWishlist = useCartStore((state) => state.addToWishlist);
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist);
  const isWishlisted = product && wishlist.some((item) => item.id === product.id);

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          if (!product) return;
          if (isWishlisted) {
            removeFromWishlist(product.id);
          } else {
            addToWishlist({
              id: product.id,
              name: product.product_name,
              image: product.image_url,
              price: product.sell_price || product.actual_price,
              brand: product.brand,
              product_code: product.product_code,
              description: product.description,
            });
          }
        }}
        className="flex items-center text-[12px] mr-2"
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {isWishlisted ? (
          <FilledHeart />
        ) : (
          <Heart className="w-8 h-8 mr-1 text-[#0072bc] hover:text-[#bf0000]" />
        )}
      </button>
      <button
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: product?.product_name || "Product",
                text: "Check out this product!",
                url: window.location.href,
              })
              .catch((error) => console.log("Error sharing", error));
          } else {
            alert("Sharing not supported on this browser.");
          }
        }}
        className="flex items-center text-[12px]"
      >
        <Share2 className="w-8 h-8 mr-1 text-[#0072bc] hover:text-[#bf0000]" />
      </button>
    </div>
  );
}
