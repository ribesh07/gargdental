"use client";
import { AddtoCartFeatured } from "@/components/addtocartbutton";
// import Image from "next/image";
import React from "react";

export default function ProductCardList({ products }) {
  const mappedVariations = (products || []).map((v) => ({
    id: v.id,
    product_code: v.product_code,
    product_name: v.product_name,
    actual_price: v.actual_price,
    sell_price: v.sell_price,
    discount: v.discount,
    image_full_url:
      v.image_full_url || "https://garg-next.omsok.com/assets/logo.png",
    main_image_full_url:
      v.main_image_full_url || "https://garg-next.omsok.com/assets/logo.png",
  }));

  // If no variations
  if (mappedVariations.length === 0) {
    return <p>No variations available.</p>;
  }
  return (
    <div className="max-h-[390px] sm:max-h-[390px] max-w-full w-full overflow-y-auto hide-scrollbar">
      <div className="flex flex-col space-y-4">
        {mappedVariations.map((product, idx) => (
          <div
            key={product.id || idx}
            className="flex justify-between items-center border rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition bg-white w-full min-w-0"
          >
            <div className="flex-1 min-w-0">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-md"
                style={{ objectFit: "cover" }}
                src={product.image_full_url}
                alt={product.product_name}
              />
              <div className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 truncate">
                {product.product_name}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-1">
                <span className="text-lg sm:text-xl font-bold text-gray-800">
                  Rs. {product.sell_price}
                </span>
                {product.actual_price && (
                  <span className="text-gray-400 line-through text-sm sm:text-base">
                    Rs. {product.actual_price}
                  </span>
                )}
                {product.discount && (
                  <span className="text-green-600 font-semibold text-xs sm:text-sm">
                    {product.discount} off
                  </span>
                )}
              </div>
            </div>
            <AddtoCartFeatured product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
