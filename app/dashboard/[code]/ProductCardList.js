"use client";
import { AddtoCartFeatured } from "@/components/addtocartbutton";
// import { parse } from "next/dist/build/swc/generated-native";
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
    available_quantity: v.available_quantity,
    stock_quantity: v.stock_quantity,
    image_full_url: v.image_full_url || "/assets/logo.png",
    main_image_full_url: v.main_image_full_url || "/assets/logo.png",
  }));

  // If no variations
  if (mappedVariations.length === 0) {
    return <p>No variations available.</p>;
  }
  return (
    <div className="max-h-[390px] sm:max-h-[390px] max-w-full w-full overflow-y-auto hide-scrollbar">
      <div className="flex flex-col space-y-4">
        {mappedVariations.map((product, idx) =>
          product.stock_quantity > 0 && product.available_quantity > 0 ? (
            <div
              key={product.id || idx}
              className="flex justify-between items-center border rounded-xl  p-3 sm:p-4 shadow-sm hover:shadow-md transition bg-gray-50 w-full min-w-0"
            >
              <div>
                <div className="flex-1 min-w-0">
                  <div className="max-w-full break-words">
                    <p className="font-medium text-gray-800 break-words whitespace-normal">
                      {product.product_name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-1">
                    <span className="text-lg sm:text-xl font-bold text-gray-800">
                      Rs. {Number(product.sell_price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
                    </span>
                    {parseFloat(product.actual_price) >
                      parseFloat(product.sell_price) && (
                      <span className="text-gray-400 line-through text-sm sm:text-base">
                        Rs. {Number(product.actual_price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
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
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
