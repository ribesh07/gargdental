// "use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import AddToCartButton, { AddToCart } from "@/components/addtocartbutton";
// import MainTopBar from "@/components/mainTopbar";
import ProductTabs from "@/components/ProductTabsDes";
import VideoToggle from "./OverViewProject";
import OverViewProject from "./OverViewProject";
import CatalogButton from "./Catalog";
// import { AddToCart } from "@/components/addtocartbutton";

const saampledata = {
  id: 1,
  product_code: "HE00005",
  product_name: "Articulating Paper 200 strips",
  slug: "articulating-paper-200-strips",
  product_description: "Articulating Paper 200 strips",
  category_id: 1,
  delivery_target_days: null,
  discount: null,
  actual_price: "0.00",
  sell_price: "600.00",
  mr_price: "900.00",
  unit_info: "PCS",
  available_quantity: "100.00",
  stock_quantity: "150.00",
  brand_id: 1,
  product_location: null,
  has_variations: 0,
  flash_sale: "1",
  status: 1,
  created_at: "2025-04-11T06:26:40.000000Z",
  updated_at: "2025-05-18T10:00:36.000000Z",
  files_full_url: [
    "http://192.168.1.64:8000/storage/backend/productimages/HE00005/articulating_paper_200_strips.jpeg",
    "http://192.168.1.64:8000/storage/backend/productimages/HE00005/prosthodontics.jpg",
    "http://192.168.1.64:8000/storage/backend/productimages/HE00005/xiaomi_3d_product_animation2.mp4",
  ],
  image_full_url:
    "https://gargdemo.omsok.com/storage/app/public/backend/productimages/A200001/fleximeter_strips_bk_253.jpeg",
  category: {
    id: 1,
    category_name: "category 1",
    parent_id: null,
    image: "2025-05-01-68134ec252d23.png",
    status: 1,
    created_at: "2025-05-01T10:08:44.000000Z",
    updated_at: "2025-05-01T10:36:50.000000Z",
    image_full_url:
      "https://gargdemo.omsok.com/storage/app/public/backend/productimages/A200001/fleximeter_strips_bk_253.jpeg",
    storage: [
      {
        id: 49,
        data_type: "App\\Models\\Category",
        data_id: "1",
        key: "image",
        value: "public",
        created_at: "2025-05-01 16:21:50",
        updated_at: "2025-05-01 16:21:50",
      },
    ],
  },
  brand: {
    id: 1,
    brand_name: "Meta",
    status: 1,
    created_at: "2025-05-02T06:11:17.000000Z",
    updated_at: "2025-05-04T07:55:55.000000Z",
  },
};

//to transform product
function transformProduct(product) {
  return {
    id: product.id,
    product_name: product.product_name,
    product_code: product.product_code,
    brand: product.brand?.brand_name || "No Brand",
    category: product.category?.category_name || "Uncategorized",
    item_number: `#${product.product_code}`,
    actual_price: product.actual_price,
    sell_price: product.sell_price,
    image_url: product.image_full_url || "",
    description: product.product_description,
    available_quantity: product.available_quantity,
    unit_info: product.unit_info,
    flash_sale: product.flash_sale === "1",
    delivery_days: product.delivery_target_days,
  };
}

//fetch api data
export async function getProductByCode(code) {
  try {
    const res = await fetch(
      `https://garg.omsok.com/api/v1/products/details/${code}`,
      {
        cache: "no-store", // prevent caching
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    const data = await res.json();

    const product = data || null;
    if (!product) return null;

    // Transform it to match your desired structure
    return {
      id: product.id,
      product_name: product.product_name,
      product_code: product.product_code,
      slug: product.slug,
      brand: product.brand?.brand_name || "No Brand",
      category: product.category?.category_name || "Uncategorized",
      item_number: `#${product.product_code}`,
      actual_price: product.actual_price,
      sell_price: product.sell_price,
      image_url:
        product.image_full_url ||
        "https://garg.omsok.com/storage/app/public/backend/productimages/werfas/2025_04_09_67f642c43e68d_removebg_preview_1.png",
      description: product.product_description,
      available_quantity: product.available_quantity,
      unit_info: product.unit_info,
      flash_sale: product.flash_sale === "1",
      delivery_days: product.delivery_target_days,
    };
  } catch (error) {
    console.error("API fetch error:", error.message);
    return null;
  }
}

export default async function ProductPage({ params }) {
  params = await params;
  console.log("Server-side params:", params.code);
  console.info("Data fetch started");
  // console.warn(
  //   `(Link) : http://192.168.1.64:8000/api/v1/products/details/${params.code}`
  // );
  console.warn(
    `(Link) : https://garg.omsok.com/api/v1/products/details/${params.code}`
  );

  const product = await getProductByCode(params.code);
  // const product = transformProduct(saampledata);
  console.warn(`Server-side product: ${JSON.stringify(product)}`);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Product not found
      </div>
    );
  }

  return (
    <>
      {/* Product Details */}
      <div className="max-w-6xl h-max-screen scale-90 origin-top mx-auto mb-20 py-20 px-4">
        <h1 className="text-2xl text-[#0072bc] font-semibold tracking-wide mb-8 -mt-15 flex justify-center">
          Product Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <OverViewProject product={product} />

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.product_name}</h1>
            <div className="flex items-baseline space-x-4 mb-2">
              <span className="text-2xl font-semibold text-red-600">
                {product.sell_price}
              </span>
              <span className="text-lg text-gray-400 line-through">
                {product.actual_price}
              </span>
              <span className="text-green-600 text-sm font-semibold">
                ({product.discount}% OFF)
              </span>
            </div>
            <div className="mb-2 text-green-700 font-medium">
              {product.available_quantity}
            </div>
            <br />
            <div className="flex items-center space-x-3 mb-4">
              <button className="w-8 h-8 border rounded text-lg">-</button>
              <span>1</span>
              <button className="w-8 h-8 border rounded text-lg">+</button>
            </div>
            {/* <button
              // onClick={() => handleAddToCart(product)}
              className="bg-blue-800 text-white px-6 py-2 rounded font-semibold hover:bg-blue-900 transition"
            >
              Add to Cart
            </button> */}
            {/* <AddToCartButton product={product} /> */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Size:</p>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="XL"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2">XL</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="L"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2">L</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="XXL"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2">LX</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value="XXXL"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="ml-2">LXX</span>
                </label>
              </div>
            </div>
            <br />
            <CatalogButton />

            <br />

            <br />

            <AddToCart product={product} />
            <br />
            <ProductTabs product={product} />
          </div>
        </div>
      </div>
    </>
  );
}
