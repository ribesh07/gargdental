"use client";
import { useState, useEffect, useMemo } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import Link from "next/link";
import DentalSuppliesListing from "@/app/listings/page";
import { useRouter } from "next/navigation";
// import MainTopBar from "@/components/mainTopbar";
import BannerGarg from "@/components/bannerGarg";
import ProductShowcase from "@/components/FeaturedProduct";
// import HeaderBarNew from "@/components/HeaderBarNew";
import { CategoriesViews } from "../page";
// import TawkToWidget from "@/components/TawkToWidget";

const GargDental = () => {
  const [products, setProducts] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  //    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const router = useRouter();

  //   "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg3.png",
  //   "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg3.png",
  //   "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg1.png",
  //   "https://gargdemo.omsok.com/public/storage/backend/carousel_files/garg2.png",
  // ];
  // const manufacturers = [
  //   "Dentsply Sirona",
  //   "Kerr",
  //   "Solventum",
  //   "Ultradent",
  //   "Young Dental",
  //   "Nordent",
  //   "Premier Dental",
  //   "Hu-Friedy",
  //   "Crosstex",
  //   "Parkell",
  // ];

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      const data = await apiRequest("/banners", false);
      if (data) {
        const mappedSlides = data.banners.map(
          (item) => item.image_full_url || i
        );
        setSlides(mappedSlides);
      }
    };
    fetchSlides();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiRequest("/categories", false);
      if (response.success) {
        const mapCategory = (category) => {
          return {
            id: category.id,
            name: category.category_name,
            image: category.image_full_url,
            parent_id: category.parent_id,
            active_children: category.active_children?.map(mapCategory) || [],
          };
        };
        const mappedCategories = response.categories.map(mapCategory);
        console.log("mappedCategories", mappedCategories);
        setCategories(mappedCategories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await apiRequest("/brands", false);
      if (response.success) {
        const simplifiedBrands = response.brands.map((brand) => ({
          id: brand.id,
          brand_name: brand.brand_name,
        }));
        setManufacturers(simplifiedBrands);
      }
    };
    fetchManufacturers();
  }, []);

  // const categories = [
  //   "Pedodontics",
  //   "Prosthodontics",
  //   "Periodontics",
  //   "Oral Surgery",
  //   "Orthodontics",
  //   "Dental Radiology",
  //   "Implantology",
  //   "Dental Laboratory",
  //   "Instrument",
  //   "Equipment",
  //   "Cosmetic Dentistry",
  //   "Handpieces",
  //   "Health & Beauty & OTC",
  //   "Impression Materials",
  //   "Infection Control Products",
  //   "Instruments",
  //   "Laboratory",
  //   "Medical Diagnostic",
  //   "Orthodontic",
  //   "Pharmaceuticals",
  //   "Preventive",
  //   "Restorative & Cosmetic",
  //   "Surgical & Implant Products",
  //   "X-Ray And Digital Imaging",
  // ];

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
    <div>
      <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-5 bg-gray-100 font-sans">
        {/* <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-5"> */}
        {/* Top Bar */}

        {/* categories and manufacturers */}
        <CategoriesViews />

        {/* Browse more */}
        <div className="text-center text-lg sm:text-xl lg:text-2xl font-bold">
          <div className="max-w-full px-2 sm:px-4 py-2 sm:py-6 lg:py-8 text-center">
            <div className="relative max-w-7xl h-[60px] sm:h-[80px] lg:h-[80px] mx-auto">
              <img
                src="/assets/banner.png"
                alt="Garg Logo"
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-trasparent bg-opacity-40 text-white text-xs sm:text-sm font-semibold">
                <h1 className="text-lg sm:text-xl lg:text-3xl font-bold mt-2 sm:mt-4">
                  BROWSE MORE PRODUCTS
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Image Slider */}
        <div
          className="max-w-7xl mx-auto my-3 sm:my-4 lg:my-5 relative overflow-hidden rounded-lg shadow-lg"
          style={{ height: "40vh", minHeight: "200px" }}
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
        <div className="max-w-7xl mx-auto p-2 sm:p-3 lg:p-5">
          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <span>{sidebarOpen ? "Close Sidebar" : "Open Sidebar"}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Sidebar */}
            <aside
              className={`lg:block ${
                sidebarOpen ? "block" : "hidden"
              } lg:w-64 xl:w-72`}
            >
              <div className="bg-gray-50 flex flex-row sm:flex-col flex-wrap gap-2 rounded-lg p-3 sm:p-4 lg:p-5 h-fit shadow">
                <h3 className="text-blue-900 text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b-2 border-blue-900">
                  Categories
                </h3>

                <ul className="mb-6 sm:mb-8 space-y-1">
                  {categories.map((category, index) => (
                    <li className="category-list" key={category.id || index}>
                      <Link
                        href="/product"
                        className="block py-1 sm:py-1.5 px-2 sm:px-2.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 transition-all duration-200"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <h3 className="text-blue-900 text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b-2 border-blue-900">
                  Manufacturers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                  {manufacturers.map((manufacturer, index) => (
                    <Link
                      key={manufacturer.id || index}
                      href="#"
                      className="block py-1 sm:py-1.5 px-2 hover:border-l-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
                    >
                      {manufacturer.brand_name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1">
              <DentalSuppliesListing />
            </main>
          </div>
        </div>

        <ProductShowcase />
      </div>
    </div>
  );
};

export default GargDental;
