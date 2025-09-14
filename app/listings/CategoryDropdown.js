



// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// const MultiLevelDropdown = ({ categories, onSelect, selectedValue = null, placeholder = "All Categories" }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const dropdownRef = useRef(null);

//   // Reset selected when selectedValue prop changes (for clearing filters)
//   useEffect(() => {
//     if (selectedValue === null || selectedValue === "" || selectedValue === undefined) {
//       setSelected(null);
//     } else {
//       // Find the selected category by ID
//       const findCategoryById = (cats, id) => {
//         for (let cat of cats) {
//           if (cat.id === id) return cat;
//           if (cat.children && cat.children.length > 0) {
//             const found = findCategoryById(cat.children, id);
//             if (found) return found;
//           }
//         }
//         return null;
//       };
//       const selectedCategory = findCategoryById(categories, selectedValue);
//       setSelected(selectedCategory);
//     }
//   }, [selectedValue, categories]);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const DropdownItem = ({ category, onSelect }) => {
//     const [open, setOpen] = useState(false);

//     const handleSelect = (item) => {
//       setSelected(item);
//       if (onSelect) onSelect(item);
//       setMenuOpen(false); // close dropdown after selection
//     };

//     return (
//       <li
//         className="relative group hover:border-l-2 hover:border-blue-500"
//         onMouseEnter={() => setOpen(true)}
//         onMouseLeave={() => setOpen(false)}
//       >
//          <button
//         className="py-2 px-2 max-w-[150px] hover:bg-gray-100 w-full text-left break-words whitespace-normal hover:border-l-2 hover:border-blue-500"
//         onClick={() => {
//             handleSelect(category);
//         }}
//         >
//           {category.name}
//         </button>

//         {category.children && category.children.length > 0 && (
//           <ul
//             className={`absolute left-full top-0 mt-0 ml-0 bg-gray-50 category-list shadow-lg min-w-[180px] max-h-[500px] ${
//               open ? "block" : "hidden"
//             }`}
//           >
//             {category.children.map((child) => (
//               <DropdownItem key={child.id} category={child} onSelect={onSelect} />
//             ))}
//           </ul>
//         )}
//       </li>
//     );
//   };

//   return (
//     <div ref={dropdownRef} className="relative inline-block w-full border-2 border-gray-200 rounded-md">
//       <button
//         onClick={toggleMenu}
//         className="w-full px-4 py-2 bg-gray-50 rounded flex justify-between items-center border-2 border-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       >
//         <span className="text-left">{selected ? selected.name : placeholder}</span>
//         <ChevronDown
//           className={`w-4 h-4 text-gray-500 transition-transform ${
//             menuOpen ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {menuOpen && (
//         <ul className="absolute left-0 mt-2 w-full bg-gray-50 rounded shadow-lg z-50 category-list">
//           {categories.map((cat) => (
//             <DropdownItem key={cat.id} category={cat} onSelect={onSelect} />
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MultiLevelDropdown;


