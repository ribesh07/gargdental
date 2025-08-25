"use client";
import { useProductStore } from "@/stores/InitdataFetch";

export default function ProductList() {
  const { products, loading, error } = useProductStore();
  console.log("Products from store:", products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!products) return <p>No products available</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.product_name} - {p.sell_price}
        </li>
      ))}
    </ul>
  );
}
