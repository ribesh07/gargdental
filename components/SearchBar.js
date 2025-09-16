"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navloading, setNavLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null); // ref for outside click

  // Fetch suggestions
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
        setSuggestions(res.products?.products || []);
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

  // Detect click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]); // close dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      } else {
        handleSearch();
      }
    }
  };

  // Manual search
  const handleSearch = () => {
    if (searchTerm) {
      setNavLoading(true);
      router.push(`/product?query=${searchTerm}`);
      setSearchTerm("");
      setSuggestions([]);
      setNavLoading(false);
    }
  };

  // Select product
  const handleSelect = (product) => {
    setSearchTerm("");
    setSuggestions([]);
    if (product.product_code) {
      setNavLoading(true);
      router.push(`/dashboard/${product.product_code}`);
      setNavLoading(false);
    }
  };

  if (navloading) {
    return (
      <div className="w-full h-full text-center flex">
        <span className="m-auto">loading....</span>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`flex-1 relative ${
        pathname === "/product" ? "md:hidden" : ""
      }`}
    >
      {/* Input + buttons */}
      <div className="relative flex w-full mx-auto max-w-[210px] sm:max-w-lg">
        {/* Input field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What can we help you find?"
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm sm:text-base pr-8"
        />

        {/* Clear button (X) inside input */}
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSuggestions([]);
            }}
            className="absolute right-15 top-1/2 -translate-y-1/2 text-gray-900 hover:text-gray-600 "
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-[#0072bc] text-white px-3 sm:px-4 py-2 flex items-center justify-center rounded-r-md hover:bg-[#005fa3] transition-colors"
        >
          <Search className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" />
        </button>
      </div>

      {/* Dropdown */}
      {searchTerm && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 sm:max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-gray-500 text-sm">Searching...</div>
          ) : (
            suggestions.map((product) => (
              <div
                key={product.id || product.product_code}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b border-gray-200 flex items-center"
                onClick={() => handleSelect(product)}
              >
                <img
                  src={product.main_image_full_url || "/assets/logo.png"}
                  alt={product.product_name}
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 object-cover rounded border border-gray-200"
                />
                <span className="text-black text-xs sm:text-sm px-2">
                  {product.product_name}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
