// store/useCategoryStore.js
import { create } from "zustand";
import { apiRequest } from "@/utils/ApiSafeCalls";


// Category mapping functions
const mapCategory = (category) => ({
  id: category.id,
  name: category.category_name,
  parent_id: category.parent_id,
  image: category.image_full_url,
  children: category.active_children?.map(mapCategory) || [],
});

const mapCategories = (categories) => categories.map(mapCategory);

// stores/useProductStore.js

const CACHE_DURATION = 5 * 60 * 1000; // 5 min

export const useProductStore = create((set, get) => ({
    products: [],
    lastFetched: null,
    loading: false,
    error: null,

  fetchProducts: async () => {
    if (get().loading) return;

    const cached = typeof window !== "undefined" && localStorage.getItem("productsCache");
    const { data, expiry } = JSON.parse(cached);
        if (cached && data.length > 0) {
        if (Date.now() < expiry) {
            set({ products: data, lastFetched: Date.now() });
            return;
        }
    }
    if (Date.now() >= expiry) {
        localStorage.removeItem("productsCache");
    }



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

      if (typeof window !== "undefined") {
        localStorage.setItem(
            "productsCache",
            JSON.stringify({ data: transformedProducts, expiry: now + CACHE_DURATION })
        );
        }

      set({
        products: transformedProducts,
        lastFetched: now,
      });
    } catch (err) {
        set({ error: 'Data not fetched !' });
    } finally {
      set({ loading: false });
    }
  },


}));

export const useCategoryStore = create((set, get) => ({
    categories: [],
    lastFetchedcategory: null,
    loadingcategory: false,
    errorcategory: null,
       // Fetch categories
  fetchCategories: async () => {
     if (get().loadingcategory) return;

     let data = [];
let expiry = 0;

if (typeof window !== "undefined") {
  const cached = localStorage.getItem("categoriesCache");
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      data = parsed.data || [];
      console.log("Cached Categories:", data);
      expiry = parsed.expiry || 0;
    } catch {
      data = [];
      expiry = 0;
    }
  }
}

       
        if ( data) {
            set({ categories: data, lastFetchedcategory: Date.now() });
            return;
        }
        
        if (Date.now() >= expiry) {
        localStorage.removeItem("categoriesCache");
        }


    // ✅ Use cache if still valid
    const now = Date.now();
    if (get().categories && get().lastFetchedcategory && now - get().lastFetchedcategory < CACHE_DURATION) {
      return;
    }

    set({ loadingcategory: true, errorcategory: null });
    try {
      const response = await apiRequest("/categories", false);
      if (response.success) {
        const mappedCategories = mapCategories(response.categories);
        console.log("Mapped Categories:", mappedCategories);

        if (typeof window !== "undefined") {
            localStorage.setItem(
                "categoriesCache",
                JSON.stringify({ data: mappedCategories, expiry: now + CACHE_DURATION })
            );
            }

        set({ categories: mappedCategories ,
             lastFetchedcategory: now
        });
      }
    } catch (err) {
      set({ errorcategory: 'Data not fetched !' });
    }finally {
      set({ loadingcategory: false });
    }
  },
}));