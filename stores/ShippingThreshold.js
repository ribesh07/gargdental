import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useFreeShippingStore = create
(
    persist(
        (set, get) => ({
  freeShippingThreshold: 0,

  // setter
  setFreeShippingThreshold: (value) => set({ freeShippingThreshold: value }),

  // getter
  getFreeShippingThreshold: () => get().freeShippingThreshold,
}),
 {
      name: "shipping-threshold",
      skipHydration: true,
    }
    )
);
