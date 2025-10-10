"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function ProductShowcase() {
  const [specials, setSpecials] = useState([]);
  const [weeklies, setWeeklies] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to process and split products
  const processProducts = (data) => {
    const mappedData = data.map((product) => ({
      id: product.id,
      product_name: product.product_name,
      product_code: product.product_code,
      brand: product.brand?.brand_name || "No Brand",
      actual_price: product.actual_price,
      sell_price: product.sell_price,
      image_url:
          product.main_image_full_url ||
            product.image_url || product.main_image || 
            "/assets/logo.png",
      flash_sale: product.flash_sale,
      weekly_offer: product.weekly_offer,
      special_offer: product.special_offer,
    }));

    setSpecials(mappedData.filter((p) => p.special_offer).slice(-3));
    setWeeklies(mappedData.filter((p) => p.weekly_offer).slice(-3));
    setFlashes(mappedData.filter((p) => p.flash_sale).slice(-3));
  };

  useEffect(() => {
    // 1. Check cache first
    const cached = localStorage.getItem("products");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        processProducts(parsed);
        setLoading(false); // show instantly
      } catch {
        console.warn("Failed to parse cache");
        localStorage.removeItem("products");
      }
    }

    // 2. Always fetch fresh in background
    const fetchProducts = async () => {
      try {
        const response = await apiRequest("/products/all", false);
        const data = response?.products || [];
        processProducts(data);
        localStorage.setItem("products", JSON.stringify(data)); // update cache
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const ProductCard = (product) => (
    <div
      key={product.id}
      onClick={() => router.push(`/dashboard/${product.product_code}`)}
      className="bg-gray-50 rounded-lg shadow-md cursor-pointer hover:shadow-2xl p-3 flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
    >
      <img
        src={product.image_url}
        alt={product.product_name}
        className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
      />
      <div className="flex-1">
        <p className="text-xs text-gray-500">{product.brand}</p>
        <h3 className="text-xs sm:text-sm font-medium">
          {product.product_name}
        </h3>
        <div className="flex items-center space-x-2">
          {parseFloat(product.actual_price) > parseFloat(product.sell_price) && (
            <span className="text-sm text-gray-500 line-through">
              {Number(product.actual_price).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          )}
          <span className="text-red-600 font-bold text-xs sm:text-sm">
            {Number(product.sell_price).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        {loading && !specials.length && !weeklies.length && !flashes.length ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Special Products */}
            <div>
              <h2 className="text-lg font-bold text-gray-600 mb-3 uppercase">
                Special Products
              </h2>
              <div className="space-y-3">
                {specials.length > 0 ? (
                  specials.map(ProductCard)
                ) : (
                  <p className="text-sm text-gray-400">
                    No special products
                  </p>
                )}
              </div>
            </div>

            {/* Weekly Products */}
            <div>
              <h2 className="text-lg font-bold text-gray-600 mb-3 uppercase">
                Weekly Products
              </h2>
              <div className="space-y-3">
                {weeklies.length > 0 ? (
                  weeklies.map(ProductCard)
                ) : (
                  <p className="text-sm text-gray-400">
                    No weekly products
                  </p>
                )}
              </div>
            </div>

            {/* Flash Products */}
            <div>
              <h2 className="text-lg font-bold text-gray-600 mb-3 uppercase">
                Flash Products
              </h2>
              <div className="space-y-3">
                {console.log(flashes)}
                {flashes.length > 0 ? (
                  flashes.map(ProductCard)
                ) : (
                  <p className="text-sm text-gray-400">
                    No flash products
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
