"use client";
import { useState, useEffect, useMemo } from "react";
import { Search, ShoppingCart, User, Lock } from "lucide-react";
import Link from "next/link";
import DentalSuppliesListing from "@/app/listings/page";
import { useRouter } from "next/navigation";
// import MainTopBar from "@/components/mainTopbar";
import BannerGarg from "@/components/bannerGarg";
import ProductShowcase from "@/components/FeaturedProduct";
// import HeaderBarNew from "@/components/HeaderBarNew";
import CategoriesViews from "../page";

const GargDental = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  //    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const slides = [
    "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg3.png",
    "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg3.png",
    "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg1.png",
    "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg2.png",
  ];
  const manufacturers = [
    "Dentsply Sirona",
    "Kerr",
    "Solventum",
    "Ultradent",
    "Young Dental",
    "Nordent",
    "Premier Dental",
    "Hu-Friedy",
    "Crosstex",
    "Parkell",
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Get unique values for filter options
  //   const categories = [...new Set(products.map((p) => p.category))];
  const categories = [
    "Pedodontics",
    "Prosthodontics",
    "Periodontics",
    "Oral Surgery",
    "Orthodontics",
    "Dental Radiology",
    "Implantology",
    "Dental Laboratory",
    "Instrument",
    "Equipment",
    "Cosmetic Dentistry",
    "Handpieces",
    "Health & Beauty & OTC",
    "Impression Materials",
    "Infection Control Products",
    "Instruments",
    "Laboratory",
    "Medical Diagnostic",
    "Orthodontic",
    "Pharmaceuticals",
    "Preventive",
    "Restorative & Cosmetic",
    "Surgical & Implant Products",
    "X-Ray And Digital Imaging",
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogin = () => {
    if (userId && password) {
      alert(`Login attempted for user: ${userId}`);
    } else {
      alert("Please enter both User ID and Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Bar */}

      {/* categories */}
      <CategoriesViews />

      {/* Browse more */}
      <div className="text-center text-2xl font-bold">
        <div className="max-w-full px-4 py-8 text-center">
          <div className="relative max-w-7xl h-[100px] mx-auto">
            <img
              src="https://www.henryschein.com/us-en/images/dental/pageheader/default.png"
              alt="Garg Logo"
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-trasparent bg-opacity-40 text-white text-sm font-semibold">
              <h1 className="text-3xl font-bold mt-4">BROWSE MORE PRODUCTS</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <div
        className="max-w-7xl mx-auto my-5 relative overflow-hidden rounded-lg shadow-lg"
        style={{ height: "60vh", minHeight: "300px" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-5 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 rounded-lg p-5 h-fit shadow">
          <h3 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b-2 border-blue-900">
            Categories
          </h3>
          <p className="text-gray-600 text-xs mb-4">Total: 30</p>
          <ul className="mb-8 space-y-1">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  href="/productAPI"
                  className="block py-1.5 px-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 transition-all duration-200"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b-2 border-blue-900">
            Manufacturers
          </h3>
          <p className="text-gray-600 text-xs mb-4">Total: 10</p>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {manufacturers.map((manufacturer, index) => (
              <Link
                key={index}
                href="#"
                className="block py-1.5 px-2 hover:border-l-2  text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
              >
                {manufacturer}
              </Link>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          <DentalSuppliesListing />
        </main>
      </div>
      <div className="max-w-full mx-auto my-5">
        <BannerGarg />
      </div>
      <ProductShowcase />
    </div>
  );
};

export default GargDental;
