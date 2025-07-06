import React from "react";

export default function ProductCardList({ products = [] }) {
  // Each card is about 120px tall (including padding/margin), so max-h-[390px] for 3 cards on desktop, less on mobile
  return (
    <div className="max-h-[390px] sm:max-h-[390px] max-w-full w-full overflow-y-auto">
      <div className="flex flex-col space-y-4">
        {products.map((product, idx) => (
          <div
            key={product.id || idx}
            className="flex justify-between items-center border rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition bg-white w-full min-w-0"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 truncate">
                {product.product_name}
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-1">
                <span className="text-lg sm:text-xl font-bold text-gray-800">₹ {product.sell_price}</span>
                {product.actual_price && (
                  <span className="text-gray-400 line-through text-sm sm:text-base">
                    ₹ {product.actual_price}
                  </span>
                )}
                {product.discount && (
                  <span className="text-green-600 font-semibold text-xs sm:text-sm">
                    {product.discount}% off
                  </span>
                )}
              </div>
              {product.coins && (
                <div className="flex items-center text-yellow-500 font-medium text-sm sm:text-base">
                  <span className="mr-1">🪙</span> {product.coins}
                </div>
              )}
            </div>
            <button className="border border-orange-500 text-orange-500 px-4 sm:px-8 py-2 rounded-lg font-semibold hover:bg-orange-50 transition ml-2 flex-shrink-0 text-sm sm:text-base">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 