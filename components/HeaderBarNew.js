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
} from "lucide-react";

const HeaderBarNew = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuppliesDropdownOpen, setIsSuppliesDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const suppliesRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
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
  }, []);

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

  return (
    // <div className="w-full bg-white shadow-sm sticky top-0 z-50">
    <div className="w-full bg-white shadow-sm relative">
      {/* Top Navigation Bar */}
      <div className="bg-gray-200 border-b-blue-100 ">
        {/* <div className="bg-gradient-to-r from-blue-500 from-20% to-blue-400 text-white"> */}
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
      <div className="max-w-7xl mx-auto mb-2 px-4 bg-gray-50 border-gray-500 shadow-sm">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Rely on Us */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                onClick={() => router.push("/dashboard")}
                src="/assets/logo.png"
                alt="Garg Dental Logo"
                className="h-22 w-30 cursor-pointer"
              />
            </div>
            <div className="hover:bg-red-600 text-white px-3 py-1 bg-blue-600 rounded-full text-sm font-medium cursor-pointer">
              Rely on Us
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="What can we help you find?"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-0 top-0 bg-blue-600 text-white px-4 py-2 flex items-center justify-center rounded-r-md hover:bg-blue-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-5">
              <label className="flex items-center text-sm text-gray-600 hover:text-red-600">
                <input type="checkbox" className="mr-2 cursor-pointer" />
                Within Items Purchased
              </label>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Menu Button with Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <div className="bg-blue-100 p-2 rounded-lg mb-1 transform hover:scale-105">
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
                        <a
                          href={item.href}
                          className={`flex items-center justify-between px-4 py-2 text-gray-700 transition-all duration-200 ${
                            item.hasSubmenu && isSuppliesDropdownOpen
                              ? "border-l-2 border-blue-500 text-red-600"
                              : " hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500"
                          }`}
                          //   onMouseEnter={() =>
                          //     item.hasSubmenu && setIsSuppliesDropdownOpen(true)
                          //   }
                          onClick={() =>
                            item.hasSubmenu &&
                            setIsSuppliesDropdownOpen(!isSuppliesDropdownOpen)
                          }
                          //   onMouseLeave={() =>
                          //     item.hasSubmenu && setIsSuppliesDropdownOpen(false)
                          //   }
                        >
                          <span>{item.label}</span>
                          {item.hasSubmenu && (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Supplies Dropdown (shown in image) */}
              {isSuppliesDropdownOpen && (
                <div
                  ref={suppliesRef}
                  className="absolute top-full right-0  mt-2 w-56 bg-white border-2 border-gray-100 shadow-lg z-50"
                  onClick={() => setIsMenuOpen(!isSuppliesDropdownOpen)}
                >
                  <div className="py-2">
                    <div className="px-4 py-2 bg-gray-50 font-semibold text-red-600 ">
                      Supplies & Small Equipment
                    </div>
                    {suppliesSubmenu.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 transition-all duration-200${item.color}`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shop Button */}
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transition-colors cursor-pointer">
              <div className="bg-red-100 p-2 rounded-lg mb-1 relative transform hover:scale-105">
                <ShoppingBag className="w-6 h-6 text-red-600" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
              <span className="text-xs">Shop</span>
            </button>

            {/* My Account Button */}
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-red-600 transform hover:scale-105 transition-colors cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-lg mb-1">
                <Settings className="w-6 h-6 text-blue-600 " />
              </div>
              <span className="text-xs">My Account</span>
            </button>
          </div>
        </div>

        {/* Login Section */}
        <div className="flex items-center justify-between py-3 border-t">
          <div className="flex items-center space-x-4">
            <button className="bg-[#bf0000] text-white text-[12px] h-8 px-2 py-2 rounded hover:bg-red-600 transition-colors flex items-center cursor-pointer">
              <User className="w-3 h-3 mr-1" />
              LOGIN
            </button>
            <a href="#" className="text-[#0072bc] hover:underline text-[14px]">
              Create an Online Account
            </a>
          </div>

          <div className="flex items-center space-x-2 hover:underline">
            <span className="text-gray-700">My Order:</span>
            <span className="font-bold text-lg">$0.00</span>
            <button className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900 transition-colors relative cursor-pointer">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Blue Banner */}
      {/* <div className="bg-gradient-to-r from-blue-300 from-20% to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold">BROWSE SUPPLIES RESULTS</h1>
        </div>
      </div> */}
      <div className="bg-gray-50 border-b border-b-gray-200 py-2.5 shadow">
        <div className="max-w-7xl mx-auto px-5 text-sm">
          <a href="#" className="text-blue-900 hover:underline">
            Supplies & Small Equipment
          </a>{" "}
          /
          <a href="#" className="text-blue-900 hover:underline ml-1">
            Browse Supplies
          </a>{" "}
          /<span className="ml-1 text-gray-600">Browse Supplies Results</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBarNew;
