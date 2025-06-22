"use client";
import { useState } from "react";

const manufacturers = [
  "A B Dental Trends Inc",
  "A&A Global",
  "A&T Surgical Mfg. Co., Inc.",
  "A-dec/W&H",
  "A. Titan Instruments",
  "Abbott Laboratories",
  "Abbott Rapid DX N.America",
  "Abbvie Laboratories",
  "Abc Compounding Co.,Inc.",
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
  "ACI Healthcare USA",
  "Ackuretta Technolies",
];

export default function ManufacturerFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesSearch = manufacturer
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesLetter =
      selectedLetter === ""
        ? true
        : selectedLetter === "#"
        ? !/^[A-Z]/i.test(manufacturer.charAt(0))
        : manufacturer.startsWith(selectedLetter);

    return matchesSearch && matchesLetter;
  });

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Find Manufacturer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Alphabet Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
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
              onClick={() => setSelectedLetter(letter)}
              className={`w-8 h-8 rounded-full text-sm font-medium ${
                selectedLetter === letter
                  ? "bg-[#0072bc] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Manufacturers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredManufacturers.map((manufacturer, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow hover:text-white hover:bg-[#0072bc] bg-white border-gray-200 hover:border-gray-300"
          >
            <span className="text-sm font-medium">{manufacturer}</span>
          </div>
        ))}
        {filteredManufacturers.length === 0 && (
          <div className="col-span-full text-gray-500 text-center">
            No manufacturers found.
          </div>
        )}
      </div>
    </div>
  );
}
