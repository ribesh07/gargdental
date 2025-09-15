"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { useRouter } from "next/navigation";

export default function TopBrandPage() {
  const scrollRef = useRef(null);
  const [brands, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiRequest("/brands/top-brands", false);
      if (response.success) {
        const mapBrand = (brand) => {
          return {
            id: brand.id,
            name: brand.brand_name,
            image: brand.image_full_url,
          };
        };
        const mappedbrand = response.brands.map(mapBrand);
        console.log("mappedCategories", mappedbrand);
        setCategories(mappedbrand);
      }
    };
    fetchCategories();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  if (!brands) {
    return null;
  }

  return (
    <div className="bg-gray-50 -mt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-4 pt-6 ml-2">
          <h1 className="text-2xl font-bold text-gray-900">Top Brands</h1>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className={`${brand.bgColor} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group flex-shrink-0 w-48 sm:w-52 ml-4`}
                onClick={() =>
                  router.push(`/top_brandlist?brand_id=${brand.id}`)
                }
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-w-16 aspect-h-10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <div className="p-2 text-center hover:text-[#0072bc] hover:underline hover:underline-offset-1">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                    {brand.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Left Scroll */}
<button
  onClick={scrollLeft}
  className="hidden md:flex absolute top-1/2 left-0 transform -translate-y-1/2  bg-gray-50 rounded-full shadow-lg p-2 cursor-pointer  hover:bg-gray-50 transition duration-200 z-10 "
>
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>

{/* Right Scroll */}
<button
  onClick={scrollRight}
  className="hidden md:flex absolute top-1/2 right-0 transform -translate-y-1/2  bg-gray-50 rounded-full shadow-lg p-2 cursor-pointer  hover:bg-gray-50 transition duration-200 z-10"
>
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
</button>

        </div>
      </div>

      {/* Hide scrollbar style */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
