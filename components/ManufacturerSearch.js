"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/utils/ApiSafeCalls";

// const manufacturers = [
//   "A B Dental Trends Inc",
//   "A&A Global",
//   "A&T Surgical Mfg. Co., Inc.",
//   "A-dec/W&H",
//   "B. Titan Instruments",
//   "Abbott Laboratories",
//   "Abbott Rapid DX N.America",
//   "Abbvie Laboratories",
//   "Compounding Co.,Inc.",
//   "AbilityOne",
//   "Abm North America Corp",
//   "Acacia Pharma Inc",
//   "Accentra, Inc.",
//   "CCA Brands",
//   "ACCO International Inc.",
//   "Accord Healthcare Inc",
//   "ACCURATE MANUFACTURING",
//   "Accutec Blades, Inc",
//   "Accutome",
//   "Accutron, Inc.",
//   "Ace Surgical",
//   "Acella Pharmaceuticals",
//   "ACI Healthcare USA",
//   "Ackuretta Technolies",
// ];

export default function ManufacturerFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const router = useRouter();

  const fetchManufacturers = async () => {
    const response = await apiRequest("/brands", false);
    if (response.success) {
      console.log("response.brands", response);
      const simplifiedBrands = response.brands.map((brand) => ({
        id: brand.id,
        brand_name: brand.brand_name,
      }));
      setManufacturers(simplifiedBrands);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchManufacturers();
  }, []);

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesSearch = manufacturer.brand_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesLetter =
      selectedLetter === ""
        ? true
        : selectedLetter === "#"
        ? !/^[A-Z]/i.test(manufacturer.brand_name.charAt(0))
        : manufacturer.brand_name.startsWith(selectedLetter);

    return matchesSearch && matchesLetter;
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Find Manufacturer"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Alphabet Filter */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {[
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "#",
          ].map((letter) => (
            <button
              key={letter}
              onClick={() => {
                if (letter === selectedLetter) {
                  setSelectedLetter("");
                } else {
                  setSelectedLetter(letter);
                }
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedLetter === letter
                  ? "bg-[#0072bc] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-300"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Manufacturers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 overflow-y-scroll h-118">
        {filteredManufacturers.map((manufacturer, index) => (
          <div
            key={manufacturer.id || index}
            onClick={() => router.push(`/product`)}
            className="p-2 sm:p-3 lg:p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow hover:text-white hover:bg-[#0072bc] bg-gray-50 border-gray-200 hover:border-gray-300"
          >
            <Link href={`/product`}>
              <span className="text-xs sm:text-sm font-medium block text-center">
                {manufacturer.brand_name}
              </span>
            </Link>
          </div>
        ))}
        {filteredManufacturers.length === 0 && (
          <div className="col-span-full text-gray-500 text-center py-8 text-sm ssm:text-base">
            No manufacturers found.
          </div>
        )}
      </div>
    </div>
  );
}
