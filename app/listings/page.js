"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/useCartStore";
import useToastStore from "@/stores/toastStore";
import useSelectedProductStore from "@/stores/sendingProduct";

// import ProductAPIRequest from "@/components/ProductAPI";
import { useRouter } from "next/navigation";
import { AddToCart } from "@/components/addtocartbutton";

const DentalSuppliesListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // Number of products to display initially
  var visibleProducts = [];
  // const API_URL = "http://192.168.1.64:8000/api/v1/products/latest";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.warn(`Base Api Url: ${baseUrl}`);

  // const API_URL = "https://garg.omsok.com/api/v1/products/latest";
  const API_URL = `${baseUrl}/api/v1/products/latest`;

  //handle load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // load 3 more
  };
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
            "https://garg.omsok.com/storage/app/public/backend/productimages/werfas/2025_04_09_67f642c43e68d_removebg_preview_1.png",
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

  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.product_name} added to cart!`);
  };
  // if (!isReady) return null; //check for persist zustand to load

  return (
    <>
      <div className="max-w-7xl mx-auto -my-6 p-6">
        {/* Header */}
        <div className="bg-gray-50 p-5 rounded-lg mb-5 shadow">
          <h1 className="text-2xl font-bold text-blue-900 mb-2.5">
            Browse Supplies Results
          </h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              Showing dental supplies and equipment
            </span>
            <div className="flex items-center">
              <span className="mr-2 m-1">Sort by :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
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
        <div className="mb-8 pb-6 border-b">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-700 font-medium">Refine by:</span>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
            <div className="relative">
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
            <div className="relative">
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length}{" "}
            products
          </p>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-grey-50 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative hover:scale-105 transition-transform duration-300 p-4 pb-0">
                  <img
                    onClick={() => handleCardClick(product)}
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-48 object-cover p-2 rounded-lg"
                  />
                  {parseFloat(product.actual_price) >
                    parseFloat(product.sell_price) && (
                    <div className="absolute top-6 left-6 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info - Flexible container */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-blue-800 mb-1">
                    {product.product_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.brand} - Item {product.item_number}
                  </p>
                  <p className="text-gray-500 text-sm mb-3 flex-grow">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-[16px] font-italic text-red-600">
                      {formatPrice(product.sell_price)}
                    </span>
                    {parseFloat(product.actual_price) >
                      parseFloat(product.sell_price) && (
                      <span className="text-gray-500 text-[12px] line-through ml-2">
                        {formatPrice(product.actual_price)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button - Fixed at bottom */}
                  {/* <button
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 mt-auto"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4" />

                    <span className="text-sm">Add to Cart</span>
                  </button> */}
                  <AddToCart product={product} />
                  {/* <AddToCartButton product={product} /> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* load more */}
        {visibleCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => handleLoadMore()}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your filters.
            </p>
            <button
              onClick={() => clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters to see all products
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DentalSuppliesListing;
