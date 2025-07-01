import { create } from "zustand";
import { sortAddressDropdowns } from "@/utils/apiHelper";
import { persist } from "zustand/middleware";

export const useAddressStore = create(
  persist(
    (set, get) => ({
      provinces: [],
      cities: [],
      zones: [],
      loading: false,
      error: null,

      fetchAddressDropdowns: async () => {
        set({ loading: true, error: null });

        const response = await sortAddressDropdowns();

        if (response.provinces.length > 0) {
          console.log("response", response);
          set({
            provinces: response.provinces,
            cities: response.cities,
            zones: response.zones,
            loading: false,
          });
        } else {
          set({
            error: "Check for internet connection and try again",
            loading: false,
          });
        }
      },
    }),
    {
      name: "address-store",
      skipHydration: true,
    }
  )
);
