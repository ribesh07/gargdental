"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  // ✅ Fetch suggestions
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await apiRequest(
        `/products/search?name=${encodeURIComponent(query)}&limit=10&offset=0`
      );

      if (res?.success) {
        const items = res.products?.products || [];
        setSuggestions(items);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce typing
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300);
  }, [searchTerm]);

  // ✅ Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]); // open first product
      } else {
        handleSearch();
      }
    }
  };

  // ✅ Manual search button
  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/product?query=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  // ✅ Select product (go to /dashboard/{product_code})
  const handleSelect = (product) => {
    setSearchTerm("");
    setSuggestions([]);
    if (product.product_code) {
      router.push(`/dashboard/${product.product_code}`);
    } else {
      console.warn("⚠️ No product_code found for:", product);
    }
  };

  return (
    <>
      {pathname !== "/product" && (
        <div className="hidden md:block flex-1 max-w-2xl mx-8 relative">
          {/* Input + button */}
          <div className="relative flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What can we help you find?"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bg-[#0072bc] text-white px-4 py-2 flex items-center justify-center rounded-r-md hover:bg-[#005fa3] transition-colors"
            >
              <Search />
            </button>
          </div>

          {/* Dropdown */}
          {searchTerm && (
            <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-3 text-gray-500 text-sm">Searching...</div>
              ) : suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <div
                    key={product.id || product.product_code}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                    onClick={() => handleSelect(product)}
                  >
                    {product.product_name}{" "}
                    <span className="text-gray-400 text-xs">
                      ({product.product_code})
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-sm">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
