// "use client";

import React from "react";
import { AddToCart } from "@/components/addtocartbutton";
// import MainTopBar from "@/components/mainTopbar";
import ProductTabs from "@/components/ProductTabsDes";
import OverViewProject from "./OverViewProject";
import CatalogButton from "./Catalog";
import RecommendedProducts from "./Recommendation";
import { Star, Share2 } from "lucide-react";
import ButtonForShare from "./ButtonForShare";
import { baseUrl } from "@/utils/config";
import ProductCardList from "./ProductCardList";
import QuantitySelector from "./QuantitySelector";
import useQuantityStore from "@/stores/AddtoCartStore";
import toast from "react-hot-toast";
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
    image_url: product.image_full_url || "/assets/logo.png",
    description: product.product_description,
    available_quantity: product.available_quantity,
    unit_info: product.unit_info,
    flash_sale: product.flash_sale === "1",
    delivery_days: product.delivery_target_days,
  };
}

//fetch api data
const getProductByCode = async (code) => {
  try {
    const res = await fetch(`${baseUrl}/products/details/${code}`);

    if (!res.ok) {
      console.log("Failed to fetch product:", res.status);
      // toast.error()
      return null;
    }

    const data = await res.json();

    const product = data.product || null;
    if (!product) return null;

    // Transform it to match your desired structure
    return {
      id: product.id,
      average_rating: product.average_rating,
      review_count: product.review_count,
      reviews: product.reviews,
      product_name: product.product_name,
      product_code: product.product_code,
      slug: product.slug,
      catalogue_url: product.catalogue_full_url,
      specification: product.key_specifications,
      packaging: product.packaging,
      warranty: product.warranty,
      has_variations: product.has_variations,
      variations: product.variations,
      brand: product.brand?.brand_name || "No Brand",
      category: product.category?.category_name || "Uncategorized",
      item_number: `#${product.product_code}`,
      actual_price: product.actual_price,
      sell_price: product.sell_price,
      stock_quantity: product.stock_quantity,
      available_quantity: product.available_quantity,
      image_url:
        product.image_full_url ||
        product.main_image_full_url || product.main_image ||
        "/assets/logo.png",
      description: product.product_description,
      available_quantity: product.available_quantity,
      unit_info: product.unit_info,
      flash_sale: product.flash_sale === "1",
      delivery_days: product.delivery_target_days,
      files_full_url: product.files_full_url,
    };
  } catch (error) {
    console.log("API fetch error:", error.message);
    return null;
  }
};

export default async function ProductPage({ params }) {
  params = await params;
  console.log("Server-side params:", params.code);
  console.info("Data fetch started");
  // console.warn(`(Link) : ${baseUrl}/products/details/${params.code}`);

  // 1const quantity = useQuantityStore((state) => state.quantity);
  // console.log("quantity", quantity);
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
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <>
      {/* Product Details */}
      <div className="max-w-6xl h-max-screen origin-top mx-auto mb-10 pt-20 px-4">
        <h1 className="text-2xl text-[#0072bc] font-semibold tracking-wide mb-8 -mt-15 flex justify-center">
          Product Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 origin-top">
          {/* Product Image */}
          <OverViewProject product={product} />
          {/* <ProductImageZoomSeparate product={product} /> */}

          {/* Product Details */}
          <div>
            <div className="flex justify-between items-center space-x-2 mb-2 w-full max-w-full">
              <div className="max-w-[300px] break-words">
                <p className="text-2xl font-bold text-gray-800 break-words whitespace-normal">
                  {product.product_name || "N/A"}
                </p>
              </div>
              <ButtonForShare product={product} />
            </div>

            <div className="flex items-center space-x-1 mt-3 mb-3">
              {renderStars(parseInt(product.average_rating) || 0)}
              <span className="text-[12px] text-gray-500">
                ({product.review_count})
              </span>
            </div>
            <div className="flex items-baseline space-x-4 mb-2">
              <span className="text-2xl font-semibold text-red-600">
                Rs. {Number(product.sell_price).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {parseFloat(product.actual_price) >
                parseFloat(product.sell_price) && (
                  <span className="text-sm text-gray-500 line-through">
                    {Number(product.actual_price).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                )}
            </div>

            {product.catalogue_url && <CatalogButton product={product} />}

            <br />

            {/* Product Card List in place of Size */}
            <ProductCardList products={product.variations} />

            <br />
            {product.stock_quantity === 0 &&
              product.available_quantity === 0 &&
              !product.has_variations && (
                <p className="font-semibold text-[18px] text-red-600">
                  Out of stock !
                </p>
              )}
            {!product.has_variations &&
              product.stock_quantity > 0 &&
              product.available_quantity > 0 && <AddToCart product={product} />}
            <br />
            <ProductTabs product={product} />
          </div>
        </div>
        <br />
        <RecommendedProducts product={product.product_code} />
      </div>
    </>
  );
}
