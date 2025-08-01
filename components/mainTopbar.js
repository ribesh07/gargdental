"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search } from "lucide-react";
import useCartStore from "@/stores/useCartStore";
import { usePathname } from "next/navigation";
export default function MainTopBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const cartCount = useCartStore((state) => state.getCartCount());
  const cartTotal = useCartStore((state) => state.getCartTotal());
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsReady(true);
    console.warn(`pathname: ${pathname}`);
  }, [pathname]);

  //   if (!isReady) return null;
  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/product/`);
      router.refresh();
    }
  };
  return (
    <>
      <div className="sticky top-0 z-50">
        {/* Top Bar */}
        <div className=" bg-blue-900 text-white py-2 text-xs">
          <div className="max-w-5xl mx-auto px-5 flex justify-end items-center">
            <div className="flex items-center space-x-6">
              <div className="text-[12px]">
                <span>English | </span>
              </div>
              <div className="space-x-4">
                <Link
                  href="#"
                  className="text-[12px] hover:underline hover:text-[14px]"
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className="text-[12px] hover:underline hover:text-[14px]"
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-gray-50 shadow-md py-4">
          <div className="max-w-6xl mx-auto px-5 flex justify-between items-center">
            <div className="flex items-center cursor-pointer">
              <img
                onClick={() => router.push("/dashboard")}
                src="/assets/logo.png"
                alt="Garg Dental Logo"
                className="h-12 w-auto"
              />
            </div>
            {pathname === "/product" && <br />}

            {pathname !== "/product" && (
              <div className="flex-1 max-w-md mx-8 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 px-4 pr-12 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleSearch()}
                  className="absolute right-0 top-0 h-full px-4 bg-blue-900 text-white rounded-r hover:bg-blue-800"
                >
                  <Search size={16} />
                </button>
              </div>
            )}

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-xs">
                <input
                  type="text"
                  placeholder="User ID"
                  className="w-24 py-1.5 px-3 border border-gray-300 rounded text-xs"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-24 py-1.5 px-3 border border-gray-300 rounded text-xs"
                />
                <button className="bg-blue-900 text-white px-4 py-1.5 rounded text-xs hover:bg-blue-800">
                  Login
                </button>
              </div>

              <div
                className="cursor-pointer flex items-center font-bold"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart size={20} className="mr-2" />
                <span>
                  {" "}
                  My Order: Rs.{cartTotal.toFixed(2)} ({cartCount})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
