'use client';

import { useState, useEffect, useRef } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import Link from "next/link";
import { Grid3X3, ChevronRight } from 'lucide-react';

export default function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const [hoveredIds, setHoveredIds] = useState([]); // Array to track hovered category at each level
  const hoverTimeoutRef = useRef(null);

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

  // Handle mouse enter - only set the specific level, don't auto-select children
  const handleMouseEnter = (categoryId, level) => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setHoveredIds(prev => {
      const newHovered = [...prev];
      // Only set the current level, clear deeper levels
      newHovered[level] = categoryId;
      // Remove any deeper level hovers
      return newHovered.slice(0, level + 1);
    });
  };

  // Handle mouse leave - add delay before clearing
  const handleMouseLeave = (level) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIds(prev => {
        // Only clear the current level and deeper
        return prev.slice(0, level);
      });
    }, 200); // 200ms delay for smooth navigation
  };

  // Handle container mouse enter to prevent premature closing
  const handleContainerEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Check if a category should show its children
  const shouldShowChildren = (categoryId, level) => {
    return hoveredIds[level] === categoryId;
  };

  // Recursive render function
  const renderCategory = (category, level = 0) => {
    const hasChildren = category.active_children && category.active_children.length > 0;
    const showChildren = shouldShowChildren(category.id, level);

    return (
      <div key={category.id} className="relative">
        {/* Main category item */}
        <div
          className={`px-2 ${level === 0 ? '' : 'ml-4'}`}
          onMouseEnter={() => handleMouseEnter(category.id, level)}
          onMouseLeave={() => handleMouseLeave(level)}
        >
          <div
            className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer
              ${level === 0 ? 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-sm' : ''}
              ${level === 1 ? 'hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50' : ''}
              ${level === 2 ? 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50' : ''}
              ${showChildren ? 'bg-gray-50' : ''}
            `}
          >
            {/* Category link */}
            <Link 
              href={`/product?category=${category.id}`} 
              className="flex items-center space-x-3 flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-lg">
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-5 h-5 object-cover rounded" 
                  />
                ) : (
                  '📁'
                )}
              </span>
              <span className={`font-medium transition-colors duration-200
                ${level === 0 ? 'text-gray-700 hover:text-blue-700' : ''}
                ${level === 1 ? 'text-gray-700 hover:text-green-700' : ''}
                ${level === 2 ? 'text-gray-700 hover:text-purple-700' : ''}
              `}>
                {category.name}
              </span>
            </Link>

            {/* Arrow icon for categories with children */}
            {hasChildren && (
              <ChevronRight 
                className={`h-4 w-4 text-gray-400 transition-all duration-200 
                  ${showChildren ? 'rotate-90 text-gray-600' : ''}
                `} 
              />
            )}
          </div>
        </div>

        {/* Children container */}
        {hasChildren && showChildren && (
          <div
            className="ml-4"
            onMouseEnter={handleContainerEnter}
          >
            {category.active_children.map((child) => 
              renderCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="lg:w-64 xl:w-72">
      <div className=" h-full flex flex-row sm:flex-col flex-wrap gap-2 rounded-lg p-3 sm:p-4 lg:p-5  ">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100  rounded-t-xl">
          <div className="flex items-center space-x-3">
            <Grid3X3 className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Categories</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">Explore our dental supplies</p>
        </div>

        {/* Categories list */}
        <div 
          className="mb-6 sm:mb-8 space-y-1 overflow-y-scroll h-48 sm:h-180 hide-scrollbar"
          onMouseEnter={handleContainerEnter}
        >
          {categories.length > 0 ? (
            categories.map((category) => renderCategory(category))
          ) : (
            <div className="text-gray-500 text-sm px-4 py-3 flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Loading categories...</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}