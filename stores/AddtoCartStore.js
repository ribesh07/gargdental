import { create } from "zustand";
import { persist } from "zustand/middleware";

const useQuantityStore = create(
  persist(
    (set) => ({
      quantity: 1,
      setQuantity: (qty) => set({ quantity: qty }),
    }),
    {
      name: "quantity-storage",
      skipHydration: true,
    }
  )
);

export default useQuantityStore;