"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const MultiLevelDropdown = ({ categories, onSelect, value }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState(value ?? null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

  // Watch for changes in the value prop (important for clearing filters)
  useEffect(() => {
    if (value === null || value === "" || value === undefined) {
      setSelected(null);
      setHoveredCategory(null);
      setHoveredSubcategory(null);
    } else {
      // Find the selected category by ID
      const findCategoryById = (cats, id) => {
        for (let cat of cats) {
          if (cat.id === id) return cat;
          if (cat.children && cat.children.length > 0) {
            const found = findCategoryById(cat.children, id);
            if (found) return found;
          }
        }
        return null;
      };
      const selectedCategory = findCategoryById(categories, value);
      setSelected(selectedCategory);
    }
  }, [value, categories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
        setHoveredCategory(null);
        setHoveredSubcategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    if (onSelect) onSelect(item);
    setMenuOpen(false);
    setHoveredCategory(null);
    setHoveredSubcategory(null);
  };

  // Helper function to check if a category is selected or contains selected item
  const isSelected = (category) => {
    return selected?.id === category.id;
  };

  const isInSelectedPath = (category) => {
    if (!selected) return false;
    
    const findPath = (cats, targetId, path = []) => {
      for (let cat of cats) {
        const currentPath = [...path, cat];
        if (cat.id === targetId) return currentPath;
        if (cat.children && cat.children.length > 0) {
          const found = findPath(cat.children, targetId, currentPath);
          if (found) return found;
        }
      }
      return null;
    };
    
    const selectedPath = findPath(categories, selected.id);
    return selectedPath?.some(item => item.id === category.id);
  };

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    setHoveredSubcategory(null);
  };

  const handleSubcategoryHover = (subcategory) => {
    setHoveredSubcategory(subcategory);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <button
        onClick={toggleMenu}
        className="w-full px-4 py-2 bg-gray-50 rounded flex justify-between items-center border-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className="text-left">
          {selected ? selected.name : "All Categories"}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      {menuOpen && (
        <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl z-50 flex border border-gray-200 overflow-hidden">
          {/* First Column - Main Categories */}
          <div className="w-48 border-r border-gray-200">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-sm font-semibold text-blue-800 border-b border-blue-200">
              Categories
            </div>
            <ul className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 hide-scrollbar ">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`border-b border-gray-100 last:border-b-0 transition-all duration-150 category-list ${
                    isSelected(category) 
                      ? 'bg-blue-400 text-white' 
                      : isInSelectedPath(category)
                      ? 'bg-blue-200 border-l-4 border-l-blue-500'
                      : hoveredCategory?.id === category.id 
                      ? 'bg-blue-180 border-l-4 border-l-blue-400' 
                      : 'hover:bg-gray-200'
                  }`}
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  <button
                    className={`w-full px-4 py-3 text-left break-words whitespace-normal transition-colors ${
                      isSelected(category) ? 'text-white font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => handleSelect(category)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Second Column - Subcategories */}
          {hoveredCategory && hoveredCategory.children && hoveredCategory.children.length > 0 && (
            <div className="w-48 border-r border-gray-200">
              <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 text-sm font-semibold text-green-800 border-b border-green-200">
                Subcategories
              </div>
              <ul className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-100 hide-scrollbar ">
                {hoveredCategory.children.map((subcategory) => (
                  <li
                    key={subcategory.id}
                    className={`border-b border-gray-100 last:border-b-0 transition-all duration-150 category-list ${
                      isSelected(subcategory)
                        ? 'bg-green-400 text-white'
                        : isInSelectedPath(subcategory)
                        ? 'bg-green-100 border-l-4 border-l-green-500'
                        : hoveredSubcategory?.id === subcategory.id
                        ? 'bg-green-50 border-l-4 border-l-green-400'
                        : 'hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => handleSubcategoryHover(subcategory)}
                  >
                    <button
                      className={`w-full px-4 py-3 text-left break-words whitespace-normal transition-colors ${
                        isSelected(subcategory) ? 'text-white font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => handleSelect(subcategory)}
                    >
                      {subcategory.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Third Column - Sub-subcategories */}
          {hoveredSubcategory && hoveredSubcategory.children && hoveredSubcategory.children.length > 0 && (
            <div className="w-48">
              <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-100 text-sm font-semibold text-purple-800 border-b border-purple-200">
                Sub-subcategories
              </div>
              <ul className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-100">
                {hoveredSubcategory.children.map((subSubcategory) => (
                  <li
                    key={subSubcategory.id}
                    className={`border-b border-gray-100 last:border-b-0 transition-all duration-150 category-list ${
                      isSelected(subSubcategory)
                        ? 'bg-purple-400 text-white'
                        : 'hover:bg-purple-50'
                    }`}
                  >
                    <button
                      className={`w-full px-4 py-3 text-left break-words whitespace-normal transition-colors ${
                        isSelected(subSubcategory) ? 'text-white font-medium' : 'text-gray-700 hover:text-purple-700'
                      }`}
                      onClick={() => handleSelect(subSubcategory)}
                    >
                      {subSubcategory.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiLevelDropdown;