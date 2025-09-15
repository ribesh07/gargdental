"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";
import FullScreenLoader from "./FullScreenLoader";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // search suggestions loading
  const [navloading, setNavLoading] = useState(false); // navigation loader
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  //  Fetch suggestions
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

  // Debounce typing
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300);
  }, [searchTerm]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]); // open first product
      } else {
        handleSearch();
      }
    }
  };

  //  Manual search button
  const handleSearch = () => {
    if (searchTerm) {
      setNavLoading(true); // loader while navigating
      router.push(`/product?query=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
      setNavLoading(false); // stop loader after navigation
    }
  };

  // Select product (go to /dashboard/{product_code})
  const handleSelect = (product) => {
    setSearchTerm("");
    setSuggestions([]);
    if (product.product_code) {
      setNavLoading(true); // show loader immediately
      router.push(`/dashboard/${product.product_code}`);
      setNavLoading(false); // stop loader after navigation
    } else {
      console.warn("⚠️ No product_code found for:", product);
    }
  };

  //  Loader overlay
  if (navloading) {
    return <div className="w-full h-full text-center flex ">
      <span className="m-auto">loading....</span>
    </div> ;
  }

  if(pathname === "/product"){
  return (

    <>
 {pathname === "/product" && (
        <div className="flex-1 max-w-2xl md:hidden mx-8 relative">
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
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-200 flex items-center"
                    onClick={() => handleSelect(product)}
                  >
                    <img
                      src={product.main_image_full_url || "/assets/logo.png"}
                      alt={product.product_name}
                      className="inline-block border-1 border-blue-300 h-10 w-10 object-cover ml-2 rounded"
                    />
                    <span className="text-black text-xs px-2 py-2">
                      {product.product_name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          )}
        </div>
      )}
      </>
  );
}

  return (
    <>
      {pathname !== "/product" && (
        <div className="flex-1 max-w-2xl mx-8 relative">
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
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-200 flex items-center"
                    onClick={() => handleSelect(product)}
                  >
                    <img
                      src={product.main_image_full_url || "/assets/logo.png"}
                      alt={product.product_name}
                      className="inline-block border-1 border-blue-300 h-10 w-10 object-cover ml-2 rounded"
                    />
                    <span className="text-black text-xs px-2 py-2">
                      {product.product_name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
