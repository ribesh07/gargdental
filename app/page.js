"use client";
import { useState } from "react";
import Link from "next/link";
import ManufacturerFilter from "@/components/ManufacturerSearch";
import { useRouter } from "next/navigation";
import GargDental from "./dashboard/page";

const categories = [
  {
    id: "anesthetics",
    name: "Anesthetics",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Anesthetics_600x256.png",
    description: "Dental anesthetics and injection equipment",
  },
  {
    id: "burs-diamonds",
    name: "Burs & Diamonds",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Burs_Diamonds_600x256.png",
    description: "Cutting burs and diamond instruments",
  },
  {
    id: "cadcam",
    name: "CAD/CAM",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_CAD_CAM_600x256.png",
    description: "Computer-aided design and manufacturing",
  },
  {
    id: "crown-bridge",
    name: "Crown & Bridge",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Crown_Bridge_600x256.png",
    description: "Crown and bridge materials",
  },
  {
    id: "dental-equipment",
    name: "Dental Equipment Parts and Accessories",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Dental_Equipment_Parts_and_Accessories_600x256.png",
    description: "Equipment parts and accessories",
  },
  {
    id: "disposables",
    name: "Disposables",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Disposables_600x256.png",
    description: "Single-use dental supplies",
  },
  {
    id: "education",
    name: "Education, Patient & Staff",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Education_Patient_Staff_600x256.png",
    description: "Educational materials and resources",
  },
  {
    id: "endodontics",
    name: "Endodontics",
    image:
      "https://www.henryschein.com/Products/tocstoc/dental/1_Endodontics_600x256.png",
    description: "Root canal treatment supplies",
  },
];

const manufacturers = [
  "A B Dental Trends Inc",
  "Global",
  "Surgical Mfg. Co., Inc.",
  "A-dec/W&H",
  "B. Titan Instruments",
  "Abbott Laboratories",
  "Abbott Rapid DX N.America",
  "Abbvie Laboratories",
  "Compounding Co.,Inc.",
  "AbilityOne",
  "Abm North America Corp",
  "Acacia Pharma Inc",
  "Accentra, Inc.",
  "ACCO Brands",
  "ACCO International Inc.",
  "Accord Healthcare Inc",
  "ACCURATE MANUFACTURING",
  "Accutec Blades, Inc",
  "Accutome",
  "Accutron, Inc.",
  "Ace Surgical",
  "Acella Pharmaceuticals",
  "Healthcare USA",
  "Ackuretta Technolies",
];

export function CategoriesViews() {
  const [activeTab, setActiveTab] = useState("categories");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-5">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <span>{sidebarOpen ? "Close Menu" : "Open Menu"}</span>
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
          <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:w-64 xl:w-72`}>
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-5 h-fit shadow">
              <h2 className="font-bold text-sm sm:text-base text-gray-800 mb-3 sm:mb-4">
                Supplis and Equipment
              </h2>
              <nav className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Deal Of The Week
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Top Deals
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Browse Supplies
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Web Priced Products
                </Link>

                <div className="pt-1">
                  <button className="flex items-center justify-between w-full text-left text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1">
                    <span>Top Categories</span>
                  </button>
                </div>

                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Order from History
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  My Order
                </Link>

                <div className="pt-1">
                  <button className="flex items-center justify-between w-full text-left text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1">
                    <span>Sale</span>
                  </button>
                </div>

                <div className="pt-1">
                  <button className="flex items-center justify-between w-full text-left text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1">
                    <span>Featured Suppliers</span>
                  </button>
                </div>

                <div className="pt-1">
                  <button className="flex items-center justify-between w-full text-left text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1">
                    <span>Ordering Tools</span>
                  </button>
                </div>

                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  No Charge Goods & Redemptions
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Flyers & Magazines
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Catalogs
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Henry Schein Brand
                </Link>
                <Link
                  href="/request-catalog"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Request Catalog
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  SDS Look-up
                </Link>
                <Link
                  href="/productAPI"
                  className="block text-[#0072bc] pl-2 sm:pl-4 transition-all duration-200 hover:bg-gray-100 hover:text-red-600 hover:border-l-2 hover:border-blue-500 py-1"
                >
                  Webinars & Videos
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 mt-2 lg:mt-0">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4 sm:mb-6">
              <nav className="-mb-px flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
                <div className="flex flex-col items-start">
                  <button
                    onClick={() => setActiveTab("categories")}
                    className={`py-2 px-1 border-t-3 font-medium text-xs sm:text-sm ${
                      activeTab === "categories"
                        ? "border-blue-500 text-[#0072bc]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Categories
                  </button>
                  {activeTab === "categories" && (
                    <span className="ml-2 text-[10px] sm:text-xs font-bold text-[#0072bc]">
                      Total: {categories.length}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <button
                    onClick={() => setActiveTab("manufacturers")}
                    className={`py-2 px-1 border-t-3 font-medium text-xs sm:text-sm ${
                      activeTab === "manufacturers"
                        ? "border-blue-500 text-[#0072bc]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Manufacturers
                  </button>
                  {activeTab === "manufacturers" && (
                    <span className="ml-2 text-[10px] sm:text-xs font-bold text-[#0072bc]">
                      Total: {manufacturers.length}
                    </span>
                  )}
                </div>
              </nav>
            </div>

            {/* Categories Tab */}
            {activeTab === "categories" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => router.push(`/productAPI/${category.id}`)}
                    className="bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-md transition-transform duration-300 cursor-pointer"
                  >
                    <div className="aspect-w-16 aspect-h-10">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-2 sm:p-3 lg:p-4 hover:text-[#0072bc] hover:underline hover:underline-offset-1">
                      <h3 className="font-medium text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                        {category.name}
                      </h3>
                      <p
                        className="text-xs sm:text-sm text-gray-600"
                        onClick={() =>
                          router.push(`/productAPI/${category.id}`)
                        }
                      >
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Manufacturers Tab */}
            {activeTab === "manufacturers" && (
              <>
                <ManufacturerFilter />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return <GargDental />;
}
