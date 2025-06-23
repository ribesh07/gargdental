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
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-4">
      <div className="relative mb-4">
        <img
          src={product.image_url}
          alt={product.product_name}
          onClick={() => router.push(`/dashboard/${product.product_code}`)}
          className="w-full h-32 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
        />
        {showDiscount && product.actual_price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.product_name}
        </h3>

        <div className="flex items-center space-x-1">
          {renderStars(product.rating || 0)}
          <span className="text-xs text-gray-500">
            ({product.reviews || 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {product.actual_price && (
              <span className="text-[12px] text-gray-400 line-through">
                Rs. {product.actual_price}
              </span>
            )}
            <span className="text-lg text-[14px] mr-1 font-bold text-red-600">
              Rs. {product.sell_price}
            </span>
          </div>
          {/* <button className="md:w-auto my-2 bg-gray-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">
            ADD TO CART
          </button> */}
          <AddtoCartFeatured product={product} />
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ title, products, showDiscount = false }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-wide">
      {title}
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
  <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-sm">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            FEATURED PRODUCTS
          </h1>
          <p className="text-gray-600">FIND NEW FEATURED PRODUCTS</p>
        </div>

        {/* Featured Products */}
        <ProductSection
          title="Featured Products"
          products={featuredProducts}
          showDiscount={true}
        />

        {/* Three Column Layout for Special, Weekly, and Flash Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Special Products */}
          <div>
            <h2 className="text-xl font-bold text-gray-600 mb-4 uppercase">
              Special Products
            </h2>
            <div className="space-y-4">
              {specialProducts.map((product, index) => (
                <div
                  onClick={() =>
                    router.push(`/dashboard/${product.product_code}`)
                  }
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-2xl p-4 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-16 h-16 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="text-sm font-medium">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-400 line-through">
                        {product.actual_price}
                      </span>
                      <span className="text-red-600 font-bold">
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
            <h2 className="text-xl font-bold text-gray-600 mb-4 uppercase">
              Weekly Products
            </h2>
            <div className="space-y-4">
              {weeklyProducts.map((product, index) => (
                <div
                  onClick={() =>
                    router.push(`/dashboard/${product.product_code}`)
                  }
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-2xl  p-4 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-16 h-16 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="text-sm font-medium">
                      {product.product_name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400 line-through">
                        {product.actual_price}
                      </span>
                      <span className="text-red-600 font-bold">
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
            <h2 className="text-xl font-bold text-gray-600 mb-4 uppercase">
              Flash Products
            </h2>
            <div className="space-y-4">
              {flashProducts.map((product, index) => (
                <div
                  onClick={() =>
                    router.push(`/dashboard/${product.product_code}`)
                  }
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-2xl  p-4 flex items-center space-x-4 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-16 h-16 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <h3 className="text-sm font-medium">
                      {product.product_name}
                    </h3>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400 line-through">
                        {product.actual_price}
                      </span>
                      <span className="text-red-600 font-bold">
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
        <div className="grid grid-cols-1 my-8 pt-5 md:grid-cols-3 gap-6">
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
