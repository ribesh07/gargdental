import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: {
        id: null,
        items: [],
        subtotal: 0,
      },
      selectedItems: [],

      setCart: (cartData) =>
        set({
          cart: {
            id: cartData.id,
            items: cartData.items || [],
            subtotal: cartData.subtotal || 0,
          },
        }),

      addItem: (product) =>
        set((state) => {
          const exists = state.cart.items.find(
            (item) => item.product_code === product.product_code
          );
          if (exists) {
            return {
              cart: {
                ...state.cart,
                items: state.cart.items.map((item) =>
                  item.product_code === product.product_code
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              },
            };
          } else {
            return {
              cart: {
                ...state.cart,
                items: [...state.cart.items, { ...product, quantity: 1 }],
              },
            };
          }
        }),

      updateCartItems: (updatedItems) =>
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.map((item) => {
              const updated = updatedItems.find((u) => u.item_id === item.id);
              if (updated) {
                return { ...item, quantity: updated.quantity };
              }
              return item;
            }),
          },
        })),

      removeItem: (product_code) =>
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter(
              (item) => item.product_code !== product_code
            ),
          },
        })),

      clearCart: () =>
        set({
          cart: {
            id: null,
            items: [],
            subtotal: 0,
          },
        }),

      getCartCount: () =>
        get().cart.items.reduce((acc, item) => acc + item.quantity, 0),

      getCartTotal: () => get().cart.subtotal || 0,

      setSelectedItems: (items) => set({ selectedItems: items }),
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);

export default useCartStore;
