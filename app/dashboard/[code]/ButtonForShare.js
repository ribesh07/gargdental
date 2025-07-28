"use client";

import React, { useState, useEffect } from "react";
import { Share2, Heart } from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "@/utils/apiHelper";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
// import { handleLogout } from "@/utils/authHelper";
import { userDetails } from "@/utils/apiHelper";
// import { usePathname } from "next/navigation";

const FilledHeart = (props) => (
  <Heart stroke="red" size={25} fill="red" {...props} />
);

export default function ButtonForShare({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();

  const [isloggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setIsloggedin(true);
        const details = await userDetails();
        if (details) {
          setUser(details);
        } else {
          // It's possible the token is invalid, so log out.
          // handleLogout();
        }
      } else {
        setIsloggedin(false);
        setUser({});
      }
    };

    checkAuth();

    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pathname]);
  React.useEffect(() => {
    const checkWishlist = async () => {
      if (!product) return;
      if (!isloggedin) {
        return;
      }

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

    if (!isloggedin) {
      toast.error("Please login to add to wishlist");
      setLoading(false);
      return;
    }

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
          <Heart
            size={25}
            className=" mr-1 text-[#0072bc] hover:text-[#bf0000]"
          />
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
