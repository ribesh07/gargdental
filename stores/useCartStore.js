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
      selectedShippingAddress: null,
      selectedBillingAddress: null,
      userProfile: null,
      orders: [],
      cancelledOrders: [],
      wishlist: [],
      orders: [],
      cancelledOrders: [],
      wishlist: [],
      email: null,

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
      setSelectedShippingAddress: (address) =>
        set({ selectedShippingAddress: address }),
      setSelectedBillingAddress: (address) =>
        set({ selectedBillingAddress: address }),
      setUserProfile: (profile) => set({ userProfile: profile }),
      setEmail: (email) => set({ email }),
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, { ...order, orderStatus: "Processing" }],
        })),
      cancelOrder: (orderIndex) =>
        set((state) => {
          const orderToCancel = state.orders[orderIndex];
          if (!orderToCancel) return {};
          return {
            orders: state.orders.filter((_, idx) => idx !== orderIndex),
            cancelledOrders: [
              ...state.cancelledOrders,
              {
                ...orderToCancel,
                orderStatus: "Cancelled",
                cancelledAt: new Date().toISOString(),
              },
            ],
          };
        }),
      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.find((item) => item.id === product.id)) return {};
          return { wishlist: [...state.wishlist, product] };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),
      setWishlist: (wishlist) => set({ wishlist }),
      setWishlist: (wishlist) => set({ wishlist }),
      addOrder: (order) =>
        set((state) => {
          const orderIndex = (state.orders?.length || 0) + 1;
          const datePart = new Date()
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "");
          const accountNumber = `ORD${datePart}-${String(orderIndex).padStart(
            4,
            "0"
          )}`;
          return {
            orders: [
              ...(state.orders || []),
              { ...order, orderStatus: "Processing", accountNumber },
            ],
          };
        }),
      cancelOrder: (orderIndex) =>
        set((state) => {
          const orderToCancel = (state.orders || [])[orderIndex];
          if (!orderToCancel) return {};
          return {
            orders: (state.orders || []).filter((_, idx) => idx !== orderIndex),
            cancelledOrders: [
              ...(state.cancelledOrders || []),
              {
                ...orderToCancel,
                orderStatus: "Cancelled",
                cancelledAt: new Date().toISOString(),
              },
            ],
          };
        }),
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);

export default useCartStore;
