import { create } from "zustand";

const useToastStore = create((set) => ({
  toast: null,
  showToast: (message, duration = 2000) => {
    set({ toast: message });
    setTimeout(() => set({ toast: null }), duration);
  },
}));

export default useToastStore;
