"use client";
import { AddtoCartFeatured } from "@/components/addtocartbutton";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import WishListHeart from "@/components/WishListHeart";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RecommendedProducts({ product }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await apiRequest(
        `/products/related-products/${product}`,
        false
      );
      if (response.success) {
        console.log("Related products:", response.related_products);
        const mappeddata = response.related_products.map((product) => ({
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
            product.image_url ||
            "/assets/logo.png",
          description: product.product_description,
          available_quantity: product.available_quantity,
          unit_info: product.stock_quantity,
          flash_sale: product.flash_sale,
          delivery_days: product.delivery_target_days,
        }));
        setFeaturedProducts(mappeddata);
        console.log("Mapped data:", mappeddata);
        // setFeaturedProducts();
      } else {
        setFeaturedProducts([]);
      }
    } catch (err) {
      console.log("Error fetching related products:", err);
      return [];
    }
  };
  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, []);
  const router = useRouter();
  const scrollRef = useRef(null);
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
  if (featuredProducts.length > 0) {
    return (
      <div className="min-h-[200px] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              RELATED PRODUCTS
            </h1>
          </div>

          {/* Scrollable Container */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
            >
              <ProductSection
                title="Products"
                products={featuredProducts}
                showDiscount={true}
              />
            </div>

            {/* Left Scroll */}
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-50 rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-50 transition duration-200 z-10"
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
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-50 rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-50 transition duration-200 z-10"
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
      </div>
    );
  }
  return null;
}

const ProductCard = ({ product, showDiscount = false }) => {
  const pathname = usePathname();
  const [user, setUser] = useState({});

  const router = useRouter();
  const [isloggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setIsloggedin(true);
        // const details = await userDetails();
      } else {
        setIsloggedin(false);
      }
    };

    checkAuth();

    // document.addEventListener("mousedown", handleClickOutside);
    // return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pathname]);

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
    <div className="flex flex-col h-full w-50 bg-gray-50 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
      <div className="relative mb-4">
        {isloggedin && (
          <div className="absolute top-1 left-1 z-10 p-1 rounded-full bg-gray-50/70 backdrop-blur-sm  hover:scale-105 transition-transform duration-200">
            <WishListHeart product={product} />
          </div>
        )}

        <Link href={`/dashboard/${product.product_code}`}>
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-32 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        {showDiscount && product.actual_price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>

      <Link
        href={`/dashboard/${product.product_code}`}
        className="flex-1 flex flex-col justify-between cursor-pointer"
      >
        <div className="space-y-1 hover:underline">
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
        </div>
        <div className="mt-2 justify-center">
          <div className="flex items-center space-x-2 mb-2">
            {parseFloat(product.actual_price) >
              parseFloat(product.sell_price) && (
              <span className="text-sm text-gray-500 line-through">
                {Number(product.actual_price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
              </span>
            )}
            <span className="text-base font-bold text-red-600">
              Rs. {Number(product.sell_price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex self-center justify-center">
        <AddtoCartFeatured product={product} fullWidth />
      </div>
    </div>
  );
};
const ProductSection = ({ title, products, showDiscount = false }) => (
  <div className="mb-2">
    <div className="flex items-center space-x-2 gap-2 mb-2">
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
