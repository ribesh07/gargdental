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
import useConfirmModalStore from "@/stores/confirmModalStore";
const HeaderBarNew = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuppliesDropdownOpen, setIsSuppliesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const suppliesRef = useRef(null);
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState([
    {
      id: null,
      full_name: "",
      phone: "",
      email: "",
      image_full_url: "",
      created_at: "",
    },
  ]);
  const [isloggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setIsloggedin(true);
        const details = await userDetails();
        if (details) {
          setUser(details);
        } else {
          // It's possible the token is invalid, so log out.
          handleLogout();
        }
      } else {
        setIsloggedin(false);
        setUser({});
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

  const cartCount = useCartStore((state) => state.getCartCount());
  const cartTotal = useCartStore((state) => state.getCartTotal());
  useEffect(() => {
    if (isloggedin) {
      const fetchCart = async () => {
        const cartResponse = await apiRequest(`/customer/cart/list`, true);
        if (cartResponse && cartResponse.cart) {
          useCartStore.getState().setCart(cartResponse.cart);
        }
        console.log("cartResponse from header", cartResponse);
      };
      fetchCart();
    }
  }, [pathname, isloggedin]);

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
      router.push(`/product/`);
      router.refresh();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsloggedin(false);
    setUser({});
    useCartStore.getState().clearCart();
    router.refresh();
    router.push("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto bg-white sticky top-0 z-50">
      <div className="w-full">
        {/* Main Header */}
        <div className="max-w-7xl mx-auto mb-2 bg-white">
          <div className="flex items-center justify-between py-2 md:py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="flex items-center">
                <img
                  onClick={() => router.push("/dashboard")}
                  src="/assets/logo.png"
                  alt="Garg Dental Logo"
                  className="h-14 w-18 md:h-20 md:w-30 cursor-pointer"
                />
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
            {pathname !== "/product" && (
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
              </div>
            )}

            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Menu Button with Dropdown */}
              {/* <div className="relative transform hover:scale-105" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mb-1">
                    <Menu className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs">Menu</span>
                </button>

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
              </div> */}

              {/* Login and Signup Button */}
              {!isloggedin && (
                <div className="bg-red-500 rounded-lg mb-3 p-2 relative hover:underline hover:scale-105 transition-all duration-300 cursor-pointer">
                  <Link
                    href="/account"
                    className="flex items-center space-x-2 text-white "
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium ">Login</span>
                  </Link>
                </div>
              )}

              {/* Shop Button */}
              <button
                onClick={() => {
                  if (!isloggedin) {
                    router.push("/account");
                  } else {
                    router.push("/cart");
                  }
                }}
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
              {isloggedin && (
                <button
                  onClick={() => router.push("/myaccount")}
                  className="flex flex-col items-center text-gray-600 hover:text-red-600 transform hover:scale-105 transition-colors cursor-pointer"
                >
                  <div className="bg-blue-100 p-2 rounded-lg mb-1">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs">My Account</span>
                </button>
              )}

              {isloggedin && user && (
                <div className="flex flex-col items-center space-x-4 cursor-pointer group">
                  <button
                    onClick={() => router.push("/account/profile")}
                    className="bg-transparent text-white mb-1 mt-1 text-[12px] border-2 border-blue-400 rounded-full hover:scale-105 transition-all transform flex items-center justify-center cursor-pointer"
                  >
                    {user.image_full_url ? (
                      <img
                        src={user.image_full_url}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </button>

                  <span className="text-xs text-gray-600 mr-3 mb-2 group-hover:text-red-600 transition-colors duration-200">
                    Profile
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar - Always visible on mobile when not on product page */}
          {pathname !== "/product" && (
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
          <div className="hidden sm:block p-2 w-full bg-gradient-to-b from-[#3c6389] via-[#0072bc] to-[#4FB6F4] border-t border-b border-gray-200 rounded-lg px-3 sm:px-6 py-2">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
              {/* Nav Links */}
              <div className="hidden sm:flex sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-white text-sm">
                <Link
                  href="/dashboard"
                  className="hover:underline font-semibold"
                >
                  Dashboard
                </Link>
                <Link href="/product" className="hover:underline font-semibold">
                  Browse Products
                </Link>
                <Link
                  href="/dashboard"
                  className="hover:underline font-semibold"
                >
                  Hot Sales
                </Link>
                <Link
                  href="/NewClinicSetup"
                  className="hover:underline font-semibold"
                >
                  New Clinic Setup
                </Link>
              </div>

              {/* Cart + Logout */}
              {isloggedin && (
                <div className="hidden sm:flex items-center justify-between space-x-2 mt-2 md:mt-0">
                  {/* Cart */}
                  <div
                    onClick={() => router.push("/cart")}
                    className="flex items-center space-x-1 hover:underline cursor-pointer"
                  >
                    <span className="text-white text-[12px]">My Cart:</span>
                    <span className="font-bold text-[12px] text-white">
                      Rs. {cartTotal}
                    </span>
                    <button className="bg-transparent text-white w-5 h-5 rounded hover:text-red-500 transition-colors flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={() =>
                      useConfirmModalStore.getState().open({
                        title: "Logout",
                        message: "Are you sure you want to logout?",
                        onConfirm: handleLogout,
                        onCancel: () => {},
                      })
                    }
                    className="bg-[#bf0000] text-white text-[12px] h-8 px-2 rounded hover:bg-red-600 transition-colors flex items-center"
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

                {/* Mobile Login/Logout/My Account Section */}
                {!isloggedin ? (
                  <div className="mb-6 pb-4 border-b">
                    <button
                      className="w-full bg-[#bf0000] text-white text-sm py-3 rounded hover:bg-red-600  transition-colors flex items-center justify-center mb-3"
                      onClick={() => {
                        router.push("/account");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      LOGIN
                    </button>
                    <button
                      className="block w-full text-center text-[#0072bc] hover:underline text-sm bg-transparent"
                      onClick={() => {
                        router.push("/account/signup");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Create an Online Account
                    </button>
                  </div>
                ) : (
                  <div className="mb-6 pb-4 border-b space-y-3">
                    <button
                      className="w-full bg-blue-600 text-white text-sm py-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                      onClick={() => {
                        router.push("/myaccount");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      My Account
                    </button>
                    <button
                      className="w-full bg-[#bf0000] text-white text-sm py-3 rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                      onClick={() => {
                        useConfirmModalStore.getState().open({
                          title: "Logout",
                          message: "Are you sure you want to logout?",
                          onConfirm: handleLogout,
                          onCancel: () => {},
                        });
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}

                {/* Mobile Cart Summary */}
                <div
                  className="mb-6 pb-4 border-b cursor-pointer"
                  onClick={() => {
                    router.push("/cart");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-black text-sm underline">
                      My Cart:
                    </span>
                    <span className="font-bold text-lg text-black underline">
                      Rs. {cartTotal}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 underline">
                    <ShoppingBag className="w-4 h-4 mr-2 " />
                    <span className="text-sm underline text-black">
                      {cartCount}
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
