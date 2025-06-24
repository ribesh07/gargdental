"use client";

import React from "react";
import { Share2 } from "lucide-react";

export default function ButtonForShare({ product }) {
  return (
    <button
      onClick={() => {
        if (navigator.share) {
          navigator
            .share({
              title: product.product_name,
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
  );
}
