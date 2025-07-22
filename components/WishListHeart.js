"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/utils/apiHelper";
import { toast } from "react-hot-toast";

const FilledHeart = (props) => (
  <Heart stroke="red" size={25} fill="red" {...props} />
);
export default function WishListHeart({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const checkWishlist = async () => {
      if (!product) return;

      const res = await getWishlist();

      // Correctly extract the array
      const wishlistArray = res?.wishlist || [];

      console.log("Wishlisted", wishlistArray); // Should show 3 items

      const isWishlisted = wishlistArray.some(
        (item) => item.product_code === product.product_code
      );

      setWishlisted(isWishlisted);
    };

    checkWishlist();
  }, [product]);
  const handleWishlist = async () => {
    if (!product) return;
    setLoading(true);

    const res = await getWishlist();
    const wishlistArray = res?.wishlist || [];

    if (wishlisted) {
      const item = wishlistArray.find(
        (item) => item.product_code === product.product_code
      );
      if (!item) {
        toast.error("Item not found in wishlist");
        setLoading(false);
        return;
      }
      const removeRes = await removeFromWishlist(item.id);
      if (removeRes.success) {
        setWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        toast.error(removeRes.message || "Failed to remove from wishlist");
      }
    } else {
      const addRes = await addToWishlist(product.product_code);
      if (addRes.success) {
        setWishlisted(true);
        toast.success("Added to wishlist");
      } else {
        toast.error(addRes.message || "Failed to add to wishlist");
      }
    }

    setLoading(false);
  };
  return (
    <button
      onClick={handleWishlist}
      className="flex items-center text-[12px] mr-2"
      title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      disabled={loading}
    >
      {wishlisted ? (
        <FilledHeart />
      ) : (
        <Heart size={25} className="mr-1 text-[#0072bc] hover:text-[#bf0000]" />
      )}
      {loading && <span className="ml-2 text-xs">...</span>}
    </button>
  );
}
