"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const MultiLevelDropdown = ({ categories, onSelect, value }) => {
    const [menuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => setMenuOpen(!menuOpen);
    const [selected, setSelected] = useState( value ?? null);

    const DropdownItem = ({ category, onSelect }) => {
  const [open, setOpen] = useState(false);
  
  const handleSelect = (item) => {
    setSelected(item);
    if (onSelect) onSelect(item);
    setMenuOpen(false); // close dropdown after selection
  };

  return (
    <li
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-4 py-2 hover:bg-gray-100 w-full text-left"
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
       <div className="relative inline-block w-full">
        <button
            onClick={toggleMenu}
            className="w-full px-4 py-2 bg-gray-50 rounded flex justify-between items-center  border-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
            <span className="text-left">
            {selected ? selected.name : "Select Category"}
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
