"use client";
import React, { useState } from "react";

const MultiLevelDropdown = ({ categories, onSelect }) => {
    const [menuOpen, setMenuOpen] = useState(false); 
  const toggleMenu = () => setMenuOpen(!menuOpen);
    const [selected, setSelected] = useState(null);

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
    <div className="relative inline-block w-56">
      <button
        onClick={toggleMenu}
        className="w-full px-4 py-2 bg-gray-50 rounded-md text-left border-1 border-gray-300"
      >
        {selected ? selected.name : "Select Category"}
      </button>

        {menuOpen && (
         <ul className="absolute left-0 mt-2 w-full bg-gray-50 rounded shadow-lg z-1000000 category-list">
      {categories.map((cat) => (
        <DropdownItem key={cat.id} category={cat} onSelect={onSelect} />
      ))}
    </ul>
      )}
    </div>
  );
};



export default MultiLevelDropdown;
