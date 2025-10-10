"use client";
import React, { useState, useEffect } from "react";
import { Star, Truck, Shield, Headphones } from "lucide-react";
import { AddtoCartFeatured } from "./addtocartbutton";
import { BuyNow } from "./BuyNow";
import fetchProducts from "@/utils/apiHelper";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";
import WeeklySpecial from "@/components/WeeklySpecial";

export const ProductCard = ({ product, showDiscount = false }) => {
  const router = useRouter();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-2 h-2 sm:w-3 sm:h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
      <div
        className="relative mb-2 sm:mb-3 lg:mb-4 cursor-pointer"
        onClick={() => router.push(`/dashboard/${product.product_code}`)}
      >
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-20 sm:h-24 lg:h-32 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
        />
        {showDiscount && product.actual_price && (
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded">
            SALE
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between cursor-pointer">
        <div
          className="space-y-1 hover:underline"
          onClick={() => router.push(`/dashboard/${product.product_code}`)}
        >
          <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2">
            {product.product_name}
          </h3>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating || 0)}
            <span className="text-xs text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        </div>
        <div className="mt-2 justify-center">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-2 cursor-pointer">
            {parseFloat(product.actual_price) >
              parseFloat(product.sell_price) && (
                <span className="text-sm text-gray-500 line-through">
                  {Number(product.actual_price).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              )}
            <span className="text-sm sm:text-base font-bold text-red-600">
              Rs. {Number(product.sell_price).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          {/* <BuyNow product={product} /> */}

          <AddtoCartFeatured product={product} fullWidth />
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ title, products, showDiscount = false }) => (
  <div className="mb-8 sm:mb-10 lg:mb-12">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-4 sm:mb-6 uppercase tracking-wide">
      {title}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          showDiscount={showDiscount}
        />
      ))}
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-sm">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default function ProductShowcase() {


  const [featuredProducts, setProducts] = useState([]);


  useEffect(() => {
    const fetchaLatestProducts = async () => {
      try {
        const response = await apiRequest("/products/latest", false);
        if (!response.success) return;
        const data = response.products;
        console.log("Latest products:", data);

        const mappeddata = data.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          product_code: product.product_code,
          has_variations: product.has_variations,
          starting_price: product.starting_price,
          brand: product.brand?.brand_name || "No Brand",
          category: product.category?.category_name || "Uncategorized",
          item_number: `#${product.product_code}`,
          actual_price: product.actual_price,
          sell_price: product.sell_price,
          rating: product.average_rating,
          reviews: product.review_count,
          image_url:
            product.main_image_full_url ||
            product.image_url || product.main_image || 
            "/assets/logo.png",
          description: product.product_description,
          available_quantity: product.available_quantity,
          unit_info: product.stock_quantity,
          flash_sale: product.flash_sale,
          delivery_days: product.delivery_target_days,
        }));

        const mapProduct = mappeddata.slice(0, 6);
        // const mapSpecial = mappeddata.slice(6, 9);
        // const mapWeekly = mappeddata.slice(9, 12);
        // const mapFlashSale = mappeddata.slice(12, 15);

        // console.log("Mapped latest products:", mapProduct);
        setProducts(mapProduct);
        // setSpecialProducts(mapSpecial);
        // setWeeklyProducts(mapWeekly);
        // setFlashSaleProducts(mapFlashSale);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchaLatestProducts();
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
            LATEST PRODUCTS
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            FIND NEW LATEST PRODUCTS
          </p>
        </div>

        {/* Featured Products */}
        <ProductSection
          title="LATEST Products"
          products={featuredProducts}
          showDiscount={true}
        />

        <WeeklySpecial />

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-8 pt-4 sm:pt-5">
          <FeatureCard
            icon={Truck}
            title="Low Shipping Cost"
            description="Get your order in lowest shipping cost."
          />
          <FeatureCard
            icon={Shield}
            title="Shop with Confidence"
            description="Our Protection covers your purchase from click to delivery"
          />
          <FeatureCard
            icon={Headphones}
            title="24/7 Help Center"
            description="Round-the-clock assistance for a smooth shopping experience"
          />
        </div>
      </div>
    </div>
  );
}