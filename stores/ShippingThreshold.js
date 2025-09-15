import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFreeShippingStore = create(
  persist(
    (set, get) => ({
      freeShippingThreshold: 0,
      inside_of_valley_threshold: 0,
      out_of_valley_threshold: 0,

      // setters
      setFreeShippingThreshold: (value) =>
        set({ freeShippingThreshold: value }),
      setInsideOfValleyThreshold: (value) =>
        set({ inside_of_valley_threshold: value }),
      setOutOfValleyThreshold: (value) =>
        set({ out_of_valley_threshold: value }),

      // getters
      getFreeShippingThreshold: () => get().freeShippingThreshold,
      getInsideOfValleyThreshold: () => get().inside_of_valley_threshold,
      getOutOfValleyThreshold: () => get().out_of_valley_threshold,
    }),
    {
      name: "shipping-threshold",
      skipHydration: true,
    }
  )
);
