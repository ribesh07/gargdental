"use client";
import React, { useState } from "react";
import { Star, Truck, Shield, Headphones } from "lucide-react";
import { AddtoCartFeatured } from "./addtocartbutton";
import fetchProducts from "@/utils/apiHelper";
import { useRouter } from "next/navigation";

const ProductCard = ({ product, showDiscount = false }) => {
  const router = useRouter();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-2 h-2 sm:w-3 sm:h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
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
            {product.actual_price && product.actual_price !== "0.00" && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {product.actual_price}
              </span>
            )}
            <span className="text-sm sm:text-base font-bold text-red-600">
              Rs. {product.sell_price}
            </span>
          </div>
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
  <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
    <div className="flex-shrink-0">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default function ProductShowcase() {
  const featuredProducts = [
    {
      id: 1,
      product_name: "Articulating Paper 200 strips",
      product_code: "HE00005",
      brand: "Meta",
      category: "category 1",
      item_number: "#HE00005",
      actual_price: "0.00",

      rating: 2,
      reviews: 18,
      sell_price: "600.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/HE00005/articulating_paper_200_strips.jpeg",
      description: "Articulating Paper 200 strips",
      available_quantity: "100.00",
      unit_info: "PCS",
      flash_sale: true,
      delivery_days: null,
    },
    {
      id: 2,
      product_name: "Articulating Paper Forceps",
      product_code: "A300001",
      brand: "No Brand",
      category: "Category 2",
      item_number: "#A300001",
      actual_price: "1000.00",
      sell_price: "900.00",
      rating: 4,
      reviews: 10,
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A300001/articulating_paper_forceps.jpeg",
      description: "Articulating Paper Forceps",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 3,
      product_name: "Bausch Progress 100",
      product_code: "A500002",
      brand: "No Brand",
      rating: 3,
      reviews: 8,
      category: "category 1",
      item_number: "#A500002",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500002/bausch_progress_100.jpeg",
      description: "Bausch Progress 100",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 4,
      product_name: "Fleximeter Strips BK 253",
      product_code: "A200001",
      brand: "No Brand",
      category: "category 1",

      rating: 5,
      reviews: 12,
      item_number: "#A200001",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A200001/fleximeter_strips_bk_253.jpeg",
      description: "Fleximeter Strips BK 253",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 5,
      product_name: "Bausch articulating paper BK 81",
      product_code: "A200002",
      brand: "No Brand",
      category: "category 1",

      rating: 1,
      reviews: 5,
      item_number: "#A200002",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A200002/bausch_articulating_paper_bk_81.jpeg",
      description: "Bausch articulating paper BK 81",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 6,
      product_name: "Arti Spot 2",
      product_code: "A500003",
      brand: "No Brand",
      category: "Sub Sub category 1",

      rating: 3,
      reviews: 8,
      item_number: "#A500003",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500003/arti_spot_2.jpeg",
      description: "Arti Spot 2",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
  ];

  const specialProducts = [
    {
      id: 2,
      product_name: "Articulating Paper Forceps",
      product_code: "A300001",
      brand: "No Brand",
      category: "Category 2",
      item_number: "#A300001",
      actual_price: "1000.00",
      sell_price: "900.00",
      rating: 4,
      reviews: 10,
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A300001/articulating_paper_forceps.jpeg",
      description: "Articulating Paper Forceps",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 3,
      product_name: "Bausch Progress 100",
      product_code: "A500002",
      brand: "No Brand",
      rating: 3,
      reviews: 8,
      category: "category 1",
      item_number: "#A500002",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500002/bausch_progress_100.jpeg",
      description: "Bausch Progress 100",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 4,
      product_name: "Fleximeter Strips BK 253",
      product_code: "A200001",
      brand: "No Brand",
      category: "category 1",

      rating: 5,
      reviews: 12,
      item_number: "#A200001",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A200001/fleximeter_strips_bk_253.jpeg",
      description: "Fleximeter Strips BK 253",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
  ];

  const weeklyProducts = [
    {
      id: 2,
      product_name: "Articulating Paper Forceps",
      product_code: "A300001",
      brand: "No Brand",
      category: "Category 2",
      item_number: "#A300001",
      actual_price: "1000.00",
      sell_price: "900.00",
      rating: 4,
      reviews: 10,
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A300001/articulating_paper_forceps.jpeg",
      description: "Articulating Paper Forceps",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 4,
      product_name: "Fleximeter Strips BK 253",
      product_code: "A200001",
      brand: "No Brand",
      category: "category 1",

      rating: 5,
      reviews: 12,
      item_number: "#A200001",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A200001/fleximeter_strips_bk_253.jpeg",
      description: "Fleximeter Strips BK 253",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 6,
      product_name: "Arti Spot 2",
      product_code: "A500003",
      brand: "No Brand",
      category: "Sub Sub category 1",

      rating: 3,
      reviews: 8,
      item_number: "#A500003",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500003/arti_spot_2.jpeg",
      description: "Arti Spot 2",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
  ];

  const flashProducts = [
    {
      id: 6,
      product_name: "Arti Spot 2",
      product_code: "A500003",
      brand: "No Brand",
      category: "Sub Sub category 1",

      rating: 3,
      reviews: 8,
      item_number: "#A500003",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500003/arti_spot_2.jpeg",
      description: "Arti Spot 2",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 1,
      product_name: "Articulating Paper 200 strips",
      product_code: "HE00005",
      brand: "Meta",
      category: "category 1",
      item_number: "#HE00005",
      actual_price: "0.00",
      sell_price: "600.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/HE00005/articulating_paper_200_strips.jpeg",
      description: "Articulating Paper 200 strips",
      available_quantity: "100.00",
      unit_info: "PCS",
      flash_sale: true,
      delivery_days: null,
    },
    {
      id: 2,
      product_name: "Articulating Paper Forceps",
      product_code: "A300001",
      brand: "No Brand",
      category: "Category 2",
      item_number: "#A300001",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A300001/articulating_paper_forceps.jpeg",
      description: "Articulating Paper Forceps",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
  ];
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
            FEATURED PRODUCTS
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">FIND NEW FEATURED PRODUCTS</p>
        </div>

        {/* Featured Products */}
        <ProductSection
          title="Featured Products"
          products={featuredProducts}
          showDiscount={true}
        />

        {/* Three Column Layout for Special, Weekly, and Flash Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {/* Special Products */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-600 mb-3 sm:mb-4 uppercase">
              Special Products
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {specialProducts.map((product, index) => (
                <div
                  onClick={() =>
                    router.push(`/dashboard/${product.product_code}`)
                  }
                  key={index}
                  className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-2xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="text-xs sm:text-sm font-medium">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {product.actual_price}
                      </span>
                      <span className="text-red-600 font-bold text-xs sm:text-sm">
                        {product.sell_price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Products */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-600 mb-3 sm:mb-4 uppercase">
              Weekly Products
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {weeklyProducts.map((product, index) => (
                <div
                  onClick={() =>
                    router.push(`/dashboard/${product.product_code}`)
                  }
                  key={index}
                  className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-2xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="text-xs sm:text-sm font-medium">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {product.actual_price}
                      </span>
                      <span className="text-red-600 font-bold text-xs sm:text-sm">
                        {product.sell_price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flash Products */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-600 mb-3 sm:mb-4 uppercase">
              Flash Products
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {flashProducts.map((product, index) => (
                <div
                  onClick={() =>
                    router.push(`/dashboard/${product.product_code}`)
                  }
                  key={index}
                  className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-2xl p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="text-xs sm:text-sm font-medium">
                      {product.product_name}
                    </h3>

                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        {product.actual_price}
                      </span>
                      <span className="text-red-600 font-bold text-xs sm:text-sm">
                        {product.sell_price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
