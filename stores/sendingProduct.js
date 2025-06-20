// stores/useSelectedProductStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSelectedProductStore = create(
  persist(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: "selected-product-storage", // localStorage key
      skipHydration: true, // Optional: for avoiding SSR hydration issues
    }
  )
);

export default useSelectedProductStore;
