"use client";

import React, { useState } from "react";
import { Share2, Heart } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/utils/apiHelper";
import toast from "react-hot-toast";

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
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const checkWishlist = async () => {
      if (!product) return;
      const wishlist = await getWishlist();
      setWishlisted(
        wishlist.some((item) => item.product_code === product.product_code)
      );
    };
    checkWishlist();
  }, [product]);

  const handleWishlist = async () => {
    if (!product) return;
    setLoading(true);
    if (wishlisted) {
      // Remove from wishlist (need to find item_id)
      const wishlist = await getWishlist();
      const item = wishlist.find(
        (item) => item.product_code === product.product_code
      );
      if (!item) {
        toast.error("Item not found in wishlist");
        setLoading(false);
        return;
      }
      const res = await removeFromWishlist(item.id);
      if (res.success) {
        setWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        toast.error(res.message || "Failed to remove from wishlist");
      }
    } else {
      // Add to wishlist
      const res = await addToWishlist(product.product_code);
      if (res.success) {
        setWishlisted(true);
        toast.success("Added to wishlist");
      } else {
        toast.error(res.message || "Failed to add to wishlist");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleWishlist}
        className="flex items-center text-[12px] mr-2"
        title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        disabled={loading}
      >
        {wishlisted ? (
          <FilledHeart />
        ) : (
          <Heart className="w-8 h-8 mr-1 text-[#0072bc] hover:text-[#bf0000]" />
        )}
        {loading && <span className="ml-2 text-xs">...</span>}
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
