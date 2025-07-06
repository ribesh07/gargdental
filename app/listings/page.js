"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/useCartStore";
import useToastStore from "@/stores/toastStore";
import useSelectedProductStore from "@/stores/sendingProduct";
import { baseUrl } from "@/utils/config";
import { apiRequest } from "@/utils/ApiSafeCalls";
// import HtmlDataConversion from "@/components/HtmlDataConversion";
// import productRequest from "@/components/product";
import { useRouter } from "next/navigation";
import { AddToCart } from "@/components/addtocartbutton";
// import { ProductCard } from "@/components/FeaturedProduct";
import ProductImageZoom from "@/components/ProductImageZoom";
import { BuyNow } from "@/components/BuyNow";
import { HtmlContent } from "@/components/HtmlDataConversion";

const DentalSuppliesListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12); // Number of products to display initially
  var visibleProducts = [];
  // console.warn(`Base Api Url: ${baseUrl}`);

  // const API_URL = `${baseUrl}/products/latest`;

  //handle load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
    // router.push("/product");
  };
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiRequest("/products/latest", false);
      // const limited = data.products?.slice(0, 10) || [];
      // Transform the API data to match the expected format
      const transformedProducts =
        data.products?.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          product_code: product.product_code,
          brand: product.brand?.brand_name || "No Brand",
          category: product.category?.category_name || "Uncategorized",
          item_number: `#${product.product_code}`,
          actual_price: product.actual_price,
          sell_price: product.sell_price,
          image_url:
            product.image_full_url ||
            `https://garg.omsok.com/storage/app/public/backend/productimages/werfas/2025_04_09_67f642c43e68d_removebg_preview_1.png`,
          description: product.product_description,
          available_quantity: product.available_quantity,
          unit_info: product.unit_info,
          flash_sale: product.flash_sale === "1",
          delivery_days: product.delivery_target_days,
        })) || [];

      visibleProducts = transformedProducts.slice(0, visibleCount);
      setProducts(visibleProducts);
      console.warn(
        `Transformed products: ${JSON.stringify(transformedProducts)}`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsReady(true);
    fetchProducts();
  }, [visibleCount]);

  const router = useRouter();
  const setSelectedProduct = useSelectedProductStore(
    (state) => state.setSelectedProduct
  );

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    router.push(`/dashboard/${product.product_code}`);
  };
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: "",
  });

  const [sortBy, setSortBy] = useState("price-low-high");

  // Get unique values for filter options
  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];
  const priceRanges = [
    { label: "Under Rs.100", min: 0, max: 100 },
    { label: "Rs.100 - Rs.200", min: 100, max: 200 },
    { label: "Rs.200 - Rs.300", min: 200, max: 300 },
    { label: "Rs.200 - Rs.500", min: 200, max: 500 },
    { label: "Above Rs.500", min: 500, max: Infinity },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const priceRange = priceRanges.find(
          (range) => range.label === filters.priceRange
        );
        const price = parseFloat(product.sell_price);
        if (priceRange && (price < priceRange.min || price > priceRange.max)) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return parseFloat(a.sell_price) - parseFloat(b.sell_price);
        case "price-high-low":
          return parseFloat(b.sell_price) - parseFloat(a.sell_price);
        case "name-a-z":
          return a.product_name.localeCompare(b.product_name);
        case "name-z-a":
          return b.product_name.localeCompare(a.product_name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      brand: "",
      priceRange: "",
    });
  };

  const formatPrice = (price) => {
    return `Rs.${parseFloat(price).toFixed(2)}`;
  };

  // if (!isReady) return null; //check for persist zustand to load

  return (
    <>
      <div className="max-w-7xl mx-auto -my-3 sm:-my-4 lg:-my-6 p-2 sm:p-4 lg:p-6">
        {/* Header */}
        <div className="bg-gray-100 p-3 sm:p-4 lg:p-5 rounded-lg mb-3 sm:mb-4 lg:mb-5 shadow">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-2 sm:mb-2.5">
            Browse Supplies Results
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
            <span className="text-gray-600 text-sm sm:text-base">
              Showing dental supplies and equipment
            </span>
            <div className="flex items-center w-full sm:w-auto">
              <span className="mr-2 m-1 text-sm">Sort by :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-2 sm:px-4 py-1 sm:py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-sm flex-1 sm:flex-none"
              >
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
                <option>Brand</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Refine by:
            </span>

            {/* Category Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm w-full sm:w-auto"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Brand Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm w-full sm:w-auto"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Price Range Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="appearance-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm w-full sm:w-auto"
              >
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {(filters.category || filters.brand || filters.priceRange) && (
              <button
                onClick={() => clearFilters()}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base w-full sm:w-auto text-left sm:text-center"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredAndSortedProducts.length} of {products.length}{" "}
            products
          </p>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sm-gap-x-6 gap-x-4 gap-y-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCardMain
                key={product.id}
                product={product}
                showDiscount={
                  parseFloat(product.actual_price) >
                  parseFloat(product.sell_price)
                }
              />
            ))}
          </div>
        </div>

        {/* load more */}
        {visibleCount && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => handleLoadMore()}
              className="bg-[#bf0000] text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">
              No products found matching your filters.
            </p>
            <button
              onClick={() => clearFilters}
              className="mt-3 sm:mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Clear all filters to see all products
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Styled product card for main listing (copy style from featured, but only show main listing fields)
function ProductCardMain({ product, showDiscount }) {
  const router = useRouter();
  return (
    <div className="flex flex-col sm-h-[250px] h-full min-h-[340px] bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
      <div
        className="flex-1 flex flex-col cursor-pointer"
        onClick={() => router.push(`/dashboard/${product.product_code}`)}
      >
        <div className="relative mb-2 sm:mb-3 lg:mb-4">
          <ProductImageZoom
            imageUrl={product.image_url}
            alt={product.product_name}
          />
          {showDiscount && product.actual_price && (
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-0.5 rounded">
              SALE
            </div>
          )}
        </div>
        <p className="text-[14px] text-gray-500 uppercase">{product.brand}</p>
        <h3 className="text-[14px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {product.product_name}
        </h3>
        <HtmlContent
          html={product.description}
          className="text-gray-500 text-[14px] mb-0.5 flex-grow line-clamp-1"
        />
        {/* <HtmlDataConversion description={product.description} /> */}

        <div className="mt-2 justify-center">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-0.5 cursor-pointer">
            {product.actual_price &&
              product.actual_price !== "0.00" &&
              parseFloat(product.actual_price) >
                parseFloat(product.sell_price) && (
                <span className="text-[14px] text-gray-400 line-through">
                  Rs. {product.actual_price}
                </span>
              )}
            <span className="text-[14px] sm:text-base font-bold text-red-600">
              Rs. {product.sell_price}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto w-full">
        <BuyNow product={product} />
      </div>
      <div className="mt-auto w-full">
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default DentalSuppliesListing;
