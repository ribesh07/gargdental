"use client";
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/utils/apiHelper";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";

const FilledHeart = (props) => (
  <Heart stroke="red" size={25} fill="red" {...props} />
);

export default function WishListHeart({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();

  //  First check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        // you can fetch user details if needed
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth(); //
  }, [pathname]);

  //  Then check if this product is in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      if (!product || !isLoggedIn) return;

      try {
        const res = await getWishlist();
        const wishlistArray = res?.wishlist || [];

        const isWishlisted = wishlistArray.some(
          (item) => item.product_code === product.product_code
        );

        setWishlisted(isWishlisted);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    checkWishlist();
  }, [product, isLoggedIn]); // also depends on isLoggedIn

  const handleWishlist = async () => {
    if (!product) return;
    setLoading(true);

    try {
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
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
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
