"use client";
import { useEffect } from "react";
import { useProductStore } from "@/stores/InitdataFetch";

export default function ClientLayout({ children }) {
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts(); // fetch on first load
  }, [fetchProducts]);

  return <div className="w-full">{children}</div>;
}
