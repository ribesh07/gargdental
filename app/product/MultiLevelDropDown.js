// "use client";
// import React, { useState , useEffect
// , useRef
//  } from "react";
// import { ChevronDown } from "lucide-react";


// const MultiLevelDropdown = ({ categories, onSelect, value }) => {
//     const [menuOpen, setMenuOpen] = useState(false); 
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//     const dropdownRef = useRef(null);
//     const [selected, setSelected] = useState( value ?? null);

//      // Close dropdown when clicking outside
//       useEffect(() => {
//         const handleClickOutside = (event) => {
//           if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setMenuOpen(false);
//           }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//       }, []);

//     const DropdownItem = ({ category, onSelect }) => {
//   const [open, setOpen] = useState(false);
  
//   const handleSelect = (item) => {
//     setSelected(item);
//     if (onSelect) onSelect(item);
//     setMenuOpen(false); // close dropdown after selection
//   };

//   return (
//     <li
//       className="relative group hover:border-l-2 hover:border-blue-500"
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
     
//       <button
//         className="py-2 px-2 max-w-[150px] hover:bg-gray-100 w-full text-left break-words whitespace-normal hover:border-l-2 hover:border-blue-500"
//         onClick={() => {
//             onSelect(category);
//             handleSelect(category);
//         }}
//       >
//         {category.name}
//       </button>

//       {category.children && category.children.length > 0 && (
//         <ul
//           className={`absolute left-full top-0 mt-0 ml-0 bg-gray-50 category-list shadow-lg min-w-[180px] ${
//             open ? "block" : "hidden"
//           }`}
//         >
//           {category.children.map((child) => (
//             <DropdownItem key={child.id} category={child} onSelect={onSelect} />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// };
//   return (
//        <div ref={dropdownRef} className="relative inline-block w-full">
//         <button
//             onClick={toggleMenu}
//             className="w-full px-4 py-2 bg-gray-50 rounded flex justify-between items-center  border-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         >
//             <span className="text-left">
//             {selected ? selected.name : "All Categories"}
//             </span>
//             <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
//         </button>

//         {menuOpen && (
//             <ul className="absolute left-0 mt-2 w-full bg-gray-50 rounded shadow-lg z-50 category-list">
//             {categories.map((cat) => (
//                 <DropdownItem key={cat.id} category={cat} onSelect={onSelect} />
//             ))}
//             </ul>
//         )}
//         </div>


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

  // Watch for changes in the value prop (important for clearing filters)
  useEffect(() => {
    if (value === null || value === "" || value === undefined) {
      setSelected(null);
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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const DropdownItem = ({ category, onSelect }) => {
    const [open, setOpen] = useState(false);
    
    const handleSelect = (item) => {
      setSelected(item);
      if (onSelect) onSelect(item);
      setMenuOpen(false); // close dropdown after selection
    };

    return (
      <li
        className="relative group hover:border-l-2 hover:border-blue-500"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          className="py-2 px-2 max-w-[150px] hover:bg-gray-100 w-full text-left break-words whitespace-normal hover:border-l-2 hover:border-blue-500"
          onClick={() => {
            onSelect(category);
            handleSelect(category);
          }}
        >
          {category.name}
        </button>

        {category.children && category.children.length > 0 && (
          <ul
            className={`absolute left-full top-0 mt-0 ml-0 bg-gray-50 category-list shadow-lg min-w-[180px] ${
              open ? "block" : "hidden"
            }`}
          >
            {category.children.map((child) => (
              <DropdownItem key={child.id} category={child} onSelect={onSelect} />
            ))}
          </ul>
        )}
      </li>
    );
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
        <ul className="absolute left-0 mt-2 w-full bg-gray-50 rounded shadow-lg z-50 category-list">
          {categories.map((cat) => (
            <DropdownItem key={cat.id} category={cat} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiLevelDropdown;