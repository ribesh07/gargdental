"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Menu,
  ShoppingBag,
  Settings,
  User,
  Phone,
  HelpCircle,
  ChevronDown,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useCartStore from "@/stores/useCartStore";
import Link from "next/link";
import { userDetails } from "@/utils/apiHelper";
import { apiRequest } from "@/utils/ApiSafeCalls";

const HeaderBarNew = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuppliesDropdownOpen, setIsSuppliesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const suppliesRef = useRef(null);
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [isloggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setIsloggedin(true);
        const details = await userDetails();
        if (details) {
          setUser(details.email);
        }
      } else {
        setIsloggedin(false);
        setUser("");
      }
    };

    checkAuth();

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (suppliesRef.current && !suppliesRef.current.contains(event.target)) {
        setIsSuppliesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pathname]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartResponse = await apiRequest(`/customer/cart/list`, true);
      useCartStore.getState().setCart(cartResponse.cart || []);
      console.log(cartResponse);
    };
    fetchCart();
  }, []);
  const cartCount = useCartStore((state) => state.getCartCount());
  const cartTotal = useCartStore((state) => state.getCartTotal());

  const menuItems = [
    { label: "Dental Supplies", href: "#", hasSubmenu: true },
    { label: "Equipment", href: "#" },
    { label: "Technology", href: "#" },
    { label: "Office Supplies", href: "#" },
    { label: "Infection Control", href: "#" },
    { label: "Laboratory", href: "#" },
    { label: "Patient Care", href: "#" },
    { label: "Practice Management", href: "#" },
  ];

  const suppliesSubmenu = [
    { label: "Deal Of The Week", href: "#", color: "text-blue-600" },
    { label: "Top Deals", href: "#", color: "text-blue-600" },
    { label: "Browse Supplies", href: "#", color: "text-red-600" },
    { label: "Web Priced Products", href: "#", color: "text-blue-600" },
    { label: "Top Categories", href: "#", color: "text-blue-600" },
  ];

  // Search functionality
  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/productAPI/`);
      router.refresh();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsloggedin(false);
    setUser("");
    router.refresh();
    router.push("/dashboard");
  };

  return (
    <div className="w-full bg-white sticky top-0 z-50">
      <div className="w-full">
        {/* Top Navigation Bar - Hidden on mobile */}
        <div className="bg-gray-50 border-b-blue-100 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-end items-center py-2 space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-[12px] text-black">English</span>
                <span className="text-black">|</span>
              </div>
              <div className="flex items-center space-x-1 text-[#0072bc] text-[12px] hover:underline hover:text-red-600 hover:text-[13px] cursor-pointer">
                <Phone className="w-4 h-4" />
                <span>Contact Us</span>
              </div>
              <div className="flex items-center space-x-1 text-[#0072bc] text-[12px] hover:underline hover:text-red-600 hover:text-[13px] cursor-pointer">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto mb-2 px-2 md:px-4 bg-white">
          <div className="flex items-center justify-between py-2 md:py-4">
            {/* Logo and Rely on Us */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center">
                <img
                  onClick={() => router.push("/dashboard")}
                  src="/assets/logo.png"
                  alt="Garg Dental Logo"
                  className="h-14 w-18 md:h-20 md:w-30 cursor-pointer"
                />
              </div>
              {/* Hide "Rely on Us" on mobile */}
              <div className="hidden md:block bg-[#bf0000] text-white ml-5 px-3 py-1 shadow-lg transform hover:scale-105 rounded-full text-sm font-medium cursor-pointer">
                Rely on Us
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Cart Icon */}
              <button
                onClick={() => router.push("/cart")}
                className="relative p-2 text-gray-600 hover:text-red-600"
              >
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop Search Bar */}
            {pathname !== "/productAPI" && (
              <div className="hidden md:block flex-1 max-w-2xl mx-8">
                <div className="relative flex">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="What can we help you find?"
                    className="w-full px-4 py-2 flex items-center border border-gray-300 rounded-l-md focus:outline-none focus:border-gray-300"
                  />
                  <button
                    onClick={() => handleSearch()}
                    className="absolute right-0 top-0 bg-[#0072bc] text-white px-4 py-2 flex items-center justify-center rounded-r-md hover:bg-[#0072bc] transition-colors"
                  >
                    <Search />
                  </button>
                </div>
                <div className="mt-5">
                  <label className="flex items-center text-sm text-gray-600 hover:text-red-600">
                    <input type="checkbox" className="mr-2 cursor-pointer" />
                    Within Items Purchased
                  </label>
                </div>
              </div>
            )}

            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Menu Button with Dropdown */}
              <div className="relative transform hover:scale-105" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mb-1">
                    <Menu className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs">Menu</span>
                </button>

                {/* Main Menu Dropdown */}
                {isMenuOpen && (
                  <div className="absolute left-full top-full mt-2 w-64 bg-white border-gray-100 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {menuItems.map((item, index) => (
                        <div key={index} className="relative">
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-2 text-gray-700 transition-all duration-200 ${
                              item.hasSubmenu && isSuppliesDropdownOpen
                                ? "border-l-2 border-blue-500 text-red-600"
                                : " hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500"
                            }`}
                            onClick={() =>
                              item.hasSubmenu &&
                              setIsSuppliesDropdownOpen(!isSuppliesDropdownOpen)
                            }
                          >
                            <span>{item.label}</span>
                            {item.hasSubmenu && (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supplies Dropdown */}
                {isSuppliesDropdownOpen && (
                  <div
                    ref={suppliesRef}
                    className="absolute top-full right-0 mt-2 w-56 bg-white border-2 border-gray-100 shadow-lg z-50"
                    onClick={() => setIsMenuOpen(!isSuppliesDropdownOpen)}
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 bg-gray-50 font-semibold text-red-600">
                        Supplies & Small Equipment
                      </div>
                      {suppliesSubmenu.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 transition-all duration-200 ${item.color}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Shop Button */}
              <button
                onClick={() => router.push("/cart")}
                className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer transform hover:scale-105"
              >
                <div className="bg-red-100 p-2 rounded-lg mb-1 relative">
                  <ShoppingBag className="w-6 h-6 text-red-600" />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                </div>
                <span className="text-xs">Shop</span>
              </button>

              {/* My Account Button */}
              <button
                onClick={() => router.push("/myaccount")}
                className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transform hover:scale-105 transition-colors cursor-pointer"
              >
                <div className="bg-blue-100 p-2 rounded-lg mb-1">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs">My Account</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Always visible on mobile when not on productAPI page */}
          {pathname !== "/productAPI" && (
            <div className="md:hidden px-2 pb-4">
              <div className="relative flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="What can we help you find?"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-gray-300"
                />
                <button
                  onClick={() => handleSearch()}
                  className="bg-[#0072bc] text-white px-3 py-2 flex items-center justify-center rounded-r-md hover:bg-[#0072bc] transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Login Section */}
          <div className="hidden md:flex items-center justify-between py-1 border-t">
            {isloggedin && user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push("/account/profile")}
                  className="bg-[#0072bc] text-white text-[12px] h-8 px-2 rounded hover:bg-red-600 transition-colors flex items-center cursor-pointer"
                >
                  <User className="w-3 h-3 m-1" />
                  {user}
                </button>
              </div>
            )}

            {!isloggedin && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push("/account")}
                  className="bg-[#bf0000] text-white text-[12px] h-8 px-2 rounded hover:bg-red-600 transition-colors flex items-center cursor-pointer"
                >
                  <User className="w-3 h-3 mr-1" />
                  LOGIN
                </button>
                <Link
                  href="/account/signup"
                  onClick={() => router.push("/account/signup")}
                  className="text-[#0072bc] hover:underline text-[14px]"
                >
                  Create an Online Account
                </Link>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div
                className="flex items-center space-x-2 hover:underline cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                <span className="text-gray-700 text-[12px]">My Order:</span>
                <span className="font-bold text-lg text-[12px]">
                  {cartTotal}
                </span>
                <button className="bg-transparent text-blue-500 w-5 h-5 rounded  hover:text-red-500 transition-colors flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
              {isloggedin && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleLogout()}
                    className="bg-[#bf0000] text-white text-[12px] h-8 px-2 rounded hover:bg-red-600 transition-colors flex items-center cursor-pointer"
                  >
                    <User className="w-3 h-3 mr-1" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto">
              <div className="p-4">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Login Section */}
                <div className="mb-6 pb-4 border-b">
                  <button className="w-full bg-[#bf0000] text-white text-sm py-3 rounded hover:bg-red-600 transition-colors flex items-center justify-center mb-3">
                    <User className="w-4 h-4 mr-2" />
                    LOGIN
                  </button>
                  <Link
                    href="#"
                    className="block text-center text-[#0072bc] hover:underline text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create an Online Account
                  </Link>
                </div>

                {/* Mobile Cart Summary */}
                <div
                  className="mb-6 pb-4 border-b cursor-pointer"
                  onClick={() => {
                    router.push("/cart");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">My Order:</span>
                    <span className="font-bold text-lg">
                      {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    <span className="text-sm text-gray-600">
                      {cartCount} items
                    </span>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Contact Info */}
                <div className="mt-6 pt-4 border-t space-y-3">
                  <div className="flex items-center space-x-2 text-[#0072bc] text-sm">
                    <Phone className="w-4 h-4" />
                    <span>Contact Us</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#0072bc] text-sm">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBarNew;
