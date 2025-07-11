"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  Tag,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useSelectedProductStore from "@/stores/sendingProduct";
import { AddToCart } from "@/components/addtocartbutton";
import { BuyNow } from "@/components/BuyNow";
// import MainTopBar from "@/components/mainTopbar";
import { baseUrl } from "@/utils/config";
import HtmlDataConversion from "@/components/HtmlDataConversion";

const API_URL = `${baseUrl}/products/all`;
const ProductAPIRequest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const router = useRouter();
  const setSelectedProduct = useSelectedProductStore(
    (state) => state.setSelectedProduct
  );

  console.warn(API_URL);
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    router.push(`/dashboard/${product.product_code}`);
  };

  const formatPrice = (price) => {
    return `Rs.${parseFloat(price).toFixed(2)}`;
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

      setProducts(transformedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen origin-top bg-gray-50 p-6">
      {/* <MainTopBar /> */}
      <div className="max-w-7xl  my-6 mx-auto ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              Product Catalog
            </h1>
            <button
              onClick={() => fetchProducts()}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
              Refresh
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg border-gray-300 shadow-sm border">
            {/* <p className="text-sm text-gray-600 mb-2">
              <strong>API Endpoint:</strong> GET {API_URL}
            </p> */}
            <p className="text-sm text-gray-600">
              Total Products:{" "}
              <span className="font-semibold text-blue-600">
                {products.length}
              </span>
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, codes, or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error fetching products:</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading products...</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="max-w-7xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
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
                      className="w-full h-48 object-contain p-2 rounded-lg"
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

                    <HtmlDataConversion description={product.description} />

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

                    <BuyNow product={product} />
                    <AddToCart product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Product Grid */}
        {/* No Results */}
        {!loading && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products available
            </h3>
            <p className="text-gray-600">
              Check your API connection or try refreshing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAPIRequest;
