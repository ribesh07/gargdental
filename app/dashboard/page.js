"use client";
import { useState, useEffect, useMemo } from "react";
import { Search, ShoppingCart, User, Lock } from "lucide-react";
import Link from "next/link";
import DentalSuppliesListing from "@/app/listings/page";
import { useRouter } from "next/navigation";
import MainTopBar from "@/components/mainTopbar";

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
      <MainTopBar />

      {/* Breadcrumb */}
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
              <a
                key={index}
                href="#"
                className="block py-1.5 px-1 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
              >
                {manufacturer}
              </a>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          {/* Results Header */}
          {/* <div className="bg-gray-50 p-5 rounded-lg mb-5 shadow">
            <h1 className="text-2xl font-bold text-blue-900 mb-2.5">
              Browse Supplies Results
            </h1>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">
                Showing dental supplies and equipment
              </span>
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="py-2 px-3 border border-blue-500 rounded bg-gray-50"
                >
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                  <option>Brand</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          {/* <div className="bg-gray-100 p-4 rounded mb-5">
            <div className="flex items-center space-x-4">
              <strong>Refine by:</strong>
              <select className="py-2 px-3 border border-gray-300 rounded">
                <option>All Categories</option>
                <option>Anesthetics</option>
                <option>Burs & Diamonds</option>
                <option>Gloves</option>
                <option>Instruments</option>
              </select>
              <select className="py-2 px-3 border border-gray-300 rounded">
                <option>All Manufacturers</option>
                <option>3M</option>
                <option>Dentsply Sirona</option>
                <option>GC America</option>
                <option>Kerr</option>
              </select>
              <select className="py-2 px-3 border border-gray-300 rounded">
                <option>Price Range</option>
                <option>Under Rs.25</option>
                <option>Rs.25 - Rs.50</option>
                <option>Rs.50 - Rs.100</option>
                <option>Over Rs.100</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-full h-40 bg-gray-100 rounded mb-2.5 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-sm font-bold mb-2 text-blue-900">
                  {product.title}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {product.manufacturer}
                </div>
                <div className="text-lg font-bold text-red-600 mb-2.5">
                  Rs.{product.price}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-900 text-white py-2 px-4 rounded text-xs hover:bg-blue-800 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div> */}

          {/* Pagination */}
          {/* <div className="flex justify-center mt-8 space-x-1">
            <a
              href="#"
              className="py-2 px-3 border border-gray-300 text-blue-900 rounded hover:bg-blue-900 hover:text-white"
            >
              Previous
            </a>
            <a
              href="#"
              className="py-2 px-3 bg-blue-900 text-white border border-blue-900 rounded"
            >
              1
            </a>
            <a
              href="#"
              className="py-2 px-3 border border-gray-300 text-blue-900 rounded hover:bg-blue-900 hover:text-white"
            >
              2
            </a>
            <a
              href="#"
              className="py-2 px-3 border border-gray-300 text-blue-900 rounded hover:bg-blue-900 hover:text-white"
            >
              3
            </a>
            <a
              href="#"
              className="py-2 px-3 border border-gray-300 text-blue-900 rounded hover:bg-blue-900 hover:text-white"
            >
              4
            </a>
            <a
              href="#"
              className="py-2 px-3 border border-gray-300 text-blue-900 rounded hover:bg-blue-900 hover:text-white"
            >
              5
            </a>
            <a
              href="#"
              className="py-2 px-3 border border-gray-300 text-blue-900 rounded hover:bg-blue-900 hover:text-white"
            >
              Next
            </a>
          </div>    */}
          <DentalSuppliesListing />
        </main>
      </div>
    </div>
  );
};

export default GargDental;
