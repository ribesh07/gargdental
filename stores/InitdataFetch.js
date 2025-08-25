// store/useCategoryStore.js
import { create } from "zustand";
import { apiRequest } from "@/utils/ApiSafeCalls";

export const useCategoryStore = create((set, get) => ({
  categories: null,
  fetchCategories: async () => {
    if (get().categories) return; // already cached
    const res = await fetch("/api/categories");
    const data = await res.json();
    set({ categories: data });
  },
}));


// stores/useProductStore.js

const CACHE_DURATION = 5 * 60 * 1000; // 5 min

export const useProductStore = create((set, get) => ({
  products: [],
  lastFetched: null,
  loading: false,
  error: null,

  fetchProducts: async () => {
    if (get().loading) return;

    // ✅ Use cache if still valid
    const now = Date.now();
    if (get().products && get().lastFetched && now - get().lastFetched < CACHE_DURATION) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await apiRequest(`/products/all`, false);

      const transformedProducts =
        data.products?.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          stock_quantity: product.stock_quantity,
          available_quantity: product.available_quantity,
          product_code: product.product_code,
          has_variations: product.has_variations,
          starting_price: product.starting_price,
          brand: product.brand?.brand_name || "No Brand",
          category: product.category?.category_name || "Uncategorized",
          category_id: product.category?.id || null,
          parent_id: product.category?.parent_id || null,
          item_number: `#${product.product_code}`,
          actual_price: product.actual_price,
          sell_price: product.sell_price,
          image_url:
            product.main_image_full_url ||
            product.image_full_url ||
            `assets/logo.png`,
          description: product.product_description,
          unit_info: product.unit_info,
          flash_sale: product.flash_sale,
          delivery_days: product.delivery_target_days,
        })) || [];

      set({
        products: transformedProducts,
        lastFetched: now,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

