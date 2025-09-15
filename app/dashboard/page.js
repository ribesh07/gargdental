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
import { CategoriesViews } from "@/components/CategoriesVews";
// import TawkToWidget from "@/components/TawkToWidget";
import TopBrandPage from "./components/topBrands";
import toast from "react-hot-toast";
import TopCategoriesPage from "./components/topCategories";
import { useFreeShippingStore } from "@/stores/ShippingThreshold";
import CategoryMenu from "@/components/CategoriesMenu";
import { Grid3X3, ChevronRight } from 'lucide-react';


//import TopCategoriesPage from "@/app/dashboard/components/topCategories";

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
  const [settings, setSettings] = useState({
    company_name: "",
    timezone: "",
    company_logo_header: "",
    company_logo_footer: "",
    primary_phone: "",
    secondary_phone: "",
    primary_email: "",
    secondary_email: "",
    address: "",
    whatsapp: "",
  });
  const router = useRouter();

  const {
  setInsideOfValleyThreshold,
  setOutOfValleyThreshold,
  getInsideOfValleyThreshold,
  getOutOfValleyThreshold,
} = useFreeShippingStore();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await apiRequest("/categories", false);
  //       if (response.success) {
  //         const mapCategory = (category) => ({
  //           id: category.id,
  //           name: category.category_name,
  //           parent_id: category.parent_id,
  //           image: category.image_full_url,
  //           active_children: category.active_children?.map(mapCategory) || [],
  //         });

  //         setCategories(response.categories.map(mapCategory));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);



  // Recursive render (dropdown-below)
  // const renderCategory = (category) => (
  //   <li key={category.id} className="relative group">
  //     <Link
  //       // 👇 Pass category id in query so products filter correctly
  //       href={`/product?category=${category.id}`}
  //       className="block py-1.5 px-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-all rounded-md"
  //     >
  //       {category.name}
  //     </Link>

  //     {/* Subcategories appear BELOW */}
  //     {category.active_children.length > 0 && (
  //       <ul className="hidden group-hover:block pl-4 mt-1 space-y-1 border-l border-gray-200">
  //         {category.active_children.map((sub) => renderCategory(sub))}
  //       </ul>
  //     )}
  //   </li>
  // );

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      const data = await apiRequest("/banners", false);

      if (data.success) {
        const mappedSlides = data.banners.map((item) => ({
          image_full_url: item.image_full_url,
          id: item.id,
          product_code: item.product_code,
          is_offer: item.is_offer,
        }));
        console.log("mappedSlides", mappedSlides);
        setSlides(mappedSlides);
      }
    };
    fetchSlides();
  }, []);

  //settings data
  useEffect(() => {
    const fetchSettings = async () => {
      const response = await apiRequest("/settings", false);
      if (response.success) {
        setSettings(response.settings);
        const {
          company_name,
          timezone,
          company_logo_header,
          company_logo_footer,
          primary_phone,
          secondary_phone,
          primary_email,
          secondary_email,
          address,
          whatsapp,
          free_shipping_threshold,
          free_shipping_threshold_inside_of_valley,
          free_shipping_threshold_out_of_valley,
        } = response.settings;

        const companyName = company_name?.value || "";
        const headerLogo = company_logo_header?.header_logo_full_url || "";
        const footerLogo = company_logo_footer?.footer_logo_full_url || "";

        // const freeShippingThreshold = free_shipping_threshold?.value || null;
        const freeShipping_threshold_inside_of_valley = free_shipping_threshold_inside_of_valley?.value || null;
        const freeShipping_threshold_out_of_valley = free_shipping_threshold_out_of_valley?.value || null;
        if (freeShipping_threshold_inside_of_valley && freeShipping_threshold_out_of_valley && !isNaN(parseFloat(freeShipping_threshold_out_of_valley)) && !isNaN(parseFloat(freeShipping_threshold_inside_of_valley))) {
          const thresholdInside = parseFloat(freeShipping_threshold_inside_of_valley);
          const thresholdOutside = parseFloat(freeShipping_threshold_out_of_valley);
          setInsideOfValleyThreshold(thresholdInside);
          setOutOfValleyThreshold(thresholdOutside);
          console.log("Inside of valley threshold from API:", thresholdInside);
          console.log("Outside of valley threshold from API:", thresholdOutside);
        } 

        console.log(getInsideOfValleyThreshold());
        console.log(getOutOfValleyThreshold()); 
        setSettings({
          company_name: companyName,
          timezone: timezone?.value || null,
          company_logo_header: headerLogo,
          company_logo_footer: footerLogo,
          primary_phone: primary_phone?.value || null,
          secondary_phone: secondary_phone?.value || null,
          primary_email: primary_email?.value || null,
          secondary_email: secondary_email?.value || null,
          address: address?.value || "",
          whatsapp: whatsapp?.value || "",
        });

        console.log("settings", response.settings);
      } else {
        // console.error("Failed to fetch settings:", response.error);
        toast.error(response?.errors[0]?.message || "Failed to fetch settings");
        console.log("Response error:", response);

        // setSettings();
      }
    };
    fetchSettings();
  }, []);

  const slideNavigation = useMemo(() => {
    return {
      next: () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      prev: () =>
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
    };
  }, [slides]);

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const nextIndex = (currentSlide + 1) % slides.length;
    const nextSlide = slides[nextIndex];

    if (nextSlide?.image_full_url) {
      const nextImage = new Image();
      nextImage.src = nextSlide.image_full_url;
    }
  }, [currentSlide, slides]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await apiRequest("/categories", false);
  //     if (response.success) {
  //       const mapCategory = (category) => {
  //         return {
  //           id: category.id,
  //           name: category.category_name,
  //           image: category.image_full_url,
  //           parent_id: category.parent_id,
  //           active_children: category.active_children?.map(mapCategory) || [],
  //         };
  //       };
  //       const mappedCategories = response.categories.map(mapCategory);
  //       console.log("mappedCategories", mappedCategories);
  //       setCategories(mappedCategories);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

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
      <div className="max-w-7xl mx-auto bg-gray-50 font-sans">
        {/* <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-5"> */}
        {/* Top Bar */}

        {/* Image Slider */}
        <div className="max-w-7xl mb-4 sm:mb-4 h-[200px] sm:h-[400px] lg:mb-4 relative overflow-hidden rounded-lg shadow-lg">
          {/* Slides */}
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id || index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
                  }`}
                style={{ willChange: "opacity" }}
              >
                <img
                  onClick={() => {
                    if (slide.product_code) {
                      router.push(`/dashboard/${slide.product_code}`);
                    }
                  }}
                  src={slide.image_full_url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer select-none"
                  loading="eager"
                  draggable={false}
                />
                {slide.is_offer && (
                  <div
                    className="absolute z-[999] top-2 right-2 rounded-2xl px-2 py-1 animate-spin"
                    style={{ animationDuration: "2s" }}
                  >
                    <img
                      src="/assets/sale.png"
                      alt="Offer"
                      className="w-25 h-25 inline-block mr-1"
                      draggable={false}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Navigation Buttons */}
          {/* Left Scroll */}
          {/* Left Scroll */}
<button
  onClick={slideNavigation.prev}
  className="hidden md:flex absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-50 rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-50 transition duration-200 z-10"
>
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>

{/* Right Scroll */}
<button
  onClick={slideNavigation.next}
  className="hidden md:flex absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-50 rounded-full shadow-lg p-2 cursor-pointer hover:bg-gray-50 transition duration-200 z-10"
>
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
</button>

        </div>
        <TopBrandPage />
        <TopCategoriesPage />

        {/* categories and manufacturers */}
        {/* <CategoriesViews /> */}

        {/* Browse more */}
        <div className="text-center text-lg -mb-5 sm:text-xl lg:text-2xl font-bold">
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-2 sm:p-3 lg:p-5">
          {/* Mobile Menu Button */}
          {/* <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full bg-[#0072bc] text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
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
          </div> */}

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Sidebar */}
            <aside
              className={`lg:block ${sidebarOpen ? "block" : "hidden"
                } lg:w-64 xl:w-72`}
            >
              <div className="bg-gray-50 h-full flex flex-row sm:flex-col flex-wrap gap-2 rounded-lg p-3 sm:p-4 lg:p-5 shadow ">
                {/* <h3 className="text-blue-900 text-base sm:text-lg font-semibold mb-3 sm:mb-4 pb-2 border-b-2 border-blue-900">
                  Categories
                </h3>

                <ul className="mb-6 sm:mb-8 space-y-1 overflow-y-scroll h-48 sm:h-180 hide-scrollbar">
                  {categories.length > 0 ? (
                    categories.map((category) => renderCategory(category))
                  ) : (
                    <li className="text-gray-500 text-sm">No categories found</li>
                  )}
                </ul> */}


                {/* <div className="mb sm:mb-8 ">
                  <CategoryMenu />
                </div> */}




                {/* Manufacturers */}

                <div className="px-6 py-5 border-b border-gray-100 rounded-t-xl">
                  <div className="flex items-center space-x-3">
                    <Grid3X3 className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Manufacturers</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Explore our dental supplies</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs overflow-y-scroll h-48 sm:h-340 hide-scrollbar">
                  {manufacturers.map((manufacturer, index) => (
                    <Link
                      key={manufacturer.id || index}
                       href={`/product?manufacturer=${manufacturer.id}`} 
                      className="block break-words py-1 text-sm sm:py-1.5 px-2 hover:border-l-2 text-gray-700 font-semibold hover:bg-gray-50 hover:text-blue-700 transition-colors duration-200 items-center space-x-2"
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
