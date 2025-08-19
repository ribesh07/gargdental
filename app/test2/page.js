"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { apiRequest } from "@/utils/ApiSafeCalls";


export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiRequest("/categories", false);
        if (response.success) {
          const mapCategory = (category) => ({
            id: category.id,
            name: category.category_name,
            parent_id: category.parent_id,
            image: category.image_full_url,
            active_children: category.active_children?.map(mapCategory) || [],
          });

          setCategories(response.categories.map(mapCategory));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Recursive render (dropdown-below)
  const renderCategory = (category) => (
    <li key={category.id} className="relative group">
      <Link
        // 👇 Pass category id in query so products filter correctly
        href={`/product?category=${category.id}`}
        className="block py-1.5 px-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-all rounded-md"
      >
        {category.name}
      </Link>

      {/* Subcategories appear BELOW */}
      {category.active_children.length > 0 && (
        <ul className="hidden group-hover:block pl-4 mt-1 space-y-1 border-l border-gray-200">
          {category.active_children.map((sub) => renderCategory(sub))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow h-full w-full">
      <h3 className="text-blue-900 text-lg font-semibold mb-3 pb-2 border-b-2 border-blue-900">
        Categories
      </h3>

      <ul className="space-y-1">
        {categories.length > 0 ? (
          categories.map((category) => renderCategory(category))
        ) : (
          <li className="text-gray-500 text-sm">No categories found</li>
        )}
      </ul>
    </div>
  );
}