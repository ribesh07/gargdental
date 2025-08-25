"use client";
import { useEffect } from "react";
import { useProductStore, useCategoryStore , useManufacturerStore } from "@/stores/InitdataFetch";

export default function ClientLayout({ children }) {
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
   const { fetchManufacturers } = useManufacturerStore();

  useEffect(() => {
    fetchManufacturers(); 
  }, [fetchManufacturers]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); 

  return <div className="w-full">{children}</div>;
}
