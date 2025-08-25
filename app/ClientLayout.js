"use client";
import { useEffect } from "react";
import { useProductStore , useCategoryStore } from "@/stores/InitdataFetch";

export default function ClientLayout({ children }) {
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);

  useEffect(() => {
    fetchProducts();     // fetch products once
    fetchCategories();   // fetch categories once
  }, [fetchProducts, fetchCategories]);

  return <div className="w-full">{children}</div>;
}
