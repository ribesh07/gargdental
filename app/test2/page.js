"use client";
import { useProductStore , useCategoryStore } from "@/stores/InitdataFetch";

export default function ProductList() {
  const { products, loading, error } = useProductStore();
  const { categories, loadingcategory, errorcategory } = useCategoryStore();
  // console.log("Products from store:", products);
  // console.log("Categories from store:", categories);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!products) return <p>No products available</p>;
  if (loadingcategory) return <p>Loading categories...</p>;
  if (errorcategory) return <p className="text-red-500">Error: {errorcategory}</p>;
  if(!categories) return <p>No categories available</p>;

  return (
    <ul>
      {categories.map((p) => (
        <li key={p.id}>
          {p.id} 
        </li>
      ))}

    </ul>
  );
}
