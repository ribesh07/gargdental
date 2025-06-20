import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((item) => item.id === product.id);
          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      // Derived values:
      getCartCount: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),

      getCartTotal: () =>
        get().cart.reduce(
          (acc, item) => acc + item.quantity * parseFloat(item.sell_price),
          0
        ),
    }),
    {
      name: "cart-storage", // localStorage key name
      skipHydration: true, // Optional: for Next.js to avoid hydration mismatches
    }
  )
);

export default useCartStore;
