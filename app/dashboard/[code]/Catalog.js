"use client";
import React from "react";
import { Download } from "lucide-react";
import Link from "next/link";

const CatalogButton = ({ product }) => {
  const dummyPdfUrl = product.catalogue_url;
  const handleDownload = () => {
    // Dummy PDF URL for demonstration

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = dummyPdfUrl;
    link.download = "dental-supplies-catalog-2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center gap-2 w-[150px]">
      <a
        target="_blank"
        href={dummyPdfUrl}
        className="flex items-center gap-2 px-2 py-2 bg-gray-50 border-2 border-[#0072bc] text-gray-500 font-semibold rounded-2xl hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
        download
      >
        <span className="text-sm">Catalog</span>
        <Download size={20} className="text-red-500" />
      </a>
    </div>
  );
};

export default CatalogButton;
