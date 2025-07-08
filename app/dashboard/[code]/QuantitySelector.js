"use client";
import useQuantityStore from "@/stores/AddtoCartStore";

export default function QuantitySelector() {
  const quantity = useQuantityStore((state) => state.quantity);
  const setQuantity = useQuantityStore((state) => state.setQuantity);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex items-center space-x-3 mb-4">
      <button
        className="w-8 h-8 border rounded text-lg"
        onClick={handleDecrease}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="w-8 h-8 border rounded text-lg"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}
