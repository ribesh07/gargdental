// components/CartItem.js
"use client";
import { useState } from "react";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="flex items-center border-b py-4">
      <input type="checkbox" className="mr-2" />
      <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-500">{item.category}</p>
      </div>
      <p className="mr-4">Rs. {item.price.toFixed(2)}</p>
      <div className="flex items-center">
        <button onClick={handleDecrease} className="px-2 py-1 bg-gray-200">
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="w-12 text-center border mx-2"
          min="1"
        />
        <button onClick={handleIncrease} className="px-2 py-1 bg-gray-200">
          +
        </button>
      </div>
      <p className="text-green-600 ml-4">
        Rs. {(item.price * quantity).toFixed(2)}
      </p>
      <button className="ml-4 text-red-500">🗑️</button>
    </div>
  );
}
