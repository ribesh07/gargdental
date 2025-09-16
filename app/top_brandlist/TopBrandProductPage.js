"use client";
import React, { useState, useEffect } from "react";
import { Package, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";
import ProductImageZoom from "@/components/ProductImageZoom";
import { AddToCart, ViewProducts } from "@/components/addtocartbutton";
import { BuyNow } from "@/components/BuyNow";
import { useSearchParams } from "next/navigation";

function TopBrandProductPage() {
  const searchParams = useSearchParams();
  const brandIdFromQuery = searchParams.get("brand_id");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Fetch top brands on mount
  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiRequest("/brands/top-brands", false);
        if (response.success && response.brands.length > 0) {
          setBrands(response.brands);
          // If brand_id is in query, select that brand, else first
          const found = response.brands.find(b => String(b.id) === String(brandIdFromQuery));
          setSelectedBrand(found || response.brands[0]);
        } else {
          setError("No top brands found.");
        }
      } catch (err) {
        setError("Failed to fetch top brands.");
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandIdFromQuery]);

  // Fetch categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiRequest("/categories", false);
      if (response.success) {
        const mapCategory = (category) => ({
          id: category.id,
          name: category.category_name,
          image: category.image_full_url,
          parent_id: category.parent_id,
          active_children: category.active_children?.map(mapCategory) || [],
        });
        setCategories(response.categories.map(mapCategory));
      }
    };
    fetchCategories();
  }, []);

  // Fetch products for selected brand and offset
  useEffect(() => {
    if (!selectedBrand) return;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiRequest(
          `/products/brand-wise-products?brand_id=${selectedBrand.id}&limit=${limit}&offset=${offset}`,
          false
        );
        if (!response.success) throw new Error(response.message || "Failed to fetch products");
        const transformedProducts =
          response.products?.map((product) => ({
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
            image_url:
              product.main_image_full_url ||
              product.image_full_url ||
              "/assets/logo.png",
            description: product.product_description,
            available_quantity: product.available_quantity,
            unit_info: product.unit_info,
            flash_sale: product.flash_sale === 1 || product.flash_sale === "1",
            delivery_days: product.delivery_target_days,
          })) || [];
        setProducts((prev) => (offset === 0 ? transformedProducts : [...prev, ...transformedProducts]));
        setHasMore(transformedProducts.length === limit);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand, offset]);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  console.log("Filtered Products:", filteredProducts.length);

  // Handle brand change
  const handleBrandChange = (e) => {
    const brand = brands.find((b) => b.id === parseInt(e.target.value));
    setSelectedBrand(brand);
    setProducts([]);
    setOffset(0);
  };

  // Handle load more
  const loadMore = () => setOffset((prev) => prev + limit);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl my-6 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              {selectedBrand ? ` ${selectedBrand.brand_name || selectedBrand.name}` : ""}
            </h1>
           
          </div>
        </div>

        {/* Filters */}
        

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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 sm-gap-x-6 gap-x-4 gap-y-4">
              {filteredProducts
              .map((product) => (
                <ProductCardMain
                  key={product.id}
                  product={product}
                  showDiscount={parseFloat(product.actual_price) > parseFloat(product.sell_price)}
                />
              ))}
            </div>
            {/* Load More Button */}
            {filteredProducts.length > 0 && hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={loadMore}
                  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-600">Check your API connection or try refreshing.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCardMain({ product, showDiscount }) {
  const router = useRouter();
  return (
    <div className="flex flex-col sm-h-[250px] h-full min-h-[340px] bg-gray-50 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
      <div
        className="flex-1 flex flex-col cursor-pointer"
        onClick={() => router.push(`/dashboard/${product.product_code}`)}
      >
        <div className="relative mb-2 sm:mb-3 lg:mb-4">
          <ProductImageZoom imageUrl={product.image_url} alt={product.product_name} />
          {product.flash_sale && (
            <div className="absolute top-0 sm:top-0 right-1 sm:right-2 border-2 border-red-500 rounded-full bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-0.5 animate-pulse">
              <span className="text-xs">Flash Sale</span>
            </div>
          )}
          {showDiscount && product.actual_price && (
            <div className="absolute top-8 sm:top-8 right-1 sm:right-2 bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-0.5 animate-bounce rounded-2xl">
              OFFER
            </div>
          )}
        </div>
        <p className="text-[14px] text-gray-500 uppercase">{product.brand}</p>
        <h3 className="text-[14px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.product_name}</h3>
        {/* <HtmlContent html={product.description} className="text-gray-500 text-[14px] mb-0.5 flex-grow line-clamp-1" /> */}
        {/* <HtmlDataConversion description={product.description} /> */}
        {!product.has_variations && (
          <div className="mt-2 justify-center">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-0.5 cursor-pointer">
              {product.actual_price && product.actual_price !== "0.00" && parseFloat(product.actual_price) > parseFloat(product.sell_price) && (
                <span className="text-[14px] text-gray-400 line-through">Rs. {Number(product.actual_price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}</span>
              )}
              <span className="text-[14px] sm:text-base font-bold text-red-600">Rs. {Number(product.sell_price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}</span>
            </div>
          </div>
        )}
      </div>
      {product.has_variations === 1 && (
        <div className="mt-auto w-full">
          <div className="mt-2 justify-center flex flex-col items-start">
            <span className="text-[16px] text-gray-400">Starting at</span>
            <span className="text-[14px] sm:text-base font-bold text-red-600">Rs. {product.starting_price}</span>
          </div>
          <ViewProducts product={product} />
        </div>
      )}
      {!product.has_variations && (
        <>
          <div className="mt-auto w-full">
            <BuyNow product={product} />
          </div>
          <div className="mt-auto w-full">
            <AddToCart product={product} />
          </div>
        </>
      )}
    </div>
  );
}

export default TopBrandProductPage;